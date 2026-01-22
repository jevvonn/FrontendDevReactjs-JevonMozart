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
            <div className="flex gap-2 content-center items-center border px-4 py-2 rounded cursor-pointer select-none">
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

            <select name="" className="px-4 py-2 border rounded" id="">
              <option value="">Price</option>
              <option value="1">$</option>
              <option value="2">$$</option>
              <option value="3">$$$</option>
              <option value="4">$$$$</option>
            </select>

            <select name="" className="px-4 py-2 border rounded" id="">
              <option value="">Category</option>
              <option value="Italian">Italian</option>
              <option value="Chinese">Chinese</option>
              <option value="Mexican">Mexican</option>
              <option value="Indian">Indian</option>
              <option value="French">French</option>
            </select>
          </div>
          <div>
            <button className="border px-4 py-2 rounded">Clear All</button>
          </div>
        </div>
        <hr />
      </div>
    </main>
  );
}

export default App;
