import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Video, 
  BookOpen, 
  TrendingUp,
  X
} from 'lucide-react';

/**
 * Sidebar Navigation Component
 * Displays main navigation options after authentication
 */
const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      icon: LayoutDashboard,
      label: 'Dashboard',
      path: '/dashboard',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Video,
      label: 'Interview',
      path: '/interviews',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: BookOpen,
      label: 'Prepare',
      path: '/prepare',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: TrendingUp,
      label: 'Performance',
      path: '/analytics',
      color: 'from-orange-500 to-red-500'
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
    if (onClose) onClose();
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar - Always visible on desktop, toggle on mobile */}
      <motion.aside
        initial={false}
        animate={{ x: isOpen || window.innerWidth >= 1024 ? 0 : -300 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white/10 dark:bg-black/20 backdrop-blur-xl border-r border-white/20 z-40 lg:translate-x-0"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/20">
            <h2 className="text-xl font-bold text-white">Menu</h2>
            <button
              onClick={onClose}
              className="lg:hidden text-white hover:text-blue-300 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              const active = isActive(item.path);

              return (
                <motion.button
                  key={index}
                  onClick={() => handleNavigation(item.path)}
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all duration-300 ${
                    active
                      ? 'bg-white/20 border border-white/30 shadow-lg'
                      : 'bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg`}
                  >
                    <Icon className="text-white" size={20} />
                  </div>
                  <span
                    className={`font-semibold ${
                      active ? 'text-white' : 'text-blue-100 dark:text-blue-200'
                    }`}
                  >
                    {item.label}
                  </span>
                </motion.button>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-white/20">
            <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl p-4 border border-white/20">
              <p className="text-sm text-white font-semibold mb-1">Pro Tip</p>
              <p className="text-xs text-blue-100 dark:text-blue-200">
                Practice daily to improve your interview skills!
              </p>
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;
