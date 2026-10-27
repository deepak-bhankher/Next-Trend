import { useState } from "react";
import { Link, NavLink, Outlet, Navigate, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiGrid,
  FiShoppingBag,
  FiSliders,
  FiExternalLink,
  FiLogOut,
  FiMenu,
  FiX,
  FiSun,
  FiMoon,
  FiShield,
  FiUser,
  FiHeart,
  FiSmile,
} from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { toast } from "react-toastify";

const navSections = [
  { name: "Dashboard", path: "/admin", icon: FiGrid, exact: true },
  { name: "Orders", path: "/admin/orders", icon: FiShoppingBag },
];

const categorySections = [
  { name: "Men's Shoes", path: "/admin/category/men", icon: FiUser },
  { name: "Women's Shoes", path: "/admin/category/women", icon: FiHeart },
  { name: "Kids' Shoes", path: "/admin/category/kids", icon: FiSmile },
];

const AdminLayout = () => {
  const { user, loading: authLoading, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out from Admin");
    navigate("/login");
  };

  if (authLoading) {
    return (
      <div className="bg-[var(--bg)] text-[var(--text)] min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-[#83A4D4] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-[var(--muted)]">Loading Admin Workspace...</p>
        </div>
      </div>
    );
  }

  if (!user || !user.isAdmin) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="bg-[var(--bg)] text-[var(--text)] min-h-screen flex">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-[var(--nav-bg)] border-r border-[var(--border)] flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="overflow-y-auto custom-scrollbar">
          {/* Logo & Header */}
          <div className="h-20 px-6 border-b border-[var(--border)] flex items-center justify-between">
            <Link to="/admin" className="flex items-center gap-2">
              <span className="text-xl font-black tracking-tight">
                <span className="gradient-text-primary">NEXT</span>
                <span className="text-[var(--text)]"> TREND</span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/30">
                Admin
              </span>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-[var(--muted)] hover:text-[var(--text)]"
            >
              <FiX size={20} />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="p-4 space-y-6">
            {/* Main Tabs */}
            <div className="space-y-1">
              <p className="px-3 pb-2 text-[11px] font-bold uppercase tracking-widest text-[var(--muted)]">
                General
              </p>
              {navSections.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.exact}
                    onClick={() => setSidebarOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                        isActive
                          ? "gradient-primary text-[#080808] font-bold shadow-md shadow-[#83A4D4]/20 scale-[1.02]"
                          : "text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--card-bg)]"
                      }`
                    }
                  >
                    <Icon size={18} />
                    <span>{item.name}</span>
                  </NavLink>
                );
              })}
            </div>

            {/* Categories */}
            <div className="space-y-1">
              <p className="px-3 pb-2 text-[11px] font-bold uppercase tracking-widest text-[var(--muted)]">
                Shoe Collections
              </p>
              {categorySections.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                        isActive
                          ? "gradient-primary text-[#080808] font-bold shadow-md shadow-[#83A4D4]/20 scale-[1.02]"
                          : "text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--card-bg)]"
                      }`
                    }
                  >
                    <Icon size={18} />
                    <span>{item.name}</span>
                  </NavLink>
                );
              })}
            </div>

            {/* Store Customizer */}
            <div className="space-y-1">
              <p className="px-3 pb-2 text-[11px] font-bold uppercase tracking-widest text-[var(--muted)]">
                Store Customizer
              </p>
              <NavLink
                to="/admin/website"
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? "gradient-primary text-[#080808] font-bold shadow-md shadow-[#83A4D4]/20 scale-[1.02]"
                      : "text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--card-bg)]"
                  }`
                }
              >
                <FiSliders size={18} />
                <span>Website Sections</span>
              </NavLink>
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-[var(--border)] space-y-2 bg-[var(--nav-bg)]">
          <Link
            to="/"
            target="_blank"
            className="flex items-center justify-between px-4 py-2 rounded-xl text-xs font-semibold text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--card-bg)] transition-colors"
          >
            <span className="flex items-center gap-2">
              <FiExternalLink size={15} /> View Live Store
            </span>
            <span className="text-[10px] opacity-60">↗</span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-4 py-2 rounded-xl text-xs font-semibold text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <FiLogOut size={16} /> Logout
          </button>

          {/* Admin User Badge */}
          <div className="pt-2 px-3 flex items-center gap-2.5 text-xs text-[var(--muted)]">
            <div className="w-7 h-7 rounded-full bg-[#83A4D4]/20 border border-[#83A4D4]/40 flex items-center justify-center text-[#83A4D4]">
              <FiShield size={14} />
            </div>
            <div className="truncate">
              <p className="font-semibold text-[var(--text)] truncate">{user.name}</p>
              <p className="text-[10px] truncate">{user.email}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-72">
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 h-16 bg-[var(--nav-bg)] backdrop-blur-md border-b border-[var(--border)] px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--card-bg)]"
              aria-label="Open sidebar"
            >
              <FiMenu size={22} />
            </button>
            <span className="text-sm font-semibold text-[var(--muted)]">
              Store Control Hub
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full border border-[var(--border)] bg-[var(--card-bg)] text-[var(--muted)] hover:text-[var(--text)] transition-colors"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? <FiSun size={17} /> : <FiMoon size={17} />}
            </button>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
