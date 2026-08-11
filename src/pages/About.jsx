import { motion } from "framer-motion";
import { FiTarget, FiHeart, FiAward } from "react-icons/fi";

const values = [
  { icon: <FiTarget size={22} />, title: "Our Mission", desc: "To bring premium, comfortable footwear to every step you take, without compromising on style." },
  { icon: <FiHeart size={22} />, title: "Crafted with Care", desc: "Every pair is carefully selected from trusted brands known for quality and durability." },
  { icon: <FiAward size={22} />, title: "Trusted Quality", desc: "We partner only with authentic, verified brands so you always get what you pay for." },
];

const About = () => {
  return (
    <div className="bg-dark text-white min-h-screen pt-32 pb-20">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <p className="uppercase tracking-[0.4em] gradient-text-primary text-xs mb-2 font-medium">Our Story</p>
          <h1 className="text-5xl font-bold mb-6">About Next Trend</h1>
          <p className="text-white/50 max-w-2xl mx-auto leading-relaxed">
            Next Trend was born from a simple idea — footwear should feel as good as it looks. We curate premium sneakers from the world's best brands, delivering comfort, quality, and style straight to your doorstep.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((v, i) => (
            <motion.div key={v.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="glass-card rounded-2xl p-8 hover:border-[#83A4D4]/20 transition-colors shadow-lg shadow-black/30">
              <div className={`mb-4 w-11 h-11 rounded-xl flex items-center justify-center ${i % 2 === 0 ? "bg-[#83A4D4]/10 border border-[#83A4D4]/15 text-[#B6FBFF]" : "bg-[#A1FFCE]/10 border border-[#A1FFCE]/15 text-[#A1FFCE]"}`}>
                {v.icon}
              </div>
              <h3 className="font-semibold text-lg mb-2 text-white">{v.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Journey Timeline */}
        <div className="mt-24">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <p className="uppercase tracking-[0.4em] gradient-text-secondary text-xs mb-2 font-medium">Our Journey</p>
            <h2 className="text-4xl font-bold">How We Started</h2>
          </motion.div>

          <div className="space-y-8 max-w-2xl mx-auto">
            {[
              { year: "2020", title: "The Beginning", desc: "Started as a small sneaker resale operation from a single storefront." },
              { year: "2022", title: "Going Digital", desc: "Launched our online store, bringing premium sneakers to customers nationwide." },
              { year: "2024", title: "Expanding Brands", desc: "Partnered with 8+ top global brands to offer an even wider curated collection." },
              { year: "2026", title: "Today", desc: "Serving 50,000+ happy customers with fast delivery and secure checkout." },
            ].map((item, i) => (
              <motion.div key={item.year} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-20 text-right">
                  <span className={`text-xl font-black ${i % 2 === 0 ? "gradient-text-primary" : "gradient-text-secondary"} opacity-60`}>{item.year}</span>
                </div>
                <div className={`flex-shrink-0 w-3 h-3 rounded-full mt-2 ${i % 2 === 0 ? "bg-[#83A4D4]" : "bg-[#A1FFCE]"}`}
                  style={{ boxShadow: i % 2 === 0 ? "0 0 12px rgba(131,164,212,0.5)" : "0 0 12px rgba(161,255,206,0.5)" }} />
                <div className="flex-1 pb-2">
                  <h3 className="font-semibold text-lg mb-1 text-white">{item.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Team */}
          <div className="mt-24">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
              <p className="uppercase tracking-[0.4em] gradient-text-primary text-xs mb-2 font-medium">Meet The Team</p>
              <h2 className="text-4xl font-bold">The People Behind Next Trend</h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { name: "Deepak Bhankher", role: "Founder & CEO" },
                { name: "Ananya Rao", role: "Head of Design" },
                { name: "Rohan Verma", role: "Operations Lead" },
                { name: "Simran Kaur", role: "Customer Success" },
              ].map((member, i) => (
                <motion.div key={member.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="text-center">
                  <div className={`w-24 h-24 rounded-full glass-card mx-auto mb-4 flex items-center justify-center text-2xl font-black ${i % 2 === 0 ? "border-[#83A4D4]/20 gradient-text-primary" : "border-[#A1FFCE]/20 gradient-text-secondary"}`}>
                    {member.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <h3 className="font-semibold mb-1 text-white">{member.name}</h3>
                  <p className="text-white/30 text-sm">{member.role}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20 py-10 mt-10 border-y border-[#83A4D4]/8">
        {[
          { number: "2020", label: "Founded" },
          { number: "500+", label: "Products" },
          { number: "50K+", label: "Customers" },
          { number: "8", label: "Top Brands" },
        ].map((stat, i) => (
          <div key={stat.label} className="text-center">
            <p className={`text-3xl md:text-4xl font-black mb-1 ${i % 2 === 0 ? "gradient-text-primary" : "gradient-text-secondary"}`}>
              {stat.number}
            </p>
            <p className="text-white/30 text-xs uppercase tracking-widest">{stat.label}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default About;
