import { Link } from "react-router-dom";
import { FiInstagram, FiTwitter, FiFacebook, FiSend } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="bg-[var(--bg)] text-[var(--text)] border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-6 py-12 sm:py-16 grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10">
        <div className="col-span-2 md:col-span-1">
          <h2 className="text-2xl font-black mb-3">
            <span className="gradient-text-primary">NEXT</span>
            <span className="text-[var(--text)]"> TREND</span>
            <span className="gradient-text-secondary">.</span>
          </h2>
          <p className="text-[var(--muted)] text-sm leading-relaxed">
            Premium sneakers crafted for comfort, built for style. Step into your stride with us.
          </p>
          <div className="flex gap-3 mt-5">
            {[FiInstagram, FiTwitter, FiFacebook].map((Icon, i) => (
              <a key={i} href="#" className="w-9 h-9 glass-btn rounded-full flex items-center justify-center text-[var(--muted)] hover:text-[#B6FBFF] hover:border-[#83A4D4]/30 transition-all">
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-4 uppercase text-xs tracking-widest gradient-text-primary">Shop</h3>
          <ul className="space-y-3 text-[var(--muted)] text-sm">
            <li><Link to="/men" className="hover:text-[var(--text)] transition-colors">Mens</Link></li>
            <li><Link to="/women" className="hover:text-[var(--text)] transition-colors">Womens</Link></li>
            <li><Link to="/kids" className="hover:text-[var(--text)] transition-colors">Kids</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4 uppercase text-xs tracking-widest gradient-text-secondary">Company</h3>
          <ul className="space-y-3 text-[var(--muted)] text-sm">
            <li><Link to="/about" className="hover:text-[var(--text)] transition-colors">About Us</Link></li>
            <li><Link to="/orders" className="hover:text-[var(--text)] transition-colors">My Orders</Link></li>
            <li><Link to="/sale" className="hover:text-[var(--text)] transition-colors">Sale</Link></li>
          </ul>
        </div>

        <div className="col-span-2 md:col-span-1">
          <h3 className="font-semibold mb-4 uppercase text-xs tracking-widest gradient-text-primary">Stay Updated</h3>
          <p className="text-[var(--muted)] text-sm mb-4">Subscribe for new drops & exclusive offers.</p>
          <div className="flex items-center glass-btn rounded-full overflow-hidden pr-1">
            <input
              type="email"
              placeholder="Your email"
              className="bg-transparent px-4 py-2 text-sm outline-none flex-1 placeholder:text-[var(--muted)] text-[var(--text)] min-w-0"
            />
            <button className="gradient-primary cursor-pointer text-[#080808] p-2 rounded-full hover:opacity-90 transition-opacity flex-shrink-0">
              <FiSend size={14} />
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-[var(--border)] py-6 text-center text-[var(--muted)] text-xs">
        © {new Date().getFullYear()} Next Trend. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
