
import { Alert, Spin } from "antd";
import ProductCard from "../../../../Components/Shared/ProductCard";
import { TProduct } from "../../../../Interface";
import { useState, useEffect, useRef } from "react";
import {  useGetProductsQuery } from "../../../../Redux/Features/Product/productApi";

const UnAuthorizedUserProducts = () => {

  const [page, setPage] = useState(1); // Track the current page
  const [products, setProducts] = useState<TProduct[]>([]); // Store fetched products
  const [hasMore, setHasMore] = useState(true); // Check if more products are available
  const { data, isLoading, error, isFetching } = useGetProductsQuery({page}, {
    skip: !hasMore, // Skip API call if no more products
  });

  const observerRef = useRef<HTMLDivElement | null>(null); // Reference for the observer

  // Update products and pagination state when data changes
  useEffect(() => {
    if (data?.data?.data) {
      setProducts((prevProducts) => [...prevProducts, ...data.data.data]); // Append new products
      setHasMore(data.data.data.length > 0); // Check if more products are available
    }
  }, [data]);

  // Infinite scroll logic using Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isFetching) {
          setPage((prevPage) => prevPage + 1); // Load next page when user scrolls to the end
        }
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [hasMore, isFetching]);

  // Loading Spinner
  if (isLoading && page === 1) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <Spin tip="Loading..." />
      </div>
    );
  }

  // Error Alert
  if (error) {
    return (
      <Alert
        message="Error"
        description="Failed to load products."
        type="error"
        showIcon
      />
    );
  }

  return (
    <div className="bg-white lg:mx-16 p-4 mt-4 shadow rounded-xl">
      {/* Header */}
      <div className="py-4">
        <h2 className="text-xl font-semibold pb-2">Just For You</h2>
        <hr />
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-2 items-center">
        {products?.map((product: TProduct, index: number) => (
          <ProductCard product={product} key={index} />
        ))}
      </div>

      {/* Infinite Scroll Loader */}
      {hasMore && (
        <div
          ref={observerRef}
          className="flex justify-center items-center py-4"
        >
          <Spin tip="Loading more products..." />
        </div>
      )}
    </div>
  );
};


export default UnAuthorizedUserProducts;