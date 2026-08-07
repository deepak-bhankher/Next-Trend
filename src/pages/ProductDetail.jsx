import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FiShoppingBag, FiCheck } from "react-icons/fi";
import { toast } from "react-toastify";
import api from "../utils/api";
import { useCart } from "../context/CartContext";

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);

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

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }
    addToCart({
      product: product._id,
      name: product.name,
      image: product.images[0],
      price: product.price,
      size: selectedSize,
      qty: 1,
    });
    toast.success("Added to cart!");
  };

  if (loading) {
    return (
      <div className="bg-dark text-white min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="bg-dark text-white min-h-screen flex items-center justify-center">
        Product not found.
      </div>
    );
  }

  return (
    <div className="bg-dark text-white min-h-screen pt-32 pb-20">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-14">
        <div>
          <motion.div
            key={selectedImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="aspect-square bg-white/5 rounded-3xl overflow-hidden border border-white/10 mb-4"
          >
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </motion.div>
          {product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-colors ${
                    selectedImage === i ? "border-white" : "border-white/10"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <p className="text-white/40 uppercase tracking-wide text-sm mb-2">
            {product.brand}
          </p>
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
          <p className="text-2xl font-bold mb-6">₹{product.price}</p>
          <p className="text-white/60 leading-relaxed mb-8">
            {product.description}
          </p>

          <div className="mb-8">
            <h3 className="text-sm font-semibold uppercase tracking-wide mb-3">
              Select Size
            </h3>
            <div className="flex flex-wrap gap-3">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-12 h-12 rounded-full border font-medium transition-all ${
                    selectedSize === size
                      ? "bg-white text-black border-white"
                      : "border-white/20 text-white hover:border-white/50"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {product.colors?.length > 0 && (
            <div className="mb-8">
              <h3 className="text-sm font-semibold uppercase tracking-wide mb-3">
                Available Colors
              </h3>
              <div className="flex gap-2 flex-wrap">
                {product.colors.map((color) => (
                  <span
                    key={color}
                    className="px-4 py-1.5 rounded-full text-sm border border-white/20 text-white/70"
                  >
                    {color}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center gap-2 mb-8 text-sm">
            {product.countInStock > 0 ? (
              <>
                <FiCheck className="text-white" />
                <span className="text-white/60">
                  In Stock ({product.countInStock} available)
                </span>
              </>
            ) : (
              <span className="text-white/40">Out of Stock</span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            disabled={product.countInStock === 0}
            className="w-full flex items-center justify-center gap-2 bg-white text-black py-4 rounded-full font-semibold hover:scale-[1.02] transition-transform disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <FiShoppingBag /> Add to Cart
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetail;