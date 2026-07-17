import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Eye, Search, Copy, Check } from 'lucide-react';
import { FaFacebookF, FaTwitter, FaWhatsapp, FaLinkedinIn } from 'react-icons/fa';
import blogCover1 from '../assets/blog_cover_1.png';
import blogCover2 from '../assets/blog_cover_2.png';
import blogCover3 from '../assets/blog_cover_3.png';

interface SidebarRecentPost {
  id: string;
  title: string;
  img: string;
  tags: string[];
}

interface ArticleData {
  title: string;
  category: string;
  date: string;
  comments: string;
  img: string;
  tags: string[];
  contentHtml: React.ReactNode;
}

interface BlogReply {
  author: string;
  date: string;
  repliesTo: string;
  topic: string;
  content: string;
}

interface BlogComment {
  id: string;
  author: string;
  date: string;
  topic: string;
  content: string;
  replies: BlogReply[];
}

const parseMarkdownToJSX = (text: string, copiedState: string | null, setCopied: (s: string | null) => void): React.ReactNode => {
  if (!text) return null;

  const lines = text.split('\n');
  const elements: React.ReactNode[] = [];
  let currentCodeBlock: string[] = [];
  let isInsideCode = false;
  let codeLang = '';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Handle Code Blocks
    if (line.trim().startsWith('```')) {
      if (isInsideCode) {
        const codeText = currentCodeBlock.join('\n');
        const blockId = `code-block-${i}`;
        elements.push(
          <div key={blockId} className="relative my-6 rounded-xl bg-slate-950 border border-slate-800 p-5 font-mono text-xs text-slate-300">
            <div className="flex justify-between items-center mb-3 text-slate-500 border-b border-slate-900 pb-2">
              <span className="capitalize">{codeLang || 'Code'}</span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(codeText);
                  setCopied(blockId);
                  setTimeout(() => setCopied(null), 2000);
                }}
                className="flex items-center space-x-1.5 px-2 py-1 rounded bg-slate-950 hover:bg-slate-850 hover:text-white transition-all text-[11px] cursor-pointer"
              >
                {copiedState === blockId ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-green-500" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy code</span>
                  </>
                )}
              </button>
            </div>
            <pre className="overflow-x-auto"><code>{codeText}</code></pre>
          </div>
        );
        currentCodeBlock = [];
        isInsideCode = false;
      } else {
        isInsideCode = true;
        codeLang = line.trim().replace('```', '');
      }
      continue;
    }

    if (isInsideCode) {
      currentCodeBlock.push(line);
      continue;
    }

    // Handle Headings
    if (line.startsWith('# ')) {
      elements.push(<h1 key={i} className="text-2xl sm:text-3xl font-extrabold text-white mt-8 mb-4">{line.replace('# ', '')}</h1>);
      continue;
    }
    if (line.startsWith('## ')) {
      elements.push(<h2 key={i} className="text-xl sm:text-2xl font-bold text-white mt-6 mb-3">{line.replace('## ', '')}</h2>);
      continue;
    }
    if (line.startsWith('### ')) {
      elements.push(<h3 key={i} className="text-lg sm:text-xl font-bold text-white mt-5 mb-2">{line.replace('### ', '')}</h3>);
      continue;
    }

    // Handle Lists
    if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
      elements.push(
        <ul key={i} className="list-disc pl-6 space-y-1 my-3 text-slate-300">
          <li>{line.replace(/^[\s-*-]+/, '')}</li>
        </ul>
      );
      continue;
    }
    if (/^\d+\.\s/.test(line.trim())) {
      elements.push(
        <ol key={i} className="list-decimal pl-6 space-y-1 my-3 text-slate-300">
          <li>{line.replace(/^\d+\.\s/, '')}</li>
        </ol>
      );
      continue;
    }

    // Handle standard paragraph text or empty space
    if (line.trim() === '') {
      elements.push(<div key={i} className="h-2" />);
    } else {
      elements.push(<p key={i} className="text-slate-300 leading-relaxed my-3">{line}</p>);
    }
  }

  return <>{elements}</>;
};

export default function BlogDetail() {
  const { id } = useParams<{ id: string }>();
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Leave a Reply Form State (for new main comments)
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formTitle, setFormTitle] = useState('');
  const [formContent, setFormContent] = useState('');

  // Replying to a Comment State
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null);
  const [replyName, setReplyName] = useState('');
  const [replyEmail, setReplyEmail] = useState('');
  const [replyTitle, setReplyTitle] = useState('');
  const [replyContent, setReplyContent] = useState('');

  // Initial comments data mapping matching mockup
  const initialComments: Record<string, BlogComment[]> = {
    'building-readifyai': [
      {
        id: '1',
        author: 'Logo',
        date: '7/28/2024, 1:29:45 PM',
        topic: 'Logo',
        content: 'Google LLC is an American multinational corporation and technology company focusing on online advertising, search engine technology, cloud computing, computer software, quantum computing, e-commerce, consumer electronics,',
        replies: [
          {
            author: 'Logo Picture',
            date: '7/28/2024, 1:41:12 PM',
            repliesTo: 'logo',
            topic: 'Picture',
            content: "Search the world's information, including webpages, images, videos and more. Google has many special features to help you find exactly what you're looking ..."
          },
          {
            author: 'Logo Children',
            date: '7/28/2024, 1:31:19 PM',
            repliesTo: 'logo',
            topic: 'Chote',
            content: 'This comment is a reply demonstrating nested threads and reply triggers for children comments.'
          }
        ]
      }
    ],
    'placement-prep-journey': [],
    'react-three-fiber-ux': []
  };

  const [commentsList, setCommentsList] = useState<Record<string, BlogComment[]>>(() => {
    const saved = localStorage.getItem('blogComments');
    if (saved) return JSON.parse(saved);
    return initialComments;
  });

  useEffect(() => {
    localStorage.setItem('blogComments', JSON.stringify(commentsList));
  }, [commentsList]);

  const recentSidebarPosts: SidebarRecentPost[] = (() => {
    const saved = localStorage.getItem('blogs');
    if (saved) {
      const parsed = JSON.parse(saved) as any[];
      return parsed
        .filter(b => b.status === 'Published')
        .slice(0, 3)
        .map(b => ({
          id: b.id,
          title: b.title,
          img: b.img || blogCover1,
          tags: b.tags || []
        }));
    }
    return [
      {
        id: 'building-readifyai',
        title: 'Building a Blog With Next.js and MDX',
        img: blogCover1,
        tags: ['javascript', 'nextjs', 'reactjs']
      },
      {
        id: 'placement-prep-journey',
        title: 'Next.js 14.2',
        img: blogCover2,
        tags: ['nextjs']
      },
      {
        id: 'saas-landing',
        title: 'Next.js 15 RC',
        img: blogCover3,
        tags: ['nextjs']
      }
    ];
  })();

  const categories = (() => {
    const saved = localStorage.getItem('blogs');
    const blogsData = saved ? JSON.parse(saved) as any[] : [
      { category: 'Next Js', status: 'Published' },
      { category: 'Next Js', status: 'Published' },
      { category: 'React Js', status: 'Published' },
      { category: 'Next Js', status: 'Published' },
      { category: 'Node Js', status: 'Published' },
      { category: 'Css', status: 'Published' },
      { category: 'React Js', status: 'Published' },
      { category: 'Next Js', status: 'Published' }
    ];

    const counts: Record<string, number> = {};
    blogsData.forEach(b => {
      if (b.status === 'Published') {
        const catName = b.category || 'Other';
        counts[catName] = (counts[catName] || 0) + 1;
      }
    });

    return [
      { name: 'Next Js', count: counts['Next Js'] || 0 },
      { name: 'React', count: (counts['React'] || 0) + (counts['React Js'] || 0) },
      { name: 'Node js', count: counts['Node js'] || counts['Node Js'] || 0 },
      { name: 'Css', count: counts['Css'] || counts['CSS'] || 0 },
      { name: 'Flutter Dev', count: counts['Flutter Dev'] || 0 }
    ];
  })();

  const handleCopyCode = (codeText: string, blockId: string) => {
    navigator.clipboard.writeText(codeText);
    setCopiedCode(blockId);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  // Add new main comment
  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formContent.trim() || !id) return;

    // TODO: If a dynamic database comments feature is added, sanitize formContent with DOMPurify
    // to prevent XSS vulnerability before rendering back to other users.
    const newComment: BlogComment = {
      id: Date.now().toString(),
      author: formName,
      date: new Date().toLocaleString(),
      topic: formTitle || 'General',
      content: formContent,
      replies: []
    };

    setCommentsList(prev => ({
      ...prev,
      [id]: [...(prev[id] || []), newComment]
    }));

    // Reset Form
    setFormName('');
    setFormEmail('');
    setFormTitle('');
    setFormContent('');
  };

  // Add a reply to a comment
  const handlePostReply = (e: React.FormEvent, commentId: string) => {
    e.preventDefault();
    if (!replyName.trim() || !replyContent.trim() || !id) return;

    const targetComment = commentsList[id]?.find(c => c.id === commentId);
    if (!targetComment) return;

    const newReply: BlogReply = {
      author: replyName,
      date: new Date().toLocaleString(),
      repliesTo: targetComment.author.toLowerCase(),
      topic: replyTitle || 'Reply',
      content: replyContent
    };

    setCommentsList(prev => {
      const updated = (prev[id] || []).map(c => {
        if (c.id === commentId) {
          return {
            ...c,
            replies: [...c.replies, newReply]
          };
        }
        return c;
      });
      return {
        ...prev,
        [id]: updated
      };
    });

    // Reset reply form states
    setReplyName('');
    setReplyEmail('');
    setReplyTitle('');
    setReplyContent('');
    setActiveReplyId(null);
  };

  // Full detailed articles mock matching mockup content
  const articles: Record<string, ArticleData> = {
    'building-readifyai': {
      title: 'Building a Blog With Next.js and MDX',
      category: 'NEXT JS',
      date: 'June 22, 2024',
      comments: 'Comments (3)',
      img: blogCover1,
      tags: ['javascript', 'nextjs', 'reactjs'],
      contentHtml: (
        <>
          <p>
            Next.js has become one of the most popular React frameworks of today. Coupled with its ease of setup, the out-of-the-box features and optimizations it brings to the table will leave you wondering why you've been building React apps any other way.
          </p>
          <p>
            One of the major advantages of Next.js is its ability to create both Static Site Generated (SSG) and Server Side Rendered (SSR) apps, which are good for SEO. SSG means that the HTML pages, along with their styling, are generated during build time, whereas with SSR the HTML is generated on the server and sent to the client when a page request is made.
          </p>
          <p>
            Many companies, including TikTok, Netflix, and Twitch, are already using Next.js to build large applications. In this article, we're going to learn how to use Next.js and Markdown to build a blog. We'll also learn how to work with MDX, a library for writing JSX and React components inside Markdown files.
          </p>
          
          <h2>What we'll be building</h2>
          <p>
            We're going to learn about Next.js and MDX by building a blog. We'll learn how to set up Next.js apps, generate dynamic URLs, and work with data, images, Markdown, and Bootstrap. To follow along with this tutorial, you'll need a basic understanding of React and Markdown.
          </p>
          <p>
            At the end of this tutorial, you should have a Next.js blog that looks like this:
          </p>

          {/* MDX Sandbox Box (Image 1) */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 text-slate-800 shadow-xl my-8 font-sans text-left">
            <p className="text-slate-655 text-sm mb-2 font-medium">This is a blog post about Tailwind CSS.</p>
            <p className="text-slate-655 text-sm mb-6 font-medium">We'll learn how to set up and use Tailwind CSS.</p>
            
            <h3 className="text-lg font-bold text-slate-900 mb-2">This is a Markdown sub-heading</h3>
            <p className="text-slate-655 text-sm mb-6 font-medium">We just used a <code className="bg-slate-100 px-1 py-0.5 rounded text-rose-500 font-mono">###</code> subheading in our blog post.</p>

            <div className="bg-slate-50 border border-slate-150 p-4 rounded-xl font-mono text-xs text-slate-800 mb-6 space-y-1">
              <pre>
{`const doStuff = () => {
  return console.log('hey')
}`}
              </pre>
            </div>

            <div className="bg-slate-50 border border-slate-150 p-4 rounded-xl font-mono text-xs text-slate-800 mb-6 space-y-1">
              <pre>
{`// this is a code block
const doSomething = () => {
  return console.log('hey')
}`}
              </pre>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-slate-50 border border-slate-150 p-4 rounded-xl text-xs sm:text-sm text-slate-700">
              <span>Here, I'm using a component inside my My MarkDown file:</span>
              <button 
                onClick={() => alert('Interactive React Button Clicked inside MDX Container!')}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1.5 px-4 rounded transition-colors text-xs flex-shrink-0"
              >
                Click me
              </button>
            </div>
          </div>

          <h2>Setting up our app</h2>
          <p>
            To get started, you'll need to have Node.js installed on your computer. Here's a link to the installation guide. Next.js works with Node.js version 10.13 or later.
          </p>
          <p>
            The Node.js installation comes with npx, an npm package runner. To create a new Next.js app, run the following command on your terminal:
          </p>

          {/* Code block 1 */}
          <div className="relative my-6 rounded-xl bg-slate-950 border border-slate-850 p-5 font-mono text-xs text-slate-355">
            <div className="flex justify-between items-center mb-3 text-slate-500 border-b border-slate-900 pb-2">
              <span>Terminal</span>
              <button
                onClick={() => handleCopyCode('npx create-next-app nextjs-mdx-blog', 'terminal-setup')}
                className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded bg-slate-900 hover:bg-slate-850 hover:text-white transition-all text-[11px] font-sans font-semibold"
              >
                {copiedCode === 'terminal-setup' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-green-500" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy code</span>
                  </>
                )}
              </button>
            </div>
            <code>npx create-next-app nextjs-mdx-blog</code>
          </div>

          <p>
            This should generate a new Next.js application in a directory named nextjs-mdx-blog. To see what your Next.js app looks like on the browser, navigate to the newly created directory and run the following command:
          </p>

          {/* Code block 2 (Image 2) */}
          <div className="relative my-6 rounded-xl bg-slate-950 border border-slate-850 p-5 font-mono text-xs text-slate-355">
            <div className="flex justify-between items-center mb-3 text-slate-500 border-b border-slate-900 pb-2">
              <span>Terminal</span>
              <button
                onClick={() => handleCopyCode('npm run dev', 'npm-dev')}
                className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded bg-slate-900 hover:bg-slate-850 hover:text-white transition-all text-[11px] font-sans font-semibold"
              >
                {copiedCode === 'npm-dev' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-green-500" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy code</span>
                  </>
                )}
              </button>
            </div>
            <code>npm run dev</code>
          </div>

          <p>
            The default development server is http://localhost:3000. You should see something like this when you open the URL in your browser:
          </p>

          {/* Browser Preview Screenshot (Image 2) */}
          <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center shadow-xl my-8 font-sans flex flex-col items-center justify-center space-y-4">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-600">
              Welcome to <a href="https://nextjs.org" className="hover:underline">Next.js!</a>
            </h1>
            <p className="text-slate-655 text-sm sm:text-base font-medium">
              Get started by editing <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-xs text-rose-500">pages/index.js</code>
            </p>
          </div>

          <p>
            receive a JSON response that looks like this:
          </p>

          {/* JSON response block (Image 3) */}
          <div className="relative my-6 rounded-xl bg-slate-950 border border-slate-850 p-5 font-mono text-xs text-slate-355">
            <div className="flex justify-between items-center mb-3 text-slate-500 border-b border-slate-900 pb-2">
              <span>JSON Response</span>
              <button
                onClick={() => handleCopyCode('{\n  "name": "John Doe"\n}', 'json-response')}
                className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded bg-slate-900 hover:bg-slate-850 hover:text-white transition-all text-[11px] font-sans font-semibold"
              >
                {copiedCode === 'json-response' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-green-500" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy code</span>
                  </>
                )}
              </button>
            </div>
            <pre>
{`{
  "name": "John Doe"
}`}
            </pre>
          </div>
        </>
      )
    },
    'placement-prep-journey': {
      title: 'Next.js 14.2 Release Features',
      category: 'NEXT JS',
      date: 'June 22, 2024',
      comments: 'Comments (1)',
      img: blogCover2,
      tags: ['nextjs'],
      contentHtml: (
        <>
          <p>
            Next.js 14.2 is here, bringing significant updates for developer experience, build performance, and stability. In this log, we'll unpack the primary features introduced.
          </p>
          <h2>Improved Turbopack integration</h2>
          <p>
            This release refines Turbopack support for development builds. Compilation speed is improved by roughly 20%, reducing hot-reloading wait times to near-instantaneous intervals.
          </p>
          <h2>Memory Usage Optimizations</h2>
          <p>
            Building large applications can consume substantial memory. Version 14.2 limits heap usage during bundlings, optimizing processes for production deploys on memory-constrained servers.
          </p>
          <div className="relative my-6 rounded-xl bg-slate-950 border border-slate-800 p-5 font-mono text-xs text-slate-330">
            <div className="flex justify-between items-center mb-3 text-slate-500 border-b border-slate-900 pb-2">
              <span>Install command</span>
              <button
                onClick={() => handleCopyCode('npm i next@14.2.0', 'npm-install-14')}
                className="flex items-center space-x-1.5 px-2 py-1 rounded bg-slate-950 hover:bg-slate-850 hover:text-white transition-all text-[11px]"
              >
                {copiedCode === 'npm-install-14' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-green-500" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy code</span>
                  </>
                )}
              </button>
            </div>
            <code>npm i next@14.2.0</code>
          </div>
        </>
      )
    },
    'react-three-fiber-ux': {
      title: 'Next.js 15 RC Features & React Compiler Integration',
      category: 'REACT JS',
      date: 'June 22, 2024',
      comments: 'Comments (5)',
      img: blogCover3,
      tags: ['nextjs'],
      contentHtml: (
        <>
          <p>
            Next.js 15 Release Candidate introduces experimental support for the new React Compiler, async request APIs, and caching updates. Let's trace how these enhancements improve render speeds.
          </p>
          <h2>1. The React Compiler</h2>
          <p>
            Say goodbye to manual <code>useMemo</code> and <code>useCallback</code> annotations. The compiler analyzes hooks and dependencies, auto-memoizing component nodes out of the box.
          </p>
          <h2>2. Caching Defaults Changes</h2>
          <p>
            By default, fetch requests and page navigations are no longer cached indefinitely. The change encourages fresh data representation, making dynamic routes much more predictable.
          </p>
          <div className="relative my-6 rounded-xl bg-slate-950 border border-slate-800 p-5 font-mono text-xs text-slate-330">
            <div className="flex justify-between items-center mb-3 text-slate-500 border-b border-slate-900 pb-2">
              <span>Install Next.js 15 RC</span>
              <button
                onClick={() => handleCopyCode('npm i next@canary react@rc react-dom@rc', 'npm-install-15')}
                className="flex items-center space-x-1.5 px-2 py-1 rounded bg-slate-950 hover:bg-slate-850 hover:text-white transition-all text-[11px]"
              >
                {copiedCode === 'npm-install-15' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-green-500" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy code</span>
                  </>
                )}
              </button>
            </div>
            <code>npm i next@canary react@rc react-dom@rc</code>
          </div>
        </>
      )
    }
  };

  // Fallback article details for newly paginated blogs
  const fallbackArticle: ArticleData = {
    title: id ? id.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) : 'Modern Coding Architectures',
    category: 'NEXT JS',
    date: 'June 22, 2024',
    comments: 'Comments (0)',
    img: blogCover1,
    tags: ['javascript', 'nextjs', 'react'],
    contentHtml: (
      <>
        <p>
          Developing software in modern web development frameworks requires clean abstractions, high performance, and rapid compilation speeds. In this log, we outline standard architectures for routing and pagination setups.
        </p>
        <h2>Best Practices in Client Routers</h2>
        <p>
          Always keep pages responsive and load fallback components. Client-side pagination prevents excessive payload deliveries and decreases network traffic loads significantly.
        </p>
      </>
    )
  };

  const article = (() => {
    if (!id) return null;
    
    // 1. Try local storage first (allows dynamic blog viewing)
    const saved = localStorage.getItem('blogs');
    if (saved) {
      const parsed = JSON.parse(saved) as any[];
      const found = parsed.find(b => b.id === id || b.slug === id);
      if (found) {
        return {
          title: found.title,
          category: found.category.toUpperCase(),
          date: found.date,
          comments: `Comments (${commentsList[id]?.length || 0})`,
          img: found.img || blogCover1,
          tags: found.tags || [],
          contentHtml: (
            <div className="space-y-4 text-slate-300 leading-relaxed font-sans text-left">
              {parseMarkdownToJSX(found.content, copiedCode, setCopiedCode)}
            </div>
          )
        };
      }
    }

    // 2. Try hardcoded dictionary
    if (articles[id]) return articles[id];

    // 3. Fallback to default template
    return fallbackArticle;
  })();
  const currentComments = id ? (commentsList[id] || []) : [];

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-28">
        <h2 className="text-2xl font-bold text-white mb-4">Article Not Found</h2>
        <Link to="/" className="px-4 py-2 bg-cyberPurple text-white rounded-full text-sm font-semibold hover:opacity-90">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="radial-spotlight bg-grid-mesh min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Back Link */}
        <Link
          to="/blog"
          className="inline-flex items-center text-xs font-bold text-slate-400 hover:text-cyberPurple uppercase tracking-wider mb-8 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform" />
          <span>Back to Blogs</span>
        </Link>

        {/* Two-Column split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT: Blog Article content */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Cover Image */}
            <div className="rounded-3xl overflow-hidden bg-slate-950 border border-slate-900 shadow-2xl h-80 sm:h-96 w-full flex items-center justify-center relative p-3">
              <img
                src={article.img}
                alt={article.title}
                className="w-full h-full object-cover rounded-2xl border border-slate-885"
              />
            </div>

            {/* Metadata and Social Share row */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-900/60 pb-6 pt-4 text-xs text-slate-450">
              
              {/* Author, Date, Comments */}
              <div className="flex flex-wrap items-center gap-6">
                <span className="flex items-center space-x-2 font-medium">
                  {/* Small Avatar icon placeholder */}
                  <div className="w-6 h-6 rounded-full bg-cyberPurple/25 border border-cyberPurple/40 flex items-center justify-center text-[10px] text-cyberPurple font-bold">
                    A
                  </div>
                  <span>By Admin</span>
                </span>
                
                <span className="flex items-center space-x-1.5">
                  <Calendar className="w-4 h-4 text-cyberPurple" />
                  <span>{article.date}</span>
                </span>

                <span className="flex items-center space-x-1.5">
                  <Eye className="w-4 h-4 text-cyberPurple" />
                  <span>{article.comments}</span>
                </span>
              </div>

              {/* Circular Social Share icons */}
              <div className="flex items-center space-x-2">
                <button className="w-8 h-8 rounded-full border border-slate-850 hover:border-cyberPurple/40 flex items-center justify-center bg-slate-900/40 text-slate-400 hover:text-white transition-all" aria-label="Copy Link">
                  <Copy className="w-3.5 h-3.5" />
                </button>
                <button className="w-8 h-8 rounded-full border border-slate-850 hover:border-cyberPurple/40 flex items-center justify-center bg-slate-900/40 text-slate-400 hover:text-white transition-all" aria-label="Facebook Share">
                  <FaFacebookF className="w-3.5 h-3.5" />
                </button>
                <button className="w-8 h-8 rounded-full border border-slate-850 hover:border-cyberPurple/40 flex items-center justify-center bg-slate-900/40 text-slate-400 hover:text-white transition-all" aria-label="Twitter Share">
                  <FaTwitter className="w-3.5 h-3.5" />
                </button>
                <button className="w-8 h-8 rounded-full border border-slate-850 hover:border-cyberPurple/40 flex items-center justify-center bg-slate-900/40 text-slate-400 hover:text-white transition-all" aria-label="WhatsApp Share">
                  <FaWhatsapp className="w-3.5 h-3.5" />
                </button>
                <button className="w-8 h-8 rounded-full border border-slate-850 hover:border-cyberPurple/40 flex items-center justify-center bg-slate-900/40 text-slate-400 hover:text-white transition-all" aria-label="LinkedIn Share">
                  <FaLinkedinIn className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

            {/* Content heading */}
            <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-white leading-snug">
              {article.title}
            </h1>

            {/* Rich Html content block */}
            <div className="prose prose-invert max-w-none text-slate-355 leading-relaxed text-sm sm:text-base space-y-6
              prose-headings:font-display prose-headings:font-extrabold prose-headings:text-white prose-headings:mt-8 prose-headings:mb-4
              prose-h2:text-xl sm:prose-h2:text-2xl prose-h3:text-lg
              prose-ul:list-disc prose-ul:list-inside prose-ul:space-y-2
              prose-ol:list-decimal prose-ol:list-inside prose-ol:space-y-2
              prose-code:font-mono prose-code:text-cyberPink prose-code:bg-slate-950 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded animate-fade-in">
              {article.contentHtml}
            </div>

            {/* Tags row */}
            <div className="flex items-center space-x-4 border-t border-slate-900/60 pt-8 mt-12">
              <span className="text-sm font-bold text-white uppercase tracking-wider">Tags:</span>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((t: string, idx: number) => (
                  <span key={idx} className="px-4 py-1.5 rounded-full text-xs font-semibold uppercase bg-cyberPurple/20 text-cyberPurple border border-cyberPurple/30">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Comments Section */}
            <div className="border-t border-slate-900/60 pt-12 mt-12 text-left">
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">
                Comments
              </h2>
              <div className="w-12 h-1 bg-cyberPurple mt-3 mb-8 rounded-full"></div>

              {/* Comments list */}
              {currentComments.length > 0 ? (
                <div className="space-y-10">
                  {currentComments.map((comment) => (
                    <div key={comment.id} className="space-y-3.5">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-white text-sm">{comment.author}</span>
                          <span className="text-slate-500 font-medium">{comment.date}</span>
                        </div>
                      </div>
                      <span className="text-xs text-slate-450 block font-semibold uppercase tracking-wider">Topic: {comment.topic}</span>
                      
                      <div className="bg-[#13112E]/40 border border-slate-900/80 p-5 rounded-2xl text-xs sm:text-sm text-slate-300 leading-relaxed shadow-md">
                        {comment.content}
                      </div>
                      
                      <button 
                        onClick={() => {
                          setActiveReplyId(comment.id);
                          setReplyName('');
                          setReplyEmail('');
                          setReplyTitle('');
                          setReplyContent('');
                        }}
                        className="text-xs text-cyberPurple hover:text-purple-400 font-bold uppercase tracking-wider transition-colors pt-1"
                      >
                        Reply
                      </button>

                      {/* Inline Reply Form */}
                      {activeReplyId === comment.id && (
                        <form 
                          onSubmit={(e) => handlePostReply(e, comment.id)} 
                          className="mt-6 ml-6 sm:ml-12 border-l border-cyberPurple pl-6 space-y-4 bg-[#120F1F]/40 border border-slate-900 p-6 rounded-2xl shadow-inner animate-fade-in"
                        >
                          <span className="text-xs text-rose-500 font-bold block uppercase tracking-wider mb-2">
                            Replying to {comment.author}
                          </span>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <input
                              type="text"
                              required
                              placeholder="Enter Name"
                              value={replyName}
                              onChange={(e) => setReplyName(e.target.value)}
                              className="w-full bg-[#120F1F] border border-slate-900 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-cyberPurple transition-colors placeholder:text-slate-555"
                            />
                            <input
                              type="email"
                              required
                              placeholder="Enter Email"
                              value={replyEmail}
                              onChange={(e) => setReplyEmail(e.target.value)}
                              className="w-full bg-[#120F1F] border border-slate-900 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-cyberPurple transition-colors placeholder:text-slate-555"
                            />
                          </div>

                          <input
                            type="text"
                            placeholder="Enter Title/Topic"
                            value={replyTitle}
                            onChange={(e) => setReplyTitle(e.target.value)}
                            className="w-full bg-[#120F1F] border border-slate-900 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-cyberPurple transition-colors placeholder:text-slate-555"
                          />

                          <textarea
                            rows={3}
                            required
                            placeholder="Enter your reply..."
                            value={replyContent}
                            onChange={(e) => setReplyContent(e.target.value)}
                            className="w-full bg-[#120F1F] border border-slate-900 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-cyberPurple transition-colors placeholder:text-slate-555 resize-none"
                          />

                          <div className="flex items-center space-x-3 pt-2">
                            <button
                              type="submit"
                              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyberPurple to-indigo-650 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-purple-900/20 hover:opacity-90 cursor-pointer"
                            >
                              Post Reply
                            </button>
                            <button
                              type="button"
                              onClick={() => setActiveReplyId(null)}
                              className="px-6 py-2.5 rounded-xl bg-slate-950 border border-slate-900 text-slate-400 text-xs font-bold uppercase tracking-wider transition-all hover:bg-slate-900 hover:text-white cursor-pointer"
                            >
                              Cancel
                            </button>
                          </div>
                        </form>
                      )}

                      {/* Nested replies list */}
                      {comment.replies && comment.replies.length > 0 && (
                        <div className="ml-6 sm:ml-12 border-l border-slate-900 pl-6 space-y-8 pt-4">
                          {comment.replies.map((reply, rIdx) => (
                            <div key={rIdx} className="space-y-3">
                              <div className="flex items-center space-x-2 text-xs">
                                <span className="font-bold text-white text-sm">{reply.author}</span>
                                <span className="text-slate-500 font-medium">{reply.date}</span>
                              </div>
                              <span className="text-xs text-rose-500 font-bold block uppercase tracking-wide">Replied to {reply.repliesTo}</span>
                              <span className="text-xs text-slate-455 block font-semibold uppercase tracking-wider">Topic: {reply.topic}</span>
                              <div className="bg-[#13112E]/40 border border-slate-900/80 p-5 rounded-2xl text-xs sm:text-sm text-slate-300 leading-relaxed shadow-md">
                                {reply.content}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs sm:text-sm text-slate-500">No comments yet. Be the first to reply!</p>
              )}
            </div>

            {/* Leave a Reply Form */}
            <div className="border-t border-slate-900/60 pt-12 mt-16 text-left">
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">
                Leave a Reply
              </h2>
              <div className="w-12 h-1 bg-cyberPurple mt-3 mb-6 rounded-full"></div>
              
              <p className="text-xs sm:text-sm text-slate-400 mb-8">
                Your email address will not be published. Required fields are marked *
              </p>

              <form onSubmit={handlePostComment} className="space-y-6">
                
                {/* Name & Email inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Enter Name"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      className="w-full bg-[#120F1F] border border-slate-900 rounded-2xl px-5 py-4 text-xs sm:text-sm text-white focus:outline-none focus:border-cyberPurple transition-colors placeholder:text-slate-550 font-sans"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      required
                      placeholder="Enter Email"
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      className="w-full bg-[#120F1F] border border-slate-900 rounded-2xl px-5 py-4 text-xs sm:text-sm text-white focus:outline-none focus:border-cyberPurple transition-colors placeholder:text-slate-550 font-sans"
                    />
                  </div>
                </div>

                {/* Title Input */}
                <div>
                  <input
                    type="text"
                    placeholder="Enter Title"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    className="w-full bg-[#120F1F] border border-slate-900 rounded-2xl px-5 py-4 text-xs sm:text-sm text-white focus:outline-none focus:border-cyberPurple transition-colors placeholder:text-slate-550 font-sans"
                  />
                </div>

                {/* Comments Textarea */}
                <div>
                  <textarea
                    rows={6}
                    required
                    placeholder="Enter Your Comments"
                    value={formContent}
                    onChange={(e) => setFormContent(e.target.value)}
                    className="w-full bg-[#120F1F] border border-slate-900 rounded-2xl px-5 py-4 text-xs sm:text-sm text-white focus:outline-none focus:border-cyberPurple transition-colors placeholder:text-slate-550 font-sans resize-none"
                  />
                </div>

                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyberPurple to-indigo-650 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-purple-900/20 hover:opacity-90 cursor-pointer"
                  >
                    Post Comment
                  </button>
                </div>

              </form>
            </div>

          </div>

          {/* RIGHT SIDEBAR Widget column */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Sidebar Widget 1: Search */}
            <div className="bg-[#120F1F] border border-slate-900 rounded-3xl p-6 shadow-xl">
              <div className="relative flex items-center bg-slate-950 rounded-2xl border border-slate-850 p-1">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent border-none text-xs text-white focus:outline-none pl-4 pr-10 py-3 font-sans"
                />
                <button className="absolute right-1 p-2.5 rounded-xl bg-cyberPurple text-white hover:opacity-90 transition-opacity" aria-label="Search">
                  <Search className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Sidebar Widget 2: Categories */}
            <div className="bg-[#120F1F] border border-slate-900 rounded-3xl p-6 shadow-xl space-y-4">
              <h3 className="text-sm font-semibold uppercase text-slate-300 tracking-wider mb-2">Categories</h3>
              <div className="space-y-1.5 text-xs sm:text-sm">
                {categories.map((cat, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center py-2 px-3 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900/50 transition-all cursor-pointer"
                  >
                    <span>{cat.name}</span>
                    <span className="text-cyberPurple">({cat.count})</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar Widget 3: Recent Posts */}
            <div className="bg-[#120F1F] border border-slate-900 rounded-3xl p-6 shadow-xl space-y-5">
              <h3 className="text-sm font-semibold uppercase text-slate-300 tracking-wider mb-2">Recent Post</h3>
              <div className="space-y-5">
                {recentSidebarPosts.map((post) => (
                  <div key={post.id} className="flex space-x-4 items-start group">
                    {/* Thumbnail */}
                    <Link to={`/blog/${post.id}`} className="w-16 h-16 rounded-xl overflow-hidden bg-slate-950 border border-slate-900 flex-shrink-0 flex items-center justify-center p-1 group-hover:border-cyberPurple/30 transition-colors">
                      <img
                        src={post.img}
                        alt={post.title}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </Link>

                    {/* Excerpt title & tags */}
                    <div className="flex-1 min-w-0 space-y-1.5">
                      <Link
                        to={`/blog/${post.id}`}
                        className="text-xs sm:text-sm font-display font-bold text-white hover:text-cyberPurple transition-colors leading-tight line-clamp-2 block"
                      >
                        {post.title}
                      </Link>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-1">
                        {post.tags.map((t, tIdx) => (
                          <span key={tIdx} className="px-2 py-0.5 rounded bg-slate-950 text-[9px] text-slate-500 border border-slate-900 font-sans">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
