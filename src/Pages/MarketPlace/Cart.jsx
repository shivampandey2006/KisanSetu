
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  ArrowLeft,
  ShieldCheck,
  Truck,
  ShoppingBag,
} from "lucide-react";

const Cart = () => {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);

  // =========================
  // LOAD ALL CART PRODUCTS
  // =========================

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = () => {
    const seedCart = JSON.parse(
      localStorage.getItem("kisanSetuSeedCart") || "[]"
    );

    const equipmentCart = JSON.parse(
      localStorage.getItem("kisanSetuEquipmentCart") || "[]"
    );

    // Dono carts ko combine karna
    const combinedCart = [
      ...seedCart.map((item) => ({
        ...item,
        cartType: "seed",
      })),

      ...equipmentCart.map((item) => ({
        ...item,
        cartType: "equipment",
      })),
    ];

    setCart(combinedCart);
  };

  // =========================
  // UPDATE LOCAL STORAGE
  // =========================

  const updateStorage = (updatedCart) => {
    const seedCart = updatedCart.filter(
      (item) => item.cartType === "seed"
    );

    const equipmentCart = updatedCart.filter(
      (item) => item.cartType === "equipment"
    );

    localStorage.setItem(
      "kisanSetuSeedCart",
      JSON.stringify(seedCart)
    );

    localStorage.setItem(
      "kisanSetuEquipmentCart",
      JSON.stringify(equipmentCart)
    );

    setCart(updatedCart);
  };

  // =========================
  // INCREASE QUANTITY
  // =========================

  const increaseQuantity = (id, cartType) => {
    const updatedCart = cart.map((item) =>
      item.id === id && item.cartType === cartType
        ? {
            ...item,
            quantity: item.quantity + 1,
          }
        : item
    );

    updateStorage(updatedCart);
  };

  // =========================
  // DECREASE QUANTITY
  // =========================

  const decreaseQuantity = (id, cartType) => {
    const updatedCart = cart
      .map((item) =>
        item.id === id && item.cartType === cartType
          ? {
              ...item,
              quantity: item.quantity - 1,
            }
          : item
      )
      .filter((item) => item.quantity > 0);

    updateStorage(updatedCart);
  };

  // =========================
  // REMOVE PRODUCT
  // =========================

  const removeProduct = (id, cartType) => {
    const updatedCart = cart.filter(
      (item) =>
        !(item.id === id && item.cartType === cartType)
    );

    updateStorage(updatedCart);
  };

  // =========================
  // CLEAR CART
  // =========================

  const clearCart = () => {
    localStorage.removeItem("kisanSetuSeedCart");
    localStorage.removeItem("kisanSetuEquipmentCart");

    setCart([]);
  };

  // =========================
  // TOTALS
  // =========================

  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const subtotal = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  const deliveryCharge =
    subtotal > 0 && subtotal < 500 ? 50 : 0;

  const total = subtotal + deliveryCharge;

  // =========================
  // EMPTY CART
  // =========================

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#f7f8f3] flex items-center justify-center px-5">

        <div className="text-center max-w-md">

          <div className="w-24 h-24 mx-auto rounded-full bg-green-100 flex items-center justify-center mb-6">
            <ShoppingCart
              size={42}
              className="text-green-700"
            />
          </div>

          <h1 className="text-3xl font-bold text-gray-900">
            Your Cart is Empty
          </h1>

          <p className="text-gray-500 mt-3 leading-6">
            You haven't added any products to your cart yet.
            Explore our marketplace and find products for
            your farming needs.
          </p>

          <button
            onClick={() =>
              navigate("/marketplace/seeds")
            }
            className="mt-7 bg-green-700 hover:bg-green-800 text-white px-7 py-3 rounded-xl font-semibold"
          >
            Explore Marketplace
          </button>

        </div>

      </div>
    );
  }

  // =========================
  // MAIN CART
  // =========================

  return (
    <div className="min-h-screen bg-[#f7f8f3] text-gray-800">

      {/* HEADER */}

      <div className="bg-white border-b border-gray-100">

        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-6">

          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-500 hover:text-green-700 mb-5"
          >
            <ArrowLeft size={18} />
            Continue Shopping
          </button>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

            <div>

              <div className="flex items-center gap-3">

                <div className="w-11 h-11 rounded-xl bg-green-100 flex items-center justify-center">
                  <ShoppingCart
                    size={23}
                    className="text-green-700"
                  />
                </div>

                <div>

                  <h1 className="text-3xl font-bold text-gray-900">
                    My Cart
                  </h1>

                  <p className="text-gray-500 text-sm mt-1">
                    {totalItems}{" "}
                    {totalItems === 1
                      ? "item"
                      : "items"}{" "}
                    in your cart
                  </p>

                </div>

              </div>

            </div>

            <button
              onClick={clearCart}
              className="text-red-500 hover:text-red-600 text-sm font-medium"
            >
              Clear Cart
            </button>

          </div>

        </div>

      </div>

      {/* CONTENT */}

      <main className="max-w-7xl mx-auto px-5 sm:px-8 py-10">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* PRODUCTS */}

          <div className="lg:col-span-2 space-y-4">

            {cart.map((item) => (

              <div
                key={`${item.cartType}-${item.id}`}
                className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 shadow-sm"
              >

                <div className="flex flex-col sm:flex-row gap-5">

                  {/* IMAGE */}

                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full sm:w-32 h-32 object-cover rounded-xl bg-gray-100"
                  />

                  {/* DETAILS */}

                  <div className="flex-1">

                    <div className="flex items-start justify-between gap-3">

                      <div>

                        <span className="inline-block px-2.5 py-1 bg-green-50 text-green-700 rounded-full text-xs font-semibold capitalize">
                          {item.cartType}
                        </span>

                        <h2 className="text-lg font-bold text-gray-900 mt-2">
                          {item.name}
                        </h2>

                        <p className="text-sm text-gray-500 mt-1">
                          {item.category}
                        </p>

                      </div>

                      <button
                        onClick={() =>
                          removeProduct(
                            item.id,
                            item.cartType
                          )
                        }
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg"
                        title="Remove"
                      >
                        <Trash2 size={19} />
                      </button>

                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-5">

                      {/* QUANTITY */}

                      <div className="flex items-center border border-gray-200 rounded-xl w-fit">

                        <button
                          onClick={() =>
                            decreaseQuantity(
                              item.id,
                              item.cartType
                            )
                          }
                          className="w-10 h-10 flex items-center justify-center hover:bg-gray-50"
                        >
                          <Minus size={16} />
                        </button>

                        <span className="w-10 text-center font-semibold">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            increaseQuantity(
                              item.id,
                              item.cartType
                            )
                          }
                          className="w-10 h-10 flex items-center justify-center hover:bg-gray-50"
                        >
                          <Plus size={16} />
                        </button>

                      </div>

                      {/* PRICE */}

                      <div className="text-left sm:text-right">

                        <p className="text-sm text-gray-400">
                          ₹
                          {item.price.toLocaleString(
                            "en-IN"
                          )}{" "}
                          × {item.quantity}
                        </p>

                        <p className="text-xl font-bold text-green-700">
                          ₹
                          {(
                            item.price *
                            item.quantity
                          ).toLocaleString("en-IN")}
                        </p>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

            ))}

            {/* TRUST FEATURES */}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3">

              <div className="bg-white rounded-2xl border border-gray-100 p-5 flex gap-3">

                <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
                  <ShieldCheck
                    size={21}
                    className="text-green-700"
                  />
                </div>

                <div>
                  <h3 className="font-semibold">
                    Secure Shopping
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    Your shopping experience is protected.
                  </p>
                </div>

              </div>

              <div className="bg-white rounded-2xl border border-gray-100 p-5 flex gap-3">

                <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
                  <Truck
                    size={21}
                    className="text-green-700"
                  />
                </div>

                <div>
                  <h3 className="font-semibold">
                    Farm Delivery
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    Products delivered to your location.
                  </p>
                </div>

              </div>

            </div>

          </div>

          {/* ORDER SUMMARY */}

          <div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:sticky lg:top-6">

              <h2 className="text-xl font-bold text-gray-900">
                Order Summary
              </h2>

              <div className="space-y-4 mt-6">

                <div className="flex justify-between text-gray-600">
                  <span>
                    Subtotal
                  </span>

                  <span className="font-medium text-gray-900">
                    ₹
                    {subtotal.toLocaleString(
                      "en-IN"
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>
                    Delivery
                  </span>

                  <span className="font-medium text-gray-900">
                    {deliveryCharge === 0
                      ? "FREE"
                      : `₹${deliveryCharge}`}
                  </span>
                </div>

                <div className="border-t border-gray-100 pt-4 flex justify-between">

                  <span className="font-bold text-lg">
                    Total
                  </span>

                  <span className="font-bold text-2xl text-green-700">
                    ₹
                    {total.toLocaleString(
                      "en-IN"
                    )}
                  </span>

                </div>

              </div>

              <button
                onClick={() =>
                  navigate("/marketplace/checkout")
                }
                className="w-full mt-7 bg-green-700 hover:bg-green-800 text-white py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2"
              >
                <ShoppingBag size={19} />
                Proceed to Checkout
              </button>

              <p className="text-center text-xs text-gray-400 mt-4">
                Secure checkout • Easy ordering
              </p>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
};

export default Cart;
