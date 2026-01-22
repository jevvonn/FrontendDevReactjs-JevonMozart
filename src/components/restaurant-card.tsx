import type { Restaurant } from "../types/restaurant";

type Props = {
  data: Restaurant;
};

const RestaurantCard = ({ data }: Props) => {
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
