"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  User,
  Building2,
  Phone,
  Upload,
  ChevronRight,
  ChevronLeft,
  Target,
  Palette,
  BrainCircuit,
  Check,
  Globe,
  Link as LinkIcon,
  Sparkles,
  Bot,
  Calendar,
  RefreshCw,
} from "lucide-react";

interface FormData {
  name: string;
  company: string;
  whatsapp: string;
  logoFile: File | null;
  logoName: string;
  targetAudience: string;
  industry: string;
  features: string[];
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  aiPreference: string;
  hasWebsite: boolean | null;
  existingUrl: string;
  upgradeFeatures: string[];
}

const AUDIENCES = [
  "Teens & Gen-Z",
  "Young Professionals",
  "Small Businesses",
  "Enterprise",
  "Trades & Services",
  "Luxury & Premium",
  "Healthcare",
  "Education",
];

const FEATURES = [
  "AI Chatbot",
  "Booking System",
  "Payment Gateway",
  "Analytics Dashboard",
  "CRM Integration",
  "Email Marketing",
  "Social Media Feed",
  "Multi-language",
  "Dark Mode",
  "Progressive Web App",
  "Real-time Notifications",
  "Video Conferencing",
];

const UPGRADE_FEATURES = [
  { id: "chatbot", label: "AI Chatbot", desc: "Smart conversational assistant", icon: Bot },
  { id: "booking", label: "Booking Automation", desc: "Auto-schedule appointments & meetings", icon: Calendar },
  { id: "rebrand", label: "Future Brand Refresh", desc: "Full UI/UX modernization", icon: RefreshCw },
  { id: "multilang", label: "Multi-language Support", desc: "Arabic, English & more", icon: Globe },
  { id: "analytics", label: "AI Analytics", desc: "Intelligent traffic & conversion insights", icon: Sparkles },
];

export default function BuilderPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    company: "",
    whatsapp: "",
    logoFile: null,
    logoName: "",
    targetAudience: "",
    industry: "",
    features: [],
    primaryColor: "#2563eb",
    secondaryColor: "#a855f7",
    accentColor: "#10b981",
    aiPreference: "",
    hasWebsite: null,
    existingUrl: "",
    upgradeFeatures: [],
  });

  const update = (fields: Partial<FormData>) =>
    setFormData((prev) => ({ ...prev, ...fields }));

  const toggleFeature = (f: string) => {
    update({
      features: formData.features.includes(f)
        ? formData.features.filter((x) => x !== f)
        : [...formData.features, f],
    });
  };

  const toggleUpgradeFeature = (id: string) => {
    update({
      upgradeFeatures: formData.upgradeFeatures.includes(id)
        ? formData.upgradeFeatures.filter((x) => x !== id)
        : [...formData.upgradeFeatures, id],
    });
  };

  const isPathA = formData.hasWebsite === false;
  const isPathB = formData.hasWebsite === true;

  const canProceed = () => {
    if (step === 0) return formData.hasWebsite !== null;
    if (isPathA) {
      if (step === 1) return formData.name && formData.company && formData.whatsapp;
      if (step === 2) return formData.targetAudience && formData.industry;
      return true;
    } else {
      if (step === 1) return formData.name && formData.company && formData.whatsapp && formData.existingUrl;
      if (step === 2) return formData.upgradeFeatures.length > 0;
      return true;
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const payload = {
        name: formData.name,
        company: formData.company,
        whatsapp: formData.whatsapp,
        logoName: formData.logoName,
        targetAudience: formData.targetAudience,
        industry: formData.industry,
        features: formData.features,
        primaryColor: formData.primaryColor,
        secondaryColor: formData.secondaryColor,
        accentColor: formData.accentColor,
        aiPreference: formData.aiPreference,
        hasWebsite: formData.hasWebsite,
        existingUrl: formData.existingUrl,
        upgradeFeatures: formData.upgradeFeatures,
      };

      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Submission failed");

      sessionStorage.setItem("nextgen_form", JSON.stringify(payload));
      router.push("/results");
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
  };

  const [direction, setDirection] = useState(1);

  const goNext = () => {
    if (!canProceed()) return;
    setDirection(1);
    const lastStep = isPathA ? 3 : 2;
    if (step === lastStep) {
      handleSubmit();
    } else {
      setStep((s) => s + 1);
    }
  };

  const goBack = () => {
    setDirection(-1);
    setStep((s) => s - 1);
  };

  const stepLabels = isPathA
    ? ["Path", "Basics", "Niche", "Visual"]
    : isPathB
      ? ["Path", "Details", "Upgrade"]
      : ["Path"];

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-2xl">
        {/* Progress */}
        <div className="flex items-center justify-center gap-2 mb-12">
          {stepLabels.map((label, s) => (
            <div key={s} className="flex items-center gap-2">
              <div className="flex flex-col items-center gap-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                    step >= s
                      ? "bg-gradient-to-r from-[#2563eb] to-[#a855f7] text-white shadow-[0_0_20px_rgba(37,99,235,0.3)]"
                      : "glass text-gray-500 border border-gray-700"
                  }`}
                >
                  {step > s ? <Check size={16} /> : s + 1}
                </div>
                <span className="text-[10px] text-gray-500">{label}</span>
              </div>
              {s < stepLabels.length - 1 && (
                <div
                  className={`w-12 h-0.5 transition-all mb-4 ${
                    step > s
                      ? "bg-gradient-to-r from-[#2563eb] to-[#a855f7]"
                      : "bg-gray-700"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <div className="glass rounded-2xl p-8 md:p-10 min-h-[480px] flex flex-col border border-[#2563eb]/10">
          <AnimatePresence mode="wait" custom={direction}>
            {/* ─── STEP 0: PATH SELECTION ─── */}
            {step === 0 && (
              <motion.div
                key="step0"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="flex-1"
              >
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold glass border border-[#a855f7]/20 text-[#a855f7] mb-4">
                    <Sparkles size={12} /> Smart Onboarding
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    Do you already have a website?
                  </h2>
                  <p className="text-gray-400 text-sm">
                    Choose your path to get a tailored experience.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {/* Path A */}
                  <button
                    type="button"
                    onClick={() => update({ hasWebsite: false })}
                    className={`text-left p-6 rounded-2xl border-2 transition-all group ${
                      formData.hasWebsite === false
                        ? "border-[#2563eb] bg-[#2563eb]/5 shadow-[0_0_25px_rgba(37,99,235,0.15)]"
                        : "border-gray-700/50 hover:border-gray-600 glass"
                    }`}
                  >
                    <div className="w-12 h-12 rounded-xl glass flex items-center justify-center mb-4">
                      <Sparkles size={22} className={formData.hasWebsite === false ? "text-[#2563eb]" : "text-gray-400"} />
                    </div>
                    <div className="text-lg font-bold text-white mb-1">No, I need a new website</div>
                    <p className="text-sm text-gray-400">
                      Build a stunning new site from scratch with AI-powered features and futuristic design.
                    </p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {["Custom Design", "AI Features", "Landing Page Demo"].map((t) => (
                        <span key={t} className="text-[9px] px-2 py-0.5 rounded-full glass text-gray-400">{t}</span>
                      ))}
                    </div>
                  </button>

                  {/* Path B */}
                  <button
                    type="button"
                    onClick={() => update({ hasWebsite: true })}
                    className={`text-left p-6 rounded-2xl border-2 transition-all group ${
                      formData.hasWebsite === true
                        ? "border-[#a855f7] bg-[#a855f7]/5 shadow-[0_0_25px_rgba(168,85,247,0.15)]"
                        : "border-gray-700/50 hover:border-gray-600 glass"
                    }`}
                  >
                    <div className="w-12 h-12 rounded-xl glass flex items-center justify-center mb-4">
                      <RefreshCw size={22} className={formData.hasWebsite === true ? "text-[#a855f7]" : "text-gray-400"} />
                    </div>
                    <div className="text-lg font-bold text-white mb-1">Yes, upgrade with AI</div>
                    <p className="text-sm text-gray-400">
                      Enhance your current website with AI chatbots, booking automation, and smart upgrades.
                    </p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {["AI Audit", "Smart Upgrades", "Keep Your Brand"].map((t) => (
                        <span key={t} className="text-[9px] px-2 py-0.5 rounded-full glass text-gray-400">{t}</span>
                      ))}
                    </div>
                  </button>
                </div>
              </motion.div>
            )}

            {/* ─── PATH A: STEP 1 — BASIC INFO ─── */}
            {step === 1 && isPathA && (
              <motion.div
                key="pathA-step1"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="flex-1"
              >
                <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
                  <User className="text-[#2563eb]" size={28} />
                  Basic Information
                </h2>
                <p className="text-gray-400 mb-8 text-sm">Tell us about yourself and your company.</p>

                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">
                      Full Name <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => update({ name: e.target.value })}
                        className="w-full bg-[#12121f] border border-gray-700 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-500 transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">
                      Company <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <Building2 size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => update({ company: e.target.value })}
                        className="w-full bg-[#12121f] border border-gray-700 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-500 transition-all"
                        placeholder="Acme Inc."
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">
                      WhatsApp Number <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                      <input
                        type="tel"
                        value={formData.whatsapp}
                        onChange={(e) => update({ whatsapp: e.target.value })}
                        className="w-full bg-[#12121f] border border-gray-700 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-500 transition-all"
                        placeholder="+1 234 567 890"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">Upload Logo</label>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) update({ logoFile: file, logoName: file.name });
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full bg-[#12121f] border border-dashed border-gray-600 rounded-xl py-4 flex items-center justify-center gap-2 text-gray-400 hover:border-[#2563eb] hover:text-[#2563eb] transition-all"
                    >
                      <Upload size={18} />
                      {formData.logoName || "Choose file..."}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ─── PATH A: STEP 2 — NICHE & FEATURES ─── */}
            {step === 2 && isPathA && (
              <motion.div
                key="pathA-step2"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="flex-1"
              >
                <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
                  <Target className="text-[#a855f7]" size={28} />
                  Niche & Features
                </h2>
                <p className="text-gray-400 mb-8 text-sm">Help us understand your market and requirements.</p>

                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Target Audience <span className="text-red-400">*</span>
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {AUDIENCES.map((a) => (
                        <button
                          key={a}
                          type="button"
                          onClick={() => update({ targetAudience: a })}
                          className={`text-sm px-3 py-2.5 rounded-xl border transition-all text-left ${
                            formData.targetAudience === a
                              ? "border-[#2563eb] bg-[#2563eb]/10 text-[#2563eb] shadow-[0_0_15px_rgba(37,99,235,0.2)]"
                              : "border-gray-700 text-gray-400 hover:border-gray-500"
                          }`}
                        >
                          {a}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">
                      Industry Field <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.industry}
                      onChange={(e) => update({ industry: e.target.value })}
                      className="w-full bg-[#12121f] border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 transition-all"
                      placeholder="e.g. Healthcare, Finance, Retail..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Required Features (select multiple)
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {FEATURES.map((f) => (
                        <button
                          key={f}
                          type="button"
                          onClick={() => toggleFeature(f)}
                          className={`text-xs px-3 py-2 rounded-xl border transition-all text-left flex items-center gap-2 ${
                            formData.features.includes(f)
                              ? "border-[#a855f7] bg-[#a855f7]/10 text-[#a855f7]"
                              : "border-gray-700 text-gray-400 hover:border-gray-500"
                          }`}
                        >
                          {formData.features.includes(f) && <Check size={12} />}
                          {f}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ─── PATH A: STEP 3 — VISUAL & AI ─── */}
            {step === 3 && isPathA && (
              <motion.div
                key="pathA-step3"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="flex-1"
              >
                <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
                  <Palette className="text-[#2563eb]" size={28} />
                  Visual & AI Preferences
                </h2>
                <p className="text-gray-400 mb-8 text-sm">Choose your brand palette and AI integration level.</p>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">Brand Palette</label>
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { label: "Primary", key: "primaryColor" as const },
                        { label: "Secondary", key: "secondaryColor" as const },
                        { label: "Accent", key: "accentColor" as const },
                      ].map((c) => (
                        <div key={c.key}>
                          <label className="block text-xs text-gray-400 mb-1">{c.label}</label>
                          <div className="relative">
                            <input
                              type="color"
                              value={formData[c.key]}
                              onChange={(e) => update({ [c.key]: e.target.value })}
                              className="w-full h-12 rounded-xl cursor-pointer bg-transparent border border-gray-700"
                            />
                            <span className="block text-center text-xs text-gray-500 mt-1">
                              {formData[c.key]}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">AI Integration Preference</label>
                    <div className="space-y-3">
                      {[
                        { value: "full", label: "Full AI Suite", desc: "Chatbot + Analytics + Automation + Recommendations" },
                        { value: "moderate", label: "Moderate AI", desc: "Smart chatbot + Basic analytics" },
                        { value: "minimal", label: "Minimal AI", desc: "Contact form AI assistant only" },
                        { value: "none", label: "No AI", desc: "Traditional website without AI features" },
                      ].map((opt) => (
                        <label
                          key={opt.value}
                          className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                            formData.aiPreference === opt.value
                              ? "border-[#2563eb] bg-[#2563eb]/5 shadow-[0_0_15px_rgba(37,99,235,0.15)]"
                              : "border-gray-700 hover:border-gray-500"
                          }`}
                        >
                          <input
                            type="radio"
                            name="aiPreference"
                            value={opt.value}
                            checked={formData.aiPreference === opt.value}
                            onChange={(e) => update({ aiPreference: e.target.value })}
                            className="mt-1 accent-[#2563eb]"
                          />
                          <div>
                            <div className="text-sm font-medium text-white flex items-center gap-2">
                              <BrainCircuit size={14} className="text-[#a855f7]" />
                              {opt.label}
                            </div>
                            <div className="text-xs text-gray-400">{opt.desc}</div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ─── PATH B: STEP 1 — CONTACT & URL ─── */}
            {step === 1 && isPathB && (
              <motion.div
                key="pathB-step1"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="flex-1"
              >
                <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
                  <Globe className="text-[#a855f7]" size={28} />
                  Your Details & Website
                </h2>
                <p className="text-gray-400 mb-8 text-sm">
                  Tell us about yourself and share your current website URL.
                </p>

                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">
                      Full Name <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => update({ name: e.target.value })}
                        className="w-full bg-[#12121f] border border-gray-700 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-500 transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">
                      Company <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <Building2 size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => update({ company: e.target.value })}
                        className="w-full bg-[#12121f] border border-gray-700 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-500 transition-all"
                        placeholder="Acme Inc."
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">
                      WhatsApp Number <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                      <input
                        type="tel"
                        value={formData.whatsapp}
                        onChange={(e) => update({ whatsapp: e.target.value })}
                        className="w-full bg-[#12121f] border border-gray-700 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-500 transition-all"
                        placeholder="+1 234 567 890"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">
                      Current Website URL <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <LinkIcon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                      <input
                        type="url"
                        value={formData.existingUrl}
                        onChange={(e) => update({ existingUrl: e.target.value })}
                        className="w-full bg-[#12121f] border border-gray-700 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-500 transition-all"
                        placeholder="https://yoursite.com"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ─── PATH B: STEP 2 — UPGRADE FEATURES ─── */}
            {step === 2 && isPathB && (
              <motion.div
                key="pathB-step2"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="flex-1"
              >
                <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
                  <Sparkles className="text-[#a855f7]" size={28} />
                  Select AI Upgrades
                </h2>
                <p className="text-gray-400 mb-8 text-sm">
                  Choose the AI features you want to add to your existing website.
                </p>

                <div className="space-y-3">
                  {UPGRADE_FEATURES.map((feat) => {
                    const Icon = feat.icon;
                    const selected = formData.upgradeFeatures.includes(feat.id);
                    return (
                      <button
                        key={feat.id}
                        type="button"
                        onClick={() => toggleUpgradeFeature(feat.id)}
                        className={`w-full text-left flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                          selected
                            ? "border-[#a855f7] bg-[#a855f7]/5 shadow-[0_0_20px_rgba(168,85,247,0.15)]"
                            : "border-gray-700/50 hover:border-gray-600 glass"
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                          selected ? "bg-[#a855f7]/20" : "glass"
                        }`}>
                          <Icon size={20} className={selected ? "text-[#a855f7]" : "text-gray-400"} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-semibold text-white">{feat.label}</div>
                          <div className="text-xs text-gray-400">{feat.desc}</div>
                        </div>
                        {selected && (
                          <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#2563eb] to-[#a855f7] flex items-center justify-center shrink-0">
                            <Check size={14} className="text-white" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-800">
            {step > 0 ? (
              <button
                onClick={goBack}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              >
                <ChevronLeft size={18} />
                Back
              </button>
            ) : (
              <div />
            )}
            <button
              onClick={goNext}
              disabled={!canProceed() || submitting}
              className={`flex items-center gap-2 rounded-xl px-6 py-2.5 font-semibold transition-all ${
                canProceed() && !submitting
                  ? "bg-gradient-to-r from-[#2563eb] to-[#a855f7] text-white hover:shadow-[0_0_25px_rgba(37,99,235,0.3)] hover:scale-105"
                  : "bg-gray-700 text-gray-400 cursor-not-allowed"
              }`}
            >
              {submitting
                ? "Submitting..."
                : step === 0
                  ? "Continue"
                  : (isPathA && step === 3) || (isPathB && step === 2)
                    ? "Generate AI Demos"
                    : "Continue"}
              {!submitting && <ChevronRight size={18} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
