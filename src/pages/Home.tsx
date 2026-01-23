import { getAllRestaurants } from "../service/restaurant.service";
import RestaurantCard from "../components/restaurant-card";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { PRICE_MAP, type PriceLevel } from "../types/price";
import { logout } from "../service/auth.service";
import { useNavigate } from "react-router";
import { useAppSelector } from "../hooks";

function Home() {
  const navigate = useNavigate();
  const userState = useAppSelector((state) => state.user);

  const { data: restaurants, isLoading } = useQuery({
    queryKey: ["restaurants"],
    queryFn: getAllRestaurants,
  });

  const [selectedPrice, setSelectedPrice] = useState<PriceLevel | "">("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isOpenOnly, setIsOpenOnly] = useState(false);

  const categories = useMemo(() => {
    if (!restaurants) return [];
    const allCategories = restaurants.flatMap((res) => res.categories);
    return Array.from(new Set(allCategories));
  }, [restaurants]);

  const filteredRestaurants = useMemo(() => {
    if (!restaurants) return [];

    return restaurants.filter((res) => {
      const matchesCategory =
        !selectedCategory || res.categories.includes(selectedCategory);
      const matchesOpenStatus = !isOpenOnly || res.is_open;

      let matchPrice = true;
      if (selectedPrice) {
        const { min, max } = PRICE_MAP[selectedPrice];
        matchPrice = res.price_start_range <= max && res.price_end_range >= min;
      }

      return matchesCategory && matchesOpenStatus && matchPrice;
    });
  }, [restaurants, selectedCategory, isOpenOnly, selectedPrice]);

  const resetFilters = () => {
    setSelectedCategory("");
    setIsOpenOnly(false);
    setSelectedPrice("");
  };

  const hasActiveFilters = selectedCategory || isOpenOnly || selectedPrice;

  const submitLogout = () => {
    logout();
    navigate("/login", {
      replace: true,
    });
  };

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

  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded shadow p-6 sm:p-8 mb-6">
          {userState && (
            <p className="text-lg text-gray-600 mb-2">
              Welcome back,{" "}
              <span className="font-medium">{userState.firstName}</span>!
            </p>
          )}
          <div className="flex justify-between items-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
              Restaurant List
            </h1>
            <button
              onClick={submitLogout}
              className="px-4 py-2 h-max bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md transition-colors shadow cursor-pointer"
            >
              Logout
            </button>
          </div>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
            Browse our curated list of restaurants. Use the filters to search by
            price, category, or check if a restaurant is currently open. Find
            the perfect place for your next meal!
          </p>
        </div>

        <div className="bg-white rounded shadow p-4 sm:p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 items-start sm:items-center">
              <label className="text-base sm:text-lg font-semibold text-gray-700 whitespace-nowrap">
                Filter By:
              </label>

              <label className="flex items-center gap-2 px-4 py-2.5 border-2 border-gray-200 rounded-md hover:border-blue-400 transition-colors cursor-pointer bg-white">
                <input
                  type="checkbox"
                  checked={isOpenOnly}
                  onChange={(e) => setIsOpenOnly(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
                />
                <span className="text-sm font-medium text-gray-700">
                  Open Now
                </span>
              </label>

              <select
                className="px-4 py-2.5 border-2 border-gray-200 rounded-md focus:outline-none focus:border-blue-500 hover:border-gray-300 transition-colors cursor-pointer bg-white text-sm font-medium text-gray-700 min-w-32"
                value={selectedPrice}
                onChange={(e) =>
                  setSelectedPrice(e.target.value as PriceLevel | "")
                }
              >
                <option value="">All Prices</option>
                <option value="$">$ - Budget</option>
                <option value="$$">$$ - Moderate</option>
                <option value="$$$">$$$ - Upscale</option>
                <option value="$$$$">$$$$ - Fine Dining</option>
              </select>

              <select
                className="px-4 py-2.5 border-2 border-gray-200 rounded-md focus:outline-none focus:border-blue-500 hover:border-gray-300 transition-colors cursor-pointer bg-white text-sm font-medium text-gray-700 min-w-40"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="px-5 py-2.5 border-2 border-gray-200 rounded-md font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 active:bg-gray-100 transition-all"
              >
                Clear All Filters
              </button>
            )}
          </div>

          {hasActiveFilters && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-sm text-gray-600">
                Showing {filteredRestaurants.length} of{" "}
                {restaurants?.length || 0} restaurants
              </p>
            </div>
          )}
        </div>

        {filteredRestaurants.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredRestaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} data={restaurant} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded shadow p-12 text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No restaurants found
            </h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your filters to see more results
            </p>
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition-colors shadow"
              >
                Clear All Filters
              </button>
            )}
          </div>
        )}
      </div>
    </main>
  );
}

export default Home;
