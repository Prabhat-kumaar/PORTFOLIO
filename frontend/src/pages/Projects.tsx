import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import projectMockup1 from '../assets/project_mockup_1.png';
import projectMockup2 from '../assets/project_mockup_2.png';

interface ProjectItem {
  id: string;
  title: string;
  description: string;
  category: string;
  img: string;
  tech: string[];
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');

  // Expanded works dataset
  const allProjects: ProjectItem[] = [
    {
      id: 'readify-dashboard',
      title: 'ReadifyAI Custom Dashboard',
      description: 'A smart reading assistant powered by AI. Translates, summarizes, and answers questions from book contexts.',
      category: 'Apps',
      img: projectMockup1,
      tech: ['React', 'Express', 'MongoDB', 'OpenAI API']
    },
    {
      id: 'aimm-interface',
      title: 'Aimm Work Faster Interface',
      description: 'A premium layout optimized for high-performance visual tools and 3D web design assets representation.',
      category: 'Website',
      img: projectMockup2,
      tech: ['Next.js', 'Framer Motion', 'Tailwind CSS']
    },
    {
      id: 'book-verse',
      title: 'Book-verse Bookstore',
      description: 'An elegant e-commerce book community platform where readers review books, track readings, and share notes.',
      category: 'Website',
      img: projectMockup1,
      tech: ['Vite', 'React', 'Tailwind', 'Firebase']
    },
    {
      id: 'saas-landing',
      title: 'SaaS Minimalist Layout',
      description: 'A sleek, hyper-converting single-page landing layout perfect for modern developer utilities.',
      category: 'Digital',
      img: projectMockup2,
      tech: ['Vite', 'React', 'Tailwind CSS']
    },
    {
      id: 'editorial-platform',
      title: 'Creative Editorial Platform',
      description: 'A tech writing space housing logs of placements prep, R3F layouts, and system configurations.',
      category: 'Content',
      img: projectMockup1,
      tech: ['React', 'MDX', 'Tailwind']
    },
    {
      id: 'task-manager',
      title: 'Task Management System',
      description: 'A visual work organizer with custom Kanban workflows, dragging triggers, and team assignments.',
      category: 'Apps',
      img: projectMockup2,
      tech: ['React', 'Redux', 'Node.js', 'PostgreSQL']
    },
    {
      id: 'portfolio-3d',
      title: '3D Interactive Portfolio',
      description: 'A developer template containing custom R3F layouts, mesh shaders, and particle dynamics.',
      category: 'Digital',
      img: projectMockup1,
      tech: ['Three.js', 'React Three Fiber', 'GSAP']
    },
    {
      id: 'finance-tracker',
      title: 'Apex Finance Dashboard',
      description: 'An analytics chart panel fetching crypto prices, calculating balances, and showing currency logs.',
      category: 'Website',
      img: projectMockup2,
      tech: ['React', 'Recharts', 'Tailwind CSS']
    }
  ];

  const filteredProjects = activeFilter === 'All'
    ? allProjects
    : allProjects.filter(p => p.category === activeFilter);

  return (
    <div className="radial-spotlight bg-grid-mesh min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title & Breadcrumb */}
        <div className="text-center mb-10 space-y-3 scroll-reveal">
          <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            My <span className="bg-gradient-to-r from-cyberPurple to-indigo-400 bg-clip-text text-transparent">Recent Works</span>
          </h1>
          
          <div className="flex justify-center items-center space-x-2 text-xs sm:text-sm text-slate-400 font-medium">
            <NavLink to="/" className="hover:text-cyberPurple transition-colors">Home</NavLink>
            <span>&gt;</span>
            <span className="text-white font-semibold">Projects</span>
          </div>

          <p className="text-slate-400 mt-4 text-sm sm:text-base max-w-xl mx-auto leading-relaxed pt-2">
            Discover a curated showcase of full-stack systems, interactive AI interfaces, and production-ready applications built to solve real-world problems.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center items-center gap-3 mb-16 scroll-reveal" style={{ transitionDelay: '100ms' }}>
          {['All', 'Website', 'Apps', 'Digital', 'Content'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-6 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-350 cursor-pointer ${
                activeFilter === cat
                  ? 'bg-gradient-to-r from-cyberPurple to-indigo-600 text-white shadow-lg shadow-purple-900/30'
                  : 'bg-[#120F1F] border border-slate-800 text-slate-400 hover:text-white hover:border-cyberPurple/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto" style={{ perspective: '1200px' }}>
          {filteredProjects.map((work, idx) => (
            <div
              key={work.id}
              className="bg-[#120F1F] border border-slate-900 rounded-3xl p-6 flex flex-col group hover:border-cyberPurple/20 transition-all duration-500 shadow-2xl relative overflow-hidden project-card-reveal"
              style={{ transitionDelay: `${idx * 120}ms` }}
            >
              
              {/* Visual Thumbnail Link */}
              <Link
                to={`/project/${work.id}`}
                className="block relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-900 flex items-center justify-center p-3 mb-6 group-hover:opacity-95 transition-all duration-300 hover:border-cyberPurple/30"
              >
                <img
                  src={work.img}
                  alt={work.title}
                  className="w-full h-auto rounded-xl object-contain border border-slate-800/60 group-hover:scale-[1.015] transition-transform duration-700"
                />
              </Link>

              {/* Info Detail Block */}
              <div className="flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <Link to={`/project/${work.id}`}>
                      <h3 className="text-xl font-display font-bold text-white hover:text-cyberPurple transition-colors leading-tight">
                        {work.title}
                      </h3>
                    </Link>
                    <span className="px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-cyberPurple/10 text-cyberPurple border border-cyberPurple/20">
                      {work.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed mb-6">
                    {work.description}
                  </p>
                  
                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1.5">
                    {work.tech.map((t, tIdx) => (
                      <span key={tIdx} className="px-2.5 py-0.5 rounded bg-slate-950 text-[10px] text-slate-400 border border-slate-900 font-mono">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
