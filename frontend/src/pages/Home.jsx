import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
import { useCart } from "../components/CartContext";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import ShoppingCard from "../components/ShoppingCard";
import ShoppingCard1 from "../components/ShoppingCard1"
import ShoppingCard2 from "../components/ShoppingCard2"
import ShoppingCard3 from "../components/ShoppingCard3"

// Updated categories with images and descriptions
const categories = [
	{
		name: "Electronics",
		title: "Electronics",
		description: "Latest tech gadgets and electronics",
		products: 5,
		img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80",
		link: "/category/electronics",
	},
	{
		name: "Fashion",
		title: "Fashion",
		description: "Trendy clothing and accessories",
		products: 5,
		img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80",
		link: "/category/fashion",
	},
	{
		name: "Home & Garden",
		title: "Home & Garden",
		description: "Everything for your home and garden",
		products:5,
		img: "https://www.archizy.com/media/Vover%20Image/27.jpg",
		link: "/category/home-garden",
	},
	{
		name: "Sports & Outdoors",
		title: "Sports & Outdoors",
		description: "Gear for active lifestyle",
		products: 5,
		img: "https://opaltrading.com/wp-content/uploads/2021/12/sport-917899790.jpg",
		link: "/category/sports-outdoors",
	},
	{
		name: "Beauty & Health",
		title: "Beauty & Health",
		description: "Personal care, wellness, and beauty essentials",
		products: 5,
		img: "https://with.tips/wp-content/uploads/2018/12/health-and-beauty-with-tips.jpeg",
		link: "/category/beauty-health",
	},
	{
		name: "Toys & Kids",
		title: "Toys & Kids",
		description: "Fun and learning for children of all ages",
		products: 5,
		img: "https://images.indianexpress.com/2019/09/toys.jpg",
		link: "/category/toys-kids",
	},
	{
		name: "Automotive",
		title: "Automotive",
		description: "Car accessories and tools for enthusiasts",
		products: 5,
		img: "https://ptc-p-001.sitecorecontenthub.cloud/api/public/content/b5652be4bd904cf8a51005df000c5cd4?v=32324506",
		link: "/category/automotive",
	},
	{
		name: "Books & Stationery",
		title: "Books & Stationery",
		description: "Books, journals, and office supplies",
		products: 5,
		img: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=400&q=80",
		link: "/category/books-stationery",
	},
];

const trending = [
	{
		label: "Sale",
		category: "Audio",
		rating: 4.6,
		reviews: 78,
		name: "Bluetooth Speaker",
		price: 79.99,
		oldPrice: 99.99,
		img: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=400&q=80",
	},
	{
		label: "",
		category: "Accessories",
		rating: 4.5,
		reviews: 203,
		name: "Smartphone Case",
		price: 24.99,
		img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80",
	},
	{
		label: "Popular",
		category: "Electronics",
		rating: 4.7,
		reviews: 92,
		name: "Wireless Charger",
		price: 49.99,
		img: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
	},
	{
		label: "",
		category: "Gaming",
		rating: 4.8,
		reviews: 134,
		name: "Gaming Mouse",
		price: 69.99,
		img: "https://images.unsplash.com/photo-1519985176271-adb1088fa94c?auto=format&fit=crop&w=400&q=80",
	},
];

export default function Home() {
	const { addToCart } = useCart();
	const [footerEmail, setFooterEmail] = useState("");
	const [footerStatus, setFooterStatus] = useState(null);
	const [footerLoading, setFooterLoading] = useState(false);

	useEffect(() => {
		AOS.init({
			duration: 700,
			once: true,
			offset: 60,
		});
	}, []);

	const handleFooterNewsletter = async (e) => {
		e.preventDefault();
		setFooterStatus(null);
		setFooterLoading(true);
		try {
			await axios.post("/api/newsletter/subscribe", {
				email: footerEmail,
			});
			setFooterStatus({ type: "success", msg: "Subscribed successfully!" });
			setFooterEmail("");
		} catch (err) {
			setFooterStatus({
				type: "error",
				msg:
					err.response?.data?.message ||
					"Subscription failed. Please try again.",
			});
		}
		setFooterLoading(false);
	};

	return (
		<div className="pt-20 min-h-screen bg-gradient-to-br from-[#18181b] via-[#23232a] to-[#18181b] text-white font-body">
			{/* Hero Section */}
			<section
				className="w-full px-4 py-16 flex flex-col md:flex-row items-center gap-12"
				data-aos="fade-up"
			>
				<div className="flex-1">
					<h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-wider font-heading leading-tight bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
						Discover Modern Luxury
					</h1>
					<p className="text-xl text-accent mb-10 max-w-xl font-medium">
						Shop the latest collection of premium products with unbeatable quality
						and style. Elevate your lifestyle with curated selections.
					</p>
					<div className="flex gap-4">
						<a
							href="/products"
							className="bg-primary text-white px-8 py-3 rounded-lg font-semibold shadow-card border border-primary hover:bg-secondary hover:text-white hover:border-secondary transition"
						>
							Shop Now
						</a>
						<a
							href="/about"
							className="bg-transparent border border-secondary text-secondary px-8 py-3 rounded-lg font-semibold hover:bg-primary hover:text-white hover:border-primary transition"
						>
							Learn More
						</a>
					</div>
				</div>
				<div className="flex-1 flex justify-center">
					<div className="rounded-3xl shadow-card border-2 border-primary overflow-hidden relative w-full max-w-lg bg-modern-card
						md:max-w-2xl md:h-[420px] md:w-[600px] lg:max-w-3xl lg:h-[500px] lg:w-[700px]">
						<img
							src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80"
							alt="Hero"
							className="w-full h-full object-cover"
						/>
						<div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20"></div>
					</div>
				</div>
			</section>

			{/* Categories */}
			<section
				className="w-full px-4 py-12"
				data-aos="fade-up"
				data-aos-delay="100"
			>
				<h2
					className="text-3xl font-bold mb-4 font-heading tracking-wider bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent"
				>
					Shop by Category
				</h2>
				<p className="text-accent mb-10 font-medium">
					Discover our wide range of products across different categories, each
					carefully curated for quality and style.
				</p>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
					{categories.map((cat, idx) => (
						<Link
							to={cat.link}
							key={cat.name}
							className="group bg-modern-card rounded-2xl shadow-card border border-accent flex flex-col items-center transition-transform duration-200 hover:scale-105 hover:shadow-[0_8px_32px_0_rgba(124,63,44,0.18)] hover:bg-gradient-to-br hover:from-[#3d2320] hover:to-[#23232a] active:scale-95 cursor-pointer overflow-hidden hover:border-[#7c3f2c]"
							data-aos="zoom-in"
							data-aos-delay={150 + idx * 100}
							style={{ minHeight: 320 }}
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
								<div className="text-secondary font-semibold text-xs mb-1 bg-secondary/10 px-3 py-1 rounded-full border border-secondary/20">
									{cat.products} products
								</div>
							</div>
						</Link>
					))}
				</div>
			</section>

			{/* Trending Now */}
			<section
				className="w-full px-4 py-12"
				data-aos="fade-up"
				data-aos-delay="200"
			>
				<div className="flex items-center justify-between mb-6">
					<h2 className="text-3xl font-bold font-heading tracking-wider bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">Trending Now</h2>
					<a
						href="/products"
						className="text-primary font-medium hover:text-secondary hover:underline"
					>
						View All Products
					</a>
				</div>
				<p className="text-accent mb-8 font-medium">
					Discover what's popular and trending in our store.
				</p>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
					<ShoppingCard
						name="Bluetooth Speaker"
						img="https://5.imimg.com/data5/SELLER/Default/2022/10/TA/RV/QJ/78198701/music-mini-bluetooth-speaker.webp"
						price={1}
						oldPrice={3499}
						category="Audio"
						rating={4.6}
						reviews={78}
					/>
					<ShoppingCard
						name="Smartphone Case"
						img="https://printbebo.in/wp-content/uploads/2021/03/37-Dark-Blue-Marble-Design-Custom-Phone-Case-with-Pop-Holder.jpg"
						price={2}
						oldPrice={799}
						category="Accessories"
						rating={4.5}
						reviews={203}
					/>
					<ShoppingCard
						name="Wireless Charger"
						img="https://honeywellconnection.com/in/wp-content/uploads/2024/08/main-image-4.jpg"
						price={3}
						oldPrice={1999}
						category="Electronics"
						rating={4.7}
						reviews={92}
					/>
					<ShoppingCard
						name="Gaming Mouse"
						img="https://static1.howtogeekimages.com/wordpress/wp-content/uploads/2022/04/black-red-gaming-mouse.jpg"
						price={4}
						oldPrice={1499}
						category="Gaming"
						rating={4.8}
						reviews={134}
					/>
				</div>
			</section>

			{/* Footer */}
			<footer
				className="relative bg-gradient-to-br from-[#18181b] via-[#23232a] to-[#18181b] text-accent pt-16 pb-8 px-4 mt-16 w-full border-t border-accent/20 glass"
				data-aos="fade-up"
				data-aos-delay="350"
			>
				<div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
					{/* Brand */}
					<div>
						<div className="flex items-center gap-2 mb-4">
							<span className="text-3xl font-extrabold text-primary font-heading tracking-wider drop-shadow-[0_0_12px_#0D9488cc]">E</span>
							<span className="text-2xl font-bold text-white font-heading">Store</span>
						</div>
						<p className="text-accent text-sm mb-4">
							Your premier destination for quality products and an exceptional shopping experience.
						</p>
						<div className="flex gap-3 mt-4">
							<a href="https://x.com/ChardeMaya92377/" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-primary transition">
								<svg width="32" height="32" fill="currentColor" className="text-accent hover:text-primary" viewBox="0 0 24 24"><path d="M22.46 5.92c-.8.36-1.66.6-2.56.71a4.48 4.48 0 001.97-2.48 8.93 8.93 0 01-2.83 1.08 4.48 4.48 0 00-7.64 4.09A12.7 12.7 0 013 4.89a4.48 4.48 0 001.39 5.98c-.7-.02-1.36-.21-1.94-.53v.05a4.48 4.48 0 003.6 4.39c-.33.09-.68.14-1.04.14-.25 0-.5-.02-.74-.07a4.48 4.48 0 004.18 3.11A9 9 0 012 19.54a12.7 12.7 0 006.88 2.02c8.26 0 12.78-6.84 12.78-12.78 0-.2 0-.39-.01-.58a9.2 9.2 0 002.27-2.35z"/></svg>
							</a>
							<a href="https://www.linkedin.com/in/mayank-charde-56636b2a4/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-primary transition">
								<svg width="32" height="32" fill="currentColor" className="text-accent hover:text-primary" viewBox="0 0 24 24"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.89v1.23h.04c.4-.75 1.37-1.54 2.82-1.54 3.01 0 3.57 1.98 3.57 4.56v4.75z"/></svg>
							</a>
							<a href="https://www.instagram.com/mayank.charde/?next=%2F" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-primary transition">
								<svg width="32" height="32" fill="currentColor" className="text-accent hover:text-primary" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.332 3.608 1.308.975.976 1.246 2.243 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.332 2.633-1.308 3.608-.976.975-2.243 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.332-3.608-1.308-.975-.976-1.246-2.243-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.332-2.633 1.308-3.608C4.516 2.565 5.783 2.294 7.148 2.232 8.414 2.175 8.794 2.163 12 2.163zm0-2.163C8.736 0 8.332.013 7.052.072 5.771.13 4.659.37 3.678 1.352 2.697 2.334 2.457 3.446 2.399 4.728 2.34 6.008 2.327 6.412 2.327 12c0 5.588.013 5.992.072 7.272.058 1.282.298 2.394 1.279 3.376.981.981 2.093 1.221 3.375 1.279 1.28.059 1.684.072 7.272.072s5.992-.013 7.272-.072c1.282-.058 2.394-.298 3.375-1.279.981-.982 1.221-2.094 1.279-3.376.059-1.28.072-1.684.072-7.272s-.013-5.992-.072-7.272c-.058-1.282-.298-2.394-1.279-3.376-.981-.982-2.093-1.222-3.375-1.279C17.992.013 17.588 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a3.999 3.999 0 110-7.998 3.999 3.999 0 010 7.998zm6.406-11.845a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z"/></svg>
							</a>
							<a href="mailto:support@store.com" aria-label="Email" className="hover:text-primary transition">
								<svg width="32" height="32" fill="currentColor" className="text-accent hover:text-primary" viewBox="0 0 24 24"><path d="M12 13.065l-8.485-7.07A2 2 0 0 1 5.343 4h13.314a2 2 0 0 1 1.828 2.004l-8.485 7.061zm10.485-8.485A4 4 0 0 0 18.657 2H5.343a4 4 0 0 0-2.828 6.828l8.485 7.07a2 2 0 0 0 2.828 0l8.485-7.07A4 4 0 0 0 22.485 4.58z"/></svg>
							</a>
						</div>
					</div>
					{/* Navigation */}
					<div>
						<div className="font-semibold mb-3 text-white font-heading text-lg">Quick Links</div>
						<ul className="text-accent text-sm space-y-2">
							<li><a href="/products" className="hover:text-primary transition">All Products</a></li>
							<li><a href="/categories" className="hover:text-primary transition">Categories</a></li>
							<li><a href="/about" className="hover:text-primary transition">About Us</a></li>
							<li><a href="/contact" className="hover:text-primary transition">Contact</a></li>
						</ul>
					</div>
					{/* Customer Service */}
					<div>
						<div className="font-semibold mb-3 text-white font-heading text-lg">Customer Service</div>
						<ul className="text-accent text-sm space-y-2">
							<li><Link to="/help" className="hover:text-primary transition">Help Center</Link></li>
							<li><Link to="/shipping" className="hover:text-primary transition">Shipping Info</Link></li>
							<li><Link to="/returns" className="hover:text-primary transition">Returns</Link></li>
							<li><Link to="/order-tracking" className="hover:text-primary transition">Order Tracking</Link></li>
						</ul>
					</div>
					{/* Newsletter */}
					<div>
						<div className="font-semibold mb-3 text-white font-heading text-lg">Stay Updated</div>
						<form
							className="flex gap-2 mb-2"
							onSubmit={handleFooterNewsletter}
						>
							<input
								type="email"
								placeholder="Enter your email"
								className="flex-1 px-3 py-2 rounded-lg border border-accent bg-[#18181b] text-white focus:outline-none focus:ring-2 focus:ring-primary transition"
								value={footerEmail}
								onChange={(e) => setFooterEmail(e.target.value)}
								required
							/>
							<button
								type="submit"
								className="bg-gradient-to-r from-primary to-secondary text-white px-4 py-2 rounded-lg font-semibold hover:from-secondary hover:to-primary transition shadow-card border border-primary"
								disabled={footerLoading}
							>
								{footerLoading ? "Subscribing..." : "Subscribe"}
							</button>
						</form>
						{footerStatus && (
							<div
								className={`text-xs mt-1 ${
									footerStatus.type === "success"
										? "text-green-500"
										: "text-primary"
								}`}
							>
								{footerStatus.msg}
							</div>
						)}
						<div className="text-xs text-accent mt-2">
							Subscribe for updates on new products & exclusive offers.
						</div>
					</div>
				</div>
				<div className="max-w-7xl mx-auto mt-12 border-t border-accent/20 pt-8 flex flex-col items-center justify-center gap-4">
					<div className="flex flex-col md:flex-row items-center justify-center gap-6 text-center">
						<span className="text-lg md:text-xl font-bold text-primary">
							© 2025 Store. All rights reserved.
						</span>
						<div className="flex gap-6 mt-2 md:mt-0">
							<Link to="/privacy" className="text-lg font-semibold hover:text-primary transition">Privacy Policy</Link>
							<Link to="/terms" className="text-lg font-semibold hover:text-primary transition">Terms of Service</Link>
						</div>
					</div>
				</div>
			</footer>
			{/* Developer Info */}
			<div className="w-full bg-gradient-to-r from-[#23232a] via-[#18181b] to-[#23232a] py-6 flex flex-col items-center justify-center border-t border-accent/10">
				<div className="text-center text-accent text-base md:text-lg font-medium">
					Developed with{" "}
					<span className="text-pink-500 align-middle" style={{ fontSize: "1.6em", verticalAlign: "middle", lineHeight: 0 }}>
						♥
					</span>{" "}
					by{" "}
					<a
						href="https://www.linkedin.com/in/mayank-charde-56636b2a4/

/"
						target="_blank"
						rel="noopener noreferrer"
						className="text-primary font-bold hover:underline"
					>
						Mayank Shirish Charde
					</a>
					{" "}· Full Stack Developer
				</div>
				<div className="mt-1 text-accent text-lg font-semibold">
					Contact: <a href="mailto:mayankcharde2@gmail.com" className="hover:text-primary underline">mayankcharde2@gmail.com</a>
				</div>
			</div>
		</div>
	);
}
