import React from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../components/CartContext";
import toast, { Toaster } from "react-hot-toast";

// Example products for each category
const productsByCategory = {
  electronics: [
    {
      name: "Bluetooth Speaker",
      img: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=400&q=80",
      price: 79.99,
    },
    {
      name: "Wireless Charger",
      img: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
      price: 49.99,
    },
  ],
  fashion: [
    {
      name: "Trendy Jacket",
      img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80",
      price: 59.99,
    },
    {
      name: "Smartphone Case",
      img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80",
      price: 24.99,
    },
  ],
  "home-garden": [
    {
      name: "Decorative Plant",
      img: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
      price: 19.99,
    },
    {
      name: "Modern Lamp",
      img: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
      price: 39.99,
    },
  ],
  "sports-outdoors": [
    {
      name: "Running Shoes",
      img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
      price: 89.99,
    },
    {
      name: "Fitness Tracker",
      img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
      price: 129.99,
    },
  ],
  automotive: [
    // Placeholder, will be replaced by custom rendering
  ],
};

const categoryTitles = {
  electronics: "Electronics",
  fashion: "Fashion",
  "home-garden": "Home & Garden",
  "sports-outdoors": "Sports & Outdoors",
  automotive: "Automotive",
};

import AutomotiveCard1 from "../components/automative/automotiveCart1.jsx";
import AutomotiveCard2 from "../components/automative/automoticeCart2.jsx";
import AutomotiveCard3 from "../components/automative/automotiveCart3.jsx";
import AutomotiveCard4 from "../components/automative/automotiveCart4.jsx";
import AutomotiveCard5 from "../components/automative/automotiveCart5.jsx";

// Add imports for beauty and books cards
import BeautyCard1 from "../components/beauty & health/beautyCard.jsx";
import BeautyCard2 from "../components/beauty & health/beautyCard2.jsx";
import BeautyCard3 from "../components/beauty & health/beautyCard3.jsx";
import BeautyCard4 from "../components/beauty & health/beautyCard4.jsx";
import BeautyCard5 from "../components/beauty & health/beautyCard5.jsx";

import BookCard1 from "../components/books & stationary/bookCard1.jsx";
import BookCard2 from "../components/books & stationary/bookCard2.jsx";
import BookCard3 from "../components/books & stationary/bookCard3.jsx";
import BookCard4 from "../components/books & stationary/bookCard4.jsx";
import BookCard5 from "../components/books & stationary/bookCard5.jsx";

// Import Home & Garden cards
import HomeCard1 from "../components/home & garden/home1.jsx";
import HomeCard2 from "../components/home & garden/home2.jsx";
import HomeCard3 from "../components/home & garden/home3.jsx";
import HomeCard4 from "../components/home & garden/home4.jsx";
import HomeCard5 from "../components/home & garden/home5.jsx";

// Import Sports & Outdoors cards
import SportsCard1 from "../components/sports & outdoors/sports1.jsx";
import SportsCard2 from "../components/sports & outdoors/sports2.jsx";
import SportsCard3 from "../components/sports & outdoors/sports3.jsx";
import SportsCard4 from "../components/sports & outdoors/sports4.jsx";
import SportsCard5 from "../components/sports & outdoors/sports5.jsx";

// Import Toys & Kids cards
import ToyCard1 from "../components/toys & kids/toy1.jsx";
import ToyCard2 from "../components/toys & kids/toy2.jsx";
import ToyCard3 from "../components/toys & kids/toy3.jsx";
import ToyCard4 from "../components/toys & kids/toy4.jsx";
import ToyCard5 from "../components/toys & kids/toy5.jsx";

// Modern Automotive Card Grid (used for electronics, fashion, and automotive)
function AutomotiveCardGrid() {
  const automotiveCards = [
    {
      Card: AutomotiveCard1,
      name: "Smart Tire Pressure Monitor",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEx-gt-ropJA8wK8LLTklEo72PmQN5AEwLtw&s",
      price: 1,
      oldPrice: 2499,
      category: "Safety",
      rating: 4.8,
      reviews: 95,
      label: "New",
      desc: "Real-time tire pressure monitoring for safer journeys."
    },
    {
      Card: AutomotiveCard2,
      name: "Wireless Car Charger",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJ6MNft987SnFPsqDYUjKBxPQ3OWqtIH5LQg&s",
      price: 1,
      oldPrice: 1999,
      category: "Accessories",
      rating: 4.6,
      reviews: 120,
      label: "Popular",
      desc: "Fast wireless charging for your phone on the go."
    },
    {
      Card: AutomotiveCard3,
      name: "Car Air Purifier",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6aJc6TthZyH_v3sY6iP_XIkKZ9y2krdHg2A&s",
      price: 1,
      oldPrice: 1799,
      category: "Health",
      rating: 4.7,
      reviews: 80,
      label: "",
      desc: "Breathe clean air with this compact purifier."
    },
    {
      Card: AutomotiveCard4,
      name: "Magnetic Phone Holder",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnezIBNCRx9M7X6iwf-JLneo4GldONp_KFdQ&s",
      price: 1,
      oldPrice: 899,
      category: "Mounts",
      rating: 4.5,
      reviews: 140,
      label: "",
      desc: "Securely mount your phone for easy navigation."
    },
    {
      Card: AutomotiveCard5,
      name: "Portable Jump Starter",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2AUa81MtY9jtb2JzA5avcxdRUF84w-y5vKA&s",
      price: 1,
      oldPrice: 3499,
      category: "Emergency",
      rating: 4.9,
      reviews: 60,
      label: "Best Seller",
      desc: "Jump start your car anytime, anywhere with ease."
    }
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {automotiveCards.map((card, idx) => {
        const { Card, ...props } = card;
        return (
          <Card
            key={idx}
            name={props.name}
            img={props.img}
            price={props.price}
            oldPrice={props.oldPrice}
            category={props.category}
            rating={props.rating}
            reviews={props.reviews}
            label={props.label}
            desc={props.desc}
          />
        );
      })}
    </div>
  );
}


// Modern Beauty Card Grid
function BeautyCardGrid() {
  const beautyCards = [
    {
      Card: BeautyCard1,
      name: "Hydrating Face Serum",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh4WQZfvivG5VJtFVzwwmIazI123XM1aZIcw&s",
      price: 1,
      oldPrice: 1299,
      category: "Skincare",
      rating: 4.8,
      reviews: 210,
      label: "Best Seller",
      desc: "Nourish your skin with our top-rated hydrating serum."
    },
    {
      Card: BeautyCard2,
      name: "Organic Lip Balm",
      img: "https://files.organicharvest.in/site-images/800x800/8906080033469-1.jpg",
      price: 1,
      oldPrice: 299,
      category: "Lip Care",
      rating: 4.6,
      reviews: 98,
      label: "Natural",
      desc: "Keep your lips soft and healthy with organic ingredients."
    },
    {
      Card: BeautyCard3,
      name: "Aloe Vera Gel",
      img: "https://m.media-amazon.com/images/I/71er2+H2+1L.jpg",
      price: 1,
      oldPrice: 499,
      category: "Moisturizer",
      rating: 4.7,
      reviews: 134,
      label: "",
      desc: "Soothing aloe gel for face and body hydration."
    },
    {
      Card: BeautyCard4,
      name: "Vitamin C Face Wash",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLWRiuQLNRw63z_xf123IUcA8vpA5hwTkeiA&s",
      price: 1,
      oldPrice: 599,
      category: "Cleanser",
      rating: 4.5,
      reviews: 76,
      label: "",
      desc: "Brighten your skin with gentle vitamin C cleansing."
    },
    {
      Card: BeautyCard5,
      name: "Sunscreen SPF 50",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLWRiuQLNRw63z_xf123IUcA8vpA5hwTkeiA&s",
      price: 1,
      oldPrice: 899,
      category: "Sun Care",
      rating: 4.9,
      reviews: 156,
      label: "SPF 50",
      desc: "Protect your skin from harmful UV rays all day."
    }
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {beautyCards.map((card, idx) => {
        const { Card, ...props } = card;
        return (
          <Card
            key={idx}
            name={props.name}
            img={props.img}
            price={props.price}
            oldPrice={props.oldPrice}
            category={props.category}
            rating={props.rating}
            reviews={props.reviews}
            label={props.label}
            desc={props.desc}
          />
        );
      })}
    </div>
  );
}




// Modern Books Card Grid
function BooksCardGrid() {
  const booksCards = [
    {
      Card: BookCard1,
      name: "The Art of Coding",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCEHzDlBnGvHSTlQiPY95dKuik7BNi9VPFwQ&s",
      price: 1,
      oldPrice: 899,
      category: "Programming",
      rating: 4.9,
      reviews: 321,
      label: "New",
      desc: "A must-read for every aspiring developer."
    },
    {
      Card: BookCard2,
      name: "Classic Journal",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT48QKRq0MZYiPrm6Ek4rd3BfXU5fLELcuYIg&s",
      price: 1,
      oldPrice: 399,
      category: "Stationery",
      rating: 4.7,
      reviews: 88,
      label: "",
      desc: "Premium quality journal for notes and sketches."
    },
    {
      Card: BookCard3,
      name: "Office Essentials Set",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTAYgtYOL95UhzhGy9f1L4BI8TG5Ij5AZ3Dg&s",
      price: 1,
      oldPrice: 599,
      category: "Office",
      rating: 4.6,
      reviews: 54,
      label: "Popular",
      desc: "All-in-one stationery set for your workspace."
    },
    {
      Card: BookCard4,
      name: "Children's Story Book",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSti9AScQDkE55mZeiJCTKGo6DkkDzyMbtZuA&s",
      price: 1,
      oldPrice: 499,
      category: "Kids",
      rating: 4.8,
      reviews: 112,
      label: "",
      desc: "Delightful stories for young readers."
    },
    {
      Card: BookCard5,
      name: "Premium Pen Set",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTC9sHCSxKdX-ubAUSNlIoBIoj3QG8HVYO0Ug&s",
      price: 1,
      oldPrice: 399,
      category: "Writing",
      rating: 4.5,
      reviews: 67,
      label: "",
      desc: "Smooth writing experience with elegant design."
    }
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {booksCards.map((card, idx) => {
        const { Card, ...props } = card;
        return (
          <Card
            key={idx}
            name={props.name}
            img={props.img}
            price={props.price}
            oldPrice={props.oldPrice}
            category={props.category}
            rating={props.rating}
            reviews={props.reviews}
            label={props.label}
            desc={props.desc}
          />
        );
      })}
    </div>
  );
}

// Modern Electronics Card Grid
function ElectronicsCardGrid() {
  const { addToCart } = useCart();
  const [addingIdx, setAddingIdx] = React.useState(null);
  const electronicsCards = [
    {
      name: "Bluetooth Speaker",
      img: "https://mobilla.in/cdn/shop/collections/Mrock_101-1_533x.jpg?v=1702109941",
      price: 1,
      oldPrice: 3499,
      category: "Audio",
      rating: 4.7,
      reviews: 112,
      label: "Sale",
      desc: "Portable, powerful sound for your music on the go."
    },
    {
      name: "Wireless Earbuds",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCow_fVtUkSQi0NJtwVdXUFcLjPS1MyiK8CA&s",
      price: 1,
      oldPrice: 3999,
      category: "Audio",
      rating: 4.6,
      reviews: 98,
      label: "Trending",
      desc: "Crystal clear sound, long battery life, and touch controls."
    },
    {
      name: "Smart Watch",
      img: "https://m.media-amazon.com/images/I/61SagNg1+aL._UF1000,1000_QL80_.jpg",
      price: 1,
      oldPrice: 5999,
      category: "Wearable",
      rating: 4.8,
      reviews: 156,
      label: "New",
      desc: "Track your fitness, notifications, and more."
    },
    {
      name: "Wireless Charger",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIdM6EA6oYbiKtK_8u5IIl_BbbVvaoU1Pn4Q&s",
      price: 1,
      oldPrice: 1499,
      category: "Accessories",
      rating: 4.5,
      reviews: 76,
      label: "",
      desc: "Fast wireless charging for all Qi-enabled devices."
    },
    {
      name: "Action Camera",
      img: "https://djiindiashop.com/cdn/shop/files/5_fe8087a6-5f20-407e-b118-efcd7e1021ea.jpg?v=1726814803&width=1280",
      price: 1,
      oldPrice: 7999,
      category: "Camera",
      rating: 4.7,
      reviews: 134,
      label: "",
      desc: "Capture your adventures in stunning 4K."
    }
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {electronicsCards.map((p, idx) => (
        <div
          key={idx}
          className="group bg-modern-card rounded-2xl shadow-card border border-accent flex flex-col items-center transition-transform duration-200 hover:scale-105 hover:shadow-[0_8px_32px_0_rgba(124,63,44,0.18)] hover:bg-gradient-to-br hover:from-[#3d2320] hover:to-[#23232a] active:scale-95 cursor-pointer overflow-hidden hover:border-[#7c3f2c]"
          style={{ minHeight: 340 }}
        >
          <div className="relative w-full">
            <img
              src={p.img}
              alt={p.name}
              loading="lazy"
              className="w-full h-44 object-cover transition-transform duration-300 group-hover:scale-110 border-b border-accent"
            />
            {p.label && (
              <div className="absolute top-3 left-3 bg-primary text-white text-xs px-4 py-1 rounded-full shadow-card font-semibold tracking-wide border border-primary">
                {p.label}
              </div>
            )}
          </div>
          <div className="p-6 flex flex-col items-center w-full">
            <div className="font-bold text-lg mb-1 text-white font-heading tracking-wide">
              {p.name}
            </div>
            <div className="text-accent text-sm mb-2 text-center">{p.desc}</div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-primary/20 text-primary px-2 py-0.5 rounded-full text-xs font-semibold">{p.category}</span>
              <span className="flex items-center gap-1 text-yellow-400 font-semibold text-xs">
                <svg width="14" height="14" fill="currentColor" className="inline" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.454a1 1 0 00-1.175 0l-3.38 2.454c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z"/></svg>
                {p.rating}
              </span>
              <span className="text-accent text-xs">({p.reviews})</span>
            </div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-primary font-bold text-xl">₹{p.price}</span>
              <span className="line-through text-secondary text-base">₹{p.oldPrice}</span>
            </div>
            <button
              className={`flex-1 py-1 px-2 rounded-full font-bold border-none focus:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-btn bg-gradient-to-r from-pink-500 to-red-500 text-white hover:from-red-500 hover:to-pink-500 hover:scale-105 active:scale-95 text-sm w-full ${
                addingIdx === idx ? "opacity-60 pointer-events-none" : ""
              }`}
              disabled={addingIdx === idx}
              onClick={async () => {
                setAddingIdx(idx);
                addToCart(p);
                toast.success("Added to cart!");
                setTimeout(() => setAddingIdx(null), 400); // brief disable for smoothness
              }}
            >
              {addingIdx === idx ? "Adding..." : "Add to Cart"}
            </button>
            <Toaster />
          </div>
        </div>
      ))}
    </div>
  );
}

// Modern Fashion Card Grid
function FashionCardGrid() {
  const { addToCart } = useCart();
  const [addingIdx, setAddingIdx] = React.useState(null);
  const fashionCards = [
    {
      name: "Trendy Jacket",
      img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80",
      price: 1,
      oldPrice: 3999,
      category: "Outerwear",
      rating: 4.8,
      reviews: 87,
      label: "Hot",
      desc: "Stay warm and stylish with this season's must-have jacket."
    },
    {
      name: "Classic Sneakers",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKEgG8C3kZWEua93cXod9dZa_IdBHzPbS6Hw&s",
      price: 1,
      oldPrice: 2999,
      category: "Footwear",
      rating: 4.7,
      reviews: 112,
      label: "",
      desc: "Comfortable, versatile sneakers for every occasion."
    },
    {
      name: "Designer Handbag",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcpIW9uXfST-GLgD_IUU1kpphV2O7HQLhszQ&s",
      price: 1,
      oldPrice: 5999,
      category: "Accessories",
      rating: 4.9,
      reviews: 65,
      label: "New",
      desc: "Elevate your look with this elegant designer handbag."
    },
    {
      name: "Summer Dress",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVPcfG-5CaP_WHTuPEwfOs15PJGBYAmqtHfQ&s",
      price: 1,
      oldPrice: 2199,
      category: "Apparel",
      rating: 4.6,
      reviews: 73,
      label: "",
      desc: "Lightweight, breezy dress perfect for sunny days."
    },
    {
      name: "Leather Belt",
      img: "https://imagescdn.peterengland.com/img/app/product/3/39691909-14204120.jpg?auto=format&w=390",
      price: 1,
      oldPrice: 1299,
      category: "Accessories",
      rating: 4.5,
      reviews: 41,
      label: "",
      desc: "Premium leather belt for a sharp, classic finish."
    }
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {fashionCards.map((p, idx) => (
        <div
          key={idx}
          className="group bg-modern-card rounded-2xl shadow-card border border-accent flex flex-col items-center transition-transform duration-200 hover:scale-105 hover:shadow-[0_8px_32px_0_rgba(124,63,44,0.18)] hover:bg-gradient-to-br hover:from-[#3d2320] hover:to-[#23232a] active:scale-95 cursor-pointer overflow-hidden hover:border-[#7c3f2c]"
          style={{ minHeight: 340 }}
        >
          <div className="relative w-full">
            <img
              src={p.img}
              alt={p.name}
              loading="lazy"
              className="w-full h-44 object-cover transition-transform duration-300 group-hover:scale-110 border-b border-accent"
            />
            {p.label && (
              <div className="absolute top-3 left-3 bg-primary text-white text-xs px-4 py-1 rounded-full shadow-card font-semibold tracking-wide border border-primary">
                {p.label}
              </div>
            )}
          </div>
          <div className="p-6 flex flex-col items-center w-full">
            <div className="font-bold text-lg mb-1 text-white font-heading tracking-wide">
              {p.name}
            </div>
            <div className="text-accent text-sm mb-2 text-center">{p.desc}</div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-primary/20 text-primary px-2 py-0.5 rounded-full text-xs font-semibold">{p.category}</span>
              <span className="flex items-center gap-1 text-yellow-400 font-semibold text-xs">
                <svg width="14" height="14" fill="currentColor" className="inline" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.454a1 1 0 00-1.175 0l-3.38 2.454c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z"/></svg>
                {p.rating}
              </span>
              <span className="text-accent text-xs">({p.reviews})</span>
            </div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-primary font-bold text-xl">₹{p.price}</span>
              <span className="line-through text-secondary text-base">₹{p.oldPrice}</span>
            </div>
            <button
              className={`flex-1 py-1 px-2 rounded-full font-bold border-none focus:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-btn bg-gradient-to-r from-pink-500 to-red-500 text-white hover:from-red-500 hover:to-pink-500 hover:scale-105 active:scale-95 text-sm w-full ${
                addingIdx === idx ? "opacity-60 pointer-events-none" : ""
              }`}
              disabled={addingIdx === idx}
              onClick={async () => {
                setAddingIdx(idx);
                addToCart(p);
                toast.success("Added to cart!");
                setTimeout(() => setAddingIdx(null), 400); // brief disable for smoothness
              }}
            >
              {addingIdx === idx ? "Adding..." : "Add to Cart"}
            </button>
            <Toaster />
          </div>
        </div>
      ))}
    </div>
  );
}

// Home & Garden Card Grid
function HomeGardenCardGrid() {
  const homeCards = [
    {
      Card: HomeCard1,
      name: "Decorative Plant",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQouK4CoQmphrWQdG06g2NWg1J5-8FxcTiVvw&s",
      price: 1,
      oldPrice: 799,
      category: "Plants",
      rating: 4.8,
      reviews: 120,
      desc: "Bring nature indoors with this beautiful decorative plant."
    },
    {
      Card: HomeCard2,
      name: "Modern Lamp",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8LDlKxpeJNFpPhafUzPsHG-WxCG5AWTPFQg&s",
      price: 1,
      oldPrice: 1299,
      category: "Lighting",
      rating: 4.7,
      reviews: 98,
      desc: "Brighten your space with this stylish modern lamp."
    },
    {
      Card: HomeCard3,
      name: "Wall Art Set",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrglcLmBMUac_dCt6E-kvWj13HLMnhvcNVLQ&s",
      price: 1,
      oldPrice: 1799,
      category: "Decor",
      rating: 4.6,
      reviews: 76,
      desc: "Add personality to your home with this wall art set."
    },
    {
      Card: HomeCard4,
      name: "Kitchen Organizer",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUva2CNZ3oL6kmRzQ5vf2S7dcJoSm_eM-zMw&s",
      price: 1,
      oldPrice: 899,
      category: "Kitchen",
      rating: 4.5,
      reviews: 54,
      desc: "Keep your kitchen tidy with this smart organizer."
    },
    {
      Card: HomeCard5,
      name: "Garden Tool Kit",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6a8q_fOAxcFNsYD43jYQBuihNuuv-iwhOgQ&s",
      price: 1,
      oldPrice: 1199,
      category: "Garden",
      rating: 4.9,
      reviews: 88,
      desc: "Everything you need for your garden in one kit."
    }
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {homeCards.map((card, idx) => {
        const { Card, ...props } = card;
        return <Card key={idx} {...props} />;
      })}
    </div>
  );
}

// Sports & Outdoors Card Grid
function SportsCardGrid() {
  const sportsCards = [
    {
      Card: SportsCard1,
      name: "Running Shoes",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7pqHTmC9A4L6cow9YHnuUEPGKh_lfQMAOBQ&s",
      price: 1,
      oldPrice: 2499,
      category: "Footwear",
      rating: 4.8,
      reviews: 210,
      desc: "Lightweight running shoes for maximum comfort."
    },
    {
      Card: SportsCard2,
      name: "Fitness Tracker",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaHl1XIPyeFzCkuX_vrCZ8KEQHQ7wkTB0LOg&s",
      price: 1,
      oldPrice: 2999,
      category: "Wearable",
      rating: 4.7,
      reviews: 134,
      desc: "Track your activity and health with this smart band."
    },
    {
      Card: SportsCard3,
      name: "Yoga Mat",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXHO7DplmYzFaKC75asMqHpLK02pezQeP2_A&s",
      price: 1,
      oldPrice: 899,
      category: "Accessories",
      rating: 4.6,
      reviews: 98,
      desc: "Non-slip yoga mat for all your workouts."
    },
    {
      Card: SportsCard4,
      name: "Dumbbell Set",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbXay9n0rnItjhbvPAzqaozLnsy1h0t8n7kg&s",
      price: 1,
      oldPrice: 1999,
      category: "Equipment",
      rating: 4.5,
      reviews: 76,
      desc: "Build strength with this adjustable dumbbell set."
    },
    {
      Card: SportsCard5,
      name: "Sports Water Bottle",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS89oy6ZOQezcQE5az4xcmZHFCp2XoIUL3o_g&s",
      price: 1,
      oldPrice: 499,
      category: "Hydration",
      rating: 4.9,
      reviews: 156,
      desc: "Stay hydrated with this leak-proof sports bottle."
    }
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {sportsCards.map((card, idx) => {
        const { Card, ...props } = card;
        return <Card key={idx} {...props} />;
      })}
    </div>
  );
}

// Toys & Kids Card Grid
function ToysCardGrid() {
  const toyCards = [
    {
      Card: ToyCard1,
      name: "Building Blocks Set",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLaDfKDVXbgEqfxCKPYgwG_SruYLW1J2yEkg&s",
      price: 1,
      oldPrice: 999,
      category: "Blocks",
      rating: 4.8,
      reviews: 120,
      desc: "Creative building blocks for endless fun."
    },
    {
      Card: ToyCard2,
      name: "Remote Control Car",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRStQWK0n12rYAFMiuCd0nN4HZGx2W4jfxu5g&s",
      price: 1,
      oldPrice: 1499,
      category: "Vehicles",
      rating: 4.7,
      reviews: 98,
      desc: "High-speed RC car for kids and adults."
    },
    {
      Card: ToyCard3,
      name: "Plush Teddy Bear",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQI2LI89Nd8DTimFQLRh5t7F95ve9C32GBkwA&s",
      price: 1,
      oldPrice: 699,
      category: "Soft Toys",
      rating: 4.9,
      reviews: 156,
      desc: "Super soft teddy bear for cuddles and comfort."
    },
    {
      Card: ToyCard4,
      name: "Educational Puzzle",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWNyk1KN43fnTcuh8fZorz0AWT-ZZNTNfbDg&s",
      price: 1,
      oldPrice: 499,
      category: "Puzzles",
      rating: 4.6,
      reviews: 88,
      desc: "Boost your child's brain with this fun puzzle."
    },
    {
      Card: ToyCard5,
      name: "Art & Craft Kit",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeoIgWYUQ3k-v4JdItUtzjj9Isp7cV9y1DHA&s",
      price: 1,
      oldPrice: 899,
      category: "Craft",
      rating: 4.7,
      reviews: 73,
      desc: "Inspire creativity with this all-in-one craft kit."
    }
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {toyCards.map((card, idx) => {
        const { Card, ...props } = card;
        return <Card key={idx} {...props} />;
      })}
    </div>
  );
}

export default function CategoryPage() {
  const { categoryName } = useParams();
  const key = categoryName.toLowerCase();
  const products = productsByCategory[key] || [];
  const title = categoryTitles[key] || "Category";

  // Electronics section
  if (key === "electronics") {
    return (
      <div className="pt-28 px-4 min-h-screen bg-gradient-to-br from-[#18181b] via-[#23232a] to-[#18181b] text-white">
        <h1 className="text-4xl font-extrabold mb-10 tracking-tight bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
          Electronics
        </h1>
        <p className="text-accent mb-10 font-medium text-lg max-w-2xl">
          Discover the latest in electronics and gadgets. Shop top-rated products for your modern lifestyle.
        </p>
        <ElectronicsCardGrid />
      </div>
    );
  }

  // Fashion section
  if (key === "fashion") {
    return (
      <div className="pt-28 px-4 min-h-screen bg-gradient-to-br from-[#18181b] via-[#23232a] to-[#18181b] text-white">
        <h1 className="text-4xl font-extrabold mb-10 tracking-tight bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
          Fashion
        </h1>
        <p className="text-accent mb-10 font-medium text-lg max-w-2xl">
          Shop the latest fashion trends and accessories. Elevate your style with our curated collection.
        </p>
        <FashionCardGrid />
      </div>
    );
  }

  // Render Automotive cards for automotive category
  if (key === "automotive") {
    return (
      <div className="pt-28 px-4 min-h-screen bg-gradient-to-br from-[#18181b] via-[#23232a] to-[#18181b] text-white">
        <h1 className="text-4xl font-extrabold mb-10 tracking-tight bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
          Automotive
        </h1>
        <p className="text-accent mb-6 font-medium text-lg max-w-2xl">
          Explore our curated selection of automotive accessories and tools. Upgrade your ride with premium gadgets, safety essentials, and smart car tech.
        </p>
        <ul className="mb-10 text-secondary text-base list-disc list-inside max-w-2xl">
          <li>Car gadgets for entertainment and convenience</li>
          <li>Cleaning and maintenance tools for a spotless vehicle</li>
          <li>Safety devices to keep you and your passengers secure</li>
          <li>Accessories for comfort and style</li>
          <li>Portable tools for emergencies and on-the-go fixes</li>
        </ul>
        <AutomotiveCardGrid />
      </div>
    );
  }

  // Beauty & Health section
  if (key === "beauty-health" || key === "beauty & health") {
    return (
      <div className="pt-28 px-4 min-h-screen bg-gradient-to-br from-[#18181b] via-[#23232a] to-[#18181b] text-white">
        <h1 className="text-4xl font-extrabold mb-10 tracking-tight bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
          Beauty & Health
        </h1>
        <p className="text-accent mb-10 font-medium text-lg max-w-2xl">
          Discover premium beauty and health essentials for your daily routine. Shop skincare, wellness, and personal care products curated for you.
        </p>
        <BeautyCardGrid />
      </div>
    );
  }

  // Books & Stationery section
  if (key === "books-stationery" || key === "books & stationery") {
    return (
      <div className="pt-28 px-4 min-h-screen bg-gradient-to-br from-[#18181b] via-[#23232a] to-[#18181b] text-white">
        <h1 className="text-4xl font-extrabold mb-10 tracking-tight bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
          Books & Stationery
        </h1>
        <p className="text-accent mb-10 font-medium text-lg max-w-2xl">
          Shop our collection of books, journals, and stationery. Perfect for readers, writers, and creative minds.
        </p>
        <BooksCardGrid />
      </div>
    );
  }

  // Home & Garden section
  if (key === "home-garden" || key === "home & garden") {
    return (
      <div className="pt-28 px-4 min-h-screen bg-gradient-to-br from-[#18181b] via-[#23232a] to-[#18181b] text-white">
        <h1 className="text-4xl font-extrabold mb-10 tracking-tight bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
          Home & Garden
        </h1>
        <p className="text-accent mb-10 font-medium text-lg max-w-2xl">
          Shop modern home decor, garden essentials, and lifestyle upgrades for every space.
        </p>
        <HomeGardenCardGrid />
      </div>
    );
  }

  // Sports & Outdoors section
  if (key === "sports-outdoors" || key === "sports & outdoors") {
    return (
      <div className="pt-28 px-4 min-h-screen bg-gradient-to-br from-[#18181b] via-[#23232a] to-[#18181b] text-white">
        <h1 className="text-4xl font-extrabold mb-10 tracking-tight bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
          Sports & Outdoors
        </h1>
        <p className="text-accent mb-10 font-medium text-lg max-w-2xl">
          Gear up for adventure with our sports and outdoor collection. Quality equipment for every enthusiast.
        </p>
        <SportsCardGrid />
      </div>
    );
  }

  // Toys & Kids section
  if (key === "toys-kids" || key === "toys & kids" || key === "toys") {
    return (
      <div className="pt-28 px-4 min-h-screen bg-gradient-to-br from-[#18181b] via-[#23232a] to-[#18181b] text-white">
        <h1 className="text-4xl font-extrabold mb-10 tracking-tight bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
          Toys & Kids
        </h1>
        <p className="text-accent mb-10 font-medium text-lg max-w-2xl">
          Discover fun and learning with our curated toys and kids' essentials. Safe, creative, and joyful!
        </p>
        <ToysCardGrid />
      </div>
    );
  }

  return (
    <div className="pt-28 px-4 min-h-screen bg-black text-white">
      <h1 className="text-4xl font-extrabold mb-10 tracking-tight">{title}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {products.length === 0 ? (
          <div className="col-span-full text-gray-400 text-lg">No products found.</div>
        ) : (
          products.map((product, idx) => (
            <div
              key={idx}
              className="bg-modern-card rounded-2xl shadow-card p-6 flex flex-col items-center border border-accent transition-transform hover:scale-[1.02]"
            >
              <img
                src={product.img}
                alt={product.name}
                className="w-full h-44 object-cover rounded-xl mb-4 shadow"
              />
              <div className="font-semibold text-xl mb-2 text-white">{product.name}</div>
              <div className="text-primary font-bold text-2xl">${product.price.toFixed(2)}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}