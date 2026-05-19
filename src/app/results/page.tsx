"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  X,
  Send,
  MessageCircle,
  BrainCircuit,
  Zap,
  Layout,
  ShoppingCart,
  Sparkles,
} from "lucide-react";

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

interface Demo {
  id: string;
  title: string;
  description: string;
  style: string;
  icon: React.ReactNode;
  gradient: string;
}

const AI_RECOMMENDATIONS: Record<string, string> = {
  Healthcare:
    "For your Healthcare business, we suggest a Skin Analyzer AI tool to increase revenue by 40%. Combine with appointment booking AI for maximum patient conversion.",
  Finance:
    "For your Finance business, we suggest a Risk Assessment AI engine to increase client trust by 55%. Real-time portfolio analysis can boost retention significantly.",
  Retail:
    "For your Retail business, we suggest a Visual Search AI tool to increase revenue by 40%. Customers who use visual search convert 3x more.",
  Education:
    "For your Education business, we suggest an Adaptive Learning AI to increase student engagement by 60%. Personalized learning paths drive 2x completion rates.",
  default:
    "For your industry, we suggest a Customer Intelligence AI tool to increase revenue by 40%. Predictive analytics and smart recommendations can transform your conversion rates.",
};

function getStoredFormData(): FormPayload | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = sessionStorage.getItem("nextgen_form");
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

export default function ResultsPage() {
  const [progress, setProgress] = useState(0);
  const [analyzing, setAnalyzing] = useState(true);
  const [formData] = useState<FormPayload | null>(() => getStoredFormData());
  const [selectedDemo, setSelectedDemo] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [finalized, setFinalized] = useState(false);
  const [finalizeChecked, setFinalizeChecked] = useState(false);
  const [sending, setSending] = useState(false);

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

  const demos: Demo[] = [
    {
      id: "demo-1",
      title: "Minimalist Pro",
      description:
        "Clean, conversion-focused layout with bold typography and strategic CTAs. Perfect for premium brands.",
      style: "Minimalist",
      icon: <Layout size={32} />,
      gradient: "from-[#2563eb] to-[#1d4ed8]",
    },
    {
      id: "demo-2",
      title: "Dynamic Showcase",
      description:
        "Interactive parallax design with animated sections and immersive storytelling. Ideal for engaging audiences.",
      style: "Interactive",
      icon: <Sparkles size={32} />,
      gradient: "from-[#a855f7] to-[#7c3aed]",
    },
    {
      id: "demo-3",
      title: "Commerce Engine",
      description:
        "E-commerce optimized with AI product recommendations, smart search, and frictionless checkout.",
      style: "E-Commerce",
      icon: <ShoppingCart size={32} />,
      gradient: "from-[#2563eb] to-[#a855f7]",
    },
  ];

  const getRecommendation = () => {
    if (!formData) return AI_RECOMMENDATIONS.default;
    const industry = formData.industry || "";
    for (const key of Object.keys(AI_RECOMMENDATIONS)) {
      if (key !== "default" && industry.toLowerCase().includes(key.toLowerCase())) {
        return AI_RECOMMENDATIONS[key];
      }
    }
    return AI_RECOMMENDATIONS.default.replace(
      "your industry",
      `the ${industry} industry`
    );
  };

  const handleFinalize = async () => {
    if (!finalizeChecked || !formData) return;
    setSending(true);

    try {
      const payload = {
        ...formData,
        selectedDemoId: selectedDemo,
        aiRecommendation: getRecommendation(),
        finalizedAt: new Date().toISOString(),
        type: "finalized_order",
      };

      await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      setFinalized(true);
      setShowModal(false);
    } catch {
      alert("Failed to send. Please try again.");
    } finally {
      setSending(false);
    }
  };

  if (analyzing) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <div className="w-20 h-20 mx-auto mb-8 relative">
            <BrainCircuit
              size={48}
              className="text-[#2563eb] absolute inset-0 m-auto"
            />
            <div className="absolute inset-0 border-2 border-[#2563eb]/30 rounded-full animate-ping" />
            <div
              className="absolute inset-0 border-2 border-[#a855f7]/20 rounded-full animate-ping"
              style={{ animationDelay: "0.5s" }}
            />
          </div>

          <h2 className="text-2xl font-bold mb-4 gradient-text">
            AI Analyzing Your Niche...
          </h2>

          <div className="w-full bg-[#1a1a2e] rounded-full h-3 mb-3 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-[#2563eb] to-[#a855f7]"
              initial={{ width: "0%" }}
              animate={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
          <p className="text-sm text-gray-400">
            {Math.min(Math.floor(progress), 100)}%
          </p>

          <div className="mt-6 space-y-2 text-xs text-gray-500">
            {progress > 20 && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Zap size={12} className="inline mr-1 text-[#2563eb]" />
                Scanning market data...
              </motion.p>
            )}
            {progress > 50 && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Zap size={12} className="inline mr-1 text-[#a855f7]" />
                Generating landing page variants...
              </motion.p>
            )}
            {progress > 80 && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Zap size={12} className="inline mr-1 text-[#2563eb]" />
                Preparing AI recommendations...
              </motion.p>
            )}
          </div>
        </motion.div>
      </div>
    );
  }

  if (finalized) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-[#2563eb] to-[#a855f7] flex items-center justify-center">
            <Check size={40} className="text-white" />
          </div>
          <h2 className="text-3xl font-bold mb-3">Order Confirmed!</h2>
          <p className="text-gray-400 mb-8">
            Your project details have been sent to our team. We&apos;ll reach
            out within 24 hours to begin building your AI-powered platform.
          </p>
          <a
            href="https://wa.me/1234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-[#25d366] px-8 py-3.5 text-white font-semibold hover:bg-[#20bd5a] transition-all hover:shadow-[0_0_25px_rgba(37,211,102,0.3)]"
          >
            <MessageCircle size={20} />
            Chat on WhatsApp
          </a>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-16">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Your AI-Generated <span className="gradient-text">Demos</span>
          </h1>
          <p className="text-gray-400">
            Select the design that best fits your vision. Our AI has tailored
            these specifically for{" "}
            <span className="text-[#2563eb]">
              {formData?.company || "your company"}
            </span>
            .
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {demos.map((demo, i) => (
            <motion.div
              key={demo.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              onClick={() => {
                setSelectedDemo(demo.id);
                setShowModal(true);
              }}
              className={`glow-border rounded-2xl bg-[#0a0a14] overflow-hidden cursor-pointer transition-all hover:scale-[1.02] ${
                selectedDemo === demo.id
                  ? "ring-2 ring-[#2563eb] shadow-[0_0_30px_rgba(37,99,235,0.2)]"
                  : ""
              }`}
            >
              <div
                className={`h-40 bg-gradient-to-br ${demo.gradient} flex items-center justify-center text-white/80`}
              >
                {demo.icon}
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-white">
                    {demo.title}
                  </h3>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-[#2563eb]/10 text-[#2563eb]">
                    {demo.style}
                  </span>
                </div>
                <p className="text-sm text-gray-400">{demo.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glow-border rounded-2xl bg-[#0a0a14] p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-[#2563eb] to-[#a855f7] flex items-center justify-center">
                    <BrainCircuit size={20} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold">AI Recommendation</h3>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="bg-[#12121f] rounded-lg p-5 mb-6 border border-[#2563eb]/20">
                <p className="text-gray-300 leading-relaxed">
                  {getRecommendation()}
                </p>
              </div>

              <label className="flex items-start gap-3 mb-6 cursor-pointer p-3 rounded-lg border border-gray-700 hover:border-[#2563eb] transition-all">
                <input
                  type="checkbox"
                  checked={finalizeChecked}
                  onChange={(e) => setFinalizeChecked(e.target.checked)}
                  className="mt-1 accent-[#2563eb] w-4 h-4"
                />
                <span className="text-sm text-gray-300">
                  <strong className="text-white">
                    Finalize Your Order & Get in Touch
                  </strong>{" "}
                  — I agree to share my project details with the NEXTGEN team
                  for a personalized quote and consultation.
                </span>
              </label>

              <button
                onClick={handleFinalize}
                disabled={!finalizeChecked || sending}
                className={`w-full flex items-center justify-center gap-2 rounded-lg px-6 py-3 font-semibold transition-all ${
                  finalizeChecked && !sending
                    ? "bg-gradient-to-r from-[#2563eb] to-[#a855f7] text-white hover:shadow-[0_0_25px_rgba(37,99,235,0.3)]"
                    : "bg-gray-700 text-gray-400 cursor-not-allowed"
                }`}
              >
                <Send size={18} />
                {sending ? "Sending..." : "Finalize & Submit"}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
