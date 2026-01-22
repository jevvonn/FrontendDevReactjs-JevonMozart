import RestaurantCard from "./components/reastaurant-card";

function App() {
  return (
    <main className="p-4">
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
            <div className="flex gap-2 content-center items-center border border-gray-200 shadow px-4 py-2 rounded cursor-pointer select-none">
              <input
                type="radio"
                defaultChecked={false}
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
              id=""
            >
              <option value="">Price</option>
              <option value="1">$</option>
              <option value="2">$$</option>
              <option value="3">$$$</option>
              <option value="4">$$$$</option>
            </select>

            <select
              name=""
              className="bg-transparent placeholder:text-slate-400 border border-slate-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer"
              id=""
            >
              <option value="">Category</option>
              <option value="Italian">Italian</option>
              <option value="Chinese">Chinese</option>
              <option value="Mexican">Mexican</option>
              <option value="Indian">Indian</option>
              <option value="French">French</option>
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
        {/* Restaurant Cards */}
        <div className="grid grid-cols-4 gap-4 mt-4">
          <RestaurantCard />
          <RestaurantCard />
          <RestaurantCard />
          <RestaurantCard />
          <RestaurantCard />
          <RestaurantCard />
          <RestaurantCard />
          <RestaurantCard />
          <RestaurantCard />
        </div>
      </div>
    </main>
  );
}

export default App;
