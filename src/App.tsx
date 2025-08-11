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
import LinkManagementPage from './pages/features/LinkManagementPage';
import MonitoringAnalysisPage from './pages/features/MonitoringAnalysisPage';
import HowItWorksPage from './pages/features/HowItWorksPage';
import AboutPage from './pages/features/AboutPage';
import BlogPage from './pages/BlogPage';
import LinkRedirect from './components/LinkRedirect';
import { Helmet } from "react-helmet-async"; 

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Specific application routes with layout */}
          <Route path="/" element={
            <div className="min-h-screen flex flex-col">
              <Navigation />
              
              <main className="flex-1">
                <HomePage />
              </main>
              
              <Footer />
            </div>
          } />
          
          <Route path="/analytics" element={
            <div className="min-h-screen flex flex-col">
              <Navigation />
              
              <main className="flex-1">
                <AnalyticsPage />
              </main>
              
              <Footer />
            </div>
          } />
          
          <Route path="/privacy" element={
            <div className="min-h-screen flex flex-col">
              <Navigation />
              
              <main className="flex-1">
                <PrivacyPage />
              </main>
              
              <Footer />
            </div>
          } />
          
          <Route path="/contact" element={
            <div className="min-h-screen flex flex-col">
              <Navigation />
              
              <main className="flex-1">
                <ContactPage />
              </main>
              
              <Footer />
            </div>
          } />
          
          <Route path="/verify-email" element={
            <div className="min-h-screen flex flex-col">
              <Navigation />
              
              <main className="flex-1">
                <VerifyEmailPage />
              </main>
              
              <Footer />
            </div>
          } />
          
          <Route path="/reset-password" element={
            <div className="min-h-screen flex flex-col">
              <Navigation />
              
              <main className="flex-1">
                <ResetPasswordPage />
              </main>
              
              <Footer />
            </div>
          } />
          
          <Route path="/forgot-password" element={
            <div className="min-h-screen flex flex-col">
              <Navigation />
              
              <main className="flex-1">
                <ForgotPasswordPage />
              </main>
              
              <Footer />
            </div>
          } />
          
          <Route path="/auth/callback" element={
            <div className="min-h-screen flex flex-col">
              <Navigation />
              
              <main className="flex-1">
                <AuthCallbackPage />
              </main>
              
              <Footer />
            </div>
          } />


 {/* Main Heading (H1) */}
      <header>
        <h1>Free URL Shortener with QR Codes & Analytics</h1>
        <p>
          Create short links, track clicks, and customize your URLs instantly —
          no signup required.
        </p>
      </header>
          
          {/* Features Pages */}
          <Route path="/features/link-management" element={
            <div className="min-h-screen flex flex-col">
              <Navigation />
              
              <main className="flex-1">
                <LinkManagementPage />
              </main>
              
              <Footer />
            </div>
          } />
          
          <Route path="/features/monitoring-analysis" element={
            <div className="min-h-screen flex flex-col">
              <Navigation />
              
              <main className="flex-1">
                <MonitoringAnalysisPage />
              </main>
              
              <Footer />
            </div>
          } />
          
          <Route path="/features/how-it-works" element={
            <div className="min-h-screen flex flex-col">
              <Navigation />
              
              <main className="flex-1">
                <HowItWorksPage />
              </main>
              
              <Footer />
            </div>
          } />
          
          <Route path="/features/about" element={
            <div className="min-h-screen flex flex-col">
              <Navigation />
              
              <main className="flex-1">
                <AboutPage />
              </main>
              
              <Footer />
            </div>
          } />
          
          <Route path="/blog" element={
            <div className="min-h-screen flex flex-col">
              <Navigation />
              
              <main className="flex-1">
                <BlogPage />
              </main>
              
              <Footer />
            </div>
          } />
          
          {/* Short link redirect route - standalone without layout */}
          <Route path="/:shortCode" element={<LinkRedirect />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;