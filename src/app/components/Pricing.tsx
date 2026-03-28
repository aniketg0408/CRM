import { useState, useEffect } from "react";
import {
  Check,
  Star,
  LayoutDashboard,
  Users,
  BarChart3,
  Settings,
  Shield,
  Zap,
  Building2,
  ArrowRight,
  Phone,
  Target,
  GitMerge,
  History,
  Calendar,
  Rocket,
  Crown,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// ── Auth helper ──────────────────────────────────────────────────────────────
function getStoredUser(): { name: string; email: string; hasActiveLicense: boolean } | null {
  try {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

// ── Types ────────────────────────────────────────────────────────────────────
interface Plan {
  id: string;
  name: string;
  tagline: string;
  price: string;
  unit: string;
  min: string;
  billing: string;
  popular: boolean;
  isEnterprise: boolean;
  customQuote?: boolean;
  features: string[];
  accent: string;
  badgeBg: string;
  badgeText: string;
  ctaBg: string;
  ctaText: string;
  cardBorder: string;
  cardShadow: string;
  icon: React.ReactNode;
}

// ── Plan data ─────────────────────────────────────────────────────────────────
const PLANS: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    tagline: "Perfect for small sales teams kicking off",
    price: "₹0",
    unit: "/month",
    min: "Up to 3 users",
    billing: "Billed Monthly",
    popular: false,
    isEnterprise: false,
    features: [
      "Up to 3 users",
      "Up to 500 leads",
      "Lead & contact management",
      "Basic pipeline (3 stages)",
      "Task & follow-up reminders",
      "Activity logging",
      "Email support",
    ],
    accent: "#0B8A6E",
    badgeBg: "#0D2244",
    badgeText: "#fff",
    ctaBg: "#FFFFFF",
    ctaText: "#0B8A6E",
    cardBorder: "1.5px solid #E2EEF9",
    cardShadow: "0 4px 16px rgba(13,34,68,0.06)",
    icon: <Rocket size={20} strokeWidth={1.8} />,
  },
  {
    id: "growth",
    name: "Growth",
    tagline: "For growing sales teams closing more deals",
    price: "₹2,999",
    unit: "/month",
    min: "Up to 10 users",
    billing: "Billed Monthly",
    popular: true,
    isEnterprise: false,
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
    accent: "#0B5ED7",
    badgeBg: "linear-gradient(135deg,#0B5ED7,#1E88E5)",
    badgeText: "#fff",
    ctaBg: "linear-gradient(135deg,#0B5ED7,#1E88E5)",
    ctaText: "#fff",
    cardBorder: "2px solid #0B5ED7",
    cardShadow: "0 8px 40px rgba(11,94,215,0.15)",
    icon: <Zap size={20} strokeWidth={1.8} />,
  },
  {
    id: "pro",
    name: "Pro",
    tagline: "For established teams needing full control",
    price: "₹5,999",
    unit: "/month",
    min: "Up to 25 users",
    billing: "Billed Monthly",
    popular: false,
    isEnterprise: false,
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
    accent: "#0B8A6E",
    badgeBg: "linear-gradient(135deg,#0B8A6E,#0FA87E)",
    badgeText: "#fff",
    ctaBg: "linear-gradient(135deg,#0B8A6E,#0FA87E)",
    ctaText: "#fff",
    cardBorder: "1.5px solid #BBF7D0",
    cardShadow: "0 8px 32px rgba(11,138,110,0.10)",
    icon: <Building2 size={20} strokeWidth={1.8} />,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    tagline: "For large orgs & multi-team deployments",
    price: "Custom",
    unit: "",
    min: "25+ users",
    billing: "Billed Annually",
    popular: false,
    isEnterprise: true,
    customQuote: true,
    features: [
      "Unlimited users",
      "Multi-tenant workspaces",
      "Super admin dashboard",
      "Custom integrations & API access",
      "SSO & advanced security",
      "Custom roles & permissions",
      "SLA & uptime guarantee",
      "Dedicated success manager",
      "White-label options available",
    ],
    accent: "#7C3AED",
    badgeBg: "linear-gradient(135deg,#7C3AED,#9333EA)",
    badgeText: "#fff",
    ctaBg: "#F1F5F9",
    ctaText: "#475569",
    cardBorder: "1.5px solid #DDD6FE",
    cardShadow: "0 4px 16px rgba(124,58,237,0.08)",
    icon: <Crown size={20} strokeWidth={1.8} />,
  },
];

const MODULE_PILLS = [
  { icon: LayoutDashboard, label: "Dashboard",     desc: "KPIs, filters, quick actions"     },
  { icon: Users,           label: "Lead Pipeline", desc: "Full lifecycle management"        },
  { icon: Target,          label: "Deals",         desc: "Visual pipeline & stages"         },
  { icon: History,         label: "Activity Log",  desc: "Timestamped call & email history" },
  { icon: BarChart3,       label: "Reports",       desc: "Sales analytics & CSV export"     },
  { icon: Settings,        label: "Admin",         desc: "Roles, permissions & users"       },
];

// ── Component ─────────────────────────────────────────────────────────────────
export function PricingSection() {
  const [currentUser, setCurrentUser] = useState(getStoredUser);
  const navigate = useNavigate();

  useEffect(() => {
    const sync = () => setCurrentUser(getStoredUser());
    window.addEventListener("userLoginStatusChanged", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("userLoginStatusChanged", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const handleCta = (plan: Plan) => {
    if (plan.isEnterprise) {
      navigate("/contact-support");
      return;
    }
    const user = getStoredUser();
    if (user) {
      navigate("/checkout", {
        state: { selectedPlanId: plan.id, planName: plan.name, price: plan.price, min: plan.min },
      });
    } else {
      toast.info("Please log in to continue with your purchase.");
      navigate("/", {
        state: {
          openLogin: true,
          redirectTo: "/checkout",
          checkoutState: { selectedPlanId: plan.id, planName: plan.name, price: plan.price, min: plan.min },
        },
      });
    }
  };

  const ctaLabel = (plan: Plan) => {
    if (plan.isEnterprise) return "Contact Sales";
    if (plan.id === "starter") return "Get Started Free";
    return currentUser ? "Buy Now" : "Start Free Trial";
  };

  return (
    <section
      id="pricing"
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #EAF3FF 0%, #F5F9FF 50%, #EAF3FF 100%)",
        paddingTop: "80px",
        paddingBottom: "80px",
      }}
    >
      {/* Blobs */}
      <div className="absolute top-0 right-0 pointer-events-none" style={{ width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle,rgba(11,94,215,0.07) 0%,transparent 70%)", filter: "blur(50px)" }} />
      <div className="absolute bottom-0 left-0 pointer-events-none" style={{ width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle,rgba(30,136,229,0.06) 0%,transparent 70%)", filter: "blur(40px)" }} />

      <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6">

        {/* ── Header ── */}
        <div className="text-center mb-10">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-5"
            style={{ background: "rgba(11,94,215,0.08)", border: "1px solid rgba(11,94,215,0.2)", color: "#0B5ED7" }}
          >
            Pricing
          </div>
          <h2
            className="font-extrabold tracking-tight mb-3"
            style={{ fontSize: "clamp(32px, 4.5vw, 52px)", color: "#0F1F3D", fontFamily: "Plus Jakarta Sans, sans-serif", lineHeight: 1.1 }}
          >
            Simple, Transparent Pricing
          </h2>
          <p style={{ fontSize: "17px", color: "#64748B", maxWidth: "460px", margin: "0 auto", lineHeight: 1.65 }}>
            Choose the plan that fits your team. Upgrade anytime as you grow. No hidden fees.
          </p>
        </div>

        {/* ── Module pill strip ── */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {MODULE_PILLS.map(({ icon: Icon, label, desc }) => (
            <div
              key={label}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white text-sm font-semibold"
              style={{ border: "1.5px solid #E2EEF9", boxShadow: "0 2px 8px rgba(13,34,68,0.06)", color: "#0F1F3D" }}
            >
              <Icon size={14} style={{ color: "#0B5ED7", flexShrink: 0 }} />
              <span>{label}</span>
              <span className="text-xs font-normal hidden sm:inline" style={{ color: "#94A3B8" }}>· {desc}</span>
            </div>
          ))}
        </div>

        {/* ── Plan cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch mb-12">
          {PLANS.map((plan) => (
            <div
              key={plan.id}
              data-animate="pricing-card"
              className="relative bg-white rounded-2xl flex flex-col transition-all duration-300"
              style={{
                border: plan.cardBorder,
                boxShadow: plan.cardShadow,
                marginTop: plan.popular ? "24px" : "0",
              }}
              onMouseEnter={e => {
                if (!plan.popular) {
                  e.currentTarget.style.transform = "translateY(-6px)";
                  e.currentTarget.style.boxShadow = `0 20px 48px ${plan.accent}22`;
                  e.currentTarget.style.borderColor = plan.accent;
                }
              }}
              onMouseLeave={e => {
                if (!plan.popular) {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = plan.cardShadow;
                  e.currentTarget.style.borderColor = "";
                }
              }}
            >
              {/* Most Popular badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <div
                    className="flex items-center gap-1 px-4 py-1 rounded-full text-xs font-bold whitespace-nowrap"
                    style={{ background: "linear-gradient(135deg,#0B5ED7,#1E88E5)", boxShadow: "0 4px 14px rgba(11,94,215,0.40)", color: "#fff" }}
                  >
                    <Star size={11} className="fill-current" />
                    Most Popular
                  </div>
                </div>
              )}

              <div className="p-6 flex flex-col flex-1">

                {/* Icon + Name badge row */}
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: plan.accent + "15", border: `1px solid ${plan.accent}25`, color: plan.accent }}
                  >
                    {plan.icon}
                  </div>
                  <span
                    className="px-3 py-1 rounded-full text-xs font-bold"
                    style={{ background: plan.badgeBg, color: plan.badgeText }}
                  >
                    {plan.name}
                  </span>
                </div>

                {/* Tagline */}
                <p className="text-xs mb-5 leading-relaxed" style={{ color: "#94A3B8" }}>
                  {plan.tagline}
                </p>

                {/* Price */}
                <div className="mb-2" style={{ minHeight: "64px" }}>
                  {plan.customQuote ? (
                    <>
                      <div style={{ fontSize: "24px", color: "#7C3AED", fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 800 }}>
                        Custom Quote
                      </div>
                      <div style={{ fontSize: "12px", color: "#94A3B8", marginTop: "4px" }}>Tailored for your organisation</div>
                    </>
                  ) : (
                    <div className="flex items-end gap-1">
                      <span style={{ fontSize: "36px", color: "#0F1F3D", fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 800, lineHeight: 1 }}>
                        {plan.price}
                      </span>
                      <span style={{ fontSize: "13px", color: "#64748B", marginBottom: "4px" }}>{plan.unit}</span>
                    </div>
                  )}
                </div>

                {/* User count pill */}
                <div
                  className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold mb-2 w-fit"
                  style={{ background: plan.accent + "10", color: plan.accent }}
                >
                  <Users size={11} />
                  {plan.min}
                </div>

                {/* Billing badge */}
                <div
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full mb-5 w-fit"
                  style={{ backgroundColor: "#EBF3FF", border: "1px solid #C7DFFE" }}
                >
                  <Calendar size={11} style={{ color: "#0B5ED7" }} />
                  <span style={{ fontSize: "11px", color: "#0B5ED7", fontWeight: 600 }}>{plan.billing}</span>
                </div>

                {/* CTA */}
                <button
                  onClick={() => handleCta(plan)}
                  className="w-full py-2.5 rounded-xl text-sm font-bold mb-6 flex items-center justify-center gap-1.5 transition-all duration-200"
                  style={{
                    background: plan.ctaBg,
                    color: plan.ctaText,
                    border: plan.id === "starter" ? `1.5px solid ${plan.accent}` : "none",
                    boxShadow: plan.popular ? "0 4px 14px rgba(11,94,215,0.3)" : "none",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.opacity = "0.88"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; }}
                >
                  {plan.isEnterprise ? (
                    <><Phone size={14} /> Contact Sales</>
                  ) : (
                    <>{ctaLabel(plan)} <ArrowRight size={14} /></>
                  )}
                </button>

                {/* Feature list */}
                <div className="flex-1 flex flex-col min-h-0">
                  <p className="text-xs font-bold mb-3 flex-shrink-0" style={{ color: "#0F1F3D" }}>Includes:</p>
                  <div
                    className="overflow-y-auto pr-1 space-y-2.5"
                    style={{ height: "220px", scrollbarWidth: "thin", scrollbarColor: "#CBD5E1 transparent" }}
                  >
                    {plan.features.map((feature, fi) => (
                      <div key={fi} className="flex items-start gap-2.5">
                        <div
                          className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{ backgroundColor: plan.accent + "15" }}
                        >
                          <Check size={9} style={{ color: plan.accent }} strokeWidth={2.5} />
                        </div>
                        <span style={{ fontSize: "13px", color: "#374151", lineHeight: 1.6 }}>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* ── All plans include strip ── */}
        <div
          className="rounded-2xl px-8 py-6"
          style={{ background: "rgba(11,94,215,0.04)", border: "1.5px solid rgba(11,94,215,0.14)" }}
        >
          <p
            className="text-xs font-bold uppercase tracking-widest text-center mb-4"
            style={{ color: "#0B5ED7" }}
          >
            All Plans Include
          </p>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2">
            {[
              { Icon: Shield,    text: "Role-based access control"         },
              { Icon: Zap,       text: "Real-time notifications & toasts"  },
              { Icon: Building2, text: "Responsive grid UI"                },
              { Icon: GitMerge,  text: "Lead → Deal conversion workflow"   },
              { Icon: BarChart3, text: "Sales performance tracking"        },
            ].map(({ Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-xs" style={{ color: "#475569" }}>
                <Icon size={14} style={{ color: "#0B5ED7", flexShrink: 0 }} />
                {text}
              </div>
            ))}
          </div>
        </div>

      </div>

      <style>{`
        #pricing .overflow-y-auto::-webkit-scrollbar { width: 4px; }
        #pricing .overflow-y-auto::-webkit-scrollbar-track { background: transparent; }
        #pricing .overflow-y-auto::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 99px; }
        #pricing .overflow-y-auto::-webkit-scrollbar-thumb:hover { background: #94A3B8; }
      `}</style>
    </section>
  );
}