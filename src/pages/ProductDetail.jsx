import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FiShoppingBag, FiCheck } from "react-icons/fi";
import { toast } from "react-toastify";
import api from "../utils/api";
import { useCart } from "../context/CartContext";
import ShoeCard from "../components/ShoeCard";

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(`/products/${id}`);
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  useEffect(() => {
    const fetchRelated = async () => {
      if (!product) return;
      try {
        const { data } = await api.get(`/products?category=${product.category}`);
        setRelated(data.filter((p) => p._id !== product._id).slice(0, 4));
      } catch (error) {
        console.error("Error fetching related products:", error);
      }
    };
    fetchRelated();
  }, [product]);

  const handleAddToCart = () => {
    if (!selectedSize) { toast.error("Please select a size"); return; }
    addToCart({ product: product._id, name: product.name, image: product.images[0], price: product.price, size: selectedSize, qty: 1 });
    toast.success("Added to cart!");
  };

  if (loading) return <div className="bg-dark text-white min-h-screen flex items-center justify-center text-white/40">Loading...</div>;
  if (!product) return <div className="bg-dark text-white min-h-screen flex items-center justify-center text-white/40">Product not found.</div>;

  return (
    <div className="bg-dark text-white min-h-screen pt-32 pb-20">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-14">
        <div>
          <motion.div
            key={selectedImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="aspect-square glass-card rounded-3xl overflow-hidden mb-4 shadow-2xl shadow-black/60"
          >
            <img src={product.images[selectedImage]} alt={product.name} className="w-full h-full object-cover" />
          </motion.div>
          {product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === i ? "border-[#83A4D4]" : "border-white/8 hover:border-white/20"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
          <p className="gradient-text-primary uppercase tracking-widest text-xs mb-2 font-medium">{product.brand}</p>
          <h1 className="text-4xl font-bold mb-4 text-white">{product.name}</h1>
          <p className="text-3xl font-black mb-6 gradient-text-secondary">
            ₹{product.price}
          </p>
          <p className="text-white/50 leading-relaxed mb-8">{product.description}</p>

          <div className="mb-8">
            <h3 className="text-xs font-semibold uppercase tracking-widest mb-3 text-white/40">Select Size</h3>
            <div className="flex flex-wrap gap-3">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-12 h-12 rounded-full font-medium transition-all ${
                    selectedSize === size
                      ? "gradient-primary text-[#080808] font-bold accent-glow"
                      : "glass-btn text-white/60 hover:text-white hover:border-[#83A4D4]/30"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {product.colors?.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xs font-semibold uppercase tracking-widest mb-3 text-white/40">Available Colors</h3>
              <div className="flex gap-2 flex-wrap">
                {product.colors.map((color) => (
                  <span key={color} className="px-4 py-1.5 rounded-full text-sm glass-btn text-white/50">{color}</span>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center gap-2 mb-8 text-sm">
            {product.countInStock > 0 ? (
              <><FiCheck className="text-[#A1FFCE]" /><span className="text-white/50">In Stock ({product.countInStock} available)</span></>
            ) : (
              <span className="text-white/30">Out of Stock</span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            disabled={product.countInStock === 0}
            className="w-full flex items-center justify-center gap-2 gradient-primary text-[#080808] py-4 rounded-full font-bold hover:scale-[1.02] hover:opacity-90 transition-all accent-glow disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <FiShoppingBag /> Add to Cart
          </button>
        </motion.div>
      </div>

      {related.length > 0 && (
        <div className="max-w-6xl mx-auto px-6 mt-24">
          <h2 className="text-2xl font-bold mb-8 text-white">You Might Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {related.map((item) => <ShoeCard key={item._id} product={item} />)}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;