import { useParams, NavLink } from 'react-router-dom';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import projectMockup1 from '../assets/project_mockup_1.png';
import projectMockup2 from '../assets/project_mockup_2.png';

interface ProjectDetailData {
  title: string;
  category: string;
  client: string;
  startDate: string;
  designer: string;
  shortDesc: string;
  longDesc: string;
  liveUrl: string;
  images: string[];
}

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();

  // Full project details dictionary
  const projectsData: Record<string, ProjectDetailData> = {
    'readify-dashboard': {
      title: 'ReadifyAI Custom Dashboard',
      category: 'Website Development',
      client: 'vbmcoder',
      startDate: 'June 22, 2024',
      designer: 'vaibhav mak',
      shortDesc: 'A premium, modern SaaS dashboard interface customized for AI reading and content analysis applications.',
      longDesc: 'ReadifyAI is a comprehensive dashboard layout designed to streamline text interactions. Built with React and optimized with Tailwind CSS, this project provides users with a clean interface to load documents, parse text tokens, and query AI APIs in real-time. The design prioritizes readability and dark mode contrast to satisfy long reading sessions.',
      liveUrl: 'https://readify-ai.vercel.app',
      images: [projectMockup1, projectMockup2, projectMockup1, projectMockup2]
    },
    'aimm-interface': {
      title: 'Aimm Work Faster Interface',
      category: 'Web Interface',
      client: 'vbmcoder',
      startDate: 'May 10, 2024',
      designer: 'vaibhav mak',
      shortDesc: 'A premium web layout optimized for high-performance visual tools and 3D web design assets representation.',
      longDesc: 'Aimm is a modern design platform built to represent high-speed workflows. Featuring custom floating components, interactive 3D character alignments, and dark-slate panels, it helps designers work faster. Optimized for extremely fast load speeds and seamless transition micro-animations.',
      liveUrl: 'https://aimm.example.com',
      images: [projectMockup2, projectMockup1, projectMockup2, projectMockup1]
    },
    'book-verse': {
      title: 'Book-verse Bookstore',
      category: 'E-Commerce Platform',
      client: 'vbmcoder',
      startDate: 'April 05, 2024',
      designer: 'vaibhav mak',
      shortDesc: 'An elegant e-commerce book community platform where readers review books, track readings, and share notes.',
      longDesc: 'Book-verse is a dedicated hub for book collectors and casual readers. It integrates stripes checkouts, reviews management, and personal book lists. The visual container emphasizes cover art and structured reading parameters for a clean experience.',
      liveUrl: 'https://book-verse.vercel.app',
      images: [projectMockup1, projectMockup2, projectMockup1, projectMockup2]
    },
    'saas-landing': {
      title: 'SaaS Minimalist Layout',
      category: 'Landing Page Design',
      client: 'vbmcoder',
      startDate: 'March 18, 2024',
      designer: 'vaibhav mak',
      shortDesc: 'A sleek, hyper-converting single-page landing layout perfect for modern developer utilities.',
      longDesc: 'SaaS Minimalist Layout is designed to load under 500ms and maximize email capture rates. Built for indie-hackers and micro-SaaS developers, it contains clean pricing cards, inline SVG assets, and a fully customizable Tailwind styling base.',
      liveUrl: 'https://react.dev',
      images: [projectMockup2, projectMockup1, projectMockup2, projectMockup1]
    },
    'editorial-platform': {
      title: 'Creative Editorial Platform',
      category: 'Editorial Platform',
      client: 'vbmcoder',
      startDate: 'February 12, 2024',
      designer: 'vaibhav mak',
      shortDesc: 'A tech writing space housing logs of placements prep, R3F layouts, and system configurations.',
      longDesc: 'Creative Editorial Platform utilizes MDX loading to deliver articles with embedded React elements. The clean typography and light-to-dark adjustments ensure readers can explore system designs and algorithms roadmaps comfortably.',
      liveUrl: '/blog',
      images: [projectMockup1, projectMockup2, projectMockup1, projectMockup2]
    },
    'task-manager': {
      title: 'Task Management System',
      category: 'Application Developer',
      client: 'vbmcoder',
      startDate: 'January 20, 2024',
      designer: 'vaibhav mak',
      shortDesc: 'A rich visual team collaboration application featuring customizable drag-and-drop workflow boards and role permissions.',
      longDesc: 'Task Management System delivers high performance tracking. Built on React and optimized with Tailwind CSS, it offers team leads direct control over sprints, task assignments, and progress logs. Its fast update triggers keep teams working in perfect alignment.',
      liveUrl: 'https://github.com',
      images: [projectMockup2, projectMockup1, projectMockup2, projectMockup1]
    },
    'portfolio-3d': {
      title: '3D Interactive Portfolio',
      category: 'Digital Representation',
      client: 'vbmcoder',
      startDate: 'December 12, 2023',
      designer: 'vaibhav mak',
      shortDesc: 'A state-of-the-art interactive R3F landing space showing custom mesh shaders and rotation controls.',
      longDesc: '3D Interactive Portfolio pushes the limits of modern web representation. Utilizing React Three Fiber, Framer Motion, and GSAP, it lets readers explore tech stacks through physics models and particle fields. The theme and shaders scale perfectly across all screens.',
      liveUrl: '/',
      images: [projectMockup1, projectMockup2, projectMockup1, projectMockup2]
    },
    'finance-tracker': {
      title: 'Apex Finance Dashboard',
      category: 'Website Platform',
      client: 'vbmcoder',
      startDate: 'November 05, 2023',
      designer: 'vaibhav mak',
      shortDesc: 'An analytics chart panel detailing crypto prices, calculating balances, and monitoring currency transactions.',
      longDesc: 'Apex Finance Dashboard helps users monitor assets with ease. Powered by Recharts for visual charts and styled with premium dark panels, it links to exchange APIs to draw real-time indices. Caching proxies ensure quick loading speeds.',
      liveUrl: 'https://github.com',
      images: [projectMockup2, projectMockup1, projectMockup2, projectMockup1]
    }
  };

  const project = id ? projectsData[id] : null;

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-28">
        <h2 className="text-2xl font-bold text-white mb-4">Project Not Found</h2>
        <NavLink to="/" className="px-4 py-2 bg-cyberPurple text-white rounded-full text-sm font-semibold hover:opacity-90">
          Back to Home
        </NavLink>
      </div>
    );
  }

  return (
    <div className="radial-spotlight bg-grid-mesh min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <NavLink
          to="/#projects"
          className="inline-flex items-center text-xs font-bold text-slate-400 hover:text-cyberPurple uppercase tracking-wider mb-10 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform" />
          <span>Back to Projects</span>
        </NavLink>

        {/* Project Header Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          
          {/* Left Column: Title + Desc + Live Preview button */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-white leading-tight">
              {project.title}
            </h1>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-2xl">
              {project.shortDesc}
            </p>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-8 py-3 rounded-full bg-gradient-to-r from-cyberPurple to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-sm font-bold uppercase tracking-wider transition-all shadow-lg shadow-purple-900/20"
            >
              <span>Live Preview</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Right Column: Metadata Grid */}
          <div className="lg:col-span-5 bg-[#120F1F]/60 border border-slate-900 rounded-3xl p-8">
            <div className="grid grid-cols-2 gap-y-6 gap-x-8">
              <div>
                <span className="text-xs text-slate-500 uppercase tracking-wider block mb-1">Category</span>
                <span className="text-sm sm:text-base font-bold text-white">{project.category}</span>
              </div>
              <div>
                <span className="text-xs text-slate-500 uppercase tracking-wider block mb-1">Client</span>
                <span className="text-sm sm:text-base font-bold text-white">{project.client}</span>
              </div>
              <div>
                <span className="text-xs text-slate-500 uppercase tracking-wider block mb-1">Start Date</span>
                <span className="text-sm sm:text-base font-bold text-white">{project.startDate}</span>
              </div>
              <div>
                <span className="text-xs text-slate-500 uppercase tracking-wider block mb-1">Designer</span>
                <span className="text-sm sm:text-base font-bold text-white">{project.designer}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Gallery Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-16">
          {project.images.map((img, index) => (
            <div key={index} className="rounded-2xl overflow-hidden bg-slate-950 border border-slate-900 shadow-xl group cursor-pointer hover:border-cyberPurple/25 transition-all">
              <img
                src={img}
                alt={`${project.title} Preview ${index + 1}`}
                className="w-full h-auto object-cover group-hover:scale-102 transition-transform duration-500"
              />
            </div>
          ))}
        </div>

        {/* Project Description */}
        <div className="border-t border-slate-900/60 pt-12 max-w-4xl">
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">
            Project Description
          </h2>
          <div className="w-16 h-1 bg-cyberPurple mt-3 mb-8 rounded-full"></div>
          
          <p className="text-slate-350 leading-relaxed text-sm sm:text-base whitespace-pre-line">
            {project.longDesc}
          </p>
        </div>

      </div>
    </div>
  );
}
