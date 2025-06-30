import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="pt-28 min-h-screen bg-gradient-to-br from-[#18181b] via-[#23232a] to-[#18181b] text-white font-body flex flex-col items-center">
      <div className="w-full max-w-3xl mx-auto bg-modern-card glass rounded-3xl shadow-card border border-primary/30 px-8 py-12">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-wider font-heading bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent text-center">
          Privacy Policy
        </h1>
        <div className="text-accent text-base mb-8">
          <p>
            We respect your privacy and are committed to protecting your personal information. We do not sell or share your data with third parties except as required to provide our services or by law.
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li>We collect only necessary information for order processing and communication.</li>
            <li>Your data is stored securely and used only for the intended purpose.</li>
            <li>You may contact us anytime to request deletion or update of your data.</li>
          </ul>
        </div>
        <div className="text-center text-accent text-sm">
          For more details, contact us at <a href="mailto:mayankcharde2@gmail.com" className="text-primary hover:underline">mayankcharde2@gmail.com</a>
        </div>
      </div>
    </div>
  );
}
