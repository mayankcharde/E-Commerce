import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Products', path: '/products' },
  { name: 'Categories', path: '/categories' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

const Navbar = () => {
  const { cart } = useCart();
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dark, setDark] = useState(() =>
    typeof window !== "undefined"
      ? document.documentElement.classList.contains("dark")
      : false
  );
  const navigate = useNavigate();

  // Fetch latest payment/order info from backend (by user email)
  const [latestOrder, setLatestOrder] = useState(null);

  useEffect(() => {
    // Try to get user email from localStorage (set after info submission or login)
    const userInfo = JSON.parse(localStorage.getItem("userInfo") || "null");
    const email = userInfo?.email;
    if (email) {
      fetch(`${import.meta.env.VITE_BACKEND_HOST_URL}/api/payment/latest-order?email=${encodeURIComponent(email)}`)
        .then(res => res.ok ? res.json() : null)
        .then(data => {
          if (data && data.order) setLatestOrder(data.order);
        });
    }
  }, []);

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
      className="fixed top-0 left-0 w-full z-50 glass border-b border-transparent shadow-card flex items-center justify-between px-6 py-4 font-heading"
      style={{
        background: "linear-gradient(135deg,rgba(31,38,135,0.18) 0%,rgba(13,148,136,0.12) 100%)",
        backdropFilter: "blur(16px) saturate(160%)",
        WebkitBackdropFilter: "blur(16px) saturate(160%)",
        borderImage: "linear-gradient(90deg,#0D9488 0%,#F472B6 100%) 1",
        borderWidth: "0 0 2.5px 0"
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-12">
        <Link to="/" className="flex items-center gap-2 group focus:outline-none" aria-label="E-Store Home">
          <span className="flex items-center">
            <svg
              width={38}
              height={38}
              viewBox="0 0 38 38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="drop-shadow-[0_0_12px_#0D9488cc]"
              aria-hidden="true"
            >
              <circle cx="19" cy="19" r="18" fill="#0D9488" />
              <text x="50%" y="56%" textAnchor="middle" fill="#fff" fontSize="22" fontWeight="bold" fontFamily="Inter, Arial, sans-serif" dy=".3em">E</text>
            </svg>
          </span>
          <span className="text-2xl font-bold text-text dark:text-dm-text tracking-wide font-heading group-hover:text-primary transition select-none">
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
      {/* Cart, Order Tracking Icon, Hamburger Icon */}
      <div className="flex items-center gap-4 md:gap-4 sm:gap-4 xs:gap-4 gap-6 ml-auto">
        {/* Order Tracking Icon */}
        <button
          className="relative flex items-center justify-center w-12 h-12 rounded-2xl glass border border-primary focus:outline-none hover:bg-primary/10 transition"
          aria-label="Track Order"
          onClick={() => {
            // Always navigate to order tracking without passing state, so email prompt shows
            navigate("/order-tracking");
          }}
        >
          <svg
            className="w-7 h-7 text-primary group-hover:text-secondary transition"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.2}
            viewBox="0 0 24 24"
          >
            <rect x="3" y="6" width="18" height="12" rx="3" fill="#23232a" stroke="#0D9488" strokeWidth="2"/>
            <path d="M7 10h2v4H7zM11 10h2v4h-2zM15 10h2v4h-2z" fill="#F472B6"/>
            <circle cx="12" cy="12" r="9" stroke="#F472B6" strokeWidth="1.5" />
          </svg>
        </button>
        {/* Cart Icon */}
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
        <div className="flex md:hidden gap-6">
          <button
            className="flex items-center justify-center w-12 h-12 rounded-2xl glass border border-primary focus:outline-none ml-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Open menu"
            style={{ marginRight: 0 }}
          >
            <svg
              className="w-9 h-9 text-pink-500 drop-shadow-[0_0_8px_#F472B6cc]"
              fill="none"
              stroke="currentColor"
              strokeWidth={3}
              viewBox="0 0 24 24"
            >
              <line x1="4" y1="6" x2="20" y2="6"/>
              <line x1="4" y1="12" x2="20" y2="12"/>
              <line x1="4" y1="18" x2="20" y2="18"/>
            </svg>
          </button>
        </div>
      </div>
      <style>
        {`
          @keyframes slideDownMenu {
            0% {
              opacity: 0;
              transform: translateY(-24px) scaleY(0.95);
            }
            100% {
              opacity: 1;
              transform: translateY(0) scaleY(1);
            }
          }
          @keyframes slideUpMenu {
            0% {
              opacity: 1;
              transform: translateY(0) scaleY(1);
            }
            100% {
              opacity: 0;
              transform: translateY(-24px) scaleY(0.95);
            }
          }
          @keyframes fadeInMenuItem {
            0% {
              opacity: 0;
              transform: translateY(-16px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .mobile-menu-center {
            left: 50%;
            transform: translateX(-50%);
            width: 96vw;
            max-width: 420px;
            border-radius: 1.5rem;
            margin-top: 2.5rem;
          }
        `}
      </style>
      {/* Mobile menu */}
      <div className="relative w-full flex justify-center items-center md:hidden">
        {mobileOpen && (
          <div
            key="mobile-menu"
            className="fixed top-0 left-1/2 -translate-x-1/2 z-[200] py-4 flex flex-col items-center mobile-menu-center"
            style={{
              background: "rgba(0,0,0,0.98)",
              backdropFilter: "blur(20px) saturate(200%)",
              WebkitBackdropFilter: "blur(20px) saturate(200%)",
              border: "2px solid #F472B6",
              boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.22)",
              animation: "slideDownMenu 0.35s cubic-bezier(.4,1.6,.6,1) both"
            }}
          >
            <button
              className="mb-2 self-end mr-4 mt-1"
              aria-label="Close menu"
              onClick={() => setMobileOpen(false)}
            >
              <svg
                className="w-10 h-10 text-pink-400 drop-shadow-[0_0_8px_#F472B6cc]"
                fill="none"
                stroke="currentColor"
                strokeWidth={3}
                viewBox="0 0 24 24"
              >
                <g>
                  <g>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                    <line x1="6" y1="18" x2="18" y2="6"/>
                  </g>
                </g>
              </svg>
            </button>
            {navLinks.map((link, idx) => (
              <Link
                key={link.name}
                to={link.path}
                className={`block w-full text-center py-4 font-heading text-xl border-b border-pink-600 last:border-b-0 focus:outline-none
                  ${link.name === "About" ? "text-white" : "text-pink-400"}
                `}
                style={{
                  letterSpacing: '.12em',
                  animation: `fadeInMenuItem 0.4s ${0.08 * idx + 0.1}s both`
                }}
                onClick={() => setMobileOpen(false)}
                aria-current={location.pathname === link.path ? "page" : undefined}
              >
                {link.name}
              </Link>
            ))}
          </div>
        )}
        {/* Hamburger closing animation */}
        {!mobileOpen && (
          <div
            key="mobile-menu-closing"
            className="fixed top-0 left-1/2 -translate-x-1/2 z-[200] py-4 pointer-events-none flex flex-col items-center mobile-menu-center"
            style={{
              background: "rgba(0,0,0,0.98)",
              backdropFilter: "blur(20px) saturate(200%)",
              WebkitBackdropFilter: "blur(20px) saturate(200%)",
              border: "2px solid #F472B6",
              boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.22)",
              animation: "slideUpMenu 0.32s cubic-bezier(.4,1.6,.6,1) both"
            }}
          />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
 

