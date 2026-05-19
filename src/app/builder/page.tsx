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

export default function BuilderPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
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

  const canProceed = () => {
    if (step === 1) return formData.name && formData.company && formData.whatsapp;
    if (step === 2) return formData.targetAudience && formData.industry;
    return true;
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
    if (step === 3) {
      handleSubmit();
    } else {
      setStep((s) => s + 1);
    }
  };

  const goBack = () => {
    setDirection(-1);
    setStep((s) => s - 1);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-2xl">
        {/* Progress */}
        <div className="flex items-center justify-center gap-2 mb-12">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                  step >= s
                    ? "bg-gradient-to-r from-[#2563eb] to-[#a855f7] text-white shadow-[0_0_20px_rgba(37,99,235,0.3)]"
                    : "bg-[#1a1a2e] text-gray-500 border border-gray-700"
                }`}
              >
                {step > s ? <Check size={16} /> : s}
              </div>
              {s < 3 && (
                <div
                  className={`w-16 h-0.5 transition-all ${
                    step > s
                      ? "bg-gradient-to-r from-[#2563eb] to-[#a855f7]"
                      : "bg-gray-700"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <div className="glow-border rounded-2xl bg-[#0a0a14] p-8 md:p-10 min-h-[480px] flex flex-col">
          <AnimatePresence mode="wait" custom={direction}>
            {step === 1 && (
              <motion.div
                key="step1"
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
                <p className="text-gray-400 mb-8 text-sm">
                  Tell us about yourself and your company.
                </p>

                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">
                      Full Name <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <User
                        size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                      />
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => update({ name: e.target.value })}
                        className="w-full bg-[#12121f] border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">
                      Company <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <Building2
                        size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                      />
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => update({ company: e.target.value })}
                        className="w-full bg-[#12121f] border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 transition-all"
                        placeholder="Acme Inc."
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">
                      WhatsApp Number <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <Phone
                        size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                      />
                      <input
                        type="tel"
                        value={formData.whatsapp}
                        onChange={(e) => update({ whatsapp: e.target.value })}
                        className="w-full bg-[#12121f] border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 transition-all"
                        placeholder="+1 234 567 890"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">
                      Upload Logo
                    </label>
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
                      className="w-full bg-[#12121f] border border-dashed border-gray-600 rounded-lg py-4 flex items-center justify-center gap-2 text-gray-400 hover:border-[#2563eb] hover:text-[#2563eb] transition-all"
                    >
                      <Upload size={18} />
                      {formData.logoName || "Choose file..."}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
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
                <p className="text-gray-400 mb-8 text-sm">
                  Help us understand your market and requirements.
                </p>

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
                          className={`text-sm px-3 py-2.5 rounded-lg border transition-all text-left ${
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
                      className="w-full bg-[#12121f] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 transition-all"
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
                          className={`text-xs px-3 py-2 rounded-lg border transition-all text-left flex items-center gap-2 ${
                            formData.features.includes(f)
                              ? "border-[#a855f7] bg-[#a855f7]/10 text-[#a855f7]"
                              : "border-gray-700 text-gray-400 hover:border-gray-500"
                          }`}
                        >
                          {formData.features.includes(f) && (
                            <Check size={12} />
                          )}
                          {f}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
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
                <p className="text-gray-400 mb-8 text-sm">
                  Choose your brand palette and AI integration level.
                </p>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      Brand Palette
                    </label>
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { label: "Primary", key: "primaryColor" as const },
                        { label: "Secondary", key: "secondaryColor" as const },
                        { label: "Accent", key: "accentColor" as const },
                      ].map((c) => (
                        <div key={c.key}>
                          <label className="block text-xs text-gray-400 mb-1">
                            {c.label}
                          </label>
                          <div className="relative">
                            <input
                              type="color"
                              value={formData[c.key]}
                              onChange={(e) =>
                                update({ [c.key]: e.target.value })
                              }
                              className="w-full h-12 rounded-lg cursor-pointer bg-transparent border border-gray-700"
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
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      AI Integration Preference
                    </label>
                    <div className="space-y-3">
                      {[
                        {
                          value: "full",
                          label: "Full AI Suite",
                          desc: "Chatbot + Analytics + Automation + Recommendations",
                        },
                        {
                          value: "moderate",
                          label: "Moderate AI",
                          desc: "Smart chatbot + Basic analytics",
                        },
                        {
                          value: "minimal",
                          label: "Minimal AI",
                          desc: "Contact form AI assistant only",
                        },
                        {
                          value: "none",
                          label: "No AI",
                          desc: "Traditional website without AI features",
                        },
                      ].map((opt) => (
                        <label
                          key={opt.value}
                          className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
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
                            onChange={(e) =>
                              update({ aiPreference: e.target.value })
                            }
                            className="mt-1 accent-[#2563eb]"
                          />
                          <div>
                            <div className="text-sm font-medium text-white flex items-center gap-2">
                              <BrainCircuit size={14} className="text-[#a855f7]" />
                              {opt.label}
                            </div>
                            <div className="text-xs text-gray-400">
                              {opt.desc}
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-800">
            {step > 1 ? (
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
              className={`flex items-center gap-2 rounded-lg px-6 py-2.5 font-semibold transition-all ${
                canProceed() && !submitting
                  ? "bg-gradient-to-r from-[#2563eb] to-[#a855f7] text-white hover:shadow-[0_0_25px_rgba(37,99,235,0.3)] hover:scale-105"
                  : "bg-gray-700 text-gray-400 cursor-not-allowed"
              }`}
            >
              {submitting
                ? "Submitting..."
                : step === 3
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
