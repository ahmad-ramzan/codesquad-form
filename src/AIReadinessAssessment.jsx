import { useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

const STEPS = [
  { id: "intro", label: "Welcome" },
  { id: "company", label: "Company" },
  { id: "ai_status", label: "AI Status" },
  { id: "goals", label: "Goals" },
  { id: "budget", label: "Budget" },
  { id: "contact", label: "Contact" },
  { id: "result", label: "Result" },
];

const INDUSTRY_OPTIONS = [
  "E-commerce / Retail",
  "Manufacturing",
  "Healthcare",
  "Financial Services",
  "Real Estate",
  "Marketing / Advertising",
  "Logistics / Supply Chain",
  "Education",
  "SaaS / Technology",
  "Construction",
  "Other",
];

const AI_GOALS = [
  { id: "lead_gen", label: "Lead Generation & Sales", icon: "🎯", category: "GTM AI" },
  { id: "marketing", label: "Marketing Automation", icon: "📣", category: "GTM AI" },
  { id: "customer_service", label: "Customer Support / Chatbots", icon: "💬", category: "GTM AI" },
  { id: "content", label: "Content Creation & SEO", icon: "✍️", category: "GTM AI" },
  { id: "backops_automation", label: "Back-Office Automation", icon: "📂", category: "Operations" },
  { id: "image_analysis", label: "Image / Video Analysis", icon: "🖼️", category: "Computer Vision" },
  { id: "quality_inspect", label: "Product Inspection / Quality Control", icon: "🔍", category: "Computer Vision" },
  { id: "data_analytics", label: "Data Analytics & Business Insights", icon: "📊", category: "GTM AI" },
];

const PORTFOLIOS = [
  {
    id: "rtm_kenetics",
    emoji: "🏥",
    title: "RTM Kenetics · Healthcare",
    tagline: "AI-powered remote therapy monitoring platform",
    bullets: [
      "65% more patient engagement",
      "50% less therapist workload",
      "Zero compliance violations since launch",
    ],
    link: "https://codesquad.ai/portfolio/rtm-kenetics/",
  },
  {
    id: "settle_in",
    emoji: "📄",
    title: "Settle In · Immigration",
    tagline: "Automated document processing and AI scoring for U.S. immigrant onboarding",
    bullets: [
      "100% of cases processed without manual intervention",
      "Document processing reduced from days to seconds",
      "Full compliance and audit trail maintained",
    ],
    link: "https://codesquad.ai/portfolio/settle-in/",
  },
  {
    id: "gaeilgeoir",
    emoji: "🎓",
    title: "Gaeilgeoir · Education",
    tagline: "AI-driven Irish language learning platform with real-time speech recognition",
    bullets: [
      "Adaptive learning paths with personalized feedback at scale",
      "40% increase in average session length via gamification",
      "Learners served across multiple countries",
    ],
    link: "http://codesquad.ai/portfolio/gaeilgeoir/",
  },
  {
    id: "tri_state_auto_sales",
    emoji: "🚗",
    title: "Tri-State Auto · Automotive Sales",
    tagline: "Multi-channel lead capture and sales automation across WhatsApp, Instagram, Facebook, and web",
    bullets: [
      "Loan verification cut from hours to 5 minutes",
      "100% of first-touch responses automated",
      "All follow-ups and scheduling fully automated",
    ],
    link: "https://codesquad.ai/portfolio/tri-state-auto-sales/",
  },
  {
    id: "yallalingo",
    emoji: "🎙️",
    title: "YallaLingo · AI Voice",
    tagline: "Omnichannel AI voice agent with persistent memory",
    bullets: [
      "Sub-second response latency",
      "Human-like conversation quality",
      "Deployed across 3 applications from a single core architecture",
    ],
    link: "http://codesquad.ai/portfolio/yallalingo/",
  },
  {
    id: "tri_state_auto_support",
    emoji: "💬",
    title: "Tri-State Auto · Customer Support",
    tagline: "Omnichannel AI support system across WhatsApp, Instagram, Facebook, and web",
    bullets: [
      "80% of inquiries resolved automatically",
      "95% customer satisfaction",
      "Response time reduced from hours to under 2 minutes",
    ],
    link: "https://codesquad.ai/portfolio/tri-state-auto-support/",
  },
  {
    id: "voxsync_ai",
    emoji: "🔊",
    title: "VoxSync AI · SaaS",
    tagline: "Voice extraction, training, and character voice generation platform",
    bullets: [
      "Voice training pipeline reduced from days to under 2 hours",
      "Fully automated — no manual editing required",
      "10x processing capacity with no added headcount",
    ],
    link: "https://codesquad.ai/portfolio/voxsync-ai/",
  },
  {
    id: "my_modern_law",
    emoji: "⚖️",
    title: "My Modern Law · Marketing",
    tagline: "AI media factory for automated legal content generation and distribution",
    bullets: [
      "100% automated content pipeline",
      "60% reduction in marketing cost per lead",
      "Content distributed across 4 platforms simultaneously",
    ],
    link: "https://codesquad.ai/portfolio/my-modern-law/",
  },
  {
    id: "ipromo",
    emoji: "📊",
    title: "iPromo · Marketing CRM",
    tagline: "Automated lead enrichment and outreach platform on Salesforce and ZoomInfo",
    bullets: [
      "Lead-to-contact time cut from 24 hours to under 2 hours",
      "Fully automated personalized campaigns",
      "Salesforce as single source of truth — no manual data entry",
    ],
    link: "http://codesquad.ai/portfolio/ipromo/",
  },
  {
    id: "mamas_compass",
    emoji: "🛒",
    title: "Mamas Compass · E-Commerce",
    tagline: "AI product aggregation and recommendation platform across 5+ marketplaces",
    bullets: [
      "80% faster content creation",
      "Affiliate revenue fully automated",
      "35% increase in average click-through rate",
    ],
    link: "https://codesquad.ai/portfolio/mamas-compass/",
  },
  {
    id: "drop_pr",
    emoji: "🏷️",
    title: "DROP PR · Retail Intelligence",
    tagline: "Real-time product comparison and price tracking across 8+ major retailers",
    bullets: [
      "90%+ product matching accuracy",
      "70% reduction in content costs",
      "Affiliate revenue growing month-on-month",
    ],
    link: "https://codesquad.ai/portfolio/drop-pr/",
  },
  {
    id: "debate_partners",
    emoji: "🎤",
    title: "Debate Partners · EdTech",
    tagline: "AI-powered debate case and evidence packet generation platform pulling from 15,000+ sources",
    bullets: [
      "Case creation reduced from weeks to under 5 minutes",
      "90%+ cost savings vs traditional research",
      "3 debate formats fully automated",
    ],
    link: "https://codesquad.ai/portfolio/debate-partners/",
  },
  {
    id: "gengyve_usa",
    emoji: "🌿",
    title: "GengyveUSA · Health & Wellness",
    tagline: "AI-assisted ad and SEO management for a Shopify-based natural mouthwash brand",
    bullets: [
      "Automated campaign management across Google and Meta",
      "Organic visibility growth via AI-assisted SEO",
      "Cost per acquisition reduced through automated audience segmentation",
    ],
    link: "https://codesquad.ai/portfolio/gengyveusa/",
  },
];

const INDUSTRY_PORTFOLIO_MAP = {
  "Healthcare": ["rtm_kenetics"],
  "E-commerce / Retail": ["mamas_compass", "drop_pr", "gengyve_usa"],
  Manufacturing: ["rtm_kenetics"],
  "Financial Services": ["tri_state_auto_sales"],
  "Real Estate": ["ipromo"],
  "Marketing / Advertising": ["my_modern_law", "ipromo"],
  "Logistics / Supply Chain": ["tri_state_auto_sales"],
  Education: ["gaeilgeoir", "debate_partners"],
  "SaaS / Technology": ["voxsync_ai", "yallalingo"],
  Construction: ["drop_pr"],
  Other: ["voxsync_ai", "yallalingo"],
};

function getRecommendation(answers) {
  const { ai_level, goals, budget } = answers;

  // Determine primary AI category
  const categoryCount = {};
  (goals || []).forEach((g) => {
    const goal = AI_GOALS.find((a) => a.id === g);
    if (goal) categoryCount[goal.category] = (categoryCount[goal.category] || 0) + 1;
  });
  const primaryCategory = Object.entries(categoryCount).sort((a, b) => b[1] - a[1])[0]?.[0] || "Consulting";

  // Seriousness score
  let score = 0;
  if (budget === "$5K – $10K") score += 3;
  if (budget === "$10K – $25K") score += 4;
  if (budget === "$25K+") score += 5;
  if (budget === "$1K – $5K") score += 2;
  if (budget === "$500 – $1K") score += 1;

  if (ai_level === "intermediate") score += 1;
  if (ai_level === "advanced") score += 2;

  let tier, recommendation;

  if (score >= 8) {
    tier = "High Opportunity";
    recommendation =
      "Your business is well positioned to adopt AI. With a clear roadmap, you can quickly move from ideas to implementation and unlock meaningful results.";
  } else if (score >= 4) {
    tier = "Strong Potential";
    recommendation =
      "You have a solid foundation for AI adoption. With the right guidance, you can identify a few high-impact use cases and start implementing them with confidence.";
  } else {
    tier = "Early Stage";
    recommendation =
      "You're at the beginning of your AI journey. With the right strategy, you can quickly identify high-impact AI opportunities and avoid wasting time on low-value experiments.";
  }

  return { tier, recommendation, primaryCategory, score };
}

function getPortfoliosForIndustry(industry) {
  const ids = INDUSTRY_PORTFOLIO_MAP[industry] || INDUSTRY_PORTFOLIO_MAP.Other || [];
  return ids
    .map((id) => PORTFOLIOS.find((p) => p.id === id))
    .filter(Boolean);
}

const PRIMARY_BLUE = "#4F46E5"; // richer indigo, like reference
const PRIMARY_BLUE_HOVER = "#4338CA";

function ProgressBar({ currentStep }) {
  const activeSteps = STEPS.filter((s) => s.id !== "intro" && s.id !== "result");
  const currentIndex = activeSteps.findIndex((s) => s.id === STEPS[currentStep]?.id);
  const progress = STEPS[currentStep]?.id === "result" ? 100 : STEPS[currentStep]?.id === "intro" ? 0 : ((currentIndex + 1) / activeSteps.length) * 100;

  if (STEPS[currentStep]?.id === "intro" || STEPS[currentStep]?.id === "result") return null;

  return (
    <div style={{ padding: "0 40px", marginBottom: 32 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
        <span style={{ fontSize: 11, letterSpacing: 2, color: "#64748b", fontFamily: "'Inter', sans-serif", textTransform: "uppercase", fontWeight: 500 }}>
          Step {currentIndex + 1} of {activeSteps.length}
        </span>
        <span style={{ fontSize: 11, letterSpacing: 2, color: "#64748b", fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>
          {Math.round(progress)}%
        </span>
      </div>
      <div style={{ height: 4, background: "#e2e8f0", borderRadius: 4, overflow: "hidden" }}>
        <div
          style={{
            height: "100%",
            width: `${progress}%`,
            background: PRIMARY_BLUE,
            borderRadius: 4,
            transition: "width 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        />
      </div>
    </div>
  );
}

function SelectCard({ selected, onClick, children, style }) {
  return (
    <div
      onClick={onClick}
      style={{
        padding: "16px 20px",
        border: selected
          ? `1.5px solid rgba(79, 70, 229, 0.75)`
          : "1.5px solid rgba(226, 232, 240, 0.9)",
        borderRadius: 16,
        cursor: "pointer",
        background: selected
          ? "linear-gradient(135deg, rgba(79, 70, 229, 0.12), rgba(59, 130, 246, 0.08))"
          : "linear-gradient(135deg, #ffffff, #f8fafc)",
        boxShadow: selected
          ? "0 14px 30px rgba(15, 23, 42, 0.16)"
          : "0 4px 12px rgba(15, 23, 42, 0.06)",
        transition: "all 0.25s ease",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export default function AIReadinessAssessment() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({
    industry: "",
    ai_tools_used: "",
    ai_level: "",
    goals: [],
    biggest_challenge: "",
    budget: "",
    timeline: "",
    name: "",
    email: "",
    phone: "",
  });

  const update = (key, value) => setAnswers((prev) => ({ ...prev, [key]: value }));
  const toggleGoal = (id) => {
    setAnswers((prev) => ({
      ...prev,
      goals: prev.goals.includes(id) ? prev.goals.filter((g) => g !== id) : [...prev.goals, id],
    }));
  };

  const canProceed = () => {
    const id = STEPS[step]?.id;
    if (id === "intro") return true;
    if (id === "company") return answers.industry;
    if (id === "ai_status") return answers.ai_level;
    if (id === "goals") return answers.goals.length > 0;
    if (id === "budget") return answers.budget && answers.timeline;
    if (id === "contact") return answers.name && answers.email;
    return true;
  };

  const handleNext = async () => {
    const id = STEPS[step]?.id;

    if (id === "contact") {
      const selectedGoals = (answers.goals || []).map((goalId) => {
        const goal = AI_GOALS.find((g) => g.id === goalId);
        if (!goal) return goalId;
        return `${goal.icon} ${goal.label}`;
      });

      const selectedPortfolios = getPortfoliosForIndustry(answers.industry);

      try {
        const response = await fetch(`${API_BASE_URL}/send-results`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: answers.email,
            name: answers.name,
            answers,
            result,
            selectedGoals,
            selectedPortfolios,
          }),
        });

        if (!response.ok) {
          const payload = await response.json().catch(() => ({}));
          throw new Error(payload.error || "Failed to send email");
        }
      } catch (error) {
        console.error("Failed to send results email:", error);
        alert("Email sending failed. Please ensure backend is running (npm run dev:full) and try again.");
        return;
      }
    }

    setStep((s) => Math.min(STEPS.length - 1, s + 1));
  };

  const result = getRecommendation(answers);

  const containerStyle = {
    minHeight: "100vh",
    background:
      "radial-gradient(circle at top left, #e0f2fe 0, transparent 40%), radial-gradient(circle at top right, #e9d5ff 0, transparent 45%), radial-gradient(circle at bottom, #dcfce7 0, #f9fafb 55%)",
    color: "#0f172a",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    padding: "72px 20px",
  };

  const cardStyle = {
    width: "100%",
    maxWidth: 960,
    background: "rgba(255,255,255,0.95)",
    borderRadius: 24,
    border: "1px solid rgba(226, 232, 240, 0.9)",
    overflow: "hidden",
    boxShadow:
      "0 24px 60px rgba(15, 23, 42, 0.18), 0 2px 8px rgba(15, 23, 42, 0.06)",
    backdropFilter: "blur(16px)",
  };

  const headingStyle = {
    fontSize: 28,
    fontWeight: 700,
    lineHeight: 1.3,
    marginBottom: 8,
    color: "#0f172a",
    fontFamily: "'Inter', sans-serif",
  };

  const subStyle = {
    fontSize: 15,
    color: "#64748b",
    lineHeight: 1.6,
    fontFamily: "'Inter', sans-serif",
    marginBottom: 32,
  };

  const labelStyle = {
    fontSize: 11,
    letterSpacing: 1.5,
    textTransform: "uppercase",
    color: "#64748b",
    marginBottom: 10,
    display: "block",
    fontFamily: "'Inter', sans-serif",
    fontWeight: 600,
  };

  const inputStyle = {
    width: "100%",
    padding: "14px 16px",
    background: "#fff",
    border: "1.5px solid #e2e8f0",
    borderRadius: 8,
    color: "#1e293b",
    fontSize: 15,
    fontFamily: "'Inter', sans-serif",
    outline: "none",
    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
    boxSizing: "border-box",
  };

  const btnPrimary = {
    padding: "16px 32px",
    background: PRIMARY_BLUE,
    color: "#fff",
    border: "none",
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 600,
    fontFamily: "'Inter', sans-serif",
    letterSpacing: 0.5,
    cursor: "pointer",
    transition: "all 0.2s ease",
    opacity: canProceed() ? 1 : 0.4,
    pointerEvents: canProceed() ? "auto" : "none",
    boxShadow: "0 14px 30px rgba(79, 70, 229, 0.4)",
  };

  const btnSecondary = {
    padding: "16px 24px",
    background: "transparent",
    color: "#64748b",
    border: "1.5px solid #e2e8f0",
    borderRadius: 8,
    fontSize: 13,
    fontFamily: "'Inter', sans-serif",
    fontWeight: 500,
    cursor: "pointer",
    transition: "all 0.2s ease",
  };

  const renderStep = () => {
    const id = STEPS[step]?.id;

    if (id === "intro") {
      return (
        <div style={{ padding: "60px 40px", textAlign: "center" }}>
          <div style={{ fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: PRIMARY_BLUE, marginBottom: 24, fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
            AI Readiness Assessment
          </div>
          <h1 style={{ ...headingStyle, fontSize: 34, marginBottom: 16 }}>
            See How Ready Your Business Is for AI
          </h1>
          <p style={{ ...subStyle, maxWidth: 460, margin: "0 auto 40px" }}>
            Answer a few focused questions to measure your AI readiness, discover the best-use cases for your business, and get a simple, practical roadmap to move forward.
          </p>
          <div style={{ display: "flex", gap: 32, justifyContent: "center", marginBottom: 48 }}>
            {[["2 min", "To complete"], ["Free", "Assessment"], ["Custom", "AI roadmap"]].map(([big, small], i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 22, color: PRIMARY_BLUE, fontFamily: "'Inter', sans-serif", fontWeight: 700 }}>{big}</div>
                <div style={{ fontSize: 11, color: "#64748b", letterSpacing: 1, textTransform: "uppercase", fontFamily: "'Inter', sans-serif", marginTop: 4, fontWeight: 500 }}>{small}</div>
              </div>
            ))}
          </div>
          <button onClick={() => setStep(1)} style={btnPrimary}>
            Start Assessment →
          </button>
        </div>
      );
    }

    if (id === "company") {
      return (
        <div style={{ padding: "40px 40px 32px" }}>
          <h2 style={headingStyle}>Tell us about your company</h2>
          <p style={subStyle}>This information helps us recommend the most relevant AI solutions for your business.</p>

          <div style={{ marginBottom: 24 }}>
            <label style={labelStyle}>What industry is your company in?</label>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {INDUSTRY_OPTIONS.map((ind) => (
                <SelectCard key={ind} selected={answers.industry === ind} onClick={() => update("industry", ind)}>
                  <span style={{ fontSize: 14, fontFamily: "'Inter', sans-serif", color: answers.industry === ind ? PRIMARY_BLUE : "#475569", fontWeight: answers.industry === ind ? 600 : 400 }}>
                    {ind}
                  </span>
                </SelectCard>
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (id === "ai_status") {
      return (
        <div style={{ padding: "40px 40px 32px" }}>
          <h2 style={headingStyle}>Your Current AI Experience</h2>
          <p style={subStyle}>Understanding your experience helps us recommend the best AI strategy for your business.</p>

          <div style={{ marginBottom: 28 }}>
            <label style={labelStyle}>What is your current level of AI experience?</label>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { id: "beginner", title: "Beginner", desc: "I use tools like ChatGPT mainly for personal use." },
                { id: "intermediate", title: "Intermediate", desc: "I use ChatGPT or similar AI tools for work or business tasks." },
                { id: "advanced", title: "Advanced", desc: "We already have AI tools integrated into our business workflows." },
              ].map((level) => (
                <SelectCard key={level.id} selected={answers.ai_level === level.id} onClick={() => update("ai_level", level.id)}>
                  <div style={{ fontSize: 16, fontWeight: 600, color: answers.ai_level === level.id ? PRIMARY_BLUE : "#1e293b", fontFamily: "'Inter', sans-serif", marginBottom: 4 }}>
                    {level.title}
                  </div>
                  <div style={{ fontSize: 13, color: "#64748b", fontFamily: "'Inter', sans-serif" }}>{level.desc}</div>
                </SelectCard>
              ))}
            </div>
          </div>

          <div>
            <label style={labelStyle}>AI Tools You Currently Use (optional)</label>
            <input
              style={inputStyle}
              placeholder="Example: ChatGPT, Midjourney, Zapier AI, Claude, etc."
              value={answers.ai_tools_used}
              onChange={(e) => update("ai_tools_used", e.target.value)}
              onFocus={(e) => { e.target.style.borderColor = PRIMARY_BLUE; e.target.style.boxShadow = "0 0 0 3px rgba(37, 99, 235, 0.15)"; }}
              onBlur={(e) => { e.target.style.borderColor = "#e2e8f0"; e.target.style.boxShadow = "none"; }}
            />
          </div>
        </div>
      );
    }

    if (id === "goals") {
      return (
        <div style={{ padding: "40px 40px 32px" }}>
          <h2 style={headingStyle}>What Do You Want AI to Solve?</h2>
          <p style={subStyle}>Select all that apply. This helps us recommend the most relevant AI solutions for your business.</p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {AI_GOALS.map((goal) => (
              <SelectCard key={goal.id} selected={answers.goals.includes(goal.id)} onClick={() => toggleGoal(goal.id)}>
                <div style={{ fontSize: 20, marginBottom: 6 }}>{goal.icon}</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: answers.goals.includes(goal.id) ? PRIMARY_BLUE : "#1e293b", fontFamily: "'Inter', sans-serif", marginBottom: 2 }}>
                  {goal.label}
                </div>
                <div style={{ fontSize: 10, letterSpacing: 1.5, textTransform: "uppercase", color: "#64748b", fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>
                  {goal.category}
                </div>
              </SelectCard>
            ))}
          </div>

          <div style={{ marginTop: 24 }}>
            <label style={labelStyle}>Biggest Challenge (optional)</label>
            <textarea
              style={{ ...inputStyle, minHeight: 80, resize: "vertical" }}
              placeholder="Describe the #1 problem you want AI to solve..."
              value={answers.biggest_challenge}
              onChange={(e) => update("biggest_challenge", e.target.value)}
              onFocus={(e) => { e.target.style.borderColor = PRIMARY_BLUE; e.target.style.boxShadow = "0 0 0 3px rgba(37, 99, 235, 0.15)"; }}
              onBlur={(e) => { e.target.style.borderColor = "#e2e8f0"; e.target.style.boxShadow = "none"; }}
            />
          </div>
        </div>
      );
    }

    if (id === "budget") {
      return (
        <div style={{ padding: "40px 40px 32px" }}>
          <h2 style={headingStyle}>Investment & Timeline</h2>
          <p style={subStyle}>This helps us recommend AI solutions that match your budget and implementation goals.</p>

          <div style={{ marginBottom: 28 }}>
            <label style={labelStyle}>Estimated Budget for AI</label>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {["$500 – $1K", "$1K – $5K", "$5K – $10K", "$10K – $25K", "$25K+"].map((b) => (
                <SelectCard key={b} selected={answers.budget === b} onClick={() => update("budget", b)}>
                  <span style={{ fontSize: 15, fontFamily: "'Inter', sans-serif", color: answers.budget === b ? PRIMARY_BLUE : "#475569", fontWeight: answers.budget === b ? 600 : 400 }}>
                    {b}
                  </span>
                </SelectCard>
              ))}
            </div>
          </div>

          <div>
            <label style={labelStyle}>Implementation Timeline</label>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {["Immediately", "Within 1–3 months", "Within 3–6 months", "Just exploring options"].map((t) => (
                <SelectCard key={t} selected={answers.timeline === t} onClick={() => update("timeline", t)}>
                  <span style={{ fontSize: 14, fontFamily: "'Inter', sans-serif", color: answers.timeline === t ? PRIMARY_BLUE : "#475569", fontWeight: answers.timeline === t ? 600 : 400, textAlign: "center", display: "block" }}>
                    {t}
                  </span>
                </SelectCard>
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (id === "contact") {
      return (
        <div style={{ padding: "40px 40px 32px" }}>
          <h2 style={headingStyle}>Almost There — Where Should We Send Your Results?</h2>
          <p style={subStyle}>
            Enter your details below and we’ll send your personalized AI readiness report and recommended AI roadmap to your inbox.
          </p>

          {[
            { key: "name", label: "Full Name", placeholder: "John Smith" },
            { key: "email", label: "Email Address", placeholder: "john@company.com" },
            { key: "phone", label: "Phone (optional)", placeholder: "+1 (555) 000-0000" },
          ].map((field) => (
            <div key={field.key} style={{ marginBottom: 20 }}>
              <label style={labelStyle}>{field.label}</label>
              <input
                style={inputStyle}
                placeholder={field.placeholder}
                value={answers[field.key]}
                onChange={(e) => update(field.key, e.target.value)}
                onFocus={(e) => { e.target.style.borderColor = PRIMARY_BLUE; e.target.style.boxShadow = "0 0 0 3px rgba(37, 99, 235, 0.15)"; }}
                onBlur={(e) => { e.target.style.borderColor = "#e2e8f0"; e.target.style.boxShadow = "none"; }}
              />
            </div>
          ))}
        </div>
      );
    }

    if (id === "result") {
      const tierColors = {
        "High Opportunity": "#16a34a",
        "Strong Potential": PRIMARY_BLUE,
        "Early Stage": "#64748b",
      };

      const portfolios = getPortfoliosForIndustry(answers.industry);

      return (
        <div style={{ padding: "48px 40px" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <h2 style={{ ...headingStyle, fontSize: 32, marginBottom: 12 }}>
              🚀 Your AI Readiness Results
            </h2>
          </div>

          <div style={{ background: "#f8fafc", borderRadius: 12, padding: 28, marginBottom: 24, border: "1px solid #e2e8f0", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
            <div style={labelStyle}>Recommended AI Category</div>
            <div style={{ fontSize: 22, color: PRIMARY_BLUE, marginBottom: 16, fontFamily: "'Inter', sans-serif", fontWeight: 700 }}>
              {result.primaryCategory}
            </div>
            <div style={labelStyle}>Selected Goals</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
              {answers.goals.map((g) => {
                const goal = AI_GOALS.find((a) => a.id === g);
                return (
                  <span
                    key={g}
                    style={{
                      padding: "6px 14px",
                      background: "rgba(37, 99, 235, 0.08)",
                      border: "1px solid #e2e8f0",
                      borderRadius: 100,
                      fontSize: 12,
                      color: "#1e293b",
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 500,
                    }}
                  >
                    {goal?.icon} {goal?.label}
                  </span>
                );
              })}
            </div>
            <div style={labelStyle}>Your Business Profile</div>
            <div style={{ fontSize: 13, color: "#64748b", fontFamily: "'Inter', sans-serif", lineHeight: 1.8 }}>
              Industry: <strong>{answers.industry || "Not specified"}</strong>
              <br />
              AI Experience: <strong>{answers.ai_level || "Not specified"}</strong>
              <br />
              Budget: <strong>{answers.budget || "Not specified"}</strong>
              <br />
              Timeline: <strong>{answers.timeline || "Not specified"}</strong>
            </div>
          </div>

          {portfolios.length > 0 && (
            <div style={{ marginBottom: 32 }}>
              <div style={labelStyle}>Example projects in your space</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
                {portfolios.map((p) => (
                  <div
                    key={p.id}
                    style={{
                      borderRadius: 18,
                      padding: 20,
                      background:
                        "linear-gradient(135deg, rgba(79, 70, 229, 0.06), rgba(59, 130, 246, 0.04))",
                      border: "1px solid rgba(209, 213, 219, 0.9)",
                      boxShadow: "0 10px 18px rgba(15, 23, 42, 0.08)",
                    }}
                  >
                    <div style={{ fontSize: 22, marginBottom: 8 }}>{p.emoji}</div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: "#111827", fontFamily: "'Inter', sans-serif", marginBottom: 4 }}>
                      {p.title}
                    </div>
                    <div style={{ fontSize: 13, color: "#4b5563", fontFamily: "'Inter', sans-serif", marginBottom: 10 }}>
                      {p.tagline}
                    </div>
                    <ul style={{ paddingLeft: 18, margin: 0, marginBottom: 10, color: "#6b7280", fontSize: 12, fontFamily: "'Inter', sans-serif", lineHeight: 1.6 }}>
                      {p.bullets.slice(0, 3).map((b, idx) => (
                        <li key={idx}>{b}</li>
                      ))}
                    </ul>
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        color: PRIMARY_BLUE,
                        textDecoration: "none",
                      }}
                    >
                      View whole case study →
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div style={{ textAlign: "center", marginTop: 36 }}>
            <div style={{ ...subStyle, maxWidth: 460, margin: "0 auto 20px", fontSize: 14 }}>
              A short consultation will help you turn these results into a clear, actionable AI plan for your business.
            </div>
            <ul style={{ listStyle: "disc", textAlign: "left", maxWidth: 460, margin: "0 auto 24px", paddingLeft: 20, color: "#475569", fontFamily: "'Inter', sans-serif", fontSize: 14, lineHeight: 1.7 }}>
              <li>A custom AI strategy tailored to your business</li>
              <li>Recommended AI tools & automation opportunities</li>
              <li>A simple, step-by-step implementation roadmap</li>
            </ul>
            <button
              onClick={() => {
                window.open("https://calendly.com/code_squad/30min", "_blank", "noopener,noreferrer");
              }}
              style={{ ...btnPrimary, opacity: 1, pointerEvents: "auto" }}
            >
              book a 10 min free audit →
            </button>
            <div style={{ marginTop: 16, fontSize: 12, color: "#64748b", fontFamily: "'Inter', sans-serif" }}>
              No commitment required · Cancel anytime
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div style={containerStyle}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <div style={cardStyle}>
        <ProgressBar currentStep={step} />
        {renderStep()}
        {STEPS[step]?.id !== "intro" && STEPS[step]?.id !== "result" && (
          <div style={{ padding: "0 40px 32px", display: "flex", justifyContent: "space-between" }}>
            <button style={btnSecondary} onClick={() => setStep((s) => Math.max(0, s - 1))}>
              ← Back
            </button>
            <button style={btnPrimary} onClick={handleNext}>
              {STEPS[step]?.id === "contact" ? "Get My Results →" : "Continue →"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
