
import React, { useState } from "react";
import { Card, Button } from "antd";
import SearchInput from "./SearchInput";
import { useGetProductByIdQuery } from "../../../Redux/Features/Product/productApi";
import { useParams } from "react-router-dom";

const CompareProducts: React.FC = () => {
  const { id } = useParams();

  // States for product IDs
  const [leftProductId, setLeftProductId] = useState<string | null>(id || null);
  const [rightProductId, setRightProductId] = useState<string | null>(null);
  const [thirdProductId, setThirdProductId] = useState<string | null>(null);

  // Fetch product data
  const { data: leftData } = useGetProductByIdQuery(leftProductId as string, {
    skip: !leftProductId,
  });
  const { data: rightData } = useGetProductByIdQuery(rightProductId as string, {
    skip: !rightProductId,
  });
  const { data: thirdData } = useGetProductByIdQuery(thirdProductId as string, {
    skip: !thirdProductId,
  });

  // Extract product data
  const leftProduct = leftData?.data;
  const rightProduct = rightData?.data;
  const thirdProduct = thirdData?.data;

  const handleRemoveProduct = (side: "left" | "right" | "third") => {
    if (side === "left") setLeftProductId(null);
    if (side === "right") setRightProductId(null);
    if (side === "third") setThirdProductId(null);
  };

  return (
    <div className="bg-neutral-100 min-h-screen">
      <div className="p-6 max-w-8xl lg:mx-16 mx-auto bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Product Comparison</h2>

        {/* Search Inputs */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          {/* Left Product Input */}
          <div>
            <SearchInput onProductSelect={(id) => setLeftProductId(id)} />
            {leftProduct && (
              <Card
                className="mt-4 w-36"
                cover={<img src={leftProduct.images[0]} alt={leftProduct.name} />}
              >
                <h3 className="text-center font-bold">{leftProduct.name}</h3>
                <Button
                  type="link"
                  danger
                  className="block text-center"
                  onClick={() => handleRemoveProduct("left")}
                >
                  Remove
                </Button>
              </Card>
            )}
          </div>

          {/* Right Product Input */}
          <div>
            <SearchInput onProductSelect={(id) => setRightProductId(id)} />
            {rightProduct && (
              <Card
                className="mt-4 w-36"
                cover={<img src={rightProduct.images[0]} alt={rightProduct.name} />}
              >
                <h3 className="text-center font-bold">{rightProduct.name}</h3>
                <Button
                  type="link"
                  danger
                  className="block text-center"
                  onClick={() => handleRemoveProduct("right")}
                >
                  Remove
                </Button>
              </Card>
            )}
          </div>

          {/* Third Product Input */}
          <div>
            <SearchInput onProductSelect={(id) => setThirdProductId(id)} />
            {thirdProduct && (
              <Card
                className="mt-4 w-36"
                cover={<img src={thirdProduct.images[0]} alt={thirdProduct.name} />}
              >
                <h3 className="text-center font-bold">{thirdProduct.name}</h3>
                <Button
                  type="link"
                  danger
                  className="block text-center"
                  onClick={() => handleRemoveProduct("third")}
                >
                  Remove
                </Button>
              </Card>
            )}
          </div>
        </div>

        {/* Comparison Table */}
        <div className="mt-8">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr>
              <th className="border p-2 bg-gray-100 w-1/4">Attribute</th>
        <th className="border p-2 bg-gray-100 w-1/4">{leftProduct?.name || "Product 1"}</th>
        <th className="border p-2 bg-gray-100 w-1/4">{rightProduct?.name || "Product 2"}</th>
        <th className="border p-2 bg-gray-100 w-1/4">{thirdProduct?.name || "Product 3"}</th>
              </tr>
            </thead>
            <tbody className="">
              <tr>
                <td className="border p-2">Price</td>
                <td className="border p-2">${leftProduct?.price || "-"}</td>
                <td className="border p-2">${rightProduct?.price || "-"}</td>
                <td className="border p-2">${thirdProduct?.price || "-"}</td>
              </tr>
              <tr>
                <td className="border p-2">Rating</td>
                <td className="border p-2">{leftProduct?.rating || 0}</td>
                <td className="border p-2">{rightProduct?.rating || 0}</td>
                <td className="border p-2">{thirdProduct?.rating || 0}</td>
              </tr>
              <tr>
                <td className="border p-2">Model</td>
                <td className="border p-2">{leftProduct?.name || "-"}</td>
                <td className="border p-2">{rightProduct?.name || "-"}</td>
                <td className="border p-2">{thirdProduct?.name || "-"}</td>
              </tr>
              <tr>
                <td className="border p-2">Availability</td>
                <td className="border p-2">{leftProduct?.quantity || "-"}</td>
                <td className="border p-2">{rightProduct?.quantity || "-"}</td>
                <td className="border p-2">{thirdProduct?.quantity || "-"}</td>
              </tr>
              <tr>
                <td className="border p-2">Description</td>
                <td className="border p-2">{leftProduct?.description || "-"}</td>
                <td className="border p-2">{rightProduct?.description || "-"}</td>
                <td className="border p-2">{thirdProduct?.description || "-"}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CompareProducts;
