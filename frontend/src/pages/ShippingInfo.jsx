import React from "react";

export default function ShippingInfo() {
  return (
    <div className="pt-28 min-h-screen bg-gradient-to-br from-[#18181b] via-[#23232a] to-[#18181b] text-white font-body flex flex-col items-center">
      <div className="w-full max-w-3xl mx-auto bg-modern-card glass rounded-3xl shadow-card border border-primary/30 px-8 py-12">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-wider font-heading bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent text-center">
          Shipping Information
        </h1>
        <div className="text-accent text-base mb-8">
          <ul className="list-disc pl-6 space-y-2">
            <li>We offer fast and reliable shipping across India.</li>
            <li>Orders are processed within 1-2 business days.</li>
            <li>Estimated delivery: 3-7 business days after dispatch.</li>
            <li>Tracking details will be emailed once your order ships.</li>
          </ul>
        </div>
        <div className="text-center text-accent text-sm">
          For shipping questions, contact <a href="mailto:mayankcharde2@gmail.com" className="text-primary hover:underline">mayankcharde2@gmail.com</a>
        </div>
      </div>
    </div>
  );
}
