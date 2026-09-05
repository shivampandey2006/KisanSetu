import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  ShoppingCart,
  Heart,
  Star,
  Filter,
  ArrowUpDown,
  Eye,
  X,
  Plus,
  Minus,
  Leaf,
  ShieldCheck,
  Truck,
  Sprout,
  Sparkles,
  PackageCheck,
} from "lucide-react";

const fertilizerProducts = [
  {
    id: 1,
    name: "NPK 19:19:19",
    category: "NPK",
    price: 1250,
    oldPrice: 1400,
    rating: 4.8,
    reviews: 124,
    image:
      "https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=900&q=80",
    description:
      "Balanced water-soluble fertilizer suitable for a wide range of crops.",
    pack: "25 Kg",
    badge: "Best Seller",
  },
  {
    id: 2,
    name: "Urea Fertilizer",
    category: "Nitrogen",
    price: 320,
    oldPrice: 360,
    rating: 4.6,
    reviews: 98,
    image:
      "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=900&q=80",
    description:
      "High-nitrogen fertilizer that supports healthy plant growth and development.",
    pack: "45 Kg",
    badge: "Popular",
  },
  {
    id: 3,
    name: "DAP Fertilizer",
    category: "Phosphorus",
    price: 1350,
    oldPrice: 1500,
    rating: 4.7,
    reviews: 156,
    image:
      "https://images.unsplash.com/photo-1492496913980-501348b61469?auto=format&fit=crop&w=900&q=80",
    description:
      "Phosphorus-rich fertilizer for stronger roots and better crop development.",
    pack: "50 Kg",
    badge: "Top Rated",
  },
  {
    id: 4,
    name: "MOP Potash",
    category: "Potassium",
    price: 950,
    oldPrice: 1050,
    rating: 4.5,
    reviews: 76,
    image:
      "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=900&q=80",
    description:
      "Potassium fertilizer that helps improve crop quality and plant strength.",
    pack: "50 Kg",
    badge: "Value Pack",
  },
  {
    id: 5,
    name: "Organic Vermicompost",
    category: "Organic",
    price: 450,
    oldPrice: 550,
    rating: 4.9,
    reviews: 210,
    image:
      "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=900&q=80",
    description:
      "Natural organic compost that improves soil health and fertility.",
    pack: "25 Kg",
    badge: "Organic",
  },
  {
    id: 6,
    name: "Seaweed Organic Fertilizer",
    category: "Organic",
    price: 699,
    oldPrice: 799,
    rating: 4.7,
    reviews: 87,
    image:
      "https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=900&q=80",
    description:
      "Natural seaweed-based fertilizer for healthy roots and improved growth.",
    pack: "5 Litre",
    badge: "Eco Friendly",
  },
  {
    id: 7,
    name: "Micronutrient Mix",
    category: "Micronutrients",
    price: 780,
    oldPrice: 900,
    rating: 4.6,
    reviews: 64,
    image:
      "https://images.unsplash.com/photo-1592150621744-aca64f48394a?auto=format&fit=crop&w=900&q=80",
    description:
      "Essential micronutrients to support balanced crop nutrition.",
    pack: "10 Kg",
    badge: "New",
  },
  {
    id: 8,
    name: "Bio Fertilizer",
    category: "Bio",
    price: 520,
    oldPrice: 620,
    rating: 4.8,
    reviews: 112,
    image:
      "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=900&q=80",
    description:
      "Bio-based fertilizer designed to support soil health and plant growth.",
    pack: "5 Kg",
    badge: "Farmer Choice",
  },
];

const categories = [
  "All",
  "NPK",
  "Nitrogen",
  "Phosphorus",
  "Potassium",
  "Organic",
  "Micronutrients",
  "Bio",
];

const Fertilizers = () => {
  const navigate = useNavigate();

  const [checkingAuth, setCheckingAuth] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [mobileFilter, setMobileFilter] = useState(false);

  /* =========================
     AUTH
  ========================= */

  useEffect(() => {
    const currentUser = JSON.parse(
      localStorage.getItem("kisanSetuCurrentUser")
    );

    if (!currentUser) {
      alert("Please login as a Farmer first to buy fertilizers.");

      navigate("/login", {
        replace: true,
        state: {
          from: "/marketplace/fertilizers",
        },
      });

      return;
    }

    if (currentUser.role !== "farmer") {
      alert("Only farmers can buy agricultural fertilizers.");

      navigate("/buyer-dashboard", {
        replace: true,
      });

      return;
    }

    const savedCart = JSON.parse(
      localStorage.getItem("kisanSetuFertilizerCart") || "[]"
    );

    const savedWishlist = JSON.parse(
      localStorage.getItem("kisanSetuFertilizerWishlist") || "[]"
    );

    setCart(savedCart);
    setWishlist(savedWishlist);
    setCheckingAuth(false);
  }, [navigate]);

  /* =========================
     CART
  ========================= */

  const addToCart = (product) => {
    const existing = cart.find((item) => item.id === product.id);

    let updatedCart;

    if (existing) {
      updatedCart = cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedCart = [
        ...cart,
        {
          ...product,
          quantity: 1,
        },
      ];
    }

    setCart(updatedCart);

    localStorage.setItem(
      "kisanSetuFertilizerCart",
      JSON.stringify(updatedCart)
    );
  };

  const increaseQuantity = (id) => {
    const updatedCart = cart.map((item) =>
      item.id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );

    setCart(updatedCart);

    localStorage.setItem(
      "kisanSetuFertilizerCart",
      JSON.stringify(updatedCart)
    );
  };

  const decreaseQuantity = (id) => {
    const updatedCart = cart
      .map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0);

    setCart(updatedCart);

    localStorage.setItem(
      "kisanSetuFertilizerCart",
      JSON.stringify(updatedCart)
    );
  };

  /* =========================
     WISHLIST
  ========================= */

  const toggleWishlist = (id) => {
    let updatedWishlist;

    if (wishlist.includes(id)) {
      updatedWishlist = wishlist.filter((item) => item !== id);
    } else {
      updatedWishlist = [...wishlist, id];
    }

    setWishlist(updatedWishlist);

    localStorage.setItem(
      "kisanSetuFertilizerWishlist",
      JSON.stringify(updatedWishlist)
    );
  };

  /* =========================
     FILTER + SORT
  ========================= */

  const filteredProducts = useMemo(() => {
    let products = fertilizerProducts.filter((product) => {
      const searchMatch =
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.category.toLowerCase().includes(search.toLowerCase());

      const categoryMatch =
        category === "All" || product.category === category;

      return searchMatch && categoryMatch;
    });

    if (sortBy === "low") {
      products.sort((a, b) => a.price - b.price);
    }

    if (sortBy === "high") {
      products.sort((a, b) => b.price - a.price);
    }

    if (sortBy === "rating") {
      products.sort((a, b) => b.rating - a.rating);
    }

    return products;
  }, [search, category, sortBy]);

  /* =========================
     BUY NOW
  ========================= */

  const buyNow = (product) => {
    addToCart(product);
    navigate("/marketplace/cart");
  };

  if (checkingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-green-200 border-t-green-600" />

          <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
            Checking account...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-hidden bg-slate-50 text-slate-800 transition-colors duration-500 dark:bg-slate-950 dark:text-slate-100">

      {/* =========================
          BACKGROUND ANIMATION
      ========================= */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">

        <div className="absolute -left-32 top-40 h-80 w-80 animate-pulse rounded-full bg-green-300/20 blur-3xl dark:bg-green-900/10" />

        <div
          className="absolute -right-32 top-[50%] h-96 w-96 animate-pulse rounded-full bg-emerald-300/20 blur-3xl dark:bg-emerald-900/10"
          style={{ animationDelay: "1.5s" }}
        />

        <div
          className="absolute left-[40%] top-[70%] h-64 w-64 animate-pulse rounded-full bg-lime-300/10 blur-3xl dark:bg-lime-900/10"
          style={{ animationDelay: "3s" }}
        />

      </div>

      {/* =========================
          HERO
      ========================= */}

      <section className="relative overflow-hidden bg-gradient-to-br from-green-800 via-green-700 to-emerald-600 text-white">

        {/* Rotating rings */}

        <div className="absolute -right-24 -top-24 h-96 w-96 animate-[spin_20s_linear_infinite] rounded-full border border-white/10" />

        <div className="absolute -bottom-40 -left-32 h-[30rem] w-[30rem] animate-[spin_28s_linear_infinite_reverse] rounded-full border border-white/10" />

        {/* Floating circles */}

        <div className="absolute left-[10%] top-24 h-3 w-3 animate-bounce rounded-full bg-white/30" />

        <div
          className="absolute left-[20%] top-40 h-2 w-2 animate-bounce rounded-full bg-white/20"
          style={{ animationDelay: "0.5s" }}
        />

        <div
          className="absolute right-[20%] top-32 h-3 w-3 animate-bounce rounded-full bg-white/20"
          style={{ animationDelay: "1s" }}
        />

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">

          <div className="mx-auto max-w-4xl text-center">

            {/* Badge */}

            <div className="mb-5 inline-flex animate-[fadeIn_0.6s_ease-out] items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm backdrop-blur-md">

              <Sparkles size={16} />

              Quality Fertilizers for Better Crops
            </div>

            {/* Heading */}

            <h1 className="animate-[fadeInUp_0.7s_ease-out] text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">

              Grow Better with

              <span className="block text-green-200">
                Quality Fertilizers
              </span>

            </h1>

            <p className="mx-auto mt-5 max-w-2xl animate-[fadeInUp_0.9s_ease-out] text-base leading-7 text-green-50 sm:text-lg">

              Choose the right fertilizers for your crops and
              improve soil health, plant growth and productivity.

            </p>

            {/* Search */}

            <div className="mx-auto mt-8 max-w-2xl animate-[fadeInUp_1.1s_ease-out]">

              <div className="group flex items-center rounded-2xl border border-white/20 bg-white p-2 shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-green-950/40 dark:bg-slate-900">

                <Search
                  size={22}
                  className="ml-3 text-slate-400 transition-transform duration-300 group-focus-within:scale-110 group-focus-within:text-green-600"
                />

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search fertilizer..."
                  className="w-full bg-transparent px-3 py-3 text-slate-800 outline-none placeholder:text-slate-400 dark:text-white"
                />

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* =========================
          MAIN
      ========================= */}

      <main className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

        {/* Top controls */}

        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

          <div className="animate-[fadeInUp_0.5s_ease-out]">

            <div className="flex items-center gap-3">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 dark:bg-green-900/30">

                <Leaf
                  size={23}
                  className="text-green-600 dark:text-green-400"
                />

              </div>

              <div>

                <h2 className="text-2xl font-bold">
                  Shop Fertilizers
                </h2>

                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {filteredProducts.length} products available
                </p>

              </div>

            </div>

          </div>

          {/* Desktop sort */}

          <div className="hidden items-center gap-3 sm:flex">

            <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm dark:border-slate-800 dark:bg-slate-900">

              <ArrowUpDown
                size={17}
                className="text-slate-500"
              />

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-sm font-medium outline-none dark:bg-slate-900"
              >

                <option value="featured">
                  Featured
                </option>

                <option value="low">
                  Price: Low to High
                </option>

                <option value="high">
                  Price: High to Low
                </option>

                <option value="rating">
                  Top Rated
                </option>

              </select>

            </div>

            <button
              onClick={() => navigate("/marketplace/cart")}
              className="group relative flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-green-700 hover:shadow-lg active:scale-95"
            >

              <ShoppingCart
                size={19}
                className="transition-transform group-hover:scale-110"
              />

              Cart

              {cart.length > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1 text-xs font-bold text-green-700">
                  {cart.reduce(
                    (total, item) => total + item.quantity,
                    0
                  )}
                </span>
              )}

            </button>

          </div>

        </div>

        {/* =========================
            CATEGORY FILTER
        ========================= */}

        <div className="mb-8">

          <div className="mb-3 flex items-center justify-between">

            <div className="flex items-center gap-2">

              <Filter
                size={18}
                className="text-green-600"
              />

              <span className="font-semibold">
                Categories
              </span>

            </div>

            <button
              onClick={() => setMobileFilter(!mobileFilter)}
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm sm:hidden dark:border-slate-800"
            >
              Filter
            </button>

          </div>

          <div
            className={`flex flex-wrap gap-2 ${
              mobileFilter ? "flex" : "hidden sm:flex"
            }`}
          >

            {categories.map((item) => (

              <button
                key={item}
                onClick={() => setCategory(item)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 ${
                  category === item
                    ? "bg-green-600 text-white shadow-md shadow-green-600/20"
                    : "border border-slate-200 bg-white text-slate-600 hover:border-green-400 hover:text-green-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-green-600 dark:hover:text-green-400"
                }`}
              >
                {item}
              </button>

            ))}

          </div>

        </div>

        {/* =========================
            PRODUCT GRID
        ========================= */}

        {filteredProducts.length > 0 ? (

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {filteredProducts.map((product, index) => (

              <div
                key={product.id}
                className="group animate-[fadeInUp_0.6s_ease-out] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl dark:border-slate-800 dark:bg-slate-900"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >

                {/* Image */}

                <div className="relative h-56 overflow-hidden bg-slate-100 dark:bg-slate-800">

                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Image overlay */}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  {/* Badge */}

                  <div className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-green-700 shadow-md backdrop-blur-sm dark:bg-slate-900/95 dark:text-green-400">
                    {product.badge}
                  </div>

                  {/* Wishlist */}

                  <button
                    onClick={() =>
                      toggleWishlist(product.id)
                    }
                    className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 shadow-md backdrop-blur-sm transition-all duration-300 hover:scale-110 active:scale-90 dark:bg-slate-900/95"
                  >

                    <Heart
                      size={18}
                      className={
                        wishlist.includes(product.id)
                          ? "fill-red-500 text-red-500"
                          : "text-slate-600 dark:text-slate-300"
                      }
                    />

                  </button>

                  {/* Quick view */}

                  <button
                    onClick={() =>
                      setSelectedProduct(product)
                    }
                    className="absolute bottom-3 left-1/2 flex -translate-x-1/2 translate-y-12 items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-800 opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 dark:bg-slate-900 dark:text-white"
                  >

                    <Eye size={16} />

                    Quick View

                  </button>

                </div>

                {/* Content */}

                <div className="p-5">

                  <div className="mb-2 flex items-center justify-between">

                    <span className="rounded-md bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700 dark:bg-green-900/20 dark:text-green-400">
                      {product.category}
                    </span>

                    <div className="flex items-center gap-1 text-sm">

                      <Star
                        size={15}
                        className="fill-yellow-400 text-yellow-400"
                      />

                      <span className="font-semibold">
                        {product.rating}
                      </span>

                    </div>

                  </div>

                  <h3 className="line-clamp-1 text-lg font-bold">
                    {product.name}
                  </h3>

                  <p className="mt-2 line-clamp-2 text-sm leading-5 text-slate-500 dark:text-slate-400">
                    {product.description}
                  </p>

                  <p className="mt-2 text-xs text-slate-400">
                    Pack: {product.pack}
                  </p>

                  {/* Price */}

                  <div className="mt-4 flex items-end justify-between">

                    <div>

                      <div className="flex items-center gap-2">

                        <span className="text-xl font-extrabold text-green-700 dark:text-green-400">
                          ₹{product.price.toLocaleString("en-IN")}
                        </span>

                        <span className="text-sm text-slate-400 line-through">
                          ₹{product.oldPrice.toLocaleString("en-IN")}
                        </span>

                      </div>

                      <p className="mt-1 text-xs text-slate-400">
                        Inclusive of applicable taxes
                      </p>

                    </div>

                  </div>

                  {/* Quantity / buttons */}

                  <div className="mt-4">

                    {cart.find(
                      (item) => item.id === product.id
                    ) ? (

                      <div className="flex items-center justify-between rounded-xl border border-green-200 bg-green-50 p-2 dark:border-green-900/40 dark:bg-green-900/20">

                        <button
                          onClick={() =>
                            decreaseQuantity(product.id)
                          }
                          className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-green-700 shadow-sm transition hover:scale-105 dark:bg-slate-800 dark:text-green-400"
                        >
                          <Minus size={16} />
                        </button>

                        <span className="font-bold text-green-700 dark:text-green-400">
                          {
                            cart.find(
                              (item) =>
                                item.id === product.id
                            )?.quantity
                          }
                        </span>

                        <button
                          onClick={() =>
                            increaseQuantity(product.id)
                          }
                          className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-600 text-white shadow-sm transition hover:scale-105"
                        >
                          <Plus size={16} />
                        </button>

                      </div>

                    ) : (

                      <div className="flex gap-2">

                        <button
                          onClick={() =>
                            addToCart(product)
                          }
                          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-green-600 px-3 py-3 text-sm font-semibold text-green-700 transition-all duration-300 hover:-translate-y-0.5 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-950"
                        >

                          <ShoppingCart size={17} />

                          Add to Cart

                        </button>

                        <button
                          onClick={() => buyNow(product)}
                          className="rounded-xl bg-green-600 px-4 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-green-700 hover:shadow-lg active:scale-95"
                        >
                          Buy
                        </button>

                      </div>

                    )}

                  </div>

                </div>

              </div>

            ))}

          </div>

        ) : (

          /* NO RESULTS */

          <div className="animate-[fadeInUp_0.5s_ease-out] rounded-2xl border border-slate-200 bg-white px-6 py-20 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">

            <div className="mx-auto flex h-16 w-16 animate-bounce items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">

              <Search
                size={28}
                className="text-green-600 dark:text-green-400"
              />

            </div>

            <h3 className="mt-5 text-xl font-bold">
              No fertilizers found
            </h3>

            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Try another fertilizer name or category.
            </p>

            <button
              onClick={() => {
                setSearch("");
                setCategory("All");
              }}
              className="mt-5 rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
            >
              Clear Filters
            </button>

          </div>

        )}

        {/* =========================
            WHY KISANSETU
        ========================= */}

        <section className="mt-16">

          <div className="mb-8 text-center">

            <span className="text-sm font-semibold uppercase tracking-wider text-green-600 dark:text-green-400">
              Why Choose Us
            </span>

            <h2 className="mt-2 text-3xl font-bold">
              Better Products. Better Farming.
            </h2>

          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

            {/* Card 1 */}

            <div className="group rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110 dark:bg-green-900/30">

                <ShieldCheck
                  size={27}
                  className="text-green-600 dark:text-green-400"
                />

              </div>

              <h3 className="mt-4 font-bold">
                Quality Assured
              </h3>

              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Carefully selected agricultural products.
              </p>

            </div>

            {/* Card 2 */}

            <div className="group rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110 dark:bg-green-900/30">

                <Truck
                  size={27}
                  className="text-green-600 dark:text-green-400"
                />

              </div>

              <h3 className="mt-4 font-bold">
                Fast Delivery
              </h3>

              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Reliable delivery directly to your doorstep.
              </p>

            </div>

            {/* Card 3 */}

            <div className="group rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110 dark:bg-green-900/30">

                <Sprout
                  size={27}
                  className="text-green-600 dark:text-green-400"
                />

              </div>

              <h3 className="mt-4 font-bold">
                Farmer Friendly
              </h3>

              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Products selected with farmers in mind.
              </p>

            </div>

            {/* Card 4 */}

            <div className="group rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110 dark:bg-green-900/30">

                <PackageCheck
                  size={27}
                  className="text-green-600 dark:text-green-400"
                />

              </div>

              <h3 className="mt-4 font-bold">
                Trusted Products
              </h3>

              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Products for everyday agricultural needs.
              </p>

            </div>

          </div>

        </section>

      </main>

      {/* =========================
          PRODUCT MODAL
      ========================= */}

      {selectedProduct && (

        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-[fadeIn_0.25s_ease-out]"
          onClick={() => setSelectedProduct(null)}
        >

          <div
            className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl animate-[modalIn_0.35s_ease-out] dark:bg-slate-900"
            onClick={(e) => e.stopPropagation()}
          >

            {/* Close */}

            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-lg transition hover:scale-110 dark:bg-slate-800 dark:text-white"
            >
              <X size={20} />
            </button>

            <div className="grid md:grid-cols-2">

              {/* Image */}

              <div className="h-72 md:h-full">

                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="h-full w-full object-cover"
                />

              </div>

              {/* Details */}

              <div className="p-7">

                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 dark:bg-green-900/30 dark:text-green-400">
                  {selectedProduct.category}
                </span>

                <h2 className="mt-4 text-2xl font-bold">
                  {selectedProduct.name}
                </h2>

                <div className="mt-3 flex items-center gap-2">

                  <div className="flex items-center gap-1 text-sm">
                    <Star
                      size={16}
                      className="fill-yellow-400 text-yellow-400"
                    />

                    {selectedProduct.rating}
                  </div>

                  <span className="text-sm text-slate-400">
                    ({selectedProduct.reviews} reviews)
                  </span>

                </div>

                <p className="mt-5 text-sm leading-6 text-slate-500 dark:text-slate-400">
                  {selectedProduct.description}
                </p>

                <div className="mt-5">

                  <span className="text-3xl font-extrabold text-green-700 dark:text-green-400">
                    ₹
                    {selectedProduct.price.toLocaleString(
                      "en-IN"
                    )}
                  </span>

                  <span className="ml-2 text-sm text-slate-400 line-through">
                    ₹
                    {selectedProduct.oldPrice.toLocaleString(
                      "en-IN"
                    )}
                  </span>

                </div>

                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                  Pack Size: {selectedProduct.pack}
                </p>

                <div className="mt-6 flex gap-3">

                  <button
                    onClick={() => {
                      addToCart(selectedProduct);
                      setSelectedProduct(null);
                    }}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-green-600 px-4 py-3 font-semibold text-green-700 transition hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-950"
                  >

                    <ShoppingCart size={18} />

                    Add to Cart

                  </button>

                  <button
                    onClick={() =>
                      buyNow(selectedProduct)
                    }
                    className="rounded-xl bg-green-600 px-5 py-3 font-semibold text-white transition hover:bg-green-700 hover:shadow-lg"
                  >
                    Buy Now
                  </button>

                </div>

              </div>

            </div>

          </div>

        </div>

      )}

      {/* Custom Animations */}

      <style>{`

        @keyframes fadeIn {
          from {
            opacity: 0;
          }

          to {
            opacity: 1;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(25px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes modalIn {
          from {
            opacity: 0;
            transform: scale(0.94) translateY(20px);
          }

          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

      `}</style>

    </div>
  );
};

export default Fertilizers;