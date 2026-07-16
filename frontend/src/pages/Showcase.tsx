import { useState } from 'react';
import { Smartphone, Monitor, Tablet, X, ShoppingCart, ExternalLink } from 'lucide-react';

interface ShowcaseItem {
  id: string;
  title: string;
  description: string;
  price: string;
  liveUrl: string;
  tech: string[];
  features: string[];
}

export default function Showcase() {
  const [selectedSite, setSelectedSite] = useState<ShowcaseItem | null>(null);
  const [device, setDevice] = useState<'phone' | 'tablet' | 'laptop'>('laptop');

  const showcaseItems: ShowcaseItem[] = [
    {
      id: 'readify-theme',
      title: 'ReadifyAI Custom Dashboard Theme',
      description: 'A premium, modern SaaS dashboard interface customized for AI reading and content analysis applications.',
      price: '$49',
      liveUrl: 'https://readify-ai.vercel.app', // Placeholder
      tech: ['React', 'Tailwind CSS', 'Framer Motion'],
      features: ['Glassmorphic Design', 'Fully Responsive', 'Dynamic Layouts', 'Dark Mode Optimized']
    },
    {
      id: 'bookverse-shop',
      title: 'Book-verse Bookstore Template',
      description: 'An elegant e-commerce template for bookstores, digital libraries, and authors wishing to sell directly.',
      price: '$79',
      liveUrl: 'https://book-verse.vercel.app', // Placeholder
      tech: ['Next.js', 'Tailwind CSS', 'Redux', 'MongoDB'],
      features: ['SEO Optimized', 'Stripe checkout ready', 'Admin dashboard', 'Interactive reviews']
    },
    {
      id: 'saas-minimal',
      title: 'Minimalist SaaS Landing Page',
      description: 'A sleek, hyper-converting single-page landing layout perfect for modern developer utilities and micro-SaaS projects.',
      price: '$29',
      liveUrl: 'https://react.dev', // Placeholder
      tech: ['React', 'Vite', 'Tailwind CSS'],
      features: ['Ultra Fast Load Speed', 'Smooth scroll animations', 'Newsletter capture', 'SEO structured data']
    }
  ];

  // Device frames dimensions config
  const frames = {
    phone: { width: '375px', height: '667px', label: 'Phone', icon: <Smartphone className="w-4 h-4" /> },
    tablet: { width: '768px', height: '1024px', label: 'Tablet', icon: <Tablet className="w-4 h-4" /> },
    laptop: { width: '100%', height: '700px', label: 'Laptop', icon: <Monitor className="w-4 h-4" /> },
  };

  return (
    <div className="radial-spotlight bg-grid-mesh min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-cyberPurple font-display font-semibold tracking-wider text-xs uppercase mb-3 inline-block">
            Premium Web Templates
          </span>
          <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            Website <span className="text-cyberViolet">Showcase</span>
          </h1>
          <p className="text-slate-400 mt-3 text-sm max-w-xl mx-auto leading-relaxed">
            Take a look at high-performance website templates ready for purchase. Launch your next project with clean code, premium animations, and tailored layouts.
          </p>
        </div>

        {/* Grid List */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {showcaseItems.map((item) => (
            <div
              key={item.id}
              className="glass rounded-2xl overflow-hidden flex flex-col group border border-slate-900 hover:border-cyberPurple/30 transition-all duration-300 shadow-xl"
            >
              {/* Graphic Placeholder */}
              <div className="h-44 bg-slate-900 border-b border-slate-950 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-cyberPurple/5 via-transparent to-cyberViolet/10"></div>
                <div className="text-center z-10">
                  <span className="text-3xl font-display font-extrabold text-white/20 group-hover:text-cyberPurple/30 group-hover:scale-105 transition-all duration-500 block">
                    {item.title.split(' ')[0]}
                  </span>
                </div>
              </div>

              {/* Info Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-display font-bold text-white leading-snug group-hover:text-cyberPurple transition-colors">
                      {item.title}
                    </h3>
                    <span className="text-lg font-display font-extrabold text-cyberPurple">{item.price}</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed mb-6">{item.description}</p>
                  
                  {/* Features list */}
                  <ul className="text-[11px] text-slate-500 space-y-1.5 mb-6 list-disc list-inside">
                    {item.features.slice(0, 3).map((feat, fIdx) => (
                      <li key={fIdx}>{feat}</li>
                    ))}
                  </ul>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {item.tech.map((t, tIdx) => (
                      <span key={tIdx} className="px-2 py-0.5 rounded bg-slate-900 text-[10px] text-slate-400 border border-slate-800">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={() => setSelectedSite(item)}
                    className="flex-1 px-4 py-2.5 rounded-lg bg-cyberPurple text-darkBg text-xs font-semibold uppercase tracking-wider text-center hover:opacity-90 transition-opacity shadow-neon-purple/20 hover:shadow-neon-purple"
                  >
                    Demo & Purchase
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Demo Sandbox Modal / Overlay */}
      {selectedSite && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-darkBg/95 flex flex-col justify-between animate-fadeIn">
          
          {/* Header controls */}
          <div className="glass border-b border-slate-900 px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <h2 className="text-lg font-display font-bold text-white">{selectedSite.title}</h2>
              <p className="text-xs text-slate-400">Interactive Device Preview (Demo Frame)</p>
            </div>
            
            {/* Device Selectors */}
            <div className="flex bg-slate-900 p-1.5 rounded-lg border border-slate-800 space-x-1">
              {(['phone', 'tablet', 'laptop'] as const).map((d) => (
                <button
                  key={d}
                  onClick={() => setDevice(d)}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                    device === d
                      ? 'bg-cyberPurple text-darkBg shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  {frames[d].icon}
                  <span className="hidden sm:inline">{frames[d].label}</span>
                </button>
              ))}
            </div>

            {/* CTA + Close */}
            <div className="flex items-center space-x-4">
              <a
                href={`https://wa.me/910000000000?text=Hi%20Prabhat,%20I'm%20interested%20in%20purchasing%20the%20${encodeURIComponent(selectedSite.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-cyberPurple text-darkBg text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-opacity shadow-neon-purple"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Buy ({selectedSite.price})</span>
              </a>
              <button
                onClick={() => setSelectedSite(null)}
                className="p-2 bg-slate-900 border border-slate-800 text-slate-400 hover:text-white rounded-lg transition-colors"
                aria-label="Close Preview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Sandbox Canvas */}
          <div className="flex-1 flex items-center justify-center p-4 sm:p-8 overflow-hidden bg-slate-950/60 relative">
            
            {/* Device Container Frame */}
            <div
              className="transition-all duration-300 relative border-8 border-slate-850 rounded-2xl bg-black shadow-2xl flex flex-col justify-center overflow-hidden"
              style={{
                width: frames[device].width,
                height: frames[device].height,
                maxWidth: '100%',
                maxHeight: '100%',
              }}
            >
              {/* Iframe content */}
              <iframe
                src={selectedSite.liveUrl}
                title="Template Live Preview"
                className="w-full h-full border-none bg-darkBg"
              />
              
              {/* Fallback overlay (in case iframe is blocked or offline) */}
              <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center bg-slate-900/40 backdrop-blur-[1px] p-6 text-center">
                <div className="glass p-6 rounded-xl pointer-events-auto max-w-sm border border-slate-800">
                  <p className="text-xs text-slate-300 mb-4">
                    Some templates may prevent iframe loading due to security headers. You can always view the live deployment directly!
                  </p>
                  <a
                    href={selectedSite.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-lg bg-slate-850 text-xs font-semibold text-cyberPurple border border-cyberPurple/20 hover:border-cyberPurple transition-all"
                  >
                    <span>Open Live Demo</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Bar Details */}
          <div className="glass border-t border-slate-900 px-6 py-4 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-400 gap-4">
            <div className="flex flex-wrap gap-2 justify-center">
              <span className="font-bold text-white">Tech Used:</span>
              {selectedSite.tech.map((t, idx) => (
                <span key={idx} className="text-slate-300 font-mono bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">{t}</span>
              ))}
            </div>
            <p className="text-center sm:text-right">Price: <span className="text-cyberPurple font-bold">{selectedSite.price}</span>. Includes source files + installation guide.</p>
          </div>

        </div>
      )}
    </div>
  );
}
