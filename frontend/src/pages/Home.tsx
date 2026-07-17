import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Download, ArrowUpRight, GraduationCap, Medal, Calendar } from 'lucide-react';
import { FaTwitter, FaLinkedin, FaGithub, FaJava, FaGitAlt } from 'react-icons/fa';
import { SiPython, SiMongodb, SiReact, SiJavascript, SiLeetcode } from 'react-icons/si';
import avatarImg from '../assets/avatar_portrait.jpg';
import projectMockup1 from '../assets/project_mockup_1.png';
import projectMockup2 from '../assets/project_mockup_2.png';
import blogCover1 from '../assets/blog_cover_1.png';
import { API_URL } from '../config/api';

export default function Home() {
  const [activeFilter, setActiveFilter] = useState('All');

  const [typedText, setTypedText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const rolesList = ['Full Stack Dev +', 'Backend Dev +', 'UX Designer +'];

  useEffect(() => {
    const currentWord = rolesList[wordIndex];
    
    // Determine dynamic delays based on state transitions
    let delay = 100; // base typing speed
    
    if (isDeleting) {
      delay = 45; // slightly faster backspacing
    } else if (typedText === currentWord) {
      delay = 2000; // pause at fully written role
    } else if (typedText === '') {
      delay = 400; // pause at empty role before starting next role
    }

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setTypedText(currentWord.substring(0, typedText.length + 1));
        if (typedText === currentWord) {
          setIsDeleting(true);
        }
      } else {
        setTypedText(currentWord.substring(0, typedText.length - 1));
        if (typedText === '') {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % rolesList.length);
        }
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [typedText, isDeleting, wordIndex]);

  // Removed local observer (now handled globally in App.tsx)
  const qualityServices = [
    {
      num: '01',
      title: 'Full Stack Development',
      desc: 'MERN stack mein production-ready applications banata hu. Readify AI (solo-built book reading platform) live deployed hai Vercel/Railway pe, real users ke saath. React, Node.js, Express, MongoDB mein hands-on experience.'
    },
    {
      num: '02',
      title: 'AI/ML Integration',
      desc: 'YOLOv8 based Smart Parking System (final year project) aur Groq LLaMA + SerpAPI use karke automated content generation bot banaya hai. AI ko real-world apps mein integrate karne ka practical experience.'
    },
    {
      num: '03',
      title: 'DSA & Problem Solving',
      desc: 'Java mein 156+ LeetCode problems solve kiye hain — Arrays, HashMaps, Two Pointers, Sliding Window, Prefix Sum. Pattern-based structured approach se strong problem-solving foundation.'
    },
    {
      num: '04',
      title: 'SEO & Performance Optimization',
      desc: 'Readify AI pe complete technical SEO overhaul kiya — Googlebot indexing fix, sitemap optimization, GA4 setup. PageSpeed score 57 se 86 tak improve kiya code splitting aur lazy loading se.'
    }
  ];

  // Recent Works / Projects Data
  const recentWorks = [
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
    }
  ];

  const filteredWorks = activeFilter === 'All' 
    ? recentWorks 
    : recentWorks.filter(w => w.category === activeFilter);

  // Experience & Education Data
  const experiences = [
    {
      duration: '2026 - Present',
      title: 'Prabhat Production',
      desc: 'Solo Full Stack Developer. Readify AI production app live, real users'
    },
    {
      duration: '2026',
      title: 'Final Year Project',
      desc: 'Smart Parking System (YOLOv8), Parul University'
    },
    {
      duration: '2025 - Present',
      title: 'DSA Practice',
      desc: '156+ LeetCode problems (Java), pattern-based prep'
    }
  ];

  const educations = [
    {
      duration: '2024 - 2027',
      title: 'B.Tech, Computer Engineering (AI Specialization)',
      desc: 'Parul University, Vadodara'
    },
    {
      duration: '2021 - 2023',
      title: 'Diploma in Computer Engineering',
      desc: 'Zeal Education Society Pune'
    },
    {
      duration: '2017 - 2019',
      title: 'Vishweshwar Singh Janta College',
      desc: 'Intermediate (Class XII)'
    },
    {
      duration: '2016 - 2017',
      title: 'Anoop High School Bhatshimar',
      desc: 'Secondary Education (10th Grade, Rajnagar Bihar)'
    }
  ];

  // Mockup Skills Data
  const mockupSkills = [
    { name: 'Java', percent: '60%', icon: <FaJava className="w-12 h-12 text-[#EA2D42] group-hover:scale-110 transition-transform duration-300" /> },
    { name: 'Python', percent: '20%', icon: <SiPython className="w-12 h-12 text-[#3776AB] group-hover:scale-110 transition-transform duration-300" /> },
    { name: 'MongoDB', percent: '30%', icon: <SiMongodb className="w-12 h-12 text-[#47A248] group-hover:scale-110 transition-transform duration-300" /> },
    { name: 'React', percent: '50%', icon: <SiReact className="w-12 h-12 text-[#61DAFB] group-hover:scale-110 transition-transform duration-300" /> },
    { name: 'JS', percent: '40%', icon: <SiJavascript className="w-12 h-12 text-[#F7DF1E] group-hover:scale-110 transition-transform duration-300" /> },
    { name: 'Git & GitHub', percent: '80%', icon: <FaGitAlt className="w-12 h-12 text-[#F05032] group-hover:scale-110 transition-transform duration-300" /> }
  ];

  const [recentBlogs, setRecentBlogs] = useState<any[]>([]);

  useEffect(() => {
    const fetchRecentBlogs = async () => {
      try {
        const response = await fetch(`${API_URL}/api/blogs`);
        if (response.ok) {
          const data = await response.json();
          const mapped = data
            .filter((b: any) => b.status === 'Published')
            .slice(0, 3)
            .map((b: any) => ({
              id: b.slug || b._id,
              tag: b.category.toUpperCase(),
              date: new Date(b.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
              title: b.title,
              img: b.coverImage || blogCover1
            }));
          setRecentBlogs(mapped);
        }
      } catch (err) {
        console.error('Failed to fetch recent blogs:', err);
      }
    };
    fetchRecentBlogs();
  }, []);

  return (
    <div className="radial-spotlight bg-grid-mesh min-h-screen pt-20">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[85vh] flex flex-col justify-center overflow-hidden px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-16">
        
        {/* Glow Effects */}
        <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-cyberPurple/10 blur-[130px] pointer-events-none"></div>
        <div className="absolute top-1/2 right-10 w-[400px] h-[400px] rounded-full bg-cyberViolet/10 blur-[130px] pointer-events-none"></div>

        {/* Faint Background Text "HI" Outline */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden">
          <span
            className="text-[15rem] sm:text-[24rem] font-display font-black text-transparent leading-none tracking-tighter heartbeat-hi select-none"
            style={{
              WebkitTextStroke: '2px var(--hi-stroke-color)'
            }}
          >
            HI
          </span>
        </div>

        {/* Hero columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 w-full mb-16">
          
          {/* Left Column: Intro + Copy */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <span className="text-slate-600 dark:text-slate-300 font-display font-medium text-lg sm:text-2xl tracking-wide block">
              I am <span className="text-black dark:text-white font-semibold capitalize">prabhat</span>
            </span>
            
            <h1 className="text-4xl sm:text-6xl font-display font-extrabold tracking-tight leading-[1.1]">
              <span className="block bg-gradient-to-r from-cyberPurple to-black dark:to-white bg-clip-text text-transparent">
                Web Developer +
              </span>
              <span className="bg-gradient-to-r from-cyberPurple to-black dark:to-white bg-clip-text text-transparent typing-cursor pr-2">
                {typedText}
              </span>
            </h1>

            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed max-w-xl">
              I break down complex user experience problems to create integrity focussed solutions that connect billions of people.
            </p>

            {/* CTA + Socials Row */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href="/cv.pdf"
                download="Prabhat_Kumar_CV.pdf"
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-full border border-cyberPurple/60 hover:border-cyberPurple text-cyberPurple hover:bg-cyberPurple hover:text-[#06030F] text-sm font-semibold transition-all duration-300 tracking-wider shadow-lg shadow-purple-900/10"
              >
                <span>Download CV</span>
                <Download className="w-4 h-4" />
              </a>

              <div className="flex space-x-2">
                <a
                  href="https://x.com/Prabhat1117768"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-cyberPurple/30 text-cyberPurple/80 hover:text-white hover:border-cyberPurple flex items-center justify-center transition-all bg-slate-900/10 hover:bg-cyberPurple/10"
                  aria-label="Twitter Profile"
                >
                  <FaTwitter className="w-4.5 h-4.5" />
                </a>
                <a
                  href="https://leetcode.com/u/prabhatyadav1234/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-cyberPurple/30 text-cyberPurple/80 hover:text-white hover:border-cyberPurple flex items-center justify-center transition-all bg-slate-900/10 hover:bg-cyberPurple/10"
                  aria-label="LeetCode Profile"
                >
                  <SiLeetcode className="w-4.5 h-4.5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/prabhat-kumar-682203210/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BGLPsqr%2BKSHuH8dKKxRthyg%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-cyberPurple/30 text-cyberPurple/80 hover:text-white hover:border-cyberPurple flex items-center justify-center transition-all bg-slate-900/10 hover:bg-cyberPurple/10"
                  aria-label="LinkedIn Profile"
                >
                  <FaLinkedin className="w-4.5 h-4.5" />
                </a>
                <a
                  href="https://github.com/Prabhat-kumaar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-cyberPurple/30 text-cyberPurple/80 hover:text-white hover:border-cyberPurple flex items-center justify-center transition-all bg-slate-900/10 hover:bg-cyberPurple/10"
                  aria-label="GitHub Profile"
                >
                  <FaGithub className="w-4.5 h-4.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Tilted Avatar Container */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end relative">
            <div className="relative group w-72 h-[340px] sm:w-80 sm:h-[370px]">
              
              {/* Purple border offset box */}
              <div className="absolute inset-0 border-2 border-cyberPurple/60 rounded-3xl translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500 pointer-events-none"></div>

              {/* Main portrait wrapper */}
              <div className="w-full h-full rounded-3xl overflow-hidden relative border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#130F1F] flex items-center justify-center shadow-2xl group-hover:scale-[1.01] transition-transform duration-500">
                <img
                  src={avatarImg}
                  alt="Developer Portrait"
                  className="w-full h-full object-cover object-top grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
                />
              </div>

            </div>
          </div>

        </div>

        {/* Bottom: Stats horizontal bar */}
        <div className="w-full border-t border-slate-200 dark:border-slate-900/60 pt-10 pb-6 grid grid-cols-2 md:grid-cols-4 gap-6 relative z-10">
          
          <div className="flex items-center">
            <span className="text-4xl sm:text-5xl font-display font-extrabold text-black dark:text-white">1+</span>
            <span className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-400 ml-3.5 leading-snug font-sans">
              Years of<br />Coding experience
            </span>
          </div>

          <div className="flex items-center">
            <span className="text-4xl sm:text-5xl font-display font-extrabold text-black dark:text-white">6+</span>
            <span className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-400 ml-3.5 leading-snug font-sans">
              Projects<br />Built
            </span>
          </div>

          <div className="flex items-center">
            <span className="text-4xl sm:text-5xl font-display font-extrabold text-black dark:text-white">156+</span>
            <span className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-400 ml-3.5 leading-snug font-sans">
              DSA Problems<br />Solved
            </span>
          </div>

          <div className="flex items-center">
            <span className="text-4xl sm:text-5xl font-display font-extrabold text-black dark:text-white">1</span>
            <span className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-400 ml-3.5 leading-snug font-sans">
              Production<br />App Live
            </span>
          </div>

        </div>
      </section>

      {/* 2. MY QUALITY SERVICES SECTION */}
      <section id="services" className="py-28 bg-[#07050B] border-t border-b border-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center mb-20 scroll-reveal">
            <h2 className="text-4xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
              My <span className="bg-gradient-to-r from-cyberPurple to-indigo-400 bg-clip-text text-transparent">Quality Services</span>
            </h2>
            <p className="text-slate-400 mt-4 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
              We put your ideas and thus your wishes in the form of a unique web project that inspires you and you customers.
            </p>
          </div>

          {/* List items */}
          <div className="max-w-5xl mx-auto border-t border-slate-800/60">
            {qualityServices.map((service, idx) => (
              <div
                key={service.num}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center py-8 px-6 border-b border-slate-800/65 transition-all duration-500 rounded-xl hover:bg-gradient-to-r hover:from-cyberPurple hover:to-indigo-750 group hover:border-transparent cursor-pointer hover:shadow-2xl hover:scale-[1.005] scroll-reveal"
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                
                {/* Number & Title */}
                <div className="md:col-span-4 flex items-center space-x-6">
                  <span className="text-lg font-sans font-bold text-cyberPurple group-hover:text-white transition-colors">
                    {service.num}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-white transition-colors group-hover:text-white">
                    {service.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="md:col-span-7 text-sm text-slate-400 group-hover:text-slate-100 transition-colors leading-relaxed md:pr-8">
                  {service.desc}
                </p>

                {/* Rotating Arrow Indicator */}
                <div className="md:col-span-1 flex items-center justify-start md:justify-end">
                  <div className="w-10 h-10 rounded-full border border-cyberPurple/30 group-hover:border-white/20 group-hover:bg-white/10 flex items-center justify-center transition-all">
                    <ArrowUpRight className="w-5 h-5 text-cyberPurple group-hover:text-white transition-all duration-350 transform rotate-90 group-hover:rotate-0" />
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. MY RECENT WORKS SECTION */}
      <section id="projects" className="py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-slate-950/60">
        
        {/* Header */}
        <div className="text-center mb-10 scroll-reveal">
          <h2 className="text-4xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            My <span className="bg-gradient-to-r from-cyberPurple to-indigo-400 bg-clip-text text-transparent">Recent Works</span>
          </h2>
          <p className="text-slate-400 mt-4 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Discover a curated showcase of full-stack systems, interactive AI interfaces, and production-ready applications built to solve real-world problems.
          </p>
        </div>

        {/* Filter categories */}
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

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto" style={{ perspective: '1200px' }}>
          {filteredWorks.map((work, idx) => (
            <div
              key={idx}
              className="bg-[#120F1F] border border-slate-900 rounded-3xl p-6 flex flex-col group hover:border-cyberPurple/20 transition-all duration-500 shadow-2xl relative overflow-hidden project-card-reveal"
              style={{ transitionDelay: `${(idx % 3) * 200}ms` }}
            >
              {/* Visual Thumbnail (Clickable link to details) */}
              <Link to={`/project/${work.id}`} className="block relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-900 flex items-center justify-center p-3 mb-6 group-hover:opacity-95 transition-all duration-300 hover:border-cyberPurple/30">
                <img
                  src={work.img}
                  alt={work.title}
                  className="w-full h-auto rounded-xl object-contain border border-slate-800/60 group-hover:scale-[1.015] transition-transform duration-700"
                />
              </Link>

              {/* Title & Category info overlay */}
              <div className="flex-1 flex flex-col justify-between">
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
                  <div className="flex flex-wrap gap-1.5 mb-6">
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

      </section>

      {/* 4. EXPERIENCE & EDUCATION SECTION */}
      <section id="qualifications" className="py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-slate-955/60">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Column 1: Experience */}
          <div className="space-y-8">
            <div className="flex items-center space-x-4 mb-6">
              <Medal className="w-10 h-10 text-cyberPurple" />
              <h2 className="text-4xl sm:text-5xl font-display font-extrabold text-white">
                My <span className="text-cyberPurple">Experience</span>
              </h2>
            </div>
            
            <div className="space-y-6">
              {experiences.map((exp, idx) => (
                <div
                  key={idx}
                  className="bg-[#120F1F] border border-slate-900/60 hover:border-cyberPurple/20 rounded-2xl p-6 transition-all duration-300 shadow-xl group hover:scale-[1.005] fly-in-up"
                  style={{ transitionDelay: `${idx * 150}ms` }}
                >
                  <span className="text-sm font-semibold text-cyberPurple font-sans block mb-2">
                    {exp.duration}
                  </span>
                  <h3 className="text-lg font-bold text-white font-display leading-tight mb-1">
                    {exp.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-450 font-medium">
                    {exp.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Education */}
          <div className="space-y-8">
            <div className="flex items-center space-x-4 mb-6">
              <GraduationCap className="w-10 h-10 text-cyberPurple" />
              <h2 className="text-4xl sm:text-5xl font-display font-extrabold text-white">
                My <span className="text-cyberPurple">Education</span>
              </h2>
            </div>

            <div className="space-y-6">
              {educations.map((edu, idx) => (
                <div
                  key={idx}
                  className="bg-[#120F1F] border border-slate-900/60 hover:border-cyberPurple/20 rounded-2xl p-6 transition-all duration-300 shadow-xl group hover:scale-[1.005] fly-in-up"
                  style={{ transitionDelay: `${idx * 150}ms` }}
                >
                  <span className="text-sm font-semibold text-cyberPurple font-sans block mb-2">
                    {edu.duration}
                  </span>
                  <h3 className="text-lg font-bold text-white font-display leading-tight mb-1">
                    {edu.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-455 font-medium leading-relaxed">
                    {edu.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 5. MY SKILLS SECTION */}
      <section id="skills" className="py-28 bg-[#07050B] border-t border-b border-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center mb-20 scroll-reveal">
            <h2 className="text-4xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
              My <span className="bg-gradient-to-r from-cyberPurple to-indigo-400 bg-clip-text text-transparent">Skills</span>
            </h2>
            <p className="text-slate-400 mt-4 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
              We put your ideas and thus your wishes in the form of a unique web project that inspires you and you customers.
            </p>
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 max-w-5xl mx-auto">
            {mockupSkills.map((skill, index) => {
              const isLeftFly = index < 3; // Python, Firebase, MongoDB are index 0, 1, 2
              const delay = isLeftFly ? index * 120 : (index - 3) * 120;
              return (
                <div
                  key={index}
                  className={`flex flex-col items-center group cursor-pointer ${
                    isLeftFly ? 'skill-fly-left' : 'skill-fly-right'
                  }`}
                  style={{ transitionDelay: `${delay}ms` }}
                >
                  <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl bg-[#120F1F] border border-slate-900 group-hover:border-cyberPurple/40 flex flex-col items-center justify-center p-4 transition-all duration-300 shadow-xl group-hover:shadow-purple-950/20">
                    {skill.icon}
                    <span className="text-base font-display font-extrabold text-white mt-3 group-hover:text-cyberPurple transition-colors">
                      {skill.percent}
                    </span>
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-cyberPurple group-hover:text-white mt-4 transition-colors">
                    {skill.name}
                  </span>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 6. RECENT BLOGS SECTION (Added after My Skills) */}
      <section id="blogs" className="py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-slate-950/60">
        
        {/* Header */}
        <div className="text-center mb-20 scroll-reveal">
          <h2 className="text-4xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            Recent <span className="bg-gradient-to-r from-cyberPurple to-indigo-400 bg-clip-text text-transparent">Blogs</span>
          </h2>
          <p className="text-slate-400 mt-4 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Explore my write-ups, deep-dives into MERN architectures, AI model integration guides, and placement preparation logs.
          </p>
        </div>

        {/* Blogs Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto" style={{ perspective: '1200px' }}>
          {recentBlogs.map((blog: any, idx: number) => (
            <Link
              key={blog.id}
              to={`/blog/${blog.id}`}
              className="bg-[#120F1F] border border-slate-900 rounded-3xl overflow-hidden shadow-2xl relative flex flex-col group hover:border-cyberPurple/20 transition-all duration-500 hover:scale-[1.01] project-card-reveal"
              style={{ transitionDelay: `${idx * 150}ms` }}
            >
              
              {/* Cover Image Container */}
              <div className="h-56 w-full overflow-hidden relative border-b border-slate-950 bg-slate-950 flex items-center justify-center p-2">
                
                {/* Category Tag Overlay */}
                <span className="absolute top-4 left-4 z-20 px-3.5 py-1 text-[9px] font-bold uppercase tracking-wider rounded-full bg-gradient-to-r from-cyberPurple to-indigo-650 text-white shadow-md">
                  {blog.tag}
                </span>

                <img
                  src={blog.img}
                  alt={blog.title}
                  className="w-full h-full object-cover rounded-xl border border-slate-900/60 group-hover:scale-102 transition-transform duration-700"
                />
              </div>

              {/* Blue Overlay Banner at the Bottom */}
              <div className="bg-[#13112E]/90 border-t border-slate-800/20 p-5 flex flex-col space-y-2.5 w-full relative z-10">
                <div className="flex items-center text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                  <Calendar className="w-3.5 h-3.5 mr-2 text-cyberPurple" />
                  <span>{blog.date}</span>
                </div>
                
                <h3 className="text-base sm:text-lg font-display font-bold text-white group-hover:text-cyberPurple transition-colors leading-tight line-clamp-1">
                  {blog.title}
                </h3>
              </div>

            </Link>
          ))}
        </div>

      </section>

    </div>
  );
}
