import gallery1 from '../assets/gallery_1.png';
import gallery2 from '../assets/gallery_2.png';
import gallery3 from '../assets/gallery_3.png';
import gallery4 from '../assets/gallery_4.png';
import gallery5 from '../assets/gallery_5.png';
import gallery6 from '../assets/gallery_6.png';

export default function Gallery() {
  return (
    <div className="radial-spotlight bg-grid-mesh min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Top Hero Column Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-32">
          
          {/* Left Column: Typography & Button */}
          <div className="lg:col-span-5 space-y-6 text-left relative z-10 scroll-reveal">
            {/* Tagline */}
            <span className="text-xs sm:text-sm font-sans font-bold text-slate-500 uppercase tracking-[0.25em] block">
              Prabhat Gallery Photos
            </span>

            {/* Display Title */}
            <h1 className="text-5xl sm:text-6xl font-display font-extrabold leading-tight text-white">
              <span className="bg-gradient-to-r from-cyberPurple via-purple-400 to-indigo-400 bg-clip-text text-transparent block">
                Prabhat
              </span>
              <span>Photographs</span>
            </h1>

            {/* View More Button */}
            <div className="pt-4">
              <button className="border border-slate-750 hover:border-cyberPurple hover:bg-white hover:text-black font-sans text-xs sm:text-sm font-bold uppercase tracking-[0.2em] px-8 py-3.5 bg-transparent text-white transition-all rounded-sm shadow-lg shadow-purple-950/5 cursor-pointer">
                View More
              </button>
            </div>
          </div>

          {/* Right Column: Staggered Masonry Grid */}
          <div className="lg:col-span-7 relative z-10" style={{ perspective: '1200px' }}>
            <div className="grid grid-cols-2 gap-6 items-start">
              
              {/* Left Column (gallery2) */}
              <div className="space-y-6 pt-16 project-card-reveal" style={{ transitionDelay: '100ms' }}>
                <div className="rounded-3xl overflow-hidden border border-slate-900 shadow-2xl group hover:border-cyberPurple/30 transition-all duration-500 cursor-pointer bg-slate-950">
                  <img
                    src={gallery2}
                    alt="Fashion Portrait 2"
                    className="w-full h-auto object-cover group-hover:scale-102 transition-transform duration-700"
                  />
                </div>
              </div>

              {/* Right Column (gallery1 & gallery3) */}
              <div className="space-y-6 project-card-reveal" style={{ transitionDelay: '250ms' }}>
                <div className="rounded-3xl overflow-hidden border border-slate-900 shadow-2xl group hover:border-cyberPurple/30 transition-all duration-500 cursor-pointer bg-slate-950">
                  <img
                    src={gallery1}
                    alt="Fashion Portrait 1"
                    className="w-full h-auto object-cover group-hover:scale-102 transition-transform duration-700"
                  />
                </div>
                <div className="rounded-3xl overflow-hidden border border-slate-900 shadow-2xl group hover:border-cyberPurple/30 transition-all duration-500 cursor-pointer bg-slate-950">
                  <img
                    src={gallery3}
                    alt="Fashion Portrait 3"
                    className="w-full h-auto object-cover group-hover:scale-102 transition-transform duration-700"
                  />
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Bottom Section: Prabhat Captures (Mockup Image 2) */}
        <div className="border-t border-slate-900/60 pt-24 text-center">
          
          {/* Header */}
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white mb-16 tracking-tight leading-snug scroll-reveal">
            Prabhat captures <span className="italic font-serif text-cyberPurple font-medium">All of Your</span> beautiful memories
          </h2>

          {/* Staggered Captures Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto text-left" style={{ perspective: '1200px' }}>
            
            {/* Column 1: Left Vertical Image (gallery2) */}
            <div className="space-y-4 project-card-reveal" style={{ transitionDelay: '100ms' }}>
              <div className="rounded-2xl overflow-hidden border border-slate-900 shadow-xl group hover:border-cyberPurple/30 transition-all duration-500 cursor-pointer bg-slate-950">
                <img
                  src={gallery2}
                  alt="Bright Boho Sunshine 1"
                  className="w-full h-auto object-cover group-hover:scale-101.5 transition-transform duration-700"
                />
              </div>
              <div className="pl-1">
                <h4 className="text-sm font-display font-bold text-white mb-1">Bright Boho Sunshine</h4>
                <p className="text-xs text-slate-500 font-semibold">By Lovette Nkayi</p>
              </div>
            </div>

            {/* Column 2: Center Top Horizontal (gallery4) & Bottom Headshot (gallery5) */}
            <div className="space-y-8 project-card-reveal" style={{ transitionDelay: '220ms' }}>
              
              {/* Photo 1 (Horizontal) */}
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden border border-slate-900 shadow-xl group hover:border-cyberPurple/30 transition-all duration-500 cursor-pointer bg-slate-950">
                  <img
                    src={gallery4}
                    alt="Bright Boho Sunshine 2"
                    className="w-full h-auto object-cover group-hover:scale-101.5 transition-transform duration-700"
                  />
                </div>
                <div className="pl-1">
                  <h4 className="text-sm font-display font-bold text-white mb-1">Bright Boho Sunshine</h4>
                  <p className="text-xs text-slate-500 font-semibold">By Lovette Nkayi</p>
                </div>
              </div>

              {/* Photo 2 (Vertical Headshot) */}
              <div className="rounded-2xl overflow-hidden border border-slate-900 shadow-xl group hover:border-cyberPurple/30 transition-all duration-500 cursor-pointer bg-slate-950">
                <img
                  src={gallery5}
                  alt="Studio Headshot"
                  className="w-full h-auto object-cover group-hover:scale-101.5 transition-transform duration-700"
                />
              </div>

            </div>

            {/* Column 3: Right Vertical Image (gallery6) */}
            <div className="space-y-4 project-card-reveal" style={{ transitionDelay: '340ms' }}>
              <div className="rounded-2xl overflow-hidden border border-slate-900 shadow-xl group hover:border-cyberPurple/30 transition-all duration-500 cursor-pointer bg-slate-950">
                <img
                  src={gallery6}
                  alt="Bright Boho Sunshine 3"
                  className="w-full h-auto object-cover group-hover:scale-101.5 transition-transform duration-700"
                />
              </div>
              <div className="pl-1">
                <h4 className="text-sm font-display font-bold text-white mb-1">Bright Boho Sunshine</h4>
                <p className="text-xs text-slate-500 font-semibold">By Lovette Nkayi</p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
