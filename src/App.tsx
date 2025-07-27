import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AnalyticsPage from './pages/AnalyticsPage';
import PrivacyPage from './pages/PrivacyPage';
import ContactPage from './pages/ContactPage';
import VerifyEmailPage from './pages/VerifyEmailPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import AuthCallbackPage from './pages/AuthCallbackPage';
import LinkRedirect from './components/LinkRedirect';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Short link redirect route - standalone without layout */}
          <Route path="/:shortCode" element={<LinkRedirect />} />
          
          {/* All other routes with layout */}
          <Route path="/*" element={
            <div className="min-h-screen flex flex-col">
              <Navigation />
              
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/analytics" element={<AnalyticsPage />} />
                  <Route path="/privacy" element={<PrivacyPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/verify-email" element={<VerifyEmailPage />} />
                  <Route path="/reset-password" element={<ResetPasswordPage />} />
                  <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                  <Route path="/auth/callback" element={<AuthCallbackPage />} />
                </Routes>
              </main>
              
              <Footer />
            </div>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;