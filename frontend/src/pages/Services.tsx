import { NavLink } from 'react-router-dom';
import { Monitor, Smartphone, Search, Camera, Layers, ShoppingBag, Check, X } from 'lucide-react';

interface ServiceDetail {
  num: string;
  title: string;
  icon: React.ReactNode;
  bullets: string[];
  desc: string;
  glow?: boolean;
}

interface PricingTier {
  title: string;
  sub: string;
  price: string;
  btnText: string;
  featuresHeader: string;
  features: { name: string; included: boolean }[];
  popular?: boolean;
}

export default function Services() {
  const servicesList: ServiceDetail[] = [
    {
      num: '01',
      title: 'Web Development',
      icon: <Monitor className="w-10 h-10 text-cyan-400" />,
      bullets: [
        'Performance & Load Time',
        'Reusable Components',
        'Responsiveness',
        'Quality assurance and testing.',
        'Ongoing maintenance, updates, and bug fixes.'
      ],
      desc: 'I am very good in web development offering services, I offer reliable web development services to generate the most remarkable results which your business need.'
    },
    {
      num: '02',
      title: 'Mobile Development',
      icon: <Smartphone className="w-10 h-10 text-[#A4C639]" />,
      bullets: [
        'Prototyping and Wireframing',
        'UI/UX Design',
        'Coding and Programming',
        'Quality Assurance (QA) Testing',
        'App Deployment'
      ],
      desc: 'Experienced mobile developer offering innovative solutions. Proficient in creating high-performance, user-centric mobile apps. Expertise in iOS, Android, and cross-platform development.'
    },
    {
      num: '03',
      title: 'Digital Marketing (SEO)',
      icon: <Search className="w-10 h-10 text-sky-400" />,
      bullets: [
        'Marketing Strategy',
        'Research On Customer',
        'Monetize Products'
      ],
      desc: 'My digital marketing services will take your business to the next level, we offer remarkable digital marketing strategies that drives traffic to your website, your business, and improves your brand awareness to potential customers.'
    },
    {
      num: '04',
      title: 'Content Creator',
      icon: <Camera className="w-10 h-10 text-yellow-450" />,
      bullets: [
        'Crispy Digital Editing',
        'Marketing and Promotion on Social Platforms',
        'Client communication skill'
      ],
      desc: 'Passionate photographer and videographer capturing moments with creativity. Transforming visions into visual stories. Expert in visual storytelling, skilled in both photography and videography to deliver captivating content.'
    },
    {
      num: '05',
      title: 'UI/UX Product Design',
      icon: <Layers className="w-10 h-10 text-indigo-400" />,
      bullets: [
        'Reusable Components',
        'Responsiveness',
        'Quality assurance and testing.',
        'UI/UX Design'
      ],
      desc: 'I am very good in web development offering services, I offer reliable web development services to generate the most remarkable results which your business need.'
    },
    {
      num: '06',
      title: 'E-commerce Business Solutions',
      icon: <ShoppingBag className="w-10 h-10 text-[#50B83C]" />,
      bullets: [
        'Ecommerce store',
        'Online Purchase',
        'Quality assurance and testing.',
        'Marketing and Promotion on Social Platforms'
      ],
      desc: 'My digital marketing services will take your business to the next level, we offer remarkable digital marketing strategies that drives traffic to your website, your business, and improves your brand awareness to potential customers.',
      glow: true
    }
  ];

  const pricingTiers: PricingTier[] = [
    {
      title: 'Life Plan',
      sub: 'Perfect Choice for Individual',
      price: '₹1029.00',
      btnText: 'Get Start Now',
      featuresHeader: 'Lite includes:',
      features: [
        { name: 'Powerful admin panel', included: true },
        { name: '1 Native android app', included: true },
        { name: 'Multi-language support', included: false },
        { name: 'Multi-language support', included: false }
      ]
    },
    {
      title: 'Premium Plan',
      sub: 'Perfect Choice for Individual',
      price: '₹1039.00',
      btnText: 'Get Start Now',
      featuresHeader: 'Everything in lite, plus:',
      features: [
        { name: 'Powerful admin panel', included: true },
        { name: '1 Native android app', included: true },
        { name: 'Multi-language support', included: false },
        { name: 'Multi-language support', included: false }
      ],
      popular: true
    },
    {
      title: 'Pro Plan',
      sub: 'Perfect Choice for Individual',
      price: '₹1049.00',
      btnText: 'Get Start Now',
      featuresHeader: 'Everything in pro, plus:',
      features: [
        { name: 'Powerful admin panel', included: true },
        { name: '1 Native android app', included: true },
        { name: 'Multi-language support', included: true },
        { name: 'Multi-language support', included: true }
      ]
    }
  ];

  return (
    <div className="radial-spotlight bg-grid-mesh min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title area & Breadcrumbs */}
        <div className="text-center mb-16 space-y-3 scroll-reveal">
          <h1 className="text-4xl sm:text-5xl font-display font-extrabold text-white">
            <span className="bg-gradient-to-r from-cyberPurple to-purple-400 bg-clip-text text-transparent">My Quality</span> Services
          </h1>
          <div className="flex justify-center items-center space-x-2 text-xs sm:text-sm text-slate-400 font-medium">
            <NavLink to="/" className="hover:text-cyberPurple transition-colors">Home</NavLink>
            <span>&gt;</span>
            <span className="text-white font-semibold">Services</span>
          </div>
        </div>

        {/* Services Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-32" style={{ perspective: '1200px' }}>
          {servicesList.map((service, index) => (
            <div
              key={index}
              className={`bg-[#120F1F]/60 rounded-3xl p-8 relative overflow-hidden flex flex-col justify-between transition-all duration-300 group project-card-reveal ${
                service.glow
                  ? 'border border-cyberPurple shadow-[0_0_20px_rgba(168,85,247,0.15)]'
                  : 'border border-slate-900/80 hover:border-cyberPurple/25 hover:shadow-2xl hover:shadow-purple-950/5'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              
              {/* Faint Background Number Tag */}
              <div className="absolute right-6 top-1/2 -translate-y-1/2 text-7xl font-display font-black text-slate-900/35 pointer-events-none select-none z-0">
                {service.num}
              </div>

              {/* Card Contents */}
              <div className="relative z-10 space-y-6">
                
                {/* Gradient banner */}
                <div className="bg-gradient-to-r from-cyberPurple to-indigo-650 text-white font-display font-bold py-2.5 px-6 rounded-2xl text-center text-sm tracking-wide">
                  {service.title}
                </div>

                {/* Brand icon */}
                <div className="w-16 h-16 rounded-2xl bg-slate-950/80 border border-slate-900 flex items-center justify-center shadow-lg">
                  {service.icon}
                </div>

                {/* Bullet points */}
                <ul className="space-y-2.5">
                  {service.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start text-xs sm:text-sm text-slate-300 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyberPurple mt-1.5 mr-2.5 flex-shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Description paragraph */}
                <p className="text-xs text-slate-400 leading-relaxed pt-2">
                  {service.desc}
                </p>

              </div>

            </div>
          ))}
        </div>

        {/* Pricing Plan Section */}
        <div className="border-t border-slate-900/60 pt-28">
          
          {/* Section Header */}
          <div className="text-center mb-20 space-y-3 scroll-reveal">
            <div className="flex justify-center items-center space-x-1.5 text-xs font-bold text-cyberPurple uppercase tracking-widest">
              <span className="text-cyberPurple/80 font-mono">&gt;&gt;&gt;</span>
              <span>Pricing Plan</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white">
              <span className="bg-gradient-to-r from-cyberPurple to-purple-400 bg-clip-text text-transparent">Pricing</span> My Work
            </h2>
          </div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto items-stretch" style={{ perspective: '1200px' }}>
            {pricingTiers.map((tier, idx) => (
              <div
                key={idx}
                className={`bg-[#121630]/65 rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 group border project-card-reveal ${
                  tier.popular
                    ? 'border-cyberPurple/60 shadow-[0_0_25px_rgba(168,85,247,0.15)] md:scale-103 relative z-10'
                    : 'border-slate-900/80 hover:border-cyberPurple/25'
                }`}
                style={{ transitionDelay: `${idx * 150}ms` }}
              >
                <div className="space-y-6">
                  {/* Title & Sub */}
                  <div>
                    <h3 className="text-xl font-display font-bold text-white mb-1.5">{tier.title}</h3>
                    <p className="text-xs text-slate-450">{tier.sub}</p>
                  </div>

                  {/* Pricing Tag */}
                  <div className="flex items-baseline space-x-2">
                    <span className="text-4xl font-display font-extrabold text-white">{tier.price}</span>
                    <span className="text-xs text-cyberPurple font-semibold">Monthly</span>
                  </div>

                  {/* Button */}
                  {tier.popular ? (
                    <button className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-cyberPurple to-indigo-650 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-purple-900/30 hover:opacity-90">
                      {tier.btnText}
                    </button>
                  ) : (
                    <button className="w-full py-3.5 rounded-2xl bg-[#0B0C18] border border-slate-850 text-slate-300 text-xs font-bold uppercase tracking-wider transition-all hover:bg-slate-950 hover:text-white">
                      {tier.btnText}
                    </button>
                  )}

                  {/* Features Header */}
                  <div className="border-t border-slate-900/60 pt-6">
                    <span className="text-xs text-slate-300 font-semibold uppercase tracking-wider block mb-4">
                      {tier.featuresHeader}
                    </span>
                    
                    <ul className="space-y-3.5">
                      {tier.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-center space-x-3 text-xs sm:text-sm text-slate-355">
                          {feature.included ? (
                            <Check className="w-4 h-4 text-white flex-shrink-0" />
                          ) : (
                            <X className="w-4 h-4 text-slate-600 flex-shrink-0" />
                          )}
                          <span>{feature.name}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
}
