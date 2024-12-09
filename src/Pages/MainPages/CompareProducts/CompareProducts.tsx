import React, { useState } from "react";
import { Card, Button, Table, message } from "antd";
import SearchInput from "./SearchInput";

const CompareProducts: React.FC = () => {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  const handleAddProduct = (productId: string) => {
    if (selectedProducts.length >= 2) {
      return message.warning("You can compare only 2 products.");
    }
    if (!selectedProducts.includes(productId)) {
      setSelectedProducts((prev) => [...prev, productId]);
    }
  };

  const handleRemoveProduct = (productId: string) => {
    setSelectedProducts((prev) => prev.filter((id) => id !== productId));
  };

  const comparedProducts = selectedProducts.map((id) => {
    // Mocked product fetching for demonstration. Replace this with API logic or product fetching logic.
    const mockProducts = [
      {
        id: "1",
        name: "Product A",
        price: 100,
        brand: "Brand A",
        rating: 4.5,
        features: ["Feature 1", "Feature 2", "Feature 3"],
      },
      {
        id: "2",
        name: "Product B",
        price: 120,
        brand: "Brand B",
        rating: 4.0,
        features: ["Feature 1", "Feature 4", "Feature 5"],
      },
      {
        id: "3",
        name: "Product C",
        price: 90,
        brand: "Brand C",
        rating: 4.7,
        features: ["Feature 2", "Feature 3", "Feature 6"],
      },
    ];
    return mockProducts.find((product) => product.id === id);
  });

  const renderComparisonTable = () => {
    if (comparedProducts.length !== 2 || comparedProducts.includes(undefined)) {
      return null;
    }

    const [product1, product2] = comparedProducts;

    const comparisonData = [
      { feature: "Name", product1: product1?.name, product2: product2?.name },
      { feature: "Price", product1: `$${product1?.price}`, product2: `$${product2?.price}` },
      { feature: "Brand", product1: product1?.brand, product2: product2?.brand },
      { feature: "Rating", product1: `${product1?.rating} ⭐`, product2: `${product2?.rating} ⭐` },
      { feature: "Features", product1: product1?.features.join(", "), product2: product2?.features.join(", ") },
    ];

    return (
      <Table
        dataSource={comparisonData}
        columns={[
          { title: "Feature", dataIndex: "feature", key: "feature" },
          { title: product1?.name, dataIndex: "product1", key: "product1" },
          { title: product2?.name, dataIndex: "product2", key: "product2" },
        ]}
        rowKey="feature"
        pagination={false}
        bordered
      />
    );
  };

  return (
    <div className="bg-neutral-100 min-h-screen">
      <div className="p-6 max-w-8xl lg:mx-16 mx-auto bg-white shadow-md rounded-lg">
        <h2 className="text-xl font-bold mb-4">Compare Products</h2>
        <div className="flex gap-5 justify-between">
          {/* First Product */}
          <div className="flex-1">
            <div className="mb-4">
              <SearchInput onProductSelect={handleAddProduct} />
            </div>
            {comparedProducts[0] && (
              <Card
                title={comparedProducts[0].name}
                extra={
                  <Button type="link" onClick={() => handleRemoveProduct(comparedProducts[0]?.id!)}>
                    Remove
                  </Button>
                }
              >
                <p>Price: ${comparedProducts[0]?.price}</p>
                <p>Brand: {comparedProducts[0]?.brand}</p>
                <p>Rating: {comparedProducts[0]?.rating} ⭐</p>
                <p>Features: {comparedProducts[0]?.features.join(", ")}</p>
              </Card>
            )}
          </div>

          {/* Second Product */}
          <div className="flex-1">
            <div className="mb-4">
              <SearchInput onProductSelect={handleAddProduct} />
            </div>
            {comparedProducts[1] && (
              <Card
                title={comparedProducts[1].name}
                extra={
                  <Button type="link" onClick={() => comparedProducts[1] && handleRemoveProduct(comparedProducts[1].id)}>
                    Remove
                  </Button>
                }
              >
                <p>Price: ${comparedProducts[1]?.price}</p>
                <p>Brand: {comparedProducts[1]?.brand}</p>
                <p>Rating: {comparedProducts[1]?.rating} ⭐</p>
                <p>Features: {comparedProducts[1]?.features.join(", ")}</p>
              </Card>
            )}
          </div>
        </div>

        {/* Comparison Table */}
        {comparedProducts.filter((product) => product !== undefined).length === 2
          ? renderComparisonTable()
          : <p className="text-center text-gray-500">Select two products to compare.</p>}
      </div>
    </div>
  );
};

export default CompareProducts;
