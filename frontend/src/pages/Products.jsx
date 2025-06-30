import React from "react";
import { Toaster } from "react-hot-toast";

// Automotive
import AutomotiveCard1 from "../components/automative/automotiveCart1";
import AutomotiveCard2 from "../components/automative/automoticeCart2";
import AutomotiveCard3 from "../components/automative/automotiveCart3";
import AutomotiveCard4 from "../components/automative/automotiveCart4";
import AutomotiveCard5 from "../components/automative/automotiveCart5";

// Beauty & Health
import BeautyCard1 from "../components/beauty & health/beautyCard";
import BeautyCard2 from "../components/beauty & health/beautyCard2";
import BeautyCard3 from "../components/beauty & health/beautyCard3";
import BeautyCard4 from "../components/beauty & health/beautyCard4";
import BeautyCard5 from "../components/beauty & health/beautyCard5";

// Books & Stationery
import BookCard1 from "../components/books & stationary/bookCard1";
import BookCard2 from "../components/books & stationary/bookCard2";
import BookCard3 from "../components/books & stationary/bookCard3";
import BookCard4 from "../components/books & stationary/bookCard4";
import BookCard5 from "../components/books & stationary/bookCard5";

// Fashion
import FashionCard1 from "../components/fashion/fashion1";
import FashionCard2 from "../components/fashion/fashion2";
import FashionCard3 from "../components/fashion/fashion3";
import FashionCard4 from "../components/fashion/fashion4";
import FashionCard5 from "../components/fashion/fashion5";

// Home & Garden
import HomeCard1 from "../components/home & garden/home1";
import HomeCard2 from "../components/home & garden/home2";
import HomeCard3 from "../components/home & garden/home3";
import HomeCard4 from "../components/home & garden/home4";
import HomeCard5 from "../components/home & garden/home5";

// Sports & Outdoors
import SportsCard1 from "../components/sports & outdoors/sports1";
import SportsCard2 from "../components/sports & outdoors/sports2";
import SportsCard3 from "../components/sports & outdoors/sports3";
import SportsCard4 from "../components/sports & outdoors/sports4";
import SportsCard5 from "../components/sports & outdoors/sports5";

// Toys & Kids
import ToyCard1 from "../components/toys & kids/toy1";
import ToyCard2 from "../components/toys & kids/toy2";
import ToyCard3 from "../components/toys & kids/toy3";
import ToyCard4 from "../components/toys & kids/toy4";
import ToyCard5 from "../components/toys & kids/toy5";

// Product data for each card (props must match each card's default values)
const products = [
  // Automotive
  {
    Card: AutomotiveCard1,
    props: {
      name: "Bluetooth Speaker",
      img: "https://mobilla.in/cdn/shop/collections/Mrock_101-1_533x.jpg?v=1702109941",
      price: 1,
      oldPrice: 3499,
      category: "Audio",
      rating: 4.7,
      reviews: 112,
      label: "Sale",
      desc: "Portable, powerful sound for your car and home.",
    },
  },
  {
    Card: AutomotiveCard2,
    props: {
      name: "Car Vacuum Cleaner",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWwPe6yEg4eFu30KWF1Tcc_dQ8IySzrOc6vA&s",
      price: 1,
      oldPrice: 1499,
      category: "Cleaning",
      rating: 4.5,
      reviews: 89,
      label: "Popular",
      desc: "Keep your car spotless with this compact vacuum.",
    },
  },
  {
    Card: AutomotiveCard3,
    props: {
      name: "Dash Cam Pro",
      img: "https://static.toiimg.com/thumb/msid-102387592,width-1280,height-720,resizemode-4/102387592.jpg",
      price: 1,
      oldPrice: 4999,
      category: "Safety",
      rating: 4.8,
      reviews: 67,
      label: "New",
      desc: "Full HD dash cam for safe and secure driving.",
    },
  },
  {
    Card: AutomotiveCard4,
    props: {
      name: "Car Phone Mount",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT79FOYovWIDC6Jz52DZF6lZB9xO8mNz8R2qw&s",
      price: 1,
      oldPrice: 899,
      category: "Accessories",
      rating: 4.6,
      reviews: 154,
      label: "",
      desc: "Universal phone mount for hands-free navigation.",
    },
  },
  {
    Card: AutomotiveCard5,
    props: {
      name: "Tire Inflator",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVjFnzSTzmHDtkdyFpnRv2ogPiy7ed5B5psg&s",
      price: 1,
      oldPrice: 1999,
      category: "Tools",
      rating: 4.4,
      reviews: 73,
      label: "",
      desc: "Portable inflator for quick tire top-ups anywhere.",
    },
  },

  // Beauty & Health
  {
    Card: BeautyCard1,
    props: {
      name: "Hydrating Face Serum",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh4WQZfvivG5VJtFVzwwmIazI123XM1aZIcw&s",
      price: 1,
      oldPrice: 1299,
      category: "Skincare",
      rating: 4.8,
      reviews: 210,
      label: "Best Seller",
      desc: "Nourish your skin with our top-rated hydrating serum.",
    },
  },
  {
    Card: BeautyCard2,
    props: {
      name: "Organic Lip Balm",
      img: "https://files.organicharvest.in/site-images/800x800/8906080033469-1.jpg",
      price: 1,
      oldPrice: 299,
      category: "Lip Care",
      rating: 4.6,
      reviews: 98,
      label: "Natural",
      desc: "Keep your lips soft and healthy with organic ingredients.",
    },
  },
  {
    Card: BeautyCard3,
    props: {
      name: "Aloe Vera Gel",
      img: "https://m.media-amazon.com/images/I/71er2+H2+1L.jpg",
      price: 1,
      oldPrice: 499,
      category: "Moisturizer",
      rating: 4.7,
      reviews: 134,
      label: "",
      desc: "Soothing aloe gel for face and body hydration.",
    },
  },
  {
    Card: BeautyCard4,
    props: {
      name: "Vitamin C Face Wash",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLWRiuQLNRw63z_xf123IUcA8vpA5hwTkeiA&s",
      price: 1,
      oldPrice: 599,
      category: "Cleanser",
      rating: 4.5,
      reviews: 76,
      label: "",
      desc: "Brighten your skin with gentle vitamin C cleansing.",
    },
  },
  {
    Card: BeautyCard5,
    props: {
      name: "Sunscreen SPF 50",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLWRiuQLNRw63z_xf123IUcA8vpA5hwTkeiA&s",
      price: 1,
      oldPrice: 899,
      category: "Sun Care",
      rating: 4.9,
      reviews: 156,
      label: "SPF 50",
      desc: "Protect your skin from harmful UV rays all day.",
    },
  },

  // Books & Stationery
  {
    Card: BookCard1,
    props: {
      name: "The Art of Coding",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCEHzDlBnGvHSTlQiPY95dKuik7BNi9VPFwQ&s",
      price: 1,
      oldPrice: 899,
      category: "Programming",
      rating: 4.9,
      reviews: 321,
      label: "New",
      desc: "A must-read for every aspiring developer.",
    },
  },
  {
    Card: BookCard2,
    props: {
      name: "Classic Journal",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT48QKRq0MZYiPrm6Ek4rd3BfXU5fLELcuYIg&s",
      price: 1,
      oldPrice: 399,
      category: "Stationery",
      rating: 4.7,
      reviews: 88,
      label: "",
      desc: "Premium quality journal for notes and sketches.",
    },
  },
  {
    Card: BookCard3,
    props: {
      name: "Office Essentials Set",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTAYgtYOL95UhzhGy9f1L4BI8TG5Ij5AZ3Dg&s",
      price: 1,
      oldPrice: 599,
      category: "Office",
      rating: 4.6,
      reviews: 54,
      label: "Popular",
      desc: "All-in-one stationery set for your workspace.",
    },
  },
  {
    Card: BookCard4,
    props: {
      name: "Children's Story Book",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSti9AScQDkE55mZeiJCTKGo6DkkDzyMbtZuA&s",
      price: 1,
      oldPrice: 499,
      category: "Kids",
      rating: 4.8,
      reviews: 112,
      label: "",
      desc: "Delightful stories for young readers.",
    },
  },
  {
    Card: BookCard5,
    props: {
      name: "Premium Pen Set",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTC9sHCSxKdX-ubAUSNlIoBIoj3QG8HVYO0Ug&s",
      price: 1,
      oldPrice: 399,
      category: "Writing",
      rating: 4.5,
      reviews: 67,
      label: "",
      desc: "Smooth writing experience with elegant design.",
    },
  },

  // Fashion
  {
    Card: FashionCard1,
    props: {
      name: "Trendy Jacket",
      img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80",
      price: 1,
      oldPrice: 3999,
      category: "Outerwear",
      rating: 4.8,
      reviews: 87,
      label: "Hot",
      desc: "Stay warm and stylish with this season's must-have jacket.",
    },
  },
  {
    Card: FashionCard2,
    props: {
      name: "Classic Sneakers",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKEgG8C3kZWEua93cXod9dZa_IdBHzPbS6Hw&s",
      price: 1,
      oldPrice: 2999,
      category: "Footwear",
      rating: 4.7,
      reviews: 112,
      label: "",
      desc: "Comfortable, versatile sneakers for every occasion.",
    },
  },
  {
    Card: FashionCard3,
    props: {
      name: "Designer Handbag",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcpIW9uXfST-GLgD_IUU1kpphV2O7HQLhszQ&s",
      price: 1,
      oldPrice: 5999,
      category: "Accessories",
      rating: 4.9,
      reviews: 65,
      label: "New",
      desc: "Elevate your look with this elegant designer handbag.",
    },
  },
  {
    Card: FashionCard4,
    props: {
      name: "Summer Dress",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVPcfG-5CaP_WHTuPEwfOs15PJGBYAmqtHfQ&s",
      price: 1,
      oldPrice: 2199,
      category: "Apparel",
      rating: 4.6,
      reviews: 73,
      label: "",
      desc: "Lightweight, breezy dress perfect for sunny days.",
    },
  },
  {
    Card: FashionCard5,
    props: {
      name: "Leather Belt",
      img: "https://imagescdn.peterengland.com/img/app/product/3/39691909-14204120.jpg?auto=format&w=390",
      price: 1,
      oldPrice: 1299,
      category: "Accessories",
      rating: 4.5,
      reviews: 41,
      label: "",
      desc: "Premium leather belt for a sharp, classic finish.",
    },
  },

  // Home & Garden
  {
    Card: HomeCard1,
    props: {
      name: "Decorative Plant",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQouK4CoQmphrWQdG06g2NWg1J5-8FxcTiVvw&s",
      price: 1,
      oldPrice: 799,
      category: "Plants",
      rating: 4.8,
      reviews: 120,
      label: "",
      desc: "Bring nature indoors with this beautiful decorative plant.",
    },
  },
  {
    Card: HomeCard2,
    props: {
      name: "Modern Lamp",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8LDlKxpeJNFpPhafUzPsHG-WxCG5AWTPFQg&s",
      price: 1,
      oldPrice: 1299,
      category: "Lighting",
      rating: 4.7,
      reviews: 98,
      label: "",
      desc: "Brighten your space with this stylish modern lamp.",
    },
  },
  {
    Card: HomeCard3,
    props: {
      name: "Wall Art Set",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrglcLmBMUac_dCt6E-kvWj13HLMnhvcNVLQ&s",
      price: 1,
      oldPrice: 1799,
      category: "Decor",
      rating: 4.6,
      reviews: 76,
      label: "",
      desc: "Add personality to your home with this wall art set.",
    },
  },
  {
    Card: HomeCard4,
    props: {
      name: "Kitchen Organizer",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUva2CNZ3oL6kmRzQ5vf2S7dcJoSm_eM-zMw&s",
      price: 1,
      oldPrice: 899,
      category: "Kitchen",
      rating: 4.5,
      reviews: 54,
      label: "",
      desc: "Keep your kitchen tidy with this smart organizer.",
    },
  },
  {
    Card: HomeCard5,
    props: {
      name: "Garden Tool Kit",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6a8q_fOAxcFNsYD43jYQBuihNuuv-iwhOgQ&s",
      price: 1,
      oldPrice: 1199,
      category: "Garden",
      rating: 4.9,
      reviews: 88,
      label: "",
      desc: "Everything you need for your garden in one kit.",
    },
  },

  // Sports & Outdoors
  {
    Card: SportsCard1,
    props: {
      name: "Running Shoes",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7pqHTmC9A4L6cow9YHnuUEPGKh_lfQMAOBQ&s",
      price: 1,
      oldPrice: 2499,
      category: "Footwear",
      rating: 4.8,
      reviews: 210,
      label: "",
      desc: "Lightweight running shoes for maximum comfort.",
    },
  },
  {
    Card: SportsCard2,
    props: {
      name: "Fitness Tracker",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaHl1XIPyeFzCkuX_vrCZ8KEQHQ7wkTB0LOg&s",
      price: 1,
      oldPrice: 2999,
      category: "Wearable",
      rating: 4.7,
      reviews: 134,
      label: "",
      desc: "Track your activity and health with this smart band.",
    },
  },
  {
    Card: SportsCard3,
    props: {
      name: "Yoga Mat",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXHO7DplmYzFaKC75asMqHpLK02pezQeP2_A&s",
      price: 1,
      oldPrice: 899,
      category: "Accessories",
      rating: 4.6,
      reviews: 98,
      label: "",
      desc: "Non-slip yoga mat for all your workouts.",
    },
  },
  {
    Card: SportsCard4,
    props: {
      name: "Dumbbell Set",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbXay9n0rnItjhbvPAzqaozLnsy1h0t8n7kg&s",
      price: 1,
      oldPrice: 1999,
      category: "Equipment",
      rating: 4.5,
      reviews: 76,
      label: "",
      desc: "Build strength with this adjustable dumbbell set.",
    },
  },
  {
    Card: SportsCard5,
    props: {
      name: "Sports Water Bottle",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS89oy6ZOQezcQE5az4xcmZHFCp2XoIUL3o_g&s",
      price: 1,
      oldPrice: 499,
      category: "Hydration",
      rating: 4.9,
      reviews: 156,
      label: "",
      desc: "Stay hydrated with this leak-proof sports bottle.",
    },
  },

  // Toys & Kids
  {
    Card: ToyCard1,
    props: {
      name: "Building Blocks Set",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLaDfKDVXbgEqfxCKPYgwG_SruYLW1J2yEkg&s",
      price: 1,
      oldPrice: 999,
      category: "Blocks",
      rating: 4.8,
      reviews: 120,
      label: "",
      desc: "Creative building blocks for endless fun.",
    },
  },
  {
    Card: ToyCard2,
    props: {
      name: "Remote Control Car",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRStQWK0n12rYAFMiuCd0nN4HZGx2W4jfxu5g&s",
      price: 1,
      oldPrice: 1499,
      category: "Vehicles",
      rating: 4.7,
      reviews: 98,
      label: "",
      desc: "High-speed RC car for kids and adults.",
    },
  },
  {
    Card: ToyCard3,
    props: {
      name: "Plush Teddy Bear",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQI2LI89Nd8DTimFQLRh5t7F95ve9C32GBkwA&s",
      price: 1,
      oldPrice: 699,
      category: "Soft Toys",
      rating: 4.9,
      reviews: 156,
      label: "",
      desc: "Super soft teddy bear for cuddles and comfort.",
    },
  },
  {
    Card: ToyCard4,
    props: {
      name: "Educational Puzzle",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWNyk1KN43fnTcuh8fZorz0AWT-ZZNTNfbDg&s",
      price: 1,
      oldPrice: 499,
      category: "Puzzles",
      rating: 4.6,
      reviews: 88,
      label: "",
      desc: "Boost your child's brain with this fun puzzle.",
    },
  },
  {
    Card: ToyCard5,
    props: {
      name: "Art & Craft Kit",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeoIgWYUQ3k-v4JdItUtzjj9Isp7cV9y1DHA&s",
      price: 1,
      oldPrice: 899,
      category: "Craft",
      rating: 4.7,
      reviews: 73,
      label: "",
      desc: "Inspire creativity with this all-in-one craft kit.",
    },
  },
];

export default function Products() {
  // Real-time product count
  const totalProducts = products.length;

  return (
    <div className="pt-28 px-4 min-h-screen bg-gradient-to-br from-[#18181b] via-[#23232a] to-[#18181b] text-white font-body">
      <h1 className="text-4xl font-extrabold mb-4 tracking-tight bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
        All Products
      </h1>
      <div className="mb-8 text-lg font-semibold text-secondary">
        Total Products Available:{" "}
        <span className="text-primary">{totalProducts}</span>
      </div>
      <p className="text-accent mb-10 font-medium text-lg max-w-2xl">
        Browse our complete collection of premium products across all categories.
        Find your next favorite item!
      </p>
      <Toaster />
      {/* eslint-disable-next-line no-unused-vars */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {/* eslint-disable-next-line no-unused-vars */}
        {products.map(({ Card, props }, idx) => (
          <Card key={idx} {...props} />
        ))}
      </div>
    </div>
  );
}
