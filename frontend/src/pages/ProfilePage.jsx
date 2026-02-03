import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Calendar,
  MapPin,
  Briefcase,
  Award,
  Target,
  TrendingUp,
  Edit2,
  Save,
  X,
  Camera,
  CheckCircle2
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Button from '../components/Button';

/**
 * ProfilePage Component
 * User profile management with editable fields
 */
const ProfilePage = () => {
  // Get user data from localStorage or use defaults
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: localStorage.getItem('userName') || 'John Doe',
    email: localStorage.getItem('userEmail') || 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    jobTitle: 'Senior Frontend Developer',
    company: 'Tech Corp',
    experience: '5 years',
    joinDate: '2026-01-01',
    bio: 'Passionate software engineer with expertise in React, TypeScript, and modern web technologies. Currently preparing for senior engineering roles at top tech companies.',
  });

  const [editedData, setEditedData] = useState(profileData);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Stats data
  const stats = [
    { 
      icon: Target, 
      label: 'Interviews Completed', 
      value: 12, 
      color: 'from-blue-500 to-cyan-500' 
    },
    { 
      icon: Award, 
      label: 'Average Score', 
      value: '85%', 
      color: 'from-purple-500 to-pink-500' 
    },
    { 
      icon: TrendingUp, 
      label: 'Improvement Rate', 
      value: '+15%', 
      color: 'from-green-500 to-emerald-500' 
    },
    { 
      icon: Calendar, 
      label: 'Current Streak', 
      value: '5 days', 
      color: 'from-orange-500 to-red-500' 
    }
  ];

  const handleEdit = () => {
    setIsEditing(true);
    setEditedData(profileData);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedData(profileData);
  };

  const handleSave = () => {
    setProfileData(editedData);
    // Save to localStorage
    localStorage.setItem('userName', editedData.fullName);
    localStorage.setItem('userEmail', editedData.email);
    localStorage.setItem('userProfile', JSON.stringify(editedData));
    setIsEditing(false);
    
    // Show success message
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleChange = (field, value) => {
    setEditedData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 dark:from-gray-900 dark:via-blue-950 dark:to-black">
      <Navbar />

      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Success Message */}
          {saveSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="fixed top-24 right-8 z-50 bg-green-500 text-white px-6 py-3 rounded-xl shadow-xl flex items-center gap-2"
            >
              <CheckCircle2 size={20} />
              Profile updated successfully!
            </motion.div>
          )}

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-bold text-white mb-2">
              My Profile 👤
            </h1>
            <p className="text-blue-200 dark:text-blue-300 text-lg">
              Manage your personal information and view your progress
            </p>
          </motion.div>

          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="bg-white/10 dark:bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/20 mb-8"
          >
            <div className="flex flex-col md:flex-row gap-8">
              {/* Avatar Section */}
              <div className="flex flex-col items-center">
                <div className="relative group">
                  <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-2xl">
                    {profileData.fullName.charAt(0)}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute bottom-0 right-0 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Camera size={20} />
                  </motion.button>
                </div>
                <div className="mt-4 text-center">
                  <h3 className="text-xl font-bold text-white">{profileData.fullName}</h3>
                  <p className="text-blue-200 dark:text-blue-300">{profileData.jobTitle}</p>
                </div>
              </div>

              {/* Info Section */}
              <div className="flex-1">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-white">Personal Information</h2>
                  {!isEditing ? (
                    <Button
                      variant="secondary"
                      size="sm"
                      icon={Edit2}
                      onClick={handleEdit}
                    >
                      Edit Profile
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        icon={X}
                        onClick={handleCancel}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="primary"
                        size="sm"
                        icon={Save}
                        onClick={handleSave}
                      >
                        Save
                      </Button>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-medium text-blue-200 dark:text-blue-300 mb-2">
                      <User size={16} className="inline mr-2" />
                      Full Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedData.fullName}
                        onChange={(e) => handleChange('fullName', e.target.value)}
                        className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                      />
                    ) : (
                      <p className="text-white font-medium">{profileData.fullName}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-blue-200 dark:text-blue-300 mb-2">
                      <Mail size={16} className="inline mr-2" />
                      Email
                    </label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={editedData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                      />
                    ) : (
                      <p className="text-white font-medium">{profileData.email}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-blue-200 dark:text-blue-300 mb-2">
                      📱 Phone
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={editedData.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                      />
                    ) : (
                      <p className="text-white font-medium">{profileData.phone}</p>
                    )}
                  </div>

                  {/* Location */}
                  <div>
                    <label className="block text-sm font-medium text-blue-200 dark:text-blue-300 mb-2">
                      <MapPin size={16} className="inline mr-2" />
                      Location
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedData.location}
                        onChange={(e) => handleChange('location', e.target.value)}
                        className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                      />
                    ) : (
                      <p className="text-white font-medium">{profileData.location}</p>
                    )}
                  </div>

                  {/* Job Title */}
                  <div>
                    <label className="block text-sm font-medium text-blue-200 dark:text-blue-300 mb-2">
                      <Briefcase size={16} className="inline mr-2" />
                      Job Title
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedData.jobTitle}
                        onChange={(e) => handleChange('jobTitle', e.target.value)}
                        className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                      />
                    ) : (
                      <p className="text-white font-medium">{profileData.jobTitle}</p>
                    )}
                  </div>

                  {/* Company */}
                  <div>
                    <label className="block text-sm font-medium text-blue-200 dark:text-blue-300 mb-2">
                      🏢 Company
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedData.company}
                        onChange={(e) => handleChange('company', e.target.value)}
                        className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                      />
                    ) : (
                      <p className="text-white font-medium">{profileData.company}</p>
                    )}
                  </div>

                  {/* Experience */}
                  <div>
                    <label className="block text-sm font-medium text-blue-200 dark:text-blue-300 mb-2">
                      ⏱️ Experience
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedData.experience}
                        onChange={(e) => handleChange('experience', e.target.value)}
                        className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                      />
                    ) : (
                      <p className="text-white font-medium">{profileData.experience}</p>
                    )}
                  </div>

                  {/* Join Date */}
                  <div>
                    <label className="block text-sm font-medium text-blue-200 dark:text-blue-300 mb-2">
                      <Calendar size={16} className="inline mr-2" />
                      Member Since
                    </label>
                    <p className="text-white font-medium">
                      {new Date(profileData.joinDate).toLocaleDateString('en-US', {
                        month: 'long',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                </div>

                {/* Bio */}
                <div className="mt-4">
                  <label className="block text-sm font-medium text-blue-200 dark:text-blue-300 mb-2">
                    📝 Bio
                  </label>
                  {isEditing ? (
                    <textarea
                      value={editedData.bio}
                      onChange={(e) => handleChange('bio', e.target.value)}
                      rows={4}
                      className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none"
                    />
                  ) : (
                    <p className="text-white leading-relaxed">{profileData.bio}</p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-white mb-4">Performance Overview</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/10 dark:bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/20"
                >
                  <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
                    <stat.icon className="text-white" size={24} />
                  </div>
                  <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-blue-200 dark:text-blue-300">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
