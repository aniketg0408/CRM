import { useLocation } from "react-router-dom";
import { useEffect } from "react";

import { useState } from "react";
import {
  Mail, Phone, MapPin, Clock, MessageCircle, ArrowRight,
  Headphones, Building2, Send, CheckCircle, ChevronDown,
  Zap, Shield, Users,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export function ContactSupport() {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    fullName: "", email: "", phone: "", company: "",
    inquiryType: "", subject: "", message: "",
  });
  const [loading, setLoading]     = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused]     = useState<string | null>(null);

useEffect(() => {
  const params = new URLSearchParams(location.search);
  const type = params.get("type");

  if (type === "demo") {
    setFormData((prev) => ({
      ...prev,
      inquiryType: "demo",
      subject: "Demo Request",
    }));
  }
}, [location.search]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleClear = () =>
    setFormData({ fullName: "", email: "", phone: "", company: "", inquiryType: "", subject: "", message: "" });

  // ── TODO: wire up your API / EmailJS here ──
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // TODO: add emailjs + createCustomerSupport calls
    await new Promise((r) => setTimeout(r, 1200)); // remove this placeholder delay
    setLoading(false);
    setSubmitted(true);
    handleClear();
  };

  // ── FAQ scroll helper ──
  const handleVisitFaq = () => {
    const isHome = location.pathname === "/";
    if (isHome) {
      // Already on home page — just scroll
      document.getElementById("faq")?.scrollIntoView({ behavior: "smooth" });
    } else {
      // Navigate to home, then scroll after mount
      navigate("/");
      setTimeout(() => {
        document.getElementById("faq")?.scrollIntoView({ behavior: "smooth" });
      }, 150);
    }
  };

  /* ── Data ── */
  const channels = [
    {
      Icon: Headphones, title: "Customer Support", tag: "24/7 Available", tagColor: "#10B981",
      accent: "#0B5ED7",
      bgGrad: "linear-gradient(135deg,rgba(11,94,215,0.06) 0%,rgba(30,136,229,0.02) 100%)",
      border: "rgba(11,94,215,0.15)",
      iconBg: "rgba(11,94,215,0.10)",
      details: [
        { Icon: Mail,  label: "Email",        value: "info@averlonworld.com" },
        { Icon: Phone, label: "Phone",        value: "+91 9892440788" },
        { Icon: Clock, label: "Availability", value: "24/7 Support Available" },
      ],
    },
    {
      Icon: Building2, title: "Sales Inquiries", tag: "Mon–Fri", tagColor: "#7C3AED",
      accent: "#7C3AED",
      bgGrad: "linear-gradient(135deg,rgba(124,58,237,0.06) 0%,rgba(124,58,237,0.02) 100%)",
      border: "rgba(124,58,237,0.15)",
      iconBg: "rgba(124,58,237,0.10)",
      details: [
        { Icon: Mail,  label: "Email", value: "info@averlonworld.com" },
        { Icon: Phone, label: "Phone", value: "+91 9892440788" },
        { Icon: Clock, label: "Hours", value: "9AM – 6PM IST" },
      ],
    },
    {
      Icon: MapPin, title: "Our Office", tag: "Thane West", tagColor: "#059669",
      accent: "#059669",
      bgGrad: "linear-gradient(135deg,rgba(5,150,105,0.06) 0%,rgba(5,150,105,0.02) 100%)",
      border: "rgba(5,150,105,0.15)",
      iconBg: "rgba(5,150,105,0.10)",
      details: [
        { Icon: MapPin, label: "Address", value: "5th Floor, Lodha Supremus II, Unit No. A-533/A-507, Wagle Industrial Estate, Thane West, Maharashtra 400604" },
      ],
    },
  ];

  const inquiryOptions = [
    { value: "technical",  label: "⚙️  Technical Support" },
    { value: "sales",      label: "💼  Sales Inquiry" },
    { value: "billing",    label: "💳  Billing Question" },
    { value: "demo",       label: "🎯  Demo Request" },
    { value: "feature",    label: "✨  Feature Request" },
    { value: "bug",        label: "🐛  Bug Report" },
    { value: "enterprise", label: "🏢  Enterprise Custom Plan" },
    { value: "other",      label: "💬  Other" },
  ];

  const trustBadges = [
    { Icon: Zap,    color: "#0B5ED7", text: "Instant Confirmation Email" },
    { Icon: Shield, color: "#10B981", text: "Enterprise-Grade Security" },
    { Icon: Users,  color: "#7C3AED", text: "Dedicated Support Team" },
  ];

  /* ── Shared input styles ── */
  const inputBase: React.CSSProperties = {
    width: "100%", padding: "10px 14px",
    background: "#F8FAFC", border: "1.5px solid #E2E8F0",
    borderRadius: "10px", fontSize: "13px", color: "#1A1A1A",
    outline: "none", transition: "all 0.18s",
    fontFamily: "Inter, sans-serif", boxSizing: "border-box",
  };
  const inputActive: React.CSSProperties = {
    ...inputBase, borderColor: "#0B5ED7", background: "#FFFFFF",
    boxShadow: "0 0 0 3px rgba(11,94,215,0.08)",
  };
  const fi = (field: string) => focused === field ? inputActive : inputBase;

  const labelStyle: React.CSSProperties = {
    display: "block", fontSize: "11px", fontWeight: 700,
    color: "#374151", textTransform: "uppercase",
    letterSpacing: "0.07em", marginBottom: "7px",
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#F8FAFC", fontFamily: "Inter, sans-serif" }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap');

        @keyframes fadeUp  { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeIn  { from{opacity:0} to{opacity:1} }
        @keyframes slideUp { from{opacity:0;transform:translateY(36px)} to{opacity:1;transform:translateY(0)} }
        @keyframes bounce  { 0%{transform:scale(0)} 60%{transform:scale(1.18)} 100%{transform:scale(1)} }
        @keyframes spin    { to{transform:rotate(360deg)} }
        @keyframes pulse   { 0%,100%{opacity:1} 50%{opacity:.4} }

        .cs-hero  { animation: fadeIn  .45s ease both }
        .cs-badge { animation: fadeUp  .55s .05s ease both }
        .cs-h1    { animation: fadeUp  .55s .12s ease both }
        .cs-sub   { animation: fadeUp  .55s .20s ease both }
        .cs-stats { animation: fadeUp  .55s .28s ease both }
        .cs-cards { animation: slideUp .5s  .10s ease both }
        .cs-form  { animation: slideUp .5s  .18s ease both }

        .ch-card {
          background:#fff; border-radius:16px; padding:24px;
          transition:transform .22s ease,box-shadow .22s ease;
        }
        .ch-card:hover { transform:translateY(-4px); box-shadow:0 20px 48px rgba(11,94,215,0.12); }

        .submit-btn {
          display:inline-flex; align-items:center; gap:8px;
          padding:11px 28px; border-radius:10px; border:none; color:#fff;
          font-size:14px; font-weight:700; cursor:pointer;
          background:linear-gradient(135deg,#0B5ED7,#1E88E5);
          box-shadow:0 6px 20px rgba(11,94,215,0.35);
          transition:all .2s ease; font-family:'Plus Jakarta Sans',sans-serif;
        }
        .submit-btn:hover:not(:disabled) { transform:translateY(-2px); box-shadow:0 10px 28px rgba(11,94,215,0.45); }
        .submit-btn:disabled { opacity:.65; cursor:not-allowed; }

        .clear-btn {
          padding:11px 20px; border-radius:10px; border:1.5px solid #E2E8F0;
          background:#fff; color:#64748B; font-size:13px; font-weight:600;
          cursor:pointer; transition:all .15s; font-family:Inter,sans-serif;
        }
        .clear-btn:hover { background:#F8FAFC; border-color:#CBD5E1; }

        .faq-banner {
          border-radius:20px; padding:52px 40px; text-align:center;
          background:linear-gradient(135deg,#0D2244 0%,#1A2F5A 55%,#1E3A6E 100%);
          position:relative; overflow:hidden;
          box-shadow:0 16px 48px rgba(11,94,215,0.22);
        }

        .visit-btn {
          display:inline-flex; align-items:center; gap:8px;
          padding:12px 24px; border-radius:10px; background:#fff;
          color:#0B5ED7; font-weight:700; font-size:14px; border:none;
          cursor:pointer; transition:all .2s ease;
          font-family:'Plus Jakarta Sans',sans-serif;
          box-shadow:0 6px 20px rgba(0,0,0,0.15);
        }
        .visit-btn:hover { transform:translateY(-2px); box-shadow:0 10px 28px rgba(0,0,0,0.20); }

        @media(max-width:640px){
          .cs-form-wrap { padding:24px 18px !important; }
          .faq-banner   { padding:36px 22px !important; }
          .two-col      { grid-template-columns:1fr !important; }
        }
      `}</style>

      {/* ══════════════ HERO ══════════════ */}
      <div className="cs-hero" style={{
        background: "linear-gradient(135deg,#0D2244 0%,#1A2F5A 45%,#1E3A6E 100%)",
        position: "relative", overflow: "hidden",
        paddingTop: "76px", paddingBottom: "100px", textAlign: "center",
      }}>
        {/* Dot grid */}
        <div style={{ position:"absolute", inset:0, opacity:.07, pointerEvents:"none",
          backgroundImage:"radial-gradient(circle at 1px 1px,rgba(255,255,255,.8) 1px,transparent 0)",
          backgroundSize:"28px 28px" }} />
        {/* Glow blobs */}
        <div style={{ position:"absolute", top:"-80px", left:"12%", width:"420px", height:"420px",
          borderRadius:"50%", background:"radial-gradient(circle,rgba(11,94,215,.22) 0%,transparent 70%)",
          filter:"blur(44px)", pointerEvents:"none" }} />
        <div style={{ position:"absolute", bottom:"-60px", right:"8%", width:"340px", height:"340px",
          borderRadius:"50%", background:"radial-gradient(circle,rgba(30,136,229,.18) 0%,transparent 70%)",
          filter:"blur(44px)", pointerEvents:"none" }} />

        <div style={{ position:"relative", zIndex:10, maxWidth:"620px", margin:"0 auto", padding:"0 24px" }}>

          {/* Live badge */}
          <div className="cs-badge" style={{ display:"inline-flex", alignItems:"center", gap:"8px",
            padding:"6px 16px", borderRadius:"100px",
            background:"rgba(255,255,255,0.10)", border:"1px solid rgba(255,255,255,0.18)",
            marginBottom:"22px" }}>
            <span style={{ width:"7px", height:"7px", borderRadius:"50%", backgroundColor:"#10B981",
              display:"block", animation:"pulse 2s infinite" }} />
            <span style={{ color:"rgba(255,255,255,.88)", fontSize:"12px", fontWeight:600,
              fontFamily:"Plus Jakarta Sans,sans-serif" }}>
              24/7 Support Available — Average response under 2 hours
            </span>
          </div>

          {/* H1 */}
          <h1 className="cs-h1" style={{
            fontSize:"clamp(28px,5vw,50px)", fontWeight:800, color:"#FFFFFF",
            fontFamily:"Plus Jakarta Sans,sans-serif", lineHeight:1.12,
            marginBottom:"16px", letterSpacing:"-0.02em",
          }}>
            Get In Touch with<br />
            <span style={{ background:"linear-gradient(90deg,#7DB8F7,#93C5FD)",
              WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
              CRM Support
            </span>
          </h1>

          {/* Subtitle */}
          <p className="cs-sub" style={{ fontSize:"15px", color:"rgba(255,255,255,.62)",
            lineHeight:1.65, maxWidth:"400px", margin:"0 auto 40px" }}>
            Our support team is ready to help you with questions, technical issues, or sales inquiries — any time.
          </p>

          {/* Stats */}
          <div className="cs-stats" style={{ display:"flex", justifyContent:"center", gap:"40px", flexWrap:"wrap" }}>
            {[
              { value:"500+", label:"Companies Onboarded" },
              { value:"24/7", label:"Support Available" },
              { value:"98%",  label:"Satisfaction Rate" },
            ].map((s, i) => (
              <div key={i} style={{ textAlign:"center" }}>
                <div style={{ fontSize:"28px", fontWeight:800, color:"#FFFFFF",
                  fontFamily:"Plus Jakarta Sans,sans-serif", lineHeight:1 }}>{s.value}</div>
                <div style={{ fontSize:"11px", color:"rgba(255,255,255,.48)", fontWeight:500, marginTop:"5px" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════ BODY ══════════════ */}
      <div style={{ maxWidth:"1100px", margin:"0 auto", padding:"0 24px" }}>

        {/* Channel cards — overlap hero */}
        <div className="cs-cards" style={{ position:"relative", zIndex:10, marginTop:"-52px", marginBottom:"52px" }}>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(270px,1fr))", gap:"16px" }}>
            {channels.map((ch, i) => (
              <div key={i} className="ch-card" style={{ border:`1.5px solid ${ch.border}`}}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"18px" }}>
                  <div style={{ width:"44px", height:"44px", borderRadius:"12px", background:ch.iconBg,
                    border:`1px solid ${ch.border}`, display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <ch.Icon size={18} style={{ color:ch.accent }} />
                  </div>
                  <span style={{ fontSize:"10px", fontWeight:700, padding:"3px 10px", borderRadius:"100px",
                    backgroundColor:`${ch.tagColor}1A`, color:ch.tagColor, letterSpacing:"0.04em" }}>
                    {ch.tag}
                  </span>
                </div>

                <h3 style={{ fontSize:"15px", fontWeight:700, color:"#1A1A1A", marginBottom:"14px",
                  fontFamily:"Plus Jakarta Sans,sans-serif" }}>
                  {ch.title}
                </h3>

                <div style={{ display:"flex", flexDirection:"column", gap:"11px" }}>
                  {ch.details.map((d, j) => (
                    <div key={j} style={{ display:"flex", alignItems:"flex-start", gap:"10px" }}>
                      <div style={{ width:"26px", height:"26px", borderRadius:"8px", background:ch.iconBg,
                        display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:"1px" }}>
                        <d.Icon size={12} style={{ color:ch.accent }} />
                      </div>
                      <div>
                        <div style={{ fontSize:"10px", fontWeight:700, color:"#94A3B8",
                          textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:"2px" }}>{d.label}</div>
                        <div style={{ fontSize:"12.5px", color:"#374151", lineHeight:1.5 }}>{d.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust badges */}
        <div style={{ display:"flex", justifyContent:"center", gap:"12px", flexWrap:"wrap", marginBottom:"52px" }}>
          {trustBadges.map((b, i) => (
            <div key={i} style={{ display:"flex", alignItems:"center", gap:"7px", padding:"8px 16px",
              borderRadius:"100px", backgroundColor:"#FFFFFF", border:"1.5px solid #E2E8F0",
              boxShadow:"0 1px 4px rgba(0,0,0,0.04)" }}>
              <b.Icon size={13} style={{ color:b.color }} />
              <span style={{ fontSize:"12px", fontWeight:600, color:"#374151" }}>{b.text}</span>
            </div>
          ))}
        </div>

        {/* Section header */}
        <div style={{ textAlign:"center", marginBottom:"32px" }}>
          <div style={{ display:"flex", alignItems:"center", gap:"12px", justifyContent:"center", marginBottom:"16px" }}>
            <div style={{ height:"1px", width:"48px", background:"linear-gradient(90deg,transparent,#CBD5E1)" }} />
            <div style={{ display:"inline-flex", alignItems:"center", gap:"7px", padding:"5px 14px",
              borderRadius:"100px", backgroundColor:"#EBF3FF", border:"1px solid #C7DFFE" }}>
              <Send size={11} style={{ color:"#0B5ED7" }} />
              <span style={{ fontSize:"11px", fontWeight:700, color:"#0B5ED7", letterSpacing:"0.06em",
                textTransform:"uppercase" }}>Send a Message</span>
            </div>
            <div style={{ height:"1px", width:"48px", background:"linear-gradient(90deg,#CBD5E1,transparent)" }} />
          </div>
          <h2 style={{ fontSize:"clamp(22px,3.5vw,34px)", fontWeight:800, color:"#1A1A1A",
            fontFamily:"Plus Jakarta Sans,sans-serif", letterSpacing:"-0.02em", marginBottom:"8px" }}>
            Contact Support Form
          </h2>
          <p style={{ fontSize:"14px", color:"#64748B" }}>
            Fill out the form and our team will respond within 24 hours
          </p>
        </div>

        {/* ── Form / Success ── */}
        {submitted ? (
          <div className="cs-form" style={{ background:"#FFFFFF", borderRadius:"20px",
            border:"1.5px solid #E2E8F0", padding:"72px 36px",
            boxShadow:"0 8px 32px rgba(11,94,215,0.08)", textAlign:"center", marginBottom:"48px" }}>
            <div style={{ width:"72px", height:"72px", borderRadius:"50%", backgroundColor:"#ECFDF5",
              display:"flex", alignItems:"center", justifyContent:"center",
              margin:"0 auto 20px", animation:"bounce 0.4s ease both" }}>
              <CheckCircle size={36} style={{ color:"#10B981" }} />
            </div>
            <h3 style={{ fontSize:"22px", fontWeight:800, color:"#1A1A1A",
              fontFamily:"Plus Jakarta Sans,sans-serif", marginBottom:"8px" }}>
              Message Sent Successfully!
            </h3>
            <p style={{ fontSize:"14px", color:"#64748B", maxWidth:"360px",
              margin:"0 auto 28px", lineHeight:1.65 }}>
              We've received your message and will get back to you within 24 hours. Check your email for a confirmation.
            </p>
            <button className="submit-btn" onClick={() => setSubmitted(false)}>
              Send Another Message
            </button>
          </div>
        ) : (
          <div className="cs-form cs-form-wrap" style={{ background:"#FFFFFF", borderRadius:"20px",
            border:"1.5px solid #E2E8F0", padding:"36px",
            boxShadow:"0 8px 32px rgba(11,94,215,0.08)", marginBottom:"48px" }}>
            <form onSubmit={handleSubmit}>

              {/* Row 1: Name + Email */}
              <div className="two-col" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"16px", marginBottom:"16px" }}>
                <div>
                  <label style={labelStyle}>Full Name <span style={{ color:"#0B5ED7" }}>*</span></label>
                  <input name="fullName" value={formData.fullName} onChange={handleChange} required
                    placeholder="Aarav Sharma" style={fi("fullName")}
                    onFocus={() => setFocused("fullName")} onBlur={() => setFocused(null)} />
                </div>
                <div>
                  <label style={labelStyle}>Email Address <span style={{ color:"#0B5ED7" }}>*</span></label>
                  <input name="email" type="email" value={formData.email} onChange={handleChange} required
                    placeholder="aarav@company.com" style={fi("email")}
                    onFocus={() => setFocused("email")} onBlur={() => setFocused(null)} />
                </div>
              </div>

              {/* Row 2: Phone + Company */}
              <div className="two-col" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"16px", marginBottom:"16px" }}>
                <div>
                  <label style={labelStyle}>Phone Number</label>
                  <input name="phone" value={formData.phone} onChange={handleChange}
                    placeholder="+91 98765 43210" style={fi("phone")}
                    onFocus={() => setFocused("phone")} onBlur={() => setFocused(null)} />
                </div>
                <div>
                  <label style={labelStyle}>Company Name</label>
                  <input name="company" value={formData.company} onChange={handleChange}
                    placeholder="Acme Corp" style={fi("company")}
                    onFocus={() => setFocused("company")} onBlur={() => setFocused(null)} />
                </div>
              </div>

              {/* Row 3: Inquiry Type + Subject */}
              <div className="two-col" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"16px", marginBottom:"16px" }}>
                <div>
                  <label style={labelStyle}>Inquiry Type <span style={{ color:"#0B5ED7" }}>*</span></label>
                  <div style={{ position:"relative" }}>
                    <select name="inquiryType" value={formData.inquiryType} onChange={handleChange} required
                      style={{ ...fi("inquiryType"), appearance:"none", paddingRight:"36px",
                        color: formData.inquiryType ? "#1A1A1A" : "#94A3B8", cursor:"pointer" }}
                      onFocus={() => setFocused("inquiryType")} onBlur={() => setFocused(null)}>
                      <option value="" disabled>Select type…</option>
                      {inquiryOptions.map((o) => (
                        <option key={o.value} value={o.value}>{o.label}</option>
                      ))}
                    </select>
                    <ChevronDown size={14} style={{ position:"absolute", right:"12px", top:"50%",
                      transform:"translateY(-50%)", color:"#94A3B8", pointerEvents:"none" }} />
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Subject <span style={{ color:"#0B5ED7" }}>*</span></label>
                  <input name="subject" value={formData.subject} onChange={handleChange} required
                    placeholder="How can we help?" style={fi("subject")}
                    onFocus={() => setFocused("subject")} onBlur={() => setFocused(null)} />
                </div>
              </div>

              {/* Message */}
              <div style={{ marginBottom:"24px" }}>
                <label style={labelStyle}>Message <span style={{ color:"#0B5ED7" }}>*</span></label>
                <textarea name="message" value={formData.message} onChange={handleChange} required rows={5}
                  placeholder="Please describe your inquiry in detail…"
                  style={{ ...fi("message"), resize:"none", lineHeight:1.6 } as React.CSSProperties}
                  onFocus={() => setFocused("message")} onBlur={() => setFocused(null)} />
              </div>

              {/* Actions */}
              <div style={{ display:"flex", justifyContent:"flex-end", alignItems:"center", gap:"12px",
                paddingTop:"20px", borderTop:"1px solid #F1F5F9" }}>
                <button type="button" className="clear-btn" onClick={handleClear}>Clear</button>
                <button type="submit" className="submit-btn" disabled={loading}>
                  {loading ? (
                    <>
                      <div style={{ width:"14px", height:"14px", border:"2px solid rgba(255,255,255,.35)",
                        borderTopColor:"#fff", borderRadius:"50%", animation:"spin .7s linear infinite" }} />
                      Sending…
                    </>
                  ) : (
                    <><Send size={14} /> Send Message</>
                  )}
                </button>
              </div>

            </form>
          </div>
        )}

        {/* FAQ CTA Banner */}
        <div style={{ marginBottom:"64px" }}>
          <div className="faq-banner">
            <div style={{ position:"absolute", top:0, left:"8%", width:"220px", height:"220px", borderRadius:"50%",
              background:"radial-gradient(circle,rgba(11,94,215,.25) 0%,transparent 70%)",
              filter:"blur(36px)", pointerEvents:"none" }} />
            <div style={{ position:"absolute", bottom:0, right:"4%", width:"220px", height:"220px", borderRadius:"50%",
              background:"radial-gradient(circle,rgba(30,136,229,.15) 0%,transparent 70%)",
              filter:"blur(36px)", pointerEvents:"none" }} />
            <div style={{ position:"absolute", inset:0, opacity:.05, borderRadius:"20px", pointerEvents:"none",
              backgroundImage:"radial-gradient(circle at 1px 1px,white 1px,transparent 0)",
              backgroundSize:"24px 24px" }} />

            <div style={{ position:"relative", zIndex:10 }}>
              <div style={{ width:"52px", height:"52px", borderRadius:"14px",
                background:"rgba(255,255,255,0.12)", border:"1px solid rgba(255,255,255,0.18)",
                display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 20px" }}>
                <MessageCircle size={24} style={{ color:"#FFFFFF" }} />
              </div>
              <h3 style={{ fontSize:"clamp(18px,3vw,26px)", fontWeight:800, color:"#FFFFFF",
                fontFamily:"Plus Jakarta Sans,sans-serif", marginBottom:"10px", letterSpacing:"-0.01em" }}>
                Looking for Quick Answers?
              </h3>
              <p style={{ fontSize:"14px", color:"rgba(255,255,255,.58)", maxWidth:"340px",
                margin:"0 auto 28px", lineHeight:1.65 }}>
                Visit our FAQ section for instant answers about CRM features, pricing, and setup.
              </p>
              <button className="visit-btn" onClick={handleVisitFaq}>
                Visit FAQ Section <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}