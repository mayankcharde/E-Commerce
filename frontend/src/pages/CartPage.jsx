import React, { useState } from "react";
import { useCart } from "../components/CartContext";
import EcomButton from "../components/EcomButton";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// Helper to load Razorpay script
function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  // Show form and bill after "Buy Now Products" is clicked
  const [showForm, setShowForm] = useState(false);
  // Show payment button after form is submitted
  const [infoSubmitted, setInfoSubmitted] = useState(false);
  // Add state for payment and order
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState(null);

  // Calculate total in INR (₹)
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Razorpay payment for the whole cart
  const handleCartPayment = async () => {
    if (cart.length === 0) return;
    const amount = total;
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_HOST_URL}/api/payment/order`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ amount }),
      });
      const data = await res.json();
      handlePayment(data.data);
    } catch (error) {
      toast.error("Order creation failed");
    }
  };

  // Add this function to handle payment
  async function handlePayment(paymentOptions) {
    const loaded = await loadRazorpayScript();
    if (!loaded) {
      toast.error("Razorpay SDK failed to load. Are you online?");
      return;
    }
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID || import.meta.env.RAZORPAY_KEY_ID,
      amount: paymentOptions.amount,
      currency: paymentOptions.currency,
      name: "Devknus",
      description: "Cart Payment",
      order_id: paymentOptions.id,
      handler: async (response) => {
        try {
          const res = await fetch(`${import.meta.env.VITE_BACKEND_HOST_URL}/api/payment/verify`, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });
          const verifyData = await res.json();
          if (verifyData.message) {
            toast.success(verifyData.message);
            setPaymentSuccess(true); // Set payment success
            // Do not clear cart yet, wait for order placement
          }
        } catch (error) {
          toast.error("Payment verification failed");
        }
      },
      modal: {
        ondismiss: async function () {
          // User closed Razorpay modal without paying
          await fetch(`${import.meta.env.VITE_BACKEND_HOST_URL}/api/payment/order-failed`, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ orderId }),
          });
          toast.error("Payment was not completed. Order not placed.");
        }
      },
      theme: { color: "#0D9488" },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  // Place order after payment
  const handlePlaceOrder = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_HOST_URL}/api/order/place`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ...userInfo,
          cart,
          total,
        }),
      });
      const data = await res.json();
      if (res.ok && data.orderId) {
        setOrderPlaced(true);
        setOrderId(data.orderId);
        toast.success("Order placed successfully!");
        // Save latest order status for navbar modal
        localStorage.setItem("latestOrderStatus", JSON.stringify({
          orderId: data.orderId,
          position: data.position, // e.g. 3
          eta: data.eta,           // e.g. 15 (minutes)
          updatedAt: Date.now()
        }));
        clearCart();
      } else {
        toast.error(data.message || "Order placement failed");
      }
    } catch (err) {
      toast.error("Order placement failed");
    }
  };

  // Handle user info form submit
  const handleInfoSubmit = async (e) => {
    e.preventDefault();
    if (!userInfo.name || !userInfo.email || !userInfo.phone || !userInfo.address) {
      toast.error("Please fill all fields");
      return;
    }
    // Send info to backend
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_HOST_URL}/api/payment/userinfo`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ...userInfo,
          cart,
          total
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        toast.error(data.message || "Failed to save info");
        return;
      }
      setInfoSubmitted(true);
      toast.success("Information saved! You can now make payment.");
      // Save user info for Navbar order tracking
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
    } catch (err) {
      toast.error("Failed to save info");
    }
  };

  return (
    <div className="pt-28 px-4 min-h-screen bg-gradient-to-br from-[#18181b] via-[#23232a] to-[#18181b] text-white font-body">
      <h1 className="text-4xl font-extrabold mb-10 tracking-wider font-heading bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
        Your Cart
      </h1>
      <Toaster />
      {cart.length === 0 ? (
        <div className="text-accent text-lg">Your cart is empty.</div>
      ) : (
        <>
          {/* Cart Products */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-12">
            {cart.map((item) => (
              <div
                key={item.name}
                className="bg-modern-card rounded-2xl shadow-card border border-accent p-6 flex flex-col items-center transition-transform hover:scale-[1.02]"
              >
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-44 object-cover rounded-xl mb-4 shadow border-b border-accent"
                />
                <div className="font-semibold text-xl mb-2 text-white font-heading">
                  {item.name}
                </div>
                <div className="text-primary font-bold text-2xl mb-2">
                  ₹{item.price.toLocaleString()}
                </div>
                <div className="text-base mb-4 text-accent">
                  Quantity:{" "}
                  <span className="font-semibold text-secondary">{item.quantity}</span>
                </div>
                <EcomButton onClick={() => removeFromCart(item.name)}>
                  Remove
                </EcomButton>
              </div>
            ))}
          </div>
          {/* Buy Now Products button */}
          {!showForm && (
            <div className="flex justify-end mb-8">
              <EcomButton onClick={() => setShowForm(true)}>
                Buy Now Products
              </EcomButton>
            </div>
          )}

          {/* Show form and bill after Buy Now Products */}
          {showForm && (
            <>
              {/* User Info Form */}
              {!infoSubmitted && (
                <form
                  className="max-w-xl mx-auto bg-[#23232a] rounded-2xl shadow-lg border border-accent p-8 mb-10"
                  onSubmit={handleInfoSubmit}
                >
                  <h2 className="text-2xl font-bold mb-6 text-primary">Enter Your Information</h2>
                  <div className="mb-4">
                    <label className="block mb-1 text-accent">Name</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 rounded bg-[#18181b] border border-accent text-white"
                      value={userInfo.name}
                      onChange={e => setUserInfo({ ...userInfo, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-1 text-accent">Email</label>
                    <input
                      type="email"
                      className="w-full px-3 py-2 rounded bg-[#18181b] border border-accent text-white"
                      value={userInfo.email}
                      onChange={e => setUserInfo({ ...userInfo, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-1 text-accent">Phone</label>
                    <input
                      type="tel"
                      className="w-full px-3 py-2 rounded bg-[#18181b] border border-accent text-white"
                      value={userInfo.phone}
                      onChange={e => setUserInfo({ ...userInfo, phone: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-6">
                    <label className="block mb-1 text-accent">Address</label>
                    <textarea
                      className="w-full px-3 py-2 rounded bg-[#18181b] border border-accent text-white"
                      value={userInfo.address}
                      onChange={e => setUserInfo({ ...userInfo, address: e.target.value })}
                      required
                    />
                  </div>
                  <EcomButton type="submit" className="w-full">
                    Save & Continue
                  </EcomButton>
                </form>
              )}

              {/* Bill Summary Section (always visible after Buy Now Products) */}
              <div className="w-full max-w-2xl mx-auto bg-[#23232a] rounded-3xl shadow-2xl border border-accent mb-8 overflow-hidden relative">
                {/* Header */}
                <div className="flex flex-col items-center py-8 px-8 border-b border-accent/30 bg-gradient-to-r from-primary/10 via-[#23232a] to-accent/10">
                  <img
                    src="https://dcassetcdn.com/design_img/979319/121571/121571_5449192_979319_image.jpg"
                    alt="E Store"
                    className="w-16 h-16 mb-2"
                    style={{ filter: "drop-shadow(0 2px 8px #0D948855)" }}
                  />
                  <div className="text-2xl font-extrabold font-heading bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-1 tracking-tight">
                    E Store
                  </div>
                  <div className="text-accent/80 text-xs font-medium tracking-wide">
                    www.Estore.com
                  </div>
                </div>
                {/* Bill Info */}
                <div className="flex flex-col md:flex-row justify-between items-center px-8 py-4 border-b border-accent/20 bg-[#23232a]">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-accent/70">Receipt No.</span>
                    <span className="font-mono text-base font-bold text-primary">
                      {`INV-${String(Math.floor(100000 + Math.random() * 900000))}`}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1 mt-2 md:mt-0">
                    <span className="text-xs text-accent/70">Date & Time</span>
                    <span className="font-mono text-base text-white">{new Date().toLocaleString()}</span>
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
                      {cart.map((item, idx) => (
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
                        ₹{total.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
                {/* Footer */}
                <div className="flex flex-col md:flex-row justify-between items-center px-8 py-6 bg-[#23232a] border-t border-accent/20">
                  <EcomButton
                    className="py-2 px-6 rounded-full font-bold bg-gradient-to-r from-secondary to-primary text-white shadow-card hover:from-primary hover:to-secondary transition active:scale-95"
                    onClick={() => window.print()}
                  >
                    Print Bill
                  </EcomButton>
                  <div className="text-xs text-accent/70 mt-3 md:mt-0">
                    Thank you for shopping with <span className="font-bold text-primary">Devknus</span>!
                  </div>
                </div>
              </div>
              {/* Payment and Clear Cart */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div className="text-2xl font-bold font-heading">
                  Total:{" "}
                  <span className="text-secondary">₹{total.toLocaleString()}</span>
                </div>
                <div className="flex gap-3">
                  <EcomButton onClick={clearCart}>
                    Clear Cart
                  </EcomButton>
                  {/* Only show payment button after info is submitted */}
                  {infoSubmitted && !paymentSuccess && (
                    <EcomButton onClick={handleCartPayment}>
                      Make Payment
                    </EcomButton>
                  )}
                  {/* Show Place Order after payment success */}
                  {paymentSuccess && !orderPlaced && (
                    <EcomButton onClick={handlePlaceOrder}>
                      Place Order
                    </EcomButton>
                  )}
                </div>
              </div>
              {/* Show order placed message and order ID */}
              {orderPlaced && orderId && (
                <div className="mt-6 flex flex-col items-center gap-4">
                  <div className="text-center text-lg text-primary font-bold">
                    Order placed! Your Order ID: <span className="font-mono">{orderId}</span>
                  </div>
                  <EcomButton
                    onClick={() => {
                      // Navigate to order tracking page with orderId and email as query params
                      navigate(`/order-tracking?orderId=${orderId}&email=${encodeURIComponent(userInfo.email)}`);
                    }}
                    className="px-6 py-2 rounded-lg font-semibold bg-gradient-to-r from-primary to-secondary text-white"
                  >
                    View Placed Order
                  </EcomButton>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
