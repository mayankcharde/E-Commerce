import React, { useState } from "react";
import { toast } from "react-toastify";

export default function ProductCard({ product, onAddToCart }) {
  const [adding, setAdding] = useState(false);

  const handleAddToCart = () => {
    setAdding(true);
    onAddToCart(product);
    toast.success("Added to cart!");
    setTimeout(() => setAdding(false), 400);
  };

  return (
    <div className="relative bg-modern-card rounded-2xl border border-accent shadow-card overflow-hidden group transition-transform hover:scale-105 hover:shadow-[0_8px_32px_0_rgba(37,99,235,0.18)]">
      <img
        src={product.img}
        alt={product.name}
        className="w-full h-48 object-cover rounded-t-2xl border-b border-accent group-hover:scale-105 transition-transform duration-300"
      />
      <div className="p-5 relative z-10 flex flex-col items-center">
        <div className="font-heading text-lg font-bold text-white tracking-wide mb-1">
          {product.name}
        </div>
        <div className="text-accent text-sm mb-2">{product.category}</div>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-primary font-bold text-xl">
            ${product.price.toFixed(2)}
          </span>
          {product.oldPrice && (
            <span className="line-through text-secondary text-base">
              ${product.oldPrice.toFixed(2)}
            </span>
          )}
        </div>
        <button
          className={`w-full py-2 rounded-lg bg-primary text-white font-bold shadow-card border border-primary hover:bg-secondary hover:text-white hover:border-secondary transition active:scale-95 active:shadow-[0_0_0_4px_#2563eb55] ${
            adding ? "opacity-60 pointer-events-none" : ""
          }`}
          onClick={handleAddToCart}
          disabled={adding}
        >
          {adding ? "Adding..." : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}

