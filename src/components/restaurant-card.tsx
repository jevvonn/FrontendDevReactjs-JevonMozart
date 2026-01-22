import { Link } from "react-router";
import { getPriceSymbol } from "../lib/utils";
import type { Restaurant } from "../types/restaurant";

type Props = {
  data: Restaurant;
};

const RestaurantCard = ({ data }: Props) => {
  return (
    <div className="group bg-white rounded shadow hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full">
      <div className="relative overflow-hidden aspect-video">
        <img
          src={data.images[0]}
          alt={data.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3">
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold shadow-lg ${
              data.is_open ? "bg-green-500 text-white" : "bg-red-500 text-white"
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full mr-1.5 bg-white`}></span>
            {data.is_open ? "Open" : "Closed"}
          </span>
        </div>
      </div>

      <div className="p-5 flex flex-col grow">
        <div className="grow space-y-3">
          <h2 className="text-xl font-bold text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
            {data.name}
          </h2>

          <div className="flex flex-wrap gap-1.5">
            {data.categories.slice(0, 3).map((category, index) => (
              <span
                key={index}
                className="inline-block px-2.5 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full"
              >
                {category}
              </span>
            ))}
            {data.categories.length > 3 && (
              <span className="inline-block px-2.5 py-1 bg-gray-100 text-gray-500 text-xs font-medium rounded-full">
                +{data.categories.length - 3}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <div className="flex items-center gap-1.5">
              <span className="text-lg">⭐</span>
              <span className="font-semibold text-gray-900">{data.rating}</span>
              <span className="text-sm text-gray-500">/5</span>
            </div>
            <div className="text-lg font-bold text-blue-600">
              {getPriceSymbol(data.price_end_range)}
            </div>
          </div>
        </div>

        <Link
          to={`/restaurant/${data.id}`}
          className="mt-4 w-full py-2.5 text-center bg-blue-600 hover:bg-blue-700 active:bg-blue-800 transition-colors text-white font-semibold rounded-lg shadow-sm hover:shadow-md"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default RestaurantCard;
