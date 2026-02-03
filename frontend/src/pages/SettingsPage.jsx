import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings as SettingsIcon,
  Bell,
  Shield,
  Eye,
  Volume2,
  Globe,
  Moon,
  Sun,
  Mail,
  Smartphone,
  Lock,
  Key,
  Trash2,
  Download,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import { useTheme } from '../hooks/useTheme';

/**
 * SettingsPage Component
 * Application settings and preferences management
 */
const SettingsPage = () => {
  const { isDark, toggleTheme } = useTheme();
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Settings state
  const [settings, setSettings] = useState({
    // Notifications
    emailNotifications: true,
    pushNotifications: false,
    interviewReminders: true,
    weeklyReports: true,
    newFeatures: false,
    
    // Privacy
    profileVisibility: 'private',
    showProgress: true,
    allowAnalytics: true,
    
    // Appearance
    theme: isDark ? 'dark' : 'light',
    language: 'en',
    
    // Audio/Video
    micEnabled: true,
    cameraEnabled: true,
    soundEffects: true,
    
    // Account
    twoFactorAuth: false,
  });

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('userSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const handleToggle = (setting) => {
    setSettings(prev => {
      const newSettings = { ...prev, [setting]: !prev[setting] };
      // Save to localStorage
      localStorage.setItem('userSettings', JSON.stringify(newSettings));
      return newSettings;
    });
    showSuccessMessage();
  };

  const handleSelect = (setting, value) => {
    setSettings(prev => {
      const newSettings = { ...prev, [setting]: value };
      // Save to localStorage
      localStorage.setItem('userSettings', JSON.stringify(newSettings));
      return newSettings;
    });
    
    // Handle theme change
    if (setting === 'theme') {
      const shouldBeDark = value === 'dark';
      if (isDark !== shouldBeDark) {
        toggleTheme();
      }
    }
    
    showSuccessMessage();
  };

  const showSuccessMessage = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const handleExportData = () => {
    const userData = {
      profile: JSON.parse(localStorage.getItem('userProfile') || '{}'),
      settings: settings,
      exportDate: new Date().toISOString()
    };
    const dataStr = JSON.stringify(userData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'cogniprep-data.json';
    link.click();
    showSuccessMessage();
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      // Clear all user data
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('userName');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userProfile');
      localStorage.removeItem('userSettings');
      window.location.href = '/';
    }
  };

  const ToggleSwitch = ({ enabled, onToggle, label, description }) => (
    <div className="flex items-center justify-between py-4 border-b border-white/10">
      <div className="flex-1">
        <h3 className="text-white font-medium mb-1">{label}</h3>
        <p className="text-sm text-blue-200 dark:text-blue-300">{description}</p>
      </div>
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={onToggle}
        className={`relative w-14 h-7 rounded-full transition-colors ${
          enabled ? 'bg-blue-500' : 'bg-white/20'
        }`}
      >
        <motion.div
          animate={{ x: enabled ? 28 : 2 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className="absolute top-1 w-5 h-5 bg-white rounded-full shadow-lg"
        />
      </motion.button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 dark:from-gray-900 dark:via-blue-950 dark:to-black">
      <Navbar />

      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Success Message */}
          {saveSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="fixed top-24 right-8 z-50 bg-green-500 text-white px-6 py-3 rounded-xl shadow-xl flex items-center gap-2"
            >
              <CheckCircle2 size={20} />
              Settings saved!
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
              Settings ⚙️
            </h1>
            <p className="text-blue-200 dark:text-blue-300 text-lg">
              Manage your account preferences and application settings
            </p>
          </motion.div>

          {/* Notifications Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="bg-white/10 dark:bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/20 mb-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <Bell className="text-white" size={20} />
              </div>
              <h2 className="text-2xl font-bold text-white">Notifications</h2>
            </div>

            <div className="space-y-2">
              <ToggleSwitch
                enabled={settings.emailNotifications}
                onToggle={() => handleToggle('emailNotifications')}
                label="Email Notifications"
                description="Receive updates and reminders via email"
              />
              <ToggleSwitch
                enabled={settings.pushNotifications}
                onToggle={() => handleToggle('pushNotifications')}
                label="Push Notifications"
                description="Get browser notifications for important updates"
              />
              <ToggleSwitch
                enabled={settings.interviewReminders}
                onToggle={() => handleToggle('interviewReminders')}
                label="Interview Reminders"
                description="Receive reminders before scheduled interviews"
              />
              <ToggleSwitch
                enabled={settings.weeklyReports}
                onToggle={() => handleToggle('weeklyReports')}
                label="Weekly Progress Reports"
                description="Get weekly summaries of your performance"
              />
              <ToggleSwitch
                enabled={settings.newFeatures}
                onToggle={() => handleToggle('newFeatures')}
                label="New Features Announcements"
                description="Be notified when new features are released"
              />
            </div>
          </motion.div>

          {/* Privacy Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="bg-white/10 dark:bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/20 mb-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Shield className="text-white" size={20} />
              </div>
              <h2 className="text-2xl font-bold text-white">Privacy & Security</h2>
            </div>

            <div className="space-y-4">
              <div className="py-4 border-b border-white/10">
                <label className="block text-white font-medium mb-3">Profile Visibility</label>
                <div className="flex gap-2">
                  {['public', 'private', 'friends'].map((option) => (
                    <button
                      key={option}
                      onClick={() => handleSelect('profileVisibility', option)}
                      className={`px-4 py-2 rounded-xl font-medium transition-all ${
                        settings.profileVisibility === option
                          ? 'bg-blue-500 text-white'
                          : 'bg-white/10 text-white hover:bg-white/20'
                      }`}
                    >
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <ToggleSwitch
                enabled={settings.showProgress}
                onToggle={() => handleToggle('showProgress')}
                label="Show Progress Publicly"
                description="Allow others to see your interview statistics"
              />
              <ToggleSwitch
                enabled={settings.allowAnalytics}
                onToggle={() => handleToggle('allowAnalytics')}
                label="Usage Analytics"
                description="Help us improve by sharing anonymous usage data"
              />
              <ToggleSwitch
                enabled={settings.twoFactorAuth}
                onToggle={() => handleToggle('twoFactorAuth')}
                label="Two-Factor Authentication"
                description="Add an extra layer of security to your account"
              />
            </div>
          </motion.div>

          {/* Appearance Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="bg-white/10 dark:bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/20 mb-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                <Eye className="text-white" size={20} />
              </div>
              <h2 className="text-2xl font-bold text-white">Appearance</h2>
            </div>

            <div className="space-y-4">
              <div className="py-4 border-b border-white/10">
                <label className="block text-white font-medium mb-3">Theme</label>
                <div className="flex gap-2">
                  {['light', 'dark', 'auto'].map((theme) => (
                    <button
                      key={theme}
                      onClick={() => handleSelect('theme', theme)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${
                        settings.theme === theme
                          ? 'bg-blue-500 text-white'
                          : 'bg-white/10 text-white hover:bg-white/20'
                      }`}
                    >
                      {theme === 'light' && <Sun size={16} />}
                      {theme === 'dark' && <Moon size={16} />}
                      {theme === 'auto' && <SettingsIcon size={16} />}
                      {theme.charAt(0).toUpperCase() + theme.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="py-4">
                <label className="block text-white font-medium mb-3">Language</label>
                <select
                  value={settings.language}
                  onChange={(e) => handleSelect('language', e.target.value)}
                  className="px-4 py-2 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 cursor-pointer"
                >
                  <option value="en" className="bg-gray-800">English</option>
                  <option value="es" className="bg-gray-800">Español</option>
                  <option value="fr" className="bg-gray-800">Français</option>
                  <option value="de" className="bg-gray-800">Deutsch</option>
                  <option value="zh" className="bg-gray-800">中文</option>
                </select>
              </div>
            </div>
          </motion.div>

          {/* Audio/Video Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="bg-white/10 dark:bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/20 mb-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                <Volume2 className="text-white" size={20} />
              </div>
              <h2 className="text-2xl font-bold text-white">Audio & Video</h2>
            </div>

            <div className="space-y-2">
              <ToggleSwitch
                enabled={settings.micEnabled}
                onToggle={() => handleToggle('micEnabled')}
                label="Microphone Access"
                description="Allow microphone for voice recording in interviews"
              />
              <ToggleSwitch
                enabled={settings.cameraEnabled}
                onToggle={() => handleToggle('cameraEnabled')}
                label="Camera Access"
                description="Enable camera for video practice sessions"
              />
              <ToggleSwitch
                enabled={settings.soundEffects}
                onToggle={() => handleToggle('soundEffects')}
                label="Sound Effects"
                description="Play sound effects for notifications and actions"
              />
            </div>
          </motion.div>

          {/* Account Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="bg-white/10 dark:bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/20"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-xl flex items-center justify-center">
                <Lock className="text-white" size={20} />
              </div>
              <h2 className="text-2xl font-bold text-white">Account Management</h2>
            </div>

            <div className="space-y-4">
              <Button
                variant="secondary"
                fullWidth
                icon={Key}
                onClick={() => alert('Password change functionality coming soon!')}
              >
                Change Password
              </Button>
              
              <Button
                variant="secondary"
                fullWidth
                icon={Download}
                onClick={handleExportData}
              >
                Export My Data
              </Button>

              <div className="pt-4 border-t border-white/10">
                <div className="flex items-start gap-3 mb-4 p-4 bg-red-500/10 rounded-xl border border-red-500/20">
                  <AlertCircle className="text-red-400 flex-shrink-0 mt-1" size={20} />
                  <div>
                    <h3 className="text-red-400 font-semibold mb-1">Danger Zone</h3>
                    <p className="text-sm text-red-300">
                      Once you delete your account, there is no going back. Please be certain.
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  fullWidth
                  icon={Trash2}
                  onClick={handleDeleteAccount}
                  className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border-red-500/20"
                >
                  Delete Account
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
