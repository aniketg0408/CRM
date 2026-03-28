import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "./ui/dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { Mail, Lock, ShieldCheck, User, Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";
import logo from "./assests/footer_logo.png";

interface LoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLoginSuccess?: () => void;
}

/* ─── Password strength ─── */
function PasswordStrength({ password }: { password: string }) {
  if (!password) return null;
  const checks = [
    { label: "8+ chars",  ok: password.length >= 8 },
    { label: "Uppercase", ok: /[A-Z]/.test(password) },
    { label: "Lowercase", ok: /[a-z]/.test(password) },
    { label: "Number",    ok: /[0-9]/.test(password) },
  ];
  const score = checks.filter((c) => c.ok).length;
  const barColor = score <= 1 ? "#f87171" : score === 2 ? "#fb923c" : score === 3 ? "#facc15" : "#4ade80";
  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][score];
  return (
    <div style={{ marginTop: 10 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
        <div style={{ display: "flex", flex: 1, gap: 4 }}>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} style={{ height: 3, flex: 1, borderRadius: 2, background: i <= score ? barColor : "#DBEAFE", transition: "background 0.25s" }} />
          ))}
        </div>
        <span style={{ fontSize: 11, fontWeight: 700, color: barColor, minWidth: 36 }}>{strengthLabel}</span>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
        {checks.map((c) => (
          <span key={c.label} style={{ fontSize: 10, padding: "2px 8px", borderRadius: 20, border: `1px solid ${c.ok ? "#0B5ED7" : "#DBEAFE"}`, background: c.ok ? "rgba(11,94,215,0.08)" : "transparent", color: c.ok ? "#0B5ED7" : "#94a3b8", fontWeight: 600, transition: "all 0.2s" }}>
            {c.ok ? "✓ " : ""}{c.label}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── Main Component ─── */
export function LoginModal({ open, onOpenChange, onLoginSuccess }: LoginModalProps) {
  const [email, setEmail]               = useState("");
  const [password, setPassword]         = useState("");
  const [confirm, setConfirm]           = useState("");
  const [name, setName]                 = useState("");
  const [isSignUp, setIsSignUp]         = useState(false);
  const [loading, setLoading]           = useState(false);
  const [hasError, setHasError]         = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPw, setShowPw]             = useState(false);
  const [showConfirm, setShowConfirm]   = useState(false);

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        setEmail(""); setPassword(""); setConfirm(""); setName("");
        setHasError(false); setErrorMessage("");
        setShowPw(false); setShowConfirm(false);
      }, 200);
    }
  }, [open]);

  const passwordsMatch = confirm.length > 0 && password === confirm;
  const confirmBorder  = confirm.length === 0 ? "#DBEAFE" : passwordsMatch ? "#86efac" : "#fca5a5";
  const confirmShadow  = confirm.length === 0 ? "none" : passwordsMatch ? "0 0 0 3px rgba(134,239,172,0.2)" : "0 0 0 3px rgba(252,165,165,0.2)";

  const resetAndToggle = (signUp: boolean) => {
    setIsSignUp(signUp); setHasError(false); setErrorMessage("");
    setPassword(""); setConfirm(""); setName("");
    setShowPw(false); setShowConfirm(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setHasError(false); setErrorMessage("");
    if (!email || !password) { toast.error("Email and password are required"); return; }
    if (isSignUp) {
      if (!name) { toast.error("Full name is required"); return; }
      const pwValid = /[A-Z]/.test(password) && /[a-z]/.test(password) && /[0-9]/.test(password) && password.length >= 8;
      if (!pwValid) { toast.error("Password does not meet requirements"); return; }
      if (!passwordsMatch) { toast.error("Passwords do not match"); return; }
      setLoading(true);
      try {
        toast.success("Account created! Please sign in to continue.");
        resetAndToggle(false);
      } catch (err: any) {
        setHasError(true); setErrorMessage("Something went wrong");
        toast.error(err?.message || "Sign up failed");
      } finally { setLoading(false); }
      return;
    }
    setLoading(true);
    try {
      onOpenChange(false); onLoginSuccess?.();
      toast.success("Welcome back! 🎉");
    } catch (err: any) {
      setHasError(true); setErrorMessage("Invalid credentials");
      toast.error(err?.message || "Sign in failed");
    } finally { setLoading(false); }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 border-0 shadow-2xl overflow-hidden sm:max-w-sm rounded-2xl">
        <style>{`
          .crm-header { background: linear-gradient(135deg, #1E88E5 0%, #0B5ED7 55%, #0D2244 100%); padding: 20px 22px 18px; position: relative; }
          .crm-accent-bar { position: absolute; bottom: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent); }
          .crm-title { font-size: 18px; font-weight: 800; color: white; margin: 0 0 4px; letter-spacing: -0.02em; }
          .crm-sub   { font-size: 11.5px; color: rgba(255,255,255,0.58); margin: 0; }
          .crm-body  { background: #F0F5FA; padding: 18px 16px 22px; }
          .crm-card  { background: white; border-radius: 12px; border: 1px solid #DBEAFE; padding: 16px; box-shadow: 0 2px 8px rgba(11,94,215,0.06); }
          .crm-hint  { font-size: 11px; color: #94a3b8; margin: 0 0 14px; }
          .crm-hint.err { color: #ef4444; font-weight: 700; }
          .crm-label { display: block; font-size: 10px; font-weight: 800; color: #334155; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 5px; }
          .crm-field { margin-bottom: 12px; }
          .crm-input-icon { position: absolute; left: 10px; top: 50%; transform: translateY(-50%); color: #94a3b8; pointer-events: none; display: flex; align-items: center; }
          .crm-input { width: 100%; box-sizing: border-box; padding: 8px 12px 8px 30px; background: #F8FBFF; border: 1.5px solid #DBEAFE; border-radius: 9px; font-size: 13px; color: #0D2244; outline: none; transition: border-color 0.15s, box-shadow 0.15s; }
          .crm-input::placeholder { color: #B0C4D8; }
          .crm-input:focus { border-color: #0B5ED7; background: white; box-shadow: 0 0 0 3px rgba(11,94,215,0.10); }
          .crm-input.err { border-color: #ef4444 !important; box-shadow: 0 0 0 3px rgba(239,68,68,0.10) !important; }
          .crm-eye-btn { position: absolute; right: 10px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; padding: 0; color: #94a3b8; display: flex; align-items: center; transition: color 0.15s; }
          .crm-eye-btn:hover { color: #0B5ED7; }
          .crm-submit { width: 100%; margin-top: 14px; padding: 10px; background: linear-gradient(135deg, #1E88E5, #0B5ED7); color: white; border: none; border-radius: 9px; font-size: 13px; font-weight: 800; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 7px; transition: transform 0.2s, box-shadow 0.2s, opacity 0.2s; box-shadow: 0 4px 14px rgba(11,94,215,0.35); }
          .crm-submit:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(11,94,215,0.50); }
          .crm-submit:disabled { opacity: 0.6; cursor: not-allowed; }
          .crm-toggle { text-align: center; margin-top: 14px; margin-bottom: 4px; }
          .crm-toggle-btn { background: none; border: none; font-size: 12px; font-weight: 600; color: #0D2244; cursor: pointer; padding: 0; }
          .crm-toggle-btn:hover { color: #0B5ED7; text-decoration: underline; }
          .crm-toggle-btn span { color: #1E88E5; }
          .crm-spinner { width: 14px; height: 14px; border: 2px solid rgba(255,255,255,0.35); border-top-color: white; border-radius: 50%; animation: crm-spin 0.7s linear infinite; }
          @keyframes crm-spin { to { transform: rotate(360deg); } }
        `}</style>

        <VisuallyHidden.Root>
          <DialogTitle>{isSignUp ? "Create Your Account" : "Sign In"}</DialogTitle>
          <DialogDescription>Access your CRM dashboard</DialogDescription>
        </VisuallyHidden.Root>

        {/* ── Header with Logo ── */}
        <div className="crm-header">
          {/* Logo image */}
          <div style={{ marginBottom: '14px' }}>
            <img
              src={logo}
              alt="CRM Logo"
              style={{ height: '45px', width: 'auto', objectFit: 'contain', display: 'block' }}
            />
          </div>
          <h2 className="crm-title">{isSignUp ? "Create Your Account" : "Welcome Back"}</h2>
          <p className="crm-sub">{isSignUp ? "Sign up to get started with CRM" : "Sign in to access your CRM dashboard"}</p>
          <div className="crm-accent-bar" />
        </div>

        {/* ── Body ── */}
        <div className="crm-body">
          <div className="crm-card">
            <p className={`crm-hint${hasError ? " err" : ""}`}>
              {hasError && errorMessage ? errorMessage : "Enter your credentials to continue"}
            </p>
            <form onSubmit={handleSubmit} autoComplete="off">
              <input type="text" style={{ display: "none" }} autoComplete="username" readOnly />
              <input type="password" style={{ display: "none" }} autoComplete="current-password" readOnly />

              {isSignUp && (
                <div className="crm-field">
                  <label className="crm-label">Full Name</label>
                  <div style={{ position: "relative" }}>
                    <span className="crm-input-icon"><User size={13} /></span>
                    <input type="text" placeholder="Your full name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="off" className="crm-input" required />
                  </div>
                </div>
              )}

              <div className="crm-field">
                <label className="crm-label">Email Address</label>
                <div style={{ position: "relative" }}>
                  <span className="crm-input-icon"><Mail size={13} /></span>
                  <input type="email" placeholder="you@company.com" value={email} onChange={(e) => { setEmail(e.target.value); setHasError(false); setErrorMessage(""); }} autoComplete="off" className={`crm-input${hasError ? " err" : ""}`} required />
                </div>
              </div>

              <div className="crm-field" style={{ marginBottom: 0 }}>
                <label className="crm-label">Password</label>
                <div style={{ position: "relative" }}>
                  <span className="crm-input-icon"><Lock size={13} /></span>
                  <input type={showPw ? "text" : "password"} placeholder="••••••••" value={password} onChange={(e) => { setPassword(e.target.value); setHasError(false); setErrorMessage(""); }} autoComplete="new-password" className={`crm-input${hasError ? " err" : ""}`} style={{ paddingRight: 34 } as React.CSSProperties} required />
                  <button type="button" className="crm-eye-btn" onClick={() => setShowPw((v) => !v)}>
                    {showPw ? <EyeOff size={13} /> : <Eye size={13} />}
                  </button>
                </div>
                {isSignUp && <PasswordStrength password={password} />}
              </div>

              {isSignUp && (
                <div className="crm-field" style={{ marginTop: 12, marginBottom: 0 }}>
                  <label className="crm-label">Confirm Password</label>
                  <div style={{ position: "relative" }}>
                    <span className="crm-input-icon"><Lock size={13} /></span>
                    <input type={showConfirm ? "text" : "password"} placeholder="Repeat password" value={confirm} onChange={(e) => setConfirm(e.target.value)} autoComplete="new-password" className="crm-input" style={{ paddingRight: 34, borderColor: confirmBorder, boxShadow: confirmShadow } as React.CSSProperties} />
                    <button type="button" className="crm-eye-btn" onClick={() => setShowConfirm((v) => !v)}>
                      {showConfirm ? <EyeOff size={13} /> : <Eye size={13} />}
                    </button>
                  </div>
                  {confirm.length > 0 && (
                    <p style={{ fontSize: 11, fontWeight: 600, marginTop: 5, color: passwordsMatch ? "#16a34a" : "#dc2626" }}>
                      {passwordsMatch ? "✓ Passwords match" : "✗ Passwords do not match"}
                    </p>
                  )}
                </div>
              )}

              <button type="submit" className="crm-submit" disabled={loading}>
                {loading ? <><div className="crm-spinner" />Processing…</> : <><ShieldCheck style={{ width: 15, height: 15 }} />{isSignUp ? "Create Account" : "Sign In"}</>}
              </button>
            </form>
          </div>

          <div className="crm-toggle">
            <button type="button" onClick={() => resetAndToggle(!isSignUp)} className="crm-toggle-btn">
              {isSignUp ? <>Already have an account? <span>Sign in</span></> : <>Don't have an account? <span>Sign up</span></>}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}