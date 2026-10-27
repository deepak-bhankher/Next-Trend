import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiShoppingBag, FiCheck, FiArrowLeft } from "react-icons/fi";
import { toast } from "react-toastify";
import { useCart } from "../context/CartContext";
import { menProducts, womenProducts, kidsProducts } from "../data/products";
import api from "../utils/api";
import { getImageUrl } from "../utils/imageUrl";

const dataMap = {
  men: menProducts,
  women: womenProducts,
  kids: kidsProducts,
};

const LocalProductDetail = ({ category }) => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState(null);

  const list = dataMap[category] || [];
  const [product, setProduct] = useState(() => {
    return list.find((p) => p.id === Number(id)) || null;
  });
  const [loading, setLoading] = useState(!product);

  useEffect(() => {
    const localMatch = list.find((p) => p.id === Number(id));
    if (localMatch) {
      setProduct(localMatch);
      setLoading(false);
      return;
    }

    // Try fetching from backend database if it's a dynamic product
    const fetchFromDb = async () => {
      try {
        const { data } = await api.get(`/products/${id}`);
        if (data) {
          setProduct({
            id: data._id,
            name: data.name,
            brand: data.brand,
            price: data.price,
            originalPrice: data.originalPrice || data.price,
            description: data.description,
            sizes: data.sizes || [6, 7, 8, 9, 10],
            image: data.images && data.images.length > 0 ? data.images[0] : "/men1.png",
          });
        }
      } catch (err) {
        console.error("Failed to load product detail from API", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFromDb();
  }, [id, category]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }
    const success = addToCart({
      product: `${product.id || id}`,
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

  if (loading) {
    return (
      <div className="bg-[var(--bg)] text-[var(--text)] min-h-screen flex items-center justify-center text-[var(--muted)]">
        <div className="w-8 h-8 border-3 border-[#83A4D4] border-t-transparent rounded-full animate-spin mr-3" />
        Loading shoe...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="bg-[var(--bg)] text-[var(--text)] min-h-screen flex flex-col items-center justify-center text-center px-6">
        <h2 className="text-xl font-bold mb-2">Product Not Found</h2>
        <p className="text-[var(--muted)] text-sm mb-6">
          The requested shoe could not be located in our catalog.
        </p>
        <Link
          to={`/${category}`}
          className="gradient-primary text-[#080808] px-6 py-2.5 rounded-full font-bold text-xs uppercase"
        >
          Back to {category}
        </Link>
      </div>
    );
  }

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
              src={getImageUrl(product.image)}
              alt={product.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = "/men1.png";
              }}
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
            <div className="flex items-center gap-3 mb-6 flex-wrap">
              <p className="text-3xl font-black">
                ₹{product.price?.toLocaleString()}
              </p>
              {product.originalPrice && product.originalPrice !== product.price && (
                <div className="flex items-center gap-2">
                  <p className="text-[var(--muted)] text-lg line-through">
                    ₹{product.originalPrice?.toLocaleString()}
                  </p>
                  {product.originalPrice > product.price && (
                    <span className="bg-green-500/20 text-green-400 border border-green-500/30 text-xs font-bold px-2.5 py-0.5 rounded-full">
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                    </span>
                  )}
                </div>
              )}
            </div>
            <p className="text-[var(--muted)] leading-relaxed mb-8">
              {product.description}
            </p>

            <div className="mb-8">
              <h3 className="text-xs font-semibold uppercase tracking-widest mb-3 text-[var(--muted)]">
                Select Size (UK)
              </h3>
              <div className="flex flex-wrap gap-3">
                {product.sizes?.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 rounded-full font-medium transition-all ${
                      selectedSize === size
                        ? "bg-[var(--text)] text-[var(--bg)] font-bold shadow-md"
                        : "border border-[var(--border)] text-[var(--muted)] hover:border-[var(--muted)]"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 mb-8 text-sm">
              <FiCheck className="text-green-400" />
              <span className="text-[var(--muted)]">In Stock & Ready to Ship</span>
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full flex items-center justify-center gap-2 gradient-primary text-[#080808] py-4 rounded-full font-bold hover:scale-[1.02] transition-transform shadow-lg shadow-[#83A4D4]/20"
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
              .slice(0, 4)
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
                      onError={(e) => {
                        e.target.src = "/men1.png";
                      }}
                    />
                  </div>
                  <p className="text-[var(--muted)] text-xs uppercase tracking-wide mb-1">
                    {item.brand}
                  </p>
                  <h3 className="font-semibold text-sm text-[var(--text)] truncate">
                    {item.name}
                  </h3>
                  <p className="font-bold text-[var(--text)]">
                    ₹{item.price?.toLocaleString()}
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
