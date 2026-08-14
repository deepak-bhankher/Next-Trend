import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import {
  FiShoppingCart,
  FiMenu,
  FiX,
  FiUser,
  FiSearch,
  FiLogOut,
  FiSun,
  FiMoon,
} from "react-icons/fi";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

const navLinks = [
  { name: "MEN", path: "/men" },
  { name: "WOMEN", path: "/women" },
  { name: "KIDS", path: "/kids" },
  { name: "ABOUT US", path: "/about" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { cartCount } = useCart();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out successfully");
    setMenuOpen(false);
    navigate("/");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?keyword=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setMenuOpen(false);
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-[var(--nav-bg)] backdrop-blur-md border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0 group">
            <span className="text-xl font-black tracking-tight">
              <span className="gradient-text-primary">NEXT</span>
              <span className="text-[var(--text)]"> TREND</span>
              <span className="gradient-text-secondary">.</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, i) => (
              <NavLink
                key={link.name + i}
                to={link.path}
                className={({ isActive }) =>
                  `relative text-sm font-semibold tracking-widest uppercase transition-colors duration-200 group ${
                    isActive
                      ? "gradient-text-primary"
                      : "text-[var(--muted)] hover:text-[var(--text)]"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.name}
                    <span
                      className={`absolute -bottom-1 left-0 h-[2px] gradient-primary rounded-full transition-all duration-300 ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-4">
            {user?.isAdmin ? (
              <Link
                to="/admin/orders"
                className="text-yellow-400 hover:text-yellow-300 transition-colors duration-200 text-sm font-bold uppercase tracking-widest px-4 py-2 border border-yellow-400/30 rounded-full"
              >
                Admin
              </Link>
            ) : (
              <>
                {/* Theme Toggle */}
                <button
                  onClick={toggleTheme}
                  className="text-[var(--muted)] hover:text-[#B6FBFF] transition-colors duration-200 hidden sm:block"
                  aria-label="Toggle theme"
                >
                  {theme === "dark" ? <FiSun size={19} /> : <FiMoon size={19} />}
                </button>

                {/* User */}
                <Link
                  to={user ? "/orders" : "/login"}
                  className="text-[var(--muted)] hover:text-[#A1FFCE] transition-colors duration-200 hidden sm:block"
                >
                  <FiUser size={20} />
                </Link>

                {/* Cart */}
                <Link to="/cart" className="relative">
                  <div className="gradient-primary text-[#080808] p-2 rounded-full hover:opacity-90 transition-opacity">
                    <FiShoppingCart size={16} />
                  </div>
                  {cartCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 bg-[#A1FFCE] text-[#080808] text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center"
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </Link>
              </>
            )}

            {/* Hamburger */}
            <button
              className="md:hidden text-[var(--muted)] hover:text-[#B6FBFF] transition-colors"
              onClick={() => setMenuOpen(true)}
            >
              <FiMenu size={22} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 bg-[var(--bg)] z-[60] flex flex-col overflow-y-auto"
          >
            <div className="flex justify-between items-center p-6 border-b border-[var(--border)]">
              <span className="text-xl font-black">
                <span className="gradient-text-primary">NEXT</span>
                <span className="text-[var(--text)]"> TREND</span>
                <span className="gradient-text-secondary">.</span>
              </span>
              <button
                onClick={() => setMenuOpen(false)}
                className="text-[var(--muted)] hover:text-[#B6FBFF] transition-colors"
              >
                <FiX size={24} />
              </button>
            </div>

            <form
              onSubmit={handleSearch}
              className="flex items-center bg-[var(--card-bg)] border border-[var(--border)] rounded-full mx-6 mt-6 px-4 py-3"
            >
              <FiSearch size={17} className="text-[var(--muted)]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products"
                className="bg-transparent outline-none text-sm text-[var(--text)] ml-3 w-full placeholder:text-[var(--muted)]"
              />
            </form>

            <div className="flex flex-col items-center gap-8 mt-14">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name + i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  <NavLink
                    to={link.path}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      `relative text-2xl font-bold uppercase tracking-widest group ${
                        isActive
                          ? "gradient-text-primary"
                          : "text-[var(--muted)] hover:text-[var(--text)]"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {link.name}
                        <span
                          className={`absolute -bottom-1 left-0 h-[2px] gradient-primary rounded-full transition-all duration-300 ${
                            isActive ? "w-full" : "w-0 group-hover:w-full"
                          }`}
                        />
                      </>
                    )}
                  </NavLink>
                </motion.div>
              ))}
            </div>

            {/* Login / Orders / Logout */}
            <div className="mt-10 pt-8 mx-6 border-t border-[var(--border)] flex flex-col items-center gap-6 pb-10">
              {/* Theme Toggle in Mobile Menu */}
              <button
                onClick={toggleTheme}
                className="flex items-center gap-2 text-[var(--muted)] hover:text-[#B6FBFF] text-lg font-medium transition-colors"
              >
                {theme === "dark" ? <FiSun size={20} /> : <FiMoon size={20} />}
                {theme === "dark" ? "Light Mode" : "Dark Mode"}
              </button>
              {user ? (
                <>
                  <Link
                    to="/orders"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2 text-[var(--muted)] hover:text-[var(--text)] text-lg font-medium"
                  >
                    <FiUser size={20} /> My Orders
                  </Link>
                  {user?.isAdmin && (
                    <Link
                      to="/admin/orders"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-2 text-yellow-400 hover:text-yellow-300 text-lg font-medium"
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-[var(--muted)] hover:text-red-400 text-lg font-medium"
                  >
                    <FiLogOut size={20} /> Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 text-[var(--muted)] hover:text-[var(--text)] text-lg font-medium"
                >
                  <FiUser size={20} /> Login
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
