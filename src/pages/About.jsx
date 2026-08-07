import { motion } from "framer-motion";
import { FiTarget, FiHeart, FiAward } from "react-icons/fi";

const values = [
  { icon: <FiTarget size={24} />, title: "Our Mission", desc: "To bring premium, comfortable footwear to every step you take, without compromising on style." },
  { icon: <FiHeart size={24} />, title: "Crafted with Care", desc: "Every pair is carefully selected from trusted brands known for quality and durability." },
  { icon: <FiAward size={24} />, title: "Trusted Quality", desc: "We partner only with authentic, verified brands so you always get what you pay for." },
];

const About = () => {
  return (
    <div className="bg-dark text-white min-h-screen pt-32 pb-20">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <p className="uppercase tracking-[0.3em] text-white/50 text-sm mb-2">
            Our Story
          </p>
          <h1 className="text-5xl font-bold mb-6">About Stride</h1>
          <p className="text-white/60 max-w-2xl mx-auto leading-relaxed">
            Stride was born from a simple idea — footwear should feel as good
            as it looks. We curate premium sneakers from the world's best
            brands, delivering comfort, quality, and style straight to your
            doorstep.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-8"
            >
              <div className="mb-4 text-white">{v.icon}</div>
              <h3 className="font-semibold text-lg mb-2">{v.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;