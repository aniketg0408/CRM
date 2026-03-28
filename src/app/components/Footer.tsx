import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

interface FooterProps {
  onNavClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
  onLegalClick: (page: string) => void;
}

export default function Footer({ onNavClick, onLegalClick }: FooterProps) {
  return (
    <footer style={{ backgroundColor: '#1A1F3D' }}>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-12 pb-8">

        {/* Top section: Brand + Nav columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">

          {/* Brand block */}
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
                    onClick={e => { e.preventDefault(); onNavClick(e as any, link.href); }}
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
                    onClick={() => onLegalClick(link)}
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
                  <span
                    style={{ color: '#8B92B0', fontSize: '13px', lineHeight: 1.5, transition: 'color 0.15s' }}
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
                  <span
                    style={{ color: '#8B92B0', fontSize: '13px', transition: 'color 0.15s' }}
                    onMouseEnter={e => { e.currentTarget.style.color = '#FFFFFF'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = '#8B92B0'; }}
                  >+91 9892440788</span>
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <div className="mt-0.5 w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(11,94,215,0.2)' }}>
                  <MapPin size={13} style={{ color: '#7DB8F7' }} />
                </div>
                <span style={{ color: '#8B92B0', fontSize: '13px', lineHeight: 1.6 }}>
                  5th Floor, Lodha Supremus II, Unit No. A-533/A-507, Wagle Industrial Estate, Thane West, Maharashtra<br />India — 400604
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Divider */}
        <div style={{ borderTop: '1px solid rgba(139,146,176,0.12)', marginBottom: '20px' }}></div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p style={{ color: 'white', fontSize: '12px', textAlign: 'center' }}>© 2025 CRM by Averlon. All rights reserved.</p>
          <p style={{ color: 'white', fontSize: '12px' }}>
            Powered by{' '}
            <span style={{ color: 'white', fontWeight: 600 }}>Averlon</span>
          </p>
        </div>

      </div>
    </footer>
  );
}