import { useState, useEffect } from "react";
import { FiSave, FiCheck, FiSettings } from "react-icons/fi";
import { toast } from "react-toastify";
import api from "../../utils/api";

const AdminSettings = () => {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const [form, setForm] = useState({
    storeName: "Next Trend",
    tagline: "Step into the future of style. Premium footwear crafted with purpose.",
    logoUrl: "/logo.png",
    announcementText: "",
    supportEmail: "support@nexttrend.com",
    supportPhone: "+91 98765 43210",
    address: "123 Sneaker Boulevard, Fashion District, New Delhi, India",
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data } = await api.get("/settings");
        if (data) {
          setForm((prev) => ({ ...prev, ...data }));
        }
      } catch (error) {
        console.error("Failed to load settings:", error);
      } finally {
        setFetching(false);
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.put("/settings", form);
      toast.success("Store settings updated successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update settings");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="py-20 flex justify-center items-center text-[var(--muted)]">
        <div className="w-8 h-8 border-3 border-[#83A4D4] border-t-transparent rounded-full animate-spin mr-3" />
        Loading settings...
      </div>
    );
  }

  const inputClass =
    "w-full bg-[var(--card-bg)] border border-[var(--border)] rounded-xl px-4 py-3 outline-none focus:border-[#83A4D4]/60 text-sm text-[var(--text)] placeholder:text-[var(--muted)] transition-colors";

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Store Settings</h1>
        <p className="text-[var(--muted)] text-sm mt-1">
          Customize website identity, customer support details, and top announcement banner
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Brand & Identity */}
        <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-6 space-y-4">
          <h2 className="font-bold text-base text-[var(--text)]">Brand & Announcement</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
                Store Name
              </label>
              <input
                type="text"
                name="storeName"
                value={form.storeName}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
                Logo URL or Path
              </label>
              <input
                type="text"
                name="logoUrl"
                value={form.logoUrl}
                onChange={handleChange}
                placeholder="/logo.png or https://..."
                className={inputClass}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
              Store Tagline
            </label>
            <input
              type="text"
              name="tagline"
              value={form.tagline}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
              Top Announcement Banner
            </label>
            <input
              type="text"
              name="announcementText"
              value={form.announcementText}
              onChange={handleChange}
              placeholder="e.g. Free delivery on orders above ₹999"
              className={inputClass}
            />
          </div>
        </div>

        {/* Customer Support Info */}
        <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl p-6 space-y-4">
          <h2 className="font-bold text-base text-[var(--text)]">Customer Contact & Address</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
                Support Email
              </label>
              <input
                type="email"
                name="supportEmail"
                value={form.supportEmail}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
                Support Phone Number
              </label>
              <input
                type="text"
                name="supportPhone"
                value={form.supportPhone}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
              Store Physical Address
            </label>
            <textarea
              name="address"
              rows={2}
              value={form.address}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
        </div>

        {/* Save button */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 gradient-primary text-[#080808] px-8 py-3 rounded-xl font-bold text-sm hover:scale-[1.02] transition-transform disabled:opacity-50"
          >
            <FiSave size={16} />
            {loading ? "Saving Changes..." : "Save Store Settings"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminSettings;
