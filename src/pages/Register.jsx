import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";

const Register = () => {
 const { register, googleLogin } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const googleBtnRef = useRef(null);

useEffect(() => {
  if (window.google && googleBtnRef.current) {
    window.google.accounts.id.initialize({
      client_id: "585398841342-iqn8m6gu2hm42radqce7bbjn7u61hpov.apps.googleusercontent.com",
      callback: async (response) => {
        try {
          await googleLogin(response.credential);
          toast.success("Account created!");
          navigate("/");
        } catch (error) {
          toast.error("Google sign up failed");
        }
      },
    });
    window.google.accounts.id.renderButton(googleBtnRef.current, {
      theme: "filled_black",
      size: "large",
      width: 400,
      shape: "pill",
      text: "signup_with",
    });
  }
}, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(form.name, form.email, form.password);
      toast.success("Account created!");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-dark text-white min-h-screen flex">
      {/* Left Branding Panel */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden items-center justify-center">
        <div className="absolute inset-0 bg-black" />
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-white/5 rounded-full blur-3xl" />

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
            Join thousands who've found their perfect stride. Premium
            sneakers, delivered to you.
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
            Get Started
          </p>
          <h1 className="text-4xl font-bold mb-2">Create Account</h1>
          <p className="text-white/50 mb-10">
            Join us and start your sneaker journey
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Full Name"
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 outline-none focus:border-white/40 focus:bg-white/[0.07] transition-colors placeholder:text-white/30"
              />
            </div>

            <div className="relative">
              <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
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
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
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
              className="w-full flex items-center justify-center gap-2 bg-white text-black py-3.5 rounded-xl font-semibold hover:scale-[1.02] transition-transform disabled:opacity-40 disabled:hover:scale-100 mt-2"
            >
              {loading ? "Creating account..." : (
                <>
                  Create Account <FiArrowRight size={18} />
                </>
              )}
            </button>
          </form>
          <div className="flex items-center gap-3 my-6">
  <div className="flex-1 h-px bg-white/10" />
  <span className="text-white/30 text-xs uppercase tracking-wide">or</span>
  <div className="flex-1 h-px bg-white/10" />
</div>

<div ref={googleBtnRef} className="flex justify-center" />

          <p className="text-center text-white/50 text-sm mt-8">
            Already have an account?{" "}
            <Link to="/login" className="text-white font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;