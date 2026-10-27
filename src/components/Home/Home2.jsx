import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import api from "../../utils/api";
import { getImageUrl } from "../../utils/imageUrl";

const Home2 = () => {
  const [content, setContent] = useState({
    badge: "New Season Drop",
    heading: "BUILT FOR",
    highlightText: "THE BOLD.",
    subtitle:
      "Every pair tells a story. Engineered for performance, designed for the streets — our latest collection pushes boundaries.",
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
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data } = await api.get("/settings");
        if (data && data.seasonDrop) {
          setContent((prev) => ({ ...prev, ...data.seasonDrop }));
        }
      } catch (err) {
        console.error("Failed to load seasonDrop settings", err);
      }
    };
    fetchSettings();
  }, []);

  return (
    <section className="relative bg-[var(--bg)] overflow-hidden py-24 px-6">
      {/* Background blobs */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#A1FFCE]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute left-0 top-1/4 w-[400px] h-[400px] bg-[#83A4D4]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-8 md:gap-6">
        {/* Left — Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col gap-6 text-center md:text-left"
        >
          {/* Badge */}
          {content.badge && (
            <span className="inline-flex items-center gap-2 self-center md:self-start bg-[#A1FFCE]/8 border border-[#A1FFCE]/20 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full w-fit gradient-text-secondary">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A1FFCE] animate-pulse" />
              {content.badge}
            </span>
          )}

          <h2 className="text-4xl md:text-6xl font-black leading-[0.95] tracking-tight text-[var(--text)]">
            {content.heading}
            <br />
            <span className="gradient-text-secondary">{content.highlightText}</span>
          </h2>

          <p className="text-[var(--muted)] text-sm md:text-base leading-relaxed max-w-md mx-auto md:mx-0">
            {content.subtitle}
          </p>

          {/* Stats row */}
          <div className="flex justify-center md:justify-start gap-6 sm:gap-8 py-4 border-t border-b border-[var(--border)]">
            <div>
              <p className="text-xl sm:text-2xl font-black gradient-text-primary">
                {content.stat1Value || "200+"}
              </p>
              <p className="text-[var(--muted)] text-xs uppercase tracking-wider mt-0.5">
                {content.stat1Label || "New Styles"}
              </p>
            </div>
            <div className="w-px bg-[#83A4D4]/15" />
            <div>
              <p className="text-xl sm:text-2xl font-black gradient-text-secondary">
                {content.stat2Value || "100%"}
              </p>
              <p className="text-[var(--muted)] text-xs uppercase tracking-wider mt-0.5">
                {content.stat2Label || "Original"}
              </p>
            </div>
            <div className="w-px bg-[#83A4D4]/15" />
            <div>
              <p className="text-xl sm:text-2xl font-black gradient-text-primary">
                {content.stat3Value || "Free"}
              </p>
              <p className="text-[var(--muted)] text-xs uppercase tracking-wider mt-0.5">
                {content.stat3Label || "Shipping"}
              </p>
            </div>
          </div>

          <div className="flex gap-3 justify-center md:justify-start flex-wrap">
            <Link
              to={content.btn1Link || "/kids"}
              className="gradient-secondary text-[#080808] text-xs font-bold uppercase tracking-widest px-6 sm:px-7 py-3 sm:py-3.5 rounded-full hover:opacity-90 transition-opacity"
            >
              {content.btn1Text || "Explore Collection"}
            </Link>
            <Link
              to={content.btn2Link || "/men"}
              className="border border-[#83A4D4]/20 hover:border-[#B6FBFF]/40 text-[var(--muted)] hover:text-[var(--text)] text-xs font-bold uppercase tracking-widest px-6 sm:px-7 py-3 sm:py-3.5 rounded-full transition-colors duration-200"
            >
              {content.btn2Text || "View items"}
            </Link>
          </div>
        </motion.div>

        {/* Right — Floating Shoe Image */}
        <div className="relative flex items-center justify-center">
          {/* Glow ring */}
          <div className="absolute w-[340px] h-[340px] md:w-[460px] md:h-[460px] rounded-full bg-[#A1FFCE]/6 blur-3xl" />

          {content.shoeImage && (
            <motion.img
              src={getImageUrl(content.shoeImage)}
              alt="Featured Shoe"
              animate={{ y: [0, -18, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10 w-[300px] h-[300px] md:w-[480px] md:h-[480px] object-contain drop-shadow-2xl"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          )}

          {/* Floating tag — top right */}
          {content.tagTitle && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="absolute top-6 right-4 md:right-0 bg-[var(--card-bg)] backdrop-blur-md border border-[#83A4D4]/20 rounded-2xl px-4 py-3 text-right"
            >
              <p className="text-[var(--text)] text-sm font-bold">{content.tagTitle}</p>
              {content.tagSubtitle && (
                <p className="gradient-text-primary text-xs mt-0.5">{content.tagSubtitle}</p>
              )}
            </motion.div>
          )}

          {/* Floating tag — bottom left */}
          {content.bottomTagTitle && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="absolute bottom-6 left-4 md:left-0 bg-[var(--card-bg)] backdrop-blur-md border border-[#A1FFCE]/20 rounded-2xl px-4 py-3"
            >
              <p className="gradient-text-secondary text-xs font-bold uppercase tracking-wider">
                {content.bottomTagTitle}
              </p>
              {content.bottomTagSubtitle && (
                <p className="text-[var(--muted)] text-xs mt-0.5">{content.bottomTagSubtitle}</p>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Home2;
