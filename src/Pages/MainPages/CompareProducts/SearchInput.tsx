import React, { useState } from "react";
import { Select } from "antd";
import { useGetProductsQuery } from "../../../Redux/Features/Product/productApi";
import { TProduct } from "../../../Interface";

const SearchInput: React.FC<{ onProductSelect: (id: string) => void }> = ({
  onProductSelect,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const { data: searchResults = [], isFetching } = useGetProductsQuery(
    { searchTerm, brand, category, page: 1, limit: 10 },
    {
      skip: !searchTerm, // Skip query execution when there's no input
    }
  );

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const handleChange = (value: string) => {
    onProductSelect(value); // Pass selected product ID to parent
  };

  return (
    <Select
      showSearch
      placeholder="Search for a product"
      style={{ width: "100%" }}
      onSearch={handleSearch}
      onChange={handleChange}
      loading={isFetching}
      options={searchResults.map((product: TProduct) => ({
        value: product.id,
        label: product.name,
      }))}
    />
  );
};

export default SearchInput;
