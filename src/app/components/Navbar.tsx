import React, { useState, useEffect, useRef } from 'react';
import { Phone, X } from 'lucide-react';
import { LoginModal } from './LoginModal';

// ── Phone Popup ────────────────────────────────────────────────────────────────
function PhonePopup({ onClose }: { onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [onClose]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.35)',
        backdropFilter: 'blur(4px)',
        padding: '16px',
      }}
    >
      <div
        ref={ref}
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '20px',
          padding: '32px 28px 28px',
          width: '100%',
          maxWidth: '360px',
          textAlign: 'center',
          position: 'relative',
          boxShadow: '0 24px 60px rgba(0,0,0,0.18)',
          animation: 'phonePopIn 0.25s cubic-bezier(0.34,1.56,0.64,1)',
        }}
      >
        <style>{`
          @keyframes phonePopIn {
            from { opacity: 0; transform: scale(0.88) translateY(10px); }
            to   { opacity: 1; transform: scale(1)    translateY(0); }
          }
        `}</style>

        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '14px',
            right: '14px',
            width: '30px',
            height: '30px',
            borderRadius: '50%',
            border: '1.5px solid #E2E8F0',
            backgroundColor: '#F8FAFC',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#64748B',
            transition: 'all 0.15s',
          }}
          onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#EBF3FF'; e.currentTarget.style.borderColor = '#0B5ED7'; e.currentTarget.style.color = '#0B5ED7'; }}
          onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#F8FAFC'; e.currentTarget.style.borderColor = '#E2E8F0'; e.currentTarget.style.color = '#64748B'; }}
        >
          <X size={14} />
        </button>

        {/* Icon */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(11,94,215,0.12) 0%, rgba(11,94,215,0.04) 70%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #1E88E5, #0B5ED7)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 24px rgba(11,94,215,0.35)',
            }}>
              <Phone size={22} style={{ color: '#FFFFFF' }} />
            </div>
          </div>
        </div>

        {/* Label */}
        <p style={{
          fontSize: '11px',
          fontWeight: 700,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: '#1E88E5',
          marginBottom: '6px',
        }}>
          Contact Support
        </p>

        {/* Heading */}
        <h2 style={{
          fontSize: '22px',
          fontWeight: 800,
          color: '#0D2244',
          fontFamily: 'Plus Jakarta Sans, Inter, sans-serif',
          marginBottom: '8px',
          lineHeight: 1.2,
        }}>
          Call us for any queries
        </h2>

        {/* Sub */}
        <p style={{ fontSize: '13.5px', color: '#64748B', marginBottom: '24px' }}>
          Our support team is ready to help you.
        </p>

        {/* Phone card */}
        <a
          
          style={{
            display: 'block',
            backgroundColor: '#F0F5FA',
            border: '1px solid #DBEAFE',
            borderRadius: '12px',
            padding: '16px',
            textDecoration: 'none',
            transition: 'all 0.18s',
            marginBottom: '18px',
          }}
          onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#EBF3FF'; e.currentTarget.style.borderColor = '#0B5ED7'; }}
          onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#F0F5FA'; e.currentTarget.style.borderColor = '#DBEAFE'; }}
        >
          <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#64748B', marginBottom: '6px' }}>
            Phone Number
          </p>
          <p style={{ fontSize: '22px', fontWeight: 800, color: '#0D2244', fontFamily: 'Plus Jakarta Sans, Inter, sans-serif', letterSpacing: '-0.02em' }}>
            +91 98924 40788
          </p>
        </a>

        {/* Footer note */}
        <p style={{ fontSize: '12px', color: '#94A3B8' }}>
          Available 24/7 · We typically respond within minutes
        </p>
      </div>
    </div>
  );
}

// ── Navbar Props ───────────────────────────────────────────────────────────────
interface NavbarProps {
  activeNav: string;
  onNavClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
}

// ── Navbar Component ───────────────────────────────────────────────────────────
export default function Navbar({ activeNav, onNavClick }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [phonePopupOpen, setPhonePopupOpen] = useState(false);

  // Prevent scroll behind mobile menu
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : 'auto';
  }, [mobileMenuOpen]);

  // Close menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMobileMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Features', href: '#features' },
    { label: 'How it Works', href: '#how-it-works' },
    { label: 'Why Us', href: '#why-us' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <>
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

          {/* Desktop nav links */}
          <div className="hidden lg:flex" style={{ alignItems: 'center', gap: '2px' }}>
            {navLinks.map((item) => {
              const id = item.href.replace('#', '');
              const isActive = activeNav === id;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={e => onNavClick(e, item.href)}
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

            {/* Phone — desktop only, clickable */}
            <button
              className="hidden xl:flex"
              onClick={() => setPhonePopupOpen(true)}
              style={{ alignItems: 'center', gap: '8px', marginRight: '4px', background: 'none', border: 'none', cursor: 'pointer', padding: '6px 8px', borderRadius: '8px', transition: 'background 0.18s' }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#EBF3FF'; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; }}
            >
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#EBF3FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Phone size={13} style={{ color: '#0B5ED7' }} />
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ color: '#1A1A1A', fontWeight: 600, fontSize: '12px', lineHeight: 1.2 }}>+91 9892440788</div>
                <div style={{ color: '#64748B', fontSize: '10px' }}>24/7 Support</div>
              </div>
            </button>

            {/* Sign In */}
            <button
              className="hidden md:block"
              onClick={() => setLoginModalOpen(true)}
              style={{ padding: '7px 16px', borderRadius: '8px', border: '1.5px solid #0B5ED7', color: '#0B5ED7', fontWeight: 500, fontSize: '13px', backgroundColor: 'transparent', cursor: 'pointer', transition: 'background 0.18s', whiteSpace: 'nowrap' }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#EBF3FF'; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; }}
            >Sign In</button>

            {/* Hamburger */}
            <button
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(o => !o)}
              aria-label="Toggle menu"
              style={{
                width: '40px', height: '40px', borderRadius: '8px',
                border: '1.5px solid #E2E8F0',
                backgroundColor: mobileMenuOpen ? '#EBF3FF' : '#FFFFFF',
                cursor: 'pointer', transition: 'background 0.18s', flexShrink: 0, padding: 0,
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

        {/* Mobile dropdown */}
        <div
          className="lg:hidden"
          style={{
            position: 'fixed',
            top: '68px', left: 0, right: 0,
            backgroundColor: '#FFFFFF',
            borderTop: '1px solid #E2E8F0',
            boxShadow: '0 12px 32px rgba(0,0,0,0.12)',
            transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(-120%)',
            transition: 'transform 0.3s ease',
            zIndex: 100,
          }}
        >
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '12px 16px 16px' }}>

            {/* Nav links */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginBottom: '12px' }}>
              {navLinks.map((item) => {
                const id = item.href.replace('#', '');
                const isActive = activeNav === id;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={e => { onNavClick(e, item.href); setMobileMenuOpen(false); }}
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

            {/* Phone row in mobile menu */}
            <button
              onClick={() => { setPhonePopupOpen(true); setMobileMenuOpen(false); }}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '11px 14px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: '#F0F5FA',
                cursor: 'pointer',
                marginBottom: '12px',
                transition: 'background 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#EBF3FF'; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#F0F5FA'; }}
            >
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#EBF3FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Phone size={13} style={{ color: '#0B5ED7' }} />
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ color: '#1A1A1A', fontWeight: 600, fontSize: '13px' }}>+91 9892440788</div>
                <div style={{ color: '#64748B', fontSize: '11px' }}>Tap to call · 24/7 Support</div>
              </div>
            </button>

            {/* Divider */}
            <div style={{ borderTop: '1px solid #E2E8F0', marginBottom: '12px' }} />

            {/* CTA buttons */}
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => { setLoginModalOpen(true); setMobileMenuOpen(false); }}
                style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1.5px solid #0B5ED7', color: '#0B5ED7', fontWeight: 500, fontSize: '14px', backgroundColor: 'transparent', cursor: 'pointer' }}
              >
                Sign In
              </button>
              <button style={{ flex: 1, padding: '10px', borderRadius: '8px', background: 'linear-gradient(135deg, #0B5ED7, #1E88E5)', color: '#FFFFFF', fontWeight: 600, fontSize: '14px', border: 'none', cursor: 'pointer' }}>
                Get Started Free
              </button>
            </div>

          </div>
        </div>
      </nav>

      {/* Phone popup */}
      {phonePopupOpen && <PhonePopup onClose={() => setPhonePopupOpen(false)} />}

      {/* Login modal */}
      <LoginModal
        open={loginModalOpen}
        onOpenChange={setLoginModalOpen}
        onLoginSuccess={() => setLoginModalOpen(false)}
      />
    </>
  );
}