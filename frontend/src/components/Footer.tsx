import { NavLink } from 'react-router-dom';
import { Mail, ArrowUp } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { SiLeetcode, SiHackerrank } from 'react-icons/si';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="bg-[#070B12] border-t border-slate-900 pt-16 pb-8 relative overflow-hidden">
      {/* Visual background accents */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyberPurple/30 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-12 border-b border-slate-900">
          
          {/* Left Block */}
          <div>
            <h3 className="text-xl font-display font-bold text-white mb-4">
              PRABHAT<span className="text-cyberPurple">.dev</span>
            </h3>
            <p className="text-slate-400 text-sm max-w-xs leading-relaxed">
              Crafting premium digital experiences, full-stack applications, and functional web templates. Let's build something exceptional.
            </p>
          </div>

          {/* Middle Block */}
          <div>
            <h4 className="text-sm font-semibold uppercase text-slate-300 tracking-wider mb-4">Quick Links</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <NavLink to="/" className="text-slate-400 hover:text-cyberPurple transition-colors">Home</NavLink>
              <NavLink to="/showcase" className="text-slate-400 hover:text-cyberPurple transition-colors">Showcase</NavLink>
              <NavLink to="/blog" className="text-slate-400 hover:text-cyberPurple transition-colors">Blog</NavLink>
              <a href="#about" className="text-slate-400 hover:text-cyberPurple transition-colors">About</a>
              <a href="#skills" className="text-slate-400 hover:text-cyberPurple transition-colors">Skills</a>
              <a href="#projects" className="text-slate-400 hover:text-cyberPurple transition-colors">Projects</a>
            </div>
          </div>

          {/* Right Block */}
          <div>
            <h4 className="text-sm font-semibold uppercase text-slate-300 tracking-wider mb-4">Profiles & Contact</h4>
            <div className="flex space-x-4 mb-4">
              <a href="https://github.com/Prabhat-kumaar" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyberPurple hover:border-cyberPurple transition-all" aria-label="GitHub">
                <FaGithub className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/in/prabhat-kumar-682203210/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BGLPsqr%2BKSHuH8dKKxRthyg%3D%3D" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyberPurple hover:border-cyberPurple transition-all" aria-label="LinkedIn">
                <FaLinkedin className="w-5 h-5" />
              </a>
              <a href="https://leetcode.com/u/prabhatyadav1234/" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyberPurple hover:border-cyberPurple transition-all" aria-label="LeetCode">
                <SiLeetcode className="w-5 h-5" />
              </a>
              <a href="https://hackerrank.com" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyberPurple hover:border-cyberPurple transition-all" aria-label="HackerRank">
                <SiHackerrank className="w-5 h-5" />
              </a>
            </div>
            <a href="mailto:prabhatyadav.dbg@gmail.com" className="inline-flex items-center text-sm text-slate-400 hover:text-cyberPurple transition-colors">
              <Mail className="w-4 h-4 mr-2" /> prabhatyadav.dbg@gmail.com
            </a>
          </div>

        </div>

        {/* Bottom Block */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Prabhat. All rights reserved.</p>
          <button
            onClick={scrollToTop}
            className="mt-4 sm:mt-0 flex items-center space-x-2 text-slate-400 hover:text-cyberPurple transition-colors group"
          >
            <span>Back to top</span>
            <ArrowUp className="w-4 h-4 transform group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
