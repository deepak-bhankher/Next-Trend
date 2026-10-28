import { useState, useEffect } from "react";
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
  FiGrid,
} from "react-icons/fi";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import api from "../utils/api";
import { getImageUrl } from "../utils/imageUrl";

const defaultNavLinks = [
  { name: "MEN", path: "/men" },
  { name: "WOMEN", path: "/women" },
  { name: "KIDS", path: "/kids" },
  { name: "ABOUT US", path: "/about" },
];


const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [navSettings, setNavSettings] = useState({
    storeName: "",
    logoUrl: "",
    announcementText: "",
    links: defaultNavLinks,
  });
  const { cartCount } = useCart();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data } = await api.get("/settings");
        if (data && data.navbar) {
          setNavSettings({
            storeName: data.navbar.storeName !== undefined ? data.navbar.storeName : "",
            logoUrl: data.navbar.logoUrl || "",
            announcementText: data.navbar.announcementText || "",
            links:
              data.navbar.links && data.navbar.links.length > 0
                ? data.navbar.links
                : defaultNavLinks,
          });
        }
      } catch (err) {
        // Fallback default
      }
    };
    fetchSettings();
  }, []);

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

  const hasStoreName = Boolean(navSettings.storeName && navSettings.storeName.trim());
  const nameParts = hasStoreName ? navSettings.storeName.trim().split(" ") : [];
  const firstWord = nameParts[0] || "";
  const restOfName = nameParts.slice(1).join(" ");

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-[var(--nav-bg)] backdrop-blur-md border-b border-[var(--border)]">
        {navSettings.announcementText && (
          <div className="bg-gradient-to-r from-[#83a4d4]/10 via-[#a1ffce]/15 to-[#83a4d4]/10 border-b border-[var(--border)] py-1.5 px-4 text-center text-xs font-semibold tracking-wider text-[var(--text)] overflow-hidden">
            <span>{navSettings.announcementText}</span>
          </div>
        )}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 sm:py-4 flex items-center justify-between gap-3 sm:gap-6">
          {/* Logo / Brand */}
          <Link to="/" className="flex items-center gap-3 flex-shrink-0 group">
            {navSettings.logoUrl && (
              <img
                src={getImageUrl(navSettings.logoUrl)}
                alt={navSettings.storeName || "Next Trend Logo"}
                className="h-9 sm:h-10 max-h-11 w-auto max-w-[180px] object-contain rounded-lg transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            )}
            {hasStoreName ? (
              <span className="text-xl font-black tracking-tight">
                <span className="gradient-text-primary">{firstWord}</span>
                {restOfName && <span className="text-[var(--text)]"> {restOfName}</span>}
                <span className="gradient-text-secondary">.</span>
              </span>
            ) : !navSettings.logoUrl ? (
              <span className="text-xl font-black tracking-tight">
                <span className="gradient-text-primary">Next</span>
                <span className="text-[var(--text)]"> Trend</span>
                <span className="gradient-text-secondary">.</span>
              </span>
            ) : null}
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {(navSettings.links || defaultNavLinks).map((link, i) => (
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
          <div className="flex items-center gap-2.5 sm:gap-4">
            {/* Admin Badge & Logout (ONLY for Admin) */}
            {user?.isAdmin && (
              <>
                <Link
                  to="/admin"
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-amber-500/15 hover:bg-amber-500/25 text-amber-800 dark:text-amber-300 border border-amber-500/30 transition-all shadow-sm"
                >
                  <FiGrid size={12} />
                  <span>Admin</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-[var(--muted)] hover:text-red-400 transition-colors p-1.5 hidden sm:block"
                  title="Logout"
                >
                  <FiLogOut size={18} />
                </button>
              </>
            )}

            {/* Customer Icons (Cart & Orders) - Hidden for Admin */}
            {!user?.isAdmin && (
              <>
                {/* User / Orders */}
                <Link
                  to={user ? "/orders" : "/login"}
                  className="text-[var(--muted)] hover:text-[#A1FFCE] transition-colors duration-200 hidden sm:block p-1.5"
                  aria-label="Account"
                >
                  <FiUser size={20} />
                </Link>

                {/* Cart */}
                <Link to="/cart" className="relative p-1">
                  <div className="gradient-primary text-[#080808] p-2 rounded-full hover:scale-105 transition-transform shadow-md shadow-[#83A4D4]/20">
                    <FiShoppingCart size={16} />
                  </div>
                  {cartCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-0.5 -right-0.5 bg-[#A1FFCE] text-[#080808] text-[10px] font-black rounded-full w-4 h-4 flex items-center justify-center shadow"
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </Link>
              </>
            )}

            {/* Theme Toggle (Right after Cart icon, visible on both Mobile & Desktop) */}
            <button
              onClick={toggleTheme}
              className="text-[var(--muted)] hover:text-[#B6FBFF] transition-colors duration-200 p-1.5 flex items-center justify-center"
              aria-label="Toggle theme"
              title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {theme === "dark" ? <FiSun size={19} /> : <FiMoon size={19} />}
            </button>

            {/* Hamburger */}
            <button
              className="md:hidden text-[var(--muted)] hover:text-[#B6FBFF] transition-colors p-1"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
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
              <div className="flex items-center gap-2">
                {navSettings.logoUrl && (
                  <img
                    src={getImageUrl(navSettings.logoUrl)}
                    alt={navSettings.storeName}
                    className="h-7 max-w-[100px] object-contain rounded"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                )}
                <span className="text-xl font-black">
                  <span className="gradient-text-primary">{firstWord}</span>
                  {restOfName && <span className="text-[var(--text)]"> {restOfName}</span>}
                  <span className="gradient-text-secondary">.</span>
                </span>
              </div>
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
              {(navSettings.links || defaultNavLinks).map((link, i) => (
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
              
              {user ? (
                <>
                  {!user.isAdmin && (
                    <Link
                      to="/orders"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-2 text-[var(--muted)] hover:text-[var(--text)] text-lg font-medium"
                    >
                      <FiUser size={20} /> My Orders
                    </Link>
                  )}
                  {user.isAdmin && (
                    <Link
                      to="/admin"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-2 text-amber-700 dark:text-amber-400 text-lg font-semibold"
                    >
                      <FiGrid size={18} /> Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="flex items-center  gap-2 text-[var(--muted)] hover:text-red-400 text-lg font-medium"
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
