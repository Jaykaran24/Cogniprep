import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import Button from './Button';
import { authAPI } from '../services/api';

/**
 * SignInForm Component
 * Beautiful glassmorphism signin form with validation
 */
const SignInForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const validateField = (name, value) => {
    switch (name) {
      case 'email':
        if (!value.trim()) return 'Email is required';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Please enter a valid email address';
        return '';
      
      case 'password':
        if (!value) return 'Password is required';
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
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    
    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    setErrors(newErrors);
    setTouched({
      email: true,
      password: true
    });

    // If no errors, proceed with signin
    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      
      try {
        const response = await authAPI.signin({
          email: formData.email,
          password: formData.password,
        });

        if (response.data.success) {
          // Store auth data
          localStorage.setItem('token', response.data.data.token);
          localStorage.setItem('user', JSON.stringify(response.data.data.user));
          localStorage.setItem('isAuthenticated', 'true');
          localStorage.setItem('userName', response.data.data.user.fullName || response.data.data.user.name || 'User');
          
          console.log('✅ Sign in successful!');
          navigate('/dashboard');
        }
      } catch (error) {
        console.error('Sign in error:', error);
        setApiError(error.message || 'Sign in failed. Please check your credentials.');
      } finally {
        setLoading(false);
      }
    }
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
            Welcome Back
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-blue-200 dark:text-blue-300"
          >
            Sign in to continue your preparation
          </motion.p>
        </div>

        {/* API Error Message */}
        {apiError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-4 bg-red-500/20 border border-red-500/50 rounded-xl flex items-start space-x-3"
          >
            <AlertCircle className="text-red-400 flex-shrink-0 mt-0.5" size={20} />
            <p className="text-red-200 text-sm">{apiError}</p>
          </motion.div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
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
                className={`w-full pl-12 pr-4 py-3.5 bg-white/5 border ${
                  errors.email && touched.email
                    ? 'border-red-500/50 focus:border-red-500' 
                    : 'border-white/20 focus:border-blue-500'
                } rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all`}
              />
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
                  errors.password && touched.password
                    ? 'border-red-500/50 focus:border-red-500' 
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

          {/* Forgot Password Link */}
          <div className="flex justify-end">
            <button
              type="button"
              className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
            >
              Forgot password?
            </button>
          </div>

          {/* Submit Button */}
          <motion.div
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
            className="pt-2"
          >
            <Button
              type="submit"
              variant="primary"
              fullWidth
              disabled={loading}
              className="py-3.5 text-base font-semibold"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </Button>
          </motion.div>
        </form>

        {/* Sign Up Link */}
        <div className="mt-6 text-center">
          <p className="text-blue-200 dark:text-blue-300">
            Don't have an account?{' '}
            <button
              onClick={() => navigate('/signup')}
              className="text-blue-400 hover:text-blue-300 font-semibold underline underline-offset-4 transition-colors"
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default SignInForm;
