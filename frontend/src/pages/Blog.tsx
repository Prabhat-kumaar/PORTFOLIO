import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import blogCover1 from '../assets/blog_cover_1.png';
import blogCover2 from '../assets/blog_cover_2.png';
import blogCover3 from '../assets/blog_cover_3.png';
import projectMockup1 from '../assets/project_mockup_1.png';
import projectMockup2 from '../assets/project_mockup_2.png';
import gallery3 from '../assets/gallery_3.png';
import avatar from '../assets/avatar_portrait.jpg';

interface BlogPost {
  id: string;
  tag: string;
  date: string;
  title: string;
  description: string;
  img: string;
}

interface SearchableItem {
  id: string;
  title: string;
  snippet: string;
}

export default function Blog() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const postsPerPage = 10;

  // Load blogs from localStorage if exists, else use defaults
  const allPosts: BlogPost[] = (() => {
    const saved = localStorage.getItem('blogs');
    if (saved) {
      const parsed = JSON.parse(saved);
      return parsed
        .filter((b: any) => b.status === 'Published')
        .map((b: any) => ({
          id: b.id,
          tag: b.category,
          date: b.date,
          title: b.title,
          description: b.content,
          img: b.img || blogCover1
        }));
    }
    return [
      {
        id: 'building-readifyai',
        tag: 'Next Js',
        date: 'June 22, 2024',
        title: 'Building a Blog With Next.js and MDX',
        description: 'Audio equidem philosophi vocem, Epicure, sed quid tibi dicendum sit oblitus es. Haec et tu ita posuisti, et verba vestra sunt. Contemnit enim...',
        img: blogCover1
      },
      {
        id: 'saas-landing',
        tag: 'Next Js',
        date: 'June 22, 2024',
        title: 'Next.js 14.2',
        description: 'Audio equidem philosophi vocem, Epicure, sed quid tibi dicendum sit oblitus es. Haec et tu ita posuisti, et verba vestra sunt. Contemnit enim...',
        img: blogCover2
      },
      {
        id: 'aimm-interface',
        tag: 'React Js',
        date: 'June 22, 2024',
        title: 'Next.js 15 RC',
        description: 'Audio equidem philosophi vocem, Epicure, sed quid tibi dicendum sit oblitus es. Haec et tu ita posuisti, et verba vestra sunt. Contemnit enim...',
        img: blogCover3
      },
      {
        id: 'next-13-static-blog',
        tag: 'Next Js',
        date: 'June 22, 2024',
        title: 'A Step-by-Step Guide to Building a Simple Next.js 13 Blog',
        description: 'Audio equidem philosophi vocem, Epicure, sed quid tibi dicendum sit oblitus es. Haec et tu ita posuisti, et verba vestra sunt. Contemnit enim...',
        img: projectMockup1
      },
      {
        id: 'mobile-number-login',
        tag: 'Node Js',
        date: 'June 22, 2024',
        title: 'Mobile number login sign up',
        description: 'Audio equidem philosophi vocem, Epicure, sed quid tibi dicendum sit oblitus es. Haec et tu ita posuisti, et verba vestra sunt. Contemnit enim...',
        img: projectMockup2
      },
      {
        id: 'crafting-css-animations',
        tag: 'Css',
        date: 'June 22, 2024',
        title: 'Crafting Engaging CSS Animations step by step guide',
        description: 'Audio equidem philosophi vocem, Epicure, sed quid tibi dicendum sit oblitus es. Haec et tu ita posuisti, et verba vestra sunt. Contemnit enim...',
        img: gallery3
      },
      {
        id: 'react-19-state',
        tag: 'React Js',
        date: 'June 22, 2024',
        title: 'State Management in React 19 Explored',
        description: 'Audio equidem philosophi vocem, Epicure, sed quid tibi dicendum sit oblitus es. Haec et tu ita posuisti, et verba vestra sunt. Contemnit enim...',
        img: blogCover1
      },
      {
        id: 'router-benchmarks',
        tag: 'Next Js',
        date: 'June 22, 2024',
        title: 'App Router vs Pages Router Performance Benchmarks',
        description: 'Audio equidem philosophi vocem, Epicure, sed quid tibi dicendum sit oblitus es. Haec et tu ita posuisti, et verba vestra sunt. Contemnit enim...',
        img: blogCover2
      },
      {
        id: 'flutter-mobile-arch',
        tag: 'Flutter Dev',
        date: 'June 22, 2024',
        title: 'Cross-platform Mobile Architecture with Flutter',
        description: 'Audio equidem philosophi vocem, Epicure, sed quid tibi dicendum sit oblitus es. Haec et tu ita posuisti, et verba vestra sunt. Contemnit enim...',
        img: blogCover3
      },
      {
        id: 'express-redis-cache',
        tag: 'Node Js',
        date: 'June 22, 2024',
        title: 'Scaling Express.js APIs with Redis Cache mechanisms',
        description: 'Audio equidem philosophi vocem, Epicure, sed quid tibi dicendum sit oblitus es. Haec et tu ita posuisti, et verba vestra sunt. Contemnit enim...',
        img: projectMockup1
      },
      {
        id: 'tailwind-v4-layouts',
        tag: 'Css',
        date: 'June 22, 2024',
        title: 'Advanced Tailwind v4 Utility Layout architectures',
        description: 'Audio equidem philosophi vocem, Epicure, sed quid tibi dicendum sit oblitus es. Haec et tu ita posuisti, et verba vestra sunt. Contemnit enim...',
        img: projectMockup2
      },
      {
        id: 'event-loop-js',
        tag: 'Javascript',
        date: 'June 22, 2024',
        title: 'Understanding Event Loop & Microtasks in modern JS engines',
        description: 'Audio equidem philosophi vocem, Epicure, sed quid tibi dicendum sit oblitus es. Haec et tu ita posuisti, et verba vestra sunt. Contemnit enim...',
        img: gallery3
      }
    ];
  })();

  // Search items database
  const searchableDataset: SearchableItem[] = [
    {
      id: 'building-readifyai',
      title: 'how to access mongodb api endpoint in next project',
      snippet: '![database](https://s7280.pcdn.co/wp-content/uploads/2016/06/database-blue.png) ## how to access mongodb api endpoint in next project'
    },
    {
      id: 'placement-prep-journey',
      title: 'Next.js 14.2 Release Features and Memory Optimizations',
      snippet: '## Next.js 14.2 features, memory optimizations, and Turbopack dev compilation speeds'
    },
    {
      id: 'react-three-fiber-ux',
      title: 'Next.js 15 RC Features & React Compiler Integration',
      snippet: '## Next.js 15 Release Candidate features and React Compiler memoization updates'
    }
  ];

  const filteredResults = query.trim() === ''
    ? []
    : searchableDataset.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.snippet.toLowerCase().includes(query.toLowerCase())
      );

  // Pagination bounds
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = allPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(allPosts.length / postsPerPage);

  // Auto-focus search input when search modal opens
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const handleResultClick = (id: string) => {
    setIsSearchOpen(false);
    setQuery('');
    navigate(`/blog/${id}`);
  };

  return (
    <div className="radial-spotlight bg-grid-mesh min-h-screen pt-28 pb-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title Area */}
        <div className="max-w-3xl mb-16 space-y-6 text-left scroll-reveal">
          <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-white leading-tight">
            Welcome to <span className="text-cyberPurple">Prabhat Blogs!</span>
          </h1>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-2xl">
            I write about web, mobile development and modern JavaScript frameworks.
            The best articles, links and news related to web and mobile development
          </p>

          {/* Search Trigger Bar */}
          <div className="flex max-w-md bg-slate-900/60 rounded-full border border-slate-800 p-1 items-center justify-between shadow-lg">
            <input
              type="text"
              readOnly
              placeholder="Search blogs here..."
              onClick={() => setIsSearchOpen(true)}
              className="bg-transparent border-none text-xs text-white focus:outline-none pl-4 py-3 cursor-pointer w-full"
            />
            <button
              onClick={() => setIsSearchOpen(true)}
              className="px-6 py-2.5 rounded-full bg-cyberPurple text-white text-xs font-bold hover:opacity-90 transition-opacity cursor-pointer"
            >
              Search
            </button>
          </div>
        </div>

        {/* Featured Posts list */}
        <div className="border-t border-slate-900/60 pt-12">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl text-left" style={{ perspective: '1200px' }}>
            {currentPosts.map((blog, idx) => (
              <Link
                key={blog.id}
                to={`/blog/${blog.id}`}
                className="bg-[#120F1F] border border-slate-900 rounded-3xl overflow-hidden shadow-2xl relative flex flex-col group hover:border-cyberPurple/25 transition-all duration-500 hover:scale-[1.01] project-card-reveal"
                style={{ transitionDelay: `${idx * 120}ms` }}
              >
                
                {/* Cover Image */}
                <div className="h-56 w-full overflow-hidden relative border-b border-slate-950 bg-slate-950 flex items-center justify-center p-2">
                  
                  {/* Category Pill Tag with orange circle indicator */}
                  <span className="absolute top-4 left-4 z-20 px-3.5 py-1 text-[10px] font-bold rounded-full bg-white text-slate-900 shadow-md flex items-center space-x-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    <span>{blog.tag}</span>
                  </span>

                  <img
                    src={blog.img}
                    alt={blog.title}
                    className="w-full h-full object-cover rounded-xl border border-slate-900/60 group-hover:scale-102 transition-transform duration-700"
                  />
                </div>

                {/* Bottom Excerpt Banner */}
                <div className="bg-[#13112E]/90 border-t border-slate-800/20 p-6 flex flex-col space-y-3.5 w-full relative z-10">
                  <h3 className="text-base sm:text-lg font-display font-bold text-white group-hover:text-cyberPurple transition-colors leading-tight line-clamp-2 h-12">
                    {blog.title}
                  </h3>
                  
                  <p className="text-xs text-slate-400 leading-relaxed font-sans line-clamp-3 h-14">
                    {blog.description}
                  </p>

                  {/* Author Row */}
                  <div className="flex items-center space-x-2 pt-4 border-t border-slate-900/60">
                    <img
                      src={avatar}
                      alt="Prabhat"
                      className="w-6 h-6 rounded-full border border-slate-800 object-cover"
                    />
                    <span className="text-xs text-slate-500 font-bold font-sans">
                      by Prabhat
                    </span>
                  </div>
                </div>

              </Link>
            ))}
          </div>

          {/* Fully Functional Pagination controls */}
          <div className="flex items-center justify-center space-x-2.5 mt-16 pb-6">
            
            {/* Previous */}
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-5 py-2.5 rounded-xl border text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                currentPage === 1
                  ? 'border-slate-900/40 text-slate-650 cursor-not-allowed opacity-50 bg-[#13112E]/20'
                  : 'border-slate-900 bg-[#13112E]/60 text-slate-400 hover:text-white hover:border-cyberPurple/30 cursor-pointer'
              }`}
            >
              Previous
            </button>

            {/* Page 1 */}
            <button
              onClick={() => setCurrentPage(1)}
              className={`w-10 h-10 flex items-center justify-center rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer ${
                currentPage === 1
                  ? 'bg-cyberPurple text-white shadow-lg shadow-purple-900/30'
                  : 'bg-[#13112E]/60 border border-slate-900 text-slate-400 hover:text-white hover:border-cyberPurple/30'
              }`}
            >
              1
            </button>

            {/* Page 2 */}
            <button
              onClick={() => setCurrentPage(2)}
              className={`w-10 h-10 flex items-center justify-center rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer ${
                currentPage === 2
                  ? 'bg-cyberPurple text-white shadow-lg shadow-purple-900/30'
                  : 'bg-[#13112E]/60 border border-slate-900 text-slate-400 hover:text-white hover:border-cyberPurple/30'
              }`}
            >
              2
            </button>

            {/* Next */}
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`px-5 py-2.5 rounded-xl border text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                currentPage === totalPages
                  ? 'border-slate-900/40 text-slate-650 cursor-not-allowed opacity-50 bg-[#13112E]/20'
                  : 'border-slate-900 bg-[#13112E]/60 text-slate-400 hover:text-white hover:border-cyberPurple/30 cursor-pointer'
              }`}
            >
              Next
            </button>

          </div>

        </div>

      </div>

      {/* Interactive Search Overlay Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex flex-col items-center pt-24 px-4">
          
          {/* Input control block */}
          <div className="w-full max-w-2xl flex items-center">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-white text-slate-900 font-sans px-5 py-4 rounded-xl border-2 border-cyan-400 focus:outline-none text-base shadow-2xl focus:shadow-cyan-500/10 transition-shadow"
            />
            
            <button
              onClick={() => {
                setIsSearchOpen(false);
                setQuery('');
              }}
              className="w-12 h-12 rounded-full bg-cyberPurple hover:bg-purple-600 text-white flex items-center justify-center flex-shrink-0 transition-colors ml-3 shadow-lg cursor-pointer"
              aria-label="Close search"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Results List */}
          <div className="w-full max-w-2xl mt-6 space-y-4 max-h-[60vh] overflow-y-auto pr-2">
            {filteredResults.map((item) => (
              <button
                key={item.id}
                onClick={() => handleResultClick(item.id)}
                className="w-full bg-[#1D1743] border border-purple-900/40 rounded-2xl p-5 hover:border-cyberPurple/50 transition-colors cursor-pointer text-left block shadow-lg group"
              >
                <h4 className="text-base sm:text-lg font-display font-bold text-white group-hover:text-cyberPurple transition-colors mb-2 leading-tight">
                  {item.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans line-clamp-2">
                  {item.snippet}
                </p>
              </button>
            ))}

            {query.trim() !== '' && filteredResults.length === 0 && (
              <div className="text-center py-10 text-slate-500 text-sm">
                No articles matched your query. Try searching for "next" or "mongodb".
              </div>
            )}
          </div>

        </div>
      )}

    </div>
  );
}
