import React from "react";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    key: "automotive",
    title: "Automotive",
    description: "Car accessories and tools for enthusiasts",
    img: "https://ptc-p-001.sitecorecontenthub.cloud/api/public/content/b5652be4bd904cf8a51005df000c5cd4?v=32324506",
  },
  {
    key: "beauty-health",
    title: "Beauty & Health",
    description: "Personal care, wellness, and beauty essentials",
    img: "https://with.tips/wp-content/uploads/2018/12/health-and-beauty-with-tips.jpeg",
  },
  {
    key: "books-stationery",
    title: "Books & Stationery",
    description: "Books, journals, and office supplies",
    img: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=400&q=80",
  },
  {
    key: "electronics",
    title: "Electronics",
    description: "Latest tech gadgets and electronics",
    img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80",
  },
  {
    key: "fashion",
    title: "Fashion",
    description: "Trendy clothing and accessories",
    img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80",
  },
  {
    key: "home-garden",
    title: "Home & Garden",
    description: "Everything for your home and garden",
    img: "https://www.archizy.com/media/Vover%20Image/27.jpg",
  },
  {
    key: "sports-outdoors",
    title: "Sports & Outdoors",
    description: "Gear for active lifestyle",
    img: "https://opaltrading.com/wp-content/uploads/2021/12/sport-917899790.jpg",
  },
  {
    key: "toys-kids",
    title: "Toys & Kids",
    description: "Fun and learning for children of all ages",
    img: "https://images.indianexpress.com/2019/09/toys.jpg",
  },
];

export default function Categories() {
  const navigate = useNavigate();

  return (
    <div className="pt-28 px-4 min-h-screen bg-gradient-to-br from-[#18181b] via-[#23232a] to-[#18181b] text-white">
      <h1 className="text-4xl font-ext0rabold mb-10 tracking-tight bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
        Shop by Category
      </h1>
      <p className="text-accent mb-10 font-medium text-lg max-w-2xl">
        Explore our curated categories. Click a category to view all products in that section.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {categories.map((cat) => (
          <div
            key={cat.key}
            className="group bg-modern-card rounded-2xl shadow-card border border-accent flex flex-col items-center transition-transform duration-200 hover:scale-105 hover:shadow-[0_8px_32px_0_rgba(124,63,44,0.18)] hover:bg-gradient-to-br hover:from-[#3d2320] hover:to-[#23232a] active:scale-95 cursor-pointer overflow-hidden hover:border-[#7c3f2c]"
            style={{ minHeight: 320 }}
            onClick={() => navigate(`/category/${cat.key}`)}
            tabIndex={0}
            role="button"
            aria-label={`View ${cat.title} category`}
            onKeyDown={e => { if (e.key === "Enter") navigate(`/category/${cat.key}`); }}
          >
            <div className="relative w-full">
              <img
                src={cat.img}
                alt={cat.title}
                className="w-full h-44 object-cover transition-transform duration-300 group-hover:scale-110 border-b border-accent"
              />
              <div className="absolute top-3 right-3 bg-primary text-white text-xs px-4 py-1 rounded-full shadow-card opacity-0 group-hover:opacity-100 transition font-semibold tracking-wide border border-primary">
                Explore
              </div>
            </div>
            <div className="p-6 flex flex-col items-center w-full">
              <div className="font-bold text-lg mb-1 text-white font-heading tracking-wide">
                {cat.title}
              </div>
              <div className="text-accent text-sm mb-3 text-center">
                {cat.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
