import { useState, useEffect } from 'react';
import {
  Bell,
  Maximize,
  Home,
  BookOpen,
  Layers,
  ShoppingBag,
  Image as ImageIcon,
  Mail,
  Settings,
  ChevronDown,
  ChevronUp,
  Menu,
  Trash2,
  Edit,
  Search,
  Notebook,
  Bold,
  Italic,
  Underline,
  List,
  Heading,
  Code,
  Link as LinkIcon,
  Image as ImageFileIcon,
  Type,
  Layout,
  Eye,
  Sun,
  Moon
} from 'lucide-react';
import blogCover1 from '../assets/blog_cover_1.png';
import blogCover2 from '../assets/blog_cover_2.png';
import projectMockup1 from '../assets/project_mockup_1.png';
import projectMockup2 from '../assets/project_mockup_2.png';
import avatarPortrait from '../assets/avatar_portrait.jpg';
import { API_URL } from '../config/api';
import { adminFetch } from '../utils/adminFetch';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  tags: string[];
  status: 'Published' | 'Draft';
  date: string;
  img: string;
  content: string;
}

interface ProjectPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  tags: string[];
  status: 'Published' | 'Draft';
  date: string;
  img: string;
  content: string;
}

interface AdminProductItem {
  id: string;
  title: string;
  slug: string;
  price: string;
  afilateLink: string;
  tags: string[];
  status: 'Published' | 'Draft';
  date: string;
  img: string;
  content: string;
}

interface AdminPhotoItem {
  id: string;
  title: string;
  author: string;
  date: string;
}

interface ContactMessage {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNo: string;
  project: string;
  message: string;
}

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem('adminToken'));
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isAdminDark, setIsAdminDark] = useState(() => localStorage.getItem('adminTheme') === 'dark');

  // Dashboard Stats & Lists API Fetchers
  const fetchBlogs = async () => {
    try {
      const response = await fetch(`${API_URL}/api/blogs`);
      if (response.ok) {
        const data = await response.json();
        const mapped = data.map((doc: any) => ({
          id: doc._id,
          title: doc.title,
          slug: doc.slug,
          category: doc.category,
          tags: doc.tags || [],
          status: doc.status,
          date: new Date(doc.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
          img: doc.coverImage || blogCover1,
          content: doc.content
        }));
        setBlogs(mapped);
      }
    } catch (err) {
      console.error('Failed to fetch blogs:', err);
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await fetch(`${API_URL}/api/projects`);
      if (response.ok) {
        const data = await response.json();
        const mapped = data.map((doc: any) => ({
          id: doc._id,
          title: doc.title,
          slug: doc.slug,
          category: doc.techStack?.[0] || 'Website',
          tags: doc.techStack || [],
          status: doc.status || 'Published',
          date: new Date(doc.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
          img: doc.image || projectMockup1,
          content: doc.description
        }));
        setProjects(mapped);
      }
    } catch (err) {
      console.error('Failed to fetch projects:', err);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_URL}/api/products`);
      if (response.ok) {
        const data = await response.json();
        const mapped = data.map((doc: any) => ({
          id: doc._id,
          title: doc.title,
          slug: doc.slug,
          price: doc.price,
          afilateLink: 'https://amazon.com',
          tags: [doc.category],
          status: doc.status || 'Published',
          date: new Date(doc.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
          img: doc.images?.[0] || projectMockup1,
          content: doc.description
        }));
        setShopProducts(mapped);
      }
    } catch (err) {
      console.error('Failed to fetch products:', err);
    }
  };

  const fetchContacts = async () => {
    try {
      const response = await adminFetch('/api/contact');
      if (response.ok) {
        const data = await response.json();
        const mapped = data.map((doc: any) => ({
          id: doc._id,
          firstName: doc.firstName,
          lastName: doc.lastName || '',
          email: doc.email,
          phoneNo: '123456789',
          project: 'General Inquiry',
          message: doc.message
        }));
        setContacts(mapped);
      }
    } catch (err) {
      console.error('Failed to fetch contacts:', err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchBlogs();
      fetchProjects();
      fetchProducts();
      fetchContacts();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const handleLogoutEvent = () => {
      setIsAuthenticated(false);
    };
    window.addEventListener('admin-logout', handleLogoutEvent);
    return () => window.removeEventListener('admin-logout', handleLogoutEvent);
  }, []);

  // Sidebar Layout Navigation state
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState<'dashboard' | 'all-blogs' | 'draft-blogs' | 'add-blog' | 'edit-blog' | 'delete-blog' | 'all-projects' | 'draft-projects' | 'add-projects' | 'edit-project' | 'delete-project' | 'all-products' | 'draft-products' | 'add-product' | 'edit-product' | 'all-photos' | 'add-photos' | 'contacts' | 'settings'>('dashboard');

  // Sidebar collapsible tabs
  const [isBlogsExpanded, setIsBlogsExpanded] = useState(false);
  const [isProjectsExpanded, setIsProjectsExpanded] = useState(false);
  const [isShopsExpanded, setIsShopsExpanded] = useState(false);
  const [isGalleryExpanded, setIsGalleryExpanded] = useState(false);

  // Search filter queries
  const [blogSearchQuery, setBlogSearchQuery] = useState('');
  const [productSearchQuery, setProductSearchQuery] = useState('');

  // All Blogs pagination state (5 items per page)
  const [adminBlogPage, setAdminBlogPage] = useState(1);
  const adminBlogsPerPage = 5;

  // Active blog ID being edited / deleted
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);
  const [deletingBlogId, setDeletingBlogId] = useState<string | null>(null);
  const [deletingBlogTitle, setDeletingBlogTitle] = useState('');

  // Dropdown states for Markdown H1-H6 tool helper
  const [showHeadingDropdownAdd, setShowHeadingDropdownAdd] = useState(false);
  const [showHeadingDropdownEdit, setShowHeadingDropdownEdit] = useState(false);
  const [showHeadingDropdownProdAdd, setShowHeadingDropdownProdAdd] = useState(false);
  const [showHeadingDropdownProdEdit, setShowHeadingDropdownProdEdit] = useState(false);

  // Product Loading State (Image 1)
  const [isProductLoading, setIsProductLoading] = useState(false);

  // Add Blog Form State
  const [addTitle, setAddTitle] = useState('');
  const [addSlug, setAddSlug] = useState('');
  const [addCategory, setAddCategory] = useState('');
  const [addContent, setAddContent] = useState('');
  const [addTags, setAddTags] = useState<string[]>([]);
  const [addStatus, setAddStatus] = useState<string>('No Select');
  const [addImg] = useState(blogCover1);
  const [customCategoryAdd, setCustomCategoryAdd] = useState('');

  // Edit Blog Form State
  const [editTitle, setEditTitle] = useState('');
  const [editSlug, setEditSlug] = useState('');
  const [editCategory, setEditCategory] = useState('');
  const [editContent, setEditContent] = useState('');
  const [editTags, setEditTags] = useState<string[]>([]);
  const [editStatus, setEditStatus] = useState<'Published' | 'Draft'>('Published');
  const [editImg] = useState(blogCover2);
  const [customCategoryEdit, setCustomCategoryEdit] = useState('');

  // Add Product Form State
  const [addProdTitle, setAddProdTitle] = useState('');
  const [addProdSlug, setAddProdSlug] = useState('');
  const [addProdContent, setAddProdContent] = useState('');
  const [addProdTags, setAddProdTags] = useState<string[]>([]);
  const [addProdPrice, setAddProdPrice] = useState('');
  const [addProdAfilateLink, setAddProdAfilateLink] = useState('');
  const [addProdStatus, setAddProdStatus] = useState<string>('No Select');
  const [addProdImg] = useState(projectMockup1);

  // Edit Product Form State
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [editProdTitle, setEditProdTitle] = useState('');
  const [editProdSlug, setEditProdSlug] = useState('');
  const [editProdContent, setEditProdContent] = useState('');
  const [editProdTags, setEditProdTags] = useState<string[]>([]);
  const [editProdPrice, setEditProdPrice] = useState('');
  const [editProdAfilateLink, setEditProdAfilateLink] = useState('');
  const [editProdStatus, setEditProdStatus] = useState<'Published' | 'Draft'>('Published');
  const [editProdImg, setEditProdImg] = useState(projectMockup2);

  // Contacts State
  const [contacts, setContacts] = useState<ContactMessage[]>([]);
  const [contactSearchQuery, setContactSearchQuery] = useState('');
  const [selectedContact, setSelectedContact] = useState<ContactMessage | null>(null);
  const [showContactModal, setShowContactModal] = useState(false);

  // Dashboard Stats & Lists memory
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [projects, setProjects] = useState<ProjectPost[]>([]);
  const [shopProducts, setShopProducts] = useState<AdminProductItem[]>([]);

  const [galleryPhotos, setGalleryPhotos] = useState<AdminPhotoItem[]>(() => {
    const saved = localStorage.getItem('galleryPhotos');
    if (saved) return JSON.parse(saved);
    return [
      { id: '1', title: 'Bright Boho Sunshine', author: 'Lovette Nkayi', date: 'June 22, 2024' },
      { id: '2', title: 'Vintage Auto Silhouette', author: 'Prabhat Kumar', date: 'June 22, 2024' }
    ];
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('adminTheme', isAdminDark ? 'dark' : 'light');
  }, [isAdminDark]);

  useEffect(() => {
    localStorage.setItem('galleryPhotos', JSON.stringify(galleryPhotos));
  }, [galleryPhotos]);

  // Project search & pagination state
  const [projectSearchQuery, setProjectSearchQuery] = useState('');
  const [adminProjectPage, setAdminProjectPage] = useState(1);
  const adminProjectsPerPage = 5;

  // Active project ID being edited / deleted
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [deletingProjectId, setDeletingProjectId] = useState<string | null>(null);
  const [deletingProjectTitle, setDeletingProjectTitle] = useState('');

  // Dropdown states for project H1-H6 Markdown
  const [showHeadingDropdownProjAdd, setShowHeadingDropdownProjAdd] = useState(false);
  const [showHeadingDropdownProjEdit, setShowHeadingDropdownProjEdit] = useState(false);

  // Add Project Form State
  const [addProjTitle, setAddProjTitle] = useState('');
  const [addProjSlug, setAddProjSlug] = useState('');
  const [addProjCat, setAddProjCat] = useState('');
  const [addProjContent, setAddProjContent] = useState('');
  const [addProjTags, setAddProjTags] = useState<string[]>([]);
  const [addProjStatus, setAddProjStatus] = useState<string>('No Select');
  const [addProjImg] = useState(projectMockup1);

  // Edit Project Form State
  const [editProjTitle, setEditProjTitle] = useState('');
  const [editProjSlug, setEditProjSlug] = useState('');
  const [editProjCat, setEditProjCat] = useState('');
  const [editProjContent, setEditProjContent] = useState('');
  const [editProjTags, setEditProjTags] = useState<string[]>([]);
  const [editProjStatus, setEditProjStatus] = useState<'Published' | 'Draft'>('Published');
  const [editProjImg, setEditProjImg] = useState(projectMockup2);

  const [newPhotoTitle, setNewPhotoTitle] = useState('');
  const [newPhotoAuthor, setNewPhotoAuthor] = useState('');

  // Profile settings state values
  const [profileName] = useState('Prabhat Kumar');
  const [profileRole] = useState('Full Stack Developer');
  const [profilePhone, setProfilePhone] = useState('+91-9508143247');
  const [profileEmail, setProfileEmail] = useState('prabhatyadav.dbg@gmail.com');

  const handleSaveSettingsInfo = () => {
    alert('Settings data saved successfully!');
  };

  // Hovering tooltip states for monthly graph
  const [hoveredMonth, setHoveredMonth] = useState<string | null>(null);

  // Trigger loading effect when searching products
  useEffect(() => {
    if (activeMenu === 'all-products') {
      setIsProductLoading(true);
      const timer = setTimeout(() => {
        setIsProductLoading(false);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [productSearchQuery, activeMenu]);

  // Auto-generate slug when edit title is modified
  useEffect(() => {
    if (activeMenu === 'edit-blog') {
      const derivedSlug = editTitle
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w-.]/g, '');
      setEditSlug(derivedSlug);
    }
  }, [editTitle, activeMenu]);

  // Auto-generate slug when add title is modified
  useEffect(() => {
    if (activeMenu === 'add-blog') {
      const derivedSlug = addTitle
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w-.]/g, '');
      setAddSlug(derivedSlug);
    }
  }, [addTitle, activeMenu]);

  // Auto-generate product slug (Add)
  useEffect(() => {
    if (activeMenu === 'add-product') {
      const derived = addProdTitle
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w-.]/g, '');
      setAddProdSlug(derived);
    }
  }, [addProdTitle, activeMenu]);

  // Auto-generate product slug (Edit)
  useEffect(() => {
    if (activeMenu === 'edit-product') {
      const derived = editProdTitle
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w-.]/g, '');
      setEditProdSlug(derived);
    }
  }, [editProdTitle, activeMenu]);

  // Auto-generate project slug (Add)
  useEffect(() => {
    if (activeMenu === 'add-projects') {
      const derived = addProjTitle
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w-.]/g, '');
      setAddProjSlug(derived);
    }
  }, [addProjTitle, activeMenu]);

  // Auto-generate project slug (Edit)
  useEffect(() => {
    if (activeMenu === 'edit-project') {
      const derived = editProjTitle
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w-.]/g, '');
      setEditProjSlug(derived);
    }
  }, [editProjTitle, activeMenu]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok && data.token) {
        localStorage.setItem('adminToken', data.token);
        setIsAuthenticated(true);
      } else {
        setLoginError(data.message || data.error || 'Invalid credentials. Please try again.');
      }
    } catch (err: any) {
      setLoginError('Network error. Failed to connect to server.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Add Blog Form Handler
  const handleSaveBlogAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!addTitle.trim()) return;

    const payload = {
      title: addTitle,
      slug: addSlug || addTitle.trim().replace(/\s+/g, '-').replace(/[^\w-.]/g, ''),
      category: addCategory === 'Other' ? (customCategoryAdd.trim() || 'Other') : (addCategory || 'Next Js'),
      tags: addTags.length > 0 ? addTags : ['javascript'],
      status: addStatus === 'Draft' ? 'Draft' : 'Published',
      coverImage: addImg,
      content: addContent || 'This is a newly created blog post.'
    };

    try {
      const response = await adminFetch('/api/blogs', {
        method: 'POST',
        body: JSON.stringify(payload)
      });
      if (response.ok) {
        await fetchBlogs();
        // Reset Form Fields
        setAddTitle('');
        setAddSlug('');
        setAddCategory('');
        setCustomCategoryAdd('');
        setAddContent('');
        setAddTags([]);
        setAddStatus('No Select');
        setActiveMenu('all-blogs');
      } else {
        const errorData = await response.json();
        alert(errorData.error || 'Failed to create blog post');
      }
    } catch (err) {
      console.error('Failed to create blog:', err);
    }
  };

  const handleSaveProjectAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!addProjTitle.trim()) return;

    const payload = {
      title: addProjTitle,
      slug: addProjSlug || addProjTitle.trim().replace(/\s+/g, '-').replace(/[^\w-.]/g, ''),
      description: addProjContent || 'This is a newly created project description.',
      techStack: addProjTags.length > 0 ? addProjTags : ['react'],
      status: addProjStatus === 'Draft' ? 'Draft' : 'Published',
      image: addProjImg,
      liveUrl: 'https://github.com',
      githubUrl: 'https://github.com'
    };

    try {
      const response = await adminFetch('/api/projects', {
        method: 'POST',
        body: JSON.stringify(payload)
      });
      if (response.ok) {
        await fetchProjects();
        // Reset
        setAddProjTitle('');
        setAddProjSlug('');
        setAddProjCat('');
        setAddProjContent('');
        setAddProjTags([]);
        setAddProjStatus('No Select');
        setActiveMenu('all-projects');
      } else {
        const errorData = await response.json();
        alert(errorData.error || 'Failed to create project');
      }
    } catch (err) {
      console.error('Failed to create project:', err);
    }
  };

  const handleStartProjectEdit = (id: string) => {
    const proj = projects.find(p => p.id === id);
    if (!proj) return;

    setEditingProjectId(id);
    setEditProjTitle(proj.title);
    setEditProjSlug(proj.slug);
    setEditProjCat(proj.category);
    setEditProjContent(proj.content);
    setEditProjTags(proj.tags);
    setEditProjStatus(proj.status);
    setEditProjImg(proj.img);

    setActiveMenu('edit-project');
  };

  const handleSaveProjectEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProjectId) return;

    const payload = {
      title: editProjTitle,
      slug: editProjSlug,
      description: editProjContent,
      techStack: editProjTags,
      status: editProjStatus,
      image: editProjImg,
      liveUrl: 'https://github.com',
      githubUrl: 'https://github.com'
    };

    try {
      const response = await adminFetch(`/api/projects/${editingProjectId}`, {
        method: 'PUT',
        body: JSON.stringify(payload)
      });
      if (response.ok) {
        await fetchProjects();
        setEditingProjectId(null);
        setActiveMenu('all-projects');
      } else {
        const errorData = await response.json();
        alert(errorData.error || 'Failed to update project');
      }
    } catch (err) {
      console.error('Failed to update project:', err);
    }
  };

  const handleStartProjectDelete = (id: string, title: string) => {
    setDeletingProjectId(id);
    setDeletingProjectTitle(title);
    setActiveMenu('delete-project');
  };

  const handleConfirmProjectDelete = async () => {
    if (!deletingProjectId) return;
    try {
      const response = await adminFetch(`/api/projects/${deletingProjectId}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        await fetchProjects();
      } else {
        const errorData = await response.json();
        alert(errorData.error || 'Failed to delete project');
      }
    } catch (err) {
      console.error('Failed to delete project:', err);
    }
    setDeletingProjectId(null);
    setDeletingProjectTitle('');
    setActiveMenu('all-projects');
  };

  const handleCancelProjectDelete = () => {
    setDeletingProjectId(null);
    setDeletingProjectTitle('');
    setActiveMenu('all-projects');
  };

  // Save new product
  const handleSaveProductAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!addProdTitle.trim() || !addProdPrice.trim()) return;

    const payload = {
      title: addProdTitle,
      slug: addProdSlug || addProdTitle.trim().replace(/\s+/g, '-').replace(/[^\w-.]/g, ''),
      description: addProdContent || 'This is a newly created product specifications.',
      price: addProdPrice.startsWith('₹') ? addProdPrice : `₹${addProdPrice}`,
      images: [addProdImg],
      category: addProdTags[0] || 'DESK',
      status: addProdStatus === 'Draft' ? 'Draft' : 'Published'
    };

    try {
      const response = await adminFetch('/api/products', {
        method: 'POST',
        body: JSON.stringify(payload)
      });
      if (response.ok) {
        await fetchProducts();
        // Reset fields
        setAddProdTitle('');
        setAddProdSlug('');
        setAddProdContent('');
        setAddProdTags([]);
        setAddProdPrice('');
        setAddProdAfilateLink('');
        setAddProdStatus('No Select');
        setActiveMenu('all-products');
      } else {
        const errorData = await response.json();
        alert(errorData.error || 'Failed to create product');
      }
    } catch (err) {
      console.error('Failed to create product:', err);
    }
  };

  const handleCreatePhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPhotoTitle.trim() || !newPhotoAuthor.trim()) return;

    const item: AdminPhotoItem = {
      id: Date.now().toString(),
      title: newPhotoTitle,
      author: newPhotoAuthor,
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    };

    setGalleryPhotos(prev => [item, ...prev]);
    setNewPhotoTitle('');
    setNewPhotoAuthor('');
    setActiveMenu('all-photos');
  };

  const handleDeleteBlog = async (id: string) => {
    try {
      const response = await adminFetch(`/api/blogs/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        await fetchBlogs();
      } else {
        const errorData = await response.json();
        alert(errorData.error || 'Failed to delete blog post');
      }
    } catch (err) {
      console.error('Failed to delete blog:', err);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      const response = await adminFetch(`/api/products/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        await fetchProducts();
      } else {
        const errorData = await response.json();
        alert(errorData.error || 'Failed to delete product');
      }
    } catch (err) {
      console.error('Failed to delete product:', err);
    }
  };

  const handleDeletePhoto = (id: string) => {
    setGalleryPhotos(prev => prev.filter(p => p.id !== id));
  };

  // Trigger edit blog page transition
  const handleStartBlogEdit = (id: string) => {
    const post = blogs.find(b => b.id === id);
    if (!post) return;

    setEditingBlogId(id);
    setEditTitle(post.title);
    setEditSlug(post.slug);
    setEditCategory(post.category);
    setEditContent(post.content);
    setEditTags(post.tags);
    setEditStatus(post.status);
    
    setActiveMenu('edit-blog');
  };

  // Trigger edit product page transition
  const handleStartProductEdit = (id: string) => {
    const prod = shopProducts.find(p => p.id === id);
    if (!prod) return;

    setEditingProductId(id);
    setEditProdTitle(prod.title);
    setEditProdSlug(prod.slug);
    setEditProdContent(prod.content);
    setEditProdTags(prod.tags);
    setEditProdPrice(prod.price.replace('₹', '').replace('$', ''));
    setEditProdAfilateLink(prod.afilateLink);
    setEditProdStatus(prod.status);
    setEditProdImg(prod.img);

    setActiveMenu('edit-product');
  };

  // Trigger delete blog confirmation view transition
  const handleStartBlogDelete = (id: string, title: string) => {
    setDeletingBlogId(id);
    setDeletingBlogTitle(title);
    setActiveMenu('delete-blog');
  };

  // Confirm delete operation
  const handleConfirmBlogDelete = () => {
    if (deletingBlogId) {
      handleDeleteBlog(deletingBlogId);
    }
    setDeletingBlogId(null);
    setDeletingBlogTitle('');
    setActiveMenu('all-blogs');
  };

  // Cancel delete operation
  const handleCancelBlogDelete = () => {
    setDeletingBlogId(null);
    setDeletingBlogTitle('');
    setActiveMenu('all-blogs');
  };

  // Save full blog updates
  const handleSaveBlogEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBlogId) return;

    const payload = {
      title: editTitle,
      slug: editSlug,
      category: editCategory === 'Other' ? (customCategoryEdit.trim() || 'Other') : editCategory,
      content: editContent,
      tags: editTags,
      status: editStatus
    };

    try {
      const response = await adminFetch(`/api/blogs/${editingBlogId}`, {
        method: 'PUT',
        body: JSON.stringify(payload)
      });
      if (response.ok) {
        await fetchBlogs();
        setEditingBlogId(null);
        setCustomCategoryEdit('');
        setActiveMenu('all-blogs');
      } else {
        const errorData = await response.json();
        alert(errorData.error || 'Failed to update blog post');
      }
    } catch (err) {
      console.error('Failed to update blog:', err);
    }
  };

  // Save full product updates
  const handleSaveProductEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProductId) return;

    const payload = {
      title: editProdTitle,
      slug: editProdSlug,
      description: editProdContent,
      price: editProdPrice.startsWith('₹') ? editProdPrice : `₹${editProdPrice}`,
      images: [editProdImg],
      category: editProdTags[0] || 'DESK',
      status: editProdStatus
    };

    try {
      const response = await adminFetch(`/api/products/${editingProductId}`, {
        method: 'PUT',
        body: JSON.stringify(payload)
      });
      if (response.ok) {
        await fetchProducts();
        setEditingProductId(null);
        setActiveMenu('all-products');
      } else {
        const errorData = await response.json();
        alert(errorData.error || 'Failed to update product');
      }
    } catch (err) {
      console.error('Failed to update product:', err);
    }
  };

  // Category Table Counter
  const getCategoryCount = (catName: string) => {
    return blogs.filter(b => b.category.toLowerCase() === catName.toLowerCase()).length;
  };

  // Toolbar Heading Injector helper
  const handleAddHeadingTag = (level: number, mode: 'add' | 'edit' | 'addprod' | 'editprod' | 'addproj' | 'editproj') => {
    const headerPrefix = '\n' + '#'.repeat(level) + ' ';
    if (mode === 'add') {
      setAddContent(prev => prev + headerPrefix);
      setShowHeadingDropdownAdd(false);
    } else if (mode === 'edit') {
      setEditContent(prev => prev + headerPrefix);
      setShowHeadingDropdownEdit(false);
    } else if (mode === 'addprod') {
      setAddProdContent(prev => prev + headerPrefix);
      setShowHeadingDropdownProdAdd(false);
    } else if (mode === 'editprod') {
      setEditProdContent(prev => prev + headerPrefix);
      setShowHeadingDropdownProdEdit(false);
    } else if (mode === 'addproj') {
      setAddProjContent(prev => prev + headerPrefix);
      setShowHeadingDropdownProjAdd(false);
    } else if (mode === 'editproj') {
      setEditProjContent(prev => prev + headerPrefix);
      setShowHeadingDropdownProjEdit(false);
    }
  };

  // Filtered blogs for search field
  const filteredBlogsList = blogs.filter(b =>
    b.title.toLowerCase().includes(blogSearchQuery.toLowerCase())
  );

  // Paginated blog lists for admin view
  const indexOfLastAdminBlog = adminBlogPage * adminBlogsPerPage;
  const indexOfFirstAdminBlog = indexOfLastAdminBlog - adminBlogsPerPage;
  const paginatedBlogsList = filteredBlogsList.slice(indexOfFirstAdminBlog, indexOfLastAdminBlog);
  const totalAdminBlogPages = Math.ceil(filteredBlogsList.length / adminBlogsPerPage);

  // Draft blogs list
  const draftBlogsList = blogs.filter(b => b.status === 'Draft');

  // Filtered Products list
  const filteredProductsList = shopProducts.filter(p =>
    p.title.toLowerCase().includes(productSearchQuery.toLowerCase()) && p.status === 'Published'
  );

  // Filtered contacts
  const filteredContacts = contacts.filter(c =>
    c.firstName.toLowerCase().includes(contactSearchQuery.toLowerCase())
  );

  // Filtered projects for search field
  const filteredProjectsList = projects.filter(p =>
    p.title.toLowerCase().includes(projectSearchQuery.toLowerCase())
  );

  // Paginated project lists for admin view
  const indexOfLastAdminProject = adminProjectPage * adminProjectsPerPage;
  const indexOfFirstAdminProject = indexOfLastAdminProject - adminProjectsPerPage;
  const paginatedProjectsList = filteredProjectsList.slice(indexOfFirstAdminProject, indexOfLastAdminProject);
  const totalAdminProjectPages = Math.ceil(filteredProjectsList.length / adminProjectsPerPage);

  // Draft projects list
  const draftProjectsList = projects.filter(p => p.status === 'Draft');

  // 1. LOGIN INTERFACE
  if (!isAuthenticated) {
    return (
      <div className={`min-h-screen flex flex-col font-sans transition-colors duration-300 antialiased text-left ${isAdminDark ? 'dark bg-[#09070F] text-slate-100' : 'bg-[#F8F9FB] text-slate-800'}`}>
        <header className={`border-b px-6 py-4 flex items-center justify-between shadow-sm sticky top-0 z-30 transition-colors duration-300 ${isAdminDark ? 'bg-[#130F1F] border-slate-800/80 shadow-neon-purple/5' : 'bg-white border-slate-200/80'}`}>
          <div className="flex items-center space-x-2">
            <span className="text-xl font-extrabold tracking-tight font-display">
              <span className="text-rose-500 mr-0.5 animate-pulse">▲</span>
              <span className={isAdminDark ? 'text-white' : 'text-slate-900'}>ADMIN</span>
            </span>
          </div>
          <div className="flex items-center space-x-6">
            {/* Sun/Moon Toggle in Login screen */}
            <button
              onClick={() => setIsAdminDark(!isAdminDark)}
              className={`relative p-2 rounded-xl transition-all duration-350 cursor-pointer overflow-hidden ${isAdminDark ? 'bg-slate-800 hover:bg-slate-700 text-sky-400' : 'bg-slate-100 hover:bg-slate-200 text-amber-500'}`}
              title={isAdminDark ? "Switch to Day Mode" : "Switch to Night Mode"}
            >
              <div className="relative w-5 h-5 flex items-center justify-center">
                <Sun className={`absolute w-5 h-5 transition-all duration-500 transform ${isAdminDark ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'}`} />
                <Moon className={`absolute w-5 h-5 transition-all duration-500 transform ${isAdminDark ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'}`} />
              </div>
            </button>
            <Maximize className={`w-5 h-5 cursor-pointer hover:opacity-85 ${isAdminDark ? 'text-slate-300' : 'text-slate-400'}`} />
            <div className="relative">
              <Bell className={`w-5 h-5 cursor-pointer hover:opacity-85 ${isAdminDark ? 'text-slate-300' : 'text-slate-400'}`} />
              <span className={`absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-500 border-2 block ${isAdminDark ? 'border-slate-900' : 'border-white'}`} />
            </div>
            <div className="w-9 h-9 rounded-full p-[2px] bg-gradient-to-tr from-pink-500 via-purple-400 to-amber-400 flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden border border-white">
                <img src={blogCover1} alt="profile" className="w-full h-full object-cover scale-150" />
              </div>
            </div>
          </div>
        </header>

        <main className="flex-grow flex flex-col items-center justify-center px-4 py-16">
          {loginError && (
            <div className="mb-6 max-w-sm w-full bg-red-50 border border-red-200 text-red-755 px-4 py-3 rounded-xl text-xs text-center font-bold font-sans">
              {loginError}
            </div>
          )}

          <div className={`rounded-[2rem] shadow-xl p-8 sm:p-10 max-w-sm w-full text-center border min-h-[360px] flex flex-col justify-center transition-colors duration-300 ${
            isAdminDark ? 'bg-[#130F1F] border-slate-800/80 shadow-neon-purple/5' : 'bg-white border-slate-100/65'
          }`}>
            {isLoggingIn ? (
              <div className="space-y-4 py-8 flex flex-col items-center justify-center">
                <h2 className="text-2xl font-extrabold text-[#0090D9] tracking-tight mb-4">Sign In</h2>
                <div className="relative w-16 h-16 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full border-4 border-slate-100 border-t-cyan-400 animate-spin" />
                  <div className="absolute w-2.5 h-2.5 bg-cyan-400 rounded-full" />
                </div>
                <p className="text-xs text-slate-555 dark:text-slate-400 font-bold uppercase tracking-wider pt-4">Checking...</p>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-extrabold text-[#0090D9] tracking-tight mb-8">Sign In</h2>
                <form onSubmit={handleLogin} className="space-y-4">
                  <input
                    type="email"
                    required
                    placeholder="youtube@vbmcoder.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full text-sm px-5 py-4 rounded-2xl border-2 focus:outline-none transition-colors duration-300 ${
                      isAdminDark ? 'bg-[#09070F] text-white border-slate-800 focus:border-cyan-400' : 'bg-white text-slate-800 border-cyan-400/90'
                    }`}
                  />
                  <input
                    type="password"
                    required
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full text-sm px-5 py-4 rounded-2xl border focus:outline-none transition-colors duration-300 ${
                      isAdminDark ? 'bg-[#09070F] text-white border-slate-800 focus:border-cyan-400' : 'bg-white text-slate-800 border-slate-200'
                    }`}
                  />
                  <button type="submit" className="w-full py-4 bg-[#0090D9] hover:bg-[#0080c2] text-white font-extrabold text-sm uppercase tracking-wider rounded-2xl cursor-pointer">
                    Login
                  </button>
                  <p className="text-[11px] text-[#0090D9] pt-2">
                    <a href="#agreement" className="hover:underline font-semibold text-[#0090D9] dark:text-cyan-400">Learn Admin licence agreement</a>
                  </p>
                </form>
              </>
            )}
          </div>

          {!isLoggingIn && (
            <div className="mt-16 text-center animate-pulse">
              <h1 className={`text-4xl sm:text-6xl font-display font-extrabold tracking-tight ${isAdminDark ? 'text-slate-400/90' : 'text-[#374567]/90'}`}>Password: vbmcoder</h1>
            </div>
          )}
        </main>
      </div>
    );
  }

  // 2. DASHBOARD INTERFACE
  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-300 antialiased text-left ${isAdminDark ? 'dark bg-[#09070F] text-slate-100' : 'bg-[#F8F9FB] text-slate-800'}`}>
      
      {/* Top Navigation Bar */}
      <header className={`border-b px-6 py-4 flex items-center justify-between shadow-sm sticky top-0 z-30 transition-colors duration-300 ${isAdminDark ? 'bg-[#130F1F] border-slate-800/80 shadow-neon-purple/5' : 'bg-white border-slate-200'}`}>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className={`p-1 rounded-md transition-colors cursor-pointer ${isAdminDark ? 'hover:bg-slate-800/80 text-slate-400' : 'hover:bg-slate-100 text-slate-500'}`}
            aria-label="Toggle Sidebar"
          >
            <Menu className={`w-5 h-5 ${isAdminDark ? 'text-slate-200' : 'text-[#1B124B]'}`} />
          </button>
          <span className="text-xl font-extrabold tracking-tight font-display">
            <span className="text-rose-500 mr-0.5 animate-pulse">▲</span>
            <span className={isAdminDark ? 'text-white' : 'text-slate-900'}>ADMIN</span>
          </span>
        </div>

        <div className="flex items-center space-x-6">
          {/* Day/Night Theme Toggle button with rich rotational transition animation */}
          <button
            onClick={() => setIsAdminDark(!isAdminDark)}
            className={`relative p-2 rounded-xl transition-all duration-350 cursor-pointer overflow-hidden ${isAdminDark ? 'bg-slate-800 hover:bg-slate-700 text-sky-400' : 'bg-slate-100 hover:bg-slate-200 text-amber-500'}`}
            title={isAdminDark ? "Switch to Day Mode" : "Switch to Night Mode"}
          >
            <div className="relative w-5 h-5 flex items-center justify-center">
              <Sun className={`absolute w-5 h-5 transition-all duration-500 transform ${isAdminDark ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'}`} />
              <Moon className={`absolute w-5 h-5 transition-all duration-500 transform ${isAdminDark ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'}`} />
            </div>
          </button>

          <Maximize className={`w-5 h-5 cursor-pointer hover:opacity-85 ${isAdminDark ? 'text-slate-300' : 'text-[#1B124B]'}`} />
          <div className="relative">
            <Bell className={`w-5 h-5 cursor-pointer hover:opacity-85 ${isAdminDark ? 'text-slate-300' : 'text-[#1B124B]'}`} />
            <span className={`absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-500 border-2 block ${isAdminDark ? 'border-slate-900' : 'border-white'}`} />
          </div>
          <div className="w-9 h-9 rounded-full p-[2px] bg-gradient-to-tr from-pink-500 via-purple-400 to-amber-400 flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden border border-white">
              <img src={avatarPortrait} alt="profile" className="w-full h-full object-cover scale-110" />
            </div>
          </div>
        </div>
      </header>

      {/* Main split */}
      <div className="flex flex-grow items-stretch relative z-10">
        
        {/* Left Navigation Sidebar */}
        {isSidebarOpen && (
          <aside className={`w-64 border-r p-6 flex flex-col justify-between flex-shrink-0 transition-colors duration-300 ${isAdminDark ? 'bg-[#130F1F] border-slate-800/80' : 'bg-white border-slate-200'}`}>
            <div className="space-y-4">
              
              {/* Dashboard Link */}
              <button
                onClick={() => setActiveMenu('dashboard')}
                className={`w-full flex items-center space-x-3 px-4 py-3.5 rounded-xl text-sm font-extrabold transition-all duration-300 cursor-pointer ${
                  activeMenu === 'dashboard'
                    ? (isAdminDark ? 'bg-slate-800/60 text-white' : 'bg-slate-50 text-slate-950')
                    : (isAdminDark ? 'text-slate-300 hover:bg-slate-800/40 hover:text-white' : 'text-[#1B124B] hover:bg-slate-50')
                }`}
              >
                <Home className={`w-4 h-4 ${isAdminDark ? 'text-slate-300' : 'text-[#1B124B]'}`} />
                <span>Dashboard</span>
              </button>

              {/* Collapsible Blogs Link */}
              <div className="space-y-1">
                <button
                  onClick={() => setIsBlogsExpanded(!isBlogsExpanded)}
                  className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-extrabold transition-all duration-300 cursor-pointer ${isAdminDark ? 'text-slate-200 hover:bg-slate-800/40' : 'text-[#1B124B] hover:bg-slate-50'}`}
                >
                  <div className="flex items-center space-x-3">
                    <BookOpen className={`w-4 h-4 ${isAdminDark ? 'text-slate-300' : 'text-[#1B124B]'}`} />
                    <span>Blogs</span>
                  </div>
                  {isBlogsExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
                
                {isBlogsExpanded && (
                  <div className="pl-11 space-y-1 flex flex-col text-left">
                    <button
                      onClick={() => { setActiveMenu('all-blogs'); setBlogSearchQuery(''); setAdminBlogPage(1); }}
                      className={`py-2 text-xs font-bold cursor-pointer ${activeMenu === 'all-blogs' ? 'text-cyberPurple font-extrabold' : (isAdminDark ? 'text-slate-400 hover:text-white' : 'text-[#1B124B]/70 hover:text-[#1B124B]')}`}
                    >
                      All Blogs
                    </button>
                    <button
                      onClick={() => setActiveMenu('draft-blogs')}
                      className={`py-2 text-xs font-bold cursor-pointer ${activeMenu === 'draft-blogs' ? 'text-cyberPurple font-extrabold' : (isAdminDark ? 'text-slate-400 hover:text-white' : 'text-[#1B124B]/70 hover:text-[#1B124B]')}`}
                    >
                      Draft Blogs
                    </button>
                    <button
                      onClick={() => setActiveMenu('add-blog')}
                      className={`py-2 text-xs font-bold cursor-pointer ${activeMenu === 'add-blog' ? 'text-cyberPurple font-extrabold' : (isAdminDark ? 'text-slate-400 hover:text-white' : 'text-[#1B124B]/70 hover:text-[#1B124B]')}`}
                    >
                      Add Blog
                    </button>
                  </div>
                )}
              </div>

              {/* Collapsible Projects Link */}
              <div className="space-y-1">
                <button
                  onClick={() => setIsProjectsExpanded(!isProjectsExpanded)}
                  className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-extrabold transition-all duration-300 cursor-pointer ${isAdminDark ? 'text-slate-200 hover:bg-slate-800/40' : 'text-[#1B124B] hover:bg-slate-50'}`}
                >
                  <div className="flex items-center space-x-3">
                    <Layers className={`w-4 h-4 ${isAdminDark ? 'text-slate-300' : 'text-[#1B124B]'}`} />
                    <span>Projects</span>
                  </div>
                  {isProjectsExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>

                {isProjectsExpanded && (
                  <div className="pl-11 space-y-1 flex flex-col text-left">
                    <button
                      onClick={() => setActiveMenu('all-projects')}
                      className={`py-2 text-xs font-bold cursor-pointer ${activeMenu === 'all-projects' ? 'text-cyberPurple font-extrabold' : (isAdminDark ? 'text-slate-400 hover:text-white' : 'text-[#1B124B]/70 hover:text-[#1B124B]')}`}
                    >
                      All Projects
                    </button>
                    <button
                      onClick={() => setActiveMenu('draft-projects')}
                      className={`py-2 text-xs font-bold cursor-pointer ${activeMenu === 'draft-projects' ? 'text-cyberPurple font-extrabold' : (isAdminDark ? 'text-slate-400 hover:text-white' : 'text-[#1B124B]/70 hover:text-[#1B124B]')}`}
                    >
                      Draft Projects
                    </button>
                    <button
                      onClick={() => setActiveMenu('add-projects')}
                      className={`py-2 text-xs font-bold cursor-pointer ${activeMenu === 'add-projects' ? 'text-cyberPurple font-extrabold' : (isAdminDark ? 'text-slate-400 hover:text-white' : 'text-[#1B124B]/70 hover:text-[#1B124B]')}`}
                    >
                      Add Projects
                    </button>
                  </div>
                )}
              </div>

              {/* Collapsible Shops Link */}
              <div className="space-y-1">
                <button
                  onClick={() => setIsShopsExpanded(!isShopsExpanded)}
                  className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-extrabold transition-all duration-300 cursor-pointer ${isAdminDark ? 'text-slate-200 hover:bg-slate-800/40' : 'text-[#1B124B] hover:bg-slate-50'}`}
                >
                  <div className="flex items-center space-x-3">
                    <ShoppingBag className={`w-4 h-4 ${isAdminDark ? 'text-slate-300' : 'text-[#1B124B]'}`} />
                    <span>Shops</span>
                  </div>
                  {isShopsExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>

                {isShopsExpanded && (
                  <div className="pl-11 space-y-1 flex flex-col text-left">
                    <button
                      onClick={() => setActiveMenu('all-products')}
                      className={`py-2 text-xs font-bold cursor-pointer ${activeMenu === 'all-products' ? 'text-cyberPurple font-extrabold' : (isAdminDark ? 'text-slate-400 hover:text-white' : 'text-[#1B124B]/70 hover:text-[#1B124B]')}`}
                    >
                      All Products
                    </button>
                    <button
                      onClick={() => setActiveMenu('draft-products')}
                      className={`py-2 text-xs font-bold cursor-pointer ${activeMenu === 'draft-products' ? 'text-cyberPurple font-extrabold' : (isAdminDark ? 'text-slate-400 hover:text-white' : 'text-[#1B124B]/70 hover:text-[#1B124B]')}`}
                    >
                      Draft Products
                    </button>
                    <button
                      onClick={() => setActiveMenu('add-product')}
                      className={`py-2 text-xs font-bold cursor-pointer ${activeMenu === 'add-product' ? 'text-cyberPurple font-extrabold' : (isAdminDark ? 'text-slate-400 hover:text-white' : 'text-[#1B124B]/70 hover:text-[#1B124B]')}`}
                    >
                      Add Product
                    </button>
                  </div>
                )}
              </div>

              {/* Collapsible Gallery Link */}
              <div className="space-y-1">
                <button
                  onClick={() => setIsGalleryExpanded(!isGalleryExpanded)}
                  className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-extrabold transition-all duration-300 cursor-pointer ${isAdminDark ? 'text-slate-200 hover:bg-slate-800/40' : 'text-[#1B124B] hover:bg-slate-50'}`}
                >
                  <div className="flex items-center space-x-3">
                    <ImageIcon className={`w-4 h-4 ${isAdminDark ? 'text-slate-300' : 'text-[#1B124B]'}`} />
                    <span>Gallery</span>
                  </div>
                  {isGalleryExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>

                {isGalleryExpanded && (
                  <div className="pl-11 space-y-1 flex flex-col text-left">
                    <button
                      onClick={() => setActiveMenu('all-photos')}
                      className={`py-2 text-xs font-bold cursor-pointer ${activeMenu === 'all-photos' ? 'text-cyberPurple font-extrabold' : (isAdminDark ? 'text-slate-400 hover:text-white' : 'text-[#1B124B]/70 hover:text-[#1B124B]')}`}
                    >
                      All Photos
                    </button>
                    <button
                      onClick={() => setActiveMenu('add-photos')}
                      className={`py-2 text-xs font-bold cursor-pointer ${activeMenu === 'add-photos' ? 'text-cyberPurple font-extrabold' : (isAdminDark ? 'text-slate-400 hover:text-white' : 'text-[#1B124B]/70 hover:text-[#1B124B]')}`}
                    >
                      Add Photos
                    </button>
                  </div>
                )}
              </div>

              {/* Contacts */}
              <button
                onClick={() => setActiveMenu('contacts')}
                className={`w-full flex items-center space-x-3 px-4 py-3.5 rounded-xl text-sm font-extrabold transition-colors cursor-pointer ${
                  activeMenu === 'contacts'
                    ? (isAdminDark ? 'bg-slate-800/60 text-white font-extrabold' : 'bg-slate-50 text-slate-950 font-extrabold')
                    : (isAdminDark ? 'text-slate-300 hover:bg-slate-800/40 hover:text-white' : 'text-[#1B124B] hover:bg-slate-50')
                }`}
              >
                <Mail className={`w-4 h-4 ${isAdminDark ? 'text-slate-300' : 'text-[#1B124B]'}`} />
                <span>Contacts</span>
              </button>

              {/* Settings */}
              <button
                onClick={() => setActiveMenu('settings')}
                className={`w-full flex items-center space-x-3 px-4 py-3.5 rounded-xl text-sm font-extrabold transition-colors cursor-pointer ${
                  activeMenu === 'settings'
                    ? (isAdminDark ? 'bg-slate-800/60 text-white font-extrabold' : 'bg-slate-50 text-slate-950 font-extrabold')
                    : (isAdminDark ? 'text-slate-300 hover:bg-slate-800/40 hover:text-white' : 'text-[#1B124B] hover:bg-slate-50')
                }`}
              >
                <Settings className={`w-4 h-4 ${isAdminDark ? 'text-slate-300' : 'text-[#1B124B]'}`} />
                <span>Settings</span>
              </button>

            </div>

            {/* Logout pill card */}
            <button
              onClick={() => {
                localStorage.removeItem('adminToken');
                setIsAuthenticated(false);
                setEmail('');
                setPassword('');
              }}
              className="mt-8 bg-[#EBE9F8] text-cyberPurple hover:opacity-90 font-extrabold py-3 px-6 rounded-2xl w-full text-center text-xs tracking-wider transition-opacity cursor-pointer"
            >
              Logout
            </button>
          </aside>
        )}

        {/* Right content viewport */}
        <main className="flex-grow p-6 sm:p-8 space-y-8 overflow-y-auto w-full">

          {activeMenu === 'dashboard' && (
            <>
              {/* Main Title Section */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="space-y-1">
                  <h1 className="text-3xl font-extrabold text-[#1B124B] tracking-tight">Admin Dashboard</h1>
                  <p className="text-[10px] tracking-widest text-cyberPurple font-bold uppercase">Admin Panel</p>
                </div>
                <div className="flex items-center space-x-2 text-xs font-semibold text-slate-400">
                  <Home className="w-4 h-4 text-cyberPurple" />
                  <span>/</span>
                  <span className="text-[#1B124B] font-bold">Dashboard</span>
                </div>
              </div>

              {/* Four Gradient Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gradient-to-br from-[#7F56D9] to-[#53389F] rounded-[2rem] p-6 text-center text-white shadow-lg space-y-4 flex flex-col justify-between h-44">
                  <span className="text-base font-bold font-sans">Total Blogs</span>
                  <div className="bg-white/10 px-8 py-2.5 rounded-2xl max-w-[120px] mx-auto text-lg font-bold">
                    {blogs.length}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-[#F65985] to-[#D42B5B] rounded-[2rem] p-6 text-center text-white shadow-lg space-y-4 flex flex-col justify-between h-44">
                  <span className="text-base font-bold font-sans">Total Projects</span>
                  <div className="bg-white/10 px-8 py-2.5 rounded-2xl max-w-[120px] mx-auto text-lg font-bold">
                    {projects.length}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-[#FDB022] to-[#B97400] rounded-[2rem] p-6 text-center text-white shadow-lg space-y-4 flex flex-col justify-between h-44">
                  <span className="text-base font-bold font-sans">Total Shops</span>
                  <div className="bg-white/10 px-8 py-2.5 rounded-2xl max-w-[120px] mx-auto text-lg font-bold">
                    {shopProducts.length}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-[#06AED4] to-[#047A93] rounded-[2rem] p-6 text-center text-white shadow-lg space-y-4 flex flex-col justify-between h-44">
                  <span className="text-base font-bold font-sans">Gallery Photos</span>
                  <div className="bg-white/10 px-8 py-2.5 rounded-2xl max-w-[120px] mx-auto text-lg font-bold">
                    {galleryPhotos.length}
                  </div>
                </div>
              </div>

              {/* Chart & Tables splits */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
                <div className="lg:col-span-8 bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm space-y-6 flex flex-col justify-between relative">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <h3 className="font-extrabold text-slate-800 text-sm">Year Overview</h3>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Blogs Created Monthly by Year</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-extrabold text-slate-900">{blogs.length} / 365</p>
                      <p className="text-[10px] text-sky-500 font-bold uppercase tracking-wider">Total Published</p>
                    </div>
                  </div>

                  <div className="h-60 flex items-end justify-between gap-2.5 pt-8 border-b border-slate-100 pb-2 relative w-full">
                    {hoveredMonth === 'June' && (
                      <div className="absolute top-2 left-[48%] -translate-x-1/2 z-20 bg-slate-950 text-white rounded-lg p-2 text-[10px] font-sans font-bold shadow-lg border border-slate-885 animate-fade-in flex flex-col items-center">
                        <span className="text-slate-400">June</span>
                        <span>2024: {blogs.length}</span>
                      </div>
                    )}

                    {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((m) => {
                      const isJune = m === 'June';
                      const barHeight = isJune ? 'h-full' : 'h-1';
                      
                      return (
                        <div
                          key={m}
                          onMouseEnter={() => isJune && setHoveredMonth('June')}
                          onMouseLeave={() => setHoveredMonth(null)}
                          className="flex flex-col items-center flex-grow group cursor-pointer relative"
                        >
                          <div className={`w-full max-w-[28px] rounded-t-md transition-all duration-500 ${
                            isJune ? 'bg-green-400/90 hover:bg-green-400 shadow-md shadow-green-400/10' : 'bg-slate-100 hover:bg-slate-200'
                          } ${barHeight}`} />
                          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-2.5">{m}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="lg:col-span-4 bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm space-y-4 flex flex-col justify-between">
                  <h3 className="font-extrabold text-slate-800 text-sm pb-1 text-left">Blogs By Category</h3>
                  <div className="border border-slate-100 rounded-2xl overflow-hidden flex-grow">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-extrabold uppercase tracking-wider text-slate-455">
                          <th className="py-3 px-5">Topics</th>
                          <th className="py-3 px-5 text-right">Data</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-700">
                        <tr>
                          <td className="py-3.5 px-5">Next js</td>
                          <td className="py-3.5 px-5 text-right font-bold">{getCategoryCount('Next js')}</td>
                        </tr>
                        <tr>
                          <td className="py-3.5 px-5">Css</td>
                          <td className="py-3.5 px-5 text-right font-bold">{getCategoryCount('Css')}</td>
                        </tr>
                        <tr>
                          <td className="py-3.5 px-5">Node Js</td>
                          <td className="py-3.5 px-5 text-right font-bold">{getCategoryCount('Node Js')}</td>
                        </tr>
                        <tr>
                          <td className="py-3.5 px-5">Flutter Dev</td>
                          <td className="py-3.5 px-5 text-right font-bold">{getCategoryCount('Flutter Dev')}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Collapsible Blogs Views */}
          {activeMenu === 'all-blogs' && (
            <div className="space-y-6">
              
              {/* Header Title Section matching mockup */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-4">
                <div className="space-y-1">
                  <h1 className="text-3xl font-extrabold text-[#1B124B] tracking-tight">All Published Blogs</h1>
                  <p className="text-[10px] tracking-widest text-cyberPurple font-bold uppercase">Admin Panel</p>
                </div>
                <div className="flex items-center space-x-2 text-xs font-bold text-slate-455">
                  <Notebook className="w-4 h-4 text-cyberPurple" />
                  <span>/</span>
                  <span className="text-[#1B124B]">Blogs</span>
                </div>
              </div>

              {/* Search Bar matching mockup */}
              <div className="flex items-center space-x-3 bg-white border border-slate-200 p-4 rounded-2xl shadow-sm max-w-md">
                <span className="text-xs font-extrabold text-[#1B124B] whitespace-nowrap">Search Blogs:</span>
                <div className="relative flex-grow">
                  <input
                    type="text"
                    placeholder="Search by title..."
                    value={blogSearchQuery}
                    onChange={(e) => { setBlogSearchQuery(e.target.value); setAdminBlogPage(1); }}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-cyberPurple font-bold"
                  />
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-3.5" />
                </div>
              </div>

              {/* Blogs Table matching mockup headers and styles */}
              <div className="bg-white border border-slate-200/80 rounded-3xl shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#D0E2FF]/40 border-b border-slate-255 text-xs font-extrabold text-slate-900">
                      <th className="py-4 px-6 w-16">#</th>
                      <th className="py-4 px-6 w-32">Image</th>
                      <th className="py-4 px-6">Title</th>
                      <th className="py-4 px-6 text-center w-56">Edit / Delete</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs font-extrabold text-slate-855">
                    {paginatedBlogsList.map((b, idx) => {
                      const overallIndex = (adminBlogPage - 1) * adminBlogsPerPage + idx + 1;
                      return (
                        <tr key={b.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="py-6 px-6 text-slate-500">{overallIndex}</td>
                          <td className="py-6 px-6">
                            <img src={b.img} alt={b.title} className="w-20 h-14 rounded-lg object-cover border border-slate-200 bg-slate-150" />
                          </td>
                          <td className="py-6 px-6">
                            <span className="text-[#1B124B] font-extrabold text-sm sm:text-base">{b.title}</span>
                            <span className="block text-[10px] text-slate-400 font-bold uppercase mt-1 tracking-wider">{b.category}</span>
                          </td>
                          <td className="py-6 px-6">
                            <div className="flex items-center justify-center space-x-2.5">
                              <button
                                onClick={() => handleStartBlogEdit(b.id)}
                                className="border border-slate-255 hover:bg-slate-50 px-3 py-1.5 rounded-lg flex items-center space-x-1.5 text-[11px] font-extrabold text-[#1B124B] cursor-pointer transition-colors"
                              >
                                <Edit className="w-3.5 h-3.5" />
                                <span>Edit</span>
                              </button>
                              <button
                                onClick={() => handleStartBlogDelete(b.id, b.title)}
                                className="border border-slate-255 hover:bg-slate-50 px-3 py-1.5 rounded-lg flex items-center space-x-1.5 text-[11px] font-extrabold text-[#1B124B] cursor-pointer transition-colors"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                <span>Delete</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                    {paginatedBlogsList.length === 0 && (
                      <tr>
                        <td colSpan={4} className="py-8 text-center text-slate-400 text-xs">
                          No blogs found matching "{blogSearchQuery}".
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Cornflower Blue Pagination Controls matching mockup (Image 1) */}
              {totalAdminBlogPages > 1 && (
                <div className="flex items-center justify-center space-x-2.5 pt-4">
                  <button
                    onClick={() => setAdminBlogPage(prev => Math.max(prev - 1, 1))}
                    disabled={adminBlogPage === 1}
                    className={`px-4.5 py-2.5 rounded-xl border text-xs font-bold transition-all ${
                      adminBlogPage === 1
                        ? 'bg-[#F8F9FB] border-slate-100 text-slate-300 cursor-not-allowed opacity-60'
                        : 'bg-[#F8F9FB] border-slate-200 text-slate-700 hover:bg-slate-100 cursor-pointer'
                    }`}
                  >
                    Previous
                  </button>

                  <button
                    onClick={() => setAdminBlogPage(1)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      adminBlogPage === 1
                        ? 'bg-[#5B7BF0] text-white shadow-sm shadow-[#5B7BF0]/15'
                        : 'bg-[#5B7BF0]/85 text-white/90 hover:bg-[#5B7BF0]'
                    }`}
                  >
                    1
                  </button>

                  <button
                    onClick={() => setAdminBlogPage(2)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      adminBlogPage === 2
                        ? 'bg-[#5B7BF0] text-white shadow-sm shadow-[#5B7BF0]/15'
                        : 'bg-[#5B7BF0]/85 text-white/90 hover:bg-[#5B7BF0]'
                    }`}
                  >
                    2
                  </button>

                  <button
                    onClick={() => setAdminBlogPage(prev => Math.min(prev + 1, totalAdminBlogPages))}
                    disabled={adminBlogPage === totalAdminBlogPages}
                    className={`px-4.5 py-2.5 rounded-xl border text-xs font-bold transition-all ${
                      adminBlogPage === totalAdminBlogPages
                        ? 'bg-[#F8F9FB] border-slate-100 text-slate-300 cursor-not-allowed opacity-60'
                        : 'bg-[#F8F9FB] border-slate-200 text-slate-700 hover:bg-slate-100 cursor-pointer'
                    }`}
                  >
                    Next
                  </button>
                </div>
              )}

            </div>
          )}

          {/* DRAFT BLOGS VIEW (matching mockup) */}
          {activeMenu === 'draft-blogs' && (
            <div className="space-y-6">
              
              {/* Header Title section */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-4">
                <div className="space-y-1">
                  <h1 className="text-3xl font-extrabold text-[#1B124B] tracking-tight">
                    <span className="text-cyberPurple">Draft</span> Blogs
                  </h1>
                  <p className="text-[10px] tracking-widest text-cyberPurple font-bold uppercase">Admin Panel</p>
                </div>
                <div className="flex items-center space-x-2 text-xs font-bold text-slate-455">
                  <Settings className="w-4 h-4 text-cyberPurple" />
                  <span>/</span>
                  <span className="text-[#1B124B]">Pending Blogs</span>
                </div>
              </div>

              {/* Draft Blogs Table Grid */}
              <div className="bg-white border border-slate-200/80 rounded-3xl shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#D0E2FF]/40 border-b border-slate-250 text-xs font-extrabold text-slate-900">
                      <th className="py-4 px-6 w-16">#</th>
                      <th className="py-4 px-6">Title</th>
                      <th className="py-4 px-6">Slug</th>
                      <th className="py-4 px-6 text-center w-56">Edit / Delete</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs font-extrabold text-slate-850">
                    {draftBlogsList.map((b, idx) => (
                      <tr key={b.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-6 px-6 text-slate-500">{idx + 1}</td>
                        <td className="py-6 px-6">
                          <span className="text-[#1B124B] font-extrabold text-sm sm:text-base">{b.title}</span>
                          <span className="block text-[10px] text-slate-400 font-bold uppercase mt-1 tracking-wider">{b.category}</span>
                        </td>
                        <td className="py-6 px-6 font-mono text-slate-500 text-xs">
                          {b.slug}
                        </td>
                        <td className="py-6 px-6">
                          <div className="flex items-center justify-center space-x-2.5">
                            <button
                              onClick={() => handleStartBlogEdit(b.id)}
                              className="border border-slate-255 hover:bg-slate-50 px-3 py-1.5 rounded-lg flex items-center space-x-1.5 text-[11px] font-extrabold text-[#1B124B] cursor-pointer transition-colors"
                            >
                              <Edit className="w-3.5 h-3.5" />
                              <span>Edit</span>
                            </button>
                            <button
                              onClick={() => handleStartBlogDelete(b.id, b.title)}
                              className="border border-slate-255 hover:bg-slate-50 px-3 py-1.5 rounded-lg flex items-center space-x-1.5 text-[11px] font-extrabold text-[#1B124B] cursor-pointer transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Delete</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {draftBlogsList.length === 0 && (
                      <tr>
                        <td colSpan={4} className="py-8 text-center">
                          <span className="text-[#0052cc] bg-[#deebff] px-4 py-1.5 rounded-xl font-bold text-xs inline-block">
                            No Draft Blogs Available
                          </span>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

            </div>
          )}

          {/* ADD BLOG WORKSPACE VIEW (matching mockup exactly) */}
          {activeMenu === 'add-blog' && (
            <div className="space-y-6 text-left relative">
              
              {/* Header Title Section */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-4">
                <div className="space-y-1">
                  <h1 className="text-3xl font-extrabold text-[#1B124B] tracking-tight">
                    <span className="text-cyberPurple">Add</span> Blog
                  </h1>
                  <p className="text-[10px] tracking-widest text-cyberPurple font-bold uppercase">Admin Panel</p>
                </div>
                <div className="flex items-center space-x-2 text-xs font-bold text-slate-450">
                  <Notebook className="w-4 h-4 text-cyberPurple" />
                  <span>/</span>
                  <span className="text-[#1B124B] capitalize">Addblog</span>
                </div>
              </div>

              {/* Form container card */}
              <form onSubmit={handleSaveBlogAdd} className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 font-sans">
                
                {/* 1. Title Input */}
                <div className="space-y-2">
                  <label className="text-sm font-extrabold text-slate-800 block">Title</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter small title"
                    value={addTitle}
                    onChange={(e) => setAddTitle(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-250 rounded-xl px-4 py-3.5 text-xs sm:text-sm focus:outline-none focus:border-cyberPurple transition-colors font-extrabold text-slate-800 placeholder-slate-400"
                  />
                </div>

                {/* 2. Slug (Autofilled / editable) */}
                <div className="space-y-2">
                  <label className="text-sm font-extrabold text-slate-800 block">Slug</label>
                  <input
                    type="text"
                    placeholder="Enter slug title"
                    value={addSlug}
                    onChange={(e) => setAddSlug(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-255 rounded-xl px-4 py-3.5 text-xs sm:text-sm focus:outline-none focus:border-cyberPurple transition-colors font-mono font-extrabold text-slate-800 placeholder-slate-400"
                  />
                </div>

                {/* 3. Category Select Listbox */}
                <div className="space-y-2">
                  <label className="text-sm font-extrabold text-slate-800 block">Select Category</label>
                  <select
                    multiple
                    value={addCategory ? [addCategory] : []}
                    onChange={(e) => setAddCategory(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl p-2.5 text-xs sm:text-sm h-40 focus:outline-none focus:border-cyberPurple font-extrabold text-slate-800"
                  >
                    <option value="Node js">Node js</option>
                    <option value="React js">React js</option>
                    <option value="Next Js">Next Js</option>
                    <option value="Flutter Dev">Flutter Dev</option>
                    <option value="Tailwind CSS">Tailwind CSS</option>
                    <option value="Other">Other (Write Custom Category)</option>
                  </select>
                  {addCategory === 'Other' && (
                    <div className="pt-2">
                      <input
                        type="text"
                        placeholder="Write custom category..."
                        value={customCategoryAdd}
                        onChange={(e) => setCustomCategoryAdd(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm focus:outline-none focus:border-cyberPurple font-extrabold text-slate-800 placeholder-slate-400"
                      />
                    </div>
                  )}
                  <div className="pt-2 text-xs text-slate-555 flex items-center space-x-1.5">
                    <span className="font-extrabold text-slate-800">Selected: </span>
                    {addCategory && (
                      <span className="px-2.5 py-1 rounded bg-slate-100 border border-slate-200 text-slate-700 font-extrabold capitalize">
                        {addCategory === 'Other' && customCategoryAdd ? customCategoryAdd : addCategory}
                      </span>
                    )}
                  </div>
                </div>

                {/* 4. Images Upload Zone (dashed green) */}
                <div className="space-y-2">
                  <label className="text-sm font-extrabold text-slate-800 block">
                    Images (first image will be show as thumbnail, you can drag)
                  </label>
                  <div className="border-dashed border-2 border-green-300 bg-green-55/10 rounded-2xl p-6 text-center cursor-pointer hover:bg-green-55/20 transition-all">
                    <input type="file" className="hidden" id="add-file-picker" />
                    <label htmlFor="add-file-picker" className="cursor-pointer text-xs sm:text-sm text-slate-555 flex flex-col items-center space-y-2">
                      <ImageFileIcon className="w-8 h-8 text-green-400" />
                      <span className="font-extrabold"><strong className="text-green-500 underline">Choose Files</strong> No file chosen</span>
                    </label>
                  </div>
                </div>

                {/* 5. Split Markdown Editor */}
                <div className="space-y-2 relative">
                  <label className="text-sm font-extrabold text-slate-800 block">
                    Blog Content (for image: first upload and copy link and paste in ![alt text](link) )
                  </label>

                  <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-inner bg-slate-50/50 relative">
                    {/* Toolbar */}
                    <div className="bg-slate-50 border-b border-slate-200 px-4 py-2.5 flex items-center space-x-3.5 text-slate-500 relative">
                      
                      {/* Heading size menu button */}
                      <div className="relative">
                        <Type
                          className="w-3.5 h-3.5 cursor-pointer hover:text-slate-800"
                          onClick={() => setShowHeadingDropdownAdd(!showHeadingDropdownAdd)}
                        />
                        {showHeadingDropdownAdd && (
                          <div className="absolute top-6 left-0 z-30 bg-white border border-slate-200 rounded-xl shadow-lg py-1.5 w-24 flex flex-col items-stretch text-left">
                            {[1, 2, 3, 4, 5, 6].map((l) => (
                              <button
                                key={l}
                                type="button"
                                onClick={() => handleAddHeadingTag(l, 'add')}
                                className="hover:bg-slate-50 text-slate-800 text-[11px] font-bold py-1.5 px-3 rounded-lg text-left"
                              >
                                H{l}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      <Bold className="w-3.5 h-3.5 cursor-pointer hover:text-slate-800" onClick={() => setAddContent(prev => prev + '**text**')} />
                      <Italic className="w-3.5 h-3.5 cursor-pointer hover:text-slate-800" onClick={() => setAddContent(prev => prev + '*text*')} />
                      <Underline className="w-3.5 h-3.5 cursor-pointer hover:text-slate-800" onClick={() => setAddContent(prev => prev + '<u>text</u>')} />
                      <Heading className="w-3.5 h-3.5 cursor-pointer hover:text-slate-800" onClick={() => setAddContent(prev => prev + '\n## Heading')} />
                      <List className="w-3.5 h-3.5 cursor-pointer hover:text-slate-800" onClick={() => setAddContent(prev => prev + '\n- item')} />
                      <Code className="w-3.5 h-3.5 cursor-pointer hover:text-slate-800" onClick={() => setAddContent(prev => prev + '\n```javascript\n\n```')} />
                      <LinkIcon className="w-3.5 h-3.5 cursor-pointer hover:text-slate-800" onClick={() => setAddContent(prev => prev + '[title](url)')} />
                    </div>

                    {/* Editor Splits */}
                    <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200">
                      <textarea
                        rows={12}
                        value={addContent}
                        onChange={(e) => setAddContent(e.target.value)}
                        className="w-full bg-white px-4 py-3 text-xs sm:text-sm font-mono focus:outline-none resize-none text-slate-700 font-bold"
                        placeholder="Write article markdown content..."
                      />

                      <div className="w-full bg-white px-4 py-3 text-xs sm:text-sm text-slate-700 overflow-y-auto max-h-[260px] text-left space-y-4 prose prose-slate font-sans">
                        {addContent ? (
                          addContent.split('\n\n').map((paragraph, pIdx) => {
                            if (paragraph.startsWith('## ')) {
                              return <h3 key={pIdx} className="text-base font-extrabold text-slate-900 pt-2 border-b border-slate-100 pb-1">{paragraph.replace('## ', '')}</h3>;
                            }
                            if (paragraph.startsWith('# ')) {
                              return <h2 key={pIdx} className="text-lg font-extrabold text-slate-900 pt-2">{paragraph.replace('# ', '')}</h2>;
                            }
                            return <p key={pIdx} className="leading-relaxed font-bold">{paragraph}</p>;
                          })
                        ) : (
                          <span className="text-slate-400 italic">Preview parses here in real-time...</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tags Ctrl+Click Select Listbox */}
                <div className="space-y-2">
                  <label className="text-sm font-extrabold text-slate-800 block font-sans">
                    Tags (ctrl + leftclick for multiple select)
                  </label>
                  <select
                    multiple
                    value={addTags}
                    onChange={(e) => {
                      const opts = e.target.options;
                      const selected: string[] = [];
                      for (let i = 0; i < opts.length; i++) {
                        if (opts[i].selected) {
                          selected.push(opts[i].value);
                        }
                      }
                      setAddTags(selected);
                    }}
                    className="w-full bg-white border border-slate-200 rounded-xl p-2.5 text-xs sm:text-sm h-36 focus:outline-none focus:border-cyberPurple font-extrabold text-slate-850"
                  >
                    <option value="html">Html</option>
                    <option value="css">css</option>
                    <option value="javascript">javaScript</option>
                  </select>
                  <div className="pt-2 text-xs text-slate-500 flex items-center space-x-1.5">
                    <span className="font-extrabold text-slate-855 font-sans">Selected: </span>
                    <div className="flex flex-wrap gap-1.5">
                      {addTags.map((t, idx) => (
                        <span key={idx} className="px-2.5 py-1 rounded bg-slate-100 border border-slate-200 text-slate-700 font-extrabold capitalize">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 7. Status dropdown (Default: No Select) */}
                <div className="space-y-2">
                  <label className="text-sm font-extrabold text-slate-800 block">Status</label>
                  <select
                    value={addStatus}
                    onChange={(e) => setAddStatus(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm focus:outline-none focus:border-cyberPurple font-extrabold text-slate-800"
                  >
                    <option value="No Select">No Select</option>
                    <option value="Published">Publish</option>
                    <option value="Draft">Draft</option>
                  </select>
                  <div className="pt-2 text-xs text-slate-500 flex items-center space-x-1.5">
                    <span className="font-extrabold text-slate-855">Selected: </span>
                    <span className="px-2.5 py-1 rounded bg-slate-100 border border-slate-200 text-slate-700 font-extrabold">
                      {addStatus}
                    </span>
                  </div>
                </div>

                {/* Save Blog CTA Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full py-4 bg-cyberPurple hover:bg-purple-650 text-white font-extrabold text-sm uppercase tracking-wider rounded-2xl cursor-pointer transition-colors shadow-lg shadow-purple-950/20 text-center"
                  >
                    Save Blog
                  </button>
                </div>

              </form>
            </div>
          )}

          {/* EDIT BLOG WORKSPACE VIEW (matching mockup) */}
          {activeMenu === 'edit-blog' && (
            <div className="space-y-6 text-left relative">
              
              {/* Header Title section */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-4">
                <div className="space-y-1">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1B124B] tracking-tight">
                    <span className="text-cyberPurple">Edit</span> {editTitle}
                  </h1>
                  <p className="text-[10px] tracking-widest text-cyberPurple font-bold uppercase">Admin Panel</p>
                </div>
                <div className="flex items-center space-x-2 text-xs font-bold text-slate-455">
                  <Notebook className="w-4 h-4 text-cyberPurple" />
                  <span>/</span>
                  <span className="text-[#1B124B]">Edit Blog</span>
                </div>
              </div>

              {/* Edit Form Card */}
              <form onSubmit={handleSaveBlogEdit} className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 font-sans">
                
                {/* 1. Title Input */}
                <div className="space-y-2">
                  <label className="text-sm font-extrabold text-slate-800 block">Title</label>
                  <input
                    type="text"
                    required
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm focus:outline-none focus:border-cyberPurple transition-colors font-extrabold text-slate-800"
                  />
                </div>

                {/* 2. Slug (Autofilled / Read-Only) */}
                <div className="space-y-2">
                  <label className="text-sm font-extrabold text-slate-800 block">Slug</label>
                  <input
                    type="text"
                    readOnly
                    value={editSlug}
                    className="w-full bg-slate-100 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-550 focus:outline-none cursor-default font-mono font-bold"
                  />
                </div>

                {/* 3. Category Select Listbox */}
                <div className="space-y-2">
                  <label className="text-sm font-extrabold text-slate-800 block">Select Category</label>
                  <select
                    multiple
                    value={editCategory ? [editCategory] : []}
                    onChange={(e) => setEditCategory(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl p-2.5 text-xs sm:text-sm h-32 focus:outline-none focus:border-cyberPurple font-extrabold text-slate-800"
                  >
                    <option value="Node js">Node js</option>
                    <option value="React js">React js</option>
                    <option value="Next Js">Next Js</option>
                    <option value="Flutter Dev">Flutter Dev</option>
                    <option value="Tailwind CSS">Tailwind CSS</option>
                    <option value="Other">Other (Write Custom Category)</option>
                  </select>
                  {editCategory === 'Other' && (
                    <div className="pt-2">
                      <input
                        type="text"
                        placeholder="Write custom category..."
                        value={customCategoryEdit}
                        onChange={(e) => setCustomCategoryEdit(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm focus:outline-none focus:border-cyberPurple font-extrabold text-slate-800 placeholder-slate-400"
                      />
                    </div>
                  )}
                  <div className="pt-2 flex items-center space-x-1.5 text-xs text-slate-500">
                    <span className="font-extrabold text-slate-800">Selected:</span>
                    <span className="px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-slate-700 font-extrabold">
                      {editCategory === 'Other' && customCategoryEdit ? customCategoryEdit : editCategory}
                    </span>
                  </div>
                </div>

                {/* 4. Images Zone (Dashed Green box & preview) */}
                <div className="space-y-2">
                  <label className="text-sm font-extrabold text-slate-800 block">
                    Images (first image will be show as thumbnail, you can drag)
                  </label>
                  <div className="border-dashed border-2 border-green-300 bg-green-55/10 rounded-2xl p-6 text-center cursor-pointer hover:bg-green-55/20 transition-all">
                    <input type="file" className="hidden" id="admin-file-picker" />
                    <label htmlFor="admin-file-picker" className="cursor-pointer text-xs sm:text-sm text-slate-555 flex flex-col items-center space-y-2">
                      <ImageFileIcon className="w-8 h-8 text-green-400" />
                      <span className="font-extrabold"><strong className="text-green-500 underline">Choose Files</strong> No file chosen</span>
                    </label>
                  </div>

                  {/* Thumbnail Cover preview matching mockup (Image 2) */}
                  {editImg && (
                    <div className="pt-3">
                      <img
                        src={editImg}
                        alt="Preview cover"
                        className="w-28 h-20 rounded-xl object-cover border border-slate-200 shadow-sm"
                      />
                    </div>
                  )}
                </div>

                {/* 5. Split Markdown Editor & live parser */}
                <div className="space-y-2 relative">
                  <label className="text-sm font-extrabold text-slate-800 block">
                    Blog Content (for image: first upload and copy link and paste in ![alt text](link) )
                  </label>
                  
                  {/* Editor Box */}
                  <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-inner bg-slate-50/50 relative">
                    {/* Toolbar */}
                    <div className="bg-slate-50 border-b border-slate-200 px-4 py-2.5 flex items-center space-x-3.5 text-slate-500 relative">
                      
                      {/* Heading size menu button */}
                      <div className="relative">
                        <Type
                          className="w-3.5 h-3.5 cursor-pointer hover:text-slate-800"
                          onClick={() => setShowHeadingDropdownEdit(!showHeadingDropdownEdit)}
                        />
                        {showHeadingDropdownEdit && (
                          <div className="absolute top-6 left-0 z-35 bg-white border border-slate-200 rounded-xl shadow-lg py-1.5 w-24 flex flex-col items-stretch text-left">
                            {[1, 2, 3, 4, 5, 6].map((l) => (
                              <button
                                key={l}
                                type="button"
                                onClick={() => handleAddHeadingTag(l, 'edit')}
                                className="hover:bg-slate-50 text-slate-800 text-[11px] font-bold py-1.5 px-3 rounded-lg text-left"
                              >
                                H{l}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      <Bold className="w-3.5 h-3.5 cursor-pointer hover:text-slate-800" onClick={() => setEditContent(prev => prev + '**text**')} />
                      <Italic className="w-3.5 h-3.5 cursor-pointer hover:text-slate-800" onClick={() => setEditContent(prev => prev + '*text*')} />
                      <Underline className="w-3.5 h-3.5 cursor-pointer hover:text-slate-800" onClick={() => setEditContent(prev => prev + '<u>text</u>')} />
                      <Heading className="w-3.5 h-3.5 cursor-pointer hover:text-slate-800" onClick={() => setEditContent(prev => prev + '\n## Heading')} />
                      <List className="w-3.5 h-3.5 cursor-pointer hover:text-slate-800" onClick={() => setEditContent(prev => prev + '\n- item')} />
                      <Code className="w-3.5 h-3.5 cursor-pointer hover:text-slate-800" onClick={() => setEditContent(prev => prev + '\n```javascript\n\n```')} />
                      <LinkIcon className="w-3.5 h-3.5 cursor-pointer hover:text-slate-800" onClick={() => setEditContent(prev => prev + '[title](url)')} />
                    </div>

                    {/* Split View */}
                    <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200">
                      <textarea
                        rows={14}
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        className="w-full bg-white px-4 py-3 text-xs sm:text-sm font-mono focus:outline-none resize-none text-slate-800 font-bold"
                        placeholder="Write article markdown content..."
                      />

                      <div className="w-full bg-white px-4 py-3 text-xs sm:text-sm text-slate-700 overflow-y-auto max-h-[300px] text-left space-y-4 prose prose-slate font-sans">
                        {editContent ? (
                          editContent.split('\n\n').map((paragraph, pIdx) => {
                            if (paragraph.startsWith('## ')) {
                              return <h3 key={pIdx} className="text-base font-extrabold text-slate-900 pt-2 border-b border-slate-100 pb-1">{paragraph.replace('## ', '')}</h3>;
                            }
                            if (paragraph.startsWith('# ')) {
                              return <h2 key={pIdx} className="text-lg font-extrabold text-slate-900 pt-2">{paragraph.replace('# ', '')}</h2>;
                            }
                            return <p key={pIdx} className="leading-relaxed font-bold">{paragraph}</p>;
                          })
                        ) : (
                          <span className="text-slate-400 italic">Preview parses here in real-time...</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tags Ctrl+Click Select Listbox */}
                <div className="space-y-2">
                  <label className="text-sm font-extrabold text-slate-800 block">
                    Tags (ctrl + leftclick for multiple select)
                  </label>
                  <select
                    multiple
                    value={editTags}
                    onChange={(e) => {
                      const opts = e.target.options;
                      const selected: string[] = [];
                      for (let i = 0; i < opts.length; i++) {
                        if (opts[i].selected) {
                          selected.push(opts[i].value);
                        }
                      }
                      setEditTags(selected);
                    }}
                    className="w-full bg-white border border-slate-200 rounded-xl p-2.5 text-xs sm:text-sm h-36 focus:outline-none focus:border-cyberPurple font-extrabold text-slate-855"
                  >
                    <option value="javascript">javaScript</option>
                    <option value="css">css</option>
                    <option value="html">Html</option>
                    <option value="nextjs">Next js</option>
                    <option value="react">React</option>
                  </select>
                  <div className="pt-2 flex items-center space-x-1.5 text-xs text-slate-555">
                    <span className="font-extrabold text-slate-800">Selected:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {editTags.map((t, idx) => (
                        <span key={idx} className="px-2.5 py-1 rounded bg-slate-100 border border-slate-200 text-slate-700 font-extrabold capitalize">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 7. Status selector */}
                <div className="space-y-2">
                  <label className="text-sm font-extrabold text-slate-800 block">Status</label>
                  <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value as 'Published' | 'Draft')}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm focus:outline-none focus:border-cyberPurple font-extrabold text-slate-800"
                  >
                    <option value="Published">Publish</option>
                    <option value="Draft">Draft</option>
                  </select>
                  <div className="pt-2 flex items-center space-x-1.5 text-xs text-slate-555">
                    <span className="font-extrabold text-slate-800">Selected:</span>
                    <span className="px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-slate-700 font-extrabold">
                      {editStatus === 'Published' ? 'Publish' : 'Draft'}
                    </span>
                  </div>
                </div>

                {/* Save Blog Submit Button (matching mockup) */}
                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full py-4 bg-cyberPurple hover:bg-purple-650 text-white font-extrabold text-sm uppercase tracking-wider rounded-2xl cursor-pointer transition-colors shadow-lg shadow-purple-950/20 text-center"
                  >
                    Save Blog
                  </button>
                </div>

              </form>
            </div>
          )}

          {/* DELETE BLOG CONFIRMATION VIEW (matching mockup) */}
          {activeMenu === 'delete-blog' && (
            <div className="space-y-6 text-left">
              
              {/* Header section */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-4">
                <div className="space-y-1">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1B124B] tracking-tight">
                    <span className="text-[#8B5CF6]">Delete</span> {deletingBlogTitle}
                  </h1>
                  <p className="text-[10px] tracking-widest text-[#8B5CF6] font-bold uppercase">Admin Panel</p>
                </div>
                <div className="flex items-center space-x-2 text-xs font-bold text-slate-455">
                  <Notebook className="w-4 h-4 text-[#8B5CF6]" />
                  <span>/</span>
                  <span className="text-[#1B124B]">Delete Blog</span>
                </div>
              </div>

              {/* Centered warning card block */}
              <div className="flex flex-col items-center justify-center pt-8">
                <div className="bg-white rounded-3xl shadow-xl max-w-md w-full p-8 sm:p-10 text-center border border-slate-100/60 space-y-6">
                  
                  {/* Warning Trash Icon with custom design */}
                  <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
                    <Trash2 className="w-16 h-16 text-rose-500" />
                    <span className="absolute -top-1 -right-1 bg-rose-500 text-white font-bold w-6 h-6 rounded-full flex items-center justify-center text-sm shadow animate-pulse">!</span>
                  </div>

                  {/* Title & subtitle details */}
                  <div className="space-y-2">
                    <h2 className="text-xl sm:text-2xl font-extrabold text-slate-855">Are you sure?</h2>
                    <p className="text-xs sm:text-sm text-slate-555 font-extrabold leading-relaxed px-2 font-sans">
                      If you delete this website content it will be permenent delete your content.
                    </p>
                  </div>

                  {/* Action Pill Buttons */}
                  <div className="flex items-center justify-center space-x-3 pt-2">
                    <button
                      onClick={handleConfirmBlogDelete}
                      className="bg-[#5B7BF0] hover:bg-blue-600 text-white font-bold px-8 py-3 rounded-2xl text-xs uppercase tracking-wider shadow-md shadow-[#5B7BF0]/15 cursor-pointer transition-colors"
                    >
                      Delete
                    </button>
                    <button
                      onClick={handleCancelBlogDelete}
                      className="bg-[#E2E8F0] hover:bg-slate-350 text-slate-700 font-bold px-8 py-3 rounded-2xl text-xs uppercase tracking-wider cursor-pointer transition-colors"
                    >
                      Cancel
                    </button>
                  </div>

                </div>
              </div>

            </div>
          )}

          {/* ALL PRODUCTS LISTING VIEW (matching mockup) */}
          {activeMenu === 'all-products' && (
            <div className="space-y-6">
              
              {/* Header Title Section */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-4">
                <div className="space-y-1">
                  <h1 className="text-3xl font-extrabold text-[#1B124B] tracking-tight">
                    <span className="text-cyberPurple">All Published</span> Products
                  </h1>
                  <p className="text-[10px] tracking-widest text-cyberPurple font-bold uppercase">Admin Panel</p>
                </div>
                <div className="flex items-center space-x-2 text-xs font-bold text-slate-455">
                  <Layout className="w-4 h-4 text-cyberPurple" />
                  <span>/</span>
                  <span className="text-[#1B124B]">Projects</span>
                </div>
              </div>

              {/* Search Products input */}
              <div className="flex items-center space-x-3 bg-white border border-slate-200 p-4 rounded-2xl shadow-sm max-w-lg">
                <span className="text-xs font-extrabold text-[#1B124B] whitespace-nowrap">Search Products By Title:</span>
                <div className="relative flex-grow">
                  <input
                    type="text"
                    placeholder="Search by title..."
                    value={productSearchQuery}
                    onChange={(e) => setProductSearchQuery(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-cyberPurple font-extrabold placeholder-slate-400"
                  />
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-3.5" />
                </div>
              </div>

              {/* Products Table with image thumbnails */}
              <div className="bg-white border border-slate-200/80 rounded-3xl shadow-sm overflow-hidden min-h-[160px] relative">
                
                {isProductLoading ? (
                  /* Image 1 Waves Loader column block */
                  <div className="py-20 flex flex-col items-center justify-center space-y-3">
                    <div className="flex items-end justify-center space-x-1.5 h-10 w-24">
                      <div className="w-2.5 bg-blue-500 rounded-md animate-pulse h-10" style={{ animationDelay: '0.1s' }} />
                      <div className="w-2.5 bg-blue-500 rounded-md animate-pulse h-6" style={{ animationDelay: '0.25s' }} />
                      <div className="w-2.5 bg-blue-500 rounded-md animate-pulse h-8" style={{ animationDelay: '0.4s' }} />
                    </div>
                  </div>
                ) : (
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-[#D0E2FF]/40 border-b border-slate-255 text-xs font-extrabold text-slate-900">
                        <th className="py-4 px-6 w-16">#</th>
                        <th className="py-4 px-6 w-36">image</th>
                        <th className="py-4 px-6">Title</th>
                        <th className="py-4 px-6 text-center w-56">Edit / Delete</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs font-extrabold text-slate-850">
                      {filteredProductsList.map((p, idx) => (
                        <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="py-6 px-6 text-slate-500">{idx + 1}</td>
                          <td className="py-6 px-6">
                            <img
                              src={p.img}
                              alt={p.title}
                              className="w-24 h-24 rounded-lg object-cover border border-slate-200 bg-slate-100"
                            />
                          </td>
                          <td className="py-6 px-6">
                            <span className="text-[#1B124B] font-extrabold text-sm sm:text-base block max-w-md leading-relaxed">
                              {p.title}
                            </span>
                            <span className="block text-[10px] text-slate-400 font-bold uppercase mt-1.5 tracking-wider">
                              Price: {p.price} | {p.date}
                            </span>
                          </td>
                          <td className="py-6 px-6">
                            <div className="flex items-center justify-center space-x-2.5">
                              <button
                                onClick={() => handleStartProductEdit(p.id)}
                                className="border border-slate-255 hover:bg-slate-50 px-3 py-1.5 rounded-lg flex items-center space-x-1.5 text-[11px] font-extrabold text-[#1B124B] cursor-pointer transition-colors"
                              >
                                <Edit className="w-3.5 h-3.5" />
                                <span>Edit</span>
                              </button>
                              <button
                                onClick={() => handleDeleteProduct(p.id)}
                                className="border border-slate-255 hover:bg-slate-50 px-3 py-1.5 rounded-lg flex items-center space-x-1.5 text-[11px] font-extrabold text-[#1B124B] cursor-pointer transition-colors"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                <span>Delete</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {filteredProductsList.length === 0 && (
                        <tr>
                          <td colSpan={4} className="py-8 text-center text-slate-400 text-xs">
                            No published products found matching "{productSearchQuery}".
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                )}
              </div>

            </div>
          )}

          {/* ADD PRODUCT WORKSPACE VIEW (matching mockup) */}
          {activeMenu === 'add-product' && (
            <div className="space-y-6 text-left relative">
              
              {/* Header Title Section */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-4">
                <div className="space-y-1">
                  <h1 className="text-3xl font-extrabold text-[#1B124B] tracking-tight">
                    <span className="text-cyberPurple">Add</span> Product
                  </h1>
                  <p className="text-[10px] tracking-widest text-cyberPurple font-bold uppercase">Admin Panel</p>
                </div>
                <div className="flex items-center space-x-2 text-xs font-bold text-slate-450">
                  <Layout className="w-4 h-4 text-cyberPurple" />
                  <span>/</span>
                  <span className="text-[#1B124B] capitalize">Addproduct</span>
                </div>
              </div>

              {/* Form card */}
              <form onSubmit={handleSaveProductAdd} className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 font-sans">
                
                {/* Title */}
                <div className="space-y-2">
                  <label className="text-sm font-extrabold text-slate-800 block">Title</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter small title"
                    value={addProdTitle}
                    onChange={(e) => setAddProdTitle(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-250 rounded-xl px-4 py-3.5 text-xs sm:text-sm focus:outline-none focus:border-cyberPurple font-extrabold text-slate-800 placeholder-slate-400"
                  />
                </div>

                {/* Slug */}
                <div className="space-y-2">
                  <label className="text-sm font-extrabold text-slate-800 block">Slug</label>
                  <input
                    type="text"
                    placeholder="Enter slug title"
                    value={addProdSlug}
                    onChange={(e) => setAddProdSlug(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-250 rounded-xl px-4 py-3.5 text-xs sm:text-sm focus:outline-none focus:border-cyberPurple font-mono font-extrabold text-slate-800 placeholder-slate-400"
                  />
                </div>

                {/* Images green-dashed */}
                <div className="space-y-2">
                  <label className="text-sm font-extrabold text-slate-800 block">
                    Images (first image will be show as thumbnail, you can drag)
                  </label>
                  <div className="border-dashed border-2 border-green-300 bg-green-55/10 rounded-2xl p-6 text-center cursor-pointer hover:bg-green-55/20 transition-all">
                    <input type="file" className="hidden" id="add-prod-file-picker" />
                    <label htmlFor="add-prod-file-picker" className="cursor-pointer text-xs sm:text-sm text-slate-555 flex flex-col items-center space-y-2">
                      <ImageFileIcon className="w-8 h-8 text-green-400" />
                      <span className="font-extrabold"><strong className="text-green-500 underline">Choose Files</strong> No file chosen</span>
                    </label>
                  </div>
                </div>

                {/* Description split editor */}
                <div className="space-y-2 relative">
                  <label className="text-sm font-extrabold text-slate-800 block">
                    Project description (for image: first upload and copy link and paste in ![alt text](link) )
                  </label>

                  <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-inner bg-slate-50/50 relative">
                    {/* Toolbar */}
                    <div className="bg-slate-50 border-b border-slate-200 px-4 py-2.5 flex items-center space-x-3.5 text-slate-500 relative">
                      <div className="relative">
                        <Type
                          className="w-3.5 h-3.5 cursor-pointer hover:text-slate-800"
                          onClick={() => setShowHeadingDropdownProdAdd(!showHeadingDropdownProdAdd)}
                        />
                        {showHeadingDropdownProdAdd && (
                          <div className="absolute top-6 left-0 z-30 bg-white border border-slate-200 rounded-xl shadow-lg py-1.5 w-24 flex flex-col items-stretch text-left">
                            {[1, 2, 3, 4, 5, 6].map((l) => (
                              <button
                                key={l}
                                type="button"
                                onClick={() => handleAddHeadingTag(l, 'addprod')}
                                className="hover:bg-slate-50 text-slate-800 text-[11px] font-bold py-1.5 px-3 rounded-lg text-left"
                              >
                                H{l}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      <Bold className="w-3.5 h-3.5 cursor-pointer hover:text-slate-800" onClick={() => setAddProdContent(prev => prev + '**text**')} />
                      <Italic className="w-3.5 h-3.5 cursor-pointer hover:text-slate-800" onClick={() => setAddProdContent(prev => prev + '*text*')} />
                      <Underline className="w-3.5 h-3.5 cursor-pointer hover:text-slate-800" onClick={() => setAddProdContent(prev => prev + '<u>text</u>')} />
                      <Heading className="w-3.5 h-3.5 cursor-pointer hover:text-slate-800" onClick={() => setAddProdContent(prev => prev + '\n## Heading')} />
                      <List className="w-3.5 h-3.5 cursor-pointer hover:text-slate-800" onClick={() => setAddProdContent(prev => prev + '\n- item')} />
                      <Code className="w-3.5 h-3.5 cursor-pointer hover:text-slate-800" onClick={() => setAddProdContent(prev => prev + '\n```javascript\n\n```')} />
                      <LinkIcon className="w-3.5 h-3.5 cursor-pointer hover:text-slate-800" onClick={() => setAddProdContent(prev => prev + '[title](url)')} />
                    </div>

                    {/* Split editor view */}
                    <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200">
                      <textarea
                        rows={12}
                        value={addProdContent}
                        onChange={(e) => setAddProdContent(e.target.value)}
                        className="w-full bg-white px-4 py-3 text-xs sm:text-sm font-mono focus:outline-none resize-none text-slate-800 font-bold"
                        placeholder="Write product description markdown..."
                      />

                      <div className="w-full bg-white px-4 py-3 text-xs sm:text-sm text-slate-700 overflow-y-auto max-h-[260px] text-left space-y-4 prose prose-slate font-sans">
                        {addProdContent ? (
                          addProdContent.split('\n\n').map((paragraph, pIdx) => {
                            if (paragraph.startsWith('## ')) {
                              return <h3 key={pIdx} className="text-base font-extrabold text-slate-900 pt-2 border-b border-slate-100 pb-1">{paragraph.replace('## ', '')}</h3>;
                            }
                            if (paragraph.startsWith('# ')) {
                              return <h2 key={pIdx} className="text-lg font-extrabold text-slate-900 pt-2">{paragraph.replace('# ', '')}</h2>;
                            }
                            return <p key={pIdx} className="leading-relaxed font-bold">{paragraph}</p>;
                          })
                        ) : (
                          <span className="text-slate-400 italic">Preview parses here in real-time...</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tags multi-select */}
                <div className="space-y-2">
                  <label className="text-sm font-extrabold text-slate-800 block">
                    Tags (ctrl + leftclick for multiple select)
                  </label>
                  <select
                    multiple
                    value={addProdTags}
                    onChange={(e) => {
                      const opts = e.target.options;
                      const selected: string[] = [];
                      for (let i = 0; i < opts.length; i++) {
                        if (opts[i].selected) {
                          selected.push(opts[i].value);
                        }
                      }
                      setAddProdTags(selected);
                    }}
                    className="w-full bg-white border border-slate-200 rounded-xl p-2.5 text-xs sm:text-sm h-36 focus:outline-none focus:border-cyberPurple font-extrabold text-slate-850"
                  >
                    <option value="GIMBAL">GIMBAL</option>
                    <option value="CONTENT CREATORS">CONTENT CREATORS</option>
                    <option value="DESK">DESK</option>
                    <option value="STANDING DESK">STANDING DESK</option>
                  </select>
                  <div className="pt-2 text-xs text-slate-500 flex items-center space-x-1.5">
                    <span className="font-extrabold text-slate-850">Selected: </span>
                    <div className="flex flex-wrap gap-1.5">
                      {addProdTags.map((t, idx) => (
                        <span key={idx} className="px-2.5 py-1 rounded bg-slate-100 border border-slate-200 text-slate-700 font-extrabold capitalize">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Price input */}
                <div className="space-y-2">
                  <label className="text-sm font-extrabold text-slate-800 block">Price</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter Price"
                    value={addProdPrice}
                    onChange={(e) => setAddProdPrice(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-250 rounded-xl px-4 py-3.5 text-xs sm:text-sm focus:outline-none focus:border-cyberPurple font-extrabold text-slate-800 placeholder-slate-400"
                  />
                </div>

                {/* Affiliate Link */}
                <div className="space-y-2">
                  <label className="text-sm font-extrabold text-slate-800 block">Afilate link</label>
                  <input
                    type="text"
                    placeholder="Enter afilink"
                    value={addProdAfilateLink}
                    onChange={(e) => setAddProdAfilateLink(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-250 rounded-xl px-4 py-3.5 text-xs sm:text-sm focus:outline-none focus:border-cyberPurple font-extrabold text-slate-800 placeholder-slate-400"
                  />
                </div>

                {/* Status selector */}
                <div className="space-y-2">
                  <label className="text-sm font-extrabold text-slate-800 block">Status</label>
                  <select
                    value={addProdStatus}
                    onChange={(e) => setAddProdStatus(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm focus:outline-none focus:border-cyberPurple font-extrabold text-slate-800"
                  >
                    <option value="No Select">No Select</option>
                    <option value="Published">Publish</option>
                    <option value="Draft">Draft</option>
                  </select>
                  <div className="pt-2 text-xs text-slate-555 flex items-center space-x-1.5">
                    <span className="font-extrabold text-slate-855">Selected: </span>
                    <span className="px-2.5 py-1 rounded bg-slate-100 border border-slate-200 text-slate-700 font-extrabold">
                      {addProdStatus}
                    </span>
                  </div>
                </div>

                {/* Submit button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full py-4 bg-cyberPurple hover:bg-purple-650 text-white font-extrabold text-sm uppercase tracking-wider rounded-2xl cursor-pointer transition-colors shadow-lg"
                  >
                    SAVE DATA
                  </button>
                </div>

              </form>
            </div>
          )}

          {/* EDIT PRODUCT WORKSPACE VIEW (matching mockup) */}
          {activeMenu === 'edit-product' && (
            <div className="space-y-6 text-left relative">
              
              {/* Header Title Section */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-4">
                <div className="space-y-1">
                  <h1 className="text-3xl font-extrabold text-[#1B124B] tracking-tight">
                    <span className="text-cyberPurple">Edit</span> {editProdTitle}
                  </h1>
                  <p className="text-[10px] tracking-widest text-cyberPurple font-bold uppercase">Admin Panel</p>
                </div>
                <div className="flex items-center space-x-2 text-xs font-bold text-slate-450">
                  <Layout className="w-4 h-4 text-cyberPurple" />
                  <span>/</span>
                  <span className="text-[#1B124B] capitalize">Edit Product</span>
                </div>
              </div>

              {/* Edit Form */}
              <form onSubmit={handleSaveProductEdit} className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 font-sans">
                
                {/* Title */}
                <div className="space-y-2">
                  <label className="text-sm font-extrabold text-slate-800 block">Title</label>
                  <input
                    type="text"
                    required
                    value={editProdTitle}
                    onChange={(e) => setEditProdTitle(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-250 rounded-xl px-4 py-3.5 text-xs sm:text-sm focus:outline-none focus:border-cyberPurple font-extrabold text-slate-800"
                  />
                </div>

                {/* Slug */}
                <div className="space-y-2">
                  <label className="text-sm font-extrabold text-slate-800 block">Slug</label>
                  <input
                    type="text"
                    readOnly
                    value={editProdSlug}
                    className="w-full bg-slate-100 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-500 focus:outline-none font-mono font-bold cursor-default"
                  />
                </div>

                {/* Images green-dashed */}
                <div className="space-y-2">
                  <label className="text-sm font-extrabold text-slate-800 block">
                    Images (first image will be show as thumbnail, you can drag)
                  </label>
                  <div className="border-dashed border-2 border-green-300 bg-green-55/10 rounded-2xl p-6 text-center cursor-pointer hover:bg-green-55/20 transition-all">
                    <input type="file" className="hidden" id="edit-prod-file-picker" />
                    <label htmlFor="edit-prod-file-picker" className="cursor-pointer text-xs sm:text-sm text-slate-555 flex flex-col items-center space-y-2">
                      <ImageFileIcon className="w-8 h-8 text-green-400" />
                      <span className="font-extrabold"><strong className="text-green-500 underline">Choose Files</strong> No file chosen</span>
                    </label>
                  </div>
                  {editProdImg && (
                    <div className="pt-2">
                      <img src={editProdImg} alt="Preview" className="w-24 h-24 rounded-xl object-cover border border-slate-200" />
                    </div>
                  )}
                </div>

                {/* Description split editor */}
                <div className="space-y-2 relative">
                  <label className="text-sm font-extrabold text-slate-800 block">
                    Project description (for image: first upload and copy link and paste in ![alt text](link) )
                  </label>

                  <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-inner bg-slate-50/50 relative">
                    {/* Toolbar */}
                    <div className="bg-slate-50 border-b border-slate-200 px-4 py-2.5 flex items-center space-x-3.5 text-slate-500 relative">
                      <div className="relative">
                        <Type
                          className="w-3.5 h-3.5 cursor-pointer hover:text-slate-800"
                          onClick={() => setShowHeadingDropdownProdEdit(!showHeadingDropdownProdEdit)}
                        />
                        {showHeadingDropdownProdEdit && (
                          <div className="absolute top-6 left-0 z-30 bg-white border border-slate-200 rounded-xl shadow-lg py-1.5 w-24 flex flex-col items-stretch text-left">
                            {[1, 2, 3, 4, 5, 6].map((l) => (
                              <button
                                key={l}
                                type="button"
                                onClick={() => handleAddHeadingTag(l, 'editprod')}
                                className="hover:bg-slate-50 text-slate-800 text-[11px] font-bold py-1.5 px-3 rounded-lg text-left"
                              >
                                H{l}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      <Bold className="w-3.5 h-3.5 cursor-pointer hover:text-slate-800" onClick={() => setEditProdContent(prev => prev + '**text**')} />
                      <Italic className="w-3.5 h-3.5 cursor-pointer hover:text-slate-800" onClick={() => setEditProdContent(prev => prev + '*text*')} />
                      <Underline className="w-3.5 h-3.5 cursor-pointer hover:text-slate-800" onClick={() => setEditProdContent(prev => prev + '<u>text</u>')} />
                      <Heading className="w-3.5 h-3.5 cursor-pointer hover:text-slate-800" onClick={() => setEditProdContent(prev => prev + '\n## Heading')} />
                      <List className="w-3.5 h-3.5 cursor-pointer hover:text-slate-800" onClick={() => setEditProdContent(prev => prev + '\n- item')} />
                      <Code className="w-3.5 h-3.5 cursor-pointer hover:text-slate-800" onClick={() => setEditProdContent(prev => prev + '\n```javascript\n\n```')} />
                      <LinkIcon className="w-3.5 h-3.5 cursor-pointer hover:text-slate-800" onClick={() => setEditProdContent(prev => prev + '[title](url)')} />
                    </div>

                    {/* Split editor view */}
                    <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200">
                      <textarea
                        rows={14}
                        value={editProdContent}
                        onChange={(e) => setEditProdContent(e.target.value)}
                        className="w-full bg-white px-4 py-3 text-xs sm:text-sm font-mono focus:outline-none resize-none text-slate-800 font-bold"
                        placeholder="Write product description markdown..."
                      />

                      <div className="w-full bg-white px-4 py-3 text-xs sm:text-sm text-slate-700 overflow-y-auto max-h-[300px] text-left space-y-4 prose prose-slate font-sans">
                        {editProdContent ? (
                          editProdContent.split('\n\n').map((paragraph, pIdx) => {
                            if (paragraph.startsWith('## ')) {
                              return <h3 key={pIdx} className="text-base font-extrabold text-slate-900 pt-2 border-b border-slate-100 pb-1">{paragraph.replace('## ', '')}</h3>;
                            }
                            if (paragraph.startsWith('# ')) {
                              return <h2 key={pIdx} className="text-lg font-extrabold text-slate-900 pt-2">{paragraph.replace('# ', '')}</h2>;
                            }
                            return <p key={pIdx} className="leading-relaxed font-bold">{paragraph}</p>;
                          })
                        ) : (
                          <span className="text-slate-400 italic">Preview parses here in real-time...</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tags multi-select */}
                <div className="space-y-2">
                  <label className="text-sm font-extrabold text-slate-800 block">
                    Tags (ctrl + leftclick for multiple select)
                  </label>
                  <select
                    multiple
                    value={editProdTags}
                    onChange={(e) => {
                      const opts = e.target.options;
                      const selected: string[] = [];
                      for (let i = 0; i < opts.length; i++) {
                        if (opts[i].selected) {
                          selected.push(opts[i].value);
                        }
                      }
                      setEditProdTags(selected);
                    }}
                    className="w-full bg-white border border-slate-200 rounded-xl p-2.5 text-xs sm:text-sm h-36 focus:outline-none focus:border-cyberPurple font-extrabold text-slate-855"
                  >
                    <option value="GIMBAL">GIMBAL</option>
                    <option value="CONTENT CREATORS">CONTENT CREATORS</option>
                    <option value="DESK">DESK</option>
                    <option value="STANDING DESK">STANDING DESK</option>
                  </select>
                  <div className="pt-2 text-xs text-slate-500 flex items-center space-x-1.5">
                    <span className="font-extrabold text-slate-800">Selected:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {editProdTags.map((t, idx) => (
                        <span key={idx} className="px-2.5 py-1 rounded bg-slate-100 border border-slate-200 text-slate-700 font-extrabold capitalize">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Price input */}
                <div className="space-y-2">
                  <label className="text-sm font-extrabold text-slate-800 block">Price</label>
                  <input
                    type="text"
                    required
                    value={editProdPrice}
                    onChange={(e) => setEditProdPrice(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-250 rounded-xl px-4 py-3.5 text-xs sm:text-sm focus:outline-none focus:border-cyberPurple font-extrabold text-slate-800"
                  />
                </div>

                {/* Affiliate Link */}
                <div className="space-y-2">
                  <label className="text-sm font-extrabold text-slate-800 block">Afilate link</label>
                  <input
                    type="text"
                    value={editProdAfilateLink}
                    onChange={(e) => setEditProdAfilateLink(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-250 rounded-xl px-4 py-3.5 text-xs sm:text-sm focus:outline-none focus:border-cyberPurple font-extrabold text-slate-800"
                  />
                </div>

                {/* Status selector */}
                <div className="space-y-2">
                  <label className="text-sm font-extrabold text-[#1B124B] block">Status</label>
                  <select
                    value={editProdStatus}
                    onChange={(e) => setEditProdStatus(e.target.value as 'Published' | 'Draft')}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm focus:outline-none focus:border-cyberPurple font-extrabold text-slate-800"
                  >
                    <option value="Published">Publish</option>
                    <option value="Draft">Draft</option>
                  </select>
                  <div className="pt-2 flex items-center space-x-1.5 text-xs text-slate-555">
                    <span className="font-extrabold text-slate-800">Selected:</span>
                    <span className="px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-slate-700 font-extrabold">
                      {editProdStatus === 'Published' ? 'Publish' : 'Draft'}
                    </span>
                  </div>
                </div>

                {/* Submit button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full py-4 bg-cyberPurple hover:bg-purple-650 text-white font-extrabold text-sm uppercase tracking-wider rounded-2xl cursor-pointer transition-colors shadow-lg"
                  >
                    SAVE DATA
                  </button>
                </div>

              </form>
            </div>
          )}

          {activeMenu === 'all-projects' && (
            <div className="space-y-6">
              {/* Header Title Section */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-4">
                <div className="space-y-1">
                  <h1 className="text-3xl font-extrabold text-[#1B124B] tracking-tight">All Published Projects</h1>
                  <p className="text-[10px] tracking-widest text-cyberPurple font-bold uppercase">Admin Panel</p>
                </div>
                <div className="flex items-center space-x-2 text-xs font-bold text-slate-455">
                  <Layers className="w-4 h-4 text-cyberPurple" />
                  <span>/</span>
                  <span className="text-[#1B124B]">Projects</span>
                </div>
              </div>

              {/* Search Bar */}
              <div className="flex items-center space-x-3 bg-white border border-slate-200 p-4 rounded-2xl shadow-sm max-w-md">
                <span className="text-xs font-extrabold text-[#1B124B] whitespace-nowrap">Search Projects:</span>
                <div className="relative flex-grow">
                  <input
                    type="text"
                    placeholder="Search by title..."
                    value={projectSearchQuery}
                    onChange={(e) => { setProjectSearchQuery(e.target.value); setAdminProjectPage(1); }}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-cyberPurple font-bold"
                  />
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-3.5" />
                </div>
              </div>

              {/* Projects Table */}
              <div className="bg-white border border-slate-200/80 rounded-3xl shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#D0E2FF]/40 border-b border-slate-255 text-xs font-extrabold text-slate-900">
                      <th className="py-4 px-6 w-16">#</th>
                      <th className="py-4 px-6 w-32">Image</th>
                      <th className="py-4 px-6">Title</th>
                      <th className="py-4 px-6 text-center w-56">Edit / Delete</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs font-extrabold text-slate-855">
                    {paginatedProjectsList.map((p, idx) => {
                      const overallIndex = (adminProjectPage - 1) * adminProjectsPerPage + idx + 1;
                      return (
                        <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="py-6 px-6 text-slate-500">{overallIndex}</td>
                          <td className="py-6 px-6">
                            <img src={p.img} alt={p.title} className="w-20 h-14 rounded-lg object-cover border border-slate-200 bg-slate-150" />
                          </td>
                          <td className="py-6 px-6">
                            <span className="text-[#1B124B] font-extrabold text-sm sm:text-base">{p.title}</span>
                            <span className="block text-[10px] text-slate-400 font-bold uppercase mt-1 tracking-wider">{p.category}</span>
                          </td>
                          <td className="py-6 px-6">
                            <div className="flex items-center justify-center space-x-2.5">
                              <button
                                onClick={() => handleStartProjectEdit(p.id)}
                                className="border border-slate-255 hover:bg-slate-50 px-3 py-1.5 rounded-lg flex items-center space-x-1.5 text-[11px] font-extrabold text-[#1B124B] cursor-pointer transition-colors"
                              >
                                <Edit className="w-3.5 h-3.5" />
                                <span>Edit</span>
                              </button>
                              <button
                                onClick={() => handleStartProjectDelete(p.id, p.title)}
                                className="border border-slate-255 hover:bg-slate-50 px-3 py-1.5 rounded-lg flex items-center space-x-1.5 text-[11px] font-extrabold text-[#1B124B] cursor-pointer transition-colors"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                <span>Delete</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                    {paginatedProjectsList.length === 0 && (
                      <tr>
                        <td colSpan={4} className="py-8 text-center text-slate-400 text-xs">
                          No projects found matching "{projectSearchQuery}".
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Projects Pagination Controls */}
              {totalAdminProjectPages > 1 && (
                <div className="flex items-center justify-center space-x-2.5 pt-4">
                  <button
                    onClick={() => setAdminProjectPage(prev => Math.max(prev - 1, 1))}
                    disabled={adminProjectPage === 1}
                    className={`px-4.5 py-2.5 rounded-xl border text-xs font-bold transition-all ${
                      adminProjectPage === 1
                        ? 'bg-[#F8F9FB] border-slate-100 text-slate-300 cursor-not-allowed opacity-60'
                        : 'bg-[#F8F9FB] border-slate-200 text-slate-700 hover:bg-slate-100 cursor-pointer'
                    }`}
                  >
                    Previous
                  </button>

                  {Array.from({ length: totalAdminProjectPages }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setAdminProjectPage(i + 1)}
                      className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        adminProjectPage === i + 1
                          ? 'bg-[#5B7BF0] text-white shadow-sm shadow-[#5B7BF0]/15'
                          : 'bg-[#5B7BF0]/85 text-white/90 hover:bg-[#5B7BF0]'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}

                  <button
                    onClick={() => setAdminProjectPage(prev => Math.min(prev + 1, totalAdminProjectPages))}
                    disabled={adminProjectPage === totalAdminProjectPages}
                    className={`px-4.5 py-2.5 rounded-xl border text-xs font-bold transition-all ${
                      adminProjectPage === totalAdminProjectPages
                        ? 'bg-[#F8F9FB] border-slate-100 text-slate-300 cursor-not-allowed opacity-60'
                        : 'bg-[#F8F9FB] border-slate-200 text-slate-700 hover:bg-slate-100 cursor-pointer'
                    }`}
                  >
                    Next
                  </button>
                </div>
              )}

            </div>
          )}

          {activeMenu === 'draft-projects' && (
            <div className="space-y-6">
              {/* Header Title Section */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-4">
                <div className="space-y-1">
                  <h1 className="text-3xl font-extrabold text-[#1B124B] tracking-tight">
                    <span className="text-cyberPurple">Draft</span> Projects
                  </h1>
                  <p className="text-[10px] tracking-widest text-cyberPurple font-bold uppercase">Admin Panel</p>
                </div>
                <div className="flex items-center space-x-2 text-xs font-bold text-slate-455">
                  <Settings className="w-4 h-4 text-cyberPurple" />
                  <span>/</span>
                  <span className="text-[#1B124B]">Pending Projects</span>
                </div>
              </div>

              {/* Draft Projects Table Grid */}
              <div className="bg-white border border-slate-200/80 rounded-3xl shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#D0E2FF]/40 border-b border-slate-250 text-xs font-extrabold text-slate-900">
                      <th className="py-4 px-6 w-16">#</th>
                      <th className="py-4 px-6">Title</th>
                      <th className="py-4 px-6">Slug</th>
                      <th className="py-4 px-6 text-center w-56">Edit / Delete</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs font-extrabold text-slate-850">
                    {draftProjectsList.map((p, idx) => (
                      <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-6 px-6 text-slate-500">{idx + 1}</td>
                        <td className="py-6 px-6">
                          <span className="text-[#1B124B] font-extrabold text-sm sm:text-base">{p.title}</span>
                          <span className="block text-[10px] text-slate-400 font-bold uppercase mt-1 tracking-wider">{p.category}</span>
                        </td>
                        <td className="py-6 px-6 font-mono text-slate-500 text-xs">
                          {p.slug}
                        </td>
                        <td className="py-6 px-6">
                          <div className="flex items-center justify-center space-x-2.5">
                            <button
                              onClick={() => handleStartProjectEdit(p.id)}
                              className="border border-slate-255 hover:bg-slate-50 px-3 py-1.5 rounded-lg flex items-center space-x-1.5 text-[11px] font-extrabold text-[#1B124B] cursor-pointer transition-colors"
                            >
                              <Edit className="w-3.5 h-3.5" />
                              <span>Edit</span>
                            </button>
                            <button
                              onClick={() => handleStartProjectDelete(p.id, p.title)}
                              className="border border-slate-255 hover:bg-slate-50 px-3 py-1.5 rounded-lg flex items-center space-x-1.5 text-[11px] font-extrabold text-[#1B124B] cursor-pointer transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Delete</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {draftProjectsList.length === 0 && (
                      <tr>
                        <td colSpan={4} className="py-8 text-center">
                          <span className="text-[#0052cc] bg-[#deebff] px-4 py-1.5 rounded-xl font-bold text-xs inline-block">
                            No Draft Projects Available
                          </span>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

            </div>
          )}

          {activeMenu === 'add-projects' && (
            <div className="space-y-6 text-left relative">
              {/* Header Title Section */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-4">
                <div className="space-y-1">
                  <h1 className="text-3xl font-extrabold text-[#1B124B] tracking-tight">
                    <span className="text-cyberPurple">Add</span> Project
                  </h1>
                  <p className="text-[10px] tracking-widest text-cyberPurple font-bold uppercase">Admin Panel</p>
                </div>
                <div className="flex items-center space-x-2 text-xs font-bold text-slate-455">
                  <Layers className="w-4 h-4 text-cyberPurple" />
                  <span>/</span>
                  <span className="text-[#1B124B] capitalize">Addproject</span>
                </div>
              </div>

              {/* Form card container */}
              <form onSubmit={handleSaveProjectAdd} className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 font-sans">
                {/* Title */}
                <div className="space-y-2">
                  <label className="text-sm font-extrabold text-slate-800 block">Title</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter small title"
                    value={addProjTitle}
                    onChange={(e) => setAddProjTitle(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-250 rounded-xl px-4 py-3.5 text-xs sm:text-sm focus:outline-none focus:border-cyberPurple transition-colors font-extrabold text-slate-800 placeholder-slate-400"
                  />
                </div>

                {/* Slug */}
                <div className="space-y-2">
                  <label className="text-sm font-extrabold text-slate-800 block">Slug</label>
                  <input
                    type="text"
                    placeholder="Enter slug title"
                    value={addProjSlug}
                    onChange={(e) => setAddProjSlug(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-255 rounded-xl px-4 py-3.5 text-xs sm:text-sm focus:outline-none focus:border-cyberPurple transition-colors font-mono font-extrabold text-slate-800 placeholder-slate-400"
                  />
                </div>

                {/* Select Category */}
                <div className="space-y-2">
                  <label className="text-sm font-extrabold text-slate-800 block">Select Category</label>
                  <select
                    multiple
                    value={addProjCat ? [addProjCat] : []}
                    onChange={(e) => setAddProjCat(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl p-2.5 text-xs sm:text-sm h-40 focus:outline-none focus:border-cyberPurple font-extrabold text-slate-800"
                  >
                    <option value="Website">Website</option>
                    <option value="Apps">Apps</option>
                    <option value="Digital">Digital</option>
                    <option value="Content">Content</option>
                  </select>
                  <div className="pt-2 text-xs text-slate-500 flex items-center space-x-1.5">
                    <span className="font-extrabold text-slate-800">Selected: </span>
                    {addProjCat && (
                      <span className="px-2.5 py-1 rounded bg-slate-100 border border-slate-200 text-slate-700 font-extrabold capitalize">
                        {addProjCat}
                      </span>
                    )}
                  </div>
                </div>

                {/* Images */}
                <div className="space-y-2">
                  <label className="text-sm font-extrabold text-slate-800 block">
                    Images (first image will be show as thumbnail, you can drag)
                  </label>
                  <div className="border-dashed border-2 border-green-300 bg-green-55/10 rounded-2xl p-6 text-center cursor-pointer hover:bg-green-55/20 transition-all">
                    <input type="file" className="hidden" id="add-proj-file" />
                    <label htmlFor="add-proj-file" className="cursor-pointer text-xs sm:text-sm text-slate-555 flex flex-col items-center space-y-2">
                      <ImageFileIcon className="w-8 h-8 text-green-400" />
                      <span className="font-extrabold"><strong className="text-green-500 underline">Choose Files</strong> No file chosen</span>
                    </label>
                  </div>
                </div>

                {/* Content split editor */}
                <div className="space-y-2 relative">
                  <label className="text-sm font-extrabold text-slate-800 block">
                    Project Description (for image: first upload and copy link and paste in ![alt text](link) )
                  </label>

                  <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-inner bg-slate-50/50 relative">
                    <div className="bg-slate-50 border-b border-slate-200 px-4 py-2.5 flex items-center space-x-3.5 text-slate-500 relative">
                      <div className="relative">
                        <Type
                          className="w-3.5 h-3.5 cursor-pointer hover:text-slate-800"
                          onClick={() => setShowHeadingDropdownProjAdd(!showHeadingDropdownProjAdd)}
                        />
                        {showHeadingDropdownProjAdd && (
                          <div className="absolute top-6 left-0 z-30 bg-white border border-slate-200 rounded-xl shadow-lg py-1.5 w-24 flex flex-col items-stretch text-left">
                            {[1, 2, 3, 4, 5, 6].map((l) => (
                              <button
                                key={l}
                                type="button"
                                onClick={() => handleAddHeadingTag(l, 'addproj')}
                                className="hover:bg-slate-50 text-slate-800 text-[11px] font-bold py-1.5 px-3 rounded-lg text-left"
                              >
                                H{l}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      <Bold className="w-3.5 h-3.5 cursor-pointer hover:text-slate-800" onClick={() => setAddProjContent(prev => prev + '**text**')} />
                      <Italic className="w-3.5 h-3.5 cursor-pointer hover:text-slate-800" onClick={() => setAddProjContent(prev => prev + '*text*')} />
                      <Underline className="w-3.5 h-3.5 cursor-pointer hover:text-slate-800" onClick={() => setAddProjContent(prev => prev + '<u>text</u>')} />
                      <Heading className="w-3.5 h-3.5 cursor-pointer hover:text-slate-800" onClick={() => setAddProjContent(prev => prev + '\n## Heading')} />
                      <List className="w-3.5 h-3.5 cursor-pointer hover:text-slate-800" onClick={() => setAddProjContent(prev => prev + '\n- item')} />
                      <Code className="w-3.5 h-3.5 cursor-pointer hover:text-slate-800" onClick={() => setAddProjContent(prev => prev + '\n```javascript\n\n```')} />
                      <LinkIcon className="w-3.5 h-3.5 cursor-pointer hover:text-slate-800" onClick={() => setAddProjContent(prev => prev + '[title](url)')} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200">
                      <textarea
                        rows={12}
                        value={addProjContent}
                        onChange={(e) => setAddProjContent(e.target.value)}
                        className="w-full bg-white px-4 py-3 text-xs sm:text-sm font-mono focus:outline-none resize-none text-slate-700 font-bold"
                        placeholder="Write project description markdown..."
                      />
                      <div className="w-full bg-white px-4 py-3 text-xs sm:text-sm text-slate-700 overflow-y-auto max-h-[260px] text-left space-y-4 prose prose-slate font-sans">
                        {addProjContent ? (
                          addProjContent.split('\n\n').map((paragraph, pIdx) => {
                            if (paragraph.startsWith('## ')) {
                              return <h3 key={pIdx} className="text-base font-extrabold text-slate-900 pt-2 border-b border-slate-100 pb-1">{paragraph.replace('## ', '')}</h3>;
                            }
                            if (paragraph.startsWith('# ')) {
                              return <h2 key={pIdx} className="text-lg font-extrabold text-slate-900 pt-2">{paragraph.replace('# ', '')}</h2>;
                            }
                            return <p key={pIdx} className="leading-relaxed font-bold">{paragraph}</p>;
                          })
                        ) : (
                          <span className="text-slate-400 italic">Preview parses here in real-time...</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className="space-y-2">
                  <label className="text-sm font-extrabold text-slate-800 block">
                    Tags (ctrl + leftclick for multiple select)
                  </label>
                  <select
                    multiple
                    value={addProjTags}
                    onChange={(e) => {
                      const opts = e.target.options;
                      const selected: string[] = [];
                      for (let i = 0; i < opts.length; i++) {
                        if (opts[i].selected) {
                          selected.push(opts[i].value);
                        }
                      }
                      setAddProjTags(selected);
                    }}
                    className="w-full bg-white border border-slate-200 rounded-xl p-2.5 text-xs sm:text-sm h-36 focus:outline-none focus:border-cyberPurple font-extrabold text-slate-855"
                  >
                    <option value="react">react</option>
                    <option value="css">css</option>
                    <option value="html">html</option>
                    <option value="javascript">javascript</option>
                  </select>
                  <div className="pt-2 text-xs text-slate-500 flex items-center space-x-1.5">
                    <span className="font-extrabold text-slate-855">Selected: </span>
                    <div className="flex flex-wrap gap-1.5">
                      {addProjTags.map((t, idx) => (
                        <span key={idx} className="px-2.5 py-1 rounded bg-slate-100 border border-slate-200 text-slate-700 font-extrabold capitalize">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Status */}
                <div className="space-y-2">
                  <label className="text-sm font-extrabold text-slate-800 block">Status</label>
                  <select
                    value={addProjStatus}
                    onChange={(e) => setAddProjStatus(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm focus:outline-none focus:border-cyberPurple font-extrabold text-slate-800"
                  >
                    <option value="No Select">No Select</option>
                    <option value="Published">Publish</option>
                    <option value="Draft">Draft</option>
                  </select>
                  <div className="pt-2 text-xs text-slate-500 flex items-center space-x-1.5">
                    <span className="font-extrabold text-slate-855">Selected: </span>
                    <span className="px-2.5 py-1 rounded bg-slate-100 border border-slate-200 text-slate-700 font-extrabold">
                      {addProjStatus}
                    </span>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full py-4 bg-cyberPurple hover:bg-purple-650 text-white font-extrabold text-sm uppercase tracking-wider rounded-2xl cursor-pointer transition-colors shadow-lg text-center"
                  >
                    Save Project
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeMenu === 'edit-project' && (
            <div className="space-y-6 text-left relative">
              {/* Header Title section */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-4">
                <div className="space-y-1">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1B124B] tracking-tight">
                    <span className="text-cyberPurple">Edit</span> {editProjTitle}
                  </h1>
                  <p className="text-[10px] tracking-widest text-cyberPurple font-bold uppercase">Admin Panel</p>
                </div>
                <div className="flex items-center space-x-2 text-xs font-bold text-slate-455">
                  <Layers className="w-4 h-4 text-cyberPurple" />
                  <span>/</span>
                  <span className="text-[#1B124B]">Edit Project</span>
                </div>
              </div>

              {/* Edit Form */}
              <form onSubmit={handleSaveProjectEdit} className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 font-sans">
                {/* Title */}
                <div className="space-y-2">
                  <label className="text-sm font-extrabold text-slate-800 block">Title</label>
                  <input
                    type="text"
                    required
                    value={editProjTitle}
                    onChange={(e) => setEditProjTitle(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm focus:outline-none focus:border-cyberPurple transition-colors font-extrabold text-slate-800"
                  />
                </div>

                {/* Slug */}
                <div className="space-y-2">
                  <label className="text-sm font-extrabold text-slate-800 block">Slug</label>
                  <input
                    type="text"
                    readOnly
                    value={editProjSlug}
                    className="w-full bg-slate-100 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-500 focus:outline-none cursor-default font-mono font-bold"
                  />
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <label className="text-sm font-extrabold text-slate-800 block">Select Category</label>
                  <select
                    multiple
                    value={editProjCat ? [editProjCat] : []}
                    onChange={(e) => setEditProjCat(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl p-2.5 text-xs sm:text-sm h-32 focus:outline-none focus:border-cyberPurple font-extrabold text-slate-800"
                  >
                    <option value="Website">Website</option>
                    <option value="Apps">Apps</option>
                    <option value="Digital">Digital</option>
                    <option value="Content">Content</option>
                  </select>
                  <div className="pt-2 flex items-center space-x-1.5 text-xs text-slate-500">
                    <span className="font-extrabold text-slate-800">Selected:</span>
                    <span className="px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-slate-700 font-extrabold">
                      {editProjCat}
                    </span>
                  </div>
                </div>

                {/* Images */}
                <div className="space-y-2">
                  <label className="text-sm font-extrabold text-slate-800 block">
                    Images (first image will be show as thumbnail, you can drag)
                  </label>
                  <div className="border-dashed border-2 border-green-300 bg-green-55/10 rounded-2xl p-6 text-center cursor-pointer hover:bg-green-55/20 transition-all">
                    <input type="file" className="hidden" id="edit-proj-file" />
                    <label htmlFor="edit-proj-file" className="cursor-pointer text-xs sm:text-sm text-slate-555 flex flex-col items-center space-y-2">
                      <ImageFileIcon className="w-8 h-8 text-green-400" />
                      <span className="font-extrabold"><strong className="text-green-500 underline">Choose Files</strong> No file chosen</span>
                    </label>
                  </div>
                  {editProjImg && (
                    <div className="pt-3">
                      <img src={editProjImg} alt="Preview cover" className="w-28 h-20 rounded-xl object-cover border border-slate-200 shadow-sm" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="space-y-2 relative">
                  <label className="text-sm font-extrabold text-slate-800 block">
                    Project Description (for image: first upload and copy link and paste in ![alt text](link) )
                  </label>
                  <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-inner bg-slate-50/50 relative">
                    <div className="bg-slate-50 border-b border-slate-200 px-4 py-2.5 flex items-center space-x-3.5 text-slate-500 relative">
                      <div className="relative">
                        <Type
                          className="w-3.5 h-3.5 cursor-pointer hover:text-slate-800"
                          onClick={() => setShowHeadingDropdownProjEdit(!showHeadingDropdownProjEdit)}
                        />
                        {showHeadingDropdownProjEdit && (
                          <div className="absolute top-6 left-0 z-35 bg-white border border-slate-200 rounded-xl shadow-lg py-1.5 w-24 flex flex-col items-stretch text-left">
                            {[1, 2, 3, 4, 5, 6].map((l) => (
                              <button
                                key={l}
                                type="button"
                                onClick={() => handleAddHeadingTag(l, 'editproj')}
                                className="hover:bg-slate-50 text-slate-800 text-[11px] font-bold py-1.5 px-3 rounded-lg text-left"
                              >
                                H{l}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      <Bold className="w-3.5 h-3.5 cursor-pointer hover:text-slate-800" onClick={() => setEditProjContent(prev => prev + '**text**')} />
                      <Italic className="w-3.5 h-3.5 cursor-pointer hover:text-slate-800" onClick={() => setEditProjContent(prev => prev + '*text*')} />
                      <Underline className="w-3.5 h-3.5 cursor-pointer hover:text-slate-800" onClick={() => setEditProjContent(prev => prev + '<u>text</u>')} />
                      <Heading className="w-3.5 h-3.5 cursor-pointer hover:text-slate-800" onClick={() => setEditProjContent(prev => prev + '\n## Heading')} />
                      <List className="w-3.5 h-3.5 cursor-pointer hover:text-slate-800" onClick={() => setEditProjContent(prev => prev + '\n- item')} />
                      <Code className="w-3.5 h-3.5 cursor-pointer hover:text-slate-800" onClick={() => setEditProjContent(prev => prev + '\n```javascript\n\n```')} />
                      <LinkIcon className="w-3.5 h-3.5 cursor-pointer hover:text-slate-800" onClick={() => setEditProjContent(prev => prev + '[title](url)')} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200">
                      <textarea
                        rows={14}
                        value={editProjContent}
                        onChange={(e) => setEditProjContent(e.target.value)}
                        className="w-full bg-white px-4 py-3 text-xs sm:text-sm text-slate-800 font-mono focus:outline-none resize-none font-bold"
                        placeholder="Write project description markdown..."
                      />
                      <div className="w-full bg-white px-4 py-3 text-xs sm:text-sm text-slate-700 overflow-y-auto max-h-[300px] text-left space-y-4 prose prose-slate font-sans">
                        {editProjContent ? (
                          editProjContent.split('\n\n').map((paragraph, pIdx) => {
                            if (paragraph.startsWith('## ')) {
                              return <h3 key={pIdx} className="text-base font-extrabold text-slate-900 pt-2 border-b border-slate-100 pb-1">{paragraph.replace('## ', '')}</h3>;
                            }
                            if (paragraph.startsWith('# ')) {
                              return <h2 key={pIdx} className="text-lg font-extrabold text-slate-900 pt-2">{paragraph.replace('# ', '')}</h2>;
                            }
                            return <p key={pIdx} className="leading-relaxed font-bold">{paragraph}</p>;
                          })
                        ) : (
                          <span className="text-slate-400 italic">Preview parses here in real-time...</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className="space-y-2">
                  <label className="text-sm font-extrabold text-slate-800 block">
                    Tags (ctrl + leftclick for multiple select)
                  </label>
                  <select
                    multiple
                    value={editProjTags}
                    onChange={(e) => {
                      const opts = e.target.options;
                      const selected: string[] = [];
                      for (let i = 0; i < opts.length; i++) {
                        if (opts[i].selected) {
                          selected.push(opts[i].value);
                        }
                      }
                      setEditProjTags(selected);
                    }}
                    className="w-full bg-white border border-slate-200 rounded-xl p-2.5 text-xs sm:text-sm h-36 focus:outline-none focus:border-cyberPurple font-extrabold text-slate-855"
                  >
                    <option value="react">react</option>
                    <option value="css">css</option>
                    <option value="html">html</option>
                    <option value="javascript">javascript</option>
                  </select>
                  <div className="pt-2 flex items-center space-x-1.5 text-xs text-slate-500">
                    <span className="font-extrabold text-slate-800">Selected:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {editProjTags.map((t, idx) => (
                        <span key={idx} className="px-2.5 py-1 rounded bg-slate-100 border border-slate-200 text-slate-700 font-extrabold capitalize">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Status */}
                <div className="space-y-2">
                  <label className="text-sm font-extrabold text-slate-800 block">Status</label>
                  <select
                    value={editProjStatus}
                    onChange={(e) => setEditProjStatus(e.target.value as 'Published' | 'Draft')}
                    className="w-full bg-slate-50 border border-slate-250 rounded-xl px-4 py-3 text-xs sm:text-sm focus:outline-none focus:border-cyberPurple font-extrabold text-slate-800"
                  >
                    <option value="Published">Publish</option>
                    <option value="Draft">Draft</option>
                  </select>
                  <div className="pt-2 flex items-center space-x-1.5 text-xs text-slate-555">
                    <span className="font-extrabold text-slate-800">Selected:</span>
                    <span className="px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-slate-700 font-extrabold">
                      {editProjStatus === 'Published' ? 'Publish' : 'Draft'}
                    </span>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full py-4 bg-cyberPurple hover:bg-purple-650 text-white font-extrabold text-sm uppercase tracking-wider rounded-2xl cursor-pointer transition-colors shadow-lg text-center"
                  >
                    Save Project
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeMenu === 'delete-project' && (
            <div className="space-y-6 text-left">
              {/* Header section */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-4">
                <div className="space-y-1">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1B124B] tracking-tight">
                    <span className="text-[#8B5CF6]">Delete</span> {deletingProjectTitle}
                  </h1>
                  <p className="text-[10px] tracking-widest text-[#8B5CF6] font-bold uppercase">Admin Panel</p>
                </div>
                <div className="flex items-center space-x-2 text-xs font-bold text-slate-455">
                  <Layers className="w-4 h-4 text-[#8B5CF6]" />
                  <span>/</span>
                  <span className="text-[#1B124B]">Delete Project</span>
                </div>
              </div>

              {/* Centered warning card block */}
              <div className="flex flex-col items-center justify-center pt-8">
                <div className="bg-white rounded-3xl shadow-xl max-w-md w-full p-8 sm:p-10 text-center border border-slate-100/60 space-y-6">
                  <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
                    <Trash2 className="w-16 h-16 text-rose-500" />
                    <span className="absolute -top-1 -right-1 bg-rose-500 text-white font-bold w-6 h-6 rounded-full flex items-center justify-center text-sm shadow animate-pulse">!</span>
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-xl sm:text-2xl font-extrabold text-slate-855">Are you sure?</h2>
                    <p className="text-xs sm:text-sm text-slate-555 font-extrabold leading-relaxed px-2 font-sans">
                      If you delete this website project it will be permenent delete your content.
                    </p>
                  </div>
                  <div className="flex items-center justify-center space-x-3 pt-2">
                    <button
                      onClick={handleConfirmProjectDelete}
                      className="bg-[#5B7BF0] hover:bg-blue-650 text-white font-bold px-8 py-3 rounded-2xl text-xs uppercase tracking-wider shadow-md shadow-[#5B7BF0]/15 cursor-pointer transition-colors"
                    >
                      Delete
                    </button>
                    <button
                      onClick={handleCancelProjectDelete}
                      className="bg-[#E2E8F0] hover:bg-slate-350 text-slate-700 font-bold px-8 py-3 rounded-2xl text-xs uppercase tracking-wider cursor-pointer transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Shops sub-menu views */}
          {activeMenu === 'draft-products' && (
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6">
              <h3 className="text-lg font-extrabold text-slate-800">Draft Products</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                      <th className="py-4 px-6">Product Title</th>
                      <th className="py-4 px-6">Price</th>
                      <th className="py-4 px-6">Date</th>
                      <th className="py-4 px-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs font-bold text-slate-800">
                    {shopProducts.filter(p => p.status === 'Draft').map(p => (
                      <tr key={p.id}>
                        <td className="py-4 px-6 font-bold text-slate-800">{p.title}</td>
                        <td className="py-4 px-6 text-[#0090D9] font-bold">{p.price}</td>
                        <td className="py-4 px-6 text-slate-400">{p.date}</td>
                        <td className="py-4 px-6 text-right">
                          <button onClick={() => handleDeleteProduct(p.id)} className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Gallery sub-menu views */}
          {activeMenu === 'all-photos' && (
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6">
              <h3 className="text-lg font-extrabold text-slate-800">All Photos</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                      <th className="py-4 px-6">Photo Title</th>
                      <th className="py-4 px-6">Author / Photographer</th>
                      <th className="py-4 px-6">Date Added</th>
                      <th className="py-4 px-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs font-bold text-slate-800">
                    {galleryPhotos.map(p => (
                      <tr key={p.id}>
                        <td className="py-4 px-6 font-bold text-slate-800">{p.title}</td>
                        <td className="py-4 px-6 text-slate-655 font-bold">{p.author}</td>
                        <td className="py-4 px-6 text-slate-400">{p.date}</td>
                        <td className="py-4 px-6 text-right">
                          <button onClick={() => handleDeletePhoto(p.id)} className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeMenu === 'add-photos' && (
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6 max-w-xl text-left">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-855">Add Photo to Gallery</h3>
              <form onSubmit={handleCreatePhoto} className="space-y-4 font-sans">
                <input
                  type="text"
                  required
                  placeholder="Enter Photo Title"
                  value={newPhotoTitle}
                  onChange={(e) => setNewPhotoTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-250 rounded-xl px-4 py-3.5 text-xs sm:text-sm focus:outline-none focus:border-purple-500 font-bold"
                />

                <input
                  type="text"
                  required
                  placeholder="Photographer Author (e.g. Vaibhav Mak)"
                  value={newPhotoAuthor}
                  onChange={(e) => setNewPhotoAuthor(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-250 rounded-xl px-4 py-3.5 text-xs focus:outline-none focus:border-purple-500 font-bold"
                />

                <button type="submit" className="px-6 py-3 bg-purple-650 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer">
                  Add Photo
                </button>
              </form>
            </div>
          )}

          {activeMenu === 'contacts' && (
            <div className="space-y-6">
              
              {/* Header Title Section */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-4">
                <div className="space-y-1">
                  <h1 className="text-3xl font-extrabold text-[#1B124B] tracking-tight">All Contacts</h1>
                  <p className="text-[10px] tracking-widest text-cyberPurple font-bold uppercase">ADMIN PANEL</p>
                </div>
                <div className="flex items-center space-x-2 text-xs font-bold text-slate-455">
                  <Mail className="w-4 h-4 text-cyberPurple" />
                  <span>/</span>
                  <span className="text-[#1B124B]">Contacts</span>
                </div>
              </div>

              {/* Search contacts input */}
              <div className="flex items-center space-x-3 bg-white border border-slate-200 p-4 rounded-2xl shadow-sm max-w-lg">
                <span className="text-xs font-extrabold text-[#1B124B] whitespace-nowrap">Search Contact By Name:</span>
                <div className="relative flex-grow">
                  <input
                    type="text"
                    placeholder="Search by title..."
                    value={contactSearchQuery}
                    onChange={(e) => setContactSearchQuery(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-cyberPurple font-extrabold placeholder-slate-400"
                  />
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-3.5" />
                </div>
              </div>

              {/* Contacts Table Grid */}
              <div className="bg-white border border-slate-200/80 rounded-3xl shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#D0E2FF]/40 border-b border-slate-255 text-xs font-extrabold text-[#1B124B]">
                      <th className="py-4 px-6 w-16">#</th>
                      <th className="py-4 px-6">First Name</th>
                      <th className="py-4 px-6">Email</th>
                      <th className="py-4 px-6">Phone no</th>
                      <th className="py-4 px-6">Project</th>
                      <th className="py-4 px-6 text-center w-40">Open Contact</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs font-bold text-slate-800">
                    {filteredContacts.map((c, idx) => (
                      <tr key={c.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-6 px-6 text-slate-500">{idx + 1}</td>
                        <td className="py-6 px-6 text-slate-800 font-extrabold">{c.firstName}</td>
                        <td className="py-6 px-6 text-slate-800 font-extrabold">{c.email}</td>
                        <td className="py-6 px-6 text-slate-800 font-extrabold">{c.phoneNo}</td>
                        <td className="py-6 px-6 text-slate-800 font-extrabold">{c.project}</td>
                        <td className="py-6 px-6">
                          <div className="flex items-center justify-center">
                            <button
                              onClick={() => {
                                setSelectedContact(c);
                                setShowContactModal(true);
                              }}
                              className="border border-slate-200 hover:bg-slate-50 px-4 py-2 rounded-xl flex items-center space-x-1.5 text-xs font-extrabold text-slate-800 cursor-pointer transition-colors shadow-sm bg-white"
                            >
                              <Eye className="w-3.5 h-3.5 text-slate-500" />
                              <span>View</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filteredContacts.length === 0 && (
                      <tr>
                        <td colSpan={6} className="py-8 text-center text-slate-400 text-xs">
                          No contacts found matching "{contactSearchQuery}".
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Centered Pagination Controls matching mockup exactly */}
              <div className="flex items-center justify-center space-x-2.5 pt-4">
                <button
                  disabled
                  className="px-4 py-2.5 rounded-xl border text-xs font-bold bg-[#F8F9FB] border-slate-100 text-slate-300 cursor-not-allowed opacity-60"
                >
                  Previous
                </button>

                <button
                  className="px-4 py-2.5 rounded-xl text-xs font-bold bg-[#5B7BF0] text-white shadow-sm shadow-[#5B7BF0]/15 cursor-pointer"
                >
                  1
                </button>

                <button
                  disabled
                  className="px-4 py-2.5 rounded-xl border text-xs font-bold bg-[#F8F9FB] border-slate-100 text-slate-300 cursor-not-allowed opacity-60"
                >
                  Next
                </button>
              </div>

            </div>
          )}

          {activeMenu === 'settings' && (
            <div className="space-y-6 text-left relative">
              
              {/* Header Title Section */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-4">
                <div className="space-y-1">
                  <h1 className="text-3xl font-extrabold text-[#1B124B] tracking-tight">
                    <span className="text-cyberPurple">Admin</span> Settings
                  </h1>
                  <p className="text-[10px] tracking-widest text-cyberPurple font-bold uppercase">Admin Panel</p>
                </div>
                <div className="flex items-center space-x-2 text-xs font-bold text-slate-450">
                  <Settings className="w-4 h-4 text-cyberPurple" />
                  <span>/</span>
                  <span className="text-[#1B124B] capitalize">Settings</span>
                </div>
              </div>

              {/* Main abstract blue-sky rounded-3xl container */}
              <div className="w-full bg-gradient-to-r from-sky-400 via-sky-500 to-blue-600 rounded-[2rem] p-8 md:p-10 shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative overflow-hidden">
                
                {/* Abstract light-blue overlay curls to match mockup exactly */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.18)_0%,transparent_60%)] pointer-events-none" />
                <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[linear-gradient(45deg,#ffffff_25%,transparent_25%,transparent_75%,#ffffff_75%,#ffffff),linear-gradient(45deg,#ffffff_25%,transparent_25%,transparent_75%,#ffffff_75%,#ffffff)] bg-[size:30px_30px] bg-[position:0_0,15px_15px] pointer-events-none" />

                {/* Left Card: My Profile */}
                <div className="lg:col-span-8 bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/20 shadow-xl flex flex-col md:flex-row gap-6 items-center relative z-10">
                  
                  {/* Portrait Avatar block */}
                  <div className="w-36 h-48 sm:w-40 sm:h-52 bg-slate-100 rounded-3xl overflow-hidden border border-slate-200/80 shadow-md shrink-0 flex items-center justify-center">
                    <img
                      src={avatarPortrait}
                      alt="Avatar showcase portrait"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Profile info fields */}
                  <div className="flex-grow space-y-4 w-full">
                    
                    {/* Header Label block */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 border-b border-slate-100 pb-3">
                      <span className="text-base sm:text-lg font-extrabold text-slate-800">My Profile:</span>
                      <div className="sm:pl-4 text-left">
                        <span className="block text-sm font-extrabold text-slate-800">{profileName}</span>
                        <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">{profileRole}</span>
                      </div>
                    </div>

                    {/* Phone field */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                      <label className="text-xs sm:text-sm font-extrabold text-slate-600 sm:w-20 shrink-0 text-left">Phone:</label>
                      <input
                        type="text"
                        value={profilePhone}
                        onChange={(e) => setProfilePhone(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-800 font-bold focus:outline-none focus:border-cyberPurple"
                      />
                    </div>

                    {/* Email field */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                      <label className="text-xs sm:text-sm font-extrabold text-slate-600 sm:w-20 shrink-0 text-left">Email:</label>
                      <input
                        type="text"
                        value={profileEmail}
                        onChange={(e) => setProfileEmail(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-800 font-bold focus:outline-none focus:border-cyberPurple"
                      />
                    </div>

                    {/* Centered Pink Gradient Save Button */}
                    <div className="pt-2 flex justify-center">
                      <button
                        type="button"
                        onClick={handleSaveSettingsInfo}
                        className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-extrabold text-xs uppercase tracking-widest px-8 py-3.5 rounded-2xl cursor-pointer shadow-md transition-all active:scale-[0.98]"
                      >
                        Save
                      </button>
                    </div>

                  </div>

                </div>

                {/* Right Card: My Account */}
                <div className="lg:col-span-4 bg-white/95 backdrop-blur-md rounded-3xl p-6 border border-white/20 shadow-xl flex flex-col justify-between min-h-[220px] relative z-10 w-full text-left">
                  
                  {/* Card Title & Icon */}
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <span className="text-base font-extrabold text-slate-800">My Account</span>
                    <Settings className="w-5 h-5 text-slate-400" />
                  </div>

                  {/* Active email details & Logout */}
                  <div className="space-y-4 pt-3 flex-grow flex flex-col justify-between">
                    <div>
                      <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Active Account</span>
                      <span className="block text-xs font-extrabold text-slate-700">{profileEmail}</span>
                    </div>

                    {/* Pink Gradient Log Out Button */}
                    <div className="flex justify-end pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          localStorage.removeItem('adminToken');
                          setIsAuthenticated(false);
                          setEmail('');
                          setPassword('');
                        }}
                        className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-extrabold text-xs uppercase tracking-widest px-6 py-3 rounded-2xl cursor-pointer shadow-md transition-all active:scale-[0.98]"
                      >
                        Log Out
                      </button>
                    </div>
                  </div>

                </div>

              </div>

            </div>
          )}

          {/* Contact Message Details Modal */}
          {showContactModal && selectedContact && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in text-left">
              <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6">
                <div className="flex items-center justify-between border-b border-slate-150 pb-4">
                  <h3 className="text-lg font-extrabold text-[#1B124B] flex items-center space-x-2">
                    <Mail className="w-5 h-5 text-cyberPurple" />
                    <span>Contact Inquiry Details</span>
                  </h3>
                  <button
                    onClick={() => {
                      setShowContactModal(false);
                      setSelectedContact(null);
                    }}
                    className="text-slate-400 hover:text-slate-600 font-bold text-sm bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-xl transition-all cursor-pointer"
                  >
                    ✕ Close
                  </button>
                </div>

                <div className="space-y-4 text-xs sm:text-sm font-sans">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <span className="text-slate-400 font-extrabold block">First Name</span>
                      <span className="text-slate-800 font-extrabold">{selectedContact.firstName}</span>
                    </div>
                    <div className="space-y-1">
                      <span className="text-slate-400 font-extrabold block">Email</span>
                      <span className="text-slate-800 font-extrabold underline">{selectedContact.email}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <span className="text-slate-400 font-extrabold block">Phone no</span>
                      <span className="text-slate-800 font-extrabold">{selectedContact.phoneNo}</span>
                    </div>
                    <div className="space-y-1">
                      <span className="text-slate-400 font-extrabold block">Project Type</span>
                      <span className="text-slate-800 font-extrabold">{selectedContact.project}</span>
                    </div>
                  </div>

                  <div className="space-y-1 pt-2 border-t border-slate-100">
                    <span className="text-slate-400 font-extrabold block">Message Content</span>
                    <p className="text-slate-800 font-bold bg-slate-50 border border-slate-150 p-4 rounded-xl leading-relaxed whitespace-pre-line">
                      {selectedContact.message || "No message content provided."}
                    </p>
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => {
                      setShowContactModal(false);
                      setSelectedContact(null);
                    }}
                    className="px-6 py-2.5 bg-cyberPurple hover:bg-purple-650 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl cursor-pointer transition-colors shadow-md"
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
          )}

        </main>

      </div>

    </div>
  );
}
