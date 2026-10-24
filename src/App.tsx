import React, { useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { SmoothScroll } from './components/SmoothScroll';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';
import { PageTransition } from './components/PageTransition';
import { ComingSoon } from './pages/ComingSoon';
import { Home } from './pages/Home';
import { Work } from './pages/Work';
import { ProjectPage } from './pages/Project';
import { Studio } from './pages/Studio';
import { Services } from './pages/Services';
import { Contact } from './pages/Contact';
import { animatePageOut, animatePageIn } from './animations/pageTransition';
import { LightboxProvider } from './components/LightboxModal';
import { ThemeProvider } from './context/ThemeContext';

const AppContent: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const transitionRef = useRef<HTMLDivElement>(null);

  const isComingSoon = location.pathname === '/' || location.pathname === '/coming-soon';

  // Animated page transition handler (under 700ms total)
  const handleNavigate = (path: string) => {
    if (!transitionRef.current) {
      navigate(path);
      return;
    }

    animatePageOut(transitionRef.current, () => {
      navigate(path);
      window.scrollTo(0, 0);
      setTimeout(() => {
        if (transitionRef.current) {
          animatePageIn(transitionRef.current);
        }
      }, 40);
    });
  };

  return (
    <div className="relative min-h-screen bg-[#F2F0EB] text-[#171717] selection:bg-[#171717] selection:text-[#F5F3EE]">
      {/* Subtle Custom Cursor for desktop (disabled on Coming Soon landing) */}
      {!isComingSoon && <CustomCursor />}

      {/* Page Transition Veil */}
      <PageTransition ref={transitionRef} />

      {/* Minimal Fixed Navigation (hidden on standalone Coming Soon landing) */}
      {!isComingSoon && <Navbar onNavigate={handleNavigate} />}

      {/* Main Routed Content */}
      <main className="w-full">
        <Routes>
          <Route path="/" element={<ComingSoon />} />
          <Route path="/coming-soon" element={<ComingSoon />} />
          <Route path="/home" element={<Home onNavigate={handleNavigate} />} />
          <Route path="/work" element={<Work onNavigate={handleNavigate} />} />
          <Route path="/work/:id" element={<ProjectPage onNavigate={handleNavigate} />} />
          <Route path="/studio" element={<Studio onNavigate={handleNavigate} />} />
          <Route path="/services" element={<Services onNavigate={handleNavigate} />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      {/* Editorial Minimal Footer (hidden on standalone Coming Soon landing) */}
      {!isComingSoon && <Footer onNavigate={handleNavigate} />}
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <LightboxProvider>
        <Router>
          <SmoothScroll>
            <AppContent />
          </SmoothScroll>
        </Router>
      </LightboxProvider>
    </ThemeProvider>
  );
};

export default App;
