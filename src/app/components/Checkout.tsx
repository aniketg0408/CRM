import { useState, useEffect } from "react";
import {
  X, Check, CreditCard, Shield, Lock, Zap, Star,
  ArrowLeft, Rocket, Building2, Crown, Users, Calendar,
  ChevronDown, AlertCircle,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

// ── Types ────────────────────────────────────────────────────────────────────

type BillingCycle = "monthly" | "quarterly" | "half-yearly" | "yearly";

interface Plan {
  id: string;
  name: string;
  tagline: string;
  price: number;        // monthly base price (0 = free)
  maxUsers: number;
  isEnterprise: boolean;
  features: string[];
  accent: string;
  icon: React.ReactNode;
  popular: boolean;
  discountConfig: Record<BillingCycle, number>;
}

// ── Static plan data (mirrors Pricing.tsx) ───────────────────────────────────

const PLANS: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    tagline: "Perfect for small sales teams kicking off",
    price: 0,
    maxUsers: 3,
    isEnterprise: false,
    popular: false,
    accent: "#0B8A6E",
    icon: <Rocket size={18} strokeWidth={1.8} />,
    features: [
      "Up to 3 users",
      "Up to 500 leads",
      "Lead & contact management",
      "Basic pipeline (3 stages)",
      "Task & follow-up reminders",
      "Activity logging",
      "Email support",
    ],
    discountConfig: { monthly: 0, quarterly: 0, "half-yearly": 0, yearly: 0 },
  },
  {
    id: "growth",
    name: "Growth",
    tagline: "For growing sales teams closing more deals",
    price: 2999,
    maxUsers: 10,
    isEnterprise: false,
    popular: true,
    accent: "#0B5ED7",
    icon: <Zap size={18} strokeWidth={1.8} />,
    features: [
      "Up to 10 users",
      "Unlimited leads",
      "Full pipeline with custom stages",
      "Dashboard & sales reports",
      "Lead source tracking",
      "Role-based access (Admin & Rep)",
      "Deal management",
      "Email & task notifications",
      "Data export (CSV)",
      "Priority email support",
    ],
    discountConfig: { monthly: 0, quarterly: 5, "half-yearly": 10, yearly: 20 },
  },
  {
    id: "pro",
    name: "Pro",
    tagline: "For established teams needing full control",
    price: 5999,
    maxUsers: 25,
    isEnterprise: false,
    popular: false,
    accent: "#0B8A6E",
    icon: <Building2 size={18} strokeWidth={1.8} />,
    features: [
      "Up to 25 users",
      "Unlimited leads & deals",
      "Everything in Growth",
      "Advanced analytics & KPIs",
      "Multi-pipeline support",
      "Lead assignment automation",
      "Activity timeline per lead",
      "Bulk lead import/export",
      "Custom fields & tags",
      "Dedicated onboarding call",
    ],
    discountConfig: { monthly: 0, quarterly: 5, "half-yearly": 10, yearly: 20 },
  },
];

// ── Auth helper ───────────────────────────────────────────────────────────────

function getStoredUser(): { name: string; email: string; hasActiveLicense: boolean } | null {
  try {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

// ── Cycle helpers ─────────────────────────────────────────────────────────────

const CYCLE_LABELS: Record<BillingCycle, string> = {
  monthly: "Monthly",
  quarterly: "Quarterly",
  "half-yearly": "Half-Yearly",
  yearly: "Yearly",
};

const CYCLE_MONTHS: Record<BillingCycle, number> = {
  monthly: 1,
  quarterly: 3,
  "half-yearly": 6,
  yearly: 12,
};

// ── Component ─────────────────────────────────────────────────────────────────

export default function Checkout() {
  const navigate    = useNavigate();
  const location    = useLocation();
  const state       = (location.state || {}) as { selectedPlanId?: string };

  const user      = getStoredUser();
  const userEmail = user?.email || null;
  const userName  = user?.name  || "";

  // Auth guard
  useEffect(() => {
    if (!userEmail) {
      toast.info("Please log in to continue.");
      navigate("/");
    }
  }, []);

  const initialPlanId = state.selectedPlanId && PLANS.find(p => p.id === state.selectedPlanId)
    ? state.selectedPlanId
    : "growth";

  const [activePlanId, setActivePlanId] = useState<string>(initialPlanId);
  const [billing, setBilling]           = useState<BillingCycle>("monthly");
  const [step, setStep]                 = useState<1 | 2>(1);           // 1 = plan select, 2 = billing info
  const [processing, setProcessing]     = useState(false);
  const [modal, setModal]               = useState<"success" | "alreadyActive" | "upgradeFree" | null>(null);

  const [form, setForm] = useState({
    companyName: "",
    email: userEmail || "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    gstNumber: "",
  });

  const currentPlan = PLANS.find(p => p.id === activePlanId) || PLANS[1];
  const isFreePlan  = currentPlan.price === 0;

  // ── Pricing math ──────────────────────────────────────────────────────────
  const months          = CYCLE_MONTHS[billing];
  const subtotal        = currentPlan.price * months;
  const discountPct     = currentPlan.discountConfig[billing] ?? 0;
  const discountAmt     = Math.round(subtotal * (discountPct / 100));
  const afterDiscount   = subtotal - discountAmt;
  const gst             = isFreePlan ? 0 : Math.round(afterDiscount * 0.18 * 100) / 100;
  const total           = isFreePlan ? 0 : Math.round((afterDiscount + gst) * 100) / 100;

  const handleFormChange = (field: string, value: string) =>
    setForm(prev => ({ ...prev, [field]: value }));

  const validateStep2 = () => {
    const required = ["companyName", "phone", "address", "city", "state", "pincode"];
    return required.every(f => (form as any)[f].trim() !== "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep2()) {
      toast.warning("Please fill in all required fields.");
      return;
    }
    setProcessing(true);

    try {
      // ── Simulate API call (replace with your real purchaseLicense / createOrder calls) ──
      await new Promise(r => setTimeout(r, 1400));

      if (isFreePlan) {
        setModal("success");
        window.dispatchEvent(new Event("licenseActivated"));
        window.dispatchEvent(new Event("userLoginStatusChanged"));
        setTimeout(() => navigate("/"), 2800);
      } else {
        // TODO: hook up Razorpay here, same pattern as the reference Checkout
        setModal("success");
        window.dispatchEvent(new Event("licenseActivated"));
        window.dispatchEvent(new Event("userLoginStatusChanged"));
        setTimeout(() => navigate("/"), 2800);
      }
    } catch (err: any) {
      const msg: string = err?.response?.data?.message || err?.message || "";
      if (msg.toLowerCase().includes("already")) {
        setModal("alreadyActive");
      } else {
        toast.error(msg || "Checkout failed. Please try again.");
      }
    } finally {
      setProcessing(false);
    }
  };

  // ── Input style helpers ───────────────────────────────────────────────────
  const inp = "w-full px-4 py-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-[#0F1F3D] placeholder-[#94A3B8] text-sm focus:outline-none focus:ring-2 focus:ring-[#0B5ED7] focus:border-transparent focus:bg-white transition-all duration-200";
  const lbl = "block text-[11px] font-bold text-[#475569] uppercase tracking-widest mb-1.5";

  if (!userEmail) return null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap');

        .co-root * { font-family: 'Inter', sans-serif; box-sizing: border-box; }
        .co-root { background: linear-gradient(180deg,#EAF3FF 0%,#F5F9FF 60%,#EAF3FF 100%); min-height: 100vh; }

        /* Plan card */
        .plan-card {
          background: #fff; border-radius: 16px;
          border: 1.5px solid #E2EEF9; padding: 20px;
          cursor: pointer; transition: all 0.2s ease;
          position: relative;
        }
        .plan-card:hover { transform: translateY(-3px); box-shadow: 0 12px 32px rgba(11,94,215,0.10); }
        .plan-card.selected { border: 2px solid #0B5ED7; box-shadow: 0 0 0 4px rgba(11,94,215,0.08); }
        .plan-card.selected-green { border: 2px solid #0B8A6E; box-shadow: 0 0 0 4px rgba(11,138,110,0.08); }

        /* Billing cycle btn */
        .cyc-btn {
          padding: 8px 14px; font-size: 12px; font-weight: 600;
          border-radius: 10px; border: 1.5px solid #E2E8F0;
          background: #fff; color: #64748B; cursor: pointer;
          transition: all 0.18s; white-space: nowrap;
        }
        .cyc-btn:hover { border-color: #0B5ED7; color: #0B5ED7; }
        .cyc-btn.cyc-active {
          border-color: #0B5ED7;
          background: linear-gradient(135deg,#EBF3FF,#EAF3FF);
          color: #0B5ED7; box-shadow: 0 0 0 3px rgba(11,94,215,0.08);
        }

        /* Summary card */
        .summary-card {
          background: #fff; border-radius: 20px;
          border: 1.5px solid #E2EEF9;
          box-shadow: 0 4px 24px rgba(11,94,215,0.07);
          padding: 28px; position: sticky; top: 24px;
        }

        /* Pay button */
        .pay-btn {
          width: 100%; padding: 14px 24px;
          background: linear-gradient(135deg,#0B5ED7,#1E88E5);
          color: #fff; border: none; border-radius: 14px;
          font-size: 15px; font-weight: 700; cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          transition: all 0.2s; box-shadow: 0 6px 20px rgba(11,94,215,0.28);
          font-family: 'Plus Jakarta Sans', sans-serif; letter-spacing: 0.01em;
        }
        .pay-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 10px 28px rgba(11,94,215,0.38); }
        .pay-btn:disabled { opacity: 0.65; cursor: not-allowed; }

        /* Step pill */
        .step-pill {
          width: 24px; height: 24px; border-radius: 50%;
          background: linear-gradient(135deg,#0B5ED7,#1E88E5);
          color: #fff; display: flex; align-items: center; justify-content: center;
          font-size: 11px; font-weight: 800; flex-shrink: 0;
        }

        /* Back btn */
        .back-btn {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 13px; font-weight: 600; color: #64748B;
          background: #fff; border: 1.5px solid #E2E8F0;
          padding: 8px 16px; border-radius: 10px; cursor: pointer;
          transition: all 0.18s;
        }
        .back-btn:hover { border-color: #0B5ED7; color: #0B5ED7; }

        /* Modal */
        .modal-overlay {
          position: fixed; inset: 0; z-index: 200;
          background: rgba(13,34,68,0.55); backdrop-filter: blur(8px);
          display: flex; align-items: center; justify-content: center; padding: 16px;
        }
        .modal-box {
          background: #fff; border-radius: 24px; padding: 44px 40px 40px;
          max-width: 420px; width: 100%; text-align: center;
          box-shadow: 0 32px 80px rgba(13,34,68,0.22);
          border-top: 4px solid #0B5ED7;
          animation: modalIn 0.35s cubic-bezier(0.34,1.56,0.64,1);
        }
        @keyframes modalIn { from { opacity:0; transform: scale(0.88) translateY(20px); } to { opacity:1; transform: scale(1) translateY(0); } }
        .modal-icon-ring {
          width: 72px; height: 72px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 20px;
          animation: popIn 0.4s cubic-bezier(0.34,1.56,0.64,1) 0.1s both;
        }
        @keyframes popIn { from { transform: scale(0.5); opacity:0; } to { transform: scale(1); opacity:1; } }

        @media (max-width: 768px) {
          .co-grid { grid-template-columns: 1fr !important; }
          .form-grid { grid-template-columns: 1fr !important; }
          .summary-card { position: static !important; top: auto !important; }
          .modal-box { padding: 28px 20px 24px !important; }
        }
        @media (max-width: 480px) {
          .plan-cards-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div className="co-root">
        {/* ── Background blobs ── */}
        <div className="pointer-events-none fixed top-0 right-0 w-[500px] h-[500px] rounded-full" style={{ background: "radial-gradient(circle,rgba(11,94,215,0.07) 0%,transparent 70%)", filter: "blur(50px)" }} />
        <div className="pointer-events-none fixed bottom-0 left-0 w-[400px] h-[400px] rounded-full" style={{ background: "radial-gradient(circle,rgba(30,136,229,0.05) 0%,transparent 70%)", filter: "blur(40px)" }} />

        <div className="relative max-w-[1100px] mx-auto px-4 py-8 sm:py-12">

          {/* ── Page header ── */}
          <div className="flex items-center justify-between mb-8 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: "linear-gradient(135deg,#0B5ED7,#1E88E5)" }}>
                  <Zap size={14} className="text-white" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#0B5ED7" }}>
                  CRM Checkout
                </span>
              </div>
              <h1 style={{ fontSize: "clamp(20px,3vw,30px)", fontWeight: 800, color: "#0F1F3D", fontFamily: "Plus Jakarta Sans, sans-serif", letterSpacing: "-0.02em", lineHeight: 1.15 }}>
                {step === 1 ? "Choose Your Plan" : "Complete Your Order"}
              </h1>
              <p style={{ fontSize: "14px", color: "#64748B", marginTop: 3 }}>
                {step === 1 ? "Select the plan that fits your team" : "Just one step away from transforming your CRM"}
              </p>
            </div>
            <button className="back-btn" onClick={() => step === 2 ? setStep(1) : navigate("/")}>
              <ArrowLeft size={14} />
              {step === 2 ? "Back" : "Home"}
            </button>
          </div>

          {/* ── Step indicator ── */}
          <div className="flex items-center gap-3 mb-8">
            {[{ n: 1, label: "Select Plan" }, { n: 2, label: "Billing & Payment" }].map(({ n, label }, i) => (
              <div key={n} className="flex items-center gap-2">
                <div className="step-pill" style={step >= n ? {} : { background: "#CBD5E1" }}>{n}</div>
                <span style={{ fontSize: 13, fontWeight: 600, color: step >= n ? "#0F1F3D" : "#94A3B8" }}>{label}</span>
                {i < 1 && <div style={{ width: 32, height: 1.5, background: step > n ? "#0B5ED7" : "#E2E8F0", marginLeft: 4 }} />}
              </div>
            ))}
          </div>

          {/* ══════════════ STEP 1 — Plan selection ══════════════ */}
          {step === 1 && (
            <div>
              {/* Plan cards */}
              <div className="plan-cards-grid mb-8" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 16 }}>
                {PLANS.map(plan => {
                  const isSelected = activePlanId === plan.id;
                  return (
                    <div
                      key={plan.id}
                      className={`plan-card ${isSelected ? (plan.accent === "#0B8A6E" ? "selected-green" : "selected") : ""}`}
                      onClick={() => setActivePlanId(plan.id)}
                    >
                      {plan.popular && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                          <div className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap"
                            style={{ background: "linear-gradient(135deg,#0B5ED7,#1E88E5)", color: "#fff", boxShadow: "0 4px 12px rgba(11,94,215,0.35)" }}>
                            <Star size={10} className="fill-current" /> Most Popular
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: plan.accent + "15", border: `1px solid ${plan.accent}25`, color: plan.accent }}>
                            {plan.icon}
                          </div>
                          <div>
                            <div style={{ fontSize: 15, fontWeight: 700, color: "#0F1F3D", fontFamily: "Plus Jakarta Sans, sans-serif" }}>{plan.name}</div>
                            <div style={{ fontSize: 11, color: "#94A3B8" }}>{plan.tagline}</div>
                          </div>
                        </div>
                        <div
                          className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                          style={{
                            borderColor: isSelected ? plan.accent : "#CBD5E1",
                            background: isSelected ? plan.accent : "transparent",
                          }}
                        >
                          {isSelected && <Check size={11} className="text-white" strokeWidth={3} />}
                        </div>
                      </div>

                      <div className="flex items-baseline gap-1 mb-3">
                        <span style={{ fontSize: 28, fontWeight: 800, color: "#0F1F3D", fontFamily: "Plus Jakarta Sans, sans-serif", lineHeight: 1 }}>
                          {plan.price === 0 ? "Free" : `₹${plan.price.toLocaleString("en-IN")}`}
                        </span>
                        {plan.price > 0 && <span style={{ fontSize: 12, color: "#94A3B8" }}>/month</span>}
                      </div>

                      <div className="flex items-center gap-3 mb-4">
                        <div className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold"
                          style={{ background: plan.accent + "12", color: plan.accent }}>
                          <Users size={10} /> Up to {plan.maxUsers} users
                        </div>
                        <div className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold"
                          style={{ backgroundColor: "#EBF3FF", border: "1px solid #C7DFFE", color: "#0B5ED7" }}>
                          <Calendar size={10} /> Billed Monthly
                        </div>
                      </div>

                      <div className="space-y-2">
                        {plan.features.slice(0, 5).map((f, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                              style={{ background: plan.accent + "15" }}>
                              <Check size={9} style={{ color: plan.accent }} strokeWidth={2.5} />
                            </div>
                            <span style={{ fontSize: 12.5, color: "#374151" }}>{f}</span>
                          </div>
                        ))}
                        {plan.features.length > 5 && (
                          <div style={{ fontSize: 12, color: "#94A3B8", paddingLeft: 24 }}>
                            +{plan.features.length - 5} more features
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Enterprise CTA */}
              <div className="rounded-2xl p-5 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                style={{ background: "linear-gradient(135deg,rgba(124,58,237,0.06),rgba(124,58,237,0.02))", border: "1.5px solid #DDD6FE" }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(124,58,237,0.10)", border: "1px solid #DDD6FE", color: "#7C3AED" }}>
                    <Crown size={18} strokeWidth={1.8} />
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "#0F1F3D", fontFamily: "Plus Jakarta Sans, sans-serif" }}>Enterprise Plan</div>
                    <div style={{ fontSize: 12, color: "#7C3AED" }}>25+ users · Custom quote · SSO · Dedicated support</div>
                  </div>
                </div>
                <button
                  onClick={() => navigate("/contact-support")}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all"
                  style={{ background: "linear-gradient(135deg,#7C3AED,#9333EA)", color: "#fff", boxShadow: "0 4px 14px rgba(124,58,237,0.25)" }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 8px 20px rgba(124,58,237,0.35)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 14px rgba(124,58,237,0.25)"; }}
                >
                  Contact Sales →
                </button>
              </div>

              {/* Continue */}
              <div className="flex justify-end">
                <button
                  className="pay-btn"
                  style={{ width: "auto", paddingLeft: 36, paddingRight: 36 }}
                  onClick={() => setStep(2)}
                >
                  Continue with {currentPlan.name}
                  <ChevronDown size={16} style={{ transform: "rotate(-90deg)" }} />
                </button>
              </div>
            </div>
          )}

          {/* ══════════════ STEP 2 — Billing info + Order summary ══════════════ */}
          {step === 2 && (
            <div className="co-grid" style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 24, alignItems: "start" }}>

              {/* LEFT — billing form */}
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

                {/* Selected plan recap */}
                <div className="bg-white rounded-2xl p-5" style={{ border: "1.5px solid #E2EEF9", boxShadow: "0 2px 12px rgba(11,94,215,0.05)" }}>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="step-pill">1</div>
                    <span style={{ fontSize: 14, fontWeight: 700, color: "#1e293b" }}>Selected Plan</span>
                    <button
                      className="ml-auto text-xs font-semibold px-3 py-1 rounded-full transition-all"
                      style={{ background: "#EBF3FF", color: "#0B5ED7", border: "1px solid #C7DFFE" }}
                      onClick={() => setStep(1)}
                    >
                      Change
                    </button>
                  </div>
                  <div className="flex items-center justify-between flex-wrap gap-3 px-4 py-3 rounded-xl"
                    style={{ background: "linear-gradient(135deg,#EBF3FF,#EAF3FF)", border: "1px solid #C7DFFE" }}>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: currentPlan.accent + "15", color: currentPlan.accent, border: `1px solid ${currentPlan.accent}25` }}>
                        {currentPlan.icon}
                      </div>
                      <div>
                        <div style={{ fontSize: 15, fontWeight: 700, color: "#0F1F3D", fontFamily: "Plus Jakarta Sans, sans-serif" }}>{currentPlan.name}</div>
                        <div style={{ fontSize: 12, color: "#94A3B8" }}>{currentPlan.tagline}</div>
                      </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: 20, fontWeight: 800, color: "#0B5ED7", fontFamily: "Plus Jakarta Sans, sans-serif" }}>
                        {isFreePlan ? "Free" : `₹${currentPlan.price.toLocaleString("en-IN")}`}
                      </div>
                      {!isFreePlan && <div style={{ fontSize: 11, color: "#94A3B8" }}>/month</div>}
                    </div>
                  </div>
                </div>

                {/* Billing form */}
                <div className="bg-white rounded-2xl p-6" style={{ border: "1.5px solid #E2EEF9", boxShadow: "0 2px 12px rgba(11,94,215,0.05)" }}>
                  <div className="flex items-center gap-2 mb-5">
                    <div className="step-pill">2</div>
                    <div>
                      <span style={{ fontSize: 14, fontWeight: 700, color: "#1e293b" }}>Billing Information</span>
                      <p style={{ fontSize: 12, color: "#94A3B8", marginTop: 1 }}>Enter your company and billing details</p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} id="checkout-form">
                    <div className="form-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px 20px" }}>
                      <div>
                        <label className={lbl}>Company Name <span style={{ color: "#0B5ED7" }}>*</span></label>
                        <input className={inp} type="text" placeholder="Acme Corp"
                          value={form.companyName} onChange={e => handleFormChange("companyName", e.target.value)} required />
                      </div>
                      <div>
                        <label className={lbl}>Email Address</label>
                        <input className={inp} type="email" value={form.email} readOnly
                          style={{ cursor: "default", color: "#64748B" }} />
                      </div>
                      <div>
                        <label className={lbl}>Phone Number <span style={{ color: "#0B5ED7" }}>*</span></label>
                        <input className={inp} type="tel" placeholder="+91 98765 43210"
                          value={form.phone} onChange={e => handleFormChange("phone", e.target.value)} required />
                      </div>
                      <div>
                        <label className={lbl}>Street Address <span style={{ color: "#0B5ED7" }}>*</span></label>
                        <input className={inp} type="text" placeholder="123 Business Park"
                          value={form.address} onChange={e => handleFormChange("address", e.target.value)} required />
                      </div>
                      <div>
                        <label className={lbl}>City <span style={{ color: "#0B5ED7" }}>*</span></label>
                        <input className={inp} type="text" placeholder="Mumbai"
                          value={form.city} onChange={e => handleFormChange("city", e.target.value)} required />
                      </div>
                      <div>
                        <label className={lbl}>State <span style={{ color: "#0B5ED7" }}>*</span></label>
                        <input className={inp} type="text" placeholder="Maharashtra"
                          value={form.state} onChange={e => handleFormChange("state", e.target.value)} required />
                      </div>
                      <div>
                        <label className={lbl}>Pincode <span style={{ color: "#0B5ED7" }}>*</span></label>
                        <input className={inp} type="text" placeholder="400001"
                          value={form.pincode} onChange={e => handleFormChange("pincode", e.target.value)} required />
                      </div>
                      <div>
                        <label className={lbl}>GST Number <span style={{ fontSize: 10, textTransform: "none", letterSpacing: 0, fontWeight: 400 }}>(optional)</span></label>
                        <input className={inp} type="text" placeholder="22AAAAA0000A1Z5"
                          value={form.gstNumber} onChange={e => handleFormChange("gstNumber", e.target.value)} />
                      </div>
                    </div>
                  </form>
                </div>

                {/* Security badges */}
                <div className="flex items-center justify-center gap-3 flex-wrap py-2">
                  {[
                    { Icon: Shield, label: "SSL Secured" },
                    { Icon: Lock,   label: "256-bit Encryption" },
                    { Icon: Check,  label: "PCI Compliant" },
                  ].map(({ Icon, label }) => (
                    <div key={label} className="flex items-center gap-2 px-4 py-2 rounded-full"
                      style={{ background: "#fff", border: "1.5px solid #E2E8F0", fontSize: 12, fontWeight: 600, color: "#64748B" }}>
                      <Icon size={13} style={{ color: "#0B5ED7" }} /> {label}
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT — order summary */}
              <div className="summary-card">
                <div className="flex items-center gap-2 mb-5">
                  <div className="step-pill">3</div>
                  <span style={{ fontSize: 14, fontWeight: 700, color: "#1e293b" }}>Order Summary</span>
                </div>

                {/* Tags */}
                <div className="flex gap-2 mb-5 flex-wrap">
                  {[currentPlan.name, CYCLE_LABELS[billing]].map(tag => (
                    <span key={tag} className="px-3 py-1 rounded-lg text-xs font-bold"
                      style={{ background: "#EBF3FF", border: "1px solid #C7DFFE", color: "#0B5ED7" }}>{tag}</span>
                  ))}
                </div>

                {/* Billing cycle selector */}
                {!isFreePlan && (
                  <>
                    <p style={{ fontSize: 11, fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>
                      Billing Cycle
                    </p>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 20 }}>
                      {(["monthly", "quarterly", "half-yearly", "yearly"] as BillingCycle[]).map(c => {
                        const pct = currentPlan.discountConfig[c] ?? 0;
                        return (
                          <button key={c} type="button"
                            className={`cyc-btn ${billing === c ? "cyc-active" : ""}`}
                            onClick={() => setBilling(c)}>
                            {CYCLE_LABELS[c]}
                            {pct > 0 && <span style={{ color: "#059669", fontWeight: 700, marginLeft: 3 }}>−{pct}%</span>}
                          </button>
                        );
                      })}
                    </div>
                  </>
                )}

                {/* Divider */}
                <div style={{ height: 1, background: "linear-gradient(to right,transparent,#E2E8F0,transparent)", margin: "16px 0" }} />

                {/* Line items */}
                {!isFreePlan && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 8 }}>
                    {[
                      { label: "Monthly price", value: `₹${currentPlan.price.toLocaleString("en-IN")}` },
                      { label: "Billing period", value: `${CYCLE_MONTHS[billing]} month${CYCLE_MONTHS[billing] > 1 ? "s" : ""}` },
                      { label: "Subtotal", value: `₹${subtotal.toLocaleString("en-IN")}`, bold: true },
                    ].map(({ label, value, bold }) => (
                      <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: 13, color: "#64748B", fontWeight: bold ? 600 : 400 }}>{label}</span>
                        <span style={{ fontSize: 13, color: "#1e293b", fontWeight: bold ? 700 : 500 }}>{value}</span>
                      </div>
                    ))}
                    {discountPct > 0 && (
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: 13, color: "#059669", fontWeight: 500 }}>Discount ({discountPct}%)</span>
                        <span style={{ fontSize: 13, color: "#059669", fontWeight: 700 }}>−₹{discountAmt.toLocaleString("en-IN")}</span>
                      </div>
                    )}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: 13, color: "#64748B" }}>GST (18%)</span>
                      <span style={{ fontSize: 13, color: "#1e293b", fontWeight: 500 }}>₹{gst.toLocaleString("en-IN")}</span>
                    </div>
                  </div>
                )}

                {/* Total box */}
                <div className="rounded-2xl p-4 mb-5"
                  style={{ background: "linear-gradient(135deg,#EBF3FF,#EAF3FF)", border: "1px solid #C7DFFE" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: "#475569" }}>Total Amount Due</span>
                    <span style={{ fontSize: 26, fontWeight: 800, color: "#0F1F3D", fontFamily: "Plus Jakarta Sans, sans-serif", letterSpacing: "-0.02em" }}>
                      {isFreePlan ? "₹0" : `₹${total.toLocaleString("en-IN")}`}
                    </span>
                  </div>
                  {!isFreePlan && billing !== "monthly" && discountPct > 0 && (
                    <div style={{ fontSize: 11, color: "#059669", fontWeight: 600, marginTop: 4, textAlign: "right" }}>
                      You save ₹{discountAmt.toLocaleString("en-IN")} with {CYCLE_LABELS[billing]} billing
                    </div>
                  )}
                </div>

                <button type="submit" form="checkout-form" className="pay-btn" disabled={processing}>
                  {processing ? (
                    <>
                      <div style={{ width: 15, height: 15, border: "2px solid rgba(255,255,255,0.35)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
                      Processing…
                    </>
                  ) : (
                    <>
                      <CreditCard size={15} />
                      {isFreePlan ? "Activate Free Plan" : "Proceed to Payment"}
                    </>
                  )}
                </button>

                <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 5 }}>
                  {["Secure payment processing", "Money-back guarantee", "Cancel anytime"].map(t => (
                    <div key={t} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11.5, color: "#94A3B8" }}>
                      <Check size={11} style={{ color: "#22C55E", flexShrink: 0 }} /> {t}
                    </div>
                  ))}
                </div>

                <p style={{ fontSize: 10.5, color: "#CBD5E1", textAlign: "center", marginTop: 14, lineHeight: 1.5 }}>
                  By continuing, you agree to our Terms of Service and Privacy Policy
                </p>
              </div>

            </div>
          )}
        </div>
      </div>

      {/* ══════════════ SUCCESS MODAL ══════════════ */}
      {modal === "success" && (
        <div className="modal-overlay">
          <div className="modal-box">
            <div className="modal-icon-ring" style={{ background: "linear-gradient(135deg,#DCFCE7,#BBF7D0)", boxShadow: "0 0 0 12px rgba(34,197,94,0.08)" }}>
              <Check size={32} style={{ color: "#16A34A" }} />
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mb-4"
              style={{ background: "linear-gradient(135deg,#EBF3FF,#EAF3FF)", border: "1px solid #C7DFFE", color: "#0B5ED7" }}>
              <Check size={11} /> {currentPlan.name} Activated
            </div>
            <h3 style={{ fontSize: 24, fontWeight: 800, color: "#0F1F3D", fontFamily: "Plus Jakarta Sans, sans-serif", letterSpacing: "-0.03em", marginBottom: 10, marginTop: 0 }}>
              You're all set! 🎉
            </h3>
            <p style={{ fontSize: 14, color: "#64748B", lineHeight: 1.65, marginBottom: 4, marginTop: 0 }}>
              Your <strong style={{ color: "#0B5ED7" }}>{currentPlan.name}</strong> plan is now active. Start exploring and unlock your team's productivity.
            </p>
            <p style={{ fontSize: 12, color: "#94A3B8", marginTop: 0 }}>Redirecting to home…</p>
          </div>
        </div>
      )}

      {/* ══════════════ ALREADY ACTIVE MODAL ══════════════ */}
      {modal === "alreadyActive" && (
        <div className="modal-overlay">
          <div className="modal-box" style={{ borderTopColor: "#0B8A6E" }}>
            <div className="modal-icon-ring" style={{ background: "linear-gradient(135deg,#D1FAE5,#A7F3D0)", boxShadow: "0 0 0 12px rgba(11,138,110,0.08)" }}>
              <AlertCircle size={32} style={{ color: "#0B8A6E" }} />
            </div>
            <h3 style={{ fontSize: 22, fontWeight: 800, color: "#0F1F3D", fontFamily: "Plus Jakarta Sans, sans-serif", letterSpacing: "-0.03em", marginBottom: 10, marginTop: 0 }}>
              Plan Already Active ✅
            </h3>
            <p style={{ fontSize: 14, color: "#64748B", lineHeight: 1.65, marginBottom: 20, marginTop: 0 }}>
              You already have an active subscription on your account. Head to your dashboard to manage it.
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              <button
                onClick={() => { setModal(null); }}
                style={{ flex: 1, padding: "12px", borderRadius: 12, fontSize: 14, fontWeight: 700, border: "1.5px solid #E2E8F0", background: "#F1F5F9", color: "#475569", cursor: "pointer", fontFamily: "Inter, sans-serif" }}
              >
                Close
              </button>
              <button
                onClick={() => { setModal(null); navigate("/"); }}
                style={{ flex: 1, padding: "12px", borderRadius: 12, fontSize: 14, fontWeight: 700, border: "none", background: "linear-gradient(135deg,#0B5ED7,#1E88E5)", color: "#fff", cursor: "pointer", boxShadow: "0 4px 14px rgba(11,94,215,0.3)", fontFamily: "Inter, sans-serif" }}
              >
                Go to Home
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </>
  );
}