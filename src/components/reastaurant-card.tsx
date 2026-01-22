const RestaurantCard = () => {
  const data = {
    createdAt: "2026-01-15T08:22:10.112Z",
    name: "The Rustic Spoon",
    categories: ["Italian", "Comfort Food"],
    is_open: false,
    price_start_range: 15,
    price_end_range: 40,
    images: [
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=800&q=60",
    ],
    rating: 4.5,
    reviews: [
      {
        user: {
          name: "Alice Johnson",
          image:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=60",
        },
        rating: 5,
        text: "Absolutely delicious pasta!",
      },
      {
        user: {
          name: "Mark Smith",
          image:
            "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=100&q=60",
        },
        rating: 4.5,
        text: "Great atmosphere but a bit noisy.",
      },
    ],
    google_maps_url: "https://maps.app.goo.gl/BQbQca3JnA2nCbtQ8",
    id: "1",
  };

  return (
    <div className="border border-gray-200 rounded shadow cursor-pointer hover:shadow-lg transition p-4">
      <div>
        <img
          src={data.images[0]}
          alt={data.name}
          className="w-full h-48 object-cover rounded"
        />
      </div>

      <div className="mt-2 space-y-2">
        <h2 className="text-xl font-bold ">{data.name}</h2>
        <p className="text-gray-600">{data.categories.join(", ")}</p>
        <p>Rating : ⭐ {data.rating}</p>
        <p
          className={`${data.is_open ? "text-green-600" : "text-red-600"} font-semibold`}
        >
          {data.is_open ? "Open Now" : "Closed"}
        </p>
        <p className="">
          Price Range: ${data.price_start_range} - ${data.price_end_range}
        </p>
      </div>

      <button className="w-full py-2 text-center bg-blue-700 mt-4 cursor-pointer hover:bg-blue-600 transition text-white rounded">
        Learn More
      </button>
    </div>
  );
};

export default RestaurantCard;
