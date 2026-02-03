import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { Menu } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * Authenticated Layout Component
 * Wraps authenticated pages with Navbar and Sidebar
 */
const AuthenticatedLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 dark:from-gray-900 dark:via-gray-800 dark:to-black">
      <Navbar />
      
      <div className="flex pt-16">
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        {/* Main Content */}
        <div className="flex-1 lg:ml-64">
          {/* Mobile Menu Button */}
          <div className="lg:hidden fixed bottom-6 right-6 z-30">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white shadow-2xl border-2 border-white/20"
            >
              <Menu size={24} />
            </motion.button>
          </div>

          {/* Page Content */}
          <main className="p-4 sm:p-6 lg:p-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default AuthenticatedLayout;
