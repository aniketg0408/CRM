import React, { useState, useEffect, useRef } from 'react';
import { Phone, Check, X, Mail, MapPin, Linkedin, Twitter, Github, ArrowRight, TrendingUp, Users, Award, Clock, ChevronDown } from 'lucide-react';

// Animated counter hook
function useCounter(end: number, duration: number = 2000, startOnView: boolean = true) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!startOnView) { setStarted(true); return; }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setStarted(true); observer.disconnect(); }
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [startOnView]);

  useEffect(() => {
    if (!started) return;
    let startTime: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, end, duration]);

  return { count, ref };
}

export default function App() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('monthly');
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [activeFaqCategory, setActiveFaqCategory] = useState(0);
  const [legalModal, setLegalModal] = useState<string | null>(null);

  const counter1 = useCounter(500);
  const counter2 = useCounter(10000);
  const counter3 = useCounter(98);

  const integrations = [
    { name: 'Slack', icon: '💬', color: '#4A154B' },
    { name: 'Gmail', icon: '📧', color: '#EA4335' },
    { name: 'Zoom', icon: '📹', color: '#2D8CFF' },
    { name: 'Zapier', icon: '⚡', color: '#FF4A00' },
    { name: 'HubSpot', icon: '🔶', color: '#FF7A59' },
    { name: 'Stripe', icon: '💳', color: '#635BFF' },
    { name: 'Notion', icon: '📝', color: '#000000' },
    { name: 'WhatsApp', icon: '📱', color: '#25D366' },
    { name: 'Bitrix24', icon: '🟦', color: '#2FC6F6' },
  ];

  const faqCategories = [
    {
      label: 'Technical',
      icon: '⚙️',
      items: [
        { q: 'What are the system requirements for CRM?', a: 'CRM is fully cloud-based — all you need is a modern browser (Chrome, Firefox, Edge, or Safari). No installation required. Works on desktop, tablet, and mobile.' },
        { q: 'How does the pipeline update work?', a: 'Your pipeline updates in real-time. When a rep moves a deal or updates a lead status, changes are reflected instantly across all team members\' views — no refresh needed.' },
        { q: 'Is candidate and lead data encrypted and securely stored?', a: 'Absolutely. We use AES-256 encryption at rest and TLS 1.3 in transit. All data is hosted on ISO 27001 certified infrastructure with regular third-party security audits.' },
        { q: 'Where is the platform hosted?', a: 'CRM is hosted on AWS infrastructure with data centers in India and Singapore, ensuring low latency for South Asian teams and compliance with local data residency requirements.' },
      ]
    },
    {
      label: 'General',
      icon: '💡',
      items: [
        { q: 'How does the free trial work?', a: 'Start with a 14-day free trial — no credit card required. You get full access to Pro features and can invite up to 5 team members to explore the platform with you.' },
        { q: 'What does "multi-tenant" mean for my business?', a: 'Each company on CRM gets its own isolated workspace — separate data, separate users, and separate settings. Perfect for agencies managing multiple client accounts.' },
        { q: 'Can I migrate data from my existing CRM?', a: 'Yes! We support CSV imports for leads, contacts, and deals. Our onboarding team will assist with migration within 24 hours at no extra cost.' },
        { q: 'Do you offer onboarding support?', a: 'Every paid plan comes with a dedicated onboarding call. Enterprise plans include a dedicated customer success manager available Monday–Friday.' },
      ]
    },
    {
      label: 'Billing & Pricing',
      icon: '💳',
      items: [
        { q: 'Can I cancel anytime?', a: 'Yes, cancel anytime with no penalties or lock-in. Your data remains accessible for 30 days after cancellation for easy export.' },
        { q: 'Do you offer annual discounts?', a: 'Yes! Switching to annual billing saves you up to 20% compared to monthly. The discount is applied automatically when you select the annual option at checkout.' },
        { q: 'What payment methods do you accept?', a: 'We accept all major credit/debit cards, UPI, net banking, and bank transfers for enterprise clients. All transactions are secured via Razorpay.' },
      ]
    },
    {
      label: 'Features & Data',
      icon: '📊',
      items: [
        { q: 'Can I customise the sales pipeline stages?', a: 'Yes. You can create, rename, reorder, and delete pipeline stages to match your exact sales process. Changes apply instantly across your team.' },
        { q: 'Does CRM integrate with tools like Slack or Gmail?', a: 'Yes. CRM integrates with Slack, Gmail, Zoom, WhatsApp, Zapier, and more. You can set up integrations from the Connections page inside your workspace.' },
        { q: 'How many leads and deals can I store?', a: 'Starter plan supports up to 1,000 leads. Pro is unlimited. All plans include unlimited deals, contacts, and activity logs.' },
      ]
    },
  ];

  const dashboardTabs = [
    { label: 'Pipeline View', icon: '🔄' },
    { label: 'Lead Analytics', icon: '📊' },
    { label: 'Team Activity', icon: '👥' }
  ];

  const [activeNav, setActiveNav] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const sections = ['home', 'features', 'how-it-works', 'why-us', 'pricing', 'faq'];
    const handleScroll = () => {
      const scrollY = window.scrollY + 80;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollY) { setActiveNav(sections[i]); break; }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      const navHeight = 68; // only the sticky navbar height
      const top = el.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top: id === 'home' ? 0 : top, behavior: 'smooth' });
      setActiveNav(id);
    }
  };

  return (
    <div className="min-h-screen" style={{ fontFamily: 'Inter, sans-serif', backgroundColor: '#FFFFFF' }}>

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-white" style={{ borderBottom: '1px solid #E2E8F0', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>

        {/* Main bar */}
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6" style={{ height: '68px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'linear-gradient(135deg, #0B5ED7, #1E88E5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#FFF', fontWeight: 800, fontSize: '16px', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>C</span>
            </div>
            <span style={{ fontSize: '18px', fontWeight: 700, color: '#1A1A1A', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>CRM</span>
          </div>

          {/* Desktop nav links — hidden below lg */}
          <div className="hidden lg:flex" style={{ alignItems: 'center', gap: '2px' }}>
            {[
              { label: 'Home', href: '#home' },
              { label: 'Features', href: '#features' },
              { label: 'How it Works', href: '#how-it-works' },
              { label: 'Why Us', href: '#why-us' },
              { label: 'Pricing', href: '#pricing' },
              { label: 'FAQ', href: '#faq' },
            ].map((item) => {
              const id = item.href.replace('#', '');
              const isActive = activeNav === id;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={e => handleNavClick(e, item.href)}
                  style={{
                    color: isActive ? '#0B5ED7' : '#374151',
                    fontSize: '14px',
                    fontWeight: isActive ? 600 : 500,
                    whiteSpace: 'nowrap',
                    padding: '6px 12px',
                    borderRadius: '8px',
                    backgroundColor: isActive ? '#EBF3FF' : 'transparent',
                    transition: 'all 0.18s',
                    textDecoration: 'none',
                    display: 'inline-block',
                  }}
                  onMouseEnter={e => { if (!isActive) { e.currentTarget.style.backgroundColor = '#F1F5F9'; e.currentTarget.style.color = '#0B5ED7'; } }}
                  onMouseLeave={e => { if (!isActive) { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#374151'; } }}
                >{item.label}</a>
              );
            })}
          </div>

          {/* Right side actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>

            {/* Phone — desktop only */}
            <div className="hidden xl:flex" style={{ alignItems: 'center', gap: '8px', marginRight: '4px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#EBF3FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Phone size={13} style={{ color: '#0B5ED7' }} />
              </div>
              <div>
                <div style={{ color: '#1A1A1A', fontWeight: 600, fontSize: '12px', lineHeight: 1.2 }}>+91 9892440788</div>
                <div style={{ color: '#64748B', fontSize: '10px' }}>24/7 Support</div>
              </div>
            </div>

            {/* Sign In — hidden on mobile */}
            <button
              className="hidden md:block"
              style={{ padding: '7px 16px', borderRadius: '8px', border: '1.5px solid #0B5ED7', color: '#0B5ED7', fontWeight: 500, fontSize: '13px', backgroundColor: 'transparent', cursor: 'pointer', transition: 'background 0.18s', whiteSpace: 'nowrap' }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#EBF3FF'; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; }}
            >Sign In</button>

            {/* Get Started — hidden on mobile */}
            <button
              className="hidden md:block"
              style={{ padding: '7px 16px', borderRadius: '8px', background: 'linear-gradient(135deg, #0B5ED7, #1E88E5)', color: '#FFFFFF', fontWeight: 600, fontSize: '13px', border: 'none', cursor: 'pointer', boxShadow: '0 4px 14px rgba(11,94,215,0.3)', transition: 'all 0.18s', whiteSpace: 'nowrap' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(11,94,215,0.4)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 14px rgba(11,94,215,0.3)'; }}
            >Get Started Free</button>

            {/* Hamburger — visible below lg only */}
            <button
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(o => !o)}
              aria-label="Toggle menu"
              style={{
                width: '40px', height: '40px', borderRadius: '8px',
                border: '1.5px solid #E2E8F0',
                backgroundColor: mobileMenuOpen ? '#EBF3FF' : '#FFFFFF',
                cursor: 'pointer', transition: 'background 0.18s', flexShrink: 0,
                padding: 0,
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '5px', width: '100%', height: '100%' }}>
                <span style={{ display: 'block', width: '18px', height: '2px', backgroundColor: '#1A1A1A', borderRadius: '2px', transition: 'all 0.22s', transform: mobileMenuOpen ? 'rotate(45deg) translate(0px, 7px)' : 'none' }} />
                <span style={{ display: 'block', width: '18px', height: '2px', backgroundColor: '#1A1A1A', borderRadius: '2px', transition: 'all 0.22s', opacity: mobileMenuOpen ? 0 : 1 }} />
                <span style={{ display: 'block', width: '18px', height: '2px', backgroundColor: '#1A1A1A', borderRadius: '2px', transition: 'all 0.22s', transform: mobileMenuOpen ? 'rotate(-45deg) translate(0px, -7px)' : 'none' }} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile dropdown — slides open below main bar */}
        {mobileMenuOpen && (
          <div
            className="lg:hidden"
            style={{
              backgroundColor: '#FFFFFF',
              borderTop: '1px solid #E2E8F0',
              boxShadow: '0 12px 32px rgba(0,0,0,0.12)',
              position: 'absolute', left: 0, right: 0,
              zIndex: 100,
            }}
          >
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '12px 16px 16px' }}>

              {/* Nav links */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginBottom: '12px' }}>
                {[
                  { label: 'Home', href: '#home' },
                  { label: 'Features', href: '#features' },
                  { label: 'How it Works', href: '#how-it-works' },
                  { label: 'Why Us', href: '#why-us' },
                  { label: 'Pricing', href: '#pricing' },
                  { label: 'FAQ', href: '#faq' },
                ].map((item) => {
                  const id = item.href.replace('#', '');
                  const isActive = activeNav === id;
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={e => { handleNavClick(e, item.href); setMobileMenuOpen(false); }}
                      style={{
                        display: 'block',
                        color: isActive ? '#0B5ED7' : '#374151',
                        fontSize: '15px',
                        fontWeight: isActive ? 600 : 500,
                        padding: '11px 14px',
                        borderRadius: '8px',
                        backgroundColor: isActive ? '#EBF3FF' : 'transparent',
                        textDecoration: 'none',
                        transition: 'background 0.15s',
                      }}
                      onMouseEnter={e => { if (!isActive) e.currentTarget.style.backgroundColor = '#F8FAFC'; }}
                      onMouseLeave={e => { if (!isActive) e.currentTarget.style.backgroundColor = 'transparent'; }}
                    >{item.label}</a>
                  );
                })}
              </div>

              {/* Divider */}
              <div style={{ borderTop: '1px solid #E2E8F0', marginBottom: '12px' }} />

              {/* CTA buttons */}
              <div style={{ display: 'flex', gap: '10px' }}>
                <button style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1.5px solid #0B5ED7', color: '#0B5ED7', fontWeight: 500, fontSize: '14px', backgroundColor: 'transparent', cursor: 'pointer' }}>
                  Sign In
                </button>
                <button style={{ flex: 1, padding: '10px', borderRadius: '8px', background: 'linear-gradient(135deg, #0B5ED7, #1E88E5)', color: '#FFFFFF', fontWeight: 600, fontSize: '14px', border: 'none', cursor: 'pointer' }}>
                  Get Started Free
                </button>
              </div>

            </div>
          </div>
        )}
      </nav>

      {/* Page content wrapper — overflow-x hidden here keeps horizontal scroll contained without breaking sticky nav */}
      <div style={{ overflowX: 'hidden' }}>

      {/* ANNOUNCEMENT STRIP — below navbar */}
      <div style={{ backgroundColor: '#0F1F3D', padding: '9px 0' }}>
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 text-center">
          <p style={{ color: '#FFFFFF', fontSize: '12px', fontWeight: 500, letterSpacing: '0.01em', lineHeight: 1.5 }}>
            Empowering Businesses with Strength, Backed by Reliability, and Grounded in Stability.
          </p>
        </div>
      </div>

      {/* HERO */}
      <section id="home" className="bg-white relative overflow-hidden" style={{
        minHeight: 'calc(100vh - 68px - 38px)',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '40px',
        paddingBottom: '40px',
      }}>
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: 'radial-gradient(circle at 70% 50%, rgba(30,136,229,0.07) 0%, transparent 60%), radial-gradient(circle at 10% 80%, rgba(11,94,215,0.05) 0%, transparent 50%)'
        }}></div>

        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-[52%_48%] gap-8 lg:gap-10 items-center">
            <div>
              {/* Early access pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4" style={{ backgroundColor: '#EBF3FF', border: '1px solid #C7DFFE' }}>
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#10B981' }}></div>
                <span style={{ color: '#0B5ED7', fontSize: '11px', fontWeight: 600 }}>🚀 Early Access — Now Live · 500+ Companies Onboarded</span>
              </div>
              <h1 style={{ fontSize: 'clamp(28px, 5vw, 50px)', color: '#1A1A1A', fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 800, lineHeight: 1.12, marginBottom: '14px' }}>
                Manage Leads.<br />
                <span style={{ background: 'linear-gradient(135deg, #0B5ED7, #1E88E5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Close Deals.</span><br />
                Grow Faster.
              </h1>
              <p style={{ fontSize: '15px', color: '#64748B', lineHeight: 1.65, maxWidth: '420px', marginBottom: '24px' }}>
                A powerful yet simple CRM for sales teams — track every lead, deal, and follow-up without the complexity.
              </p>
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <button className="px-7 py-3 rounded-xl text-white flex items-center gap-2 transition-all"
                  style={{ background: 'linear-gradient(135deg, #0B5ED7, #1E88E5)', fontWeight: 700, fontSize: '15px', boxShadow: '0 6px 20px rgba(11,94,215,0.35)' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 28px rgba(11,94,215,0.45)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(11,94,215,0.35)'; }}
                >
                  Start Free Trial <ArrowRight size={16} />
                </button>
                <button className="px-6 py-3 rounded-xl flex items-center gap-2 transition-all"
                  style={{ border: '1.5px solid #0B5ED7', color: '#0B5ED7', fontWeight: 600, fontSize: '15px', backgroundColor: 'transparent' }}
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#EBF3FF'; }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; }}
                >
                  Book a Demo <ArrowRight size={15} />
                </button>
              </div>
              {/* Trust badges row */}
              <div className="flex flex-wrap items-center gap-4 mb-5">
                {[
                  { icon: '✅', text: 'No credit card required' },
                  { icon: '🔒', text: 'Enterprise-grade security' },
                  { icon: '⚡', text: '14-day free trial' },
                ].map((b, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <span style={{ fontSize: '13px' }}>{b.icon}</span>
                    <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 500 }}>{b.text}</span>
                  </div>
                ))}
              </div>

            </div>

            {/* ── ENHANCED Hero Dashboard Mockup ── */}
            <div className="relative mt-8 lg:mt-0" style={{ perspective: '1000px' }}>
              <div className="rounded-2xl overflow-hidden" style={{
                border: '1px solid #E2E8F0',
                boxShadow: '0 24px 64px rgba(11,94,215,0.16)',
                transform: 'rotateY(0deg) rotateX(0deg)',
                transition: 'transform 0.3s ease'
              }}
                onMouseEnter={e => { if (window.innerWidth >= 1024) (e.currentTarget as HTMLDivElement).style.transform = 'rotateY(0deg) rotateX(0deg)'; }}
                onMouseLeave={e => { if (window.innerWidth >= 1024) (e.currentTarget as HTMLDivElement).style.transform = 'rotateY(0deg) rotateX(0deg)'; }}
              >
                {/* Browser chrome */}
                <div className="h-9 px-4 flex items-center gap-2" style={{ backgroundColor: '#1E293B', borderBottom: '1px solid #334155' }}>
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#FF5F57' }}></div>
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#FEBC2E' }}></div>
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#28CA42' }}></div>
                  <div className="flex-1 mx-4 px-3 py-1 rounded-md text-center" style={{ backgroundColor: '#0F172A', fontSize: '10px', color: '#64748B' }}>app.CRM.io/dashboard</div>
                  <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: '#0B5ED7' }}>
                    <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                  </div>
                </div>

                <div style={{ backgroundColor: '#F8FAFC' }}>
                  {/* Top stats bar */}
                  <div className="grid grid-cols-4 gap-0" style={{ borderBottom: '1px solid #E2E8F0' }}>
                    {[
                      { label: 'Leads Today', value: '23', trend: '+12%', up: true },
                      { label: 'Open Deals', value: '12', trend: '+5%', up: true },
                      { label: 'Tasks Due', value: '8', trend: '-3', up: false },
                      { label: 'Closed Won', value: '5', trend: '+2', up: true }
                    ].map((card, i) => (
                      <div key={i} className="p-3" style={{ borderRight: i < 3 ? '1px solid #E2E8F0' : 'none', backgroundColor: '#FFFFFF' }}>
                        <div style={{ fontSize: '9px', color: '#94A3B8', marginBottom: '4px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{card.label}</div>
                        <div className="flex items-end justify-between">
                          <div style={{ fontSize: '20px', color: '#0B5ED7', fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 800 }}>{card.value}</div>
                          <div className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-full" style={{ backgroundColor: card.up ? '#DCFCE7' : '#FEF3C7', fontSize: '8px', color: card.up ? '#16A34A' : '#D97706', fontWeight: 700 }}>
                            {card.up ? '↑' : '↓'} {card.trend}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Mini bar chart */}
                  <div className="px-4 pt-3 pb-2" style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #E2E8F0' }}>
                    <div className="flex items-center justify-between mb-2">
                      <span style={{ fontSize: '10px', color: '#1A1A1A', fontWeight: 700 }}>Lead Pipeline — This Week</span>
                      <span style={{ fontSize: '9px', color: '#10B981', fontWeight: 600 }}>↑ 18% vs last week</span>
                    </div>
                    <div className="flex items-end gap-1.5" style={{ height: '44px' }}>
                      {[65, 40, 80, 55, 90, 70, 85].map((h, i) => (
                        <div key={i} className="flex-1 rounded-t-sm" style={{
                          height: `${h}%`,
                          background: i === 6 ? 'linear-gradient(180deg, #0B5ED7, #1E88E5)' : i === 4 ? 'linear-gradient(180deg, #1E88E5, #60A5FA)' : '#E2E8F0',
                          transition: 'all 0.2s'
                        }}></div>
                      ))}
                    </div>
                    <div className="flex gap-1.5 mt-1">
                      {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                        <div key={i} className="flex-1 text-center" style={{ fontSize: '8px', color: '#94A3B8' }}>{d}</div>
                      ))}
                    </div>
                  </div>

                  {/* Pipeline stage row */}
                  <div className="px-4 py-2.5" style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #E2E8F0' }}>
                    <div style={{ fontSize: '10px', color: '#64748B', fontWeight: 600, marginBottom: '6px' }}>Deal Stages</div>
                    <div className="flex gap-1.5">
                      {[
                        { stage: 'New', count: 8, color: '#0B5ED7', pct: 40 },
                        { stage: 'Qualified', count: 5, color: '#8B5CF6', pct: 25 },
                        { stage: 'Proposal', count: 4, color: '#F59E0B', pct: 20 },
                        { stage: 'Won', count: 3, color: '#10B981', pct: 15 },
                      ].map((s, i) => (
                        <div key={i} className="flex-1">
                          <div className="rounded-sm mb-1" style={{ height: '6px', backgroundColor: s.color, opacity: 0.2 + (i * 0.2) }}></div>
                          <div style={{ fontSize: '8px', color: '#64748B' }}>{s.stage}</div>
                          <div style={{ fontSize: '9px', color: s.color, fontWeight: 700 }}>{s.count}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recent leads */}
                  <div className="px-4 py-2.5" style={{ backgroundColor: '#FFFFFF' }}>
                    <div style={{ fontSize: '10px', color: '#1A1A1A', fontWeight: 700, marginBottom: '6px' }}>Recent Leads</div>
                    <div className="space-y-1.5">
                      {[
                        { name: 'John Smith', company: 'TechCo', status: 'New', color: '#0B5ED7', time: '2m ago' },
                        { name: 'Sarah Johnson', company: 'StartupHub', status: 'Contacted', color: '#F59E0B', time: '1h ago' },
                        { name: 'Mike Davis', company: 'CloudBase', status: 'Qualified', color: '#10B981', time: '3h ago' }
                      ].map((lead, i) => (
                        <div key={i} className="flex items-center justify-between px-2.5 py-1.5 rounded-lg" style={{ backgroundColor: '#F8FAFC', border: '1px solid #F1F5F9' }}>
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: lead.color, fontSize: '9px', fontWeight: 700 }}>{lead.name.charAt(0)}</div>
                            <div>
                              <div style={{ fontSize: '10px', color: '#1A1A1A', fontWeight: 600 }}>{lead.name}</div>
                              <div style={{ fontSize: '9px', color: '#94A3B8' }}>{lead.company} · {lead.time}</div>
                            </div>
                          </div>
                          <span className="px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: lead.color, fontSize: '8px', fontWeight: 700 }}>{lead.status}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating badges */}
              <div className="hidden sm:block absolute -bottom-3 -left-4 px-3 py-2 rounded-xl" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#10B981' }}></div>
                  <span style={{ fontSize: '11px', color: '#1A1A1A', fontWeight: 600 }}>3 deals closed today</span>
                </div>
              </div>
              <div className="hidden sm:block absolute -top-3 -right-3 px-3 py-2 rounded-xl" style={{ backgroundColor: '#0B5ED7', boxShadow: '0 8px 24px rgba(11,94,215,0.3)' }}>
                <div className="flex items-center gap-1.5">
                  <span style={{ fontSize: '12px' }}>📈</span>
                  <span style={{ fontSize: '11px', color: '#FFFFFF', fontWeight: 700 }}>+18% this week</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll-down indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1" style={{ opacity: 0.4, animation: 'bounce 2s infinite' }}>
          <span style={{ fontSize: '10px', color: '#64748B', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Scroll</span>
          <ChevronDown size={16} style={{ color: '#64748B' }} />
        </div>
      </section>



      {/* FEATURES SECTION */}
      <section id="features" style={{ background: 'linear-gradient(160deg, #EAF3FF 0%, #F0F8FF 50%, #E8F4FF 100%)', paddingTop: '60px', paddingBottom: '60px', position: 'relative', overflow: 'hidden' }}>
        {/* Subtle background blobs */}
        <div className="absolute pointer-events-none" style={{ width: '700px', height: '700px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(11,94,215,0.06) 0%, transparent 65%)', top: '-200px', right: '-200px' }}></div>
        <div className="absolute pointer-events-none" style={{ width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(30,136,229,0.05) 0%, transparent 65%)', bottom: '-150px', left: '-150px' }}></div>

        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 relative z-10">
          {/* Header */}
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-5" style={{ backgroundColor: 'rgba(11,94,215,0.08)', border: '1px solid rgba(11,94,215,0.18)' }}>
              <span style={{ fontSize: '13px' }}>✦</span>
              <span style={{ color: '#0B5ED7', fontWeight: 700, fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Features</span>
            </div>
            <h2 style={{ fontSize: 'clamp(32px, 4.5vw, 52px)', color: '#0F1F3D', fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 800, lineHeight: 1.1, marginBottom: '16px' }}>
              Everything You Need to<br />Sell Better
            </h2>
            <p style={{ fontSize: '17px', color: '#64748B', maxWidth: '560px', margin: '0 auto', lineHeight: 1.7 }}>
              Powerful modules designed to handle your complete sales lifecycle — from first lead to closed deal.
            </p>
          </div>

          {/* Feature cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-5">
            {[
              {
                svg: (<svg width="32" height="32" viewBox="0 0 32 32" fill="none"><rect x="3" y="3" width="11" height="11" rx="2.5" stroke="#0B5ED7" strokeWidth="2"/><rect x="18" y="3" width="11" height="11" rx="2.5" stroke="#0B5ED7" strokeWidth="2"/><rect x="3" y="18" width="11" height="11" rx="2.5" stroke="#0B5ED7" strokeWidth="2"/><rect x="18" y="18" width="11" height="11" rx="2.5" stroke="#1E88E5" strokeWidth="2" strokeDasharray="2 1.5"/></svg>),
                title: 'Smart Lead Management',
                description: 'Capture, assign, and track leads from any source. Auto status updates, bulk import, and role-based visibility keep your team aligned.',
                accent: '#0B5ED7',
                featured: true,
              },
              {
                svg: (<svg width="32" height="32" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="10" r="5" stroke="#0B8A6E" strokeWidth="2"/><circle cx="7" cy="24" r="4" stroke="#0B8A6E" strokeWidth="2"/><circle cx="25" cy="24" r="4" stroke="#0B8A6E" strokeWidth="2"/><path d="M11 14l-4 6M21 14l4 6M12 10h8" stroke="#0B8A6E" strokeWidth="1.5" strokeLinecap="round"/></svg>),
                title: 'Visual Deal Pipeline',
                description: 'Move deals through fully customisable stages. Real-time pipeline value, win rate, and velocity — your revenue in motion.',
                accent: '#0B8A6E',
                featured: false,
              },
              {
                svg: (<svg width="32" height="32" viewBox="0 0 32 32" fill="none"><rect x="6" y="4" width="20" height="24" rx="3" stroke="#7C3AED" strokeWidth="2"/><path d="M10 10h12M10 15h12M10 20h7" stroke="#7C3AED" strokeWidth="1.8" strokeLinecap="round"/></svg>),
                title: 'Task & Follow-up Engine',
                description: 'Create daily task lists linked to leads and deals. Reminders, priority flags, and overdue escalation — zero missed follow-ups.',
                accent: '#7C3AED',
                featured: false,
              },
              {
                svg: (<svg width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M16 4v6M16 22v6M4 16h6M22 16h6" stroke="#D97706" strokeWidth="2" strokeLinecap="round"/><circle cx="16" cy="16" r="6" stroke="#D97706" strokeWidth="2"/></svg>),
                title: 'Activity History',
                description: 'Every call, email, note, and status change logged automatically. Full timestamped timeline per lead — context before every conversation.',
                accent: '#D97706',
                featured: false,
              },
            ].map((feature, i) => (
              <div key={i} className="rounded-2xl p-6 cursor-pointer relative overflow-hidden group"
                style={{
                  backgroundColor: '#FFFFFF',
                  border: feature.featured ? `2px solid ${feature.accent}` : '1.5px solid #E2E8F0',
                  borderTop: `3px solid ${feature.accent}`,
                  boxShadow: feature.featured ? `0 8px 32px ${feature.accent}18` : '0 2px 12px rgba(0,0,0,0.04)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget;
                  el.style.transform = 'translateY(-6px)';
                  el.style.boxShadow = `0 20px 48px ${feature.accent}22`;
                  el.style.borderColor = feature.accent;
                  el.style.borderWidth = '2px';
                  const glow = el.querySelector('.card-glow') as HTMLElement;
                  if (glow) glow.style.opacity = '1';
                  const iconBox = el.querySelector('.icon-box') as HTMLElement;
                  if (iconBox) { iconBox.style.backgroundColor = feature.accent + '15'; iconBox.style.borderColor = feature.accent + '40'; }
                  const title = el.querySelector('.card-title') as HTMLElement;
                  if (title) title.style.color = feature.accent;
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget;
                  el.style.transform = 'translateY(0)';
                  el.style.boxShadow = feature.featured ? `0 8px 32px ${feature.accent}18` : '0 2px 12px rgba(0,0,0,0.04)';
                  el.style.borderColor = feature.featured ? feature.accent : '#E2E8F0';
                  el.style.borderWidth = feature.featured ? '2px' : '1.5px';
                  const glow = el.querySelector('.card-glow') as HTMLElement;
                  if (glow) glow.style.opacity = '0';
                  const iconBox = el.querySelector('.icon-box') as HTMLElement;
                  if (iconBox) { iconBox.style.backgroundColor = feature.accent + '10'; iconBox.style.borderColor = feature.accent + '20'; }
                  const title = el.querySelector('.card-title') as HTMLElement;
                  if (title) title.style.color = '#0F1F3D';
                }}
              >
                {/* Glow background on hover */}
                <div className="card-glow absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse at top left, ${feature.accent}0D 0%, transparent 65%)`, opacity: 0, transition: 'opacity 0.3s ease' }}></div>

                <div className="icon-box w-12 h-12 rounded-xl flex items-center justify-center mb-5 relative z-10"
                  style={{ backgroundColor: feature.accent + '10', border: `1px solid ${feature.accent}20`, transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }}>
                  {/* Swap SVG stroke on hover via filter */}
                  <div style={{ transition: 'filter 0.3s ease' }}>{feature.svg}</div>
                </div>

                <h3 className="card-title" style={{ fontSize: '16px', color: '#0F1F3D', fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, marginBottom: '10px', lineHeight: 1.3, transition: 'color 0.25s ease' }}>{feature.title}</h3>
                <p style={{ fontSize: '13.5px', color: '#64748B', lineHeight: 1.75 }}>{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Second row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                svg: (<svg width="32" height="32" viewBox="0 0 32 32" fill="none"><rect x="4" y="18" width="5" height="10" rx="1.5" fill="#0B5ED7" fillOpacity="0.15" stroke="#0B5ED7" strokeWidth="1.8"/><rect x="13" y="12" width="5" height="16" rx="1.5" fill="#0B5ED7" fillOpacity="0.25" stroke="#0B5ED7" strokeWidth="1.8"/><rect x="22" y="6" width="5" height="22" rx="1.5" fill="#0B5ED7" fillOpacity="0.4" stroke="#0B5ED7" strokeWidth="1.8"/></svg>),
                title: 'Dashboard & Reports',
                description: 'Real-time overview of leads, pipeline health, and rep performance. 12+ report types with one-click CSV export.',
                accent: '#0B5ED7',
              },
              {
                svg: (<svg width="32" height="32" viewBox="0 0 32 32" fill="none"><rect x="4" y="8" width="24" height="16" rx="3" stroke="#0B8A6E" strokeWidth="2"/><path d="M4 12h24" stroke="#0B8A6E" strokeWidth="1.5"/><circle cx="9" cy="20" r="2" fill="#0B8A6E" fillOpacity="0.3" stroke="#0B8A6E" strokeWidth="1.5"/><path d="M14 20h8" stroke="#0B8A6E" strokeWidth="1.5" strokeLinecap="round"/></svg>),
                title: 'Multi-Tenant Architecture',
                description: 'Each company gets its own fully isolated workspace — separate data, users, and pipelines. Perfect for agencies and enterprises.',
                accent: '#0B8A6E',
              },
              {
                svg: (<svg width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M16 4L6 9v8c0 5.5 4.3 10.7 10 12 5.7-1.3 10-6.5 10-12V9L16 4z" stroke="#7C3AED" strokeWidth="2" strokeLinejoin="round"/><path d="M11 16l3 3 7-7" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>),
                title: 'Role-Based Access',
                description: 'Admin sees everything. Sales reps see only their leads. Granular permissions that keep data secure and teams focused.',
                accent: '#7C3AED',
              },
              {
                svg: (<svg width="32" height="32" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="11" stroke="#D97706" strokeWidth="2"/><path d="M16 10v6l4 2" stroke="#D97706" strokeWidth="2" strokeLinecap="round"/></svg>),
                title: 'Real-Time Updates',
                description: 'Status changes, deal moves, and task completions reflect instantly for your whole team — no refresh, no lag, always in sync.',
                accent: '#D97706',
              },
            ].map((feature, i) => (
              <div key={i} className="rounded-2xl p-6 cursor-pointer relative overflow-hidden"
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1.5px solid #E2E8F0',
                  borderTop: `3px solid ${feature.accent}`,
                  boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget;
                  el.style.transform = 'translateY(-6px)';
                  el.style.boxShadow = `0 20px 48px ${feature.accent}22`;
                  el.style.borderColor = feature.accent;
                  el.style.borderWidth = '2px';
                  const glow = el.querySelector('.card-glow') as HTMLElement;
                  if (glow) glow.style.opacity = '1';
                  const iconBox = el.querySelector('.icon-box') as HTMLElement;
                  if (iconBox) { iconBox.style.backgroundColor = feature.accent + '15'; iconBox.style.borderColor = feature.accent + '40'; }
                  const title = el.querySelector('.card-title') as HTMLElement;
                  if (title) title.style.color = feature.accent;
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget;
                  el.style.transform = 'translateY(0)';
                  el.style.boxShadow = '0 2px 12px rgba(0,0,0,0.04)';
                  el.style.borderColor = '#E2E8F0';
                  el.style.borderWidth = '1.5px';
                  const glow = el.querySelector('.card-glow') as HTMLElement;
                  if (glow) glow.style.opacity = '0';
                  const iconBox = el.querySelector('.icon-box') as HTMLElement;
                  if (iconBox) { iconBox.style.backgroundColor = feature.accent + '10'; iconBox.style.borderColor = feature.accent + '20'; }
                  const title = el.querySelector('.card-title') as HTMLElement;
                  if (title) title.style.color = '#0F1F3D';
                }}
              >
                {/* Glow background on hover */}
                <div className="card-glow absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse at top left, ${feature.accent}0D 0%, transparent 65%)`, opacity: 0, transition: 'opacity 0.3s ease' }}></div>

                <div className="icon-box w-12 h-12 rounded-xl flex items-center justify-center mb-5 relative z-10"
                  style={{ backgroundColor: feature.accent + '10', border: `1px solid ${feature.accent}20`, transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }}>
                  {feature.svg}
                </div>

                <h3 className="card-title" style={{ fontSize: '16px', color: '#0F1F3D', fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, marginBottom: '10px', lineHeight: 1.3, transition: 'color 0.25s ease' }}>{feature.title}</h3>
                <p style={{ fontSize: '13.5px', color: '#64748B', lineHeight: 1.75 }}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

            {/* HOW IT WORKS */}
      <section id="how-it-works" style={{ background: 'linear-gradient(180deg, #F0F6FF 0%, #EEF2FF 100%)', paddingTop: '60px', paddingBottom: '60px', position: 'relative', overflow: 'hidden' }}>
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(11,94,215,0.06) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(30,136,229,0.05) 0%, transparent 50%)' }}></div>
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #0B5ED7 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>

        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4" style={{ backgroundColor: '#EBF3FF', border: '1px solid #C7DFFE' }}>
              <span style={{ fontSize: '14px' }}>🔄</span>
              <span style={{ color: '#0B5ED7', fontWeight: 600, fontSize: '12px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>WORKFLOW</span>
            </div>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', color: '#1A1A1A', fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 800, lineHeight: 1.15, marginBottom: '14px' }}>
              From lead to closed deal —<br />
              <span style={{ background: 'linear-gradient(135deg, #0B5ED7, #1E88E5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>in one seamless system</span>
            </h2>
            <p style={{ fontSize: '17px', color: '#64748B', maxWidth: '480px', margin: '0 auto', lineHeight: 1.65 }}>
              A simple 4-step process that turns your sales chaos into a predictable, repeatable machine.
            </p>
          </div>

          {/* Steps with connector line */}
          <div className="relative">
            {/* Horizontal connector */}
            <div className="hidden lg:block absolute" style={{ top: '52px', left: 'calc(12.5% + 28px)', right: 'calc(12.5% + 28px)', height: '2px', background: 'linear-gradient(90deg, #0B5ED7, #1E88E5, #10B981, #8B5CF6)', borderRadius: '2px', opacity: 0.3 }}></div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: '📥', step: 1, title: 'Lead Created', description: 'Sales rep adds or imports a lead with source, status, and full contact details — in under 30 seconds.', color: '#0B5ED7', bg: '#EBF3FF', tag: 'Day 1' },
                { icon: '📞', step: 2, title: 'Contacted & Tracked', description: 'Log every call, meeting, and note. Lead status updates automatically with a full timestamped history.', color: '#1E88E5', bg: '#DBEAFE', tag: 'Same Day' },
                { icon: '⭐', step: 3, title: 'Qualified & Converted', description: 'Convert hot leads into Contacts and Deals with one click — no re-entering data, ever.', color: '#10B981', bg: '#D1FAE5', tag: 'Within Week' },
                { icon: '🏆', step: 4, title: 'Deal Closed', description: 'Move the deal through custom pipeline stages and celebrate the win — or learn from the loss.', color: '#8B5CF6', bg: '#EDE9FE', tag: 'Result' },
              ].map((step, i) => (
                <div key={i} className="relative group">
                  <div className="rounded-2xl p-6 transition-all cursor-pointer h-full"
                    style={{ backgroundColor: '#FFFFFF', border: `1.5px solid ${step.color}20`, boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = `0 20px 48px ${step.color}22`; e.currentTarget.style.borderColor = step.color + '60'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.04)'; e.currentTarget.style.borderColor = step.color + '20'; }}
                  >
                    {/* Step number circle */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black text-lg relative z-10"
                        style={{ background: `linear-gradient(135deg, ${step.color}, ${step.color}CC)`, fontFamily: 'Plus Jakarta Sans, sans-serif', boxShadow: `0 6px 16px ${step.color}40` }}>
                        {step.step}
                      </div>
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: step.bg, color: step.color }}>{step.tag}</span>
                    </div>

                    {/* Icon */}
                    <div className="text-4xl mb-4" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}>{step.icon}</div>

                    <h3 style={{ fontSize: '17px', color: '#1A1A1A', fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, marginBottom: '10px' }}>{step.title}</h3>
                    <p style={{ fontSize: '13px', color: '#64748B', lineHeight: 1.7 }}>{step.description}</p>

                    {/* Bottom accent bar */}
                    <div className="mt-5 h-1 rounded-full" style={{ background: `linear-gradient(90deg, ${step.color}, ${step.color}40)`, width: '40px', transition: 'width 0.3s' }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* LEAD LIFECYCLE SECTION */}
      <section className="bg-white" style={{ paddingTop: '60px', paddingBottom: '60px' }}>
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          {/* Section header */}
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4" style={{ backgroundColor: '#FFF7ED', border: '1px solid #FED7AA' }}>
              <span style={{ fontSize: '14px' }}>🎯</span>
              <span style={{ color: '#EA580C', fontWeight: 600, fontSize: '12px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>LEAD MANAGEMENT</span>
            </div>
            <h2 style={{ fontSize: 'clamp(26px, 3.5vw, 38px)', color: '#1A1A1A', fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 800, lineHeight: 1.2, marginBottom: '12px' }}>
              Every lead tracked.<br />
              <span style={{ background: 'linear-gradient(135deg, #0B5ED7, #1E88E5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Every follow-up done.</span>
            </h2>
            <p style={{ fontSize: '16px', color: '#64748B', maxWidth: '460px', margin: '0 auto', lineHeight: 1.65 }}>
              From first contact to closed deal — CRM keeps every conversation, task, and status update in one place.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* Left: Enhanced Lead Card */}
            <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid #E2E8F0', boxShadow: '0 16px 48px rgba(11,94,215,0.1)' }}>
              {/* Card header */}
              <div className="px-6 py-4 flex items-center justify-between" style={{ background: 'linear-gradient(135deg, #0B5ED7, #1E88E5)' }}>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white bg-opacity-20 flex items-center justify-center">
                    <span style={{ fontSize: '18px' }}>👤</span>
                  </div>
                  <div>
                    <div style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '15px', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Sarah Mitchell</div>
                    <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: '12px' }}>TechFlow Solutions · Enterprise</div>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: '#fff' }}>🔥 Hot Lead</span>
              </div>

              <div className="p-6" style={{ backgroundColor: '#FFFFFF' }}>
                {/* Contact info grid */}
                <div className="grid grid-cols-2 gap-4 mb-5 p-4 rounded-xl" style={{ backgroundColor: '#F8FAFC', border: '1px solid #F1F5F9' }}>
                  <div>
                    <div style={{ fontSize: '11px', color: '#94A3B8', marginBottom: '3px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Phone</div>
                    <div style={{ fontSize: '13px', color: '#1A1A1A', fontWeight: 500 }}>+1 555-0123</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', color: '#94A3B8', marginBottom: '3px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Email</div>
                    <div style={{ fontSize: '13px', color: '#1A1A1A', fontWeight: 500 }}>sarah@techflow.com</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', color: '#94A3B8', marginBottom: '3px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Source</div>
                    <div style={{ fontSize: '13px', color: '#1A1A1A', fontWeight: 500 }}>LinkedIn</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', color: '#94A3B8', marginBottom: '3px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Assigned To</div>
                    <div style={{ fontSize: '13px', color: '#1A1A1A', fontWeight: 500 }}>Alex Kumar</div>
                  </div>
                </div>

                {/* Status selector */}
                <div className="mb-4">
                  <div style={{ fontSize: '11px', color: '#94A3B8', marginBottom: '6px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Status</div>
                  <div className="flex gap-2 flex-wrap">
                    {[
                      { label: 'New', color: '#0B5ED7' },
                      { label: 'Contacted', color: '#F59E0B', active: true },
                      { label: 'Qualified', color: '#10B981' },
                      { label: 'Converted', color: '#8B5CF6' },
                    ].map((s, i) => (
                      <span key={i} className="px-3 py-1 rounded-full text-xs font-bold cursor-pointer transition-all"
                        style={{
                          backgroundColor: s.active ? s.color : s.color + '18',
                          color: s.active ? '#fff' : s.color,
                          border: `1px solid ${s.color}40`
                        }}>{s.label}</span>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                <div className="mb-5 p-3 rounded-xl" style={{ backgroundColor: '#FFF7ED', border: '1px solid #FED7AA' }}>
                  <div style={{ fontSize: '10px', color: '#EA580C', fontWeight: 700, marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>📝 Latest Note</div>
                  <div style={{ fontSize: '13px', color: '#78350F', lineHeight: 1.6 }}>Initial contact made. Interested in enterprise plan. Follow-up call scheduled for Friday.</div>
                </div>

                <button className="w-full py-3 rounded-xl text-white font-bold transition-all flex items-center justify-center gap-2"
                  style={{ background: 'linear-gradient(135deg, #0B5ED7, #1E88E5)', boxShadow: '0 4px 14px rgba(11,94,215,0.3)', fontSize: '14px' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(11,94,215,0.4)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 14px rgba(11,94,215,0.3)'; }}
                >
                  Convert to Deal <ArrowRight size={16} />
                </button>

                {/* Activity Log */}
                <div className="pt-4 mt-4" style={{ borderTop: '1px solid #E2E8F0' }}>
                  <div style={{ fontSize: '12px', color: '#1A1A1A', fontWeight: 700, marginBottom: '10px' }}>Activity Log</div>
                  <div className="space-y-2.5">
                    {[
                      { icon: '📞', text: 'Call logged — follow-up scheduled', time: '2 days ago', color: '#0B5ED7' },
                      { icon: '✉️', text: 'Email sent — proposal attached', time: '3 days ago', color: '#8B5CF6' },
                      { icon: '➕', text: 'Lead created from LinkedIn', time: '5 days ago', color: '#10B981' },
                    ].map((act, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs" style={{ backgroundColor: act.color + '18' }}>{act.icon}</div>
                        <div>
                          <div style={{ fontSize: '12px', color: '#1A1A1A', fontWeight: 500 }}>{act.text}</div>
                          <div style={{ fontSize: '11px', color: '#94A3B8' }}>{act.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Feature list + mini stats */}
            <div>
              <div className="space-y-4 mb-8">
                {[
                  { icon: '⚡', title: 'Quick lead entry with source tracking', desc: 'Add leads in seconds with pre-set sources like LinkedIn, WhatsApp, referral, and more.' },
                  { icon: '👤', title: 'Manual or auto lead assignment', desc: 'Assign leads to reps manually, or set rules to auto-assign by source, territory, or rotation.' },
                  { icon: '📜', title: 'Full activity & status history', desc: 'Every call, email, note, and status change is timestamped and accessible in one timeline.' },
                  { icon: '🔁', title: 'One-click lead → contact + deal conversion', desc: 'Convert a qualified lead to a Contact and create a linked Deal without re-entering data.' },
                  { icon: '🔐', title: 'Role-based visibility (Admin vs Sales)', desc: 'Admins see all leads across the team; sales reps only see what\'s assigned to them.' },
                ].map((f, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 rounded-2xl transition-all cursor-pointer"
                    style={{ border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = '#0B5ED7'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(11,94,215,0.08)'; e.currentTarget.style.transform = 'translateX(4px)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = '#E2E8F0'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateX(0)'; }}
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#EBF3FF' }}>
                      <span style={{ fontSize: '18px' }}>{f.icon}</span>
                    </div>
                    <div>
                      <div style={{ fontSize: '14px', color: '#1A1A1A', fontWeight: 700, marginBottom: '3px' }}>{f.title}</div>
                      <div style={{ fontSize: '13px', color: '#64748B', lineHeight: 1.6 }}>{f.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mini stat cards */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {[
                  { label: 'Avg. Lead-to-Deal', value: '4.2 days', icon: '⏱️', color: '#0B5ED7' },
                  { label: 'Conversion Rate', value: '34%', icon: '📈', color: '#10B981' },
                  { label: 'Leads / Month', value: '1,200+', icon: '🎯', color: '#8B5CF6' },
                ].map((s, i) => (
                  <div key={i} className="p-3 sm:p-4 rounded-2xl text-center" style={{ background: s.color + '0F', border: `1px solid ${s.color}22` }}>
                    <div style={{ fontSize: '18px', marginBottom: '3px' }}>{s.icon}</div>
                    <div style={{ fontSize: '14px', color: s.color, fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 800 }}>{s.value}</div>
                    <div style={{ fontSize: '10px', color: '#64748B', marginTop: '2px' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section id="why-us" style={{ backgroundColor: '#FFFFFF', paddingTop: '60px', paddingBottom: '60px', position: 'relative', overflow: 'hidden' }}>
        {/* Decorative blob */}
        <div className="absolute pointer-events-none" style={{ width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(11,94,215,0.04) 0%, transparent 70%)', top: '-100px', right: '-100px' }}></div>
        <div className="absolute pointer-events-none" style={{ width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(16,185,129,0.04) 0%, transparent 70%)', bottom: '-80px', left: '-80px' }}></div>

        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 relative z-10">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4" style={{ backgroundColor: '#F0FDF4', border: '1px solid #BBF7D0' }}>
              <span style={{ fontSize: '14px' }}>🏆</span>
              <span style={{ color: '#16A34A', fontWeight: 600, fontSize: '12px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>WHY CHOOSE US</span>
            </div>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', color: '#1A1A1A', fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 800, lineHeight: 1.15, marginBottom: '14px' }}>
              Built for teams that mean<br />
              <span style={{ background: 'linear-gradient(135deg, #0B5ED7, #1E88E5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>serious business</span>
            </h2>
            <p style={{ fontSize: '17px', color: '#64748B', maxWidth: '500px', margin: '0 auto', lineHeight: 1.65 }}>
              CRM isn't just another CRM — it's purpose-built for the way Indian and global sales teams actually work.
            </p>
          </div>

          {/* Top: Role cards side by side with visual enhancement */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {[
              {
                icon: '🛡️', title: 'Admin', badge: 'Full Control', badgeColor: '#10B981', badgeBg: '#D1FAE5',
                gradient: 'linear-gradient(135deg, #0B5ED7 0%, #1565C0 100%)',
                features: [
                  { icon: '👥', text: 'Create & manage all users and roles' },
                  { icon: '🔄', text: 'Configure custom pipeline stages' },
                  { icon: '📊', text: 'Access all reports and dashboards' },
                  { icon: '🎯', text: 'Manage lead sources and assignments' },
                  { icon: '🏢', text: 'Full multi-tenant workspace control' },
                ]
              },
              {
                icon: '👤', title: 'Sales Rep', badge: 'Daily Workflow', badgeColor: '#1E88E5', badgeBg: '#DBEAFE',
                gradient: 'linear-gradient(135deg, #1E88E5 0%, #0B5ED7 100%)',
                features: [
                  { icon: '📋', text: 'Manage only assigned leads' },
                  { icon: '📞', text: 'Log calls, meetings & notes' },
                  { icon: '💼', text: 'Create and progress deals' },
                  { icon: '✅', text: 'Complete tasks and follow-ups' },
                  { icon: '📈', text: 'View personal performance dashboard' },
                ]
              }
            ].map((role, i) => (
              <div key={i} className="rounded-2xl overflow-hidden transition-all"
                style={{ border: '1px solid #E2E8F0', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 20px 48px rgba(11,94,215,0.14)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.06)'; }}
              >
                {/* Card header */}
                <div className="px-5 sm:px-7 py-4 sm:py-5 flex items-center justify-between flex-wrap gap-2" style={{ background: role.gradient }}>
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(255,255,255,0.2)', fontSize: '22px' }}>{role.icon}</div>
                    <div>
                      <div style={{ color: '#FFFFFF', fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 800, fontSize: '20px' }}>{role.title}</div>
                      <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '12px' }}>Role-based access</div>
                    </div>
                  </div>
                  <span className="px-3 py-1.5 rounded-full text-xs font-bold" style={{ backgroundColor: role.badgeBg, color: role.badgeColor }}>{role.badge}</span>
                </div>
                {/* Features */}
                <div className="p-6" style={{ backgroundColor: '#FFFFFF' }}>
                  <div className="space-y-3">
                    {role.features.map((f, fi) => (
                      <div key={fi} className="flex items-center gap-3 p-3 rounded-xl transition-all"
                        style={{ backgroundColor: '#F8FAFC' }}
                        onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#EBF3FF'; }}
                        onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#F8FAFC'; }}
                      >
                        <span style={{ fontSize: '16px' }}>{f.icon}</span>
                        <span style={{ fontSize: '14px', color: '#374151', fontWeight: 500 }}>{f.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom: Advantage pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
            {[
              { icon: '⚡', title: 'Lightning Fast Setup', desc: 'Go from sign-up to first lead entered in under 10 minutes. No IT team needed.', color: '#F59E0B', bg: '#FFF7ED', border: '#FED7AA' },
              { icon: '🔒', title: 'Enterprise Security', desc: 'AES-256 encryption, TLS 1.3, ISO 27001 infrastructure and GDPR-ready out of the box.', color: '#0B5ED7', bg: '#EBF3FF', border: '#C7DFFE' },
              { icon: '📱', title: 'Works Everywhere', desc: 'Browser-based and fully responsive. Works seamlessly on desktop, tablet, and mobile.', color: '#10B981', bg: '#F0FDF4', border: '#BBF7D0' },
            ].map((p, i) => (
              <div key={i} className="p-6 rounded-2xl flex gap-4 transition-all"
                style={{ backgroundColor: p.bg, border: `1px solid ${p.border}` }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = `0 12px 32px ${p.color}18`; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 text-2xl" style={{ backgroundColor: '#FFFFFF', boxShadow: `0 4px 12px ${p.color}22` }}>{p.icon}</div>
                <div>
                  <h4 style={{ fontSize: '15px', color: '#1A1A1A', fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, marginBottom: '6px' }}>{p.title}</h4>
                  <p style={{ fontSize: '13px', color: '#64748B', lineHeight: 1.65 }}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom comparison strip */}
          <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid #E2E8F0', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
            <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
              <div style={{ minWidth: '480px' }}>
                <div className="grid grid-cols-4 text-center" style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                  <div className="p-3 sm:p-4" style={{ fontSize: '12px', color: '#94A3B8', fontWeight: 600 }}>Feature</div>
                  {['CRM', 'HubSpot', 'Salesforce'].map((n, i) => (
                    <div key={i} className="p-3 sm:p-4" style={{ fontSize: '12px', color: i === 0 ? '#0B5ED7' : '#94A3B8', fontWeight: i === 0 ? 800 : 600, borderLeft: '1px solid #E2E8F0', backgroundColor: i === 0 ? '#EBF3FF' : 'transparent' }}>{n} {i === 0 && '✨'}</div>
                  ))}
                </div>
                {[
                  { feature: 'Multi-tenant support', vals: [true, false, true] },
                  { feature: 'Indian payment & UPI', vals: [true, false, false] },
                  { feature: 'Free onboarding call', vals: [true, false, false] },
                  { feature: 'Simple pricing', vals: [true, false, false] },
                  { feature: 'Setup < 10 mins', vals: [true, false, false] },
                ].map((row, ri) => (
                  <div key={ri} className="grid grid-cols-4 text-center" style={{ borderBottom: ri < 4 ? '1px solid #F1F5F9' : 'none', backgroundColor: ri % 2 === 0 ? '#FFFFFF' : '#FAFBFC' }}>
                    <div className="p-3 sm:p-3.5 text-left px-3 sm:px-5" style={{ fontSize: '12px', color: '#374151', fontWeight: 500 }}>{row.feature}</div>
                    {row.vals.map((v, vi) => (
                      <div key={vi} className="p-3 sm:p-3.5 flex items-center justify-center" style={{ borderLeft: '1px solid #F1F5F9', backgroundColor: vi === 0 ? '#EBF3FF' : 'transparent' }}>
                        {v
                          ? <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: vi === 0 ? '#0B5ED7' : '#10B981' }}><Check size={13} color="white" /></div>
                          : <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: '#FEE2E2' }}><X size={13} color="#EF4444" /></div>
                        }
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* — NEW — INTEGRATIONS SECTION */}
      <section className="bg-white" style={{ paddingTop: '60px', paddingBottom: '60px' }}>
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <div className="inline-flex items-center px-4 py-2 rounded-full mb-6" style={{ backgroundColor: '#EBF3FF' }}>
                <span style={{ color: '#0B5ED7', fontWeight: 600, fontSize: '12px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>INTEGRATIONS</span>
              </div>
              <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', color: '#1A1A1A', fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, lineHeight: 1.2, marginBottom: '16px' }}>
                Connects with tools<br />your team already uses
              </h2>
              <p style={{ fontSize: '17px', color: '#64748B', lineHeight: 1.7, marginBottom: '28px' }}>
                CRM integrates seamlessly with your existing stack — no disruption, no re-learning. Get up and running in minutes.
              </p>
              <div className="space-y-3">
                {['Native Zapier & Make (formerly Integromat) support', 'Two-way Gmail & Outlook sync', 'Slack notifications for deal updates', 'REST API for custom integrations'].map((f, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#EBF3FF' }}>
                      <Check style={{ width: '12px', height: '12px', color: '#0B5ED7' }} />
                    </div>
                    <span style={{ fontSize: '15px', color: '#1A1A1A' }}>{f}</span>
                  </div>
                ))}
              </div>
              <button className="mt-8 px-6 py-3 rounded-xl flex items-center gap-2 transition-all"
                style={{ border: '1.5px solid #0B5ED7', color: '#0B5ED7', fontWeight: 600, fontSize: '15px' }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#EBF3FF'; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; }}
              >
                View all integrations <ArrowRight size={16} />
              </button>
            </div>
            <div>
              <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-3">
                {integrations.map((int, i) => (
                  <div key={i} className="p-4 rounded-2xl flex flex-col items-center justify-center gap-2 transition-all cursor-pointer"
                    style={{ backgroundColor: '#F5F7FA', border: '1px solid #E2E8F0' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = '#0B5ED7'; e.currentTarget.style.backgroundColor = '#EBF3FF'; e.currentTarget.style.transform = 'scale(1.05)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = '#E2E8F0'; e.currentTarget.style.backgroundColor = '#F5F7FA'; e.currentTarget.style.transform = 'scale(1)'; }}
                  >
                    <span style={{ fontSize: '28px' }}>{int.icon}</span>
                    <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 600, textAlign: 'center' }}>{int.name}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-4 rounded-2xl text-center" style={{ backgroundColor: '#F5F7FA', border: '1px dashed #CBD5E1' }}>
                <span style={{ fontSize: '13px', color: '#64748B' }}>+ 30 more integrations coming soon</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section id="pricing" style={{ background: 'linear-gradient(160deg, #EAF3FF 0%, #F5F9FF 100%)', paddingTop: '60px', paddingBottom: '60px' }}>
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4" style={{ backgroundColor: 'rgba(11,94,215,0.08)', border: '1px solid rgba(11,94,215,0.18)' }}>
              <span style={{ color: '#0B5ED7', fontWeight: 700, fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>PRICING</span>
            </div>
            <h2 style={{ fontSize: 'clamp(32px, 4.5vw, 52px)', color: '#0F1F3D', fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 800, lineHeight: 1.1, marginBottom: '14px' }}>
              Simple, Transparent Pricing
            </h2>
            <p style={{ fontSize: '17px', color: '#64748B', maxWidth: '460px', margin: '0 auto', lineHeight: 1.65 }}>
              Choose the plan that fits your team. Upgrade anytime as you grow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: '🚀', name: 'Starter', tagline: 'Perfect for small sales teams kicking off',
                price: '₹999', unit: '/month', min: 'Up to 3 users', billing: 'Billed Monthly',
                cta: 'Get Started Free', ctaStyle: 'outline', accent: '#0B8A6E',
                features: ['Up to 3 users', 'Up to 500 leads', 'Lead & contact management', 'Basic pipeline (3 stages)', 'Task & follow-up reminders', 'Activity logging', 'Email support'],
              },
              {
                icon: '⚡', name: 'Growth', tagline: 'For growing sales teams closing more deals',
                price: '₹2,999', unit: '/month', min: 'Up to 10 users', billing: 'Billed Monthly',
                cta: 'Start Free Trial', ctaStyle: 'dark', accent: '#0B5ED7', popular: true,
                features: ['Up to 10 users', 'Unlimited leads', 'Full pipeline with custom stages', 'Dashboard & sales reports', 'Lead source tracking', 'Role-based access (Admin & Rep)', 'Deal management', 'Email & task notifications', 'Data export (CSV)', 'Priority email support'],
              },
              {
                icon: '🏢', name: 'Pro', tagline: 'For established teams needing full control',
                price: '₹5,999', unit: '/month', min: 'Up to 25 users', billing: 'Billed Monthly',
                cta: 'Upgrade to Pro', ctaStyle: 'teal', accent: '#0B8A6E',
                features: ['Up to 25 users', 'Unlimited leads & deals', 'Everything in Growth', 'Advanced analytics & KPIs', 'Multi-pipeline support', 'Lead assignment automation', 'Activity timeline per lead', 'Bulk lead import/export', 'Custom fields & tags', 'Dedicated onboarding call'],
              },
              {
                icon: '👑', name: 'Enterprise', tagline: 'For large orgs & multi-team deployments',
                price: 'Custom', unit: '', min: '25+ users', billing: 'Billed Annually',
                cta: 'Contact Sales', ctaStyle: 'dark', accent: '#0B5ED7', customQuote: true,
                features: ['Unlimited users', 'Multi-tenant workspaces', 'Super admin dashboard', 'Custom integrations & API access', 'SSO & advanced security', 'Custom roles & permissions', 'SLA & uptime guarantee', 'Dedicated success manager', 'White-label options available'],
              },
            ].map((plan, i) => (
              <div key={i} className={`rounded-2xl bg-white relative flex flex-col transition-all${plan.popular ? ' mt-6 md:mt-6' : ''}`}
                style={{
                  border: plan.popular ? `2px solid #0B5ED7` : '1.5px solid #E2E8F0',
                  boxShadow: plan.popular ? '0 16px 48px rgba(11,94,215,0.15)' : '0 2px 12px rgba(0,0,0,0.04)',
                }}
                onMouseEnter={e => { if (!plan.popular) { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 16px 40px rgba(11,94,215,0.1)`; e.currentTarget.style.borderColor = plan.accent; }}}
                onMouseLeave={e => { if (!plan.popular) { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.04)'; e.currentTarget.style.borderColor = '#E2E8F0'; }}}
              >
                {/* Most Popular badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full flex items-center gap-1.5" style={{ background: 'linear-gradient(135deg, #0B5ED7, #1E88E5)', boxShadow: '0 4px 14px rgba(11,94,215,0.35)' }}>
                    <span style={{ fontSize: '12px' }}>⚡</span>
                    <span style={{ color: '#FFFFFF', fontSize: '12px', fontWeight: 700, whiteSpace: 'nowrap' }}>Most Popular</span>
                  </div>
                )}

                <div className="p-6 flex-1">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-xl" style={{ backgroundColor: plan.accent + '15', border: `1px solid ${plan.accent}25` }}>{plan.icon}</div>

                  {/* Name & tagline */}
                  <h3 style={{ fontSize: '18px', color: '#0F1F3D', fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, marginBottom: '4px' }}>{plan.name}</h3>
                  <p style={{ fontSize: '12px', color: '#64748B', marginBottom: '16px', lineHeight: 1.5 }}>{plan.tagline}</p>

                  {/* Price */}
                  {plan.customQuote ? (
                    <div className="mb-1">
                      <span style={{ fontSize: '24px', color: '#0B8A6E', fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 800 }}>Custom Quote</span>
                    </div>
                  ) : (
                    <div className="flex items-end gap-1 mb-1">
                      <span style={{ fontSize: '36px', color: '#0F1F3D', fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 800, lineHeight: 1 }}>{plan.price}</span>
                      <span style={{ fontSize: '13px', color: '#64748B', marginBottom: '4px' }}>{plan.unit}</span>
                    </div>
                  )}
                  <p style={{ fontSize: '11px', color: '#94A3B8', marginBottom: '8px' }}>Minimum <strong style={{ color: '#64748B' }}>{plan.min.replace('Minimum ', '')}</strong></p>

                  {/* Billing badge */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full mb-5" style={{ backgroundColor: '#EBF3FF', border: '1px solid #C7DFFE' }}>
                    <span style={{ fontSize: '11px' }}>🗓️</span>
                    <span style={{ fontSize: '11px', color: '#0B5ED7', fontWeight: 600 }}>{plan.billing}</span>
                  </div>

                  {/* CTA Button */}
                  <button className="w-full py-3 rounded-xl font-bold mb-5 transition-all"
                    style={
                      plan.ctaStyle === 'dark'
                        ? { backgroundColor: '#0F1F3D', color: '#FFFFFF', fontSize: '14px' }
                        : plan.ctaStyle === 'teal'
                        ? { background: 'linear-gradient(135deg, #0B8A6E, #0FA87E)', color: '#FFFFFF', fontSize: '14px', boxShadow: '0 4px 14px rgba(11,138,110,0.3)' }
                        : { backgroundColor: '#FFFFFF', color: '#0B5ED7', fontSize: '14px', border: '1.5px solid #0B5ED7' }
                    }
                    onMouseEnter={e => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                    onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)'; }}
                  >{plan.cta}</button>

                  {/* Feature list */}
                  <ul className="space-y-2.5">
                    {plan.features.map((f, fi) => (
                      <li key={fi} className="flex items-start gap-2.5">
                        <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: plan.accent + '15' }}>
                          <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1 4l2 2 4-4" stroke={plan.accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </div>
                        <span style={{ fontSize: '13px', color: '#374151', lineHeight: 1.6 }}>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* — NEW — FAQ SECTION */}
      <section id="faq" style={{ backgroundColor: '#F5F7FA', paddingTop: '60px', paddingBottom: '60px' }}>
        <div className="max-w-[900px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4" style={{ backgroundColor: '#EBF3FF', border: '1px solid #C7DFFE' }}>
              <span style={{ fontSize: '14px' }}>⚙️</span>
              <span style={{ color: '#0B5ED7', fontWeight: 600, fontSize: '12px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>FAQ</span>
            </div>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', color: '#1A1A1A', fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 800, lineHeight: 1.2, marginBottom: '12px' }}>
              Frequently Asked <span style={{ background: 'linear-gradient(135deg, #0B5ED7, #1E88E5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Questions</span>
            </h2>
            <p style={{ fontSize: '17px', color: '#64748B', maxWidth: '480px', margin: '0 auto', lineHeight: 1.6 }}>Find answers to common questions about CRM's features, pricing, and implementation.</p>
          </div>

          {/* Category tabs */}
          <div className="space-y-4">
            {faqCategories.map((category, ci) => (
              <div key={ci} className="rounded-2xl overflow-hidden transition-all"
                style={{ backgroundColor: '#FFFFFF', border: activeFaqCategory === ci ? '1.5px solid #1E88E5' : '1.5px solid #E2E8F0', boxShadow: activeFaqCategory === ci ? '0 4px 24px rgba(11,94,215,0.09)' : 'none' }}
              >
                {/* Category header */}
                <button className="w-full px-4 sm:px-7 py-4 sm:py-5 flex items-center justify-between text-left"
                  onClick={() => setActiveFaqCategory(activeFaqCategory === ci ? -1 : ci)}
                >
                  <span style={{ fontSize: '16px', color: activeFaqCategory === ci ? '#0B5ED7' : '#1A1A1A', fontWeight: 700, fontFamily: 'Plus Jakarta Sans, sans-serif' }}>{category.label}</span>
                  <div className="w-9 h-9 rounded-full flex items-center justify-center transition-all flex-shrink-0"
                    style={{ backgroundColor: activeFaqCategory === ci ? '#0B5ED7' : '#F1F5F9', color: activeFaqCategory === ci ? '#FFFFFF' : '#64748B' }}
                  >
                    <ChevronDown size={18} style={{ transform: activeFaqCategory === ci ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }} />
                  </div>
                </button>

                {/* Sub-questions */}
                {activeFaqCategory === ci && (
                  <div className="px-4 sm:px-7 pb-5 space-y-3" style={{ borderTop: '1px solid #E2E8F0', paddingTop: '16px' }}>
                    {category.items.map((faq, fi) => {
                      const key = `${ci}-${fi}`;
                      return (
                        <div key={fi} className="rounded-xl overflow-hidden"
                          style={{ backgroundColor: '#F8FAFC', border: openFaq === key ? '1.5px solid #1E88E5' : '1px solid #E2E8F0' }}
                        >
                          <button className="w-full px-4 sm:px-5 py-4 flex items-center justify-between text-left"
                            onClick={() => setOpenFaq(openFaq === key ? null : key)}
                          >
                            <span style={{ fontSize: '14px', color: '#1A1A1A', fontWeight: 600 }}>{faq.q}</span>
                            <div className="ml-3 flex-shrink-0" style={{ color: '#64748B', transform: openFaq === key ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }}>
                              <ChevronDown size={17} />
                            </div>
                          </button>
                          {openFaq === key && (
                            <div className="px-4 sm:px-5 pb-4" style={{ borderTop: '1px solid #E2E8F0', paddingTop: '12px' }}>
                              <p style={{ fontSize: '13px', color: '#64748B', lineHeight: 1.75 }}>{faq.a}</p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-10 p-6 rounded-2xl text-center" style={{ backgroundColor: '#EBF3FF', border: '1px solid #C7DFFE' }}>
            <p style={{ fontSize: '15px', color: '#1A1A1A', fontWeight: 500, marginBottom: '12px' }}>Still have questions? We're here to help.</p>
            <button className="px-6 py-2.5 rounded-xl text-white transition-all"
              style={{ background: 'linear-gradient(135deg, #0B5ED7, #1E88E5)', fontWeight: 600, fontSize: '14px' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              Chat with Support
            </button>
          </div>
        </div>
      </section>

      {/* LEGAL MODALS */}
      {legalModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
          onClick={e => { if (e.target === e.currentTarget) setLegalModal(null); }}
        >
          <div className="relative w-full max-w-[560px] max-h-[90vh] rounded-2xl overflow-hidden flex flex-col" style={{ backgroundColor: '#0F1F3D', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 32px 80px rgba(0,0,0,0.5)' }}>
            {/* Modal header */}
            <div className="flex items-center gap-3 px-4 sm:px-6 py-4 sm:py-5 flex-shrink-0" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-base sm:text-lg flex-shrink-0" style={{ backgroundColor: 'rgba(11,94,215,0.25)', border: '1px solid rgba(11,94,215,0.4)' }}>
                {legalModal === 'Privacy Policy' ? '🔒' : legalModal === 'Terms of Service' ? '📄' : legalModal === 'Cookie Policy' ? '🍪' : '🛡️'}
              </div>
              <div className="min-w-0">
                <h3 style={{ color: '#FFFFFF', fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, fontSize: '15px' }}>{legalModal}</h3>
                <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '11px' }}>
                  {legalModal === 'Privacy Policy' ? 'How we collect, use and protect your data' : legalModal === 'Terms of Service' ? 'Terms governing your use of CRM' : legalModal === 'Cookie Policy' ? 'How we use cookies on our platform' : 'How we protect your data and platform'}
                </p>
              </div>
              <button onClick={() => setLegalModal(null)} className="ml-auto flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all" style={{ backgroundColor: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.6)' }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.15)'; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)'; }}
              ><X size={14} /></button>
            </div>

            {/* Last updated */}
            <div className="px-4 sm:px-6 py-3 flex-shrink-0" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: 'rgba(11,94,215,0.2)', color: '#60A5FA', border: '1px solid rgba(11,94,215,0.3)' }}>Last updated: February 1, 2026</span>
            </div>

            {/* Modal content */}
            <div className="overflow-y-auto flex-1 px-4 sm:px-6 py-5" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.15) transparent' }}>
              {legalModal === 'Privacy Policy' && (
                <div className="space-y-6" style={{ color: 'rgba(255,255,255,0.75)', fontSize: '14px', lineHeight: 1.75 }}>
                  {[
                    { title: '1. Information We Collect', body: 'CRM collects information necessary to operate the platform and deliver services to your organisation:', bullets: ['Lead and contact profile data: name, phone, email, company, source', 'User account information: name, email, role, login timestamps', 'Pipeline and deal data entered by your team', 'Activity logs: calls, notes, status changes, and task completions', 'Device and browser metadata for security and session management'] },
                    { title: '2. How We Use Your Information', body: 'We use collected data solely to deliver and improve CRM:', bullets: ['Providing and operating the CRM platform', 'Enabling lead tracking, deal pipeline, and task workflows', 'Generating performance reports and sales analytics', 'Role-based access enforcement', 'Sending automated notifications and reminders within the platform'] },
                    { title: '3. Data Storage & Security', body: 'All data is stored on secure, encrypted cloud infrastructure. We apply TLS 1.3 in transit and AES-256 at rest. Regular backups ensure data integrity and availability.' },
                    { title: '4. Data Sharing', body: 'We do not sell, rent or share your organisation\'s data with third parties. Data may only be shared with integrations (such as Slack or Gmail) that you explicitly configure.' },
                    { title: '5. Your Rights', body: 'You may request access to, correction of, or deletion of your personal data at any time by contacting info@aveironworld.com. We will respond within 30 days.' },
                  ].map((s, i) => (
                    <div key={i}>
                      <h4 style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '15px', marginBottom: '8px', borderLeft: '3px solid #0B5ED7', paddingLeft: '10px' }}>{s.title}</h4>
                      {s.body && <p style={{ marginBottom: s.bullets ? '8px' : 0 }}>{s.body}</p>}
                      {s.bullets && <ul className="space-y-1.5 pl-2">{s.bullets.map((b, bi) => <li key={bi} className="flex items-start gap-2"><span style={{ color: '#0B8A6E', flexShrink: 0, marginTop: '4px' }}>•</span><span>{b}</span></li>)}</ul>}
                    </div>
                  ))}
                </div>
              )}
              {legalModal === 'Terms of Service' && (
                <div className="space-y-6" style={{ color: 'rgba(255,255,255,0.75)', fontSize: '14px', lineHeight: 1.75 }}>
                  {[
                    { title: '1. Acceptance of Terms', body: 'By accessing or using CRM, you agree to be bound by these Terms of Service. If you do not agree, please do not use the platform.' },
                    { title: '2. Use of the Platform', body: 'CRM is a B2B SaaS CRM platform. You may use it solely for lawful business purposes. You agree not to misuse, reverse-engineer, or attempt to gain unauthorised access to any part of the service.' },
                    { title: '3. Account Responsibilities', body: 'You are responsible for maintaining the security of your account credentials. You must notify us immediately of any unauthorised access at info@aveironworld.com.' },
                    { title: '4. Payment & Billing', body: 'Paid plans are billed quarterly as stated in your subscription. Refunds are not issued for partial billing periods. Enterprise plans are governed by a separate agreement.' },
                    { title: '5. Termination', body: 'Either party may terminate the agreement with 30 days written notice. Upon termination, your data remains accessible for 30 days for export before deletion.' },
                    { title: '6. Limitation of Liability', body: 'CRM is provided "as is." We are not liable for any indirect, incidental, or consequential damages arising from use of the platform.' },
                  ].map((s, i) => (
                    <div key={i}>
                      <h4 style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '15px', marginBottom: '8px', borderLeft: '3px solid #0B5ED7', paddingLeft: '10px' }}>{s.title}</h4>
                      <p>{s.body}</p>
                    </div>
                  ))}
                </div>
              )}
              {legalModal === 'Cookie Policy' && (
                <div className="space-y-6" style={{ color: 'rgba(255,255,255,0.75)', fontSize: '14px', lineHeight: 1.75 }}>
                  {[
                    { title: '1. What Are Cookies', body: 'Cookies are small text files placed on your device when you visit CRM. They help us keep you logged in, remember preferences, and analyse platform usage.' },
                    { title: '2. Types of Cookies We Use', bullets: ['Essential cookies: Required for login sessions and platform security', 'Preference cookies: Remember your settings and display preferences', 'Analytics cookies: Understand how users navigate the platform (anonymised)', 'No third-party advertising cookies are used'] },
                    { title: '3. Managing Cookies', body: 'You can control cookies through your browser settings. Disabling essential cookies may prevent you from logging in or using core features of CRM.' },
                    { title: '4. Updates', body: 'We may update this Cookie Policy as the platform evolves. Continued use of CRM after changes constitutes acceptance of the updated policy.' },
                  ].map((s, i) => (
                    <div key={i}>
                      <h4 style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '15px', marginBottom: '8px', borderLeft: '3px solid #0B5ED7', paddingLeft: '10px' }}>{s.title}</h4>
                      {s.body && <p>{s.body}</p>}
                      {s.bullets && <ul className="space-y-1.5 pl-2">{s.bullets.map((b, bi) => <li key={bi} className="flex items-start gap-2"><span style={{ color: '#0B8A6E', flexShrink: 0, marginTop: '4px' }}>•</span><span>{b}</span></li>)}</ul>}
                    </div>
                  ))}
                </div>
              )}
              {legalModal === 'Security' && (
                <div className="space-y-6" style={{ color: 'rgba(255,255,255,0.75)', fontSize: '14px', lineHeight: 1.75 }}>
                  {[
                    { title: '1. Data Encryption', body: 'All data transmitted to and from CRM is encrypted using TLS 1.3. Data at rest is encrypted using AES-256, the industry standard for enterprise data protection.' },
                    { title: '2. Infrastructure', body: 'CRM is hosted on AWS infrastructure with data centres in India and Singapore. We maintain ISO 27001 certified servers with 99.9% uptime SLA for enterprise plans.' },
                    { title: '3. Access Control', body: 'Role-based access control (RBAC) ensures each user only sees data relevant to their role. Admin accounts have full visibility; sales reps are scoped to their assigned leads and deals.' },
                    { title: '4. Audits & Compliance', body: 'We conduct regular third-party security audits. CRM is built with GDPR compliance principles. Enterprise customers can request audit reports upon signing an NDA.' },
                    { title: '5. Incident Response', body: 'In the event of a security incident, affected customers will be notified within 72 hours. We maintain a documented incident response plan reviewed annually.' },
                    { title: '6. Responsible Disclosure', body: 'If you discover a security vulnerability, please report it responsibly to info@aveironworld.com. We commit to acknowledging reports within 48 hours.' },
                  ].map((s, i) => (
                    <div key={i}>
                      <h4 style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '15px', marginBottom: '8px', borderLeft: '3px solid #0B5ED7', paddingLeft: '10px' }}>{s.title}</h4>
                      <p>{s.body}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Modal footer */}
            <div className="px-4 sm:px-6 py-4 flex-shrink-0" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
              <button onClick={() => setLegalModal(null)} className="px-6 py-2.5 rounded-xl font-bold transition-all" style={{ background: 'linear-gradient(135deg, #0B5ED7, #1E88E5)', color: '#FFFFFF', fontSize: '14px', boxShadow: '0 4px 14px rgba(11,94,215,0.3)' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; }}
              >Close</button>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer style={{ backgroundColor: '#1A1F3D' }}>
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-12 pb-8">

          {/* Top section: Brand + Nav columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">

            {/* Brand block — full width on mobile, 1 col on lg */}
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0B5ED7, #1E88E5)' }}>
                  <span style={{ color: '#FFFFFF', fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 800, fontSize: '15px' }}>C</span>
                </div>
                <span style={{ fontSize: '18px', color: '#FFFFFF', fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700 }}>CRM</span>
              </div>
              <p style={{ color: '#8B92B0', fontSize: '13px', lineHeight: 1.75, marginBottom: '18px', maxWidth: '260px' }}>
                All-in-one CRM for modern sales teams. From lead to closed deal — in one system.
              </p>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full" style={{ backgroundColor: 'rgba(11,94,215,0.15)', border: '1px solid rgba(11,94,215,0.4)' }}>
                <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: '#10B981' }}></div>
                <span style={{ color: '#7DB8F7', fontSize: '11px', fontWeight: 600 }}>Now in Early Access</span>
              </div>
            </div>

            {/* Product links */}
            <div>
              <h4 style={{ color: '#8B92B0', fontWeight: 700, fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '14px' }}>Product</h4>
              <ul className="space-y-2.5">
                {[
                  { label: 'Features', href: '#features' },
                  { label: 'How it Works', href: '#how-it-works' },
                  { label: 'Why Us', href: '#why-us' },
                  { label: 'Pricing', href: '#pricing' },
                  { label: 'FAQ', href: '#faq' },
                ].map((link, li) => (
                  <li key={li}>
                    <a
                      href={link.href}
                      onClick={e => { e.preventDefault(); handleNavClick(e as any, link.href); }}
                      style={{ color: '#8B92B0', fontSize: '13px', textDecoration: 'none', transition: 'color 0.15s' }}
                      onMouseEnter={e => { e.currentTarget.style.color = '#FFFFFF'; }}
                      onMouseLeave={e => { e.currentTarget.style.color = '#8B92B0'; }}
                    >{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal links */}
            <div>
              <h4 style={{ color: '#8B92B0', fontWeight: 700, fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '14px' }}>Legal</h4>
              <ul className="space-y-2.5">
                {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Security'].map((link, li) => (
                  <li key={li}>
                    <button
                      onClick={() => setLegalModal(link)}
                      style={{ color: '#8B92B0', fontSize: '13px', background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left', transition: 'color 0.15s' }}
                      onMouseEnter={e => { e.currentTarget.style.color = '#FFFFFF'; }}
                      onMouseLeave={e => { e.currentTarget.style.color = '#8B92B0'; }}
                    >{link}</button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 style={{ color: '#8B92B0', fontWeight: 700, fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '14px' }}>Contact</h4>
              <ul className="space-y-3">
                <li>
                  <a href="mailto:info@aveironworld.com" className="flex items-start gap-2.5 group" style={{ textDecoration: 'none' }}>
                    <div className="mt-0.5 w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(11,94,215,0.2)' }}>
                      <Mail size={13} style={{ color: '#7DB8F7' }} />
                    </div>
                    <span style={{ color: '#8B92B0', fontSize: '13px', lineHeight: 1.5, transition: 'color 0.15s' }}
                      onMouseEnter={e => { e.currentTarget.style.color = '#FFFFFF'; }}
                      onMouseLeave={e => { e.currentTarget.style.color = '#8B92B0'; }}
                    >info@aveironworld.com</span>
                  </a>
                </li>
                <li>
                  <a href="tel:+919892440788" className="flex items-start gap-2.5" style={{ textDecoration: 'none' }}>
                    <div className="mt-0.5 w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(11,94,215,0.2)' }}>
                      <Phone size={13} style={{ color: '#7DB8F7' }} />
                    </div>
                    <span style={{ color: '#8B92B0', fontSize: '13px', transition: 'color 0.15s' }}
                      onMouseEnter={e => { e.currentTarget.style.color = '#FFFFFF'; }}
                      onMouseLeave={e => { e.currentTarget.style.color = '#8B92B0'; }}
                    >+91 9892440788</span>
                  </a>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="mt-0.5 w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(11,94,215,0.2)' }}>
                    <MapPin size={13} style={{ color: '#7DB8F7' }} />
                  </div>
                  <span style={{ color: '#8B92B0', fontSize: '13px', lineHeight: 1.6 }}>Thane, Maharashtra<br />India — 400604</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Divider */}
          <div style={{ borderTop: '1px solid rgba(139,146,176,0.12)', marginBottom: '20px' }}></div>

          {/* Bottom bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p style={{ color: '#5A6080', fontSize: '12px', textAlign: 'center' }}>© 2025 CRM by Avelon. All rights reserved.</p>
            <p style={{ color: '#5A6080', fontSize: '12px' }}>
              Powered by{' '}
              <span style={{ color: '#C4C9DD', fontWeight: 600 }}>Avelon</span>
            </p>
          </div>

        </div>
      </footer>

      </div>{/* end page content wrapper */}
    </div>
  );
}