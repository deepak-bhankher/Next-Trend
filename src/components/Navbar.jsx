import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { FiShoppingCart, FiMenu, FiX, FiUser, FiSearch, FiLogOut } from "react-icons/fi";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const navLinks = [
  { name: "MEN", path: "/men" },
  { name: "WOMEN", path: "/women" },
  { name: "KIDS", path: "/kids" },
  { name: "ABOUT US", path: "/about" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { cartCount } = useCart();
  const { user, logout } = useAuth();

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
      setSearchOpen(false);
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#080808]/95 backdrop-blur-md border-b border-[#83A4D4]/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-6">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0 group">
            <span className="text-xl font-black tracking-tight">
              <span className="gradient-text-primary">NEXT</span>
              <span className="text-white"> TREND</span>
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
                    isActive ? "gradient-text-primary" : "text-white/60 hover:text-white"
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
            {/* Search */}
            <form
              onSubmit={handleSearch}
              className={`hidden sm:flex items-center bg-[#83A4D4]/8 border border-[#83A4D4]/15 rounded-full overflow-hidden transition-all duration-300 ${
                searchOpen ? "w-52 px-4 py-2" : "w-10 h-10 justify-center"
              }`}
            >
              <button
                type={searchOpen ? "submit" : "button"}
                onClick={() => !searchOpen && setSearchOpen(true)}
                className="text-white/50 hover:text-[#B6FBFF] transition-colors flex-shrink-0"
              >
                <FiSearch size={17} />
              </button>
              {searchOpen && (
                <input
                  autoFocus
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onBlur={() => !searchQuery && setSearchOpen(false)}
                  placeholder="Search"
                  className="bg-transparent outline-none text-sm text-white ml-2 w-full placeholder:text-white/30"
                />
              )}
            </form>

            {/* User */}
            <Link
              to={user ? "/orders" : "/login"}
              className="text-white/50 hover:text-[#A1FFCE] transition-colors duration-200 hidden sm:block"
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

            {/* Hamburger */}
            <button
              className="md:hidden text-white/70 hover:text-[#B6FBFF] transition-colors"
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
            className="fixed inset-0 bg-[#080808] z-[60] flex flex-col overflow-y-auto"
          >
            <div className="flex justify-between items-center p-6 border-b border-[#83A4D4]/10">
              <span className="text-xl font-black">
                <span className="gradient-text-primary">NEXT</span>
                <span className="text-white"> TREND</span>
                <span className="gradient-text-secondary">.</span>
              </span>
              <button
                onClick={() => setMenuOpen(false)}
                className="text-white/60 hover:text-[#B6FBFF] transition-colors"
              >
                <FiX size={24} />
              </button>
            </div>

            <form
              onSubmit={handleSearch}
              className="flex items-center bg-[#83A4D4]/6 border border-[#83A4D4]/12 rounded-full mx-6 mt-6 px-4 py-3"
            >
              <FiSearch size={17} className="text-white/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products"
                className="bg-transparent outline-none text-sm text-white ml-3 w-full placeholder:text-white/30"
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
                        isActive ? "gradient-text-primary" : "text-white/80 hover:text-white"
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
            <div className="mt-10 pt-8 mx-6 border-t border-[#83A4D4]/10 flex flex-col items-center gap-6 pb-10">
              {user ? (
                <>
                  <Link
                    to="/orders"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2 text-white/70 hover:text-white text-lg font-medium"
                  >
                    <FiUser size={20} /> My Orders
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-white/70 hover:text-red-400 text-lg font-medium"
                  >
                    <FiLogOut size={20} /> Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 text-white/70 hover:text-white text-lg font-medium"
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