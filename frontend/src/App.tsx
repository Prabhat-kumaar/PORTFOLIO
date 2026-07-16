import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Showcase from './pages/Showcase';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import ProjectDetail from './pages/ProjectDetail';
import Services from './pages/Services';
import Projects from './pages/Projects';
import Gallery from './pages/Gallery';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Contact from './pages/Contact';
import Admin from './pages/Admin';

function AppContent() {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');

  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved !== 'light';
  });

  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };

  const [showIntro, setShowIntro] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [isTextVisible, setIsTextVisible] = useState(false);

  useEffect(() => {
    if (isAdminPath) {
      setShowIntro(false);
      return;
    }

    // Step 1: Fade text in
    const textInTimer = setTimeout(() => {
      setIsTextVisible(true);
    }, 150);

    // Step 2: Fade text out
    const textOutTimer = setTimeout(() => {
      setIsTextVisible(false);
    }, 1400);

    // Step 3: Trigger curtain slide-up
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, 2000);

    // Step 4: Remove loader from DOM
    const removeTimer = setTimeout(() => {
      setShowIntro(false);
    }, 3200);

    return () => {
      clearTimeout(textInTimer);
      clearTimeout(textOutTimer);
      clearTimeout(exitTimer);
      clearTimeout(removeTimer);
    };
  }, [isAdminPath]);

  useEffect(() => {
    if (isAdminPath) return;
    if (isDark) {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark, isAdminPath]);

  // Global IntersectionObserver scroll reveal setup on route change
  useEffect(() => {
    if (isAdminPath) return;

    // Give elements a tiny frame to mount into the DOM after page transitions
    const timeoutId = setTimeout(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('reveal-active');
            } else {
              // Only reset if the element goes below the viewport (scrolling back up)
              if (entry.boundingClientRect.top > window.innerHeight) {
                entry.target.classList.remove('reveal-active');
              }
            }
          });
        },
        { threshold: 0.01, rootMargin: '0px 0px 100px 0px' }
      );

      const elements = document.querySelectorAll(
        '.scroll-reveal, .project-card-reveal, .fly-in-up, .skill-fly-left, .skill-fly-right, .fade-in-up-reveal'
      );
      elements.forEach((el) => observer.observe(el));

      return () => {
        elements.forEach((el) => observer.unobserve(el));
      };
    }, 150);

    return () => clearTimeout(timeoutId);
  }, [location.pathname, isAdminPath]);

  return (
    <div className={`flex flex-col min-h-screen transition-colors duration-500 ${
      isAdminPath
        ? 'bg-[#F8F9FB]'
        : (isDark ? 'bg-darkBg text-slate-100' : 'bg-white text-slate-800')
    } selection:bg-cyberPurple selection:text-white`}>
      
      {/* Curved Shutter curtain loader overlay (only for main user portfolio) */}
      {showIntro && (
        <div
          className={`fixed inset-x-0 top-0 h-[120vh] bg-[#070510] z-[99999] flex items-center justify-center pointer-events-none transition-transform duration-[1200ms] ease-[cubic-bezier(0.85,0,0.15,1)] ${
            isExiting ? 'translate-y-[-100%]' : 'translate-y-0'
          }`}
          style={{ clipPath: 'url(#curtain-clip)' }}
        >
          {/* Subtle purple center glow */}
          <div
            className={`absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.14)_0%,transparent_60%)] transition-opacity duration-1000 ${
              isTextVisible ? 'opacity-100' : 'opacity-0'
            }`}
          />

          {/* Staggered text characters P R A B H A T */}
          <div className="relative z-10 flex items-center justify-center space-x-3 sm:space-x-4 md:space-x-5 text-white tracking-[0.4em] font-light text-2xl sm:text-3xl md:text-4xl select-none">
            {"PRABHAT".split("").map((char, idx) => (
              <span
                key={idx}
                className={`inline-block transition-all duration-[800ms] ease-out transform ${
                  isTextVisible ? 'opacity-100 translate-y-0 filter blur-0' : 'opacity-0 translate-y-[-12px] filter blur-[4px]'
                }`}
                style={{ transitionDelay: `${idx * 80}ms` }}
              >
                {char}
              </span>
            ))}
          </div>

          {/* SVG ClipPath Definition (to make the dome-shaped curve edge) */}
          <svg width="0" height="0" className="absolute">
            <defs>
              <clipPath id="curtain-clip" clipPathUnits="objectBoundingBox">
                <path d="M 0 0 L 1 0 L 1 1 Q 0.5 0.7 0 1 Z" />
              </clipPath>
            </defs>
          </svg>
        </div>
      )}

      {/* Suppress Navbar on Admin Panel pages */}
      {!isAdminPath && <Navbar isDark={isDark} toggleTheme={toggleTheme} />}

      {/* Main Content Area */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/showcase" element={<Showcase />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
        </Routes>
      </main>

      {/* Suppress Footer on Admin Panel pages */}
      {!isAdminPath && <Footer />}

    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
