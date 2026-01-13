import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import GlassCard from '../components/GlassCard';
import Button from '../components/Button';
import Navbar from '../components/Navbar';
import { Code, Database, Layers, Coffee, Brain, Settings, ArrowRight, CheckCircle2 } from 'lucide-react';

/**
 * Interview Setup Page with Premium Design
 */
const InterviewSetup = () => {
  const navigate = useNavigate();
  
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedExperience, setSelectedExperience] = useState('');
  const [selectedType, setSelectedType] = useState('');

  const roles = [
    { id: 'frontend', name: 'Frontend', icon: Code, color: 'from-blue-500 to-cyan-500' },
    { id: 'backend', name: 'Backend', icon: Database, color: 'from-green-500 to-emerald-500' },
    { id: 'fullstack', name: 'Full Stack', icon: Layers, color: 'from-purple-500 to-pink-500' },
    { id: 'java', name: 'Java', icon: Coffee, color: 'from-orange-500 to-red-500' },
    { id: 'python', name: 'Python', icon: Brain, color: 'from-yellow-500 to-orange-500' },
    { id: 'devops', name: 'DevOps', icon: Settings, color: 'from-indigo-500 to-blue-500' },
  ];

  const experienceLevels = [
    { id: 'fresher', name: 'Fresher', description: '0-1 years' },
    { id: 'intermediate', name: '1-3 Years', description: 'Intermediate' },
    { id: 'experienced', name: '3+ Years', description: 'Experienced' },
  ];

  const interviewTypes = [
    { id: 'technical', name: 'Technical', description: 'Coding & problem solving' },
    { id: 'hr', name: 'HR Round', description: 'Behavioral questions' },
    { id: 'mixed', name: 'Mixed', description: 'Technical + HR' },
  ];

  const handleStartInterview = () => {
    if (selectedRole && selectedExperience && selectedType) {
      navigate('/interview', {
        state: { role: selectedRole, experience: selectedExperience, type: selectedType }
      });
    }
  };

  const isFormComplete = selectedRole && selectedExperience && selectedType;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-900 dark:via-purple-900 dark:to-black">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Setup Your Interview
          </h1>
          <p className="text-xl text-purple-100 dark:text-purple-200">
            Configure your practice session in 3 simple steps
          </p>
        </motion.div>

        {/* Progress Indicator */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-center gap-3 mb-12"
        >
          {[1, 2, 3].map((step) => (
            <React.Fragment key={step}>
              <motion.div
                whileHover={{ scale: 1.1 }}
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold backdrop-blur-xl border-2 transition-all duration-300 ${
                  (step === 1 && selectedRole) || (step === 2 && selectedExperience) || (step === 3 && selectedType)
                    ? 'bg-white text-purple-600 border-white shadow-lg'
                    : 'bg-white/10 text-white border-white/30'
                }`}
              >
                {((step === 1 && selectedRole) || (step === 2 && selectedExperience) || (step === 3 && selectedType)) ? (
                  <CheckCircle2 size={20} />
                ) : (
                  step
                )}
              </motion.div>
              {step < 3 && (
                <div className={`h-1 w-16 rounded transition-all duration-300 ${
                  (step === 1 && selectedRole) || (step === 2 && selectedExperience)
                    ? 'bg-white'
                    : 'bg-white/20'
                }`} />
              )}
            </React.Fragment>
          ))}
        </motion.div>

        {/* Job Role Selection */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-white mb-6">1. Select Job Role</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {roles.map((role, index) => (
              <GlassCard
                key={role.id}
                hoverable
                selected={selectedRole === role.id}
                onClick={() => setSelectedRole(role.id)}
                delay={0.4 + index * 0.05}
              >
                <div className="text-center">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className={`w-14 h-14 bg-gradient-to-br ${role.color} rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg`}
                  >
                    <role.icon className="text-white" size={28} />
                  </motion.div>
                  <h3 className="font-semibold text-white">{role.name}</h3>
                </div>
              </GlassCard>
            ))}
          </div>
        </motion.div>

        {/* Experience Level Selection */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-white mb-6">2. Experience Level</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {experienceLevels.map((level, index) => (
              <GlassCard
                key={level.id}
                hoverable
                selected={selectedExperience === level.id}
                onClick={() => setSelectedExperience(level.id)}
                delay={0.6 + index * 0.1}
              >
                <div className="text-center">
                  <div className="text-xl font-bold text-white mb-2">{level.name}</div>
                  <p className="text-sm text-purple-100 dark:text-purple-200">{level.description}</p>
                </div>
              </GlassCard>
            ))}
          </div>
        </motion.div>

        {/* Interview Type Selection */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-white mb-6">3. Interview Type</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {interviewTypes.map((type, index) => (
              <GlassCard
                key={type.id}
                hoverable
                selected={selectedType === type.id}
                onClick={() => setSelectedType(type.id)}
                delay={0.8 + index * 0.1}
              >
                <div className="text-center">
                  <div className="text-xl font-bold text-white mb-2">{type.name}</div>
                  <p className="text-sm text-purple-100 dark:text-purple-200">{type.description}</p>
                </div>
              </GlassCard>
            ))}
          </div>
        </motion.div>

        {/* Start Interview Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="text-center"
        >
          <Button
            size="lg"
            onClick={handleStartInterview}
            disabled={!isFormComplete}
            icon={ArrowRight}
          >
            Start Interview
          </Button>
          {!isFormComplete && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-purple-100 dark:text-purple-200 mt-4"
            >
              ✨ Complete all selections to start your interview
            </motion.p>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default InterviewSetup;
