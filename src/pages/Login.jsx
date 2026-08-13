import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { login, googleLogin } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const googleBtnRef = useRef(null);

  useEffect(() => {
    if (window.google && googleBtnRef.current) {
      window.google.accounts.id.initialize({
        client_id: "585398841342-iqn8m6gu2hm42radqce7bbjn7u61hpov.apps.googleusercontent.com",
        callback: async (response) => {
          try { await googleLogin(response.credential); toast.success("Welcome back!"); navigate("/"); }
          catch { toast.error("Google login failed"); }
        },
      });
      window.google.accounts.id.renderButton(googleBtnRef.current, { theme: "outline", size: "large", width: 340, shape: "rectangular" });
    }
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try { await login(form.email, form.password); toast.success("Welcome back!"); navigate("/"); }
    catch (error) { toast.error(error.response?.data?.message || "Login failed"); }
    finally { setLoading(false); }
  };

  return (
    <div className="bg-dark text-white min-h-screen flex items-center justify-center px-6 py-24 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-[#83A4D4]/6 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-[#A1FFCE]/5 rounded-full blur-[120px] pointer-events-none" />
      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[18vw] font-black text-white/[0.025] whitespace-nowrap select-none pointer-events-none">
        STRIDE
      </span>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-card w-full max-w-sm rounded-2xl p-8 relative z-10"
      >
        <p className="uppercase tracking-[0.3em] text-white/40 text-xs mb-2 text-center">Welcome Back</p>
        <h1 className="text-2xl font-bold mb-1 text-center gradient-text-primary">Login</h1>
        <p className="text-white/40 text-sm mb-8 text-center">Sign in to Next Trend</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25" size={16} />
            <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email address" required
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3 outline-none focus:border-[#83A4D4]/50 transition-colors placeholder:text-white/25 text-sm" />
          </div>
          <div className="relative">
            <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25" size={16} />
            <input type={showPassword ? "text" : "password"} name="password" value={form.password} onChange={handleChange} placeholder="Password" required
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-11 py-3 outline-none focus:border-[#83A4D4]/50 transition-colors placeholder:text-white/25 text-sm" />
            <button type="button" onClick={() => setShowPassword((p) => !p)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors">
              {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
            </button>
          </div>
          <button type="submit" disabled={loading}
            className="w-full flex items-center justify-center gap-2 gradient-primary text-[#080808] py-3 rounded-xl font-bold text-sm hover:scale-[1.02] transition-transform disabled:opacity-40 disabled:hover:scale-100">
            {loading ? "Logging in..." : <> Login <FiArrowRight size={16} /> </>}
          </button>
        </form>

        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-white/30 text-xs uppercase tracking-wide">or</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        <div className="flex justify-center">
          <div ref={googleBtnRef} />
        </div>

        <p className="text-center text-white/40 text-sm mt-6">
          Don't have an account?{" "}
          <Link to="/register" className="gradient-text-primary font-medium hover:opacity-80 transition-opacity">Register</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
