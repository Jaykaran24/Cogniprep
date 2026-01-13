import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Eye, EyeOff, CheckCircle2, AlertCircle } from 'lucide-react';
import Button from './Button';

/**
 * SignupForm Component
 * Beautiful glassmorphism signup form with validation
 */
const SignupForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateField = (name, value) => {
    switch (name) {
      case 'fullName':
        if (!value.trim()) return 'Full name is required';
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        return '';
      
      case 'email':
        if (!value.trim()) return 'Email is required';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Please enter a valid email address';
        return '';
      
      case 'password':
        if (!value) return 'Password is required';
        if (value.length < 8) return 'Password must be at least 8 characters';
        if (!/(?=.*[a-z])/.test(value)) return 'Password must contain a lowercase letter';
        if (!/(?=.*[A-Z])/.test(value)) return 'Password must contain an uppercase letter';
        if (!/(?=.*\d)/.test(value)) return 'Password must contain a number';
        return '';
      
      case 'confirmPassword':
        if (!value) return 'Please confirm your password';
        if (value !== formData.password) return 'Passwords do not match';
        return '';
      
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Validate on change if field was touched
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }

    // Also revalidate confirmPassword if password changes
    if (name === 'password' && touched.confirmPassword) {
      const confirmError = validateField('confirmPassword', formData.confirmPassword);
      setErrors(prev => ({ ...prev, confirmPassword: confirmError }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    setErrors(newErrors);
    setTouched({
      fullName: true,
      email: true,
      password: true,
      confirmPassword: true
    });

    // If no errors, proceed with signup
    if (Object.keys(newErrors).length === 0) {
      console.log('Signup successful!', formData);
      // Store auth state in localStorage
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userName', formData.fullName);
      // Navigate to dashboard after successful signup
      navigate('/dashboard');
    }
  };

  const getFieldStatus = (fieldName) => {
    if (!touched[fieldName]) return null;
    return errors[fieldName] ? 'error' : 'success';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-md"
    >
      <div className="bg-white/10 dark:bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-bold text-white mb-2"
          >
            Create Account
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-blue-200 dark:text-blue-300"
          >
            Start your interview preparation journey
          </motion.p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name Field */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Full Name
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <User size={20} />
              </div>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="John Doe"
                className={`w-full pl-12 pr-12 py-3.5 bg-white/5 border ${
                  getFieldStatus('fullName') === 'error' 
                    ? 'border-red-500/50 focus:border-red-500' 
                    : getFieldStatus('fullName') === 'success'
                    ? 'border-green-500/50 focus:border-green-500'
                    : 'border-white/20 focus:border-blue-500'
                } rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all`}
              />
              {getFieldStatus('fullName') && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  {getFieldStatus('fullName') === 'error' ? (
                    <AlertCircle size={20} className="text-red-500" />
                  ) : (
                    <CheckCircle2 size={20} className="text-green-500" />
                  )}
                </div>
              )}
            </div>
            {errors.fullName && touched.fullName && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-sm mt-1.5 flex items-center gap-1"
              >
                <AlertCircle size={14} />
                {errors.fullName}
              </motion.p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <Mail size={20} />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="john@example.com"
                className={`w-full pl-12 pr-12 py-3.5 bg-white/5 border ${
                  getFieldStatus('email') === 'error' 
                    ? 'border-red-500/50 focus:border-red-500' 
                    : getFieldStatus('email') === 'success'
                    ? 'border-green-500/50 focus:border-green-500'
                    : 'border-white/20 focus:border-blue-500'
                } rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all`}
              />
              {getFieldStatus('email') && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  {getFieldStatus('email') === 'error' ? (
                    <AlertCircle size={20} className="text-red-500" />
                  ) : (
                    <CheckCircle2 size={20} className="text-green-500" />
                  )}
                </div>
              )}
            </div>
            {errors.email && touched.email && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-sm mt-1.5 flex items-center gap-1"
              >
                <AlertCircle size={14} />
                {errors.email}
              </motion.p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Password
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <Lock size={20} />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="••••••••"
                className={`w-full pl-12 pr-12 py-3.5 bg-white/5 border ${
                  getFieldStatus('password') === 'error' 
                    ? 'border-red-500/50 focus:border-red-500' 
                    : getFieldStatus('password') === 'success'
                    ? 'border-green-500/50 focus:border-green-500'
                    : 'border-white/20 focus:border-blue-500'
                } rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && touched.password && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-sm mt-1.5 flex items-center gap-1"
              >
                <AlertCircle size={14} />
                {errors.password}
              </motion.p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <Lock size={20} />
              </div>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="••••••••"
                className={`w-full pl-12 pr-12 py-3.5 bg-white/5 border ${
                  getFieldStatus('confirmPassword') === 'error' 
                    ? 'border-red-500/50 focus:border-red-500' 
                    : getFieldStatus('confirmPassword') === 'success'
                    ? 'border-green-500/50 focus:border-green-500'
                    : 'border-white/20 focus:border-blue-500'
                } rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.confirmPassword && touched.confirmPassword && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-sm mt-1.5 flex items-center gap-1"
              >
                <AlertCircle size={14} />
                {errors.confirmPassword}
              </motion.p>
            )}
          </div>

          {/* Submit Button */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="pt-2"
          >
            <Button
              type="submit"
              variant="primary"
              fullWidth
              className="py-3.5 text-base font-semibold"
            >
              Create Account
            </Button>
          </motion.div>
        </form>

        {/* Sign In Link */}
        <div className="mt-6 text-center">
          <p className="text-blue-200 dark:text-blue-300">
            Already have an account?{' '}
            <button
              onClick={() => navigate('/signin')}
              className="text-blue-400 hover:text-blue-300 font-semibold underline underline-offset-4 transition-colors"
            >
              Sign In
            </button>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default SignupForm;
