import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function getOrderStatusTimeline(order) {
  // Example status timeline based on order date and dummy logic
  // You can replace this with real status fields from your backend if available
  const created = new Date(order.date);
  const shipped = new Date(created.getTime() + 2 * 24 * 60 * 60 * 1000);
  const outForDelivery = new Date(created.getTime() + 4 * 24 * 60 * 60 * 1000);
  const delivered = new Date(created.getTime() + 6 * 24 * 60 * 60 * 1000);

  // Simulate current status
  const now = new Date();
  let current = 0;
  if (now >= delivered) current = 3;
  else if (now >= outForDelivery) current = 2;
  else if (now >= shipped) current = 1;

  return [
    {
      label: "Order Placed",
      date: created,
      done: true,
      icon: (
        <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" stroke="#0D9488" strokeWidth="2.2" fill="#23232a" />
          <path d="M9 12l2 2 4-4" stroke="#0D9488" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      label: "Shipped",
      date: shipped,
      done: current >= 1,
      icon: (
        <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
          <rect x="3" y="7" width="18" height="10" rx="3" fill="#23232a" stroke="#0D9488" strokeWidth="2"/>
          <path d="M7 17v2M17 17v2" stroke="#F472B6" strokeWidth="2"/>
        </svg>
      ),
    },
    {
      label: "Out for Delivery",
      date: outForDelivery,
      done: current >= 2,
      icon: (
        <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
          <rect x="3" y="7" width="18" height="10" rx="3" fill="#23232a" stroke="#0D9488" strokeWidth="2"/>
          <circle cx="7" cy="17" r="2" fill="#F472B6" />
          <circle cx="17" cy="17" r="2" fill="#F472B6" />
        </svg>
      ),
    },
    {
      label: "Delivered",
      date: delivered,
      done: current >= 3,
      icon: (
        <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" stroke="#0D9488" strokeWidth="2.2" fill="#23232a" />
          <path d="M9 12l2 2 4-4" stroke="#F472B6" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
  ];
}

export default function OrderTracking() {
  const [email, setEmail] = useState("");
  const [order, setOrder] = useState(null);
  const [previousOrders, setPreviousOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(null);

  const location = useLocation();
  const products = location.state?.products || [];
  const payment = location.state?.payment || null;

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const qEmail = params.get("email");
    if (qEmail) setEmail(qEmail);
  }, [location.search]);

  const handleTrackOrder = async (e) => {
    e.preventDefault();
    setOrder(null);
    setNotFound(null);
    setPreviousOrders([]);
    setLoading(true);
    try {
      // Fetch latest order for this email
      const res = await fetch(`${import.meta.env.VITE_BACKEND_HOST_URL}/api/payment/latest-order?email=${encodeURIComponent(email)}`);
      const data = await res.json();
      if (res.ok && data.order) {
        setOrder(data.order);
      } else {
        setNotFound(data.message || "Order not found.");
      }
      // Fetch all previous orders for this email
      const prevRes = await fetch(`${import.meta.env.VITE_BACKEND_HOST_URL}/api/payment/all-orders?email=${encodeURIComponent(email)}`);
      const prevData = await prevRes.json();
      if (prevRes.ok && Array.isArray(prevData.orders)) {
        setPreviousOrders(prevData.orders);
      }
    } catch (err) {
      setNotFound("Failed to fetch order status.");
    }
    setLoading(false);
  };

  // If navigated from Navbar, show latest order directly
  useEffect(() => {
    if (products.length > 0 && payment) {
      setOrder({ ...payment, cart: products });
    }
  }, [products, payment]);

  const timeline = order ? getOrderStatusTimeline(order) : [];

  // Status badge helper
  function getStatusBadge(status) {
    if (status === "placed" || status === "success") {
      return <span className="ml-2 px-3 py-1 rounded-full bg-green-600/80 text-white text-xs font-bold">Order Placed</span>;
    }
    if (status === "failed") {
      return <span className="ml-2 px-3 py-1 rounded-full bg-red-600/80 text-white text-xs font-bold">Payment Failed</span>;
    }
    return <span className="ml-2 px-3 py-1 rounded-full bg-yellow-500/80 text-white text-xs font-bold">Pending Payment</span>;
  }

  return (
    <div className="pt-28 min-h-screen bg-gradient-to-br from-[#18181b] via-[#23232a] to-[#18181b] text-white font-body flex flex-col items-center">
      <div className="w-full max-w-3xl mx-auto bg-modern-card glass rounded-3xl shadow-card border border-primary/30 px-8 py-12">
        {/* Modern Logo */}
        <div className="flex flex-col items-center mb-6">
          <svg
            width={56}
            height={56}
            viewBox="0 0 56 56"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mb-2 drop-shadow-[0_0_16px_#0D9488cc]"
          >
            <circle cx="28" cy="28" r="26" fill="#0D9488" />
            <text x="50%" y="56%" textAnchor="middle" fill="#fff" fontSize="32" fontWeight="bold" fontFamily="Inter, Arial, sans-serif" dy=".3em">E</text>
          </svg>
          <span className="text-3xl font-extrabold font-heading bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent tracking-wider">
            Order Tracking
          </span>
        </div>
        {/* Track Order Form */}
        {!order && (
          <div className="text-accent text-base mb-8 text-center">
            <p>
              Enter your <span className="text-primary font-semibold">Email</span> to track your order status.<br />
              For any issues, contact our support team.
            </p>
            <form className="flex flex-col gap-4 mt-6 max-w-sm mx-auto" onSubmit={handleTrackOrder}>
              <input
                type="email"
                placeholder="Email"
                className="px-4 py-2 rounded-lg border border-accent bg-[#18181b] text-white focus:outline-none focus:ring-2 focus:ring-primary transition"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-primary to-secondary text-white px-4 py-2 rounded-lg font-semibold hover:from-secondary hover:to-primary transition shadow-card border border-primary"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-primary" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="#0D9488" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="#F472B6" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Checking...
                  </span>
                ) : "Track Order"}
              </button>
            </form>
            {notFound && (
              <div className="mt-8 flex flex-col items-center">
                <div className="text-lg text-primary font-semibold">{notFound}</div>
              </div>
            )}
          </div>
        )}

        {/* Show order details and timeline */}
        {order && (
          <div>
            <div className="mb-8">
              <div className="text-xl font-bold text-primary mb-2 text-center flex items-center justify-center">
                Order Details
                {getStatusBadge(order.status)}
              </div>
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4">
                <div>
                  <div className="text-accent text-sm">Order placed on</div>
                  <div className="font-mono text-lg text-white">{new Date(order.date).toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-accent text-sm">Shipping to</div>
                  <div className="font-semibold text-white">{order.name}</div>
                  <div className="text-accent text-sm">{order.address}</div>
                  <div className="text-accent text-sm">{order.phone}</div>
                </div>
                <div>
                  <div className="text-accent text-sm">Email</div>
                  <div className="font-mono text-white">{order.email}</div>
                </div>
              </div>
              {/* Show full delivery address in a modern card */}
              <div className="bg-[#23232a] rounded-xl border border-primary/30 px-6 py-4 mb-4 shadow-card">
                <div className="text-accent text-sm mb-1 font-semibold">Delivery Address</div>
                <div className="text-white font-mono text-base break-words">{order.address}</div>
              </div>
              <div className="text-lg font-semibold text-secondary text-right">
                Total Paid: <span className="text-primary">₹{order.total?.toLocaleString?.() ?? order.total}</span>
              </div>
            </div>
            {/* Timeline */}
            <div className="mb-10">
              <div className="text-xl font-bold text-primary mb-4">Order Status</div>
              <div className="flex flex-col gap-6">
                {timeline.map((step, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className={`flex-shrink-0 ${step.done ? "" : "opacity-40"}`}>{step.icon}</div>
                    <div>
                      <div className={`font-semibold text-lg ${step.done ? "text-primary" : "text-accent/60"}`}>{step.label}</div>
                      <div className="text-xs text-accent/70">{step.date.toLocaleString()}</div>
                    </div>
                    {idx < timeline.length - 1 && (
                      <div className="flex-1 border-t border-dashed border-accent/30 mx-4"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            {/* Products Table */}
            <div className="mb-8">
              <div className="text-xl font-bold text-primary mb-2 text-center">Products</div>
              <div className="overflow-x-auto">
                <table className="w-full text-left mb-4 rounded-xl overflow-hidden">
                  <thead>
                    <tr className="border-b border-accent/30 text-secondary text-xs uppercase tracking-wider">
                      <th className="py-2 px-2 font-semibold">Product</th>
                      <th className="py-2 px-2 font-semibold text-center">Qty</th>
                      <th className="py-2 px-2 font-semibold text-right">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.cart.map((item, idx) => (
                      <tr key={idx} className="border-b border-accent/10 hover:bg-[#18181b]/60 transition">
                        <td className="py-3 px-2 flex items-center gap-3">
                          <img src={item.img} alt={item.name} className="w-10 h-10 rounded-lg object-cover border border-accent/30" />
                          <span className="font-semibold text-white">{item.name}</span>
                        </td>
                        <td className="py-3 px-2 text-center">{item.quantity || 1}</td>
                        <td className="py-3 px-2 text-right">₹{item.price?.toLocaleString?.() ?? item.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            {/* Delivery message */}
            <div className="text-center text-accent text-base mt-8">
              {order.status === "failed" ? (
                <span className="text-red-400 font-bold">Payment failed or cancelled. Please try again or contact support.</span>
              ) : timeline[timeline.length - 1].done && order.status === "placed" ? (
                <span className="text-green-400 font-bold">Your order has been delivered!</span>
              ) : order.status === "pending" ? (
                <span className="text-yellow-400 font-bold">Order not paid yet. Complete payment to place your order.</span>
              ) : (
                <span>Your order is on the way. For help, email <a href="mailto:mayankcharde2@gmail.com" className="text-primary hover:underline">mayankcharde2@gmail.com</a></span>
              )}
            </div>
          </div>
        )}

        {/* Previous Orders Section */}
        {previousOrders.length > 0 && (
          <div className="mt-12">
            <div className="text-xl font-bold text-primary mb-4 text-center">Previous Orders</div>
            <div className="flex flex-col gap-6">
              {previousOrders
                .filter(o => !order || o._id !== order._id)
                .map((prev, idx) => (
                <div key={prev._id || idx} className="bg-[#23232a] rounded-xl border border-primary/20 px-6 py-4 shadow-card">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 mb-2">
                    <div>
                      <span className="text-accent text-xs">Order Date:</span>{" "}
                      <span className="font-mono text-white">{new Date(prev.date).toLocaleString()}</span>
                      {getStatusBadge(prev.status)}
                    </div>
                    <div>
                      <span className="text-accent text-xs">Total:</span>{" "}
                      <span className="text-primary font-semibold">₹{prev.total?.toLocaleString?.() ?? prev.total}</span>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left mb-2 rounded-xl overflow-hidden">
                      <thead>
                        <tr className="border-b border-accent/30 text-secondary text-xs uppercase tracking-wider">
                          <th className="py-2 px-2 font-semibold">Product</th>
                          <th className="py-2 px-2 font-semibold text-center">Qty</th>
                          <th className="py-2 px-2 font-semibold text-right">Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {prev.cart.map((item, i) => (
                          <tr key={i} className="border-b border-accent/10 hover:bg-[#18181b]/60 transition">
                            <td className="py-3 px-2 flex items-center gap-3">
                              <img src={item.img} alt={item.name} className="w-10 h-10 rounded-lg object-cover border border-accent/30" />
                              <span className="font-semibold text-white">{item.name}</span>
                            </td>
                            <td className="py-3 px-2 text-center">{item.quantity || 1}</td>
                            <td className="py-3 px-2 text-right">₹{item.price?.toLocaleString?.() ?? item.price}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="text-xs text-accent/70 mt-1">
                    Delivery Address: <span className="font-mono">{prev.address}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="text-center text-accent text-sm mt-8">
          For order help, email <a href="mailto:mayankcharde2@gmail.com" className="text-primary hover:underline">mayankcharde2@gmail.com</a>
        </div>
      </div>
    </div>
  );
}

