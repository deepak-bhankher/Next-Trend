import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FiInstagram,
  FiTwitter,
  FiFacebook,
  FiSend,
  FiMail,
  FiPhone,
  FiMapPin,
  FiShield,
  FiTruck,
  FiRefreshCw,
  FiLock,
  FiArrowUpRight,
  FiCheck,
} from "react-icons/fi";
import { toast } from "react-toastify";
import api from "../utils/api";
import { getImageUrl } from "../utils/imageUrl";

const trustBadges = [
  {
    icon: FiShield,
    title: "100% Authentic Guaranteed",
    desc: "Every pair verified by sneaker specialists",
    boxClass: "bg-sky-500/10 border-sky-500/25 text-sky-600 dark:text-[#83A4D4]",
  },
  {
    icon: FiTruck,
    title: "Insured Express Dispatch",
    desc: "Fast pan-India delivery with real-time tracking",
    boxClass: "bg-blue-500/10 border-blue-500/25 text-blue-600 dark:text-blue-400",
  },
  {
    icon: FiRefreshCw,
    title: "7-Day Hassle-Free Returns",
    desc: "Instant size exchanges and simple returns",
    boxClass: "bg-emerald-500/10 border-emerald-500/25 text-emerald-700 dark:text-emerald-400",
  },
  {
    icon: FiLock,
    title: "Secure Encrypted Checkout",
    desc: "UPI, Cards, Netbanking & Cash on Delivery",
    boxClass: "bg-amber-500/10 border-amber-500/25 text-amber-700 dark:text-amber-400",
  },
];

const Footer = () => {
  const [gmailSubject, setGmailSubject] = useState("");
  const [gmailMessage, setGmailMessage] = useState("");
  const [navLinks, setNavLinks] = useState([
    { name: "MEN", path: "/men" },
    { name: "WOMEN", path: "/women" },
    { name: "KIDS", path: "/kids" },
    { name: "ABOUT US", path: "/about" },
  ]);
  const [footer, setFooter] = useState({
    description:
      "Next Trend is India's premier destination for authenticated luxury sneakers, high-heat retro silhouettes, and contemporary streetwear footwear.",
    email: "support@nexttrend.com",
    phone: "+91 98765 43210",
    address: "123 Sneaker Boulevard, Fashion District, New Delhi, India",
    copyright: `© ${new Date().getFullYear()} Next Trend Inc. All rights reserved.`,
  });

  useEffect(() => {
    const fetchFooter = async () => {
      try {
        const { data } = await api.get("/settings");
        if (data) {
          if (data.footer) {
            setFooter((prev) => ({ ...prev, ...data.footer }));
          }
          if (data.navbar && data.navbar.links && data.navbar.links.length > 0) {
            setNavLinks(data.navbar.links);
          }
        }
      } catch (err) {
        // fallback
      }
    };
    fetchFooter();
  }, []);

  const handleSendGmail = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(gmailSubject.trim() || "Inquiry - Next Trend Shoes");
    const body = encodeURIComponent(
      gmailMessage.trim() || "Hello Next Trend Support Team,\n\nI have an inquiry regarding your sneaker collection."
    );
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
      footer.email
    )}&su=${subject}&body=${body}`;

    const win = window.open(gmailUrl, "_blank");
    if (!win) {
      window.location.href = `mailto:${footer.email}?subject=${subject}&body=${body}`;
    }
  };

  return (
    <footer className="bg-[var(--bg)] text-[var(--text)] border-t border-[var(--border)] overflow-hidden">
      {/* 1. Trust & Authenticity Guarantee Strip */}
      <div className="border-b border-[var(--border)] bg-[var(--card-bg)]/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustBadges.map((badge, idx) => {
              const Icon = badge.icon;
              return (
                <div
                  key={idx}
                  className="flex items-start gap-3.5 p-3 rounded-2xl hover:bg-[var(--card-bg)] transition-colors"
                >
                  <div
                    className={`p-2.5 rounded-xl border flex-shrink-0 ${badge.boxClass}`}
                  >
                    <Icon size={20} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text)]">
                      {badge.title}
                    </h4>
                    <p className="text-[11px] text-[var(--muted)] mt-0.5 leading-relaxed">
                      {badge.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. Main Footer Body */}
      <div className="max-w-7xl mx-auto px-6 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Brand & Identity Column (5 cols on md) */}
          <div className="md:col-span-5 space-y-5">
            <Link to="/" className="inline-flex items-center gap-3 group">
              <img
                src={getImageUrl("/nt-logo.png")}
                alt="Next Trend"
                className="h-10 w-auto object-contain transition-transform group-hover:scale-105"
                onError={(e) => {
                  e.currentTarget.src = "/logo.svg";
                }}
              />
              <span className="text-lg font-black tracking-tight">
                <span className="gradient-text-primary">NEXT</span>
                <span className="text-[var(--text)]"> TREND</span>
                <span className="gradient-text-secondary">.</span>
              </span>
            </Link>

            <p className="text-[var(--muted)] text-xs sm:text-sm leading-relaxed max-w-sm">
              {footer.description}
            </p>

            {/* Direct Contact Details */}
            <div className="space-y-2 text-xs text-[var(--muted)] pt-1">
              <a
                href={`mailto:${footer.email}`}
                className="flex items-center gap-2.5 hover:text-[#00F0FF] transition-colors"
              >
                <FiMail size={14} className="text-[#83A4D4] flex-shrink-0" />
                <span>{footer.email}</span>
              </a>
              <a
                href={`tel:${footer.phone}`}
                className="flex items-center gap-2.5 hover:text-[#00F0FF] transition-colors"
              >
                <FiPhone size={14} className="text-[#83A4D4] flex-shrink-0" />
                <span>{footer.phone}</span>
              </a>
              <p className="flex items-start gap-2.5">
                <FiMapPin size={14} className="text-[#83A4D4] flex-shrink-0 mt-0.5" />
                <span>{footer.address}</span>
              </p>
            </div>

            {/* Social Links with Subtle Neon Glow */}
            <div className="flex gap-2.5 pt-2">
              {[
                { icon: FiInstagram, href: footer.instagram || "https://instagram.com", label: "Instagram" },
                { icon: FiTwitter, href: footer.twitter || "https://twitter.com", label: "Twitter" },
                { icon: FiFacebook, href: footer.facebook || "https://facebook.com", label: "Facebook" },
              ].map((social, i) => {
                const Icon = social.icon;
                return (
                  <a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    className="w-9 h-9 rounded-xl bg-[var(--card-bg)] border border-[var(--border)] flex items-center justify-center text-[var(--muted)] hover:text-[#00F0FF] hover:border-[#00F0FF]/40 hover:scale-105 transition-all"
                  >
                    <Icon size={15} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Dynamic Collections Column - Synced with Navbar Components (3 cols on md) */}
          <div className="md:col-span-3 space-y-4">
            <h3 className="font-bold uppercase text-xs tracking-widest text-[var(--text)]">
              Collections
            </h3>
            <ul className="space-y-2.5 text-xs text-[var(--muted)]">
              {navLinks.map((link, idx) => (
                <li key={idx}>
                  <Link
                    to={link.path}
                    className="hover:text-[var(--text)] transition-colors flex items-center gap-1 group"
                  >
                    <span>{link.name}</span>
                    <FiArrowUpRight
                      size={12}
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-600 dark:text-[#83A4D4]"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Side: Direct Message to Gmail Card (4 cols on md) */}
          <div className="md:col-span-4 space-y-4">
            <div className="p-6 rounded-2xl bg-[var(--card-bg)] border border-[var(--border)] space-y-3.5 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-[#83A4D4]">
                <FiMail size={16} />
                <span>Message Next Trend</span>
              </div>
              <h3 className="font-bold text-sm text-[var(--text)]">
                Have a question? Send us a message on Gmail
              </h3>
              <p className="text-[11px] text-[var(--muted)] leading-relaxed">
                Koi bhi sawal ya enquiry ke liye neeche likhein aur seedha Gmail se message bhejein:
              </p>

              <form onSubmit={handleSendGmail} className="space-y-2.5">
                <input
                  type="text"
                  value={gmailSubject}
                  onChange={(e) => setGmailSubject(e.target.value)}
                  placeholder="Subject (e.g. Shoe Size / Order inquiry)"
                  className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-xl px-3 py-2 text-xs text-[var(--text)] placeholder:text-[var(--muted)] outline-none focus:border-[#83A4D4]/60 transition-colors"
                />
                <textarea
                  rows={2}
                  value={gmailMessage}
                  onChange={(e) => setGmailMessage(e.target.value)}
                  placeholder="Apna message yahan likhein..."
                  className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-xl px-3 py-2 text-xs text-[var(--text)] placeholder:text-[var(--muted)] outline-none focus:border-[#83A4D4]/60 transition-colors resize-none"
                />
                <button
                  type="submit"
                  className="w-full gradient-primary text-[#080808] font-bold text-xs py-2.5 px-4 rounded-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2 shadow-md shadow-[#83A4D4]/20"
                >
                  <FiSend size={13} /> Send via Gmail
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Bottom Copyright Bar */}
      <div className="border-t border-[var(--border)] py-5 text-center text-[var(--muted)] text-xs bg-[var(--card-bg)]/20">
        <p>{footer.copyright}</p>
      </div>
    </footer>
  );
};

export default Footer;
