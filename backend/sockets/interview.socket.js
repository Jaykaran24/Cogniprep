const { socketAuth } = require('../middleware/auth.middleware');
const Interview = require('../models/Interview.model');

module.exports = (io) => {
  const interviewNamespace = io.of('/interview');

  // Authentication middleware
  interviewNamespace.use(socketAuth);

  interviewNamespace.on('connection', (socket) => {
    console.log(`✅ User connected to interview namespace: ${socket.userId}`);

    // Join interview room
    socket.on('join-interview', async ({ interviewId }) => {
      try {
        const interview = await Interview.findById(interviewId);

        if (!interview) {
          return socket.emit('error', { message: 'Interview not found' });
        }

        if (interview.userId.toString() !== socket.userId.toString()) {
          return socket.emit('error', { message: 'Unauthorized' });
        }

        socket.join(interviewId);
        socket.interviewId = interviewId;
        socket.currentQuestionIndex = 0;

        socket.emit('interview-joined', {
          interviewId,
          currentQuestion: interview.questions[0],
          totalQuestions: interview.questions.length
        });

        console.log(`User ${socket.userId} joined interview ${interviewId}`);
      } catch (error) {
        console.error('Join interview error:', error);
        socket.emit('error', { message: 'Failed to join interview' });
      }
    });

    // Submit answer and get next question
    socket.on('submit-answer', async ({ interviewId, questionIndex, answer }) => {
      try {
        const interview = await Interview.findById(interviewId);

        if (!interview) {
          return socket.emit('error', { message: 'Interview not found' });
        }

        // Save answer
        if (interview.questions[questionIndex]) {
          interview.questions[questionIndex].response = {
            text: answer.text,
            audioData: answer.audioData, // Base64 encoded
            duration: answer.duration
          };
          await interview.save();
        }

        // Emit progress
        socket.emit('answer-saved', {
          questionIndex,
          progress: Math.round(((questionIndex + 1) / interview.questions.length) * 100)
        });

        // Check if more questions
        if (questionIndex < interview.questions.length - 1) {
          const nextQuestion = interview.questions[questionIndex + 1];
          socket.currentQuestionIndex = questionIndex + 1;

          socket.emit('next-question', {
            question: nextQuestion,
            questionIndex: questionIndex + 1,
            totalQuestions: interview.questions.length
          });
        } else {
          // Interview complete
          socket.emit('interview-complete', {
            interviewId,
            message: 'Interview completed successfully'
          });
        }
      } catch (error) {
        console.error('Submit answer error:', error);
        socket.emit('error', { message: 'Failed to submit answer' });
      }
    });

    // Pause interview
    socket.on('pause-interview', async ({ interviewId }) => {
      try {
        await Interview.findByIdAndUpdate(interviewId, {
          status: 'paused'
        });

        socket.emit('interview-paused', {
          message: 'Interview paused'
        });
      } catch (error) {
        console.error('Pause interview error:', error);
        socket.emit('error', { message: 'Failed to pause interview' });
      }
    });

    // Resume interview
    socket.on('resume-interview', async ({ interviewId }) => {
      try {
        const interview = await Interview.findByIdAndUpdate(
          interviewId,
          { status: 'in-progress' },
          { new: true }
        );

        socket.emit('interview-resumed', {
          currentQuestion: interview.questions[socket.currentQuestionIndex],
          questionIndex: socket.currentQuestionIndex
        });
      } catch (error) {
        console.error('Resume interview error:', error);
        socket.emit('error', { message: 'Failed to resume interview' });
      }
    });

    // Disconnect
    socket.on('disconnect', () => {
      console.log(`❌ User disconnected from interview namespace: ${socket.userId}`);
    });
  });
};
