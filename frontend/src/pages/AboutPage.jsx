import React from "react";

export default function AboutPage() {
  return (
    <div className="pt-28 min-h-screen bg-gradient-to-br from-[#18181b] via-[#23232a] to-[#18181b] text-white font-body flex flex-col items-center">
      <div className="w-full max-w-3xl mx-auto bg-modern-card glass rounded-3xl shadow-card border border-primary/30 px-8 py-12">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-wider font-heading bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent text-center">
          About Us
        </h1>
        <p className="text-accent text-lg mb-8 text-center">
          Welcome to <span className="text-primary font-bold">Store</span> – your destination for modern, premium, and curated products. We are passionate about delivering quality, style, and a seamless shopping experience.
        </p>
        <div className="mb-8 text-base text-accent leading-relaxed">
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <span className="text-secondary font-semibold">Wide Selection:</span> From electronics to fashion, home, and more, we offer a diverse range of products to suit your lifestyle.
            </li>
            <li>
              <span className="text-secondary font-semibold">Quality Assurance:</span> Every product is carefully curated for quality and value.
            </li>
            <li>
              <span className="text-secondary font-semibold">Customer Focused:</span> Our team is dedicated to providing exceptional service and support.
            </li>
            <li>
              <span className="text-secondary font-semibold">Secure Shopping:</span> Enjoy safe and secure checkout with trusted payment gateways.
            </li>
          </ul>
        </div>
        <div className="mb-8 text-center">
          <span className="text-lg font-bold text-primary">Meet the Developer</span>
          <div className="mt-2 text-accent">
            <span className="font-semibold text-white">Mayank Shirish Charde</span> · Full Stack Developer<br />
            <a href="mailto:mayankcharde2@gmail.com" className="text-primary hover:underline">mayankcharde2@gmail.com</a>
            <br />
            <a
              href="https://www.linkedin.com/in/mayank-charde-56636b2a4/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary font-semibold hover:underline"
            >
              LinkedIn Profile
            </a>
          </div>
        </div>
        <div className="text-center text-accent text-sm">
          Thank you for visiting our store. We hope you enjoy your shopping experience!
        </div>
      </div>
    </div>
  );
}
