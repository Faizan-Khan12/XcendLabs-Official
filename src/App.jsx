import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import FluidCanvas from './components/FluidCanvas/FluidCanvas';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const WhyUsPage = lazy(() => import('./pages/WhyUsPage'));
const TestimonialsPage = lazy(() => import('./pages/TestimonialsPage'));
const AboutUsPage = lazy(() => import('./pages/AboutUsPage'));

// Loading Fallback
const LoadingSpinner = () => (
  <div style={{
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '80px'
  }}>
    <div style={{
      width: '40px',
      height: '40px',
      border: '3px solid rgba(34, 211, 238, 0.1)',
      borderTopColor: '#22d3ee',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    }}></div>
    <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
  </div>
);

function App() {
  return (
    <Router>
      <FluidCanvas />
      <Navbar />

      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/why-us" element={<WhyUsPage />} />
          <Route path="/testimonials" element={<TestimonialsPage />} />
          <Route path="/about" element={<AboutUsPage />} />
        </Routes>
      </Suspense>

      <Footer />
    </Router>
  );
}

export default App;
