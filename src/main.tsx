import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

         <header style=”display: none”>
        <h1>Free URL Shortener with QR Codes & Lifetime Links</h1>
        <p>Create trackable short links with QR codes—100% free and never expire.</p>
      </header>

      <nav>
        <ul>
          <li><a href="/features">Features</a></li>
          <li><a href="/pricing">Pricing</a></li>
          <li><a href="/faq">FAQ</a></li>
          <li><a href="/blog">Blog</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </nav>

      <main>
        <section>
          <h2>Shorten Your Link</h2>
          <p>Paste your long URL to generate a lifetime short link with built-in QR code and analytics.</p>
          {/* Later: Add form and Supabase logic here */}
        </section>