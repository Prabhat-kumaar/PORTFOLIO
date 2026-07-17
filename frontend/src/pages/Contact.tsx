import { useState } from 'react';
import { Phone, Mail, Square, Check, RefreshCw } from 'lucide-react';
import { FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import { API_URL } from '../config/api';

export default function Contact() {
  // Form state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  
  // Services checkboxes state
  const [services, setServices] = useState<Record<string, boolean>>({
    webDev: false,
    webMigration: false,
    appDev: false,
    ecommerce: false,
    designSystem: false,
    perfEval: false
  });

  // Budget radio state
  const [budget, setBudget] = useState('');
  const [description, setDescription] = useState('');

  // Form submission feedback
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleCheckboxChange = (key: string) => {
    setServices(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          message: description || 'No message content provided.'
        })
      });

      const data = await response.json();

      if (response.ok) {
        setIsSubmitted(true);
        // Reset form fields
        setFirstName('');
        setLastName('');
        setEmail('');
        setCompany('');
        setPhone('');
        setCountry('');
        setServices({
          webDev: false,
          webMigration: false,
          appDev: false,
          ecommerce: false,
          designSystem: false,
          perfEval: false
        });
        setBudget('');
        setDescription('');
      } else {
        setSubmitError(data.error || 'Failed to submit form. Please verify your inputs.');
      }
    } catch (err) {
      setSubmitError('Failed to connect to the server. Please check your internet connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="radial-spotlight bg-grid-mesh min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start text-left max-w-6xl mx-auto" style={{ perspective: '1200px' }}>
          
          {/* Left Column: Contact details */}
          <div className="lg:col-span-5 space-y-8 relative z-10 scroll-reveal">
            
            <div className="space-y-4">
              <span className="text-sm font-bold text-slate-500 uppercase tracking-widest block">
                Get in touch
              </span>
              <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-white leading-tight">
                Let's talk about your <span className="bg-gradient-to-r from-cyberPurple via-purple-400 to-indigo-400 bg-clip-text text-transparent">project</span>
              </h1>
            </div>

            {/* Bullets lists */}
            <ul className="space-y-4 text-xs sm:text-sm text-slate-400 leading-relaxed font-sans max-w-md">
              <li className="flex items-start">
                <Square className="w-2.5 h-2.5 text-cyberPurple mt-1.5 mr-3 flex-shrink-0 fill-cyberPurple/25" />
                <span>Thinking about a new project, a problem to solve, or just want to connect? Let's do it!</span>
              </li>
              <li className="flex items-start">
                <Square className="w-2.5 h-2.5 text-cyberPurple mt-1.5 mr-3 flex-shrink-0 fill-cyberPurple/25" />
                <span>Use the form on this page or get in touch by other means.</span>
              </li>
              <li className="flex items-start">
                <Square className="w-2.5 h-2.5 text-cyberPurple mt-1.5 mr-3 flex-shrink-0 fill-cyberPurple/25" />
                <span>We love questions and feedback - and we're always happy to help! Here are some ways to contact us.</span>
              </li>
            </ul>

            {/* Contacts list */}
            <div className="space-y-6 pt-6">
              
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-cyberPurple/15 flex items-center justify-center text-cyberPurple">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Phone</p>
                  <a href="tel:+919508143247" className="text-sm sm:text-base font-bold text-white hover:text-cyberPurple transition-colors border-b border-cyberPurple/30 pb-0.5">
                    +91-9508143247
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-cyberPurple/15 flex items-center justify-center text-cyberPurple">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Email</p>
                  <a href="mailto:prabhatyadav.dbg@gmail.com" className="text-sm sm:text-base font-bold text-white hover:text-cyberPurple transition-colors border-b border-cyberPurple/30 pb-0.5">
                    prabhatyadav.dbg@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-[#1A124B]/30 flex items-center justify-center text-cyberPurple">
                  <FaLinkedinIn className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Linkedin</p>
                  <a href="https://www.linkedin.com/in/prabhat-kumar-682203210/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BGLPsqr%2BKSHuH8dKKxRthyg%3D%3D" target="_blank" rel="noreferrer" className="text-sm sm:text-base font-bold text-white hover:text-cyberPurple transition-colors border-b border-cyberPurple/30 pb-0.5">
                    prabhat
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-cyberPurple/15 flex items-center justify-center text-cyberPurple">
                  <FaTwitter className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Twitter</p>
                  <a href="https://x.com/Prabhat1117768" target="_blank" rel="noreferrer" className="text-sm sm:text-base font-bold text-white hover:text-cyberPurple transition-colors border-b border-cyberPurple/30 pb-0.5">
                    @Prabhat1117768
                  </a>
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: High Fidelity Form */}
          <div className="lg:col-span-7 relative z-10 w-full project-card-reveal" style={{ transitionDelay: '150ms' }}>
            
            {/* Feedback notification toast */}
            {isSubmitted && (
              <div className="mb-6 bg-green-500/10 border border-green-500/30 p-5 rounded-2xl flex items-center space-x-3 text-green-400 text-xs sm:text-sm font-sans animate-fade-in">
                <div className="w-8 h-8 rounded-full bg-green-500/15 flex items-center justify-center flex-shrink-0 text-green-400">
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-white mb-0.5">Thank you!</p>
                  <p>Your message has been sent successfully. We will get back to you shortly.</p>
                </div>
              </div>
            )}

            {submitError && (
              <div className="mb-6 bg-red-500/10 border border-red-500/30 p-5 rounded-2xl flex items-center space-x-3 text-red-400 text-xs sm:text-sm font-sans animate-fade-in">
                <div className="w-8 h-8 rounded-full bg-red-500/15 flex items-center justify-center flex-shrink-0 text-red-400">
                  <span className="font-bold font-sans">!</span>
                </div>
                <div>
                  <p className="font-bold text-white mb-0.5">Submission Error</p>
                  <p>{submitError}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="border border-slate-900/60 rounded-3xl p-6 sm:p-8 bg-[#120F1F]/40 shadow-2xl space-y-8 font-sans">
              
              {/* Section 1: Contact info */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-355 tracking-wider">
                  Your Contact information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <input
                    type="text"
                    required
                    placeholder="First name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full bg-[#120F1F] border border-slate-900 rounded-xl px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-cyberPurple transition-colors placeholder:text-slate-550"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full bg-[#120F1F] border border-slate-900 rounded-xl px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-cyberPurple transition-colors placeholder:text-slate-550"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#120F1F] border border-slate-900 rounded-xl px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-cyberPurple transition-colors placeholder:text-slate-550"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <input
                    type="text"
                    placeholder="Company name"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full bg-[#120F1F] border border-slate-900 rounded-xl px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-cyberPurple transition-colors placeholder:text-slate-550"
                  />
                  <input
                    type="tel"
                    placeholder="Phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#120F1F] border border-slate-900 rounded-xl px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-cyberPurple transition-colors placeholder:text-slate-550"
                  />
                  <select
                    required
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full bg-[#120F1F] border border-slate-900 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-400 focus:outline-none focus:border-cyberPurple transition-colors"
                  >
                    <option value="" disabled>Select Country</option>
                    <option value="IN">India</option>
                    <option value="US">United States</option>
                    <option value="UK">United Kingdom</option>
                    <option value="DE">Germany</option>
                    <option value="CA">Canada</option>
                    <option value="AU">Australia</option>
                  </select>
                </div>
              </div>

              {/* Section 2: Services list checkboxes */}
              <div className="space-y-4 border-t border-slate-900/60 pt-6">
                <h3 className="text-sm font-bold text-slate-355 tracking-wider">
                  What services do you need for your project?
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm text-slate-400">
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3 cursor-pointer group hover:text-white transition-colors">
                      <input
                        type="checkbox"
                        checked={services.webDev}
                        onChange={() => handleCheckboxChange('webDev')}
                        className="rounded border-slate-900 bg-[#120F1F] text-cyberPurple focus:ring-cyberPurple w-4 h-4 cursor-pointer"
                      />
                      <span>Website Development</span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer group hover:text-white transition-colors">
                      <input
                        type="checkbox"
                        checked={services.webMigration}
                        onChange={() => handleCheckboxChange('webMigration')}
                        className="rounded border-slate-900 bg-[#120F1F] text-cyberPurple focus:ring-cyberPurple w-4 h-4 cursor-pointer"
                      />
                      <span>Website Migration</span>
                    </label>
                  </div>

                  <div className="space-y-3">
                    <label className="flex items-center space-x-3 cursor-pointer group hover:text-white transition-colors">
                      <input
                        type="checkbox"
                        checked={services.appDev}
                        onChange={() => handleCheckboxChange('appDev')}
                        className="rounded border-slate-900 bg-[#120F1F] text-cyberPurple focus:ring-cyberPurple w-4 h-4 cursor-pointer"
                      />
                      <span>App Development</span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer group hover:text-white transition-colors">
                      <input
                        type="checkbox"
                        checked={services.ecommerce}
                        onChange={() => handleCheckboxChange('ecommerce')}
                        className="rounded border-slate-900 bg-[#120F1F] text-cyberPurple focus:ring-cyberPurple w-4 h-4 cursor-pointer"
                      />
                      <span>E-commerce Site</span>
                    </label>
                  </div>

                  <div className="space-y-3">
                    <label className="flex items-center space-x-3 cursor-pointer group hover:text-white transition-colors">
                      <input
                        type="checkbox"
                        checked={services.designSystem}
                        onChange={() => handleCheckboxChange('designSystem')}
                        className="rounded border-slate-900 bg-[#120F1F] text-cyberPurple focus:ring-cyberPurple w-4 h-4 cursor-pointer"
                      />
                      <span>Design System</span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer group hover:text-white transition-colors">
                      <input
                        type="checkbox"
                        checked={services.perfEval}
                        onChange={() => handleCheckboxChange('perfEval')}
                        className="rounded border-slate-900 bg-[#120F1F] text-cyberPurple focus:ring-cyberPurple w-4 h-4 cursor-pointer"
                      />
                      <span>Performance Evaluation</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Section 3: Budget tier radiogroup */}
              <div className="space-y-4 border-t border-slate-900/60 pt-6">
                <h3 className="text-sm font-bold text-slate-355 tracking-wider">
                  How much is the anticipated budget for your next project?
                </h3>
                <div className="flex flex-wrap gap-4 sm:gap-6 text-xs sm:text-sm text-slate-400">
                  <label className="flex items-center space-x-3 cursor-pointer group hover:text-white transition-colors">
                    <input
                      type="radio"
                      name="budget"
                      checked={budget === 'less400'}
                      onChange={() => setBudget('less400')}
                      className="border-slate-900 bg-[#120F1F] text-cyberPurple focus:ring-cyberPurple w-4 h-4 cursor-pointer"
                    />
                    <span>Less than ₹1400</span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer group hover:text-white transition-colors">
                    <input
                      type="radio"
                      name="budget"
                      checked={budget === '400-800'}
                      onChange={() => setBudget('400-800')}
                      className="border-slate-900 bg-[#120F1F] text-cyberPurple focus:ring-cyberPurple w-4 h-4 cursor-pointer"
                    />
                    <span>₹1400 - ₹1800</span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer group hover:text-white transition-colors">
                    <input
                      type="radio"
                      name="budget"
                      checked={budget === '800-1000'}
                      onChange={() => setBudget('800-1000')}
                      className="border-slate-900 bg-[#120F1F] text-cyberPurple focus:ring-cyberPurple w-4 h-4 cursor-pointer"
                    />
                    <span>₹1800 - ₹2000</span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer group hover:text-white transition-colors">
                    <input
                      type="radio"
                      name="budget"
                      checked={budget === 'more1000'}
                      onChange={() => setBudget('more1000')}
                      className="border-slate-900 bg-[#120F1F] text-cyberPurple focus:ring-cyberPurple w-4 h-4 cursor-pointer"
                    />
                    <span>More than ₹2000</span>
                  </label>
                </div>
              </div>

              {/* Section 4: Project desc textarea */}
              <div className="space-y-4 border-t border-slate-900/60 pt-6">
                <h3 className="text-sm font-bold text-slate-355 tracking-wider">
                  Tell me about your project
                </h3>
                <textarea
                  rows={4}
                  required
                  placeholder="Project description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-[#120F1F] border border-slate-900 rounded-xl px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-cyberPurple transition-colors placeholder:text-slate-550 resize-none font-mono"
                />
              </div>

              {/* Submit button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3.5 bg-gradient-to-r from-cyberPurple to-indigo-650 hover:opacity-90 disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-purple-950/20 cursor-pointer flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <span>Submit</span>
                  )}
                </button>
              </div>

            </form>
          </div>

        </div>

      </div>
    </div>
  );
}
