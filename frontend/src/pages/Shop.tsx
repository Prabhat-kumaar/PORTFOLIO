import { useState } from 'react';
import { Link } from 'react-router-dom';
import blogCover1 from '../assets/blog_cover_1.png';
import blogCover2 from '../assets/blog_cover_2.png';
import blogCover3 from '../assets/blog_cover_3.png';
import projectMockup1 from '../assets/project_mockup_1.png';
import projectMockup2 from '../assets/project_mockup_2.png';
import gallery3 from '../assets/gallery_3.png';

interface Product {
  id: string;
  overlayText: string;
  title: string;
  price: string;
  tags: string[];
  date: string;
  img: string;
}

export default function Shop() {
  const [hoveredProductId, setHoveredProductId] = useState<string | null>(null);

  const products: Product[] = [
    {
      id: '1',
      overlayText: 'ActiveTrack 6.0',
      title: 'USB C Adepter for MacBook pro 2022 2021 2020',
      price: '₹1020 - ₹1050',
      tags: ['GRAPHIC', 'GIMBAL', 'DESK'],
      date: 'June 22, 2024',
      img: blogCover1
    },
    {
      id: '2',
      overlayText: 'Portable and Foldable',
      title: 'USB C Adepter for MacBook pro 2022 2021 2020',
      price: '₹1020 - ₹1030',
      tags: ['USB C', 'GRAPHIC', 'DESK'],
      date: 'June 22, 2024',
      img: blogCover2
    },
    {
      id: '3',
      overlayText: 'ActiveTrack 6.0',
      title: 'USB C Adepter for MacBook pro 2022 2021 2020',
      price: '₹1030 - ₹1050',
      tags: ['ADAPTER', 'USB C', 'GRAPHIC'],
      date: 'June 22, 2024',
      img: blogCover3
    },
    {
      id: '4',
      overlayText: 'Studio Sound X',
      title: 'Wireless Bluetooth Studio Speaker V4',
      price: '₹1080 - ₹1120',
      tags: ['AUDIO', 'BLUETOOTH', 'DESK'],
      date: 'June 22, 2024',
      img: projectMockup1
    },
    {
      id: '5',
      overlayText: 'Developer Hub',
      title: 'Premium Mechanical Tenkeyless Keyboard',
      price: '₹1110 - ₹1150',
      tags: ['KEYBOARD', 'PERIPHERAL', 'USB C'],
      date: 'June 22, 2024',
      img: projectMockup2
    },
    {
      id: '6',
      overlayText: 'Ambient Glow',
      title: 'Smart RGB LED Desk Ambient Lightbar',
      price: '₹1015 - ₹1025',
      tags: ['LIGHTING', 'RGB', 'DESK'],
      date: 'June 22, 2024',
      img: gallery3
    }
  ];

  return (
    <div className="radial-spotlight bg-grid-mesh min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Title Area */}
        <div className="text-center mb-16 space-y-3 scroll-reveal">
          <span className="text-xs sm:text-sm font-sans font-bold text-slate-500 uppercase tracking-[0.25em] block">
            Shop Online
          </span>
          <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-white">
            Our <span className="bg-gradient-to-r from-cyberPurple via-purple-400 to-indigo-400 bg-clip-text text-transparent">Products</span>
          </h1>
        </div>

        {/* 3-Column Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto" style={{ perspective: '1200px' }}>
          {products.map((product, idx) => {
            const isHovered = hoveredProductId === product.id;
            return (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                onMouseEnter={() => setHoveredProductId(product.id)}
                onMouseLeave={() => setHoveredProductId(null)}
                className={`bg-[#120F1F] rounded-3xl overflow-hidden p-3.5 transition-all duration-300 relative border flex flex-col justify-between text-left h-full project-card-reveal ${
                  isHovered
                    ? 'border-cyberPurple/50 shadow-2xl shadow-purple-900/20 scale-[1.015]'
                    : 'border-slate-900/80 shadow-lg'
                }`}
                style={{ transitionDelay: `${idx * 125}ms` }}
              >
                
                {/* Product Image Frame */}
                <div className="relative h-60 w-full overflow-hidden rounded-2xl bg-slate-950 flex items-center justify-center p-1 border border-slate-950">
                  
                  {/* Top center text overlay */}
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 text-white font-display font-bold text-sm bg-black/45 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 shadow-md">
                    {product.overlayText}
                  </div>

                  <img
                    src={product.img}
                    alt={product.title}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>

                {/* Info Area */}
                <div className="p-4 pt-5 flex flex-col space-y-4">
                  
                  {/* Title & Price */}
                  <div className="space-y-1.5">
                    <h3 className="text-sm font-display font-bold text-cyberPurple leading-snug line-clamp-2 h-10">
                      {product.title}
                    </h3>
                    <p className="text-base sm:text-lg font-display font-extrabold text-white">
                      {product.price}
                    </p>
                  </div>

                  {/* Tags & Date row */}
                  <div className="space-y-3">
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {product.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 rounded-md bg-slate-900 text-[10px] font-bold text-slate-400 tracking-wider border border-slate-850"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Date */}
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest pl-0.5">
                      {product.date}
                    </p>

                  </div>

                </div>

              </Link>
            );
          })}
        </div>

      </div>
    </div>
  );
}
