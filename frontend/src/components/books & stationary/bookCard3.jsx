/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useCart } from "../CartContext";
import { toast } from "react-toastify";

export default function ShoppingCard({
    name = "Office Essentials Set",
    img = "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
    price = 349,
    oldPrice = 599,
    category = "Office",
    rating = 4.6,
    reviews = 54,
    label = "Popular",
    desc = "All-in-one stationery set for your workspace.",
}) {
    const { addToCart } = useCart();
    const [adding, setAdding] = useState(false);
    const product = { name, img, price, oldPrice, category };

    return (
        <div
            className="
                group bg-modern-card rounded-2xl shadow-card border border-accent flex flex-col items-center
                transition-transform duration-200 hover:scale-105 hover:shadow-[0_8px_32px_0_rgba(13,148,136,0.18)]
                hover:bg-gradient-to-br hover:from-[#23232a] hover:to-[#23232a] active:scale-95 cursor-pointer overflow-hidden hover:border-primary
                min-w-[320px] max-w-[420px]
            "
            style={{ minHeight: 340 }}
        >
            <div className="relative w-full">
                <img
                    src={img}
                    alt={name}
                    loading="lazy"
                    className="w-full h-44 object-cover transition-transform duration-300 group-hover:scale-110 border-b border-accent"
                />
                {label && (
                    <div className="absolute top-3 left-3 bg-primary text-white text-xs px-4 py-1 rounded-full shadow-card font-semibold tracking-wide border border-primary">
                        {label}
                    </div>
                )}
            </div>
            <div className="p-6 flex flex-col items-center w-full">
                <div className="font-bold text-lg mb-1 text-white font-heading tracking-wide">
                    {name}
                </div>
                {desc && (
                    <div className="text-accent text-sm mb-2 text-center">{desc}</div>
                )}
                <div className="flex items-center gap-2 mb-2">
                    <span className="bg-primary/20 text-primary px-2 py-0.5 rounded-full text-xs font-semibold">
                        {category}
                    </span>
                    <span className="flex items-center gap-1 text-yellow-400 font-semibold text-xs">
                        <svg width="14" height="14" fill="currentColor" className="inline" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.454a1 1 0 00-1.175 0l-3.38 2.454c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z"/></svg>
                        {rating}
                    </span>
                    <span className="text-accent text-xs">({reviews})</span>
                </div>
                <div className="flex items-center gap-2 mb-3">
                    <span className="text-primary font-bold text-xl">₹{price}</span>
                    <span className="line-through text-secondary text-base">₹{oldPrice}</span>
                </div>
                <button
                    className={`flex-1 py-1 px-2 rounded-full font-bold border-none focus:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-btn bg-gradient-to-r from-pink-500 to-red-500 text-white hover:from-red-500 hover:to-pink-500 hover:scale-105 active:scale-95 text-sm w-full ${adding ? "opacity-60 pointer-events-none" : ""}`}
                    onClick={() => {
                        setAdding(true);
                        addToCart(product);
                        toast.success("Added to cart!");
                        setTimeout(() => setAdding(false), 400);
                    }}
                    disabled={adding}
                >
                    {adding ? "Adding..." : "Add to Cart"}
                </button>
            </div>
        </div>
    );
}