import React, { useState } from "react";
import { Card, message } from "antd";
import SearchInput from "./SearchInput";
import { useGetProductByIdQuery } from "../../../Redux/Features/Product/productApi";
import { useParams } from "react-router-dom";
import { TProduct } from "../../../Interface";


const CompareProducts: React.FC = () => {
  const {id}=useParams();
  const { data={}, error } =  useGetProductByIdQuery(id as string ,{skip:!id});
  const product = data?.data;
  const [productLeft, setProductLeft] = useState<TProduct | null>(product||null);
  const [productRight, setProductRight] = useState<TProduct | null>(null);

  
  const fetchProductDetails = async (productId: string, setProduct: React.Dispatch<React.SetStateAction<Product | null>>) => {
    const { data, error } = await useGetProductByIdQuery(productId);
    if (error) {
      message.error("Failed to fetch product details.");
      return;
    }
    const product = data?.data;
    if (product) {
      setProduct(product);
    }
  };

  const handleProductSelect = (productId: string, side: "left" | "right") => {
    if (side === "left") {
      fetchProductDetails(productId, setProductLeft);
    } else {
      fetchProductDetails(productId, setProductRight);
    }
  };

  return (
    <div className="bg-neutral-100 min-h-screen">
      <div className="p-6 max-w-8xl lg:mx-16 mx-auto bg-white shadow-md rounded-lg">
        <h2 className="text-xl font-bold mb-4 text-center">Compare Products</h2>
        <div className="flex gap-10">
          {/* Left Column */}
          <div className="flex-1">
            <div className="mb-4">
              <SearchInput onProductSelect={(productId) => handleProductSelect(productId, "left")} />
            </div>
            {productLeft ? (
              <Card title={productLeft.name} className="shadow-md">
                <p>Price: ${productLeft.price}</p>
                {/* <p>Brand: {productLeft?.brand}</p> */}
                <p>Rating: {productLeft.rating} ⭐</p>
                {/* <p>Features: {productLeft?.features.join(", ")}</p> */}
              </Card>
            ) : (
              <p className="text-center text-gray-500">Select a product to see its details.</p>
            )}
          </div>

          {/* Right Column */}
          <div className="flex-1">
            <div className="mb-4">
              <SearchInput onProductSelect={(productId) => handleProductSelect(productId, "right")} />
            </div>
            {productRight ? (
              <Card title={productRight.name} className="shadow-md">
                <p>Price: ${productRight.price}</p>
                {/* <p>Brand: {productRight.brand}</p> */}
                <p>Rating: {productRight.rating} ⭐</p>
                {/* <p>Features: {productRight.features.join(", ")}</p> */}
              </Card>
            ) : (
              <p className="text-center text-gray-500">Select a product to see its details.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompareProducts;
