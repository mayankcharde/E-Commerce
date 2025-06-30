import React, { useState } from "react";
import axios from "axios";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      await axios.post("/api/contact", form);
      setStatus({ type: "success", msg: "Thank you for contacting us! We'll get back to you soon." });
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus({
        type: "error",
        msg: err.response?.data?.message || "Something went wrong. Please try again."
      });
    }
    setLoading(false);
  };

  return (
    <div className="pt-28 min-h-screen bg-gradient-to-br from-[#18181b] via-[#23232a] to-[#18181b] text-white font-body flex flex-col items-center">
      <div className="w-full max-w-3xl mx-auto bg-modern-card glass rounded-3xl shadow-card border border-primary/30 px-8 py-12">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-wider font-heading bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent text-center">
          Contact Us
        </h1>
        <p className="text-accent text-lg mb-10 text-center">
          Have a question, feedback, or partnership inquiry? Fill out the form below and our team will respond promptly.
        </p>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <label className="block text-accent font-semibold mb-2" htmlFor="name">
                Name
              </label>
              <input
                className="w-full px-4 py-3 rounded-lg border border-accent bg-[#18181b] text-white focus:outline-none focus:ring-2 focus:ring-primary transition"
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Your Name"
                autoComplete="name"
              />
            </div>
            <div className="flex-1">
              <label className="block text-accent font-semibold mb-2" htmlFor="email">
                Email
              </label>
              <input
                className="w-full px-4 py-3 rounded-lg border border-accent bg-[#18181b] text-white focus:outline-none focus:ring-2 focus:ring-primary transition"
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="you@email.com"
                autoComplete="email"
              />
            </div>
          </div>
          <div>
            <label className="block text-accent font-semibold mb-2" htmlFor="message">
              Message
            </label>
            <textarea
              className="w-full px-4 py-3 rounded-lg border border-accent bg-[#18181b] text-white focus:outline-none focus:ring-2 focus:ring-primary transition min-h-[120px]"
              id="message"
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              placeholder="How can we help you?"
            />
          </div>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <button
              type="submit"
              className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-3 rounded-lg font-semibold hover:from-secondary hover:to-primary transition shadow-card border border-primary w-full md:w-auto"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
            <div className="text-accent text-sm text-center md:text-right">
              Or email us at{" "}
              <a href="mailto:support@store.com" className="text-primary font-semibold hover:underline">
                mayankcharde2@gmail.com
              </a>
            </div>
          </div>
          {status && (
            <div className={`mt-2 text-center text-base font-semibold ${status.type === "success" ? "text-secondary" : "text-primary"}`}>
              {status.msg}
            </div>
          )}
        </form>
        <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-8">
          <div className="flex items-center gap-3">
            <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth={2} className="text-primary" viewBox="0 0 24 24"><path d="M21 10.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h7.5"/><path d="M21 10.5l-9 5.25L3 10.5"/><path d="M17 21l4-4m0 0l-4-4m4 4H9"/></svg>
            <span className="text-accent text-lg">mayankcharde2@gmail.com</span>
          </div>
          <div className="flex items-center gap-3">
            <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth={2} className="text-primary" viewBox="0 0 24 24"><path d="M22 16.92V19a2 2 0 0 1-2.18 2A19.72 19.72 0 0 1 3 5.18 2 2 0 0 1 5 3h2.09a2 2 0 0 1 2 1.72c.13 1.05.37 2.07.72 3.06a2 2 0 0 1-.45 2.11l-.27.27a16 16 0 0 0 6.29 6.29l.27-.27a2 2 0 0 1 2.11-.45c.99.35 2.01.59 3.06.72A2 2 0 0 1 22 16.92z"/></svg>
            <span className="text-accent text-lg">+91 9699561658</span>
          </div>
          <div className="flex items-center gap-3">
            <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth={2} className="text-primary" viewBox="0 0 24 24"><path d="M17.657 16.657L13.414 12.414a8 8 0 1 0-1.414 1.414l4.243 4.243a1 1 0 0 0 1.414-1.414z"/></svg>
            <span className="text-accent text-lg">Nagpur, Maharashtra, India</span>
          </div>
        </div>
      </div>
    </div>
  );
}
