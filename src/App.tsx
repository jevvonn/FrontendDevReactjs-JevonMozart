import { getAllRestaurants } from "./service/restaurant.service";
import RestaurantCard from "./components/restaurant-card";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { PRICE_MAP, type PriceLevel } from "./types/price";

function App() {
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

  useEffect(() => {
    if (!restaurants) return;

    restaurants.forEach((res) => {
      console.log(res.price_end_range - res.price_start_range);
    });
  }, [restaurants]);

  if (isLoading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <main className="p-6">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold">Restaurant List</h1>
        <p className="text-lg">
          Browse our curated list of restaurants. Use the filters to search by
          price, category, or check if a restaurant is currently open. Find the
          perfect place for your next meal!
        </p>
      </div>

      <div className="mt-4">
        <hr />
        <div className="flex justify-between items-center">
          <div className="flex gap-3 my-4 items-center">
            <label className="text-lg font-semibold">Filter By :</label>
            <div className="bg-transparent placeholder:text-slate-400 border border-slate-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer flex items-center gap-2 justify-center">
              <input
                type="checkbox"
                checked={isOpenOnly}
                onChange={(e) => setIsOpenOnly(e.target.checked)}
                name="is_open"
                id="is_open"
              />
              <label htmlFor="is_open" className="cursor-pointer">
                Is Open
              </label>
            </div>

            <select
              name=""
              className="bg-transparent placeholder:text-slate-400 border border-slate-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer"
              value={selectedPrice}
              onChange={(e) =>
                setSelectedPrice(e.target.value as PriceLevel | "")
              }
            >
              <option value="">Price</option>
              <option value="$">$</option>
              <option value="$$">$$</option>
              <option value="$$$">$$$</option>
              <option value="$$$$">$$$$</option>
            </select>

            <select
              name=""
              className="bg-transparent placeholder:text-slate-400 border border-slate-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">Category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div>
            <button className="border border-gray-200 shadow px-4 py-2 rounded">
              Clear All
            </button>
          </div>
        </div>
        <hr />
      </div>

      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {filteredRestaurants &&
            filteredRestaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} data={restaurant} />
            ))}
        </div>
      </div>
    </main>
  );
}

export default App;
