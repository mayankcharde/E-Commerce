import React from "react";

export default function EcomButton({
  children,
  className = "",
  ...props
}) {
  return (
    <button
      className={`
        relative
        w-full sm:w-auto
        px-6 py-3
        rounded-xl
        font-semibold
        text-base sm:text-lg
        focus:outline-none
        focus-visible:ring-2
        focus-visible:ring-offset-2
        focus-visible:ring-btn-teal
        dark:focus-visible:ring-btn-purple
        transition-btn duration-300
        shadow-btn
        bg-btn-bg-light
        dark:bg-btn-bg-dark
        text-btn-teal
        dark:text-btn-purple
        border border-transparent
        hover:shadow-btn-hover-light
        dark:hover:shadow-btn-hover-dark
        hover:-translate-y-1
        hover:scale-105
        active:scale-95
        hover:bg-btn-teal
        hover:text-white
        dark:hover:bg-btn-purple
        dark:hover:text-white
        hover:border-btn-teal
        dark:hover:border-btn-purple
        ${className}
      `}
      style={{
        transitionProperty:
          "background, box-shadow, transform, color, border",
      }}
      {...props}
    >
      {children}
    </button>
  );
}
