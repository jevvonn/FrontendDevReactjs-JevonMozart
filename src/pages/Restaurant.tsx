import { useParams } from "react-router";
import { getSpecificRestaurant } from "../service/restaurant.service";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const RestaurantPage = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["restaurants", id],
    queryFn: () => getSpecificRestaurant(id!),
  });
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-lg text-gray-600">Loading restaurants...</p>
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-red-600">Restaurant Not Found!</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 lg:p-8">
            <div className="space-y-4">
              <div className="aspect-video w-full rounded-lg overflow-hidden bg-gray-200">
                <img
                  src={data.images[selectedImageIndex]}
                  alt={data.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-4 gap-3">
                {data.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`aspect-square rounded-lg overflow-hidden transition-all ${
                      selectedImageIndex === index
                        ? "ring-4 ring-blue-500 scale-95"
                        : "hover:ring-2 hover:ring-gray-300"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${data.name}-${index}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div>
                  <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                    {data.name}
                  </h1>
                  <div className="flex flex-wrap gap-2">
                    {data.categories.map((category, index) => (
                      <span
                        key={index}
                        className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-lg">
                  <span className="text-2xl">⭐</span>
                  <span className="font-semibold text-gray-900">
                    {data.rating}
                  </span>
                  <span className="text-gray-500">/5</span>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <p className="text-gray-700 mb-2 font-medium">Price Range</p>
                  <p className="text-2xl font-bold text-gray-900">
                    ${data.price_start_range} - ${data.price_end_range}
                  </p>
                </div>
              </div>

              <div className="border-gray-200 pt-4">
                <div
                  className={`inline-flex items-center px-4 py-2 rounded-full font-semibold text-sm ${
                    data.is_open
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full mr-2 ${
                      data.is_open ? "bg-green-600" : "bg-red-600"
                    }`}
                  ></span>
                  {data.is_open ? "Open Now" : "Closed"}
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 p-6 lg:p-8">
            <div className="max-w-3xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Reviews</h2>
              {data.reviews.length === 0 ? (
                <p className="text-gray-600">No reviews available.</p>
              ) : (
                <div className="space-y-6">
                  {data.reviews.map((review, index) => (
                    <div
                      key={index}
                      className="border-b flex gap-2 border-gray-200 pb-4"
                    >
                      <div className="flex items-center mb-1">
                        <img
                          src={review.user.image}
                          alt={review.user.name}
                          className="w-10 h-10 rounded-full object-cover mr-3"
                        />
                      </div>
                      <div>
                        <div className="flex items-center mb-2">
                          <span className="text-lg font-semibold text-gray-900">
                            {review.user.name}
                          </span>
                          <span className="ml-4 text-yellow-500">
                            {"⭐".repeat(review.rating)}
                          </span>
                        </div>
                        <p className="text-gray-700">{review.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default RestaurantPage;
