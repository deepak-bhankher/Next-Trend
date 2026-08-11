import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const heroImages = [
  "/shoes1.png",
  "/shoes2.png",
  "/shoes3.png",
  "/shoes4.png",
];

const scrollShoes = [
  { image: "/shoe-row-1.jpg", name: "", brand: "" },
  { image: "/shoe-row-2.jpg", name: "", brand: "" },
  { image: "/shoe-row-3.jpg", name: "", brand: "" },
  { image: "/shoe-row-4.jpg", name: "", brand: "" },
  { image: "/shoe-row-5.jpg", name: "", brand: "" },
  { image: "/shoe-row-6.jpg", name: "", brand: "" },
];

const Home1 = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % heroImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-dark text-white min-h-screen">
      {/* Hero */}
      <section className="relative min-h-screen flex flex-col justify-center pt-24 pb-16 px-6 overflow-hidden">
        {/* Background gradient blobs */}
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-[#83A4D4]/6 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-[#A1FFCE]/5 rounded-full blur-[120px] pointer-events-none" />

        {/* Background watermark */}
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[18vw] md:text-[14vw] font-black text-white/[0.03] whitespace-nowrap select-none pointer-events-none">
          STRIDE
        </span>

        <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 items-center gap-8">
          {/* Left — Main Heading */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center md:text-left flex flex-col gap-6"
          >
            <h1 className="text-5xl md:text-7xl font-black leading-[0.9] tracking-tight">
              FOREVER
              <br />
              <span className="gradient-text-primary">FASTER.</span>
            </h1>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs mx-auto md:mx-0">
              Step into the future of style. Premium footwear crafted for those who move with purpose.
            </p>
            <div className="flex gap-3 justify-center md:justify-start">
              <a
                href="/men"
                className="gradient-primary text-[#080808] text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-full hover:opacity-90 transition-opacity"
              >
                Shop Now
              </a>
              <a
                href="/about"
                className="border border-[#83A4D4]/25 hover:border-[#B6FBFF]/50 text-white/60 hover:text-white text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-full transition-colors duration-200"
              >
                Our Story
              </a>
            </div>
          </motion.div>

          {/* Center — Shoe Image */}
          <div className="relative w-full h-[420px] md:h-[560px] flex items-center justify-center">
            <div className="absolute w-[300px] h-[300px] md:w-[420px] md:h-[420px] rounded-full bg-[#83A4D4]/10 blur-3xl" />

            <AnimatePresence mode="wait">
              <motion.img
                key={heroImages[activeIndex]}
                src={heroImages[activeIndex]}
                alt="Hero Shoe"
                initial={{ opacity: 0, scale: 0.92, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: -10 }}
                transition={{ duration: 0.6 }}
                className="relative z-10 max-w-full max-h-full w-auto h-auto object-contain drop-shadow-2xl"
              />
            </AnimatePresence>

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
          </div>

          {/* Right — Info Text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="hidden md:flex flex-col gap-8 text-right"
          >
            <div className="flex flex-col gap-1">
              <span className="gradient-text-primary text-xs font-bold uppercase tracking-widest">Premium Quality</span>
              <p className="text-white/50 text-sm leading-relaxed">
                Handpicked materials sourced from the world's finest tanneries and textile mills.
              </p>
            </div>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-[#83A4D4]/20 to-transparent" />

            <div className="flex flex-col gap-1">
              <span className="gradient-text-secondary text-xs font-bold uppercase tracking-widest">New Arrivals</span>
              <p className="text-white/50 text-sm leading-relaxed">
                Fresh drops every week. Stay ahead of the curve with our latest collections.
              </p>
            </div>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-[#A1FFCE]/20 to-transparent" />

            <div className="flex flex-col gap-1">
              <span className="gradient-text-primary text-xs font-bold uppercase tracking-widest">Free Delivery</span>
              <p className="text-white/50 text-sm leading-relaxed">
                Complimentary shipping on all orders above ₹999. Fast & secure delivery nationwide.
              </p>
            </div>

            <div className="flex justify-end gap-6 mt-2">
              <div className="text-right">
                <p className="text-2xl font-black gradient-text-primary">500+</p>
                <p className="text-white/40 text-xs uppercase tracking-wider">Styles</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-black gradient-text-secondary">50K+</p>
                <p className="text-white/40 text-xs uppercase tracking-wider">Customers</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Product Row - Auto Scrolling (Static Images) */}
      <section className="pb-24 overflow-hidden">
        <div className="flex gap-6 animate-scroll-shoes w-max">
          {[...scrollShoes, ...scrollShoes].map((shoe, i) => (
            <div
              key={i}
              className="w-56 md:w-64 flex-shrink-0 bg-white/5 border border-white/10 rounded-2xl overflow-hidden"
            >
              <div className="aspect-square">
                <img
                  src={shoe.image}
                  alt={shoe.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <p className="text-white/40 text-xs uppercase tracking-wide mb-1">
                  {shoe.brand}
                </p>
                <h3 className="font-semibold text-white text-sm">{shoe.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home1;