import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ShoeCard = ({ product }) => {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <Link to={`/products/${product._id}`}>
        <div className="relative bg-white/5 rounded-2xl overflow-hidden aspect-square mb-4 border border-white/10 group-hover:border-white/30 transition-colors">
          <img
            src={product.images?.[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {product.isFeatured && (
            <span className="absolute top-3 left-3 bg-white text-black text-[10px] font-bold uppercase px-3 py-1 rounded-full">
              Featured
            </span>
          )}
        </div>
        <div className="px-1">
          <p className="text-white/40 text-xs uppercase tracking-wide mb-1">
            {product.brand}
          </p>
          <h3 className="font-semibold text-white mb-1 truncate">
            {product.name}
          </h3>
          <p className="text-white font-bold">₹{product.price}</p>
        </div>
      </Link>
    </motion.div>
  );
};

export default ShoeCard;