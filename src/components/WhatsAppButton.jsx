import { useState, useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa6";
import api from "../utils/api";

const WhatsAppButton = () => {
  const [phone, setPhone] = useState("919053377725");
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const fetchPhone = async () => {
      try {
        const { data } = await api.get("/settings");
        if (data && data.footer) {
          const num = data.footer.whatsapp || data.footer.phone;
          if (num) {
            let digits = num.replace(/[^0-9]/g, "");
            if (digits.length === 10) digits = `91${digits}`;
            if (digits) setPhone(digits);
          }
        }
      } catch (err) {
        // fallback
      }
    };
    fetchPhone();
  }, []);

  const cleanDigits = phone.replace(/[^0-9]/g, "");
  const finalPhone = cleanDigits.length === 10 ? `91${cleanDigits}` : cleanDigits;
  const defaultMessage = "Hello Next Trend! I want to inquire about sneakers from your store.";
  const waUrl = `https://wa.me/${finalPhone}?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <aside
      aria-label="Contact options"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex items-center gap-2 group select-none"
    >
      {/* Tooltip Tag */}
      <span
        className={`hidden sm:inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold tracking-wide shadow-lg border border-[var(--border)] bg-[var(--card-bg)] text-[var(--text)] transition-all duration-300 pointer-events-none ${
          hovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"
        }`}
      >
        Chat on WhatsApp
      </span>

      {/* Floating Circular Action Button */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-label="Chat with Next Trend on WhatsApp"
        className="relative w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-xl shadow-[#25D366]/30 hover:shadow-2xl hover:shadow-[#25D366]/50 hover:scale-110 active:scale-95 transition-all duration-300"
      >
        {/* Pulsing Outer Ping Ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 animate-ping pointer-events-none" />
        
        {/* Glow backdrop */}
        <span className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#128C7E] to-[#25D366] opacity-90" />

        {/* WhatsApp Icon */}
        <FaWhatsapp size={22} className="relative z-10 text-white drop-shadow-sm sm:text-[26px]" />
      </a>
    </aside>
  );
};

export default WhatsAppButton;
