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
        client_id:
          "585398841342-iqn8m6gu2hm42radqce7bbjn7u61hpov.apps.googleusercontent.com",
        callback: async (response) => {
          try {
            await googleLogin(response.credential);
            toast.success("Welcome back!");
            navigate("/");
          } catch (error) {
            toast.error("Google login failed");
          }
        },
      });
      window.google.accounts.id.renderButton(googleBtnRef.current, {
        theme: "outline",
        size: "large",
        width: 380,
        shape: "rectangular",
      });
    }
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(form.email, form.password);
      toast.success("Welcome back!");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-dark text-white min-h-screen flex">
      {/* Left Branding Panel */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden items-center justify-center">
        <div className="absolute inset-0 bg-black" />
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-white/5 rounded-full blur-3xl" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 px-16 text-center"
        >
          <h2 className="text-5xl font-black mb-6 leading-tight">
            STRIDE<span className="text-white/40">.</span>
          </h2>
          <p className="text-white/50 text-lg max-w-sm mx-auto leading-relaxed">
            Step back into your world of premium sneakers, curated just for you.
          </p>
        </motion.div>
      </div>

      {/* Right Form Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <p className="uppercase tracking-[0.3em] text-white/40 text-xs mb-3">
            Welcome Back
          </p>
          <h1 className="text-4xl font-bold mb-2">Login </h1>
          <p className="text-white/50 mb-10">
            Enter your details to continue shopping
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <FiMail
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30"
                size={18}
              />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email address"
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 outline-none focus:border-white/40 focus:bg-white/[0.07] transition-colors placeholder:text-white/30"
              />
            </div>

            <div className="relative">
              <FiLock
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30"
                size={18}
              />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-12 py-3.5 outline-none focus:border-white/40 focus:bg-white/[0.07] transition-colors placeholder:text-white/30"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
              >
                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex cursor-pointer items-center justify-center gap-2 bg-white text-black py-3.5 rounded-xl font-semibold hover:scale-[1.02] transition-transform disabled:opacity-40 disabled:hover:scale-100 mt-2"
            >
              {loading ? (
                "Logging in..."
              ) : (
                <>
                  Login <FiArrowRight size={18} />
                </>
              )}
            </button>
          </form>
          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/15 to-white/15" />
            <span className="text-white/40 text-xs uppercase tracking-[0.2em] font-medium">
              Or continue with
            </span>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent via-white/15 to-white/15" />
          </div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex justify-center hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            <div ref={googleBtnRef} />
          </motion.div>
          <p className="text-center text-white/50 text-sm mt-8">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-white font-medium hover:underline"
            >
              Register
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
