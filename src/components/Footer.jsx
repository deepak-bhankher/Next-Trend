import { Link } from "react-router-dom";
import { FiInstagram, FiTwitter, FiFacebook, FiSend } from "react-icons/fi";

const Footer = () => {
  return (
  <footer className="bg-dark text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-black mb-3">
            STRIDE<span className="text-white/50">.</span>
          </h2>
          <p className="text-white/50 text-sm leading-relaxed">
            Premium sneakers crafted for comfort, built for style. Step into
            your stride with us.
          </p>
          <div className="flex gap-4 mt-5">
            <a
              href="#"
              className="text-white/60 hover:text-white transition-colors"
            >
              <FiInstagram size={18} />
            </a>
            <a
              href="#"
              className="text-white/60 hover:text-white transition-colors"
            >
              <FiTwitter size={18} />
            </a>
            <a
              href="#"
              className="text-white/60 hover:text-white transition-colors"
            >
              <FiFacebook size={18} />
            </a>
          </div>
        </div>

        {/* Shop Links */}
        <div>
          <h3 className="font-semibold mb-4 uppercase text-sm tracking-wide">
            Shop
          </h3>
          <ul className="space-y-3 text-white/50 text-sm">
            <li>
              <Link
                to="/products"
                className="hover:text-white transition-colors"
              >
                All Shoes
              </Link>
            </li>
            <li>
              <Link
                to="/products?category=Running"
                className="hover:text-white transition-colors"
              >
                Running
              </Link>
            </li>
            <li>
              <Link
                to="/products?category=Casual"
                className="hover:text-white transition-colors"
              >
                Casual
              </Link>
            </li>
            <li>
              <Link
                to="/products?category=Sports"
                className="hover:text-white transition-colors"
              >
                Sports
              </Link>
            </li>
          </ul>
        </div>

        {/* Company Links */}
        <div>
          <h3 className="font-semibold mb-4 uppercase text-sm tracking-wide">
            Company
          </h3>
          <ul className="space-y-3 text-white/50 text-sm">
            <li>
              <Link to="/about" className="hover:text-white transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:text-white transition-colors"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link to="/orders" className="hover:text-white transition-colors">
                My Orders
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="font-semibold mb-4 uppercase text-sm tracking-wide">
            Stay Updated
          </h3>
          <p className="text-white/50 text-sm mb-4">
            Subscribe for new drops & exclusive offers.
          </p>
          <div className="flex items-center bg-white/5 border border-white/10 rounded-full overflow-hidden pr-1">
            <input
              type="email"
              placeholder="Your email"
              className="bg-transparent px-4 py-2 text-sm outline-none flex-1 placeholder:text-white/30"
            />
            <button className="bg-white text-black p-2 rounded-full hover:scale-105 transition-transform">
              <FiSend size={14} />
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-6 text-center text-white/40 text-xs">
        © {new Date().getFullYear()} Stride. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
