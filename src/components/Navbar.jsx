import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiShoppingCart, FiMenu, FiX, FiUser, FiSearch } from "react-icons/fi";
import { useCart } from "../context/CartContext";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Shop", path: "/products" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartCount } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-black/80 backdrop-blur-md shadow-lg py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="text-2xl font-black tracking-tight text-white">
              Next Trend<span className="text-white/50">.</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `relative text-sm font-medium tracking-wide uppercase text-white/80 hover:text-white transition-colors group ${
                    isActive ? "text-white" : ""
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.name}
                    <span
                      className={`absolute -bottom-1 left-0 h-[2px] bg-white transition-all duration-300 ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-5">
            <button className="text-white/80 hover:text-white transition-colors hidden sm:block">
              <FiSearch size={20} />
            </button>
            <Link
              to="/login"
              className="text-white/80 hover:text-white transition-colors hidden sm:block"
            >
              <FiUser size={20} />
            </Link>
            <Link to="/cart" className="relative text-white/80 hover:text-white transition-colors">
              <FiShoppingCart size={20} />
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 bg-white text-black text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center"
                >
                  {cartCount}
                </motion.span>
              )}
            </Link>

            <button
              className="md:hidden text-white"
              onClick={() => setMenuOpen(true)}
            >
              <FiMenu size={24} />
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-lg z-[60] flex flex-col"
          >
            <div className="flex justify-end p-6">
              <button onClick={() => setMenuOpen(false)} className="text-white">
                <FiX size={28} />
              </button>
            </div>
            <div className="flex flex-col items-center gap-8 mt-10">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <NavLink
                    to={link.path}
                    onClick={() => setMenuOpen(false)}
                    className="text-3xl font-bold text-white uppercase tracking-wide"
                  >
                    {link.name}
                  </NavLink>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;