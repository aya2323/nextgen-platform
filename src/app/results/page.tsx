"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  MessageCircle,
  BrainCircuit,
  Zap,
  Layout,
  Sparkles,
  Bot,
  BarChart3,
  Cog,
  Users,
  Globe,
  ChevronDown,
  Send,
  Layers,
  Palette,
  Monitor,
} from "lucide-react";

/* ── Types ── */
interface FormPayload {
  name: string;
  company: string;
  whatsapp: string;
  industry: string;
  targetAudience: string;
  features: string[];
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  aiPreference: string;
}

function getStoredFormData(): FormPayload | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = sessionStorage.getItem("nextgen_form");
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

/* ── Feature Previews ── */
const FEATURE_TABS = [
  { id: "chatbot", label: "AI Chatbots", icon: Bot },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "automation", label: "Automation", icon: Cog },
  { id: "crm", label: "CRM Tools", icon: Users },
];

function ChatbotPreview({ primaryColor, company }: { primaryColor: string; company: string }) {
  const [messages, setMessages] = useState([
    { from: "bot", text: `Welcome to ${company}! How can I help you today?` },
  ]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const botResponses: Record<string, string> = {
    pricing: "Our plans start at $49/mo for startups. Enterprise plans are fully customized. Want me to connect you with our sales team?",
    demo: "I'd love to show you a demo! Our team can set up a personalized walkthrough. Shall I schedule one for you?",
    features: "We offer AI-powered analytics, automated workflows, CRM integration, and real-time dashboards. Which interests you most?",
    help: "I can help with product info, pricing, demos, and technical questions. Just ask!",
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setMessages((prev) => [...prev, { from: "user", text: userMsg }]);
    setInput("");

    setTimeout(() => {
      const lower = userMsg.toLowerCase();
      let response = "Thanks for your message! Our AI will analyze your request and provide the best solution. Is there anything specific you'd like to know?";
      for (const [key, val] of Object.entries(botResponses)) {
        if (lower.includes(key)) { response = val; break; }
      }
      setMessages((prev) => [...prev, { from: "bot", text: response }]);
    }, 800);
  };

  return (
    <div className="rounded-xl border border-white/10 bg-[#0a0a16] overflow-hidden h-[400px] flex flex-col">
      <div className="px-4 py-3 border-b border-white/10 flex items-center gap-2" style={{ background: `${primaryColor}15` }}>
        <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: primaryColor }}>
          <Bot size={16} className="text-white" />
        </div>
        <div>
          <div className="text-sm font-semibold text-white">{company} AI Assistant</div>
          <div className="text-[10px] text-green-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400" /> Online
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] px-3 py-2 rounded-xl text-sm ${
                msg.from === "user"
                  ? "text-white rounded-br-sm"
                  : "bg-[#12121f] text-gray-300 rounded-bl-sm border border-white/5"
              }`}
              style={msg.from === "user" ? { background: primaryColor } : undefined}
            >
              {msg.text}
            </div>
          </motion.div>
        ))}
        <div ref={chatEndRef} />
      </div>
      <div className="px-4 py-3 border-t border-white/10 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type a message... (try: pricing, demo, features)"
          className="flex-1 bg-[#12121f] border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 outline-none focus:border-[#2563eb]"
        />
        <button
          onClick={handleSend}
          className="px-3 py-2 rounded-lg text-white"
          style={{ background: primaryColor }}
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}

function AnalyticsPreview({ primaryColor, secondaryColor, accentColor }: { primaryColor: string; secondaryColor: string; accentColor: string }) {
  const barData = [65, 42, 88, 55, 78, 92, 70, 85, 60, 95, 72, 80];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const maxBar = Math.max(...barData);

  return (
    <div className="rounded-xl border border-white/10 bg-[#0a0a16] p-6 h-[400px] flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-white font-semibold">Revenue Analytics</h3>
        <div className="flex gap-4 text-xs text-gray-500">
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full" style={{ background: primaryColor }} /> Revenue</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full" style={{ background: secondaryColor }} /> Growth</span>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: "Total Revenue", value: "$284K", change: "+34%", color: primaryColor },
          { label: "Active Users", value: "12,847", change: "+18%", color: secondaryColor },
          { label: "Conversion", value: "4.8%", change: "+0.6%", color: accentColor },
        ].map((stat) => (
          <div key={stat.label} className="p-3 rounded-lg border border-white/5 bg-[#12121f]">
            <div className="text-[10px] text-gray-500 mb-1">{stat.label}</div>
            <div className="text-lg font-bold text-white">{stat.value}</div>
            <div className="text-[10px] font-semibold" style={{ color: stat.color }}>{stat.change}</div>
          </div>
        ))}
      </div>
      <div className="flex-1 flex items-end gap-1.5">
        {barData.map((val, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-1">
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: `${(val / maxBar) * 100}%` }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
              className="w-full rounded-t"
              style={{ background: i % 2 === 0 ? primaryColor : secondaryColor, minHeight: 4 }}
            />
            <span className="text-[9px] text-gray-600">{months[i]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AutomationPreview({ primaryColor, secondaryColor, accentColor }: { primaryColor: string; secondaryColor: string; accentColor: string }) {
  const workflows = [
    { name: "Lead Capture → CRM", status: "active", runs: 1247 },
    { name: "Email Follow-up", status: "active", runs: 892 },
    { name: "Invoice Generator", status: "paused", runs: 456 },
    { name: "Social Media Post", status: "active", runs: 2103 },
    { name: "Support Ticket Router", status: "active", runs: 738 },
  ];

  return (
    <div className="rounded-xl border border-white/10 bg-[#0a0a16] p-6 h-[400px] flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-semibold">Active Workflows</h3>
        <span className="text-xs px-2 py-1 rounded-full" style={{ color: accentColor, background: `${accentColor}15` }}>5 workflows</span>
      </div>
      <div className="flex-1 space-y-3 overflow-y-auto">
        {workflows.map((w, i) => (
          <motion.div
            key={w.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center gap-3 p-3 rounded-lg border border-white/5 bg-[#12121f]"
          >
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${i % 2 === 0 ? primaryColor : secondaryColor}20` }}>
              <Cog size={16} style={{ color: i % 2 === 0 ? primaryColor : secondaryColor }} />
            </div>
            <div className="flex-1">
              <div className="text-sm text-white font-medium">{w.name}</div>
              <div className="text-[10px] text-gray-500">{w.runs.toLocaleString()} runs</div>
            </div>
            <span
              className="text-[10px] px-2 py-0.5 rounded-full font-medium"
              style={
                w.status === "active"
                  ? { color: accentColor, background: `${accentColor}15` }
                  : { color: "#f59e0b", background: "#f59e0b15" }
              }
            >
              {w.status}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function CRMPreview({ primaryColor, secondaryColor, accentColor }: { primaryColor: string; secondaryColor: string; accentColor: string }) {
  const leads = [
    { name: "Ahmed Hassan", company: "TechFlow", score: 92, stage: "Qualified" },
    { name: "Sara Ali", company: "DataBridge", score: 87, stage: "Proposal" },
    { name: "Omar Khalil", company: "CloudNine", score: 78, stage: "Discovery" },
    { name: "Layla Nasser", company: "GrowthAI", score: 95, stage: "Negotiation" },
    { name: "Yusuf Ibrahim", company: "NovaLabs", score: 64, stage: "New Lead" },
  ];

  return (
    <div className="rounded-xl border border-white/10 bg-[#0a0a16] p-6 h-[400px] flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-semibold">Lead Pipeline</h3>
        <span className="text-xs px-2 py-1 rounded-full" style={{ color: primaryColor, background: `${primaryColor}15` }}>5 active leads</span>
      </div>
      <div className="flex-1 space-y-2 overflow-y-auto">
        {leads.map((lead, i) => (
          <motion.div
            key={lead.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="flex items-center gap-3 p-3 rounded-lg border border-white/5 bg-[#12121f]"
          >
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` }}>
              {lead.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm text-white font-medium truncate">{lead.name}</div>
              <div className="text-[10px] text-gray-500">{lead.company}</div>
            </div>
            <div className="text-right">
              <div className="text-sm font-bold" style={{ color: lead.score > 80 ? accentColor : "#f59e0b" }}>{lead.score}%</div>
              <div className="text-[10px] text-gray-500">{lead.stage}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ── Template Previews ── */
const TEMPLATES = [
  { id: "minimal", name: "Minimalist Pro", icon: Layout, desc: "Clean, modern layout with bold typography and strategic CTAs" },
  { id: "dynamic", name: "Dynamic Showcase", icon: Sparkles, desc: "Interactive experience with 3D animations and immersive storytelling" },
  { id: "corporate", name: "Corporate Suite", icon: Layers, desc: "Professional enterprise layout with sections for services, team, and case studies" },
];

const LANGUAGES = [
  { code: "en", label: "English", dir: "ltr" as const },
  { code: "ar", label: "العربية (Arabic)", dir: "rtl" as const },
  { code: "multi", label: "Multi-language", dir: "ltr" as const },
];

/* ── Template Preview Components ── */
function MinimalTemplatePreview({ company, primaryColor, secondaryColor, isRTL }: { company: string; primaryColor: string; secondaryColor: string; isRTL: boolean }) {
  return (
    <div className="rounded-xl border border-white/10 bg-[#08080f] overflow-hidden" dir={isRTL ? "rtl" : "ltr"}>
      <div className="px-6 py-3 flex items-center justify-between border-b border-white/5">
        <span className="text-sm font-bold text-white">{company}</span>
        <div className="flex gap-4 text-xs text-gray-500">
          <span>{isRTL ? "الرئيسية" : "Home"}</span>
          <span>{isRTL ? "الخدمات" : "Services"}</span>
          <span>{isRTL ? "تواصل" : "Contact"}</span>
        </div>
      </div>
      <div className="px-8 py-12 text-center">
        <div className="text-2xl font-bold text-white mb-2">{isRTL ? `${company} — مستقبل التكنولوجيا` : `${company} — Future of Technology`}</div>
        <p className="text-sm text-gray-400 mb-6 max-w-md mx-auto">{isRTL ? "حلول ذكية مدعومة بالذكاء الاصطناعي لتسريع نمو أعمالك" : "AI-powered solutions to accelerate your business growth"}</p>
        <button className="px-6 py-2 rounded-lg text-white text-sm font-semibold" style={{ background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` }}>
          {isRTL ? "ابدأ الآن" : "Get Started"}
        </button>
      </div>
      <div className="px-8 py-6 border-t border-white/5 grid grid-cols-3 gap-4">
        {(isRTL ? ["تحليلات ذكية", "أتمتة", "حماية"] : ["Smart Analytics", "Automation", "Security"]).map((f) => (
          <div key={f} className="text-center p-3 rounded-lg border border-white/5">
            <div className="text-xs text-gray-400">{f}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DynamicTemplatePreview({ company, primaryColor, secondaryColor, accentColor, isRTL }: { company: string; primaryColor: string; secondaryColor: string; accentColor: string; isRTL: boolean }) {
  return (
    <div className="rounded-xl border border-white/10 bg-[#06060c] overflow-hidden" dir={isRTL ? "rtl" : "ltr"}>
      <div className="relative px-8 py-14 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ background: `radial-gradient(ellipse at center, ${primaryColor}, transparent 70%)` }} />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-semibold mb-4 border" style={{ color: accentColor, borderColor: `${accentColor}40`, background: `${accentColor}10` }}>
            <Sparkles size={10} /> {isRTL ? "تجربة تفاعلية" : "Interactive Experience"}
          </div>
          <div className="text-2xl font-black mb-2" style={{ background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor}, ${accentColor})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            {company}
          </div>
          <p className="text-sm text-gray-400">{isRTL ? "تكنولوجيا الجيل القادم" : "Next-generation technology"}</p>
        </div>
      </div>
      <div className="px-8 py-6 grid grid-cols-2 gap-3 border-t border-white/5">
        {(isRTL ? ["معالجة ذكية", "تحليل تنبؤي", "نشر عالمي", "أتمتة AI"] : ["Neural Processing", "Predictive Analytics", "Global Deploy", "AI Automation"]).map((s, i) => (
          <div key={s} className="p-3 rounded-lg border border-white/5 bg-[#0a0a16]">
            <div className="w-6 h-6 rounded mb-2 flex items-center justify-center" style={{ background: `${i % 2 === 0 ? primaryColor : secondaryColor}20` }}>
              <Zap size={12} style={{ color: i % 2 === 0 ? primaryColor : secondaryColor }} />
            </div>
            <div className="text-xs text-gray-400">{s}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CorporateTemplatePreview({ company, primaryColor, secondaryColor, isRTL }: { company: string; primaryColor: string; secondaryColor: string; isRTL: boolean }) {
  return (
    <div className="rounded-xl border border-white/10 bg-[#09090f] overflow-hidden" dir={isRTL ? "rtl" : "ltr"}>
      <div className="px-6 py-3 flex items-center justify-between border-b border-white/5" style={{ background: `${primaryColor}08` }}>
        <span className="text-sm font-bold text-white">{company}</span>
        <div className="flex gap-4 text-xs text-gray-500">
          <span>{isRTL ? "من نحن" : "About"}</span>
          <span>{isRTL ? "الفريق" : "Team"}</span>
          <span>{isRTL ? "المشاريع" : "Projects"}</span>
          <span>{isRTL ? "تواصل" : "Contact"}</span>
        </div>
      </div>
      <div className="px-8 py-10 flex gap-6">
        <div className="flex-1">
          <div className="text-xl font-bold text-white mb-2">{isRTL ? "حلول مؤسسية" : "Enterprise Solutions"}</div>
          <p className="text-xs text-gray-400 mb-4">{isRTL ? "بنية تحتية موثوقة لنمو أعمالك" : "Trusted infrastructure for business growth"}</p>
          <div className="flex gap-2">
            <button className="px-4 py-1.5 rounded text-white text-xs font-semibold" style={{ background: primaryColor }}>{isRTL ? "اطلب عرض" : "Request Demo"}</button>
            <button className="px-4 py-1.5 rounded text-xs border border-white/20 text-gray-400">{isRTL ? "المزيد" : "Learn More"}</button>
          </div>
        </div>
        <div className="flex-1 grid grid-cols-2 gap-2">
          {["99.9%", "24/7", "150+", "50ms"].map((v, i) => (
            <div key={v} className="p-2 rounded border border-white/5 text-center">
              <div className="text-lg font-bold" style={{ color: i % 2 === 0 ? primaryColor : secondaryColor }}>{v}</div>
              <div className="text-[9px] text-gray-500">{["Uptime", "Support", "Clients", "Latency"][i]}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Main Page ── */
export default function ResultsPage() {
  const [progress, setProgress] = useState(0);
  const [analyzing, setAnalyzing] = useState(true);
  const [formData] = useState<FormPayload | null>(() => getStoredFormData());

  /* Config state */
  const [activeFeature, setActiveFeature] = useState("chatbot");
  const [selectedTemplate, setSelectedTemplate] = useState("minimal");
  const [selectedLang, setSelectedLang] = useState("en");
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  useEffect(() => {
    if (!analyzing) return;
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => setAnalyzing(false), 500);
          return 100;
        }
        return p + Math.random() * 3 + 1;
      });
    }, 80);
    return () => clearInterval(interval);
  }, [analyzing]);

  const company = formData?.company || "Your Company";
  const industry = formData?.industry || "Technology";
  const clientName = formData?.name || "Client";
  const primaryColor = formData?.primaryColor || "#2563eb";
  const secondaryColor = formData?.secondaryColor || "#a855f7";
  const accentColor = formData?.accentColor || "#10b981";
  const selectedFeatures = formData?.features || [];
  const isRTL = selectedLang === "ar";
  const langLabel = LANGUAGES.find((l) => l.code === selectedLang)?.label || "English";
  const templateLabel = TEMPLATES.find((t) => t.id === selectedTemplate)?.name || "Minimalist Pro";

  /* Build WhatsApp message */
  const buildWhatsAppURL = () => {
    const featuresText = selectedFeatures.length > 0 ? selectedFeatures.join(", ") : "None selected";
    const activeFeatureLabel = FEATURE_TABS.find((f) => f.id === activeFeature)?.label || activeFeature;

    const lines = [
      `🚀 *NEXTGEN Project Order*`,
      ``,
      `👤 *Client:* ${clientName}`,
      `🏢 *Company:* ${company}`,
      `📱 *WhatsApp:* ${formData?.whatsapp || "N/A"}`,
      `🏭 *Industry:* ${industry}`,
      `🎯 *Target Audience:* ${formData?.targetAudience || "N/A"}`,
      ``,
      `🎨 *Brand Colors:*`,
      `  Primary: ${primaryColor}`,
      `  Secondary: ${secondaryColor}`,
      `  Accent: ${accentColor}`,
      ``,
      `✅ *Selected Features:* ${featuresText}`,
      `🔍 *Tested Feature:* ${activeFeatureLabel}`,
      `📐 *Chosen Template:* ${templateLabel}`,
      `🌐 *Website Language:* ${langLabel}`,
      `🤖 *AI Preference:* ${formData?.aiPreference || "Not specified"}`,
      ``,
      `📅 *Submitted:* ${new Date().toLocaleString()}`,
    ];

    const text = encodeURIComponent(lines.join("\n"));
    return `https://wa.me/201281835834?text=${text}`;
  };

  /* ── Analyzing screen ── */
  if (analyzing) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <div className="w-20 h-20 mx-auto mb-8 relative">
            <BrainCircuit size={48} className="text-[#2563eb] absolute inset-0 m-auto" />
            <div className="absolute inset-0 border-2 border-[#2563eb]/30 rounded-full animate-ping" />
            <div className="absolute inset-0 border-2 border-[#a855f7]/20 rounded-full animate-ping" style={{ animationDelay: "0.5s" }} />
          </div>
          <h2 className="text-2xl font-bold mb-4 gradient-text">AI Building Your Configurator...</h2>
          <div className="w-full bg-[#1a1a2e] rounded-full h-3 mb-3 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-[#2563eb] to-[#a855f7]"
              initial={{ width: "0%" }}
              animate={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
          <p className="text-sm text-gray-400">{Math.min(Math.floor(progress), 100)}%</p>
          <div className="mt-6 space-y-2 text-xs text-gray-500">
            {progress > 20 && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}><Zap size={12} className="inline mr-1 text-[#2563eb]" />Analyzing your niche data...</motion.p>}
            {progress > 50 && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}><Zap size={12} className="inline mr-1 text-[#a855f7]" />Preparing interactive previews...</motion.p>}
            {progress > 80 && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}><Zap size={12} className="inline mr-1 text-[#2563eb]" />Applying your brand identity...</motion.p>}
          </div>
        </motion.div>
      </div>
    );
  }

  /* ── Main Configurator ── */
  return (
    <div className="min-h-screen px-4 md:px-6 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Configure Your <span className="gradient-text">AI-Powered Site</span>
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto">
            Test features, choose your template, and customize your site for{" "}
            <span style={{ color: primaryColor }}>{company}</span>. When ready, submit your order.
          </p>
        </motion.div>

        {/* ─── Section 1: Live Feature Testing ─── */}
        <motion.section initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `${primaryColor}20` }}>
              <Monitor size={20} style={{ color: primaryColor }} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Live Feature Testing</h2>
              <p className="text-xs text-gray-500">Click a feature tab to see an interactive preview</p>
            </div>
          </div>

          {/* Feature Tabs */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {FEATURE_TABS.map((tab) => {
              const isActive = activeFeature === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveFeature(tab.id)}
                  className="shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all"
                  style={
                    isActive
                      ? { background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`, color: "white", boxShadow: `0 0 20px ${primaryColor}30` }
                      : { border: `1px solid ${primaryColor}20`, color: "#9ca3af", background: "transparent" }
                  }
                >
                  <tab.icon size={16} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Feature Preview */}
          <AnimatePresence mode="wait">
            <motion.div key={activeFeature} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
              {activeFeature === "chatbot" && <ChatbotPreview primaryColor={primaryColor} company={company} />}
              {activeFeature === "analytics" && <AnalyticsPreview primaryColor={primaryColor} secondaryColor={secondaryColor} accentColor={accentColor} />}
              {activeFeature === "automation" && <AutomationPreview primaryColor={primaryColor} secondaryColor={secondaryColor} accentColor={accentColor} />}
              {activeFeature === "crm" && <CRMPreview primaryColor={primaryColor} secondaryColor={secondaryColor} accentColor={accentColor} />}
            </motion.div>
          </AnimatePresence>

          {/* Selected Features chips */}
          {selectedFeatures.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="text-xs text-gray-500 py-1">Your selected features:</span>
              {selectedFeatures.map((f) => (
                <span key={f} className="px-3 py-1 rounded-full text-xs font-medium border" style={{ color: accentColor, borderColor: `${accentColor}30`, background: `${accentColor}10` }}>
                  {f}
                </span>
              ))}
            </div>
          )}
        </motion.section>

        {/* ─── Section 2: Language Selection ─── */}
        <motion.section initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `${secondaryColor}20` }}>
              <Globe size={20} style={{ color: secondaryColor }} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Website Language</h2>
              <p className="text-xs text-gray-500">Choose the language for your website — layout updates in real-time</p>
            </div>
          </div>

          <div className="relative inline-block">
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center gap-3 px-5 py-3 rounded-xl border text-sm font-medium text-white transition-all min-w-[240px]"
              style={{ borderColor: `${secondaryColor}40`, background: `${secondaryColor}10` }}
            >
              <Globe size={16} style={{ color: secondaryColor }} />
              {langLabel}
              <ChevronDown size={16} className={`ml-auto text-gray-400 transition-transform ${langDropdownOpen ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {langDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="absolute top-full mt-2 left-0 w-full rounded-xl border border-white/10 bg-[#0a0a16] overflow-hidden z-20 shadow-xl"
                >
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => { setSelectedLang(lang.code); setLangDropdownOpen(false); }}
                      className={`w-full text-left px-4 py-3 text-sm transition-all hover:bg-white/5 ${
                        selectedLang === lang.code ? "text-white font-semibold" : "text-gray-400"
                      }`}
                      style={selectedLang === lang.code ? { background: `${secondaryColor}15` } : undefined}
                    >
                      <div className="flex items-center justify-between">
                        {lang.label}
                        {selectedLang === lang.code && <Check size={14} style={{ color: secondaryColor }} />}
                      </div>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {isRTL && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3 text-xs text-gray-500 flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-[#a855f7]/10 text-[#a855f7] font-semibold">RTL</span>
              Layout will switch to right-to-left direction
            </motion.div>
          )}
          {selectedLang === "multi" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3 text-xs text-gray-500 flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-[#2563eb]/10 text-[#2563eb] font-semibold">i18n</span>
              Multi-language support with automatic detection
            </motion.div>
          )}
        </motion.section>

        {/* ─── Section 3: Template Selection ─── */}
        <motion.section initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `${accentColor}20` }}>
              <Palette size={20} style={{ color: accentColor }} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Landing Page Template</h2>
              <p className="text-xs text-gray-500">Choose a layout style — preview updates with your brand colors</p>
            </div>
          </div>

          {/* Template selector buttons */}
          <div className="grid grid-cols-3 gap-3 mb-8">
            {TEMPLATES.map((tmpl) => {
              const isActive = selectedTemplate === tmpl.id;
              return (
                <button
                  key={tmpl.id}
                  onClick={() => setSelectedTemplate(tmpl.id)}
                  className={`p-4 rounded-xl border text-left transition-all ${isActive ? "scale-[1.02]" : "hover:border-white/20"}`}
                  style={
                    isActive
                      ? { borderColor: primaryColor, background: `${primaryColor}10`, boxShadow: `0 0 20px ${primaryColor}15` }
                      : { borderColor: "rgba(255,255,255,0.08)", background: "#0a0a16" }
                  }
                >
                  <div className="flex items-center gap-2 mb-2">
                    <tmpl.icon size={18} style={{ color: isActive ? primaryColor : "#6b7280" }} />
                    <span className={`text-sm font-semibold ${isActive ? "text-white" : "text-gray-400"}`}>{tmpl.name}</span>
                  </div>
                  <p className="text-[11px] text-gray-500 leading-relaxed">{tmpl.desc}</p>
                  {isActive && (
                    <div className="mt-2 flex items-center gap-1 text-[10px] font-semibold" style={{ color: primaryColor }}>
                      <Check size={12} /> Selected
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Template Preview */}
          <AnimatePresence mode="wait">
            <motion.div key={`${selectedTemplate}-${selectedLang}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
              {selectedTemplate === "minimal" && <MinimalTemplatePreview company={company} primaryColor={primaryColor} secondaryColor={secondaryColor} isRTL={isRTL} />}
              {selectedTemplate === "dynamic" && <DynamicTemplatePreview company={company} primaryColor={primaryColor} secondaryColor={secondaryColor} accentColor={accentColor} isRTL={isRTL} />}
              {selectedTemplate === "corporate" && <CorporateTemplatePreview company={company} primaryColor={primaryColor} secondaryColor={secondaryColor} isRTL={isRTL} />}
            </motion.div>
          </AnimatePresence>
        </motion.section>

        {/* ─── Section 4: Configuration Summary & Submit ─── */}
        <motion.section initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <div className="glow-border rounded-2xl bg-[#0a0a14] p-8">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
              <Send size={20} style={{ color: primaryColor }} />
              Your Configuration Summary
            </h2>

            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <div className="p-4 rounded-xl border border-white/5 bg-[#12121f]">
                <div className="text-[10px] uppercase tracking-wider text-gray-500 mb-2">Client Details</div>
                <div className="space-y-1 text-sm">
                  <div className="text-gray-300"><span className="text-gray-500">Name:</span> {clientName}</div>
                  <div className="text-gray-300"><span className="text-gray-500">Company:</span> {company}</div>
                  <div className="text-gray-300"><span className="text-gray-500">Industry:</span> {industry}</div>
                </div>
              </div>
              <div className="p-4 rounded-xl border border-white/5 bg-[#12121f]">
                <div className="text-[10px] uppercase tracking-wider text-gray-500 mb-2">Site Configuration</div>
                <div className="space-y-1 text-sm">
                  <div className="text-gray-300"><span className="text-gray-500">Template:</span> {templateLabel}</div>
                  <div className="text-gray-300"><span className="text-gray-500">Language:</span> {langLabel}</div>
                  <div className="text-gray-300 flex items-center gap-2">
                    <span className="text-gray-500">Colors:</span>
                    <span className="w-4 h-4 rounded" style={{ background: primaryColor }} />
                    <span className="w-4 h-4 rounded" style={{ background: secondaryColor }} />
                    <span className="w-4 h-4 rounded" style={{ background: accentColor }} />
                  </div>
                </div>
              </div>
              <div className="md:col-span-2 p-4 rounded-xl border border-white/5 bg-[#12121f]">
                <div className="text-[10px] uppercase tracking-wider text-gray-500 mb-2">Selected AI Features</div>
                {selectedFeatures.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {selectedFeatures.map((f) => (
                      <span key={f} className="px-2.5 py-1 rounded-full text-xs border" style={{ color: primaryColor, borderColor: `${primaryColor}30`, background: `${primaryColor}10` }}>{f}</span>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">No features selected</p>
                )}
              </div>
            </div>

            {/* Submit to WhatsApp */}
            <a
              href={buildWhatsAppURL()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-3 rounded-xl px-8 py-4 font-bold text-white text-lg transition-all hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(37,211,102,0.3)]"
              style={{ background: "linear-gradient(135deg, #25d366, #128C7E)" }}
            >
              <MessageCircle size={24} />
              Submit Order via WhatsApp
            </a>
            <p className="text-center text-xs text-gray-500 mt-3">
              All your configuration details will be sent directly to our team on WhatsApp
            </p>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
