import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "./CartContext";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Products", path: "/products" },
  { name: "Categories", path: "/categories" }, // Make sure this is correct
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

const Navbar: React.FC = () => {
  const { cart } = useCart();
  const cartCount = cart.reduce((sum: number, item: any) => sum + item.quantity, 0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dark, setDark] = useState(() =>
    typeof window !== "undefined"
      ? document.documentElement.classList.contains("dark")
      : false
  );
  const location = useLocation();

  // Dark mode toggle logic
  const toggleDark = () => {
    setDark((d) => {
      const next = !d;
      if (next) {
        document.documentElement.classList.add("dark");
        document.body.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
        document.body.classList.remove("dark");
      }
      return next;
    });
  };

  return (
    <nav
      className="sticky top-0 left-0 w-full z-50 glass border-b border-primary shadow-card flex items-center justify-between px-6 py-4 font-heading"
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Logo */}
      <div className="flex items-center gap-12">
        <Link to="/" className="flex items-center gap-2 group focus:outline-none">
          <span className="text-4xl font-extrabold text-primary tracking-wider drop-shadow-[0_0_12px_#0D9488cc]">S</span>
          <span className="text-2xl font-bold text-text dark:text-dm-text tracking-wide font-heading group-hover:text-primary transition">
            Store
          </span>
        </Link>
        <ul className="hidden md:flex gap-10 text-text dark:text-dm-text font-semibold text-lg">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                to={link.path}
                className={`relative px-2 py-1 transition font-heading focus:outline-none
                  ${location.pathname === link.path
                    ? "text-primary after:scale-x-100"
                    : "hover:text-primary after:scale-x-0"}
                  after:content-[''] after:block after:h-[3px] after:bg-gradient-to-r after:from-primary after:to-secondary after:transition-transform after:duration-300 after:origin-left after:rounded-full after:mt-2
                  ${location.pathname === link.path ? "after:scale-x-100" : "hover:after:scale-x-100"}
                `}
                style={{ letterSpacing: ".12em" }}
                aria-current={location.pathname === link.path ? "page" : undefined}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      {/* Search, Cart, Dark Mode */}
      <div className="flex items-center gap-4">
        <button
          className="hidden sm:block text-primary focus:outline-none"
          aria-label="Toggle dark mode"
          onClick={toggleDark}
        >
          {dark ? (
            <svg width={24} height={24} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
            </svg>
          ) : (
            <svg width={24} height={24} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <circle cx={12} cy={12} r={5} />
              <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
            </svg>
          )}
        </button>
        <Link to="/cart" className="relative flex items-center group focus:outline-none" aria-label="Cart">
          <svg
            className="w-8 h-8 text-primary group-hover:text-secondary transition drop-shadow-[0_0_8px_#F472B699]"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h7.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-secondary text-white text-xs rounded-full px-2 py-0.5 font-bold shadow border border-primary animate-pulse-badge" aria-label={`${cartCount} items in cart`}>
              {cartCount}
            </span>
          )}
        </Link>
        <button
          className="md:hidden flex items-center justify-center w-12 h-12 rounded-2xl glass border border-primary focus:outline-none focus-visible:neon-focus"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Open menu"
        >
          <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <line x1="4" y1="6" x2="20" y2="6"/>
            <line x1="4" y1="12" x2="20" y2="12"/>
            <line x1="4" y1="18" x2="20" y2="18"/>
          </svg>
        </button>
      </div>
      {/* Mobile menu */}
      {mobileOpen && (
        <div className="absolute top-full left-0 w-full bg-background/95 dark:bg-dm-bg/95 border-b border-primary flex flex-col items-center py-4 md:hidden shadow-lg">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="block w-full text-center py-2 text-text dark:text-dm-text hover:text-primary font-heading text-lg border-b border-primary last:border-b-0 focus:outline-none"
              style={{ letterSpacing: ".08em" }}
              onClick={() => setMobileOpen(false)}
              aria-current={location.pathname === link.path ? "page" : undefined}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
