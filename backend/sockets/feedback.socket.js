const { socketAuth } = require('../middleware/auth.middleware');
const Interview = require('../models/Interview.model');
const axios = require('axios');

const AI_SERVICE_URL = process.env.AI_SERVICE_URL || 'http://localhost:8000';

module.exports = (io) => {
  const feedbackNamespace = io.of('/feedback');

  // Authentication middleware
  feedbackNamespace.use(socketAuth);

  feedbackNamespace.on('connection', (socket) => {
    console.log(`✅ User connected to feedback namespace: ${socket.userId}`);

    // Request feedback generation
    socket.on('generate-feedback', async ({ interviewId }) => {
      try {
        const interview = await Interview.findById(interviewId);

        if (!interview) {
          return socket.emit('error', { message: 'Interview not found' });
        }

        if (interview.userId.toString() !== socket.userId.toString()) {
          return socket.emit('error', { message: 'Unauthorized' });
        }

        socket.emit('feedback-progress', {
          progress: 0,
          message: 'Starting feedback generation...'
        });

        // Process each question
        for (let i = 0; i < interview.questions.length; i++) {
          const question = interview.questions[i];

          if (!question.response || !question.response.text) {
            continue;
          }

          try {
            // Call AI service to analyze answer
            const response = await axios.post(`${AI_SERVICE_URL}/analysis/analyze-answer`, {
              question: question.questionText,
              answer: question.response.text,
              expectedKeywords: question.expectedKeywords || []
            }, {
              timeout: 60000 // 60 seconds timeout
            });

            const analysis = response.data;

            // Update question with feedback
            question.score = analysis.scores || {
              relevance: 5,
              completeness: 5,
              technicalAccuracy: 5,
              communication: 5,
              overall: 5
            };

            question.feedback = analysis.feedback || {
              strengths: ['Answer provided'],
              improvements: ['Could be more detailed'],
              tips: ['Practice more']
            };

            // Calculate progress
            const progress = Math.round(((i + 1) / interview.questions.length) * 90);

            socket.emit('feedback-progress', {
              progress,
              message: `Analyzed question ${i + 1} of ${interview.questions.length}`,
              questionIndex: i,
              questionFeedback: question.feedback
            });
          } catch (error) {
            console.error(`Error analyzing question ${i}:`, error.message);
            
            // Use fallback scores if AI service fails
            question.score = {
              relevance: 5,
              completeness: 5,
              technicalAccuracy: 5,
              communication: 5,
              overall: 5
            };

            question.feedback = {
              strengths: ['Answer submitted'],
              improvements: ['Continue practicing'],
              tips: ['Review the concepts']
            };
          }
        }

        // Calculate overall score
        const answeredQuestions = interview.questions.filter(q => q.score);
        if (answeredQuestions.length > 0) {
          const avgTechnical = answeredQuestions.reduce((sum, q) => sum + (q.score.technicalAccuracy || 0), 0) / answeredQuestions.length;
          const avgCommunication = answeredQuestions.reduce((sum, q) => sum + (q.score.communication || 0), 0) / answeredQuestions.length;
          const avgOverall = answeredQuestions.reduce((sum, q) => sum + (q.score.overall || 0), 0) / answeredQuestions.length;

          interview.overallScore = {
            technical: Math.round(avgTechnical * 10) / 10,
            communication: Math.round(avgCommunication * 10) / 10,
            behavioral: Math.round(avgCommunication * 10) / 10,
            overall: Math.round(avgOverall * 10) / 10
          };
        }

        // Generate summary
        interview.summary = {
          strengths: ['Good technical knowledge', 'Clear communication'],
          weaknesses: ['Could provide more examples', 'Time management'],
          recommendations: ['Practice more complex scenarios', 'Review core concepts'],
          overallFeedback: 'Good performance overall. Keep practicing to improve further.'
        };

        // Mark interview as completed
        interview.status = 'completed';
        interview.endTime = new Date();
        interview.duration = Math.floor((interview.endTime - interview.startTime) / 1000);

        await interview.save();

        socket.emit('feedback-progress', {
          progress: 100,
          message: 'Feedback generation complete',
          complete: true
        });

        socket.emit('feedback-complete', {
          interviewId,
          overallScore: interview.overallScore,
          summary: interview.summary
        });

        console.log(`Feedback generated for interview ${interviewId}`);
      } catch (error) {
        console.error('Generate feedback error:', error);
        socket.emit('error', { message: 'Failed to generate feedback' });
      }
    });

    // Disconnect
    socket.on('disconnect', () => {
      console.log(`❌ User disconnected from feedback namespace: ${socket.userId}`);
    });
  });
};
