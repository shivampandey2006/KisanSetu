import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle2,
  MapPin,
  Package,
  IndianRupee,
  Upload,
  Sprout,
} from "lucide-react";

const SellProduce = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  const [formData, setFormData] = useState({
    crop: "",
    variety: "",
    quantity: "",
    unit: "Quintal",
    price: "",
    location: "",
    description: "",
  });

  const [image, setImage] = useState(null);

  // =========================
  // AUTH CHECK
  // =========================
  useEffect(() => {
    const currentUser = JSON.parse(
      localStorage.getItem("kisanSetuCurrentUser")
    );

    // Not logged in
    if (!currentUser) {
      navigate("/login", {
        replace: true,
        state: {
          from: "/marketplace/sell",
        },
      });

      return;
    }

    // Logged in but not a farmer
if (currentUser.role !== "farmer") {
  alert("Only farmers can sell produce.");
  navigate(-1);
  return;
}

    setUser(currentUser);
    setCheckingAuth(false);
  }, [navigate]);

  // =========================
  // INPUT CHANGE
  // =========================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================
  // IMAGE
  // =========================
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (file) {
      setImage(file);
    }
  };

  // =========================
  // SUBMIT
  // =========================
  const handleSubmit = (e) => {
    e.preventDefault();

    // Extra security check
    const currentUser = JSON.parse(
      localStorage.getItem("kisanSetuCurrentUser")
    );

    if (!currentUser) {
      navigate("/login", {
        state: {
          from: "/marketplace/sell",
        },
      });

      return;
    }

    if (currentUser.role !== "farmer") {
      alert("Only farmers can sell produce.");
      return;
    }

    const listing = {
      ...formData,
      imageName: image ? image.name : null,
      sellerEmail: currentUser.email,
      sellerRole: currentUser.role,
      createdAt: new Date().toISOString(),
    };

    // Save listing for now
    const existingListings =
      JSON.parse(localStorage.getItem("kisanSetuProduceListings")) || [];

    existingListings.push(listing);

    localStorage.setItem(
      "kisanSetuProduceListings",
      JSON.stringify(existingListings)
    );

    alert("Your produce has been listed successfully!");

    // Clear form
    setFormData({
      crop: "",
      variety: "",
      quantity: "",
      unit: "Quintal",
      price: "",
      location: "",
      description: "",
    });

    setImage(null);
  };

  // =========================
  // AUTH CHECKING SCREEN
  // =========================
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

  return (
    <div className="min-h-screen bg-[#f6fbf4] px-4 py-8 dark:bg-gray-950 sm:px-6 lg:px-8">

      {/* =========================
          TOP BAR
      ========================= */}
      <div className="mx-auto mb-8 flex w-full max-w-6xl items-center justify-between">

        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-white hover:text-green-700 dark:text-gray-300 dark:hover:bg-gray-900 dark:hover:text-green-400"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400">
            <Sprout size={17} />
          </div>

          <span className="hidden sm:block">
            {user?.email}
          </span>
        </div>
      </div>

      {/* =========================
          MAIN
      ========================= */}
      <div className="mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[1fr_320px]">

        {/* =========================
            FORM
        ========================= */}
        <div className="rounded-2xl border border-green-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-8">

          <div className="mb-8">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
              <Package size={23} />
            </div>

            <h1 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
              Sell Your Produce
            </h1>

            <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
              Add your crop details and connect with buyers across KisanSetu.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            {/* CROP + VARIETY */}
            <div className="grid gap-5 sm:grid-cols-2">

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Crop
                </label>

                <input
                  type="text"
                  name="crop"
                  value={formData.crop}
                  onChange={handleChange}
                  placeholder="e.g. Wheat"
                  required
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100 dark:border-gray-800 dark:bg-gray-950 dark:text-white dark:focus:ring-green-900"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Variety
                </label>

                <input
                  type="text"
                  name="variety"
                  value={formData.variety}
                  onChange={handleChange}
                  placeholder="e.g. Sharbati"
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100 dark:border-gray-800 dark:bg-gray-950 dark:text-white dark:focus:ring-green-900"
                />
              </div>

            </div>

            {/* QUANTITY + UNIT */}
            <div className="grid gap-5 sm:grid-cols-2">

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Quantity
                </label>

                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  placeholder="Enter quantity"
                  min="1"
                  required
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100 dark:border-gray-800 dark:bg-gray-950 dark:text-white dark:focus:ring-green-900"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Unit
                </label>

                <select
                  name="unit"
                  value={formData.unit}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100 dark:border-gray-800 dark:bg-gray-950 dark:text-white"
                >
                  <option value="Quintal">Quintal</option>
                  <option value="Kg">Kg</option>
                  <option value="Ton">Ton</option>
                </select>
              </div>

            </div>

            {/* PRICE */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Expected Price
              </label>

              <div className="relative">
                <IndianRupee
                  size={17}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Price per unit"
                  min="1"
                  required
                  className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100 dark:border-gray-800 dark:bg-gray-950 dark:text-white dark:focus:ring-green-900"
                />
              </div>
            </div>

            {/* LOCATION */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Location
              </label>

              <div className="relative">
                <MapPin
                  size={17}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Village / District / State"
                  required
                  className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100 dark:border-gray-800 dark:bg-gray-950 dark:text-white dark:focus:ring-green-900"
                />
              </div>
            </div>

            {/* DESCRIPTION */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                placeholder="Tell buyers about your produce..."
                className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100 dark:border-gray-800 dark:bg-gray-950 dark:text-white dark:focus:ring-green-900"
              />
            </div>

            {/* IMAGE */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Produce Image
              </label>

              <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 px-5 py-8 text-center transition hover:border-green-400 hover:bg-green-50/50 dark:border-gray-800 dark:hover:bg-green-950/20">

                <Upload
                  size={24}
                  className="mb-2 text-green-600"
                />

                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {image ? image.name : "Upload an image"}
                </span>

                <span className="mt-1 text-xs text-gray-400">
                  JPG, PNG or WEBP
                </span>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-700 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-green-800 active:scale-[0.99]"
            >
              <CheckCircle2 size={18} />
              List My Produce
            </button>

          </form>
        </div>

        {/* =========================
            SIDE INFO
        ========================= */}
        <div className="space-y-5">

          <div className="rounded-2xl bg-[#123524] p-6 text-white shadow-sm">
            <Sprout size={28} className="mb-5 text-[#a7d7b3]" />

            <h2 className="text-xl font-semibold">
              Sell smarter with KisanSetu
            </h2>

            <p className="mt-3 text-sm leading-6 text-[#c9dfce]">
              Reach potential buyers directly and get better visibility for
              your farm produce.
            </p>
          </div>

          <div className="rounded-2xl border border-green-100 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">

            <h3 className="font-semibold text-gray-900 dark:text-white">
              Before you list
            </h3>

            <div className="mt-5 space-y-4">

              {[
                "Enter accurate crop details",
                "Mention your expected price",
                "Add your location",
                "Upload a clear produce image",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2
                    size={17}
                    className="mt-0.5 shrink-0 text-green-600"
                  />

                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {item}
                  </p>
                </div>
              ))}

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SellProduce;