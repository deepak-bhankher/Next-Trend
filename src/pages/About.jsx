import { motion } from "framer-motion";
import { FiTarget, FiHeart, FiAward } from "react-icons/fi";

const values = [
  {
    icon: <FiTarget size={24} />,
    title: "Our Mission",
    desc: "To bring premium, comfortable footwear to every step you take, without compromising on style.",
  },
  {
    icon: <FiHeart size={24} />,
    title: "Crafted with Care",
    desc: "Every pair is carefully selected from trusted brands known for quality and durability.",
  },
  {
    icon: <FiAward size={24} />,
    title: "Trusted Quality",
    desc: "We partner only with authentic, verified brands so you always get what you pay for.",
  },
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
            Stride was born from a simple idea — footwear should feel as good as
            it looks. We curate premium sneakers from the world's best brands,
            delivering comfort, quality, and style straight to your doorstep.
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
        {/* Journey Timeline */}
        <div className="mt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <p className="uppercase tracking-[0.3em] text-white/50 text-sm mb-2">
              Our Journey
            </p>
            <h2 className="text-4xl font-bold">How We Started</h2>
          </motion.div>

          <div className="space-y-8 max-w-2xl mx-auto">
            {[
              {
                year: "2020",
                title: "The Beginning",
                desc: "Started as a small sneaker resale operation from a single storefront.",
              },
              {
                year: "2022",
                title: "Going Digital",
                desc: "Launched our online store, bringing premium sneakers to customers nationwide.",
              },
              {
                year: "2024",
                title: "Expanding Brands",
                desc: "Partnered with 8+ top global brands to offer an even wider curated collection.",
              },
              {
                year: "2026",
                title: "Today",
                desc: "Serving 50,000+ happy customers with fast delivery and secure checkout.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-6 items-start"
              >
                <div className="flex-shrink-0 w-20 text-right">
                  <span className="text-xl font-black text-white/40">
                    {item.year}
                  </span>
                </div>
                <div className="flex-shrink-0 w-3 h-3 rounded-full bg-white mt-2" />
                <div className="flex-1 pb-2">
                  <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Team Section */}
          <div className="mt-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <p className="uppercase tracking-[0.3em] text-white/50 text-sm mb-2">
                Meet The Team
              </p>
              <h2 className="text-4xl font-bold">The People Behind Stride</h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { name: "Deepak Bhankher", role: "Founder & CEO" },
                { name: "Ananya Rao", role: "Head of Design" },
                { name: "Rohan Verma", role: "Operations Lead" },
                { name: "Simran Kaur", role: "Customer Success" },
              ].map((member, i) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center"
                >
                  <div className="w-24 h-24 rounded-full bg-white/5 border border-white/10 mx-auto mb-4 flex items-center justify-center text-2xl font-bold text-white/30">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <h3 className="font-semibold mb-1">{member.name}</h3>
                  <p className="text-white/40 text-sm">{member.role}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20 py-10 mt-10 border-y border-white/10"
      >
        {[
          { number: "2020", label: "Founded" },
          { number: "500+", label: "Products" },
          { number: "50K+", label: "Customers" },
          { number: "8", label: "Top Brands" },
        ].map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="text-3xl md:text-4xl font-black mb-1">
              {stat.number}
            </p>
            <p className="text-white/50 text-xs uppercase tracking-wide">
              {stat.label}
            </p>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default About;
