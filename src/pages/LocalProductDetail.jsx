import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiShoppingBag, FiCheck, FiArrowLeft } from "react-icons/fi";
import { toast } from "react-toastify";
import { useCart } from "../context/CartContext";
import { menProducts, womenProducts, kidsProducts } from "../data/products";

const dataMap = {
  men: menProducts,
  women: womenProducts,
  kids: kidsProducts,
};

const LocalProductDetail = ({category}) => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState(null);

  const list = dataMap[category] || [];
  const product = list.find((p) => p.id === Number(id));

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }
    const success = addToCart({
      product: `${category}-${product.id}`,
      name: product.name,
      image: product.image,
      price: product.price,
      size: selectedSize,
      qty: 1,
    });
    if (success) {
      toast.success("Added to cart!");
    }
  };

  if (!product)
    return (
      <div className="bg-[var(--bg)] text-[var(--text)] min-h-screen flex items-center justify-center text-[var(--muted)]">
        Product not found.
      </div>
    );

  return (
    <div className="bg-[var(--bg)] text-[var(--text)] min-h-screen pt-32 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        <Link
          to={`/${category}`}
          className="inline-flex items-center gap-2 text-[var(--muted)] hover:text-[var(--text)] text-sm mb-8 transition-colors"
        >
          <FiArrowLeft size={16} /> Back to {category}
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-14">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="aspect-square bg-[var(--card-bg)] border border-[var(--border)] rounded-3xl overflow-hidden"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <p className="text-[var(--muted)] uppercase tracking-widest text-xs mb-2 font-medium">
              {product.brand}
            </p>
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
            <div className="flex items-center gap-3 mb-6">
              <p className="text-3xl font-black">
                ₹{product.price.toLocaleString()}
              </p>
              <p className="text-[var(--muted)] text-lg line-through">
                ₹{product.originalPrice.toLocaleString()}
              </p>
            </div>
            <p className="text-[var(--muted)] leading-relaxed mb-8">
              {product.description}
            </p>

            <div className="mb-8">
              <h3 className="text-xs font-semibold uppercase tracking-widest mb-3 text-[var(--muted)]">
                Select Size
              </h3>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 rounded-full font-medium transition-all ${selectedSize === size ? "bg-[var(--text)] text-[var(--bg)] font-bold" : "border border-[var(--border)] text-[var(--muted)] hover:border-[var(--muted)]"}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 mb-8 text-sm">
              <FiCheck className="text-green-400" />
              <span className="text-[var(--muted)]">In Stock</span>
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full flex items-center justify-center gap-2 gradient-primary text-[#080808] py-4 rounded-full font-bold hover:scale-[1.02] transition-transform"
            >
              <FiShoppingBag /> Add to Cart
            </button>
          </motion.div>
        </div>
      </div>
      {list.filter((p) => p.id !== product.id).length > 0 && (
        <div className="mt-24 max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold mb-8 text-[var(--text)]">
            You Might Also Like
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {list
              .filter((p) => p.id !== product.id)
              .slice(0, 8)
              .map((item) => (
                <Link
                  key={item.id}
                  to={`/${category}/${item.id}`}
                  className="group"
                >
                  <div className="aspect-square bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl overflow-hidden mb-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <p className="text-[var(--muted)] text-xs uppercase tracking-wide mb-1">
                    {item.brand}
                  </p>
                  <h3 className="font-semibold text-sm text-[var(--text)] truncate">
                    {item.name}
                  </h3>
                  <p className="font-bold text-[var(--text)]">
                    ₹{item.price.toLocaleString()}
                  </p>
                </Link>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LocalProductDetail;
