import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiHome } from "react-icons/fi";

const NotFound = () => {
  return (
    <div className="bg-dark text-white min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-9xl font-black text-white/10 mb-4"
      >
        404
      </motion.h1>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-2xl font-bold mb-3"
      >
        Page Not Found
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-white/50 mb-8 max-w-md"
      >
        Looks like this page went for a walk and never came back. Let's get
        you back on track.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-white text-black px-8 py-3.5 rounded-full font-semibold hover:scale-105 transition-transform"
        >
          <FiHome /> Back to Home
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;