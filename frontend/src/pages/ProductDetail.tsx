import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import blogCover1 from '../assets/blog_cover_1.png';
import blogCover2 from '../assets/blog_cover_2.png';
import blogCover3 from '../assets/blog_cover_3.png';
import projectMockup1 from '../assets/project_mockup_1.png';
import projectMockup2 from '../assets/project_mockup_2.png';
import gallery3 from '../assets/gallery_3.png';

interface ProductDetailData {
  title: string;
  price: string;
  overlayText: string;
  img: string;
  thumbnails: string[];
  detailsTitle: string;
  description: string;
}

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();

  const productDataset: Record<string, ProductDetailData> = {
    '1': {
      title: 'USB C Adepter for MacBook pro 2022 2021 2020',
      price: '₹1020 - ₹1050',
      overlayText: 'ActiveTrack 6.0',
      img: blogCover1,
      thumbnails: [blogCover1, projectMockup1, gallery3],
      detailsTitle: 'USB C Adepter for MacBook pro 2022 2021 2020',
      description: 'USB C Adepter for MacBook pro 2022 2021 2020USB C Adepter for MacBook pro 2022 2021 2020 USB C Adepter for MacBook pro 2022 2021 2020 USB C Adepter for MacBook pro 2022 2021 2020USB C Adepter for MacBook pro 2022 2021 2020USB C Adepter for MacBook pro 2022 2021 2020USB C Adepter for MacBook pro 2022 2021 2020USB C Adepter for MacBook pro 2022 2021 2020'
    },
    '2': {
      title: 'USB C Adepter for MacBook pro 2022 2021 2020',
      price: '₹1020 - ₹1030',
      overlayText: 'Portable and Foldable',
      img: blogCover2,
      thumbnails: [blogCover2, projectMockup2, gallery3],
      detailsTitle: 'USB C Adepter for MacBook pro 2022 2021 2020',
      description: 'USB C Adepter for MacBook pro 2022 2021 2020USB C Adepter for MacBook pro 2022 2021 2020 USB C Adepter for MacBook pro 2022 2021 2020 USB C Adepter for MacBook pro 2022 2021 2020'
    },
    '3': {
      title: 'USB C Adepter for MacBook pro 2022 2021 2020',
      price: '₹1030 - ₹1050',
      overlayText: 'ActiveTrack 6.0',
      img: blogCover3,
      thumbnails: [blogCover3, projectMockup1, projectMockup2],
      detailsTitle: 'USB C Adepter for MacBook pro 2022 2021 2020',
      description: 'USB C Adepter for MacBook pro 2022 2021 2020USB C Adepter for MacBook pro 2022 2021 2020 USB C Adepter for MacBook pro 2022 2021 2020 USB C Adepter for MacBook pro 2022 2021 2020'
    },
    '4': {
      title: 'Wireless Bluetooth Studio Speaker V4',
      price: '₹1080 - ₹1120',
      overlayText: 'Studio Sound X',
      img: projectMockup1,
      thumbnails: [projectMockup1, projectMockup2, blogCover1],
      detailsTitle: 'Wireless Bluetooth Studio Speaker V4',
      description: 'Premium wireless Bluetooth sound speaker for developer desk setups. Exceptional treble and rich bass frequencies.'
    },
    '5': {
      title: 'Premium Mechanical Tenkeyless Keyboard',
      price: '₹1110 - ₹1150',
      overlayText: 'Developer Hub',
      img: projectMockup2,
      thumbnails: [projectMockup2, blogCover2, gallery3],
      detailsTitle: 'Premium Mechanical Tenkeyless Keyboard',
      description: 'Tactile typing feedback optimized for software development. Featuring multi-channel Bluetooth connectivity.'
    },
    '6': {
      title: 'Smart RGB LED Desk Ambient Lightbar',
      price: '₹1015 - ₹1025',
      overlayText: 'Ambient Glow',
      img: gallery3,
      thumbnails: [gallery3, blogCover3, projectMockup1],
      detailsTitle: 'Smart RGB LED Desk Ambient Lightbar',
      description: 'Ambient lighting bars matching active display panels, optimized to reduce developer eye fatigue.'
    }
  };

  const product = id ? productDataset[id] : null;

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-28">
        <h2 className="text-2xl font-bold text-white mb-4">Product Not Found</h2>
        <Link to="/shop" className="px-4 py-2 bg-cyberPurple text-white rounded-full text-sm font-semibold hover:opacity-90">
          Back to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="radial-spotlight bg-grid-mesh min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Back Link */}
        <Link
          to="/shop"
          className="inline-flex items-center text-xs font-bold text-slate-400 hover:text-cyberPurple uppercase tracking-wider mb-12 transition-colors group text-left"
        >
          <ArrowLeft className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform" />
          <span>Back to Shop</span>
        </Link>

        {/* Detail Split columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start text-left max-w-6xl mx-auto">
          
          {/* Left Column: Product covers and strip */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Primary Cover */}
            <div className="rounded-3xl overflow-hidden bg-slate-950 border border-slate-900 shadow-2xl h-80 sm:h-[400px] w-full flex items-center justify-center relative p-3">
              {/* Image overlay text */}
              <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 text-white font-display font-bold text-sm bg-black/45 backdrop-blur-md px-5 py-2 rounded-full border border-white/10 shadow-md">
                {product.overlayText}
              </div>

              <img
                src={product.img}
                alt={product.title}
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>

            {/* Gallery Strip */}
            <div className="grid grid-cols-3 gap-4">
              {product.thumbnails.map((thumb, idx) => (
                <div key={idx} className="rounded-xl overflow-hidden bg-slate-950 border border-slate-900 h-24 sm:h-28 flex items-center justify-center p-1 cursor-pointer hover:border-cyberPurple/30 transition-colors">
                  <img
                    src={thumb}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>

          </div>

          {/* Right Column: Title info details */}
          <div className="lg:col-span-6 space-y-8">
            
            {/* Product Title */}
            <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-white leading-tight">
              {product.title}
            </h1>

            {/* Price Tag */}
            <p className="text-xl sm:text-2xl font-display font-bold text-white">
              Price: <span className="text-cyberPurple">{product.price}</span>
            </p>

            {/* Shop Now Button */}
            <div>
              <button className="w-full py-4 bg-gradient-to-r from-cyberPurple to-indigo-650 hover:opacity-90 text-white font-bold text-sm uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-purple-950/20 cursor-pointer">
                Shop Now
              </button>
            </div>

            {/* Product details section */}
            <div className="space-y-4">
              <h3 className="text-base font-bold text-cyberPurple uppercase tracking-wider">
                Product Details:
              </h3>
              
              <h4 className="text-lg sm:text-xl font-display font-bold text-white">
                {product.detailsTitle}
              </h4>
              
              <p className="text-sm sm:text-base text-slate-450 leading-relaxed font-sans">
                {product.description}
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
