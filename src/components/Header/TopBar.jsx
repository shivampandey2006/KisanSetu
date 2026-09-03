import {
  MapPin,
  CloudSun,
  TrendingUp,
  Bell,
} from "lucide-react";

const TopBar = () => {
  return (
    <div
      className="
        hidden md:block
        border-b
        border-gray-200
        bg-gray-50
        dark:border-gray-800
        dark:bg-gray-950
      "
    >
      <div
        className="
          mx-auto
          flex
          h-9
          w-[92%]
          max-w-7xl
          items-center
          justify-between
          text-xs
          text-gray-600
          dark:text-gray-400
        "
      >

        {/* Location */}
        <div className="flex items-center gap-2">
          <MapPin
            size={14}
            className="text-green-600"
          />

          <span>
            Bhopal, Madhya Pradesh
          </span>
        </div>


        {/* Weather */}
        <div className="flex items-center gap-2">
          <CloudSun
            size={15}
            className="text-green-600"
          />

          <span>
            28°C
          </span>

          <span className="hidden lg:inline">
            Partly Cloudy
          </span>
        </div>


        {/* Market Prices */}
        <div className="flex items-center gap-2">

          <TrendingUp
            size={15}
            className="text-green-600"
          />

          <span>
            Wheat ₹2,450/q
          </span>

          <span className="text-gray-300 dark:text-gray-700">
            |
          </span>

          <span>
            Soybean ₹4,890/q
          </span>

        </div>


        {/* Latest Updates */}
        <button
          className="
            flex
            items-center
            gap-2
            transition
            hover:text-green-600
            dark:hover:text-green-400
          "
        >
          <Bell size={14} />

          <span>
            Latest Updates
          </span>

        </button>

      </div>
    </div>
  );
};

export default TopBar;