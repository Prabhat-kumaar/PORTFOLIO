import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';

interface NavbarProps {
  isDark: boolean;
  toggleTheme: () => void;
}

export default function Navbar({ isDark, toggleTheme }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Projects', path: '/projects' },
    { name: 'Blogs', path: '/blog' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Shop', path: '/shop' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 glass-nav">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Left: Logo & Email */}
          <NavLink to="/" className="flex items-center space-x-3 group">
            {/* Custom Circular G-Emblem */}
            <div className="w-9 h-9 rounded-full border-[3px] border-white flex items-center justify-center relative overflow-hidden group-hover:border-cyberPurple transition-all">
              <svg className="w-5 h-5 fill-white group-hover:fill-cyberPurple transition-colors" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.88 12.82c-.85.83-2.02 1.34-3.32 1.34-2.58 0-4.71-1.92-5.07-4.44H16.5v-.55c0-.2-.02-.4-.05-.59H7.5c.34-2.5 2.45-4.41 5.02-4.41 1.25 0 2.39.48 3.25 1.27l-1.35 1.35c-.48-.44-1.12-.72-1.9-.72-1.46 0-2.69 1.05-2.95 2.45h7.32c.07.35.11.71.11 1.09 0 1.95-.79 3.73-2.07 4.96l1.35 1.35z"/>
              </svg>
            </div>
            <span className="text-sm font-sans font-medium text-slate-300 group-hover:text-white transition-colors hidden lg:inline">
              prabhatyadav.dbg@gmail.com
            </span>
          </NavLink>

          {/* Center: Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-7">
            {navItems.map((item) => {
              const isAnchor = item.path.startsWith('#') || item.path.includes('#');
              if (isAnchor) {
                return (
                  <a
                    key={item.name}
                    href={item.path}
                    className="text-[13px] font-sans font-medium text-slate-300 hover:text-cyberPurple transition-colors tracking-wide"
                  >
                    {item.name}
                  </a>
                );
              }
              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    `text-[13px] font-sans font-medium tracking-wide transition-colors ${
                      isActive
                        ? 'text-cyberPurple border-b-2 border-cyberPurple pb-1'
                        : 'text-slate-300 hover:text-cyberPurple'
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              );
            })}
          </div>

          {/* Right: Toggle + CTA */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Theme Toggle Icon */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full border transition-all cursor-pointer theme-toggle-btn ${
                isDark
                  ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20 hover:bg-yellow-500/20'
                  : 'bg-[#1B124B]/10 text-[#1B124B] border-[#1B124B]/20 hover:bg-[#1B124B]/20'
              }`}
              aria-label="Toggle Theme"
            >
              {isDark ? (
                <Sun key="sun" className="w-4 h-4 theme-animate" />
              ) : (
                <Moon key="moon" className="w-4 h-4 theme-animate" />
              )}
            </button>

            {/* Gradient Hire Me! Button */}
            <a
              href="#contact"
              className="px-6 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white transition-all shadow-lg shadow-purple-900/30"
            >
              Hire Me!
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-3">
            <button
              onClick={toggleTheme}
              className={`p-1.5 rounded-full border transition-all theme-toggle-btn ${
                isDark
                  ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
                  : 'bg-[#1B124B]/10 text-[#1B124B] border-[#1B124B]/20'
              }`}
              aria-label="Toggle Theme"
            >
              {isDark ? (
                <Sun key="sun-mob" className="w-4 h-4 theme-animate" />
              ) : (
                <Moon key="moon-mob" className="w-4 h-4 theme-animate" />
              )}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-300 hover:text-white p-2 rounded-md focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden glass border-t border-slate-800/50 animate-fadeIn">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => {
              const isAnchor = item.path.startsWith('#') || item.path.includes('#');
              if (isAnchor) {
                return (
                  <a
                    key={item.name}
                    href={item.path}
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-3 rounded-md text-base font-medium text-slate-300 hover:text-cyberPurple hover:bg-slate-900/50 transition-all"
                  >
                    {item.name}
                  </a>
                );
              }
              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `block px-4 py-3 rounded-md text-base font-medium transition-all ${
                      isActive
                        ? 'text-cyberPurple bg-slate-900/80 font-semibold'
                        : 'text-slate-300 hover:text-cyberPurple hover:bg-slate-900/50'
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              );
            })}
            <div className="pt-4 px-4 pb-2">
              <a
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="block text-center w-full px-4 py-3 rounded-full text-sm font-bold tracking-wider uppercase bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-900/20"
              >
                Hire Me!
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
