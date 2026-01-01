import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import FluidCanvas from './components/FluidCanvas/FluidCanvas';
import Home from './pages/Home';
import ServicesPage from './pages/ServicesPage';
import WhyUsPage from './pages/WhyUsPage';
import TestimonialsPage from './pages/TestimonialsPage';
import AboutUsPage from './pages/AboutUsPage';

function App() {
  return (
    <Router>
      <FluidCanvas />
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/why-us" element={<WhyUsPage />} />
        <Route path="/testimonials" element={<TestimonialsPage />} />
        <Route path="/about" element={<AboutUsPage />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
