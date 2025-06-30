import React from "react";
import { useCart } from "../components/CartContext";
import { useLocation, useNavigate } from "react-router-dom";
import html2pdf from "html2pdf.js";

function randomReceipt() {
  return "INV-" + Math.floor(100000 + Math.random() * 900000);
}

export default function BillingPage() {
  const { cart, clearCart } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const billRef = React.useRef();

  const bill = location.state?.bill || {
    products: cart,
    total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    time: new Date().toLocaleString(),
  };

  React.useEffect(() => {
    if (!bill.products || bill.products.length === 0) {
      navigate("/cart");
    }
  }, [bill.products, navigate]);

  const receiptNo = React.useMemo(() => randomReceipt(), []);

  const downloadBill = () => {
    if (!billRef.current) return;
    html2pdf()
      .set({
        margin: 0.2,
        filename: `E Store-Bill-${receiptNo}.pdf`,
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
      })
      .from(billRef.current)
      .save();
  };

  return (
    <div className="pt-28 px-4 min-h-screen bg-gradient-to-br from-[#18181b] via-[#23232a] to-[#18181b] flex justify-center items-start font-body">
      <div
        className="w-full max-w-2xl bg-[#23232a] rounded-3xl shadow-2xl border border-accent p-0 relative overflow-hidden"
        ref={billRef}
      >
        {/* Header */}
        <div className="flex flex-col items-center py-8 px-8 border-b border-accent/30 bg-gradient-to-r from-primary/10 via-[#23232a] to-accent/10">
          <img
            src="https://svgshare.com/i/13yG.svg"
            alt="Devknus Logo"
            className="w-16 h-16 mb-2"
            style={{ filter: "drop-shadow(0 2px 8px #0D948855)" }}
          />
          <div className="text-2xl font-extrabold font-heading bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-1 tracking-tight">
            Devknus E-Commerce
          </div>
          <div className="text-accent/80 text-xs font-medium tracking-wide">
            www.devknus.com
          </div>
        </div>
        {/* Bill Info */}
        <div className="flex flex-col md:flex-row justify-between items-center px-8 py-4 border-b border-accent/20 bg-[#23232a]">
          <div className="flex flex-col gap-1">
            <span className="text-xs text-accent/70">Receipt No.</span>
            <span className="font-mono text-base font-bold text-primary">{receiptNo}</span>
          </div>
          <div className="flex flex-col gap-1 mt-2 md:mt-0">
            <span className="text-xs text-accent/70">Date & Time</span>
            <span className="font-mono text-base text-white">{bill.time}</span>
          </div>
        </div>
        {/* Products Table */}
        <div className="overflow-x-auto px-8 py-2">
          <table className="w-full text-left mt-2 mb-2">
            <thead>
              <tr className="border-b border-accent/30 text-secondary text-xs uppercase tracking-wider">
                <th className="py-2 px-2 font-semibold">Product</th>
                <th className="py-2 px-2 font-semibold text-center">Qty</th>
                <th className="py-2 px-2 font-semibold text-right">Price</th>
                <th className="py-2 px-2 font-semibold text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {bill.products.map((item, idx) => (
                <tr key={idx} className="border-b border-accent/10 hover:bg-[#18181b]/60 transition">
                  <td className="py-3 px-2 flex items-center gap-3">
                    <img src={item.img} alt={item.name} className="w-10 h-10 rounded-lg object-cover border border-accent/30" />
                    <span className="font-semibold text-white">{item.name}</span>
                  </td>
                  <td className="py-3 px-2 text-center">{item.quantity}</td>
                  <td className="py-3 px-2 text-right">₹{item.price.toLocaleString()}</td>
                  <td className="py-3 px-2 font-bold text-primary text-right">₹{(item.price * item.quantity).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Summary */}
        <div className="px-8 py-4 flex flex-col items-end border-t border-accent/20 bg-gradient-to-r from-[#23232a] to-[#18181b]">
          <div className="w-full max-w-xs">
            <div className="flex justify-between py-2 border-t border-accent/20 mt-2 text-lg font-bold text-secondary">
              <span>Total</span>
              <span>
                ₹{bill.total.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
        {/* Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center px-8 py-6 bg-[#23232a] border-t border-accent/20">
          <button
            className="py-2 px-6 rounded-full font-bold bg-gradient-to-r from-primary to-accent text-white shadow-card hover:from-accent hover:to-primary transition active:scale-95"
            onClick={() => {
              clearCart();
              navigate("/");
            }}
          >
            Back to Home
          </button>
          <div className="flex flex-col md:flex-row gap-2 mt-3 md:mt-0">
            <button
              className="py-2 px-6 rounded-full font-bold bg-gradient-to-r from-secondary to-primary text-white shadow-card hover:from-primary hover:to-secondary transition active:scale-95"
              onClick={() => window.print()}
            >
              Print Bill
            </button>
            <button
              className="py-2 px-6 rounded-full font-bold bg-gradient-to-r from-accent to-secondary text-white shadow-card hover:from-secondary hover:to-accent transition active:scale-95"
              onClick={downloadBill}
            >
              Download Bill
            </button>
          </div>
        </div>
        <div className="text-center py-3 text-xs text-accent/70 bg-[#23232a] border-t border-accent/10">
          Thank you for shopping with <span className="font-bold text-primary">Devknus</span>!
        </div>
      </div>
    </div>
  );
}

