import React, { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Check, ArrowRight, ChevronRight,
  BarChart2, Target, RefreshCw, Users, Lock, Zap, Tag,
  Mail, MessageSquare, Smartphone, Phone, FileText, Grid,
  MessageCircle, Video, CheckSquare, Calendar, Folder, FileEdit,
  Receipt, CreditCard, Package, PenLine, ClipboardList,
  TrendingUp, User, LayoutDashboard, Brain, Clock, Download,
  Tablet, Bell, ShieldCheck, Layers, Settings, Link, Globe, Plug,
  Mic, FileCheck, Sparkles, Lightbulb, Languages,
  Megaphone, Send, BarChart, MapPin,
  AlertCircle, Handshake, Network,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

gsap.registerPlugin(ScrollTrigger);

// ─── Icon helper ────────────────────────────────────────────────────────────
const sz = 20;

// ─── Feature Data ────────────────────────────────────────────────────────────

const featureData: Record<string, {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  accent: string;
  accentLight: string;
  heroIcon: React.ReactNode;
  highlights: { icon: React.ReactNode; label: string; value: string }[];
  capabilities: { title: string; description: string; icon: React.ReactNode }[];
  benefits: string[];
  useCases: { title: string; description: string }[];
  cta: string;
}> = {
  'Sales-Management': {
    slug: 'Sales-Management',
    title: 'Sales Management',
    tagline: 'Your entire sales operation — one place.',
    description: 'Manage leads, deals, contacts, and pipelines with access permissions and role-based visibility. Keep every rep aligned and every deal moving forward.',
    accent: '#0B5ED7',
    accentLight: '#EBF3FF',
    heroIcon: <BarChart2 size={40} strokeWidth={1.5} />,
    highlights: [
      { icon: <Target size={sz} />, label: 'Lead Sources', value: 'Unlimited' },
      { icon: <Lock size={sz} />, label: 'Access Roles', value: 'Custom' },
      { icon: <Zap size={sz} />, label: 'Pipeline Stages', value: 'Flexible' },
      { icon: <Download size={sz} />, label: 'Bulk Import', value: 'CSV / API' },
    ],
    capabilities: [
      { title: 'Lead Capture & Assignment', description: 'Automatically capture leads from web forms, APIs, and imports. Assign to reps by territory, round-robin, or custom rules.', icon: <Target size={sz} /> },
      { title: 'Pipeline Management', description: 'List views for every pipeline stage. Drag-and-drop deal movement with instant value tracking.', icon: <RefreshCw size={sz} /> },
      { title: 'Contact Management', description: 'Centralized contact database with full activity history, linked deals, and custom field support.', icon: <Users size={sz} /> },
      { title: 'Role-Based Permissions', description: 'Give every team member the right level of access. Admins, managers, and sales reps only see the information relevant to their role.', icon: <Lock size={sz} /> },
      { title: 'Bulk Operations', description: 'Save time by updating multiple records at once. Import contacts, assign owners, and organize your pipeline in just a few clicks.', icon: <Zap size={sz} /> },
      { title: 'Custom Fields & Tags', description: 'Add unlimited custom fields and tags to leads and deals. Filter and segment your pipeline any way you like.', icon: <Tag size={sz} /> },
    ],
    benefits: [
    'Never miss an important customer follow-up',
    'Manage leads and deals from a single dashboard',
    'Give your team the tools they need to stay productive',
    'Reduce time spent on manual data entry',
    'Grow your sales process as your business expands',
    'Protect sensitive customer information',
    ],
    useCases: [
    { title: 'Growing Sales Teams', description: 'Keep your sales team organized, track customer conversations, and ensure every opportunity gets the attention it deserves.' },
    { title: 'Multi-product Companies', description: 'Manage multiple products, services, and customer journeys from one easy-to-use platform.' },
    { title: 'Enterprise Sales', description: 'Support large teams, manage customer information efficiently, and streamline sales operations as your business grows.' },
    ],
  },

  'contact-center': {
    slug: 'contact-center',
    title: 'Contact Center',
    tagline: 'Every channel, one unified inbox.',
    description: 'Communicate with leads and customers across every channel — live chat, WhatsApp, Instagram, telephony, email, and website widget — all inside your CRM.',
    accent: '#0B8A6E',
    accentLight: '#ECFDF5',
    heroIcon: <Phone size={40} strokeWidth={1.5} />,
    highlights: [
      { icon: <MessageSquare size={sz} />, label: 'Channels', value: '8+' },
      { icon: <Zap size={sz} />, label: 'Response Time', value: 'Real-time' },
      { icon: <RefreshCw size={sz} />, label: 'Auto-routing', value: 'Smart' },
      { icon: <BarChart2 size={sz} />, label: 'Chat Analytics', value: 'Built-in' },
    ],
    capabilities: [
      { title: 'Live Chat Widget', description: 'Embed a branded chat widget on your website. Visitors get instant responses; chats are logged to the CRM automatically.', icon: <MessageSquare size={sz} /> },
      { title: 'WhatsApp & Instagram', description: 'Send and receive WhatsApp and Instagram DMs inside the CRM. Full conversation history linked to every contact.', icon: <Smartphone size={sz} /> },
      { title: 'Email Integration', description: 'Two-way email sync with your existing inbox. Every email thread is attached to the right lead or deal.', icon: <Mail size={sz} /> },
      { title: 'Telephony & Call Logging', description: 'Make and receive calls from within the CRM. Calls are logged, recorded, and linked to the contact timeline.', icon: <Phone size={sz} /> },
      { title: 'CRM Web Forms', description: 'Build forms that automatically create leads and contacts when submitted. No manual entry needed.', icon: <ClipboardList size={sz} /> },
      { title: 'Unified Inbox', description: 'One inbox for all channels. Agents see every conversation across every platform in a single queue.', icon: <Grid size={sz} /> },
    ],
    benefits: [
      'Never miss a customer message across any channel',
      'Reduce response time from hours to minutes',
      'Automatic lead creation from chats and forms',
      'Full conversation history on every contact',
      'Route conversations to the right rep automatically',
      'Measure response rates and channel performance',
    ],
    useCases: [
    { title: 'E-commerce Businesses', description: 'Manage customer questions, orders, and returns from one place.'},
    { title: 'Sales Teams', description: 'Turn customer inquiries into organized contacts automatically.'},
    { title: 'Customer Support Teams', description: 'Keep track of every customer conversation and provide better support.'},
    ],
    
  },

  'sales-team-collaboration': {
    slug: 'sales-team-collaboration',
    title: 'Sales Team Collaboration',
    tagline: 'Your team, always in sync.',
    description: 'Work together seamlessly with built-in chat, video calls, shared tasks, a team calendar, file storage, and online documents — all inside the CRM.',
    accent: '#7C3AED',
    accentLight: '#F5F3FF',
    heroIcon: <Users size={40} strokeWidth={1.5} />, // Changed to Users for Team Collaboration
    highlights: [
      { icon: <MessageCircle size={sz} />, label: 'Team Chat', value: 'Real-time' },
      { icon: <Video size={sz} />, label: 'Video Calls', value: 'Built-in' },
      { icon: <Folder size={sz} />, label: 'File Storage', value: 'Shared' },
      { icon: <Calendar size={sz} />, label: 'Calendar', value: 'Team-wide' },
    ],
    capabilities: [
      { title: 'Team Chat & Mentions', description: 'Chat with teammates directly inside the CRM. Mention colleagues on leads and deals to bring them into context instantly.', icon: <MessageCircle size={sz} /> },
      { title: 'Video Calls', description: 'Start video calls with teammates or customers without leaving the CRM. Links shared automatically in the activity log.', icon: <Video size={sz} /> },
      { title: 'Shared Task Management', description: 'Create, assign, and track tasks across the team. See who\'s doing what and when deadlines are approaching.', icon: <CheckSquare size={sz} /> },
      { title: 'Team Calendar', description: 'Shared calendar for meetings, follow-ups, and deadlines. Sync with Google or Outlook to keep everything in one place.', icon: <Calendar size={sz} /> },
      { title: 'File Storage', description: 'Upload, organize, and share files — proposals, contracts, presentations — directly inside deals and contacts.', icon: <Folder size={sz} /> },
      { title: 'Online Documents', description: 'Create and collaborate on documents together in real-time. Version history keeps every edit traceable.', icon: <FileEdit size={sz} /> },
    ],
    benefits: [
    'Keep all customer information in one place',
    'Spend less time searching for updates',
    'Work together more efficiently as a team',
    'Stay on top of important tasks and deadlines',
    'Help new team members get up to speed faster',
    'Improve teamwork and accountability',
    ],
    useCases: [
    { title: 'Remote Teams', description: 'Keep everyone connected and updated, no matter where they work.' },
    { title: 'Project Teams', description: 'Share information, track progress, and collaborate more effectively.' },
    { title: 'Growing Businesses', description: 'Stay organized and keep teams aligned as your business expands.' },
    ],
    cta: 'Collaborate Better',
  },

  'sales-enablement': {
    slug: 'sales-enablement',
    title: 'Sales Enablement',
    tagline: 'Close deals faster with the right tools.',
    description: 'Generate estimates, invoices, and collect payments. Manage your product catalog, inventory, and e-signatures — everything your team needs to close without leaving the CRM.',
    accent: '#D97706',
    accentLight: '#FFFBEB',
    heroIcon: <FileText size={40} strokeWidth={1.5} />,
    highlights: [
      { icon: <FileText size={sz} />, label: 'Estimates', value: 'One-click' },
      { icon: <CreditCard size={sz} />, label: 'Payments', value: 'Integrated' },
      { icon: <PenLine size={sz} />, label: 'e-Signature', value: 'Built-in' },
      { icon: <Package size={sz} />, label: 'Inventory', value: 'Real-time' },
    ],
    capabilities: [
      { title: 'Estimates & Quotes', description: 'Generate professional estimates from your product catalog in one click. Send directly to clients from the CRM.', icon: <FileText size={sz} /> },
      { title: 'Invoice Management', description: 'Create and send invoices tied to deals. Track payment status and send automated reminders.', icon: <Receipt size={sz} /> },
      { title: 'Payment Collection', description: 'Collect payments via integrated payment gateways. Reconcile automatically against deals and invoices.', icon: <CreditCard size={sz} /> },
      { title: 'Product Catalog', description: 'Manage your full product and service catalog with pricing, descriptions, and SKUs. Use in estimates instantly.', icon: <ClipboardList size={sz} /> },
      { title: 'Inventory Tracking', description: 'Track stock levels in real-time as deals close and invoices are raised. Get low-stock alerts automatically.', icon: <Package size={sz} /> },
      { title: 'e-Signature', description: 'Send documents for legally binding e-signature directly from the CRM. Track opens, views, and signatures.', icon: <PenLine size={sz} /> },
    ],
    benefits: [
    'Create quotes and invoices in minutes',
    'Reduce manual paperwork and data entry',
    'Get paid faster with online payment options',
    'Keep products and pricing organized',
    'Collect approvals and signatures online',
    'Manage sales and payments from one place',
    ],
    useCases: [
    { title: 'Sales Teams', description: 'Create quotes, send invoices, and close deals faster from anywhere.' },
    { title: 'Service Businesses', description: 'Automate billing, track payments, and stay organized as your business grows.' },
    { title: 'Product Businesses', description: 'Manage products, pricing, and customer orders from a single platform.' },
    ],
    cta: 'Enable Your Sales Team',
  },

  'analytics-reports': {
    slug: 'analytics-reports',
    title: 'Analytics & Reports',
    tagline: 'Data that drives decisions.',
    description: 'Analyze your sales funnel, track employee performance, and build custom BI dashboards. Sales Intelligence gives you the insights to act — not just observe.',
    accent: '#0B5ED7',
    accentLight: '#EBF3FF',
    heroIcon: <TrendingUp size={40} strokeWidth={1.5} />,
    highlights: [
      { icon: <BarChart2 size={sz} />, label: 'Report Types', value: '12+' },
      { icon: <RefreshCw size={sz} />, label: 'Updates', value: 'Real-time' },
      { icon: <Download size={sz} />, label: 'Export', value: 'CSV / PDF' },
      { icon: <Brain size={sz} />, label: 'Sales Intelligence', value: 'Built-in' },
    ],
    capabilities: [
      { title: 'Sales Funnel Analysis', description: 'See conversion rates at every stage of your pipeline. Identify exactly where leads drop off and fix it.', icon: <TrendingUp size={sz} /> },
      { title: 'Employee Performance', description: 'Track calls made, deals closed, revenue generated, and tasks completed per rep. Drive accountability with data.', icon: <User size={sz} /> },
      { title: 'BI Builder Dashboards', description: 'Build custom dashboards with drag-and-drop widgets. Share with stakeholders or embed in reports.', icon: <LayoutDashboard size={sz} /> },
      { title: 'Sales Intelligence', description: 'AI-powered insights surface your best-performing sources, highest-value deal types, and at-risk leads automatically.', icon: <Brain size={sz} /> },
      { title: 'Activity Reports', description: 'Understand how your team spends time — calls, meetings, emails, notes — broken down by rep and time period.', icon: <Clock size={sz} /> },
      { title: 'One-click Export', description: 'Export any report to CSV or PDF in one click. Schedule automated report delivery to your inbox.', icon: <Download size={sz} /> },
    ],
    benefits: [
    'See how your business is performing at a glance',
    'Make informed decisions with accurate data',
    'Track sales progress more effectively',
    'Identify opportunities for growth',
    'Recognize top-performing team members',
    'Stay updated with real-time business insights',
    ],
    useCases: [
    { title: 'Business Owners', description: 'Monitor sales, team performance, and business growth from one dashboard.' },
    { title: 'Team Leaders', description: 'Track progress, identify challenges, and help teams perform at their best.' },
    { title: 'Operations Teams', description: 'Organize reporting, streamline workflows, and improve day-to-day efficiency.' },
    ],
    cta: 'Explore Analytics',
  },

  'mobile-crm': {
    slug: 'mobile-crm',
    title: 'Mobile CRM',
    tagline: 'Your CRM in your pocket.',
    description: 'Access leads, deals, invoices, payments, telephony, emails, inventory, and calendar from anywhere. Built for sales reps on the move.',
    accent: '#0B8A6E',
    accentLight: '#ECFDF5',
    heroIcon: <Tablet size={40} strokeWidth={1.5} />,
    highlights: [
      { icon: <Smartphone size={sz} />, label: 'Platforms', value: 'iOS & Android' },
      { icon: <Globe size={sz} />, label: 'Offline', value: 'Supported' },
      { icon: <Bell size={sz} />, label: 'Push Alerts', value: 'Real-time' },
      { icon: <ShieldCheck size={sz} />, label: 'Security', value: 'Enterprise' },
    ],
    capabilities: [
      { title: 'Full Lead & Deal Access', description: 'View, update, and create leads and deals on the go. All changes sync instantly to the web app.', icon: <ClipboardList size={sz} /> },
      { title: 'Mobile Telephony', description: 'Make and log calls directly from the mobile app. Call recordings and notes sync automatically.', icon: <Phone size={sz} /> },
      { title: 'Invoices & Payments', description: 'Generate invoices and collect payments from a customer\'s site. No laptop needed to close the loop.', icon: <CreditCard size={sz} /> },
      { title: 'Email & Calendar', description: 'Read, reply, and schedule from your phone. All activity is logged to the right contact automatically.', icon: <Calendar size={sz} /> },
      { title: 'Inventory Check', description: 'Check real-time stock levels before promising delivery. Accurate inventory in the palm of your hand.', icon: <Package size={sz} /> },
      { title: 'Offline Mode', description: 'Work without internet and sync when back online. Never lose data due to a dropped connection.', icon: <Globe size={sz} /> },
    ],
    benefits: [
    'Work from anywhere using your phone or tablet',
    'Never miss an important customer follow-up',
    'Add notes and updates while meeting customers',
    'Access important information on the go',
    'Get new team members started quickly',
    'Keep business data safe and secure',
    ],
    useCases: [
    { title: 'Sales Teams', description: 'Manage customer meetings, updates, and follow-ups from anywhere.' },
    { title: 'Managers on the Go', description: 'Stay connected with your team and business while traveling.' },
    { title: 'Field Service Teams', description: 'Access customer information and update records directly from job sites.' },
    ],
    cta: 'Go Mobile',
  },

  'marketing': {
    slug: 'marketing',
    title: 'Marketing',
    tagline: 'Generate demand. Nurture leads. Close more.',
    description: 'Run email campaigns, social media ads, SMS, telemarketing, and landing pages — all connected to your CRM pipeline so every campaign directly impacts revenue.',
    accent: '#7C3AED',
    accentLight: '#F5F3FF',
    heroIcon: <Megaphone size={40} strokeWidth={1.5} />, // Changed to Megaphone for Marketing
    highlights: [
    { icon: <Mail size={sz} />, label: 'Email Campaigns', value: 'Automated Outreach' },
    { icon: <Send size={sz} />, label: 'SMS Messaging', value: 'Instant Engagement' },
    { icon: <BarChart size={sz} />, label: 'Campaign Analytics', value: 'Performance Insights' },
    { icon: <Globe size={sz} />, label: 'Landing Pages', value: 'Lead Capture' },
    ],
    capabilities: [
      { title: 'Email Campaigns', description: 'Design, schedule, and send email campaigns to segmented CRM audiences. Track opens, clicks, and conversions.', icon: <Mail size={sz} /> },
      { title: 'Social Media Ads', description: 'Run and monitor Facebook and Instagram ad campaigns. Leads from ads flow directly into your CRM pipeline.', icon: <Target size={sz} /> }, // Changed to Target for targeting Ads
      { title: 'SMS Marketing', description: 'Send bulk or personalised SMS to leads at any pipeline stage. Automate follow-up sequences triggered by CRM events.', icon: <MessageSquare size={sz} /> },
      { title: 'Telemarketing', description: 'Manage outbound call campaigns with automated dialler lists, call scripts, and disposition tracking.', icon: <Phone size={sz} /> },
      { title: 'Landing Pages', description: 'Build high-converting landing pages with a drag-and-drop builder. Form submissions auto-create CRM leads.', icon: <Globe size={sz} /> },
      { title: 'Campaign Analytics', description: 'Track Return on Investment across every channel. See which campaigns generate the most pipeline and revenue.', icon: <BarChart size={sz} /> },
    ],
    benefits: [
    'Keep all customer inquiries organized in one place',
    'Follow up with potential customers automatically',
    'Reach customers through email, text messages, and social media',
    'Save time on repetitive marketing tasks',
    'Track which marketing efforts bring the best results',
    'Turn more inquiries into paying customers',
    ],
    useCases: [
    { title: 'Marketing Teams', description: 'Manage campaigns, track customer interest, and follow up automatically.' },
    { title: 'Real Estate & Education', description: 'Capture inquiries, organize contacts, and respond faster to potential customers.' },
    { title: 'Product Launches', description: 'Promote new products across multiple channels from one platform.' },
    ],
    cta: 'Launch Your Campaign',
  },

  'automation-integrations': {
    slug: 'automation-integrations',
    title: 'Automation & Integrations',
    tagline: 'Work less. Achieve more.',
    description: 'Set rules and triggers to automate repetitive tasks. Connect your CRM to the tools you already use via native integrations and open APIs.',
    accent: '#D97706',
    accentLight: '#FFFBEB',
    heroIcon: <Settings size={40} strokeWidth={1.5} />,
    highlights: [
    { icon: <RefreshCw size={sz} />, label: 'Workflows', value: 'Task Automation' },
    { icon: <Link size={sz} />, label: 'Integrations', value: 'Connected Tools' },
    { icon: <Zap size={sz} />, label: 'Triggers', value: 'Instant Actions' },
    { icon: <Globe size={sz} />, label: 'API Access', value: 'Developer Ready' },
    ],

    capabilities: [
        { title: 'Task Automation', description: 'Automatically handle routine work so your team can focus on customers and sales.', icon: <Zap size={sz} /> },
        { title: 'Smart Workflows', description: 'Create step-by-step processes that keep work moving without manual follow-ups.', icon: <RefreshCw size={sz} /> },
        { title: 'Customer Journeys', description: 'Guide customers from their first inquiry to a completed purchase with automated follow-ups.', icon: <Layers size={sz} /> },
        { title: 'Connected Tools', description: 'Bring your email, messaging, payment, and other business tools together in one place.', icon: <Link size={sz} /> },
        { title: 'Flexible Connections', description: 'Connect the platform with the tools and systems your business already uses.', icon: <Globe size={sz} /> },
        { title: 'App Automation', description: 'Share information automatically between different apps and save time on repetitive tasks.', icon: <Plug size={sz} /> },
    ],
    benefits: [
    'Reduce repetitive tasks and save valuable time',
    'Automatically assign customer inquiries to the right team member',
    'Stay connected with customers through timely follow-ups',
    'Keep your business tools working together seamlessly',
    'Create efficient processes without extra complexity',
    'Support business growth without increasing workload',
    ],

    useCases: [
    { title: 'Customer Follow-Ups', description: 'Automatically send reminders, follow-ups, and updates so no customer inquiry is missed.' },
    { title: 'Connected Business Tools', description: 'Keep customer information up to date across your email, accounting, and business applications.' },
    { title: 'Team Productivity', description: 'Reduce manual work, improve coordination, and help teams focus on serving customers.' },
    ],
    cta: 'Automate Your CRM',
  },

  'copilot-in-crm': {
    slug: 'copilot-in-crm',
    title: 'CoPilot in CRM',
    tagline: 'AI that works while you sell.',
    description: 'CoPilot transcribes your calls in real-time, summarizes conversations, and auto-completes deal fields — so your reps focus on selling, not data entry.',
    accent: '#0B5ED7',
    accentLight: '#EBF3FF',
    heroIcon: <Brain size={40} strokeWidth={1.5} />,
    highlights: [
      { icon: <Mic size={sz} />, label: 'Transcription', value: 'Real-time' },
      { icon: <FileCheck size={sz} />, label: 'Summaries', value: 'Auto' },
      { icon: <Sparkles size={sz} />, label: 'Field Fill', value: 'AI-powered' },
      { icon: <Languages size={sz} />, label: 'Languages', value: 'Multi' },
    ],
    capabilities: [
      { title: 'Call Transcription', description: 'Every call is transcribed in real-time and stored in the contact timeline. Search and reference any conversation later.', icon: <Mic size={sz} /> },
      { title: 'Call Summaries', description: 'CoPilot generates a concise summary of each call — key points, next steps, and sentiment — automatically after every call.', icon: <FileCheck size={sz} /> },
      { title: 'Field Autocompletion', description: 'AI reads call and email content to suggest and fill deal fields — company, budget, timeline, and more — with one click.', icon: <Sparkles size={sz} /> },
      { title: 'Sentiment Analysis', description: 'Understand customer tone and engagement level from calls. Flag at-risk deals before they go cold.', icon: <Lightbulb size={sz} /> },
      { title: 'Next-Step Suggestions', description: 'CoPilot recommends the best next action based on the call outcome — send a proposal, schedule a demo, escalate to manager.', icon: <Target size={sz} /> },
      { title: 'Multi-language Support', description: 'Transcribe and summarize calls in multiple languages. Ideal for global and multi-regional sales teams.', icon: <Languages size={sz} /> },
    ],
    benefits: [
    'Spend less time taking notes after calls',
    'Keep important customer conversations organized',
    'Automatically save key details from meetings and calls',
    'Help teams learn from successful customer interactions',
    'Identify customer concerns before they become problems',
    'Get new team members up to speed faster',
    ],
    useCases: [
    { title: 'Busy Sales Teams', description: 'Automatically capture meeting notes and key discussion points so teams can focus on customers.' },
    { title: 'Team Managers', description: 'Review customer conversations and help team members improve their communication skills.' },
    { title: 'Global Businesses', description: 'Share customer insights across teams and locations without communication barriers.' },
    ],
    
  },
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function FeaturePage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);
  const capabilitiesRef = useRef<HTMLDivElement>(null);

  const feature = slug ? featureData[slug] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    if (!feature) return;

    // Hero fade-in
    if (heroRef.current) {
      gsap.fromTo(heroRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: 'power3.out' }
      );
    }

    // Capability cards scroll-in
    const cards = document.querySelectorAll('[data-feature-card]');
    cards.forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, y: 40 },
        {
          scrollTrigger: { trigger: card, start: 'top 88%', end: 'top 55%', scrub: 0.4 },
          opacity: 1, y: 0, delay: i * 0.05, ease: 'power3.out'
        }
      );
    });

    return () => { ScrollTrigger.getAll().forEach(t => t.kill()); };
  }, [feature]);

  if (!feature) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center" style={{ background: '#F0F6FF', fontFamily: 'Inter, sans-serif' }}>
        <Navbar onNavClick={() => {}} />
        <div className="text-center mt-32">
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px', color: '#94A3B8' }}>
            <AlertCircle size={64} strokeWidth={1.2} />
          </div>
          <h1 style={{ fontSize: '32px', fontWeight: 800, color: '#0F1F3D', fontFamily: 'Inter, sans-serif', marginBottom: '12px' }}>Feature not found</h1>
          <p style={{ color: '#64748B', marginBottom: '28px', fontFamily: 'Inter, sans-serif' }}>The feature page you're looking for doesn't exist.</p>
          <button onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold"
            style={{ background: '#0B5ED7', color: '#fff', fontSize: '15px', fontFamily: 'Inter, sans-serif' }}>
            <ArrowLeft size={16} /> Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: '#F8FAFF', fontFamily: 'Inter, sans-serif' }}>
      <Navbar onNavClick={(section: string) => { navigate('/'); setTimeout(() => { const el = document.getElementById(section); if (el) el.scrollIntoView({ behavior: 'smooth' }); }, 100); }} />

      {/* ── HERO ── */}
      <section style={{ background: `linear-gradient(135deg, ${feature.accentLight} 0%, #F8FAFF 60%)`, paddingTop: '56px', paddingBottom: '40px', position: 'relative', overflow: 'hidden' }}>
        {/* Background blobs */}
        <div className="absolute pointer-events-none" style={{ width: '600px', height: '600px', borderRadius: '50%', background: `radial-gradient(circle, ${feature.accent}10 0%, transparent 65%)`, top: '-150px', right: '-150px' }} />
        <div className="absolute pointer-events-none" style={{ width: '400px', height: '400px', borderRadius: '50%', background: `radial-gradient(circle, ${feature.accent}08 0%, transparent 65%)`, bottom: '-100px', left: '-100px' }} />

        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 relative z-10">
          {/* Breadcrumb */}
          <button onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 mb-4 group"
            style={{ color: '#64748B', fontSize: '14px', fontWeight: 500, fontFamily: 'Inter, sans-serif' }}>
            <ArrowLeft size={15} style={{ transition: 'transform 0.2s' }} className="group-hover:-translate-x-1" />
            Back to Home
          </button>

          <div ref={heroRef} className="flex flex-col lg:flex-row items-start lg:items-center gap-12">
            {/* Left */}
            <div className="flex-1">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-5"
                style={{ backgroundColor: feature.accent + '15', border: `1px solid ${feature.accent}30` }}>
                <span style={{ color: feature.accent, display: 'flex', alignItems: 'center' }}>{feature.heroIcon && React.cloneElement(feature.heroIcon as React.ReactElement, { size: 16, strokeWidth: 2 })}</span>
                <span style={{ color: feature.accent, fontWeight: 700, fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif' }}>CRM Feature</span>
              </div>

              <h1 style={{ fontSize: 'clamp(36px, 5vw, 60px)', color: '#0F1F3D', fontFamily: 'Inter, sans-serif', fontWeight: 800, lineHeight: 1.1, marginBottom: '16px' }}>
                {feature.title}
              </h1>
              <p style={{ fontSize: '20px', color: feature.accent, fontWeight: 600, marginBottom: '16px', fontFamily: 'Inter, sans-serif' }}>{feature.tagline}</p>
              <p style={{ fontSize: '17px', color: '#64748B', lineHeight: 1.75, maxWidth: '520px', marginBottom: '36px', fontFamily: 'Inter, sans-serif' }}>{feature.description}</p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3">
                
                <button
                  onClick={() => navigate('/')}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold transition-all"
                  style={{ background: '#fff', color: '#0F1F3D', fontSize: '15px', border: '1.5px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', fontFamily: 'Inter, sans-serif' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = feature.accent; e.currentTarget.style.color = feature.accent; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#E2E8F0'; e.currentTarget.style.color = '#0F1F3D'; }}>
                  See All Features
                </button>
              </div>
            </div>

            {/* Right — Highlight stats */}
            <div className="w-full lg:w-auto grid grid-cols-2 gap-4 lg:min-w-[340px]">
              {feature.highlights.map((h, i) => (
                <div key={i} className="rounded-2xl p-5"
                  style={{ background: '#fff', border: `1.5px solid ${feature.accent}20`, boxShadow: `0 4px 16px ${feature.accent}10` }}>
                  <div style={{ color: feature.accent, marginBottom: '6px', display: 'flex' }}>{h.icon}</div>
                  <div style={{ fontSize: '20px', fontWeight: 800, color: feature.accent, fontFamily: 'Inter, sans-serif', marginBottom: '2px' }}>{h.value}</div>
                  <div style={{ fontSize: '12px', color: '#94A3B8', fontWeight: 500, fontFamily: 'Inter, sans-serif' }}>{h.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── DIVIDER ── */}
      <div style={{ height: '3px', background: `linear-gradient(90deg, transparent, ${feature.accent}40, transparent)` }} />

      {/* ── CAPABILITIES ── */}
      <section style={{ paddingTop: '48px', paddingBottom: '48px', background: '#fff' }}>
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4"
              style={{ backgroundColor: feature.accent + '12', border: `1px solid ${feature.accent}25` }}>
              <span style={{ color: feature.accent, fontWeight: 700, fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif' }}>✦ What's Included</span>
            </div>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', color: '#0F1F3D', fontFamily: 'Inter, sans-serif', fontWeight: 800, lineHeight: 1.15 }}>
              Everything inside {feature.title}
            </h2>
          </div>

          <div ref={capabilitiesRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {feature.capabilities.map((cap, i) => (
              <div key={i} data-feature-card
                className="rounded-2xl p-6 group cursor-default"
                style={{ background: '#F8FAFF', border: `1.5px solid ${feature.accent}15`, transition: 'all 0.28s ease', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}
                onMouseEnter={e => { e.currentTarget.style.background = feature.accentLight; e.currentTarget.style.borderColor = feature.accent + '35'; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 16px 40px ${feature.accent}14`; }}
                onMouseLeave={e => { e.currentTarget.style.background = '#F8FAFF'; e.currentTarget.style.borderColor = feature.accent + '15'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.03)'; }}>
                <div style={{ color: feature.accent, marginBottom: '12px', display: 'flex' }}>{cap.icon}</div>
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#0F1F3D', fontFamily: 'Inter, sans-serif', marginBottom: '8px' }}>{cap.title}</h3>
                <p style={{ fontSize: '13.5px', color: '#64748B', lineHeight: 1.7, fontFamily: 'Inter, sans-serif' }}>{cap.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BENEFITS + USE CASES ── */}
      <section style={{ paddingTop: '48px', paddingBottom: '48px', background: `linear-gradient(160deg, ${feature.accentLight} 0%, #F8FAFF 100%)` }}>
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Benefits */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-5"
                style={{ backgroundColor: feature.accent + '12', border: `1px solid ${feature.accent}25` }}>
                <span style={{ color: feature.accent, fontWeight: 700, fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif' }}>✦ Why It Matters</span>
              </div>
              <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 36px)', color: '#0F1F3D', fontFamily: 'Inter, sans-serif', fontWeight: 800, marginBottom: '24px', lineHeight: 1.2 }}>
                What your team gains
              </h2>
              <ul className="space-y-4">
                {feature.benefits.map((b, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: feature.accent, boxShadow: `0 2px 8px ${feature.accent}40` }}>
                      <Check size={11} color="#fff" strokeWidth={3} />
                    </div>
                    <span style={{ fontSize: '15px', color: '#374151', lineHeight: 1.6, fontFamily: 'Inter, sans-serif' }}>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Use cases */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-5"
                style={{ backgroundColor: feature.accent + '12', border: `1px solid ${feature.accent}25` }}>
                <span style={{ color: feature.accent, fontWeight: 700, fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'Inter, sans-serif' }}>✦ Use Cases</span>
              </div>
              <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 36px)', color: '#0F1F3D', fontFamily: 'Inter, sans-serif', fontWeight: 800, marginBottom: '24px', lineHeight: 1.2 }}>
                Who uses this
              </h2>
              <div className="space-y-4">
                {feature.useCases.map((uc, i) => (
                  <div key={i} className="rounded-2xl p-5"
                    style={{ background: '#fff', border: `1.5px solid ${feature.accent}18`, boxShadow: `0 2px 12px ${feature.accent}08` }}>
                    <div className="flex items-center gap-2 mb-2">
                      <ChevronRight size={14} color={feature.accent} />
                      <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#0F1F3D', fontFamily: 'Inter, sans-serif' }}>{uc.title}</h4>
                    </div>
                    <p style={{ fontSize: '13.5px', color: '#64748B', lineHeight: 1.65, fontFamily: 'Inter, sans-serif' }}>{uc.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section style={{ paddingTop: '40px', paddingBottom: '40px', background: `linear-gradient(135deg, ${feature.accent} 0%, ${feature.accent}BB 100%)` }}>
        <div className="max-w-[900px] mx-auto px-4 sm:px-6 text-center">
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', color: '#fff', fontFamily: 'Inter, sans-serif', fontWeight: 800, marginBottom: '14px', lineHeight: 1.15 }}>
            Ready to get started with {feature.title}?
          </h2>
          <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.8)', marginBottom: '32px', lineHeight: 1.65, fontFamily: 'Inter, sans-serif' }}>
            Join thousands of sales teams already using this feature to close more deals.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold transition-all"
              style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', fontSize: '16px', border: '2px solid rgba(255,255,255,0.4)', backdropFilter: 'blur(8px)', fontFamily: 'Inter, sans-serif' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.25)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)'; }}>
              Explore All Features
            </button>
          </div>
        </div>
      </section>

      <Footer onNavClick={(e: React.MouseEvent<HTMLAnchorElement>, href: string) => { navigate('/'); setTimeout(() => { const el = document.getElementById(href); if (el) el.scrollIntoView({ behavior: 'smooth' }); }, 100); }} onLegalClick={() => {}} />
    </div>
  );
}