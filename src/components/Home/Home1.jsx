import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../utils/api";
import { getImageUrl } from "../../utils/imageUrl";

const defaultHeroImages = [
  "/men1.png",
  "/men2.png",
  "/men3.png",
  "/men4.png",
];

const scrollShoes = [
  { image: "/men1.png", name: "Duramo SL 2.0", brand: "Adidas" },
  { image: "/men2.png", name: "Seeker Speckle", brand: "Puma" },
  { image: "/men3.png", name: "Speedcat OG", brand: "Puma" },
  { image: "/men4.png", name: "Air Jordan", brand: "Jordan" },
  { image: "/men5.png", name: "Jordan Street Style", brand: "Jordan" },
  { image: "/men6.png", name: "Jordan 1 Mid Patent SE", brand: "Jordan" },
];

const Home1 = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [heroImages, setHeroImages] = useState(defaultHeroImages);
  const [heroContent, setHeroContent] = useState({
    heading: "FOREVER",
    highlightText: "FASTER.",
    subtitle:
      "Step into the future of style. Premium footwear crafted for those who move with purpose.",
    badgeText: "Premium Quality",
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
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data } = await api.get("/settings");
        if (data && data.hero) {
          setHeroContent((prev) => ({
            ...prev,
            ...data.hero,
          }));
          if (data.hero.heroImage) {
            setHeroImages([data.hero.heroImage, ...defaultHeroImages.filter((img) => img !== data.hero.heroImage)]);
          }
        }
      } catch (err) {
        console.error("Failed to load hero settings", err);
      }
    };
    fetchSettings();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % heroImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [heroImages]);

  return (
    <div className="bg-[var(--bg)] text-[var(--text)] min-h-screen">
      {/* Hero */}
      <section className="relative min-h-screen flex flex-col justify-center pt-24 pb-16 px-6 overflow-hidden">
        {/* Background gradient blobs */}
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-[#83A4D4]/6 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-[#A1FFCE]/5 rounded-full blur-[120px] pointer-events-none" />

        {/* Background watermark */}
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[18vw] md:text-[14vw] font-black text-white/[0.03] whitespace-nowrap select-none pointer-events-none">
          NEXT TREND
        </span>

        <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 items-center gap-6 md:gap-8">
          {/* Left — Main Heading */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center md:text-left flex flex-col gap-6"
          >
            <h1 className="text-5xl md:text-7xl font-black leading-[0.9] tracking-tight">
              {heroContent.heading}
              <br />
              <span className="gradient-text-primary">{heroContent.highlightText}</span>
            </h1>
            <p className="text-[var(--muted)] text-sm leading-relaxed max-w-xs mx-auto md:mx-0">
              {heroContent.subtitle}
            </p>
            <div className="flex gap-3 justify-center md:justify-start">
              <Link
                to={heroContent.btnPrimaryLink || "/men"}
                className="gradient-primary text-[#080808] text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-full hover:opacity-90 transition-opacity"
              >
                {heroContent.btnPrimaryText || "Shop Now"}
              </Link>
              <Link
                to={heroContent.btnSecondaryLink || "/about"}
                className="border border-[#83A4D4]/25 hover:border-[#B6FBFF]/50 text-[var(--muted)] hover:text-[var(--text)] text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-full transition-colors duration-200"
              >
                {heroContent.btnSecondaryText || "Our Story"}
              </Link>
            </div>
          </motion.div>

          {/* Center — Shoe Image */}
          <div className="relative w-full h-[320px] sm:h-[420px] md:h-[560px] flex items-center justify-center">
            <div className="absolute w-[300px] h-[300px] md:w-[420px] md:h-[420px] rounded-full bg-[#83A4D4]/10 blur-3xl" />

            {heroImages.length > 0 && heroImages[activeIndex] ? (
              <AnimatePresence mode="wait">
                <motion.img
                  key={heroImages[activeIndex]}
                  src={getImageUrl(heroImages[activeIndex])}
                  alt="Hero Shoe"
                  initial={{ opacity: 0, scale: 0.92, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92, y: -10 }}
                  transition={{ duration: 0.6 }}
                  className="relative z-10 max-w-full max-h-full w-auto h-auto object-contain drop-shadow-2xl"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </AnimatePresence>
            ) : null}

            {heroImages.length > 1 && (
              <div className="absolute bottom-0 flex justify-center gap-2">
                {heroImages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    className={`h-[3px] rounded-full transition-all duration-300 ${
                      i === activeIndex ? "w-8 gradient-primary" : "w-3 bg-white/20"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Right — Info Text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="hidden md:flex flex-col gap-6 text-right"
          >
            {heroContent.feature1Title && (
              <div className="flex flex-col gap-1">
                <span className="gradient-text-primary text-xs font-bold uppercase tracking-widest">
                  {heroContent.feature1Title}
                </span>
                <p className="text-[var(--muted)] text-sm leading-relaxed">
                  {heroContent.feature1Desc}
                </p>
              </div>
            )}

            {heroContent.feature2Title && (
              <>
                <div className="w-full h-px bg-gradient-to-r from-transparent via-[#83A4D4]/20 to-transparent" />
                <div className="flex flex-col gap-1">
                  <span className="gradient-text-secondary text-xs font-bold uppercase tracking-widest">
                    {heroContent.feature2Title}
                  </span>
                  <p className="text-[var(--muted)] text-sm leading-relaxed">
                    {heroContent.feature2Desc}
                  </p>
                </div>
              </>
            )}

            {heroContent.feature3Title && (
              <>
                <div className="w-full h-px bg-gradient-to-r from-transparent via-[#A1FFCE]/20 to-transparent" />
                <div className="flex flex-col gap-1">
                  <span className="gradient-text-primary text-xs font-bold uppercase tracking-widest">
                    {heroContent.feature3Title}
                  </span>
                  <p className="text-[var(--muted)] text-sm leading-relaxed">
                    {heroContent.feature3Desc}
                  </p>
                </div>
              </>
            )}

            <div className="flex justify-end gap-6 mt-2">
              <div className="text-right">
                <p className="text-2xl font-black gradient-text-primary">
                  {heroContent.stat1Value || "500+"}
                </p>
                <p className="text-[var(--muted)] text-xs uppercase tracking-wider">
                  {heroContent.stat1Label || "Styles"}
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-black gradient-text-secondary">
                  {heroContent.stat2Value || "50K+"}
                </p>
                <p className="text-[var(--muted)] text-xs uppercase tracking-wider">
                  {heroContent.stat2Label || "Customers"}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Mobile stats row — shown only on small screens */}
          <div className="flex md:hidden justify-center gap-8 pb-4">
            <div className="text-center">
              <p className="text-xl font-black gradient-text-primary">
                {heroContent.stat1Value || "500+"}
              </p>
              <p className="text-[var(--muted)] text-xs uppercase tracking-wider">
                {heroContent.stat1Label || "Styles"}
              </p>
            </div>
            <div className="w-px bg-[#83A4D4]/15" />
            <div className="text-center">
              <p className="text-xl font-black gradient-text-secondary">
                {heroContent.stat2Value || "50K+"}
              </p>
              <p className="text-[var(--muted)] text-xs uppercase tracking-wider">
                {heroContent.stat2Label || "Customers"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Row - Auto Scrolling (Static Images) */}
      <section className="pb-24 overflow-hidden">
        <div className="flex gap-6 animate-scroll-shoes w-max">
          {[...scrollShoes, ...scrollShoes].map((shoe, i) => (
            <div
              key={i}
              className="w-56 md:w-64 flex-shrink-0 bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl overflow-hidden"
            >
              <div className="aspect-square">
                <img
                  src={shoe.image}
                  alt={shoe.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <p className="text-[var(--muted)] text-xs uppercase tracking-wide mb-1">
                  {shoe.brand}
                </p>
                <h3 className="font-semibold text-[var(--text)] text-sm">{shoe.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home1;