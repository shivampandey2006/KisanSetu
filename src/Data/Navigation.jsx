export const navItems = [

  {
    name: "home",
    path: "/",
  },

  {
    name: "market",
    path: "/market",

    dropdown: [
      {
        name: "liveMandiPrices",
        path: "/market/mandi-prices",
      },
      {
        name: "nearbyMandis",
        path: "/market/nearby",
      },
      {
        name: "priceTrends",
        path: "/market/trends",
      },
    ],
  },

  {
    name: "marketplace",
    path: "/marketplace",

    dropdown: [
      {
        name: "sellProduce",
        path: "/marketplace/sell",
      },
      {
        name: "buySeeds",
        path: "/marketplace/seeds",
      },
      {
        name: "fertilizers",
        path: "/marketplace/fertilizers",
      },
      {
        name: "equipment",
        path: "/marketplace/equipment",
      },
    ],
  },

  {
    name: "weather",
    path: "/weather",
  },

  {
    name: "schemesUpdates",
    path: "/schemes",

    dropdown: [
      {
        name: "governmentSchemes",
        path: "/schemes/government",
      },
      {
        name: "agricultureNews",
        path: "/schemes/news",
      },
      {
        name: "importantAlerts",
        path: "/schemes/alerts",
      },
    ],
  },

];