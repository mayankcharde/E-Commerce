import React from "react";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { useCart } from "./CartContext";

export interface ProductCardProps {
  name: string;
  img: string;
  price: number;
  oldPrice?: number;
  onAddToCart: () => void;
  isSale?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  img,
  price,
  oldPrice,
  onAddToCart,
  isSale = false,
}) => {
  const { addToCart } = useCart ? useCart() : { addToCart: () => {} };
  const [adding, setAdding] = React.useState(false);

  const handleAdd = () => {
    setAdding(true);
    if (addToCart) addToCart({ name, img, price, oldPrice });
    if (onAddToCart) onAddToCart();
    toast.success("Added to cart!");
    setTimeout(() => setAdding(false), 400);
  };

  return (
    <motion.div
      className="relative glass card-glow rounded-4xl border border-primary shadow-card overflow-hidden group transition-transform focus-within:neon-focus"
      whileHover={{ scale: 1.06, rotate: -1 }}
      initial={false}
      tabIndex={0}
      aria-label={name}
    >
      <div className="relative w-full">
        <motion.img
          src={img}
          alt={name}
          loading="lazy"
          className="w-full h-56 object-cover rounded-t-4xl border-b border-primary group-hover:scale-110 transition-transform duration-300"
          whileHover={{ scale: 1.12 }}
          style={{ willChange: "transform" }}
        />
        {isSale && (
          <motion.span
            className="absolute top-4 left-4 bg-sale-badge text-white text-xs px-5 py-2 rounded-full shadow-card font-semibold tracking-wide border border-sale-badge animate-pulse-badge drop-shadow-[0_0_8px_#F472B6cc]"
            aria-label="Sale"
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.12, 1] }}
            transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
          >
            Sale
          </motion.span>
        )}
      </div>
      <div className="p-7 flex flex-col items-center">
        <div className="font-heading text-xl font-extrabold text-text dark:text-dm-text tracking-wide mb-2">
          {name}
        </div>
        <div className="flex items-center gap-3 mb-4">
          <span className="text-primary font-bold text-2xl">
            ${price.toFixed(2)}
          </span>
          {oldPrice && (
            <span className="line-through text-secondary text-lg">
              ${oldPrice.toFixed(2)}
            </span>
          )}
        </div>
        <button
          className={`cta-gradient w-full py-3 rounded-2xl font-bold shadow-btn border-none focus:outline-none focus-visible:neon-focus transition-btn ${
            adding ? "opacity-60 pointer-events-none" : ""
          }`}
          onClick={handleAdd}
          aria-label={`Add ${name} to cart`}
          disabled={adding}
        >
          {adding ? "Adding..." : "Add to Cart"}
        </button>
        <Toaster />
      </div>
    </motion.div>
  );
};

export default ProductCard;
