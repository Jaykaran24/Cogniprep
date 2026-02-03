/**
 * Question Seeding Script
 * Run with: node scripts/seedQuestions.js
 */

require('dotenv').config();
const mongoose = require('mongoose');
const Question = require('../models/Question.model');

const questions = [
  // FRONTEND QUESTIONS
  {
    category: 'frontend',
    difficulty: 'beginner',
    text: 'Tell me about your experience with React and modern frontend frameworks.',
    type: 'behavioral',
    expectedKeywords: ['react', 'components', 'hooks', 'state', 'props', 'jsx'],
    timeLimit: 180
  },
  {
    category: 'frontend',
    difficulty: 'beginner',
    text: 'What is the difference between var, let, and const in JavaScript?',
    type: 'technical',
    expectedKeywords: ['scope', 'hoisting', 'block', 'reassignment', 'mutable', 'immutable'],
    timeLimit: 120
  },
  {
    category: 'frontend',
    difficulty: 'intermediate',
    text: 'Explain the concept of React Hooks. Which hooks have you used and why?',
    type: 'technical',
    expectedKeywords: ['useState', 'useEffect', 'useContext', 'useRef', 'custom hooks', 'side effects'],
    timeLimit: 180
  },
  {
    category: 'frontend',
    difficulty: 'intermediate',
    text: 'How do you handle state management in large React applications?',
    type: 'technical',
    expectedKeywords: ['redux', 'context api', 'state', 'zustand', 'recoil', 'global state'],
    timeLimit: 180
  },
  {
    category: 'frontend',
    difficulty: 'advanced',
    text: 'Explain how you would optimize the performance of a React application.',
    type: 'technical',
    expectedKeywords: ['memoization', 'useMemo', 'useCallback', 'lazy loading', 'code splitting', 'virtualization'],
    timeLimit: 240
  },
  {
    category: 'frontend',
    difficulty: 'intermediate',
    text: 'What is the CSS Box Model and how does it work?',
    type: 'technical',
    expectedKeywords: ['content', 'padding', 'border', 'margin', 'box-sizing'],
    timeLimit: 120
  },
  {
    category: 'frontend',
    difficulty: 'beginner',
    text: 'How do you ensure your web applications are accessible?',
    type: 'technical',
    expectedKeywords: ['wcag', 'aria', 'semantic html', 'keyboard navigation', 'screen readers'],
    timeLimit: 180
  },
  {
    category: 'frontend',
    difficulty: 'intermediate',
    text: 'Explain the concept of responsive design and how you implement it.',
    type: 'technical',
    expectedKeywords: ['media queries', 'mobile-first', 'flexbox', 'grid', 'breakpoints', 'viewport'],
    timeLimit: 180
  },
  {
    category: 'frontend',
    difficulty: 'advanced',
    text: 'What is Server-Side Rendering (SSR) and when would you use it?',
    type: 'technical',
    expectedKeywords: ['next.js', 'seo', 'initial load', 'hydration', 'performance'],
    timeLimit: 180
  },
  {
    category: 'frontend',
    difficulty: 'intermediate',
    text: 'How do you test React components?',
    type: 'technical',
    expectedKeywords: ['jest', 'react testing library', 'unit tests', 'integration tests', 'mocking'],
    timeLimit: 180
  },

  // BACKEND QUESTIONS
  {
    category: 'backend',
    difficulty: 'beginner',
    text: 'Tell me about your experience with Node.js and backend development.',
    type: 'behavioral',
    expectedKeywords: ['node', 'express', 'api', 'database', 'server', 'backend'],
    timeLimit: 180
  },
  {
    category: 'backend',
    difficulty: 'intermediate',
    text: 'How do you design RESTful APIs? What are the best practices?',
    type: 'technical',
    expectedKeywords: ['rest', 'http methods', 'status codes', 'resources', 'endpoints', 'versioning'],
    timeLimit: 180
  },
  {
    category: 'backend',
    difficulty: 'intermediate',
    text: 'Explain the difference between SQL and NoSQL databases. When would you use each?',
    type: 'technical',
    expectedKeywords: ['relational', 'document', 'schema', 'mongodb', 'postgresql', 'scalability'],
    timeLimit: 180
  },
  {
    category: 'backend',
    difficulty: 'advanced',
    text: 'How would you implement authentication and authorization in a web application?',
    type: 'technical',
    expectedKeywords: ['jwt', 'oauth', 'sessions', 'tokens', 'bcrypt', 'security', 'roles'],
    timeLimit: 240
  },
  {
    category: 'backend',
    difficulty: 'intermediate',
    text: 'What is middleware in Express.js and how have you used it?',
    type: 'technical',
    expectedKeywords: ['request', 'response', 'next', 'error handling', 'authentication', 'logging'],
    timeLimit: 180
  },
  {
    category: 'backend',
    difficulty: 'advanced',
    text: 'How do you handle database migrations and schema changes in production?',
    type: 'technical',
    expectedKeywords: ['migrations', 'versioning', 'rollback', 'backward compatibility', 'deployment'],
    timeLimit: 180
  },
  {
    category: 'backend',
    difficulty: 'intermediate',
    text: 'Explain how you would implement caching in a backend application.',
    type: 'technical',
    expectedKeywords: ['redis', 'memcached', 'cache invalidation', 'ttl', 'performance'],
    timeLimit: 180
  },
  {
    category: 'backend',
    difficulty: 'advanced',
    text: 'What is your approach to handling concurrency and race conditions?',
    type: 'technical',
    expectedKeywords: ['locks', 'transactions', 'atomic operations', 'optimistic locking', 'pessimistic locking'],
    timeLimit: 240
  },
  {
    category: 'backend',
    difficulty: 'intermediate',
    text: 'How do you secure your APIs against common vulnerabilities?',
    type: 'technical',
    expectedKeywords: ['sql injection', 'xss', 'csrf', 'cors', 'rate limiting', 'input validation'],
    timeLimit: 180
  },
  {
    category: 'backend',
    difficulty: 'advanced',
    text: 'Explain microservices architecture and its benefits and challenges.',
    type: 'technical',
    expectedKeywords: ['microservices', 'monolith', 'scalability', 'communication', 'distributed systems'],
    timeLimit: 240
  },

  // FULLSTACK QUESTIONS
  {
    category: 'fullstack',
    difficulty: 'intermediate',
    text: 'Tell me about a full-stack project you\'ve built from scratch.',
    type: 'behavioral',
    expectedKeywords: ['frontend', 'backend', 'database', 'deployment', 'architecture'],
    timeLimit: 240
  },
  {
    category: 'fullstack',
    difficulty: 'intermediate',
    text: 'How do you structure a full-stack application?',
    type: 'technical',
    expectedKeywords: ['architecture', 'separation of concerns', 'api', 'client-server', 'layers'],
    timeLimit: 180
  },
  {
    category: 'fullstack',
    difficulty: 'advanced',
    text: 'Explain how WebSockets work and when you would use them.',
    type: 'technical',
    expectedKeywords: ['websockets', 'real-time', 'bidirectional', 'socket.io', 'persistent connection'],
    timeLimit: 180
  },
  {
    category: 'fullstack',
    difficulty: 'intermediate',
    text: 'How do you handle file uploads in a web application?',
    type: 'technical',
    expectedKeywords: ['multer', 'form data', 'validation', 'storage', 's3', 'security'],
    timeLimit: 180
  },
  {
    category: 'fullstack',
    difficulty: 'advanced',
    text: 'What is your deployment strategy for full-stack applications?',
    type: 'technical',
    expectedKeywords: ['ci/cd', 'docker', 'kubernetes', 'aws', 'vercel', 'environment variables'],
    timeLimit: 240
  },
  {
    category: 'fullstack',
    difficulty: 'intermediate',
    text: 'How do you handle errors across the full stack?',
    type: 'technical',
    expectedKeywords: ['error handling', 'try-catch', 'middleware', 'logging', 'user feedback'],
    timeLimit: 180
  },
  {
    category: 'fullstack',
    difficulty: 'intermediate',
    text: 'Explain how you implement pagination in a full-stack application.',
    type: 'technical',
    expectedKeywords: ['limit', 'offset', 'cursor', 'page number', 'skip', 'query parameters'],
    timeLimit: 180
  },
  {
    category: 'fullstack',
    difficulty: 'advanced',
    text: 'How would you optimize the performance of a full-stack application?',
    type: 'technical',
    expectedKeywords: ['caching', 'cdn', 'lazy loading', 'database indexing', 'code splitting'],
    timeLimit: 240
  },
  {
    category: 'fullstack',
    difficulty: 'intermediate',
    text: 'What testing strategies do you use for full-stack applications?',
    type: 'technical',
    expectedKeywords: ['unit tests', 'integration tests', 'e2e tests', 'jest', 'cypress'],
    timeLimit: 180
  },
  {
    category: 'fullstack',
    difficulty: 'advanced',
    text: 'Explain your approach to monitoring and debugging production issues.',
    type: 'technical',
    expectedKeywords: ['logging', 'monitoring', 'alerts', 'debugging', 'error tracking', 'sentry'],
    timeLimit: 180
  },

  // DATA SCIENCE QUESTIONS
  {
    category: 'data-science',
    difficulty: 'beginner',
    text: 'Tell me about your experience with machine learning and data analysis.',
    type: 'behavioral',
    expectedKeywords: ['machine learning', 'data analysis', 'python', 'models', 'datasets'],
    timeLimit: 180
  },
  {
    category: 'data-science',
    difficulty: 'intermediate',
    text: 'Explain the difference between supervised and unsupervised learning.',
    type: 'technical',
    expectedKeywords: ['supervised', 'unsupervised', 'labels', 'training', 'clustering', 'classification'],
    timeLimit: 180
  },
  {
    category: 'data-science',
    difficulty: 'intermediate',
    text: 'What is overfitting and how do you prevent it?',
    type: 'technical',
    expectedKeywords: ['overfitting', 'regularization', 'cross-validation', 'training data', 'generalization'],
    timeLimit: 180
  },
  {
    category: 'data-science',
    difficulty: 'advanced',
    text: 'Explain how neural networks work and their applications.',
    type: 'technical',
    expectedKeywords: ['neural networks', 'layers', 'activation functions', 'backpropagation', 'deep learning'],
    timeLimit: 240
  },
  {
    category: 'data-science',
    difficulty: 'intermediate',
    text: 'How do you handle missing data in your datasets?',
    type: 'technical',
    expectedKeywords: ['missing data', 'imputation', 'deletion', 'mean', 'median', 'data cleaning'],
    timeLimit: 180
  },
  {
    category: 'data-science',
    difficulty: 'intermediate',
    text: 'What is feature engineering and why is it important?',
    type: 'technical',
    expectedKeywords: ['features', 'transformation', 'scaling', 'encoding', 'dimensionality reduction'],
    timeLimit: 180
  },
  {
    category: 'data-science',
    difficulty: 'advanced',
    text: 'Explain the bias-variance tradeoff in machine learning.',
    type: 'technical',
    expectedKeywords: ['bias', 'variance', 'tradeoff', 'model complexity', 'generalization'],
    timeLimit: 180
  },
  {
    category: 'data-science',
    difficulty: 'intermediate',
    text: 'How do you evaluate the performance of a machine learning model?',
    type: 'technical',
    expectedKeywords: ['accuracy', 'precision', 'recall', 'f1-score', 'confusion matrix', 'roc curve'],
    timeLimit: 180
  },
  {
    category: 'data-science',
    difficulty: 'advanced',
    text: 'What is transfer learning and when would you use it?',
    type: 'technical',
    expectedKeywords: ['transfer learning', 'pre-trained models', 'fine-tuning', 'domain adaptation'],
    timeLimit: 180
  },
  {
    category: 'data-science',
    difficulty: 'intermediate',
    text: 'How do you handle imbalanced datasets?',
    type: 'technical',
    expectedKeywords: ['imbalanced', 'smote', 'oversampling', 'undersampling', 'weighted loss'],
    timeLimit: 180
  },

  // DEVOPS QUESTIONS
  {
    category: 'devops',
    difficulty: 'beginner',
    text: 'Tell me about your experience with DevOps practices and tools.',
    type: 'behavioral',
    expectedKeywords: ['devops', 'ci/cd', 'docker', 'kubernetes', 'automation', 'deployment'],
    timeLimit: 180
  },
  {
    category: 'devops',
    difficulty: 'intermediate',
    text: 'Explain the concept of Infrastructure as Code (IaC).',
    type: 'technical',
    expectedKeywords: ['iac', 'terraform', 'cloudformation', 'automation', 'version control'],
    timeLimit: 180
  },
  {
    category: 'devops',
    difficulty: 'intermediate',
    text: 'What is Docker and how is it different from virtual machines?',
    type: 'technical',
    expectedKeywords: ['docker', 'containers', 'images', 'isolation', 'lightweight', 'virtual machines'],
    timeLimit: 180
  },
  {
    category: 'devops',
    difficulty: 'advanced',
    text: 'Explain Kubernetes architecture and its core components.',
    type: 'technical',
    expectedKeywords: ['kubernetes', 'pods', 'nodes', 'control plane', 'services', 'orchestration'],
    timeLimit: 240
  },
  {
    category: 'devops',
    difficulty: 'intermediate',
    text: 'How do you implement a CI/CD pipeline?',
    type: 'technical',
    expectedKeywords: ['ci/cd', 'jenkins', 'github actions', 'automated testing', 'deployment', 'pipeline'],
    timeLimit: 180
  },
  {
    category: 'devops',
    difficulty: 'intermediate',
    text: 'What monitoring tools have you used and why?',
    type: 'technical',
    expectedKeywords: ['monitoring', 'prometheus', 'grafana', 'metrics', 'alerts', 'logging'],
    timeLimit: 180
  },
  {
    category: 'devops',
    difficulty: 'advanced',
    text: 'How do you ensure high availability in production systems?',
    type: 'technical',
    expectedKeywords: ['high availability', 'redundancy', 'load balancing', 'failover', 'disaster recovery'],
    timeLimit: 240
  },
  {
    category: 'devops',
    difficulty: 'intermediate',
    text: 'Explain the concept of blue-green deployment.',
    type: 'technical',
    expectedKeywords: ['blue-green', 'deployment strategy', 'zero downtime', 'rollback', 'traffic switching'],
    timeLimit: 180
  },
  {
    category: 'devops',
    difficulty: 'intermediate',
    text: 'How do you manage secrets and sensitive configuration?',
    type: 'technical',
    expectedKeywords: ['secrets', 'vault', 'encryption', 'environment variables', 'security'],
    timeLimit: 180
  },
  {
    category: 'devops',
    difficulty: 'advanced',
    text: 'What is your approach to scaling applications in production?',
    type: 'technical',
    expectedKeywords: ['scaling', 'horizontal', 'vertical', 'auto-scaling', 'load balancing', 'performance'],
    timeLimit: 240
  },

  // BEHAVIORAL QUESTIONS (cross-category)
  {
    category: 'general',
    difficulty: 'intermediate',
    text: 'Tell me about a time when you faced a challenging technical problem. How did you solve it?',
    type: 'behavioral',
    expectedKeywords: ['problem', 'solution', 'approach', 'debug', 'analyze', 'research'],
    timeLimit: 240
  },
  {
    category: 'general',
    difficulty: 'intermediate',
    text: 'Describe a situation where you had to learn a new technology quickly.',
    type: 'behavioral',
    expectedKeywords: ['learning', 'technology', 'documentation', 'practice', 'implementation'],
    timeLimit: 180
  },
  {
    category: 'general',
    difficulty: 'intermediate',
    text: 'How do you handle code reviews and feedback from peers?',
    type: 'behavioral',
    expectedKeywords: ['code review', 'feedback', 'collaboration', 'improvement', 'communication'],
    timeLimit: 180
  },
  {
    category: 'general',
    difficulty: 'intermediate',
    text: 'Tell me about a time when you disagreed with a technical decision.',
    type: 'behavioral',
    expectedKeywords: ['disagreement', 'discussion', 'compromise', 'team', 'decision making'],
    timeLimit: 180
  },
  {
    category: 'general',
    difficulty: 'intermediate',
    text: 'Describe your approach to writing clean and maintainable code.',
    type: 'behavioral',
    expectedKeywords: ['clean code', 'readability', 'patterns', 'best practices', 'documentation'],
    timeLimit: 180
  },
  {
    category: 'general',
    difficulty: 'intermediate',
    text: 'How do you stay updated with the latest technology trends?',
    type: 'behavioral',
    expectedKeywords: ['learning', 'blogs', 'conferences', 'community', 'practice', 'open source'],
    timeLimit: 180
  },
  {
    category: 'general',
    difficulty: 'intermediate',
    text: 'Tell me about a project where you had to work with a difficult team member.',
    type: 'behavioral',
    expectedKeywords: ['teamwork', 'communication', 'conflict resolution', 'collaboration'],
    timeLimit: 240
  },
  {
    category: 'general',
    difficulty: 'intermediate',
    text: 'Describe a time when you had to meet a tight deadline.',
    type: 'behavioral',
    expectedKeywords: ['deadline', 'time management', 'prioritization', 'pressure', 'delivery'],
    timeLimit: 180
  },
  {
    category: 'general',
    difficulty: 'intermediate',
    text: 'How do you approach debugging complex issues?',
    type: 'behavioral',
    expectedKeywords: ['debugging', 'systematic', 'logs', 'reproduction', 'root cause', 'testing'],
    timeLimit: 180
  },
  {
    category: 'general',
    difficulty: 'intermediate',
    text: 'Tell me about a time when you mentored or helped a junior developer.',
    type: 'behavioral',
    expectedKeywords: ['mentoring', 'teaching', 'guidance', 'knowledge sharing', 'patience'],
    timeLimit: 180
  }
];

async function seedQuestions() {
  try {
    // Connect to MongoDB
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing questions
    console.log('🔄 Clearing existing questions...');
    await Question.deleteMany({});
    console.log('✅ Cleared existing questions');

    // Insert new questions
    console.log('🔄 Inserting new questions...');
    const result = await Question.insertMany(questions);
    console.log(`✅ Successfully inserted ${result.length} questions`);

    // Show count by category
    const categories = await Question.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    console.log('\n📊 Questions by category:');
    categories.forEach(cat => {
      console.log(`   ${cat._id}: ${cat.count} questions`);
    });

    console.log('\n🎉 Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seeding function
seedQuestions();
