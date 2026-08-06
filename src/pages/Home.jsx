import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiArrowRight, FiTruck, FiRefreshCw, FiShield } from "react-icons/fi";

const features = [
  { icon: <FiTruck size={26} />, title: "Free Shipping", desc: "On all orders above ₹999" },
  { icon: <FiRefreshCw size={26} />, title: "Easy Returns", desc: "7-day hassle-free returns" },
  { icon: <FiShield size={26} />, title: "Secure Payment", desc: "100% protected checkout" },
];

const Home = () => {
  return (
    <div className="bg-dark text-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl" />

        <div className="relative z-10 text-center px-6 max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="uppercase tracking-[0.3em] text-white/50 text-sm mb-4"
          >
            New Season Collection
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl md:text-7xl font-black leading-tight mb-6"
          >
            STEP INTO <br /> YOUR STRIDE
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="text-white/60 text-lg max-w-xl mx-auto mb-10"
          >
            Premium sneakers crafted for comfort, built for style. Discover
            your perfect pair today.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-semibold hover:scale-105 hover:gap-4 transition-all duration-300"
            >
              Shop Collection <FiArrowRight />
            </Link>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2"
        >
          <div className="w-1 h-2 bg-white/50 rounded-full" />
        </motion.div>
      </section>

      <section className="border-y border-white/10 py-10">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-4"
            >
              <div className="text-white">{f.icon}</div>
              <div>
                <h3 className="font-semibold">{f.title}</h3>
                <p className="text-white/50 text-sm">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="uppercase tracking-[0.3em] text-white/50 text-sm mb-2">
            Handpicked
          </p>
          <h2 className="text-4xl font-bold">Featured Sneakers</h2>
        </motion.div>

        <div className="text-center text-white/40">
          Featured products will load here from the backend (next step)
        </div>
      </section>
    </div>
  );
};

export default Home;