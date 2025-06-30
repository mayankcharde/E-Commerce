/* eslint-disable no-unused-vars */
import { useState } from "react";
import { toast } from "react-toastify";
import React from "react";
import { useCart } from "./CartContext";

export default function ProductCard() {
    const { addToCart } = useCart();
    const [adding, setAdding] = useState(false);

    // Product info for cart
    const product = {
        name: "Bluetooth Speaker",
        img: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=400&q=80",
        price: 3,
        oldPrice: 39,
        category: "Audio",
    };

    return (
        <div
            className="
                relative mt-3 w-full max-w-[420px] min-w-[340px] rounded-3xl
                overflow-hidden shadow-card
                bg-gradient-to-br from-[#23232a] via-[#18181b] to-[#23232a] glass
                border border-primary/30
                transition-all duration-300
                flex flex-row items-stretch
                hover:scale-105
                hover:-translate-y-1
                hover:bg-gradient-to-br
                hover:from-pink-600 hover:via-pink-500 hover:to-red-500
                hover:border-pink-400
                group
            "
        >
            {/* Sale Badge Only */}
            <div className="absolute top-3 left-3 z-10">
                <span className="bg-pink-500/90 text-white text-xs px-2 py-0.5 rounded-full font-semibold shadow-card border border-pink-400">Sale</span>
            </div>
            {/* Image */}
            <div className="flex-shrink-0 flex items-center justify-center w-48 h-48 bg-gradient-to-br from-[#0D9488]/10 to-[#F472B6]/10">
                <img
                    src={product.img}
                    alt={product.name}
                    className="object-contain h-32 w-32 drop-shadow-lg transition-transform duration-300 group-hover:scale-110"
                />
            </div>
            {/* Body */}
            <div className="flex-1 flex flex-col justify-between p-6">
                <div>
                    <div className="font-heading text-lg font-extrabold text-white tracking-wide mb-1">
                        {product.name}
                    </div>
                    <div className="flex items-center gap-2 mb-1">
                        <span className="bg-primary/20 text-primary px-2 py-0.5 rounded-full text-xs font-semibold">{product.category}</span>
                        <span className="flex items-center gap-1 text-yellow-400 font-semibold text-xs">
                            <svg width="14" height="14" fill="currentColor" className="inline" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.454a1 1 0 00-1.175 0l-3.38 2.454c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z"/></svg>
                            4.6
                        </span>
                        <span className="text-accent text-xs">(78)</span>
                    </div>
                    <div className="text-accent text-xs mb-2">
                        Experience rich sound and deep bass with this portable Bluetooth speaker.
                    </div>
                </div>
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-primary font-bold text-xl">₹3</span>
                        <span className="line-through text-secondary text-base">₹3,499</span>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => {
                                setAdding(true);
                                addToCart(product);
                                toast.success("Added to cart!");
                                setTimeout(() => setAdding(false), 400);
                            }}
                            className={`
                                flex-1 py-1 px-2 rounded-full font-bold shadow-btn border-none
                                focus:outline-none focus-visible:ring-2 focus-visible:ring-primary
                                transition-btn bg-gradient-to-r from-pink-500 to-red-500 text-white
                                hover:from-red-500 hover:to-pink-500 hover:scale-105 active:scale-95
                                text-sm
                            `}
                            disabled={adding}
                        >
                            {adding ? "Adding..." : "Add to Cart"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}