import React from "react";

export default function HelpCenter() {
  return (
    <div className="pt-28 min-h-screen bg-gradient-to-br from-[#18181b] via-[#23232a] to-[#18181b] text-white font-body flex flex-col items-center">
      <div className="w-full max-w-3xl mx-auto bg-modern-card glass rounded-3xl shadow-card border border-primary/30 px-8 py-12">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-wider font-heading bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent text-center">
          Help Center
        </h1>
        <div className="text-accent text-base mb-8">
          <p>
            Need assistance? Browse our FAQs or contact our support team for help with orders, products, or your account.
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li>Order issues: <span className="text-primary">mayankcharde2@gmail.com</span></li>
            <li>Product questions: <span className="text-primary">mayankcharde2@gmail.com</span></li>
            <li>Account support: <span className="text-primary">mayankcharde2@gmail.com</span></li>
          </ul>
        </div>
        <div className="text-center text-accent text-sm">
          We're here to help you 24/7!
        </div>
      </div>
    </div>
  );
}
