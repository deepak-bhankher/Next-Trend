import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiArrowRight, FiTruck, FiRefreshCw, FiShield } from "react-icons/fi";
import { useState, useEffect } from "react";
import api from "../utils/api";
import ShoeCard from "../components/ShoeCard";

const features = [
  {
    icon: <FiTruck size={26} />,
    title: "Free Shipping",
    desc: "On all orders above ₹999",
  },
  {
    icon: <FiRefreshCw size={26} />,
    title: "Easy Returns",
    desc: "7-day hassle-free returns",
  },
  {
    icon: <FiShield size={26} />,
    title: "Secure Payment",
    desc: "100% protected checkout",
  },
];

const Home = () => {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const { data } = await api.get("/products");
        setFeatured(data.filter((p) => p.isFeatured).slice(0, 4));
      } catch (error) {
        console.error("Error fetching featured products:", error);
      }
    };
    fetchFeatured();
  }, []);
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
            Premium sneakers crafted for comfort, built for style. Discover your
            perfect pair today.
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

      <section className="py-12 overflow-hidden border-b border-white/10">
        <div className="flex gap-16 animate-marquee whitespace-nowrap">
          {[
            "NIKE",
            "ADIDAS",
            "PUMA",
            "CONVERSE",
            "VANS",
            "NEW BALANCE",
            "ASICS",
            "HOKA",
            "NIKE",
            "ADIDAS",
            "PUMA",
            "CONVERSE",
            "VANS",
            "NEW BALANCE",
            "ASICS",
            "HOKA",
          ].map((brand, i) => (
            <span
              key={i}
              className="text-3xl font-black text-white/10 tracking-wider flex-shrink-0"
            >
              {brand}
            </span>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { number: "500+", label: "Premium Products" },
            { number: "50K+", label: "Happy Customers" },
            { number: "8", label: "Top Brands" },
            { number: "4.8★", label: "Average Rating" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <p className="text-4xl md:text-5xl font-black mb-2">
                {stat.number}
              </p>
              <p className="text-white/50 text-sm uppercase tracking-wide">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="uppercase tracking-[0.3em] text-white/50 text-sm mb-2">
            Testimonials
          </p>
          <h2 className="text-4xl font-bold">What Our Customers Say</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: "Rahul Sharma",
              role: "Verified Buyer",
              text: "Amazing quality and super fast delivery. The shoes fit perfectly and look even better in person!",
            },
            {
              name: "Priya Mehta",
              role: "Verified Buyer",
              text: "Best sneaker shopping experience I've had. Great collection and the checkout process was smooth.",
            },
            {
              name: "Arjun Singh",
              role: "Verified Buyer",
              text: "Loved the comfort and style. Will definitely be ordering more pairs from Next Trend soon!",
            },
          ].map((review, i) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-8"
            >
              <div className="flex gap-1 mb-4 text-white">
                {"★★★★★".split("").map((star, idx) => (
                  <span key={idx}>{star}</span>
                ))}
              </div>
              <p className="text-white/70 leading-relaxed mb-6">
                "{review.text}"
              </p>
              <div>
                <p className="font-semibold">{review.name}</p>
                <p className="text-white/40 text-sm">{review.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Newsletter Banner */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-white rounded-3xl px-8 md:px-16 py-16 text-center overflow-hidden"
        >
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-black/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-black/5 rounded-full blur-3xl" />

          <div className="relative z-10">
            <p className="uppercase tracking-[0.3em] text-black/40 text-sm mb-3">
              Limited Time
            </p>
            <h2 className="text-3xl md:text-5xl font-black text-black mb-4">
              Get 20% Off Your First Order
            </h2>
            <p className="text-black/60 max-w-lg mx-auto mb-8">
              Subscribe to our newsletter and unlock an exclusive discount on
              your first purchase. Plus, be the first to know about new drops.
            </p>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                placeholder="Enter your email"
                required
                className="flex-1 bg-black/5 border border-black/10 rounded-full px-5 py-3 outline-none focus:border-black/30 text-black placeholder:text-black/40"
              />
              <button
                type="submit"
                className="bg-black text-white px-8 py-3 rounded-full font-semibold hover:scale-105 transition-transform"
              >
                Subscribe
              </button>
            </form>
          </div>
        </motion.div>
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

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {featured.map((product, i) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <ShoeCard product={product} />
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
