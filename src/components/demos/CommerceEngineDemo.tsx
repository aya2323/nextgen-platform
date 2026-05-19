"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ShoppingCart,
  Star,
  Truck,
  CreditCard,
  RotateCcw,
  Search,
  Heart,
  BadgePercent,
  Sparkles,
  Package,
  ShieldCheck,
  Bot,
  BarChart3,
  Cog,
  Users,
  Megaphone,
  Puzzle,
} from "lucide-react";

interface Props {
  company: string;
  industry: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  features?: string[];
}

const ALL_PRODUCTS = [
  { name: "Smart Chatbot Pro", price: "$299", originalPrice: "$499", tag: "Best Seller", rating: 4.9, reviews: 284, category: "AI Chatbots" },
  { name: "Enterprise Bot Suite", price: "$799", originalPrice: "$1,299", tag: "Most Popular", rating: 4.8, reviews: 156, category: "AI Chatbots" },
  { name: "Conversational AI Kit", price: "$199", originalPrice: "$349", tag: "New", rating: 4.7, reviews: 92, category: "AI Chatbots" },
  { name: "Insights Dashboard", price: "$399", originalPrice: "$699", tag: "Top Rated", rating: 5.0, reviews: 210, category: "Analytics" },
  { name: "Predictive Engine", price: "$599", originalPrice: "$999", tag: "Popular", rating: 4.8, reviews: 134, category: "Analytics" },
  { name: "Data Visualizer Pro", price: "$249", originalPrice: "$449", tag: "New", rating: 4.6, reviews: 78, category: "Analytics" },
  { name: "Workflow Automator", price: "$499", originalPrice: "$899", tag: "Best Seller", rating: 4.9, reviews: 321, category: "Automation" },
  { name: "Task AI Engine", price: "$349", originalPrice: "$599", tag: "Popular", rating: 4.7, reviews: 189, category: "Automation" },
  { name: "Process Optimizer", price: "$699", originalPrice: "$1,199", tag: "Premium", rating: 4.8, reviews: 67, category: "Automation" },
  { name: "CRM Intelligence", price: "$599", originalPrice: "$999", tag: "Top Rated", rating: 4.9, reviews: 256, category: "CRM Tools" },
  { name: "Lead Scorer AI", price: "$399", originalPrice: "$699", tag: "Popular", rating: 4.8, reviews: 178, category: "CRM Tools" },
  { name: "Client Manager Pro", price: "$249", originalPrice: "$449", tag: "New", rating: 4.6, reviews: 94, category: "CRM Tools" },
  { name: "Campaign AI Suite", price: "$799", originalPrice: "$1,399", tag: "Best Seller", rating: 4.9, reviews: 198, category: "Marketing AI" },
  { name: "Ad Optimizer", price: "$349", originalPrice: "$599", tag: "Popular", rating: 4.7, reviews: 145, category: "Marketing AI" },
  { name: "Content Generator", price: "$199", originalPrice: "$349", tag: "New", rating: 4.5, reviews: 87, category: "Marketing AI" },
  { name: "Custom Model Builder", price: "$2,499", originalPrice: "$3,999", tag: "Premium", rating: 5.0, reviews: 89, category: "Custom Models" },
  { name: "AI Training Kit", price: "$1,499", originalPrice: "$2,499", tag: "Enterprise", rating: 4.9, reviews: 52, category: "Custom Models" },
  { name: "Neural Architect", price: "$999", originalPrice: "$1,799", tag: "Pro", rating: 4.8, reviews: 43, category: "Custom Models" },
];

const CATEGORY_ICONS: Record<string, typeof Bot> = {
  "AI Chatbots": Bot,
  "Analytics": BarChart3,
  "Automation": Cog,
  "CRM Tools": Users,
  "Marketing AI": Megaphone,
  "Custom Models": Puzzle,
};

export default function CommerceEngineDemo({
  company,
  industry,
  primaryColor,
  secondaryColor,
  accentColor,
  features = [],
}: Props) {
  const [activeCategory, setActiveCategory] = useState("AI Chatbots");

  const filteredProducts = ALL_PRODUCTS.filter((p) => p.category === activeCategory);

  const benefits = [
    { icon: Truck, label: "Free Deployment", desc: "Launch in 24 hours" },
    { icon: RotateCcw, label: "30-Day Guarantee", desc: "Full refund if not satisfied" },
    { icon: CreditCard, label: "Secure Payment", desc: "256-bit SSL encryption" },
    { icon: ShieldCheck, label: "Lifetime Updates", desc: "Always the latest version" },
  ];

  const categories = [
    "AI Chatbots",
    "Analytics",
    "Automation",
    "CRM Tools",
    "Marketing AI",
    "Custom Models",
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="rounded-2xl overflow-hidden border border-white/10"
      style={{ background: "#07070e" }}
    >
      {/* Promo Bar */}
      <div
        className="text-center py-2.5 text-sm font-semibold text-white"
        style={{
          background: `linear-gradient(90deg, ${primaryColor}, ${secondaryColor})`,
        }}
      >
        <BadgePercent size={14} className="inline mr-2" />
        Launch Special: 40% OFF all AI solutions — Limited Time Only
      </div>

      {/* Nav */}
      <div
        className="flex items-center justify-between px-8 py-4 border-b"
        style={{ borderColor: `${primaryColor}15` }}
      >
        <div className="flex items-center gap-2">
          <ShoppingCart size={20} style={{ color: primaryColor }} />
          <span className="font-bold text-white text-lg">{company}</span>
          <span className="text-xs text-gray-500 ml-1">Store</span>
        </div>
        <div className="hidden md:flex items-center gap-6 text-sm text-gray-400">
          {categories.slice(0, 4).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="transition-colors"
              style={{ color: activeCategory === cat ? primaryColor : undefined }}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <Search size={18} className="text-gray-500" />
          <Heart size={18} className="text-gray-500" />
          <div className="relative">
            <ShoppingCart size={18} className="text-gray-400" />
            <div
              className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full text-[10px] text-white flex items-center justify-center font-bold"
              style={{ background: secondaryColor }}
            >
              3
            </div>
          </div>
        </div>
      </div>

      {/* Hero Banner */}
      <section className="relative px-8 md:px-16 py-16 overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1">
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-6"
              style={{
                color: accentColor,
                background: `${accentColor}15`,
              }}
            >
              <Sparkles size={12} />
              New Collection
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
              AI-Powered Solutions for{" "}
              <span
                style={{
                  background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {industry}
              </span>
            </h1>
            <p className="text-gray-400 mb-6">
              Discover our curated marketplace of intelligent tools designed to
              accelerate {industry.toLowerCase()} revenue. Each product
              AI-optimized for your niche.
            </p>
            <div className="flex gap-3">
              <button
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white"
                style={{
                  background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                }}
              >
                Shop Now <ArrowRight size={16} />
              </button>
              <button
                className="px-6 py-3 rounded-lg font-semibold border text-white"
                style={{ borderColor: `${primaryColor}40` }}
              >
                View Catalog
              </button>
            </div>
          </div>
          <div className="flex-1 flex justify-center">
            <div
              className="w-64 h-64 rounded-2xl flex items-center justify-center relative"
              style={{
                background: `linear-gradient(135deg, ${primaryColor}15, ${secondaryColor}15)`,
                border: `1px solid ${primaryColor}20`,
              }}
            >
              <Package
                size={80}
                style={{ color: primaryColor }}
                className="opacity-60"
              />
              <div
                className="absolute -top-3 -right-3 px-3 py-1 rounded-full text-xs font-bold text-white"
                style={{ background: secondaryColor }}
              >
                -40%
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Chips */}
      <section
        className="px-8 md:px-16 py-6 border-y"
        style={{ borderColor: `${primaryColor}10` }}
      >
        <div className="flex gap-3 overflow-x-auto max-w-5xl mx-auto">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            const CatIcon = CATEGORY_ICONS[cat] || Package;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="shrink-0 px-5 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2"
                style={
                  isActive
                    ? {
                        background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                        color: "white",
                        boxShadow: `0 0 15px ${primaryColor}30`,
                      }
                    : {
                        border: `1px solid ${primaryColor}20`,
                        color: "#9ca3af",
                        background: "transparent",
                      }
                }
              >
                <CatIcon size={14} />
                {cat}
              </button>
            );
          })}
        </div>
      </section>

      {/* Product Grid */}
      <section className="px-8 md:px-16 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-white">
              {activeCategory}{" "}
              <span style={{ color: primaryColor }}>Products</span>
            </h2>
            <span className="text-sm text-gray-500">
              {filteredProducts.length} products · AI-curated for {industry.toLowerCase()}
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid md:grid-cols-3 gap-6"
            >
              {filteredProducts.map((product, i) => (
                <motion.div
                  key={product.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-xl border overflow-hidden group transition-all hover:scale-[1.02]"
                  style={{
                    borderColor: `${primaryColor}15`,
                    background: "#0a0a16",
                  }}
                >
                  {/* Product Image Placeholder */}
                  <div
                    className="h-48 flex items-center justify-center relative"
                    style={{
                      background: `linear-gradient(135deg, ${primaryColor}10, ${secondaryColor}10)`,
                    }}
                  >
                    {(() => {
                      const Icon = CATEGORY_ICONS[activeCategory] || Package;
                      return (
                        <Icon
                          size={48}
                          style={{
                            color: i === 1 ? secondaryColor : primaryColor,
                          }}
                          className="opacity-40"
                        />
                      );
                    })()}
                    <div
                      className="absolute top-3 left-3 px-2 py-0.5 rounded text-[10px] font-bold text-white"
                      style={{
                        background:
                          i === 1
                            ? secondaryColor
                            : i === 2
                            ? accentColor
                            : primaryColor,
                      }}
                    >
                      {product.tag}
                    </div>
                    <button
                      className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center bg-black/30 backdrop-blur-sm"
                    >
                      <Heart size={14} className="text-gray-400" />
                    </button>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, j) => (
                        <Star
                          key={j}
                          size={12}
                          fill={accentColor}
                          style={{ color: accentColor }}
                        />
                      ))}
                      <span className="text-xs text-gray-500 ml-1">
                        {product.rating} ({product.reviews})
                      </span>
                    </div>

                    <h3 className="text-white font-semibold mb-3">
                      {product.name}
                    </h3>

                    <div className="flex items-end gap-2 mb-4">
                      <span
                        className="text-2xl font-black"
                        style={{ color: primaryColor }}
                      >
                        {product.price}
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        {product.originalPrice}
                      </span>
                    </div>

                    <button
                      className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold text-white transition-all"
                      style={{
                        background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                      }}
                    >
                      <ShoppingCart size={14} />
                      Add to Cart
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Selected Features */}
      {features.length > 0 && (
        <section
          className="px-8 md:px-16 py-12 border-t"
          style={{ borderColor: `${primaryColor}10` }}
        >
          <div className="max-w-5xl mx-auto">
            <h3 className="text-lg font-bold text-white mb-4">
              Your Selected <span style={{ color: accentColor }}>Features</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {features.map((f) => (
                <span
                  key={f}
                  className="px-3 py-1.5 rounded-full text-xs font-medium border"
                  style={{
                    color: accentColor,
                    borderColor: `${accentColor}30`,
                    background: `${accentColor}10`,
                  }}
                >
                  {f}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Trust Badges */}
      <section
        className="px-8 md:px-16 py-12 border-t"
        style={{
          borderColor: `${primaryColor}10`,
          background: `${primaryColor}03`,
        }}
      >
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {benefits.map((b, i) => (
            <motion.div
              key={b.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + i * 0.1 }}
              className="text-center"
            >
              <b.icon
                size={24}
                className="mx-auto mb-2"
                style={{ color: i % 2 === 0 ? primaryColor : secondaryColor }}
              />
              <div className="text-white text-sm font-semibold">{b.label}</div>
              <div className="text-gray-500 text-xs">{b.desc}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="px-8 md:px-16 py-16 text-center">
        <div
          className="max-w-2xl mx-auto p-8 rounded-2xl border"
          style={{
            borderColor: `${primaryColor}20`,
            background: `linear-gradient(135deg, ${primaryColor}08, ${secondaryColor}08)`,
          }}
        >
          <Sparkles size={28} className="mx-auto mb-3" style={{ color: accentColor }} />
          <h3 className="text-xl font-bold text-white mb-2">
            Get AI-powered product recommendations
          </h3>
          <p className="text-gray-400 text-sm mb-6">
            Join 10,000+ {industry.toLowerCase()} professionals receiving
            weekly curated picks.
          </p>
          <div className="flex gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2.5 rounded-lg bg-black/40 border text-sm text-white placeholder-gray-500 outline-none"
              style={{
                borderColor: `${primaryColor}30`,
              }}
              readOnly
            />
            <button
              className="px-6 py-2.5 rounded-lg font-semibold text-white text-sm shrink-0"
              style={{
                background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
              }}
            >
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
