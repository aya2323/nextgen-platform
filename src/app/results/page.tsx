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

/* ── Language Detection ── */
function isArabic(text: string): boolean {
  const arabicRegex = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;
  const arabicChars = (text.match(/[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/g) || []).length;
  const latinChars = (text.match(/[a-zA-Z]/g) || []).length;
  return arabicRegex.test(text) && arabicChars >= latinChars;
}

/* ── Industry-Specific Welcome Messages ── */
function getIndustryWelcome(industry: string, company: string, lang: "ar" | "en"): string {
  const lower = industry.toLowerCase();
  const welcomes: Record<string, { en: string; ar: string }> = {
    "real estate": {
      en: `Welcome to ${company}! I can help you showcase your properties, filter locations, and capture leads easily. Want to see our property listing forms?`,
      ar: `مرحبًا بك في ${company}! يمكنني مساعدتك في عرض عقاراتك وتصفية المواقع والتقاط العملاء المحتملين بسهولة. هل تريد رؤية نماذج قوائم العقارات الخاصة بنا؟`,
    },
    ecommerce: {
      en: `Welcome to ${company}! I can help you set up product catalogs, shopping carts, and checkout flows. Ready to build your online store?`,
      ar: `مرحبًا بك في ${company}! يمكنني مساعدتك في إعداد كتالوجات المنتجات وعربات التسوق وعمليات الدفع. هل أنت مستعد لبناء متجرك الإلكتروني؟`,
    },
    "e-commerce": {
      en: `Welcome to ${company}! I can help you set up product catalogs, shopping carts, and checkout flows. Ready to build your online store?`,
      ar: `مرحبًا بك في ${company}! يمكنني مساعدتك في إعداد كتالوجات المنتجات وعربات التسوق وعمليات الدفع. هل أنت مستعد لبناء متجرك الإلكتروني؟`,
    },
    clothing: {
      en: `Welcome to ${company}! I can help you build a stunning fashion storefront with product galleries, size guides, and style recommendations. Shall we start?`,
      ar: `مرحبًا بك في ${company}! يمكنني مساعدتك في بناء واجهة أزياء مذهلة مع معارض المنتجات ودليل المقاسات وتوصيات الأنماط. هل نبدأ؟`,
    },
    fashion: {
      en: `Welcome to ${company}! I can help you build a stunning fashion storefront with product galleries, size guides, and style recommendations. Shall we start?`,
      ar: `مرحبًا بك في ${company}! يمكنني مساعدتك في بناء واجهة أزياء مذهلة مع معارض المنتجات ودليل المقاسات وتوصيات الأنماط. هل نبدأ؟`,
    },
    healthcare: {
      en: `Welcome to ${company}! I can help you create patient portals, appointment booking, and health tracking dashboards. How can I assist you?`,
      ar: `مرحبًا بك في ${company}! يمكنني مساعدتك في إنشاء بوابات المرضى وحجز المواعيد ولوحات تتبع الصحة. كيف يمكنني مساعدتك؟`,
    },
    education: {
      en: `Welcome to ${company}! I can help you build course pages, student portals, and interactive learning tools. What would you like to explore?`,
      ar: `مرحبًا بك في ${company}! يمكنني مساعدتك في بناء صفحات الدورات وبوابات الطلاب وأدوات التعلم التفاعلية. ماذا تريد أن تستكشف؟`,
    },
    restaurant: {
      en: `Welcome to ${company}! I can help you design menus, online ordering, and reservation systems. What feature interests you most?`,
      ar: `مرحبًا بك في ${company}! يمكنني مساعدتك في تصميم القوائم والطلب عبر الإنترنت وأنظمة الحجز. ما الميزة التي تهمك أكثر؟`,
    },
  };
  for (const [key, msgs] of Object.entries(welcomes)) {
    if (lower.includes(key)) return msgs[lang];
  }
  return lang === "ar"
    ? `مرحبًا بك في ${company}! أنا مساعدك الذكي. كيف يمكنني مساعدتك في بناء موقعك اليوم؟`
    : `Welcome to ${company}! I'm your AI assistant. How can I help you build your site today?`;
}

/* ── Bilingual Keyword Response Matrix ── */
function getKeywordResponse(text: string, industry: string, lang: "ar" | "en"): string | null {
  const lower = text.toLowerCase();
  const indLower = industry.toLowerCase();

  interface KeywordEntry {
    keywords: string[];
    industryResponses: Record<string, { en: string; ar: string }>;
    defaultResponse: { en: string; ar: string };
  }

  const matrix: KeywordEntry[] = [
    {
      keywords: ["pricing", "price", "cost", "سعر", "أسعار", "تكلفة"],
      industryResponses: {
        "real estate": {
          en: "Our real estate packages start at $99/mo with property listing management, virtual tours, and lead capture. Enterprise plans include CRM integration. Want a custom quote?",
          ar: "تبدأ باقات العقارات لدينا من ٩٩ دولار شهريًا وتشمل إدارة قوائم العقارات والجولات الافتراضية والتقاط العملاء. هل تريد عرض سعر مخصص؟",
        },
        ecommerce: {
          en: "E-commerce plans start at $79/mo with unlimited products, payment gateway, and inventory management. Growing businesses love our $149/mo plan with AI recommendations.",
          ar: "تبدأ خطط التجارة الإلكترونية من ٧٩ دولار شهريًا مع منتجات غير محدودة وبوابة دفع وإدارة المخزون. هل تريد معرفة المزيد؟",
        },
      },
      defaultResponse: {
        en: "Our plans start at $49/mo for startups. Enterprise plans are fully customized. Want me to connect you with our sales team?",
        ar: "تبدأ خططنا من ٤٩ دولار شهريًا للشركات الناشئة. الخطط المؤسسية مخصصة بالكامل. هل تريد التواصل مع فريق المبيعات؟",
      },
    },
    {
      keywords: ["features", "feature", "خدمات", "خدمة", "ميزات"],
      industryResponses: {
        "real estate": {
          en: "Key features for real estate: Interactive property maps, virtual 3D tours, mortgage calculators, lead capture forms, and automated follow-up emails. Which interests you?",
          ar: "الميزات الرئيسية للعقارات: خرائط تفاعلية، جولات افتراضية ثلاثية الأبعاد، حاسبات الرهن العقاري، ونماذج التقاط العملاء. أيها يهمك؟",
        },
        ecommerce: {
          en: "E-commerce features include: Product catalog with filters, shopping cart, secure checkout, order tracking, customer reviews, and AI product recommendations.",
          ar: "ميزات التجارة الإلكترونية تشمل: كتالوج المنتجات مع المرشحات، عربة التسوق، الدفع الآمن، تتبع الطلبات، وتوصيات المنتجات بالذكاء الاصطناعي.",
        },
        healthcare: {
          en: "Healthcare features: Patient portal, appointment scheduling, telemedicine integration, health records dashboard, and HIPAA-compliant data storage.",
          ar: "ميزات الرعاية الصحية: بوابة المرضى، جدولة المواعيد، التطبيب عن بُعد، لوحة السجلات الصحية، وتخزين البيانات المتوافق مع المعايير.",
        },
      },
      defaultResponse: {
        en: "We offer AI-powered analytics, automated workflows, CRM integration, and real-time dashboards. Which feature interests you most?",
        ar: "نقدم تحليلات مدعومة بالذكاء الاصطناعي، وسير عمل آلي، وتكامل CRM، ولوحات معلومات في الوقت الفعلي. أي ميزة تهمك أكثر؟",
      },
    },
    {
      keywords: ["portfolio", "examples", "work", "أعمال", "نماذج", "معرض"],
      industryResponses: {},
      defaultResponse: {
        en: "Check out our portfolio! We've built 150+ projects across industries — from AI-powered e-commerce stores to real estate platforms. Want to see examples in your niche?",
        ar: "اطلع على معرض أعمالنا! لقد بنينا أكثر من ١٥٠ مشروعًا عبر صناعات مختلفة. هل تريد رؤية أمثلة في مجالك؟",
      },
    },
    {
      keywords: ["contact", "call", "تواصل", "اتصال", "تكلم"],
      industryResponses: {},
      defaultResponse: {
        en: "You can reach our team directly via WhatsApp or schedule a call. We typically respond within 30 minutes during business hours!",
        ar: "يمكنك التواصل مع فريقنا مباشرة عبر واتساب أو جدولة مكالمة. نرد عادة خلال ٣٠ دقيقة خلال ساعات العمل!",
      },
    },
    {
      keywords: ["demo", "عرض", "تجربة"],
      industryResponses: {},
      defaultResponse: {
        en: "I'd love to show you a demo! Our team can set up a personalized walkthrough of your site. Shall I schedule one for you?",
        ar: "يسعدني أن أعرض لك تجربة! يمكن لفريقنا إعداد جولة مخصصة لموقعك. هل أجدول واحدة لك؟",
      },
    },
    {
      keywords: ["help", "مساعدة", "مساعده"],
      industryResponses: {},
      defaultResponse: {
        en: "I can help with product info, pricing, demos, feature comparison, and technical questions. Just ask!",
        ar: "يمكنني المساعدة في معلومات المنتج والأسعار والعروض التوضيحية والمقارنة بين الميزات والأسئلة التقنية. فقط اسأل!",
      },
    },
    {
      keywords: ["موقع", "ويب", "website", "site"],
      industryResponses: {
        "real estate": {
          en: "For real estate, we recommend a site with property listings, map integration, virtual tours, and a lead capture system. Want me to walk you through the options?",
          ar: "للعقارات، ننصح بموقع يحتوي على قوائم العقارات وتكامل الخرائط والجولات الافتراضية ونظام التقاط العملاء. هل تريد أن أشرح لك الخيارات؟",
        },
        ecommerce: {
          en: "For e-commerce, we build sites with product catalogs, secure payments, inventory management, and AI-powered recommendations. Which aspect matters most to you?",
          ar: "للتجارة الإلكترونية، نبني مواقع بكتالوجات منتجات ومدفوعات آمنة وإدارة مخزون وتوصيات بالذكاء الاصطناعي. أي جانب يهمك أكثر؟",
        },
      },
      defaultResponse: {
        en: "We build custom AI-powered websites tailored to your industry. From design to deployment, we handle everything. What specific features do you need?",
        ar: "نبني مواقع مخصصة مدعومة بالذكاء الاصطناعي ومصممة لمجالك. من التصميم إلى النشر، نتولى كل شيء. ما الميزات المحددة التي تحتاجها؟",
      },
    },
  ];

  for (const entry of matrix) {
    for (const kw of entry.keywords) {
      if (lower.includes(kw)) {
        for (const [indKey, resp] of Object.entries(entry.industryResponses)) {
          if (indLower.includes(indKey)) return resp[lang];
        }
        return entry.defaultResponse[lang];
      }
    }
  }
  return null;
}

function ChatbotPreview({ primaryColor, company, industry }: { primaryColor: string; company: string; industry: string }) {
  const [chatLang, setChatLang] = useState<"ar" | "en">("en");
  const [messages, setMessages] = useState<{ from: string; text: string }[]>([]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      setMessages([{ from: "bot", text: getIndustryWelcome(industry, company, "en") }]);
    }
  }, [industry, company]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setMessages((prev) => [...prev, { from: "user", text: userMsg }]);
    setInput("");

    const detectedLang: "ar" | "en" = isArabic(userMsg) ? "ar" : "en";
    if (detectedLang !== chatLang) setChatLang(detectedLang);

    setTimeout(() => {
      const keywordResp = getKeywordResponse(userMsg, industry, detectedLang);
      const response = keywordResp || (
        detectedLang === "ar"
          ? "شكرًا لرسالتك! سيقوم الذكاء الاصطناعي بتحليل طلبك وتقديم أفضل حل. هل هناك شيء محدد تود معرفته؟"
          : "Thanks for your message! Our AI will analyze your request and provide the best solution. Is there anything specific you'd like to know?"
      );
      setMessages((prev) => [...prev, { from: "bot", text: response }]);
    }, 800);
  };

  return (
    <div className="rounded-xl border border-white/10 bg-[#0a0a16] overflow-hidden h-[400px] flex flex-col">
      <div className="px-4 py-3 border-b border-white/10 flex items-center gap-2" style={{ background: `${primaryColor}15` }}>
        <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: primaryColor }}>
          <Bot size={16} className="text-white" />
        </div>
        <div className="flex-1">
          <div className="text-sm font-semibold text-white">{company} AI Assistant</div>
          <div className="text-[10px] text-green-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400" /> Online
          </div>
        </div>
        <div className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-semibold border" style={{ color: primaryColor, borderColor: `${primaryColor}40`, background: `${primaryColor}10` }}>
          <Globe size={10} /> {chatLang === "ar" ? "عربي" : "EN"}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-3" dir={chatLang === "ar" ? "rtl" : "ltr"}>
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
          placeholder={chatLang === "ar" ? "اكتب رسالة... (جرب: سعر، خدمات، موقع)" : "Type a message... (try: pricing, features, portfolio)"}
          className="flex-1 bg-[#12121f] border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 outline-none focus:border-[#2563eb]"
          dir="auto"
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
      {/* Nav bar */}
      <div className="px-6 py-3 flex items-center justify-between border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded" style={{ background: primaryColor }} />
          <span className="text-sm font-bold text-white">{company}</span>
        </div>
        <div className="flex gap-4 text-xs text-gray-500">
          <span className="cursor-pointer hover:text-white transition-colors">{isRTL ? "الرئيسية" : "Home"}</span>
          <span className="cursor-pointer hover:text-white transition-colors">{isRTL ? "الخدمات" : "Services"}</span>
          <span className="cursor-pointer hover:text-white transition-colors">{isRTL ? "المعرض" : "Portfolio"}</span>
          <span className="cursor-pointer hover:text-white transition-colors">{isRTL ? "تواصل" : "Contact"}</span>
        </div>
      </div>
      {/* Hero */}
      <div className="px-8 py-14 text-center border-b border-white/5">
        <div className="inline-block px-3 py-1 rounded-full text-[10px] font-semibold mb-4 border" style={{ color: primaryColor, borderColor: `${primaryColor}40`, background: `${primaryColor}08` }}>
          {isRTL ? "✦ تصميم نظيف وبسيط" : "✦ Clean & Minimal Design"}
        </div>
        <div className="text-3xl font-bold text-white mb-3">{isRTL ? `${company} — مستقبل التكنولوجيا` : `${company} — Future of Technology`}</div>
        <p className="text-sm text-gray-400 mb-6 max-w-lg mx-auto leading-relaxed">{isRTL ? "حلول ذكية مدعومة بالذكاء الاصطناعي لتسريع نمو أعمالك. نصمم تجارب رقمية استثنائية." : "AI-powered solutions to accelerate your business growth. We craft exceptional digital experiences with precision and elegance."}</p>
        <div className="flex items-center justify-center gap-3">
          <button className="px-6 py-2.5 rounded-lg text-white text-sm font-semibold transition-transform hover:scale-105" style={{ background: primaryColor }}>
            {isRTL ? "ابدأ الآن" : "Get Started"}
          </button>
          <button className="px-6 py-2.5 rounded-lg text-sm font-semibold border border-white/20 text-gray-300 hover:border-white/40 transition-colors">
            {isRTL ? "شاهد العرض" : "Watch Demo"}
          </button>
        </div>
      </div>
      {/* Features grid */}
      <div className="px-8 py-8 border-b border-white/5">
        <div className="text-center mb-6">
          <div className="text-lg font-bold text-white mb-1">{isRTL ? "كل ما تحتاجه" : "Everything You Need"}</div>
          <div className="text-xs text-gray-500">{isRTL ? "أدوات قوية لنمو أعمالك" : "Powerful tools to grow your business"}</div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {(isRTL
            ? [{ t: "تحليلات ذكية", d: "رؤى فورية" }, { t: "أتمتة كاملة", d: "سير عمل آلي" }, { t: "حماية متقدمة", d: "تشفير شامل" }]
            : [{ t: "Smart Analytics", d: "Real-time insights" }, { t: "Full Automation", d: "Automated workflows" }, { t: "Enterprise Security", d: "End-to-end encryption" }]
          ).map((f) => (
            <div key={f.t} className="text-center p-4 rounded-xl border border-white/5 hover:border-white/10 transition-colors bg-[#0a0a16]">
              <div className="w-8 h-8 rounded-lg mx-auto mb-3 flex items-center justify-center" style={{ background: `${primaryColor}15` }}>
                <Zap size={14} style={{ color: primaryColor }} />
              </div>
              <div className="text-sm font-semibold text-white mb-1">{f.t}</div>
              <div className="text-[10px] text-gray-500">{f.d}</div>
            </div>
          ))}
        </div>
      </div>
      {/* CTA footer */}
      <div className="px-8 py-6 text-center" style={{ background: `${primaryColor}06` }}>
        <div className="text-sm text-gray-400 mb-3">{isRTL ? "جاهز للبدء؟" : "Ready to get started?"}</div>
        <button className="px-8 py-2 rounded-full text-white text-xs font-semibold" style={{ background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` }}>
          {isRTL ? "تواصل معنا" : "Contact Us"}
        </button>
      </div>
    </div>
  );
}

function DynamicTemplatePreview({ company, primaryColor, secondaryColor, accentColor, isRTL }: { company: string; primaryColor: string; secondaryColor: string; accentColor: string; isRTL: boolean }) {
  return (
    <div className="rounded-xl border border-white/10 bg-[#06060c] overflow-hidden" dir={isRTL ? "rtl" : "ltr"}>
      {/* Nav with gradient line */}
      <div className="relative">
        <div className="h-[2px]" style={{ background: `linear-gradient(90deg, ${primaryColor}, ${secondaryColor}, ${accentColor})` }} />
        <div className="px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full" style={{ background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` }} />
            <span className="text-sm font-bold text-white">{company}</span>
          </div>
          <div className="flex gap-4 text-xs text-gray-500">
            <span>{isRTL ? "استكشف" : "Explore"}</span>
            <span>{isRTL ? "المنتجات" : "Products"}</span>
            <span>{isRTL ? "الأسعار" : "Pricing"}</span>
          </div>
        </div>
      </div>
      {/* Hero with dynamic gradient background */}
      <div className="relative px-8 py-16 text-center overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 opacity-[0.07]" style={{ background: `radial-gradient(ellipse at 30% 50%, ${primaryColor}, transparent 60%), radial-gradient(ellipse at 70% 50%, ${secondaryColor}, transparent 60%)` }} />
        <div className="absolute top-4 left-4 w-24 h-24 rounded-full opacity-10 blur-2xl" style={{ background: primaryColor }} />
        <div className="absolute bottom-4 right-4 w-32 h-32 rounded-full opacity-10 blur-2xl" style={{ background: secondaryColor }} />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold mb-5 border" style={{ color: accentColor, borderColor: `${accentColor}40`, background: `${accentColor}10` }}>
            <Sparkles size={10} /> {isRTL ? "✨ تجربة تفاعلية غامرة" : "✨ Immersive Interactive Experience"}
          </div>
          <div className="text-4xl font-black mb-3" style={{ background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor}, ${accentColor})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            {company}
          </div>
          <p className="text-sm text-gray-400 max-w-md mx-auto mb-6">{isRTL ? "تكنولوجيا الجيل القادم — تجربة مستخدم لا تُنسى" : "Next-generation technology — unforgettable user experience"}</p>
          <button className="px-8 py-3 rounded-full text-white text-sm font-bold transition-transform hover:scale-105" style={{ background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`, boxShadow: `0 0 30px ${primaryColor}30` }}>
            {isRTL ? "🚀 ابدأ الرحلة" : "🚀 Start Your Journey"}
          </button>
        </div>
      </div>
      {/* Stats bar */}
      <div className="grid grid-cols-4 border-b border-white/5">
        {[{ v: "10K+", l: isRTL ? "مستخدم" : "Users" }, { v: "99.9%", l: isRTL ? "استقرار" : "Uptime" }, { v: "<50ms", l: isRTL ? "استجابة" : "Latency" }, { v: "24/7", l: isRTL ? "دعم" : "Support" }].map((s, i) => (
          <div key={s.v} className="py-4 text-center border-r border-white/5 last:border-r-0">
            <div className="text-lg font-bold" style={{ color: [primaryColor, secondaryColor, accentColor, primaryColor][i] }}>{s.v}</div>
            <div className="text-[10px] text-gray-500">{s.l}</div>
          </div>
        ))}
      </div>
      {/* Feature cards */}
      <div className="px-6 py-6 grid grid-cols-2 gap-3">
        {(isRTL
          ? [{ t: "معالجة ذكية", d: "شبكات عصبية متقدمة" }, { t: "تحليل تنبؤي", d: "توقعات دقيقة بالـ AI" }, { t: "نشر عالمي", d: "خوادم في ٤٠+ دولة" }, { t: "أتمتة AI", d: "سير عمل ذكي" }]
          : [{ t: "Neural Processing", d: "Advanced neural networks" }, { t: "Predictive Analytics", d: "AI-powered forecasting" }, { t: "Global Deploy", d: "40+ country CDN" }, { t: "AI Automation", d: "Smart workflows" }]
        ).map((s, i) => (
          <div key={s.t} className="group p-4 rounded-xl border border-white/5 bg-[#0a0a16] hover:border-white/15 transition-all cursor-pointer">
            <div className="w-8 h-8 rounded-lg mb-3 flex items-center justify-center transition-transform group-hover:scale-110" style={{ background: `${i % 2 === 0 ? primaryColor : secondaryColor}15` }}>
              <Zap size={14} style={{ color: i % 2 === 0 ? primaryColor : secondaryColor }} />
            </div>
            <div className="text-sm font-semibold text-white mb-1">{s.t}</div>
            <div className="text-[10px] text-gray-500">{s.d}</div>
          </div>
        ))}
      </div>
      {/* Bottom CTA */}
      <div className="px-6 py-5 text-center border-t border-white/5" style={{ background: `linear-gradient(180deg, transparent, ${primaryColor}08)` }}>
        <div className="text-xs text-gray-400">{isRTL ? "انضم لأكثر من ١٠ آلاف شركة" : "Join 10,000+ companies already growing"}</div>
      </div>
    </div>
  );
}

function CorporateTemplatePreview({ company, primaryColor, secondaryColor, isRTL }: { company: string; primaryColor: string; secondaryColor: string; isRTL: boolean }) {
  return (
    <div className="rounded-xl border border-white/10 bg-[#09090f] overflow-hidden" dir={isRTL ? "rtl" : "ltr"}>
      {/* Corporate nav */}
      <div className="px-6 py-3 flex items-center justify-between border-b border-white/5" style={{ background: `${primaryColor}08` }}>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-sm flex items-center justify-center text-[8px] font-black text-white" style={{ background: primaryColor }}>
            {company.charAt(0)}
          </div>
          <span className="text-sm font-bold text-white">{company}</span>
        </div>
        <div className="flex gap-4 text-xs text-gray-500">
          <span>{isRTL ? "من نحن" : "About"}</span>
          <span>{isRTL ? "الخدمات" : "Services"}</span>
          <span>{isRTL ? "الفريق" : "Team"}</span>
          <span>{isRTL ? "المشاريع" : "Case Studies"}</span>
          <span>{isRTL ? "تواصل" : "Contact"}</span>
        </div>
      </div>
      {/* Two-column hero */}
      <div className="px-8 py-10 flex gap-8 border-b border-white/5">
        <div className="flex-1">
          <div className="text-[10px] font-semibold uppercase tracking-widest mb-3" style={{ color: primaryColor }}>
            {isRTL ? "حلول مؤسسية" : "Enterprise Solutions"}
          </div>
          <div className="text-2xl font-bold text-white mb-3 leading-tight">
            {isRTL ? `${company} — شريكك في التحول الرقمي` : `${company} — Your Digital Transformation Partner`}
          </div>
          <p className="text-xs text-gray-400 mb-5 leading-relaxed">
            {isRTL ? "بنية تحتية موثوقة وحلول مخصصة لتسريع نمو مؤسستك مع أعلى معايير الأمان والأداء." : "Trusted infrastructure and custom solutions to accelerate enterprise growth with the highest standards of security and performance."}
          </p>
          <div className="flex gap-2">
            <button className="px-5 py-2 rounded-lg text-white text-xs font-semibold transition-transform hover:scale-105" style={{ background: primaryColor }}>
              {isRTL ? "اطلب عرض تقديمي" : "Request Demo"}
            </button>
            <button className="px-5 py-2 rounded-lg text-xs border border-white/20 text-gray-300 hover:border-white/40 transition-colors">
              {isRTL ? "اعرف المزيد" : "Learn More"}
            </button>
          </div>
        </div>
        {/* Stats grid */}
        <div className="flex-1 grid grid-cols-2 gap-3">
          {(isRTL
            ? [{ v: "99.9%", l: "استقرار" }, { v: "24/7", l: "دعم فني" }, { v: "150+", l: "عميل مؤسسي" }, { v: "50ms", l: "زمن استجابة" }]
            : [{ v: "99.9%", l: "Uptime SLA" }, { v: "24/7", l: "Premium Support" }, { v: "150+", l: "Enterprise Clients" }, { v: "50ms", l: "Avg Latency" }]
          ).map((s, i) => (
            <div key={s.v} className="p-3 rounded-lg border border-white/5 bg-[#0a0a16] text-center">
              <div className="text-xl font-bold mb-0.5" style={{ color: i % 2 === 0 ? primaryColor : secondaryColor }}>{s.v}</div>
              <div className="text-[10px] text-gray-500">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
      {/* Services bar */}
      <div className="px-8 py-6 border-b border-white/5">
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">{isRTL ? "خدماتنا" : "Our Services"}</div>
        <div className="grid grid-cols-3 gap-3">
          {(isRTL
            ? [{ t: "استشارات تقنية", d: "خبراء متخصصون" }, { t: "تطوير برمجيات", d: "حلول مخصصة" }, { t: "أمن سيبراني", d: "حماية شاملة" }]
            : [{ t: "Tech Consulting", d: "Expert advisors" }, { t: "Software Dev", d: "Custom solutions" }, { t: "Cybersecurity", d: "Complete protection" }]
          ).map((svc) => (
            <div key={svc.t} className="p-3 rounded-lg border border-white/5 bg-[#0c0c18]">
              <div className="text-sm font-semibold text-white mb-0.5">{svc.t}</div>
              <div className="text-[10px] text-gray-500">{svc.d}</div>
            </div>
          ))}
        </div>
      </div>
      {/* Trusted by */}
      <div className="px-8 py-5 text-center">
        <div className="text-[10px] text-gray-600 uppercase tracking-widest mb-3">{isRTL ? "موثوق من قبل" : "Trusted By"}</div>
        <div className="flex items-center justify-center gap-6">
          {["Google", "Microsoft", "AWS", "Oracle"].map((b) => (
            <span key={b} className="text-xs text-gray-600 font-medium">{b}</span>
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
              {activeFeature === "chatbot" && <ChatbotPreview primaryColor={primaryColor} company={company} industry={industry} />}
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
