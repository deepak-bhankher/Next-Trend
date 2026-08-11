import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Home2 = () => {
  return (
    <section className="relative bg-dark overflow-hidden py-24 px-6">
      {/* Background blobs */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#A1FFCE]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute left-0 top-1/4 w-[400px] h-[400px] bg-[#83A4D4]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-12 md:gap-6">

        {/* Left — Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col gap-6 text-center md:text-left"
        >
          {/* Badge */}
          <span className="inline-flex items-center gap-2 self-center md:self-start bg-[#A1FFCE]/8 border border-[#A1FFCE]/20 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full w-fit gradient-text-secondary">
            <span className="w-1.5 h-1.5 rounded-full bg-[#A1FFCE] animate-pulse" />
            New Season Drop
          </span>

          <h2 className="text-4xl md:text-6xl font-black leading-[0.95] tracking-tight text-white">
            BUILT FOR
            <br />
            <span className="gradient-text-secondary">THE BOLD.</span>
          </h2>

          <p className="text-white/50 text-sm md:text-base leading-relaxed max-w-md mx-auto md:mx-0">
            Every pair tells a story. Engineered for performance, designed for the streets — our latest collection pushes the boundaries of modern footwear.
          </p>

          {/* Stats row */}
          <div className="flex justify-center md:justify-start gap-8 py-4 border-t border-b border-[#83A4D4]/10">
            <div>
              <p className="text-2xl font-black gradient-text-primary">200+</p>
              <p className="text-white/40 text-xs uppercase tracking-wider mt-0.5">New Styles</p>
            </div>
            <div className="w-px bg-[#83A4D4]/15" />
            <div>
              <p className="text-2xl font-black gradient-text-secondary">4.9★</p>
              <p className="text-white/40 text-xs uppercase tracking-wider mt-0.5">Avg Rating</p>
            </div>
            <div className="w-px bg-[#83A4D4]/15" />
            <div>
              <p className="text-2xl font-black gradient-text-primary">Free</p>
              <p className="text-white/40 text-xs uppercase tracking-wider mt-0.5">Shipping</p>
            </div>
          </div>

          <div className="flex gap-3 justify-center md:justify-start">
            <Link
              to="/products"
              className="gradient-secondary text-[#080808] text-xs font-bold uppercase tracking-widest px-7 py-3.5 rounded-full hover:opacity-90 transition-opacity"
            >
              Explore Collection
            </Link>
            <Link
              to="/sale"
              className="border border-[#83A4D4]/20 hover:border-[#B6FBFF]/40 text-white/60 hover:text-white text-xs font-bold uppercase tracking-widest px-7 py-3.5 rounded-full transition-colors duration-200"
            >
              View Sale
            </Link>
          </div>
        </motion.div>

        {/* Right — Floating Shoe Image */}
        <div className="relative flex items-center justify-center">
          {/* Glow ring */}
          <div className="absolute w-[340px] h-[340px] md:w-[460px] md:h-[460px] rounded-full bg-[#A1FFCE]/6 blur-3xl" />

          <motion.img
            src="/shoes2.png"
            alt="Featured Shoe"
            animate={{ y: [0, -18, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-10 w-[300px] h-[300px] md:w-[480px] md:h-[480px] object-contain drop-shadow-2xl"
          />

          {/* Floating tag — top right */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="absolute top-6 right-4 md:right-0 bg-[#83A4D4]/8 backdrop-blur-md border border-[#83A4D4]/20 rounded-2xl px-4 py-3 text-right"
          >
            <p className="text-white text-sm font-bold">Limited Edition</p>
            <p className="gradient-text-primary text-xs mt-0.5">Only 50 pairs left</p>
          </motion.div>

          {/* Floating tag — bottom left */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="absolute bottom-6 left-4 md:left-0 bg-[#A1FFCE]/8 backdrop-blur-md border border-[#A1FFCE]/20 rounded-2xl px-4 py-3"
          >
            <p className="gradient-text-secondary text-xs font-bold uppercase tracking-wider">Premium Comfort</p>
            <p className="text-white/50 text-xs mt-0.5">Ortho-flex sole technology</p>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default Home2;
