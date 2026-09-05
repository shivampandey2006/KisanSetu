import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  ShoppingCart,
  MapPin,
  Star,
  ArrowLeft,
  Sprout,
  Filter,
  ChevronDown,
  ShoppingBag,
  Heart,
  ShieldCheck,
  Truck,
  X,
} from "lucide-react";

const seedProducts = [
  {
    id: 1,
    name: "Premium Wheat Seeds",
    variety: "HD-2967",
    category: "Wheat",
    price: 850,
    unit: "10 kg",
    rating: 4.7,
    reviews: 124,
    location: "Bhopal, MP",
    seller: "Sharma Agro Seeds",
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=700&q=80",
    description: "High quality wheat seeds suitable for Rabi season.",
    stock: 48,
  },
  {
    id: 2,
    name: "Hybrid Paddy Seeds",
    variety: "Pusa-44",
    category: "Rice",
    price: 1250,
    unit: "10 kg",
    rating: 4.8,
    reviews: 98,
    location: "Indore, MP",
    seller: "Kisan Beej Bhandar",
    image:
      "https://images.unsplash.com/photo-1536630251560-2fbe5f9c6e0c?auto=format&fit=crop&w=700&q=80",
    description: "Reliable hybrid paddy seeds with excellent yield potential.",
    stock: 35,
  },
  {
    id: 3,
    name: "Premium Soybean Seeds",
    variety: "JS-9560",
    category: "Soybean",
    price: 1450,
    unit: "10 kg",
    rating: 4.6,
    reviews: 87,
    location: "Sehore, MP",
    seller: "Green Field Seeds",
    image:
      "https://images.unsplash.com/photo-1598514982901-ae627b4a3a22?auto=format&fit=crop&w=700&q=80",
    description: "Certified soybean seeds for strong crop growth.",
    stock: 52,
  },
  {
    id: 4,
    name: "Hybrid Maize Seeds",
    variety: "NK-30",
    category: "Maize",
    price: 1100,
    unit: "5 kg",
    rating: 4.5,
    reviews: 76,
    location: "Dewas, MP",
    seller: "Farmers Choice",
    image:
      "https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=700&q=80",
    description: "Hybrid maize seeds designed for healthy crop development.",
    stock: 29,
  },
  {
    id: 5,
    name: "Mustard Seeds",
    variety: "Pusa Bold",
    category: "Mustard",
    price: 780,
    unit: "5 kg",
    rating: 4.4,
    reviews: 64,
    location: "Vidisha, MP",
    seller: "Shiv Agro Centre",
    image:
      "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=700&q=80",
    description: "Quality mustard seeds suitable for winter cultivation.",
    stock: 61,
  },
  {
    id: 6,
    name: "Vegetable Seeds Combo",
    variety: "Premium Pack",
    category: "Vegetables",
    price: 499,
    unit: "Pack",
    rating: 4.9,
    reviews: 156,
    location: "Bhopal, MP",
    seller: "Nature Fresh Seeds",
    image:
      "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=700&q=80",
    description: "A useful collection of quality vegetable seeds.",
    stock: 74,
  },
  {
    id: 7,
    name: "Cotton Seeds",
    variety: "Bt Cotton",
    category: "Cotton",
    price: 1350,
    unit: "Packet",
    rating: 4.6,
    reviews: 91,
    location: "Khandwa, MP",
    seller: "Kisan Mitra Seeds",
    image:
      "https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?auto=format&fit=crop&w=700&q=80",
    description: "Premium cotton seeds for suitable growing conditions.",
    stock: 40,
  },
  {
    id: 8,
    name: "Gram Seeds",
    variety: "JG-315",
    category: "Gram",
    price: 920,
    unit: "10 kg",
    rating: 4.5,
    reviews: 53,
    location: "Hoshangabad, MP",
    seller: "Central India Agro",
    image:
      "https://images.unsplash.com/photo-1515543904379-3d757afe72e4?auto=format&fit=crop&w=700&q=80",
    description: "Selected gram seeds with good germination quality.",
    stock: 33,
  },
];

const categories = [
  "All",
  "Wheat",
  "Rice",
  "Soybean",
  "Maize",
  "Mustard",
  "Vegetables",
  "Cotton",
  "Gram",
];

const Seeds = () => {
  const navigate = useNavigate();

  const [checkingAuth, setCheckingAuth] = useState(true);
  const [user, setUser] = useState(null);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");

  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // =====================================================
  // AUTH CHECK
  // =====================================================

  useEffect(() => {
    const currentUser = JSON.parse(
      localStorage.getItem("kisanSetuCurrentUser")
    );

    if (!currentUser) {
      alert("Please Login or Sign Up first to buy quality seeds.");

      navigate("/login", {
        replace: true,
        state: {
          from: "/marketplace/seeds",
        },
      });

      return;
    }

    setUser(currentUser);

    // Existing cart
    const savedCart =
      JSON.parse(localStorage.getItem("kisanSetuSeedCart")) || [];

    setCart(savedCart);

    // Existing wishlist
    const savedWishlist =
      JSON.parse(localStorage.getItem("kisanSetuSeedWishlist")) || [];

    setWishlist(savedWishlist);

    setCheckingAuth(false);
  }, [navigate]);

  // =====================================================
  // FILTER + SEARCH + SORT
  // =====================================================

  const filteredProducts = useMemo(() => {
    let products = [...seedProducts];

    if (category !== "All") {
      products = products.filter(
        (product) => product.category === category
      );
    }

    if (search.trim()) {
      const query = search.toLowerCase();

      products = products.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.variety.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query) ||
          product.seller.toLowerCase().includes(query)
      );
    }

    if (sortBy === "low-high") {
      products.sort((a, b) => a.price - b.price);
    }

    if (sortBy === "high-low") {
      products.sort((a, b) => b.price - a.price);
    }

    if (sortBy === "rating") {
      products.sort((a, b) => b.rating - a.rating);
    }

    return products;
  }, [search, category, sortBy]);

  // =====================================================
  // ADD TO CART
  // =====================================================

  const addToCart = (product, qty = 1) => {
    const existingCart =
      JSON.parse(localStorage.getItem("kisanSetuSeedCart")) || [];

    const existingItem = existingCart.find(
      (item) => item.id === product.id
    );

    let updatedCart;

    if (existingItem) {
      updatedCart = existingCart.map((item) =>
        item.id === product.id
          ? {
              ...item,
              quantity: item.quantity + qty,
            }
          : item
      );
    } else {
      updatedCart = [
        ...existingCart,
        {
          ...product,
          quantity: qty,
        },
      ];
    }

    localStorage.setItem(
      "kisanSetuSeedCart",
      JSON.stringify(updatedCart)
    );

    setCart(updatedCart);

    setSelectedProduct(null);
    setQuantity(1);

    alert(`${product.name} added to cart.`);
  };

  // =====================================================
  // BUY NOW
  // =====================================================

  const buyNow = (product) => {
    const currentUser = JSON.parse(
      localStorage.getItem("kisanSetuCurrentUser")
    );

    if (!currentUser) {
      alert("Please Login or Sign Up first.");

      navigate("/login", {
        state: {
          from: "/marketplace/seeds",
        },
      });

      return;
    }

    addToCart(product, quantity);

    // Future checkout page
    navigate("/marketplace/cart");
  };

  // =====================================================
  // WISHLIST
  // =====================================================

  const toggleWishlist = (product) => {
    let updatedWishlist;

    if (wishlist.some((item) => item.id === product.id)) {
      updatedWishlist = wishlist.filter(
        (item) => item.id !== product.id
      );
    } else {
      updatedWishlist = [...wishlist, product];
    }

    localStorage.setItem(
      "kisanSetuSeedWishlist",
      JSON.stringify(updatedWishlist)
    );

    setWishlist(updatedWishlist);
  };

  // =====================================================
  // AUTH LOADING
  // =====================================================

  if (checkingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f6fbf4] dark:bg-gray-950">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-green-200 border-t-green-700" />

          <p className="text-sm text-gray-500 dark:text-gray-400">
            Checking your account...
          </p>
        </div>
      </div>
    );
  }

  // =====================================================
  // MAIN PAGE
  // =====================================================

  return (
    <div className="min-h-screen bg-[#f7faf5] text-gray-800 dark:bg-gray-950 dark:text-gray-100">

      {/* =================================================
          TOP BAR
      ================================================= */}

      <div className="border-b border-green-100 bg-white/90 dark:border-gray-800 dark:bg-gray-900/90">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">

          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-green-50 hover:text-green-700 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            <ArrowLeft size={18} />
            Back
          </button>

          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400">
              <Sprout size={20} />
            </div>

            <div className="hidden sm:block">
              <p className="text-sm font-bold text-gray-900 dark:text-white">
                KisanSetu
              </p>

              <p className="text-xs text-gray-500 dark:text-gray-400">
                Quality Seeds Marketplace
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate("/marketplace/cart")}
            className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 transition hover:border-green-300 hover:bg-green-50 hover:text-green-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
            title="Cart"
          >
            <ShoppingCart size={21} />

            {cart.length > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-green-600 px-1 text-[10px] font-bold text-white">
                {cart.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* =================================================
          HERO
      ================================================= */}

      <section className="relative overflow-hidden bg-linear-to-br from-green-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-950 dark:to-green-950/30">

        <div className="mx-auto grid min-h-80 w-full max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 lg:px-8">

          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-green-200 bg-white px-4 py-2 text-sm font-medium text-green-700 shadow-sm dark:border-green-800 dark:bg-gray-900 dark:text-green-400">
              <Sprout size={16} />
              Trusted Seeds Marketplace
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl dark:text-white">
              Buy Quality
              <span className="block text-green-700 dark:text-green-400">
                Seeds
              </span>
            </h1>

            <p className="mt-4 max-w-xl text-base leading-7 text-gray-600 dark:text-gray-300">
              Find quality seeds from trusted sellers and choose the
              right variety for your farm.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">

              <div className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 shadow-sm dark:bg-gray-900">
                <ShieldCheck
                  size={19}
                  className="text-green-600"
                />

                <div>
                  <p className="text-xs text-gray-500">
                    Trusted
                  </p>
                  <p className="text-sm font-semibold">
                    Sellers
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 shadow-sm dark:bg-gray-900">
                <Truck
                  size={19}
                  className="text-green-600"
                />

                <div>
                  <p className="text-xs text-gray-500">
                    Easy
                  </p>
                  <p className="text-sm font-semibold">
                    Delivery
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 shadow-sm dark:bg-gray-900">
                <Star
                  size={19}
                  className="text-yellow-500"
                />

                <div>
                  <p className="text-xs text-gray-500">
                    Quality
                  </p>
                  <p className="text-sm font-semibold">
                    Rated Products
                  </p>
                </div>
              </div>

            </div>
          </div>

          <div className="hidden md:flex justify-center">
            <div className="relative flex h-64 w-64 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">

              <div className="absolute h-52 w-52 rounded-full bg-green-200/60 dark:bg-green-800/30" />

              <Sprout
                size={130}
                strokeWidth={1.2}
                className="relative text-green-700 dark:text-green-400"
              />

              <div className="absolute -bottom-2 right-0 rounded-2xl bg-white px-5 py-3 shadow-lg dark:bg-gray-900">
                <p className="text-xs text-gray-500">
                  Quality First
                </p>

                <p className="font-bold text-green-700 dark:text-green-400">
                  Grow Better 🌱
                </p>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* =================================================
          SEARCH
      ================================================= */}

      <section className="mx-auto w-full max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">

        <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">

          <div className="flex flex-col gap-4 lg:flex-row">

            <div className="relative flex-1">
              <Search
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search seeds, variety, seller..."
                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-12 pr-4 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100 dark:border-gray-700 dark:bg-gray-800 dark:focus:ring-green-900"
              />

              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 dark:hover:text-white"
                >
                  <X size={18} />
                </button>
              )}
            </div>

            <div className="relative min-w-52">
              <Filter
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-10 text-sm outline-none focus:border-green-500 dark:border-gray-700 dark:bg-gray-800"
              >
                <option value="featured">
                  Featured
                </option>

                <option value="low-high">
                  Price: Low to High
                </option>

                <option value="high-low">
                  Price: High to Low
                </option>

                <option value="rating">
                  Highest Rated
                </option>
              </select>

              <ChevronDown
                size={17}
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
            </div>

          </div>

        </div>
      </section>

      {/* =================================================
          CATEGORIES
      ================================================= */}

      <section className="mx-auto w-full max-w-7xl px-4 pt-7 sm:px-6 lg:px-8">

        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Seed Categories
            </h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Choose the crop you want to grow
            </p>
          </div>

          <span className="hidden text-sm text-gray-500 sm:block">
            {filteredProducts.length} products found
          </span>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-medium transition ${
                category === item
                  ? "bg-green-700 text-white shadow-sm"
                  : "border border-gray-200 bg-white text-gray-600 hover:border-green-300 hover:text-green-700 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      {/* =================================================
          PRODUCTS
      ================================================= */}

      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {filteredProducts.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white py-20 text-center dark:border-gray-700 dark:bg-gray-900">

            <ShoppingBag
              size={45}
              className="mx-auto mb-4 text-gray-300"
            />

            <h3 className="text-lg font-semibold">
              No seeds found
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Try another search or category.
            </p>

            <button
              onClick={() => {
                setSearch("");
                setCategory("All");
              }}
              className="mt-5 rounded-xl bg-green-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-green-800"
            >
              Clear Filters
            </button>

          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {filteredProducts.map((product) => {

              const isWishlisted = wishlist.some(
                (item) => item.id === product.id
              );

              return (
                <div
                  key={product.id}
                  className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900"
                >

                  {/* IMAGE */}

                  <div className="relative h-48 overflow-hidden bg-gray-100">

                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />

                    <div className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-green-700 shadow-sm">
                      {product.category}
                    </div>

                    <button
                      onClick={() =>
                        toggleWishlist(product)
                      }
                      className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 shadow-sm transition hover:scale-105"
                      title="Wishlist"
                    >
                      <Heart
                        size={18}
                        className={
                          isWishlisted
                            ? "fill-red-500 text-red-500"
                            : "text-gray-500"
                        }
                      />
                    </button>

                  </div>

                  {/* CONTENT */}

                  <div className="p-4">

                    <h3 className="line-clamp-1 text-base font-bold text-gray-900 dark:text-white">
                      {product.name}
                    </h3>

                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      Variety: {product.variety}
                    </p>

                    <div className="mt-3 flex items-center gap-1">
                      <Star
                        size={15}
                        className="fill-yellow-400 text-yellow-400"
                      />

                      <span className="text-sm font-semibold">
                        {product.rating}
                      </span>

                      <span className="text-xs text-gray-400">
                        ({product.reviews})
                      </span>
                    </div>

                    <div className="mt-3 flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                      <MapPin size={14} />
                      {product.location}
                    </div>

                    <p className="mt-2 line-clamp-2 text-xs leading-5 text-gray-500 dark:text-gray-400">
                      {product.description}
                    </p>

                    <div className="mt-4 flex items-end justify-between">

                      <div>
                        <p className="text-xs text-gray-400">
                          Price
                        </p>

                        <p className="text-xl font-extrabold text-green-700 dark:text-green-400">
                          ₹{product.price.toLocaleString("en-IN")}
                        </p>

                        <p className="text-[11px] text-gray-400">
                          / {product.unit}
                        </p>
                      </div>

                      <p className="text-[11px] text-gray-400">
                        {product.stock} in stock
                      </p>

                    </div>

                    <div className="mt-4 flex gap-2">

                      <button
                        onClick={() => {
                          setSelectedProduct(product);
                          setQuantity(1);
                        }}
                        className="flex-1 rounded-xl border border-green-600 px-3 py-2.5 text-xs font-bold text-green-700 transition hover:bg-green-50 dark:border-green-500 dark:text-green-400 dark:hover:bg-green-950/40"
                      >
                        View Details
                      </button>

                      <button
                        onClick={() => addToCart(product)}
                        className="flex items-center justify-center gap-1 rounded-xl bg-green-700 px-3 py-2.5 text-xs font-bold text-white transition hover:bg-green-800"
                        title="Add to Cart"
                      >
                        <ShoppingCart size={16} />
                        Add
                      </button>

                    </div>

                  </div>
                </div>
              );
            })}

          </div>
        )}

      </main>

      {/* =================================================
          WHY BUY FROM KISANSETU
      ================================================= */}

      <section className="border-t border-green-100 bg-white py-12 dark:border-gray-800 dark:bg-gray-900">

        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="mb-8 text-center">

            <p className="text-sm font-semibold text-green-700 dark:text-green-400">
              WHY KISANSETU
            </p>

            <h2 className="mt-2 text-2xl font-bold">
              Buy with confidence
            </h2>

          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

            <Feature
              icon={<ShieldCheck size={24} />}
              title="Trusted Sellers"
              text="Buy seeds from verified marketplace sellers."
            />

            <Feature
              icon={<Sprout size={24} />}
              title="Quality Products"
              text="Choose from a wide range of seed varieties."
            />

            <Feature
              icon={<Truck size={24} />}
              title="Easy Delivery"
              text="Get your selected products delivered easily."
            />

            <Feature
              icon={<ShoppingBag size={24} />}
              title="Easy Shopping"
              text="Search, compare and add products to cart."
            />

          </div>

        </div>

      </section>

      {/* =================================================
          PRODUCT MODAL
      ================================================= */}

      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">

          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl dark:bg-gray-900">

            <div className="relative">

              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="h-60 w-full object-cover"
              />

              <button
                onClick={() => {
                  setSelectedProduct(null);
                  setQuantity(1);
                }}
                className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg"
              >
                <X size={20} />
              </button>

            </div>

            <div className="p-6">

              <div className="flex flex-wrap items-start justify-between gap-4">

                <div>
                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 dark:bg-green-900/40 dark:text-green-400">
                    {selectedProduct.category}
                  </span>

                  <h2 className="mt-3 text-2xl font-extrabold">
                    {selectedProduct.name}
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Variety: {selectedProduct.variety}
                  </p>
                </div>

                <div className="text-right">

                  <p className="text-2xl font-extrabold text-green-700 dark:text-green-400">
                    ₹
                    {selectedProduct.price.toLocaleString(
                      "en-IN"
                    )}
                  </p>

                  <p className="text-xs text-gray-400">
                    / {selectedProduct.unit}
                  </p>

                </div>

              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">

                <Info
                  label="Rating"
                  value={`⭐ ${selectedProduct.rating}`}
                />

                <Info
                  label="Seller"
                  value={selectedProduct.seller}
                />

                <Info
                  label="Location"
                  value={selectedProduct.location}
                />

              </div>

              <div className="mt-6">

                <h3 className="font-bold">
                  Product Details
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-300">
                  {selectedProduct.description}
                </p>

              </div>

              <div className="mt-6 flex items-center justify-between rounded-2xl bg-gray-50 p-4 dark:bg-gray-800">

                <div>
                  <p className="text-sm font-semibold">
                    Quantity
                  </p>

                  <p className="text-xs text-gray-500">
                    {selectedProduct.unit}
                  </p>
                </div>

                <div className="flex items-center gap-3">

                  <button
                    onClick={() =>
                      setQuantity((q) => Math.max(1, q - 1))
                    }
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white font-bold dark:border-gray-700 dark:bg-gray-900"
                  >
                    -
                  </button>

                  <span className="w-6 text-center font-bold">
                    {quantity}
                  </span>

                  <button
                    onClick={() =>
                      setQuantity((q) =>
                        Math.min(selectedProduct.stock, q + 1)
                      )
                    }
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white font-bold dark:border-gray-700 dark:bg-gray-900"
                  >
                    +
                  </button>

                </div>

              </div>

              <div className="mt-6 flex gap-3">

                <button
                  onClick={() =>
                    addToCart(selectedProduct, quantity)
                  }
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-green-600 py-3 text-sm font-bold text-green-700 hover:bg-green-50 dark:border-green-500 dark:text-green-400"
                >
                  <ShoppingCart size={18} />
                  Add to Cart
                </button>

                <button
                  onClick={() => buyNow(selectedProduct)}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-green-700 py-3 text-sm font-bold text-white hover:bg-green-800"
                >
                  <ShoppingBag size={18} />
                  Buy Now
                </button>

              </div>

            </div>

          </div>
        </div>
      )}

      {/* =================================================
          FOOTER
      ================================================= */}

      <footer className="bg-gray-950 px-4 py-8 text-center text-gray-400">

        <div className="flex items-center justify-center gap-2 text-white">
          <Sprout size={19} className="text-green-500" />
          <span className="font-bold">KisanSetu</span>
        </div>

        <p className="mt-2 text-xs">
          Connecting farmers, sellers and markets.
        </p>

        {user && (
          <p className="mt-3 text-[11px] text-gray-500">
            Logged in as {user.name || user.email}
          </p>
        )}

      </footer>

    </div>
  );
};

// =====================================================
// SMALL COMPONENTS
// =====================================================

const Feature = ({ icon, title, text }) => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5 dark:border-gray-800 dark:bg-gray-950">

      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400">
        {icon}
      </div>

      <h3 className="mt-4 font-bold">
        {title}
      </h3>

      <p className="mt-1 text-sm leading-6 text-gray-500 dark:text-gray-400">
        {text}
      </p>

    </div>
  );
};

const Info = ({ label, value }) => {
  return (
    <div className="rounded-xl bg-gray-50 p-3 dark:bg-gray-800">
      <p className="text-[11px] text-gray-400">
        {label}
      </p>

      <p className="mt-1 line-clamp-1 text-sm font-semibold">
        {value}
      </p>
    </div>
  );
};

export default Seeds;