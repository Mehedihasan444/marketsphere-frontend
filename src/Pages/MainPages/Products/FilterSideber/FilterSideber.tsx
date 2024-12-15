/* eslint-disable @typescript-eslint/no-explicit-any */
import { Slider, Select } from "antd";
import { TCategory } from "../../../../Interface";
import { useGetAllCategoriesQuery } from "../../../../Redux/Features/Category/categoryApi";

interface FiltersProps {
  setBrand: (value: string) => void;
  setCategory: (value: string) => void;
}

const Filters = ({ setBrand, setCategory }: FiltersProps) => {
  // Fetch categories using the custom hook
  const { data } = useGetAllCategoriesQuery({ page: 1, limit: 100 });

  // Safely access the categories data
  const {data:categories} = data?.data || [];

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
          defaultValue={[0, 500000]}
          onChange={(value) => console.log("Price range:", value)} // Add proper handler if needed
        />
      </div>

      {/* Categories */}
      <div className="mb-6">
        <h4 className="font-semibold mb-2">Categories</h4>
        <Select
          style={{ width: "100%" }}
          placeholder="Select a category"
          onChange={(value) => setCategory(value)}
        >
          {categories?.map((category: TCategory) => (
            <Select.Option key={category.id} value={category.name}>
              {category.name}
            </Select.Option>
          ))}
        </Select>
      </div>
{/* brand */}
      <div className="mb-6">
        <h4 className="font-semibold mb-2">Brand</h4>
        <Select
          style={{ width: "100%" }}
          placeholder="Select a Brand"
          onChange={(value) => setBrand(value)}
          disabled
        >
          {categories?.map((category: TCategory) => (
            <Select.Option key={category.id} value={category.name}>
              {category.name}
            </Select.Option>
          ))}
        </Select>
      </div>
    </div>
  );
};

export default Filters;
