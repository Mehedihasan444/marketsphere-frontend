
import { Slider, Checkbox } from "antd";

const Filters = ({ filters, setFilters }) => {
  const handlePriceChange = (value) => {
    setFilters({ ...filters, priceRange: value });
  };

  const handleCheckboxChange = (category) => {
    const updatedCategories = filters.categories.includes(category)
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category];
    setFilters({ ...filters, categories: updatedCategories });
  };

  return (
    <div className="p-4 bg-white border rounded-lg shadow-md">
      <h3 className="text-lg font-bold mb-4">Filters</h3>
      {/* Price Range */}
      <div className="mb-6">
        <h4 className="font-semibold mb-2">Price Range (৳)</h4>
        <Slider
          range
          min={0}
          max={500000}
          defaultValue={filters.priceRange}
          onChange={handlePriceChange}
        />
      </div>
      {/* Categories */}
      <div className="mb-6">
        <h4 className="font-semibold mb-2">Categories</h4>
        {["Laptops", "Mobiles", "Tablets", "Accessories"].map((category) => (
          <Checkbox
            key={category}
            onChange={() => handleCheckboxChange(category)}
            checked={filters.categories.includes(category)}
          >
            {category}
          </Checkbox>
        ))}
      </div>
    </div>
  );
};

export default Filters;
