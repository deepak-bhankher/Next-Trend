import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiSave,
  FiUploadCloud,
  FiImage,
  FiSliders,
  FiFileText,
  FiLayout,
  FiCompass,
  FiLayers,
  FiPlus,
  FiTrash2,
  FiRotateCcw,
  FiCheck,
} from "react-icons/fi";
import { toast } from "react-toastify";
import api from "../../utils/api";
import { getImageUrl } from "../../utils/imageUrl";

const sectionTabs = [
  { id: "navbar", name: "Navbar Components", icon: FiLayout, desc: "Logo & navigation menu items" },
  { id: "hero", name: "Hero Section (Home)", icon: FiSliders, desc: "Main title, slogans, shoe & right features" },
  { id: "seasonDrop", name: "Season Drop (Home 2)", icon: FiLayers, desc: "Promo badge, shoe, stats & tags" },
  { id: "about", name: "About Us Page", icon: FiCompass, desc: "Header, values, journey milestones & stats" },
  { id: "footer", name: "Footer & Contact", icon: FiFileText, desc: "Address, phone, email, socials & copyright" },
];

const defaultMilestones = [
  { year: "2020", title: "The Beginning", desc: "Started as a small sneaker resale operation from a single storefront." },
  { year: "2022", title: "Going Digital", desc: "Launched our online store, bringing premium sneakers to customers nationwide." },
  { year: "2024", title: "Expanding Brands", desc: "Partnered with 8+ top global brands to offer an even wider curated collection." },
  { year: "2026", title: "Today", desc: "Serving 50,000+ happy customers with fast delivery and secure checkout." },
];

const AdminWebsiteCustomizer = () => {
  const [activeTab, setActiveTab] = useState("navbar");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [uploadingField, setUploadingField] = useState(null);

  const fileInputRef = useRef(null);

  const [settings, setSettings] = useState({
    navbar: {
      storeName: "",
      logoUrl: "/nt-logo.png",
      announcementText: "",
      links: [
        { name: "MEN", path: "/men" },
        { name: "WOMEN", path: "/women" },
        { name: "KIDS", path: "/kids" },
        { name: "ABOUT US", path: "/about" },
      ],
    },
    hero: {
      heading: "FOREVER",
      highlightText: "FASTER.",
      subtitle: "Step into the future of style. Premium footwear crafted for those who move with purpose.",
      badgeText: "Premium Quality",
      heroImage: "/men1.png",
      btnPrimaryText: "Shop Now",
      btnPrimaryLink: "/men",
      btnSecondaryText: "Our Story",
      btnSecondaryLink: "/about",
      feature1Title: "Premium Quality",
      feature1Desc: "Handpicked materials sourced from the world's finest tanneries and textile mills.",
      feature2Title: "New Arrivals",
      feature2Desc: "Fresh drops every week. Stay ahead of the curve with our latest collections.",
      feature3Title: "Free Delivery",
      feature3Desc: "Complimentary shipping on all orders above ₹999. Fast & secure delivery nationwide.",
      stat1Value: "500+",
      stat1Label: "Styles",
      stat2Value: "50K+",
      stat2Label: "Customers",
    },
    seasonDrop: {
      badge: "New Season Drop",
      heading: "BUILT FOR",
      highlightText: "THE BOLD.",
      subtitle: "Every pair tells a story. Engineered for performance, designed for the streets — our latest collection pushes boundaries.",
      shoeImage: "/men2.png",
      stat1Value: "200+",
      stat1Label: "New Styles",
      stat2Value: "100%",
      stat2Label: "Original",
      stat3Value: "Free",
      stat3Label: "Shipping",
      btn1Text: "Explore Collection",
      btn1Link: "/kids",
      btn2Text: "View items",
      btn2Link: "/men",
      tagTitle: "Limited Edition",
      tagSubtitle: "Only 50 pairs left",
      bottomTagTitle: "Premium Comfort",
      bottomTagSubtitle: "Ortho-flex sole technology",
    },
    about: {
      subtitle: "Our Story",
      title: "About Next Trend",
      story: "Next Trend was born from a simple idea — footwear should feel as good as it looks. We curate premium sneakers from the world's best brands, delivering comfort, quality, and style straight to your doorstep.",
      pillar1Title: "Our Mission",
      pillar1Desc: "To bring premium, comfortable footwear to every step you take, without compromising on style.",
      pillar2Title: "Crafted with Care",
      pillar2Desc: "Every pair is carefully selected from trusted brands known for quality and durability.",
      pillar3Title: "Trusted Quality",
      pillar3Desc: "We partner only with authentic, verified brands so you always get what you pay for.",
      journeySubtitle: "Our Journey",
      journeyTitle: "How We Started",
      milestones: defaultMilestones,
      stat1Value: "2020",
      stat1Label: "Founded",
      stat2Value: "500+",
      stat2Label: "Products",
      stat3Value: "50K+",
      stat3Label: "Customers",
      stat4Value: "8",
      stat4Label: "Top Brands",
      image: "",
    },
    footer: {
      description: "Your ultimate destination for curated sneakers, running icons, and everyday performance footwear.",
      email: "support@nexttrend.com",
      phone: "+91 98765 43210",
      address: "123 Sneaker Boulevard, Fashion District, New Delhi, India",
      copyright: "© 2026 Next Trend Inc. All rights reserved.",
      instagram: "https://instagram.com",
      twitter: "https://twitter.com",
      facebook: "https://facebook.com",
    },
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data } = await api.get("/settings");
        if (data) {
          setSettings((prev) => ({
            navbar: {
              ...prev.navbar,
              ...(data.navbar || {}),
              links:
                data.navbar && data.navbar.links && data.navbar.links.length > 0
                  ? data.navbar.links
                  : prev.navbar.links,
            },
            hero: { ...prev.hero, ...(data.hero || {}) },
            seasonDrop: { ...prev.seasonDrop, ...(data.seasonDrop || {}) },
            about: {
              ...prev.about,
              ...(data.about || {}),
              milestones:
                data.about && data.about.milestones && data.about.milestones.length > 0
                  ? data.about.milestones
                  : prev.about.milestones,
            },
            footer: { ...prev.footer, ...(data.footer || {}) },
          }));
        }
      } catch (error) {
        console.error("Failed to load settings:", error);
      } finally {
        setFetching(false);
      }
    };
    fetchSettings();
  }, []);

  const handleFieldChange = (section, field, value) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  // Navbar link handlers
  const handleLinkChange = (index, field, value) => {
    const updated = [...(settings.navbar.links || [])];
    updated[index] = { ...updated[index], [field]: value };
    handleFieldChange("navbar", "links", updated);
  };

  const handleAddLink = () => {
    const updated = [
      ...(settings.navbar.links || []),
      { name: "NEW COMPONENT", path: "/products" },
    ];
    handleFieldChange("navbar", "links", updated);
  };

  const handleDeleteLink = (index) => {
    const updated = (settings.navbar.links || []).filter((_, i) => i !== index);
    handleFieldChange("navbar", "links", updated);
  };

  const handleResetLinks = () => {
    const defaults = [
      { name: "MEN", path: "/men" },
      { name: "WOMEN", path: "/women" },
      { name: "KIDS", path: "/kids" },
      { name: "ABOUT US", path: "/about" },
    ];
    handleFieldChange("navbar", "links", defaults);
  };

  // About Milestone Handlers
  const handleMilestoneChange = (index, field, value) => {
    const updated = [...(settings.about.milestones || defaultMilestones)];
    updated[index] = { ...updated[index], [field]: value };
    handleFieldChange("about", "milestones", updated);
  };

  const handleAddMilestone = () => {
    const updated = [
      ...(settings.about.milestones || defaultMilestones),
      { year: "2027", title: "Next Phase", desc: "Expanding retail hubs and global shipping." },
    ];
    handleFieldChange("about", "milestones", updated);
  };

  const handleDeleteMilestone = (index) => {
    const updated = (settings.about.milestones || defaultMilestones).filter((_, i) => i !== index);
    handleFieldChange("about", "milestones", updated);
  };

  const handleResetMilestones = () => {
    handleFieldChange("about", "milestones", defaultMilestones);
  };

  // Laptop Image Upload handler
  const triggerLaptopUpload = (section, field) => {
    setUploadingField({ section, field });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !uploadingField) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please choose a valid image file (JPG, PNG, WEBP)");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    const { section, field } = uploadingField;
    try {
      toast.info("Uploading image from laptop...");
      const { data } = await api.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      handleFieldChange(section, field, data.url);
      toast.success("Image uploaded from laptop successfully!");
    } catch (error) {
      toast.error("Failed to upload image");
    } finally {
      setUploadingField(null);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.put("/settings", settings);
      toast.success("Website section changes published live!");
    } catch (error) {
      console.error("Save settings error:", error);
      const errMsg =
        error.response?.data?.message ||
        error.message ||
        "Failed to update store settings";
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="py-20 flex justify-center items-center text-[var(--muted)]">
        <div className="w-8 h-8 border-3 border-[#83A4D4] border-t-transparent rounded-full animate-spin mr-3" />
        Loading website sections...
      </div>
    );
  }

  const inputClass =
    "w-full bg-[var(--bg)] border border-[var(--border)] rounded-xl px-4 py-2.5 outline-none focus:border-[#83A4D4]/60 text-xs sm:text-sm text-[var(--text)] placeholder:text-[var(--muted)] transition-colors";

  // Reusable label with clear/delete button
  const renderLabel = (label, section, field) => {
    const hasValue = Boolean(settings[section]?.[field]);
    return (
      <div className="flex items-center justify-between mb-1">
        <label className="text-[11px] font-bold uppercase tracking-wider text-[var(--muted)]">
          {label}
        </label>
        {hasValue && (
          <button
            type="button"
            onClick={() => handleFieldChange(section, field, "")}
            className="text-[10px] text-red-400 hover:text-red-300 transition-colors font-semibold"
          >
            Clear
          </button>
        )}
      </div>
    );
  };

  // Reusable compact file upload bar without giant preview
  const renderCompactFileControl = (section, field, label, subtitle, presets) => {
    const currentValue = settings[section]?.[field];
    const fileName = currentValue ? currentValue.split("/").pop() : "";

    return (
      <div className="p-4 rounded-2xl bg-[var(--bg)] border border-[var(--border)] space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-[var(--text)]">{label}</p>
            {subtitle && <p className="text-[11px] text-[var(--muted)] mt-0.5">{subtitle}</p>}
          </div>
          {currentValue && (
            <button
              type="button"
              onClick={() => handleFieldChange(section, field, "")}
              className="inline-flex items-center gap-1 text-[11px] text-red-400 hover:text-red-300 font-semibold"
              title="Remove this image completely"
            >
              <FiTrash2 size={12} /> Remove Image
            </button>
          )}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-xl border border-[var(--border)] bg-black/20">
          <div className="flex items-center gap-3 min-w-0">
            {currentValue ? (
              <div className="w-10 h-10 rounded-lg bg-black/40 border border-[var(--border)] overflow-hidden flex items-center justify-center flex-shrink-0 p-1">
                <img
                  src={getImageUrl(currentValue)}
                  alt="Thumb"
                  className="max-w-full max-h-full object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
            ) : (
              <div className="w-10 h-10 rounded-lg bg-white/5 border border-[var(--border)] flex items-center justify-center flex-shrink-0 text-[var(--muted)]">
                <FiImage size={18} />
              </div>
            )}
            <div className="min-w-0">
              <p className="text-xs font-semibold text-[var(--text)] truncate max-w-[200px] sm:max-w-xs font-mono">
                {currentValue ? fileName : "No file selected"}
              </p>
              <p className="text-[10px] text-[var(--muted)]">
                {currentValue ? "Active on live website" : "Choose image file from your laptop"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              type="button"
              onClick={() => triggerLaptopUpload(section, field)}
              className="inline-flex items-center gap-1.5 gradient-primary text-[#080808] text-xs font-bold px-4 py-2 rounded-xl hover:scale-105 transition-transform shadow-sm"
            >
              <FiUploadCloud size={14} /> Replace
            </button>
            {currentValue && (
              <button
                type="button"
                onClick={() => handleFieldChange(section, field, "")}
                title="Delete Image"
                className="p-2 rounded-xl border border-red-500/20 text-red-400 hover:text-white hover:bg-red-500/80 hover:border-red-500 transition-all text-xs font-semibold"
              >
                <FiTrash2 size={14} />
              </button>
            )}
          </div>
        </div>

        {presets && presets.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 text-[10px] pt-1">
            <span className="text-[var(--muted)] font-medium">Quick Presets:</span>
            {presets.map((preset, idx) => (
              <span key={idx} className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleFieldChange(section, field, preset.url)}
                  className="text-[#83A4D4] hover:text-[#00F0FF] hover:underline font-semibold"
                >
                  {preset.name}
                </button>
                {idx < presets.length - 1 && <span className="text-[var(--border)]">•</span>}
              </span>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Hidden Universal File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Website Content Customizer</h1>
        <p className="text-[var(--muted)] text-sm mt-1">
          Website ke sabhi sections (Navbar, Home Hero, Season Drop, About Us, Footer) ka pura content yahan se edit ya delete karein.
        </p>
      </div>

      {/* Section Selector Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {sectionTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`p-4 rounded-2xl border text-left transition-all ${
                isActive
                  ? "gradient-primary text-[#080808] font-bold shadow-lg shadow-[#83A4D4]/20 scale-105"
                  : "bg-[var(--card-bg)] border-[var(--border)] text-[var(--muted)] hover:text-[var(--text)] hover:border-[#83A4D4]/40"
              }`}
            >
              <Icon size={20} className="mb-2" />
              <p className="text-xs font-bold leading-tight">{tab.name}</p>
              <p className={`text-[10px] mt-1 ${isActive ? "text-[#080808]/75" : "text-[var(--muted)]"}`}>
                {tab.desc}
              </p>
            </button>
          );
        })}
      </div>

      {/* Form Container */}
      <form onSubmit={handleSave} className="space-y-6">
        <AnimatePresence mode="wait">
          {/* ========================================================= */}
          {/* 1. NAVBAR SECTION */}
          {/* ========================================================= */}
          {activeTab === "navbar" && (
            <motion.div
              key="navbar"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border)] pb-5">
                <div>
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <FiLayout /> Navbar Menu Components & Logo
                  </h2>
                  <p className="text-xs text-[var(--muted)] mt-1">
                    Navbar ke navigation components (MEN, WOMEN, KIDS, ABOUT US etc.) ka naam badle, naye add kare ya delete kare.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleResetLinks}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border border-[var(--border)] text-[var(--muted)] hover:text-[var(--text)] hover:border-[#83A4D4]/50 transition-all"
                  >
                    <FiRotateCcw size={13} /> Reset Defaults
                  </button>
                  <button
                    type="button"
                    onClick={handleAddLink}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold gradient-primary text-[#080808] hover:scale-105 transition-all shadow-md"
                  >
                    <FiPlus size={14} /> Add Component
                  </button>
                </div>
              </div>

              {/* Logo Compact File Control */}
              {renderCompactFileControl(
                "navbar",
                "logoUrl",
                "Store Brand Logo",
                "Laptop se store logo upload karein ya quick presets select karein.",
                [
                  { name: "Official NT Logo", url: "/nt-logo.png" },
                  { name: "NT Vector SVG", url: "/nt-logo.svg" },
                  { name: "Wing Logo", url: "/logo.svg" },
                ]
              )}

              {/* Dynamic Navbar Components List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-[var(--text)] uppercase tracking-wider flex items-center gap-2">
                    <span>Navigation Menu Items</span>
                    <span className="text-[10px] bg-[#83A4D4]/15 text-[#83A4D4] px-2 py-0.5 rounded-full font-bold">
                      {(settings.navbar.links || []).length} Items
                    </span>
                  </h3>
                </div>

                {(!settings.navbar.links || settings.navbar.links.length === 0) ? (
                  <div className="p-8 text-center rounded-2xl border border-dashed border-[var(--border)] bg-[var(--bg)]/50">
                    <p className="text-sm text-[var(--muted)]">
                      Abhi navbar me koi menu component nahi hai.
                    </p>
                    <button
                      type="button"
                      onClick={handleAddLink}
                      className="mt-3 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold gradient-primary text-[#080808]"
                    >
                      <FiPlus size={14} /> + Add Component
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {settings.navbar.links.map((link, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl border border-[var(--border)] bg-[var(--bg)]/70 hover:border-[#83A4D4]/40 transition-all flex flex-col sm:flex-row sm:items-center gap-3"
                      >
                        <div className="flex items-center gap-2 sm:w-12 flex-shrink-0">
                          <span className="text-xs font-mono font-bold text-[var(--muted)] bg-black/20 px-2 py-1 rounded-md border border-[var(--border)]">
                            #{idx + 1}
                          </span>
                        </div>

                        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="text-[10px] font-semibold uppercase tracking-wider text-[var(--muted)] mb-1 block">
                              Component Name (Text)
                            </label>
                            <input
                              type="text"
                              value={link.name || ""}
                              onChange={(e) => handleLinkChange(idx, "name", e.target.value)}
                              placeholder="e.g. MEN, WOMEN, KIDS"
                              className={inputClass}
                            />
                          </div>

                          <div>
                            <label className="text-[10px] font-semibold uppercase tracking-wider text-[var(--muted)] mb-1 block">
                              Page Route / Path
                            </label>
                            <input
                              type="text"
                              value={link.path || ""}
                              onChange={(e) => handleLinkChange(idx, "path", e.target.value)}
                              placeholder="e.g. /men, /women, /about"
                              className={inputClass}
                            />
                          </div>
                        </div>

                        <div className="flex items-end sm:items-center justify-end">
                          <button
                            type="button"
                            onClick={() => handleDeleteLink(idx)}
                            title="Delete this component"
                            className="p-2.5 rounded-xl border border-red-500/20 text-red-400 hover:text-white hover:bg-red-500/80 hover:border-red-500 transition-all flex items-center gap-1.5 text-xs font-semibold"
                          >
                            <FiTrash2 size={15} />
                            <span className="sm:hidden">Delete</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* ========================================================= */}
          {/* 2. HERO SECTION (HOME 1) */}
          {/* ========================================================= */}
          {activeTab === "hero" && (
            <motion.div
              key="hero"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm"
            >
              <div>
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <FiSliders /> Hero Section (Home Page Top)
                </h2>
                <p className="text-xs text-[var(--muted)] mt-1">
                  Main banner headline, central shoe photo, buttons aur right side ke 3 features & stats sabhi edit karein.
                </p>
              </div>

              {/* Compact Shoe File Control */}
              {renderCompactFileControl(
                "hero",
                "heroImage",
                "Central Hero Shoe Photo",
                "Transparent PNG shoe photo from laptop (Center rotating shoe on homepage).",
                [
                  { name: "Default Red Shoe", url: "/men1.png" },
                  { name: "Black Street Shoe", url: "/men2.png" },
                  { name: "Sport Trainer", url: "/men3.png" },
                ]
              )}

              {/* Section 1: Main Headings & Buttons */}
              <div className="space-y-4 pt-2 border-t border-[var(--border)]">
                <h3 className="text-sm font-bold text-[var(--text)] uppercase tracking-wider">
                  Left Main Headline & Buttons
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    {renderLabel("Main Title", "hero", "heading")}
                    <input
                      type="text"
                      value={settings.hero.heading}
                      onChange={(e) => handleFieldChange("hero", "heading", e.target.value)}
                      placeholder="FOREVER"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    {renderLabel("Gradient Slogan", "hero", "highlightText")}
                    <input
                      type="text"
                      value={settings.hero.highlightText}
                      onChange={(e) => handleFieldChange("hero", "highlightText", e.target.value)}
                      placeholder="FASTER."
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  {renderLabel("Hero Badge Tag", "hero", "badgeText")}
                  <input
                    type="text"
                    value={settings.hero.badgeText}
                    onChange={(e) => handleFieldChange("hero", "badgeText", e.target.value)}
                    placeholder="e.g. Premium Quality"
                    className={inputClass}
                  />
                </div>

                <div>
                  {renderLabel("Hero Description Text", "hero", "subtitle")}
                  <textarea
                    rows={2}
                    value={settings.hero.subtitle}
                    onChange={(e) => handleFieldChange("hero", "subtitle", e.target.value)}
                    className={inputClass}
                  />
                </div>

                {/* Primary & Secondary Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--bg)]/50 space-y-2">
                    <p className="text-[11px] font-bold text-blue-600 dark:text-[#83A4D4] uppercase tracking-wider">
                      Button 1 (Primary)
                    </p>
                    <div>
                      {renderLabel("Button 1 Text", "hero", "btnPrimaryText")}
                      <input
                        type="text"
                        value={settings.hero.btnPrimaryText}
                        onChange={(e) => handleFieldChange("hero", "btnPrimaryText", e.target.value)}
                        placeholder="Shop Now"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      {renderLabel("Button 1 Link", "hero", "btnPrimaryLink")}
                      <input
                        type="text"
                        value={settings.hero.btnPrimaryLink}
                        onChange={(e) => handleFieldChange("hero", "btnPrimaryLink", e.target.value)}
                        placeholder="/men"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--bg)]/50 space-y-2">
                    <p className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                      Button 2 (Secondary)
                    </p>
                    <div>
                      {renderLabel("Button 2 Text", "hero", "btnSecondaryText")}
                      <input
                        type="text"
                        value={settings.hero.btnSecondaryText}
                        onChange={(e) => handleFieldChange("hero", "btnSecondaryText", e.target.value)}
                        placeholder="Our Story"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      {renderLabel("Button 2 Link", "hero", "btnSecondaryLink")}
                      <input
                        type="text"
                        value={settings.hero.btnSecondaryLink}
                        onChange={(e) => handleFieldChange("hero", "btnSecondaryLink", e.target.value)}
                        placeholder="/about"
                        className={inputClass}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 2: Right-Side Features & Stats (THE MISSING CONTENT) */}
              <div className="space-y-4 pt-4 border-t border-[var(--border)]">
                <div>
                  <h3 className="text-sm font-bold text-[var(--text)] uppercase tracking-wider">
                    Right Side Info Features & Stats
                  </h3>
                  <p className="text-xs text-[var(--muted)] mt-0.5">
                    Homepage par jo right side me 3 feature blocks aur stats dikhte hain unka content yahan edit karein.
                  </p>
                </div>

                <div className="space-y-3">
                  {/* Feature 1 */}
                  <div className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--bg)]/50 space-y-2">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        {renderLabel("Feature 1 Title", "hero", "feature1Title")}
                        <input
                          type="text"
                          value={settings.hero.feature1Title}
                          onChange={(e) => handleFieldChange("hero", "feature1Title", e.target.value)}
                          placeholder="Premium Quality"
                          className={inputClass}
                        />
                      </div>
                      <div className="sm:col-span-2">
                        {renderLabel("Feature 1 Description", "hero", "feature1Desc")}
                        <input
                          type="text"
                          value={settings.hero.feature1Desc}
                          onChange={(e) => handleFieldChange("hero", "feature1Desc", e.target.value)}
                          placeholder="Handpicked materials sourced..."
                          className={inputClass}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Feature 2 */}
                  <div className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--bg)]/50 space-y-2">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        {renderLabel("Feature 2 Title", "hero", "feature2Title")}
                        <input
                          type="text"
                          value={settings.hero.feature2Title}
                          onChange={(e) => handleFieldChange("hero", "feature2Title", e.target.value)}
                          placeholder="New Arrivals"
                          className={inputClass}
                        />
                      </div>
                      <div className="sm:col-span-2">
                        {renderLabel("Feature 2 Description", "hero", "feature2Desc")}
                        <input
                          type="text"
                          value={settings.hero.feature2Desc}
                          onChange={(e) => handleFieldChange("hero", "feature2Desc", e.target.value)}
                          placeholder="Fresh drops every week..."
                          className={inputClass}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Feature 3 */}
                  <div className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--bg)]/50 space-y-2">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        {renderLabel("Feature 3 Title", "hero", "feature3Title")}
                        <input
                          type="text"
                          value={settings.hero.feature3Title}
                          onChange={(e) => handleFieldChange("hero", "feature3Title", e.target.value)}
                          placeholder="Free Delivery"
                          className={inputClass}
                        />
                      </div>
                      <div className="sm:col-span-2">
                        {renderLabel("Feature 3 Description", "hero", "feature3Desc")}
                        <input
                          type="text"
                          value={settings.hero.feature3Desc}
                          onChange={(e) => handleFieldChange("hero", "feature3Desc", e.target.value)}
                          placeholder="Complimentary shipping on orders..."
                          className={inputClass}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  <div className="p-3 rounded-xl border border-[var(--border)] bg-[var(--bg)]/40 flex items-center gap-3">
                    <div className="flex-1">
                      {renderLabel("Stat 1 Value", "hero", "stat1Value")}
                      <input
                        type="text"
                        value={settings.hero.stat1Value}
                        onChange={(e) => handleFieldChange("hero", "stat1Value", e.target.value)}
                        placeholder="500+"
                        className={inputClass}
                      />
                    </div>
                    <div className="flex-1">
                      {renderLabel("Stat 1 Label", "hero", "stat1Label")}
                      <input
                        type="text"
                        value={settings.hero.stat1Label}
                        onChange={(e) => handleFieldChange("hero", "stat1Label", e.target.value)}
                        placeholder="Styles"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="p-3 rounded-xl border border-[var(--border)] bg-[var(--bg)]/40 flex items-center gap-3">
                    <div className="flex-1">
                      {renderLabel("Stat 2 Value", "hero", "stat2Value")}
                      <input
                        type="text"
                        value={settings.hero.stat2Value}
                        onChange={(e) => handleFieldChange("hero", "stat2Value", e.target.value)}
                        placeholder="50K+"
                        className={inputClass}
                      />
                    </div>
                    <div className="flex-1">
                      {renderLabel("Stat 2 Label", "hero", "stat2Label")}
                      <input
                        type="text"
                        value={settings.hero.stat2Label}
                        onChange={(e) => handleFieldChange("hero", "stat2Label", e.target.value)}
                        placeholder="Customers"
                        className={inputClass}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ========================================================= */}
          {/* 3. SEASON DROP (HOME 2) */}
          {/* ========================================================= */}
          {activeTab === "seasonDrop" && (
            <motion.div
              key="seasonDrop"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm"
            >
              <div>
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <FiLayers /> Season Drop Section (Home 2)
                </h2>
                <p className="text-xs text-[var(--muted)] mt-1">
                  Homepage ke Season Drop section ka pura content, shoe image, 3 stats, buttons aur floating tags customize karein.
                </p>
              </div>

              {/* Compact Shoe File Control */}
              {renderCompactFileControl(
                "seasonDrop",
                "shoeImage",
                "Floating Featured Shoe Photo",
                "Floating animated shoe for the Season Drop section (transparent PNG).",
                [
                  { name: "Adidas Superstar", url: "/men2.png" },
                  { name: "Puma Speedcat", url: "/men3.png" },
                  { name: "Nike Air Jordan", url: "/men4.png" },
                ]
              )}

              {/* Headings & Text */}
              <div className="space-y-4 pt-2 border-t border-[var(--border)]">
                <h3 className="text-sm font-bold text-[var(--text)] uppercase tracking-wider">
                  Main Headline & Text
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    {renderLabel("Promo Badge Text", "seasonDrop", "badge")}
                    <input
                      type="text"
                      value={settings.seasonDrop.badge}
                      onChange={(e) => handleFieldChange("seasonDrop", "badge", e.target.value)}
                      placeholder="New Season Drop"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    {renderLabel("Main Title", "seasonDrop", "heading")}
                    <input
                      type="text"
                      value={settings.seasonDrop.heading}
                      onChange={(e) => handleFieldChange("seasonDrop", "heading", e.target.value)}
                      placeholder="BUILT FOR"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    {renderLabel("Highlight Slogan", "seasonDrop", "highlightText")}
                    <input
                      type="text"
                      value={settings.seasonDrop.highlightText}
                      onChange={(e) => handleFieldChange("seasonDrop", "highlightText", e.target.value)}
                      placeholder="THE BOLD."
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  {renderLabel("Description Subtitle", "seasonDrop", "subtitle")}
                  <textarea
                    rows={2}
                    value={settings.seasonDrop.subtitle}
                    onChange={(e) => handleFieldChange("seasonDrop", "subtitle", e.target.value)}
                    className={inputClass}
                  />
                </div>

                {/* 3 Stats Bar */}
                <div className="space-y-2 pt-2">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[var(--muted)]">
                    Stats Row (3 Metrics)
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-3 rounded-xl border border-[var(--border)] bg-[var(--bg)]/50 space-y-2">
                      <p className="text-[10px] font-bold text-blue-600 dark:text-[#83A4D4] uppercase">Stat 1</p>
                      <div>
                        {renderLabel("Value", "seasonDrop", "stat1Value")}
                        <input
                          type="text"
                          value={settings.seasonDrop.stat1Value}
                          onChange={(e) => handleFieldChange("seasonDrop", "stat1Value", e.target.value)}
                          placeholder="200+"
                          className={inputClass}
                        />
                      </div>
                      <div>
                        {renderLabel("Label", "seasonDrop", "stat1Label")}
                        <input
                          type="text"
                          value={settings.seasonDrop.stat1Label}
                          onChange={(e) => handleFieldChange("seasonDrop", "stat1Label", e.target.value)}
                          placeholder="New Styles"
                          className={inputClass}
                        />
                      </div>
                    </div>

                    <div className="p-3 rounded-xl border border-[var(--border)] bg-[var(--bg)]/50 space-y-2">
                      <p className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase">Stat 2</p>
                      <div>
                        {renderLabel("Value", "seasonDrop", "stat2Value")}
                        <input
                          type="text"
                          value={settings.seasonDrop.stat2Value}
                          onChange={(e) => handleFieldChange("seasonDrop", "stat2Value", e.target.value)}
                          placeholder="100%"
                          className={inputClass}
                        />
                      </div>
                      <div>
                        {renderLabel("Label", "seasonDrop", "stat2Label")}
                        <input
                          type="text"
                          value={settings.seasonDrop.stat2Label}
                          onChange={(e) => handleFieldChange("seasonDrop", "stat2Label", e.target.value)}
                          placeholder="Original"
                          className={inputClass}
                        />
                      </div>
                    </div>

                    <div className="p-3 rounded-xl border border-[var(--border)] bg-[var(--bg)]/50 space-y-2">
                      <p className="text-[10px] font-bold text-cyan-700 dark:text-cyan-400 uppercase">Stat 3</p>
                      <div>
                        {renderLabel("Value", "seasonDrop", "stat3Value")}
                        <input
                          type="text"
                          value={settings.seasonDrop.stat3Value}
                          onChange={(e) => handleFieldChange("seasonDrop", "stat3Value", e.target.value)}
                          placeholder="Free"
                          className={inputClass}
                        />
                      </div>
                      <div>
                        {renderLabel("Label", "seasonDrop", "stat3Label")}
                        <input
                          type="text"
                          value={settings.seasonDrop.stat3Label}
                          onChange={(e) => handleFieldChange("seasonDrop", "stat3Label", e.target.value)}
                          placeholder="Shipping"
                          className={inputClass}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--bg)]/50 space-y-2">
                    <p className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                      Explore Button
                    </p>
                    <div>
                      {renderLabel("Button Text", "seasonDrop", "btn1Text")}
                      <input
                        type="text"
                        value={settings.seasonDrop.btn1Text}
                        onChange={(e) => handleFieldChange("seasonDrop", "btn1Text", e.target.value)}
                        placeholder="Explore Collection"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      {renderLabel("Button Link", "seasonDrop", "btn1Link")}
                      <input
                        type="text"
                        value={settings.seasonDrop.btn1Link}
                        onChange={(e) => handleFieldChange("seasonDrop", "btn1Link", e.target.value)}
                        placeholder="/kids"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--bg)]/50 space-y-2">
                    <p className="text-[11px] font-bold text-blue-600 dark:text-[#83A4D4] uppercase tracking-wider">
                      Secondary Button
                    </p>
                    <div>
                      {renderLabel("Button Text", "seasonDrop", "btn2Text")}
                      <input
                        type="text"
                        value={settings.seasonDrop.btn2Text}
                        onChange={(e) => handleFieldChange("seasonDrop", "btn2Text", e.target.value)}
                        placeholder="View items"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      {renderLabel("Button Link", "seasonDrop", "btn2Link")}
                      <input
                        type="text"
                        value={settings.seasonDrop.btn2Link}
                        onChange={(e) => handleFieldChange("seasonDrop", "btn2Link", e.target.value)}
                        placeholder="/men"
                        className={inputClass}
                      />
                    </div>
                  </div>
                </div>

                {/* Floating Tags Around Shoe */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--bg)]/50 space-y-2">
                    <p className="text-[11px] font-bold text-blue-600 dark:text-[#83A4D4] uppercase tracking-wider">
                      Top-Right Floating Tag
                    </p>
                    <div>
                      {renderLabel("Title", "seasonDrop", "tagTitle")}
                      <input
                        type="text"
                        value={settings.seasonDrop.tagTitle}
                        onChange={(e) => handleFieldChange("seasonDrop", "tagTitle", e.target.value)}
                        placeholder="Limited Edition"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      {renderLabel("Subtitle", "seasonDrop", "tagSubtitle")}
                      <input
                        type="text"
                        value={settings.seasonDrop.tagSubtitle}
                        onChange={(e) => handleFieldChange("seasonDrop", "tagSubtitle", e.target.value)}
                        placeholder="Only 50 pairs left"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--bg)]/50 space-y-2">
                    <p className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                      Bottom-Left Floating Tag
                    </p>
                    <div>
                      {renderLabel("Title", "seasonDrop", "bottomTagTitle")}
                      <input
                        type="text"
                        value={settings.seasonDrop.bottomTagTitle}
                        onChange={(e) => handleFieldChange("seasonDrop", "bottomTagTitle", e.target.value)}
                        placeholder="Premium Comfort"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      {renderLabel("Subtitle", "seasonDrop", "bottomTagSubtitle")}
                      <input
                        type="text"
                        value={settings.seasonDrop.bottomTagSubtitle}
                        onChange={(e) => handleFieldChange("seasonDrop", "bottomTagSubtitle", e.target.value)}
                        placeholder="Ortho-flex sole technology"
                        className={inputClass}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ========================================================= */}
          {/* 4. ABOUT US SECTION */}
          {/* ========================================================= */}
          {activeTab === "about" && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm"
            >
              <div>
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <FiCompass /> About Us Page Content (Complete Structure)
                </h2>
                <p className="text-xs text-[var(--muted)] mt-1">
                  About page ke sabhi sections: Top Header, Core Pillars/Data, Journey Milestones aur Stats bar yahan se edit karein.
                </p>
              </div>

              {/* Optional About Banner Compact File Control */}
              {renderCompactFileControl(
                "about",
                "image",
                "Optional About Banner Photo",
                "Upload a brand banner photo if you wish to show it on About Us."
              )}

              {/* Part 1: Top Hero / Header */}
              <div className="space-y-4 pt-2 border-t border-[var(--border)]">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-[var(--text)] uppercase tracking-wider flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-700 dark:text-[#83A4D4] flex items-center justify-center text-[10px] font-bold">1</span>
                    <span>Front Header (Top Story)</span>
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    {renderLabel("Tagline / Subheading", "about", "subtitle")}
                    <input
                      type="text"
                      value={settings.about.subtitle}
                      onChange={(e) => handleFieldChange("about", "subtitle", e.target.value)}
                      placeholder="Our Story"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    {renderLabel("Main Headline Title", "about", "title")}
                    <input
                      type="text"
                      value={settings.about.title}
                      onChange={(e) => handleFieldChange("about", "title", e.target.value)}
                      placeholder="Crafted for Every Step."
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  {renderLabel("Our Story Paragraph", "about", "story")}
                  <textarea
                    rows={3}
                    value={settings.about.story}
                    onChange={(e) => handleFieldChange("about", "story", e.target.value)}
                    placeholder="Next Trend was born from a simple idea..."
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Part 2: Core Pillars & Data */}
              <div className="space-y-4 pt-4 border-t border-[var(--border)]">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-[var(--text)] uppercase tracking-wider flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-[#A1FFCE] flex items-center justify-center text-[10px] font-bold">2</span>
                    <span>Core Pillars & Mission (Niche Ka Data)</span>
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--bg)]/50 space-y-2">
                    <p className="text-[10px] font-bold text-blue-600 dark:text-[#83A4D4] uppercase">Pillar 1</p>
                    <div>
                      {renderLabel("Title", "about", "pillar1Title")}
                      <input
                        type="text"
                        value={settings.about.pillar1Title}
                        onChange={(e) => handleFieldChange("about", "pillar1Title", e.target.value)}
                        placeholder="Our Mission"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      {renderLabel("Description", "about", "pillar1Desc")}
                      <textarea
                        rows={2}
                        value={settings.about.pillar1Desc}
                        onChange={(e) => handleFieldChange("about", "pillar1Desc", e.target.value)}
                        placeholder="To bring premium footwear..."
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--bg)]/50 space-y-2">
                    <p className="text-[10px] font-bold text-emerald-600 dark:text-[#A1FFCE] uppercase">Pillar 2</p>
                    <div>
                      {renderLabel("Title", "about", "pillar2Title")}
                      <input
                        type="text"
                        value={settings.about.pillar2Title}
                        onChange={(e) => handleFieldChange("about", "pillar2Title", e.target.value)}
                        placeholder="Crafted with Care"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      {renderLabel("Description", "about", "pillar2Desc")}
                      <textarea
                        rows={2}
                        value={settings.about.pillar2Desc}
                        onChange={(e) => handleFieldChange("about", "pillar2Desc", e.target.value)}
                        placeholder="Every pair is carefully selected..."
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--bg)]/50 space-y-2">
                    <p className="text-[10px] font-bold text-cyan-700 dark:text-[#00F0FF] uppercase">Pillar 3</p>
                    <div>
                      {renderLabel("Title", "about", "pillar3Title")}
                      <input
                        type="text"
                        value={settings.about.pillar3Title}
                        onChange={(e) => handleFieldChange("about", "pillar3Title", e.target.value)}
                        placeholder="Trusted Quality"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      {renderLabel("Description", "about", "pillar3Desc")}
                      <textarea
                        rows={2}
                        value={settings.about.pillar3Desc}
                        onChange={(e) => handleFieldChange("about", "pillar3Desc", e.target.value)}
                        placeholder="We partner only with authentic..."
                        className={inputClass}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Part 3: Brand Journey & Timeline */}
              <div className="space-y-4 pt-4 border-t border-[var(--border)]">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h3 className="text-sm font-bold text-[var(--text)] uppercase tracking-wider flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-700 dark:text-cyan-400 flex items-center justify-center text-[10px] font-bold">3</span>
                    <span>Brand Journey & Timeline Milestones</span>
                  </h3>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleResetMilestones}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-[11px] font-semibold border border-[var(--border)] text-[var(--muted)] hover:text-[var(--text)] transition-colors"
                    >
                      <FiRotateCcw size={12} /> Reset Timeline
                    </button>
                    <button
                      type="button"
                      onClick={handleAddMilestone}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-[11px] font-bold gradient-primary text-[#080808]"
                    >
                      <FiPlus size={13} /> Add Milestone
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    {renderLabel("Journey Subtitle", "about", "journeySubtitle")}
                    <input
                      type="text"
                      value={settings.about.journeySubtitle}
                      onChange={(e) => handleFieldChange("about", "journeySubtitle", e.target.value)}
                      placeholder="Our Journey"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    {renderLabel("Journey Heading", "about", "journeyTitle")}
                    <input
                      type="text"
                      value={settings.about.journeyTitle}
                      onChange={(e) => handleFieldChange("about", "journeyTitle", e.target.value)}
                      placeholder="How We Started"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  {(settings.about.milestones || defaultMilestones).map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--bg)]/60 flex flex-col sm:flex-row sm:items-center gap-3"
                    >
                      <div className="w-20 flex-shrink-0">
                        <label className="text-[10px] font-semibold uppercase text-[var(--muted)] block mb-1">
                          Year
                        </label>
                        <input
                          type="text"
                          value={item.year || ""}
                          onChange={(e) => handleMilestoneChange(idx, "year", e.target.value)}
                          placeholder="2024"
                          className={inputClass}
                        />
                      </div>
                      <div className="w-40 flex-shrink-0">
                        <label className="text-[10px] font-semibold uppercase text-[var(--muted)] block mb-1">
                          Title
                        </label>
                        <input
                          type="text"
                          value={item.title || ""}
                          onChange={(e) => handleMilestoneChange(idx, "title", e.target.value)}
                          placeholder="Milestone"
                          className={inputClass}
                        />
                      </div>
                      <div className="flex-1">
                        <label className="text-[10px] font-semibold uppercase text-[var(--muted)] block mb-1">
                          Description
                        </label>
                        <input
                          type="text"
                          value={item.desc || ""}
                          onChange={(e) => handleMilestoneChange(idx, "desc", e.target.value)}
                          placeholder="Details..."
                          className={inputClass}
                        />
                      </div>
                      <div className="flex items-end sm:items-center justify-end">
                        <button
                          type="button"
                          onClick={() => handleDeleteMilestone(idx)}
                          title="Delete Milestone"
                          className="p-2.5 rounded-xl border border-red-500/20 text-red-400 hover:text-white hover:bg-red-500/80 hover:border-red-500 transition-all text-xs"
                        >
                          <FiTrash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Part 4: Key Stats (Niche Vala) */}
              <div className="space-y-4 pt-4 border-t border-[var(--border)]">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-[var(--text)] uppercase tracking-wider flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-400 flex items-center justify-center text-[10px] font-bold">4</span>
                    <span>About Page Key Stats Bar (Niche Vala)</span>
                  </h3>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 rounded-xl border border-[var(--border)] bg-[var(--bg)]/50 space-y-2">
                    <p className="text-[10px] font-bold text-blue-600 dark:text-[#83A4D4] uppercase">Stat 1</p>
                    <input
                      type="text"
                      value={settings.about.stat1Value}
                      onChange={(e) => handleFieldChange("about", "stat1Value", e.target.value)}
                      placeholder="2020"
                      className={inputClass}
                    />
                    <input
                      type="text"
                      value={settings.about.stat1Label}
                      onChange={(e) => handleFieldChange("about", "stat1Label", e.target.value)}
                      placeholder="Founded"
                      className={inputClass}
                    />
                  </div>

                  <div className="p-3 rounded-xl border border-[var(--border)] bg-[var(--bg)]/50 space-y-2">
                    <p className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase">Stat 2</p>
                    <input
                      type="text"
                      value={settings.about.stat2Value}
                      onChange={(e) => handleFieldChange("about", "stat2Value", e.target.value)}
                      placeholder="500+"
                      className={inputClass}
                    />
                    <input
                      type="text"
                      value={settings.about.stat2Label}
                      onChange={(e) => handleFieldChange("about", "stat2Label", e.target.value)}
                      placeholder="Products"
                      className={inputClass}
                    />
                  </div>

                  <div className="p-3 rounded-xl border border-[var(--border)] bg-[var(--bg)]/50 space-y-2">
                    <p className="text-[10px] font-bold text-cyan-700 dark:text-cyan-400 uppercase">Stat 3</p>
                    <input
                      type="text"
                      value={settings.about.stat3Value}
                      onChange={(e) => handleFieldChange("about", "stat3Value", e.target.value)}
                      placeholder="50K+"
                      className={inputClass}
                    />
                    <input
                      type="text"
                      value={settings.about.stat3Label}
                      onChange={(e) => handleFieldChange("about", "stat3Label", e.target.value)}
                      placeholder="Customers"
                      className={inputClass}
                    />
                  </div>

                  <div className="p-3 rounded-xl border border-[var(--border)] bg-[var(--bg)]/50 space-y-2">
                    <p className="text-[10px] font-bold text-amber-700 dark:text-amber-400 uppercase">Stat 4</p>
                    <input
                      type="text"
                      value={settings.about.stat4Value}
                      onChange={(e) => handleFieldChange("about", "stat4Value", e.target.value)}
                      placeholder="8"
                      className={inputClass}
                    />
                    <input
                      type="text"
                      value={settings.about.stat4Label}
                      onChange={(e) => handleFieldChange("about", "stat4Label", e.target.value)}
                      placeholder="Top Brands"
                      className={inputClass}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ========================================================= */}
          {/* 5. FOOTER & CONTACT SECTION */}
          {/* ========================================================= */}
          {activeTab === "footer" && (
            <motion.div
              key="footer"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm"
            >
              <div>
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <FiFileText /> Footer & Customer Contact Settings
                </h2>
                <p className="text-xs text-[var(--muted)] mt-1">
                  Manage store contact email, phone, physical address, social media URLs and copyright notice.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  {renderLabel("Footer About Description", "footer", "description")}
                  <textarea
                    rows={2}
                    value={settings.footer.description}
                    onChange={(e) => handleFieldChange("footer", "description", e.target.value)}
                    className={inputClass}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    {renderLabel("Customer Support Email", "footer", "email")}
                    <input
                      type="email"
                      value={settings.footer.email}
                      onChange={(e) => handleFieldChange("footer", "email", e.target.value)}
                      required
                      className={inputClass}
                    />
                  </div>

                  <div>
                    {renderLabel("Customer Support Phone", "footer", "phone")}
                    <input
                      type="text"
                      value={settings.footer.phone}
                      onChange={(e) => handleFieldChange("footer", "phone", e.target.value)}
                      required
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    {renderLabel("Physical Store Address", "footer", "address")}
                    <input
                      type="text"
                      value={settings.footer.address}
                      onChange={(e) => handleFieldChange("footer", "address", e.target.value)}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    {renderLabel("Copyright Notice", "footer", "copyright")}
                    <input
                      type="text"
                      value={settings.footer.copyright}
                      onChange={(e) => handleFieldChange("footer", "copyright", e.target.value)}
                      className={inputClass}
                    />
                  </div>
                </div>

                {/* Social Media Links */}
                <div className="space-y-3 pt-3 border-t border-[var(--border)]">
                  <p className="text-xs font-bold uppercase tracking-wider text-[var(--text)]">
                    Social Media Profile Links
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      {renderLabel("Instagram URL", "footer", "instagram")}
                      <input
                        type="text"
                        value={settings.footer.instagram}
                        onChange={(e) => handleFieldChange("footer", "instagram", e.target.value)}
                        placeholder="https://instagram.com"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      {renderLabel("Twitter / X URL", "footer", "twitter")}
                      <input
                        type="text"
                        value={settings.footer.twitter}
                        onChange={(e) => handleFieldChange("footer", "twitter", e.target.value)}
                        placeholder="https://twitter.com"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      {renderLabel("Facebook URL", "footer", "facebook")}
                      <input
                        type="text"
                        value={settings.footer.facebook}
                        onChange={(e) => handleFieldChange("footer", "facebook", e.target.value)}
                        placeholder="https://facebook.com"
                        className={inputClass}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Save Bar */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 gradient-primary text-[#080808] px-8 py-3.5 rounded-xl font-bold text-sm hover:scale-[1.02] transition-transform shadow-lg shadow-[#83A4D4]/20 disabled:opacity-50 cursor-pointer"
          >
            <FiSave size={16} />
            {loading ? "Saving Changes..." : "Publish Section Changes Live"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminWebsiteCustomizer;
