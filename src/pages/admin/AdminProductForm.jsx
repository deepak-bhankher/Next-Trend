import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiArrowLeft,
  FiSave,
  FiUploadCloud,
  FiTrash2,
  FiCheck,
  FiImage,
} from "react-icons/fi";
import { toast } from "react-toastify";
import api from "../../utils/api";
import { getImageUrl } from "../../utils/imageUrl";

const categorySizesMap = {
  men: [6, 7, 8, 9, 10, 11, 12],
  women: [4, 5, 6, 7, 8, 9],
  kids: [1, 2, 3, 4, 5, 6],
};

const categoryNames = {
  men: "Men",
  women: "Women",
  kids: "Kids",
};

const AdminProductForm = () => {
  const { category = "men", id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const normalizedCategory = category.toLowerCase();
  const defaultCategoryName = categoryNames[normalizedCategory] || "Men";

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEdit);
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    brand: "Nike",
    category: defaultCategoryName,
    price: "",
    originalPrice: "",
    countInStock: "20",
    images: [],
    sizes: categorySizesMap[normalizedCategory] || [7, 8, 9, 10],
    description: "",
  });

  useEffect(() => {
    if (isEdit) {
      const fetchShoe = async () => {
        try {
          const { data } = await api.get(`/products/${id}`);
          setForm({
            name: data.name || "",
            brand: data.brand || "Nike",
            category: data.category || defaultCategoryName,
            price: data.price || "",
            originalPrice: data.originalPrice || "",
            countInStock: data.countInStock !== undefined ? data.countInStock : "20",
            images: data.images || [],
            sizes: data.sizes || categorySizesMap[normalizedCategory] || [7, 8, 9, 10],
            description: data.description || "",
          });
        } catch (error) {
          toast.error("Failed to load shoe details");
          navigate(`/admin/category/${category}`);
        } finally {
          setFetching(false);
        }
      };
      fetchShoe();
    }
  }, [id, isEdit, category, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSizeToggle = (size) => {
    setForm((prev) => {
      const exists = prev.sizes.includes(size);
      if (exists) {
        return { ...prev, sizes: prev.sizes.filter((s) => s !== size) };
      } else {
        return { ...prev, sizes: [...prev.sizes, size].sort((a, b) => a - b) };
      }
    });
  };

  // Direct Laptop File Upload
  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file (JPG, PNG, WEBP)");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    setUploading(true);
    try {
      const { data } = await api.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setForm((prev) => ({
        ...prev,
        images: [...prev.images, data.url],
      }));
      toast.success("Image uploaded from laptop successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Image upload failed");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const removeImage = (index) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim()) return toast.error("Please enter shoe name");
    if (!form.price || Number(form.price) <= 0) return toast.error("Please enter a valid price");
    if (form.sizes.length === 0) return toast.error("Please select at least one shoe size");
    if (form.images.length === 0) return toast.error("Please upload at least one shoe photo from your laptop");

    const payload = {
      ...form,
      price: Number(form.price),
      originalPrice: form.originalPrice ? Number(form.originalPrice) : Number(form.price),
      countInStock: Number(form.countInStock || 0),
      category: defaultCategoryName,
    };

    setLoading(true);
    try {
      if (isEdit) {
        await api.put(`/products/${id}`, payload);
        toast.success("Shoe updated successfully!");
      } else {
        await api.post("/products", payload);
        toast.success(`New ${defaultCategoryName} shoe published!`);
      }
      navigate(`/admin/category/${category}`);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save product");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="py-20 flex justify-center items-center text-[var(--muted)]">
        <div className="w-8 h-8 border-3 border-[#83A4D4] border-t-transparent rounded-full animate-spin mr-3" />
        Loading details...
      </div>
    );
  }

  const inputClass =
    "w-full bg-[var(--card-bg)] border border-[var(--border)] rounded-xl px-4 py-3 outline-none focus:border-[#83A4D4]/60 text-sm text-[var(--text)] placeholder:text-[var(--muted)] transition-colors";

  const allAvailableSizes = categorySizesMap[normalizedCategory] || [4, 5, 6, 7, 8, 9, 10, 11, 12];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Back button */}
      <div>
        <Link
          to={`/admin/category/${category}`}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--muted)] hover:text-[var(--text)] transition-colors"
        >
          <FiArrowLeft size={16} /> Back to {defaultCategoryName} Shoes
        </Link>
      </div>

      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">
          {isEdit ? `Edit ${defaultCategoryName} Shoe` : `+ Add New ${defaultCategoryName} Shoe`}
        </h1>
        <p className="text-[var(--muted)] text-sm mt-1">
          Upload photo from your laptop, set pricing, sizes, and inventory.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Shoe Information */}
        <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-6 space-y-4">
          <h2 className="font-bold text-base text-[var(--text)]">Shoe Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 space-y-1">
              <label className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
                Shoe Name *
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Air Jordan 1 High Retro OG"
                required
                className={inputClass}
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
                Brand *
              </label>
              <input
                type="text"
                name="brand"
                value={form.brand}
                onChange={handleChange}
                placeholder="e.g. Nike, Adidas, Puma"
                required
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
                Category
              </label>
              <input
                type="text"
                value={defaultCategoryName}
                disabled
                className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-xl px-4 py-3 text-sm text-[var(--muted)] font-bold cursor-not-allowed"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
                Selling Price (₹) *
              </label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="e.g. 7999"
                required
                className={inputClass}
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
                Original Price (MRP ₹)
              </label>
              <input
                type="number"
                name="originalPrice"
                value={form.originalPrice}
                onChange={handleChange}
                placeholder="e.g. 10999"
                className={inputClass}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
              Available Stock Count *
            </label>
            <input
              type="number"
              name="countInStock"
              value={form.countInStock}
              onChange={handleChange}
              placeholder="e.g. 20"
              required
              className={inputClass}
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
              Description
            </label>
            <textarea
              name="description"
              rows={3}
              value={form.description}
              onChange={handleChange}
              placeholder="Describe materials, cushioning, and fit..."
              className={inputClass}
            />
          </div>
        </div>

        {/* Available Sizes Selection */}
        <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-6 space-y-4">
          <div>
            <h2 className="font-bold text-base text-[var(--text)]">Available Sizes (UK)</h2>
            <p className="text-xs text-[var(--muted)] mt-0.5">
              Click on sizes to toggle available stock for this pair.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {allAvailableSizes.map((size) => {
              const selected = form.sizes.includes(size);
              return (
                <button
                  type="button"
                  key={size}
                  onClick={() => handleSizeToggle(size)}
                  className={`w-12 h-12 rounded-xl text-sm font-bold transition-all flex items-center justify-center ${
                    selected
                      ? "gradient-primary text-[#080808] shadow-md shadow-[#83A4D4]/20 scale-105"
                      : "bg-[var(--bg)] border border-[var(--border)] text-[var(--muted)] hover:border-[var(--text)] hover:text-[var(--text)]"
                  }`}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>

        {/* Direct Laptop Image Upload Card */}
        <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-6 space-y-4">
          <div>
            <h2 className="font-bold text-base text-[var(--text)]">Shoe Photos (Laptop Upload)</h2>
            <p className="text-xs text-[var(--muted)] mt-0.5">
              Choose an image directly from your computer. No URLs needed.
            </p>
          </div>

          {/* Hidden File Input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/*"
            className="hidden"
          />

          {/* Upload Button Box */}
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-[var(--border)] hover:border-[#83A4D4] rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer bg-[var(--bg)] transition-colors group"
          >
            <div className="p-4 rounded-full bg-[#83A4D4]/10 text-[#83A4D4] group-hover:scale-110 transition-transform mb-3">
              <FiUploadCloud size={28} />
            </div>
            <p className="text-sm font-bold text-[var(--text)]">
              {uploading ? "Uploading from laptop..." : "Click to Choose Image from Laptop"}
            </p>
            <p className="text-xs text-[var(--muted)] mt-1">
              Supports PNG, JPG, JPEG, WEBP (Max 10MB)
            </p>
          </div>

          {/* Uploaded Images Gallery */}
          {form.images.length > 0 && (
            <div className="pt-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)] mb-3">
                Uploaded Photos ({form.images.length})
              </p>
              <div className="flex flex-wrap gap-4">
                {form.images.map((img, i) => (
                  <div
                    key={i}
                    className="relative w-28 h-28 rounded-2xl border border-[var(--border)] overflow-hidden group bg-[var(--bg)]"
                  >
                    <img
                      src={getImageUrl(img)}
                      alt="Uploaded preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(i)}
                      className="absolute top-2 right-2 p-1.5 rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                      title="Remove image"
                    >
                      <FiTrash2 size={13} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Submit Actions */}
        <div className="flex items-center justify-end gap-3 pt-4">
          <Link
            to={`/admin/category/${category}`}
            className="px-6 py-3 rounded-xl border border-[var(--border)] hover:bg-[var(--card-bg)] text-sm font-semibold transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading || uploading}
            className="inline-flex items-center gap-2 gradient-primary text-[#080808] px-8 py-3 rounded-xl font-bold text-sm hover:scale-[1.02] transition-transform disabled:opacity-50 shadow-md shadow-[#83A4D4]/20"
          >
            <FiSave size={16} />
            {loading ? "Saving Shoe..." : isEdit ? "Update Shoe" : `Publish ${defaultCategoryName} Shoe`}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminProductForm;
