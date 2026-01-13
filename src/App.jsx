import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './hooks/useTheme';
import LandingPage from './pages/LandingPage';
import SignupPage from './pages/SignupPage';
import SignInPage from './pages/SignInPage';
import DashboardPage from './pages/DashboardPage';
import InterviewsPage from './pages/InterviewsPage';
import PreparePage from './pages/PreparePage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import AnalyticsPage from './pages/AnalyticsPage';
import LeaderboardPage from './pages/LeaderboardPage';
import ResumeAnalyzerPage from './pages/ResumeAnalyzerPage';
import LiveInterviewPage from './pages/LiveInterviewPage';
import InterviewSetup from './pages/InterviewSetup';
import InterviewPage from './pages/InterviewPage';
import FeedbackPage from './pages/FeedbackPage';

/**
 * Main App Component with Theme Provider
 * Handles routing and dark mode context
 */
function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/interviews" element={<InterviewsPage />} />
          <Route path="/prepare" element={<PreparePage />} />
          <Route path="/resume-analyzer" element={<ResumeAnalyzerPage />} />
          <Route path="/live-interview" element={<LiveInterviewPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/setup" element={<InterviewSetup />} />
          <Route path="/interview" element={<InterviewPage />} />
          <Route path="/feedback" element={<FeedbackPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
