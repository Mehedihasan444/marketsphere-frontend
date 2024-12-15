import { useParams } from "react-router-dom";
import AllProducts from "./AllProducts/AllProducts";
import FeaturedProducts from "./FeaturedProducts/FeaturedProducts";
import NewArrivalProducts from "./NewArrivalProducts/NewArrivalProducts";
import TopSellingProducts from "./TopSellingProducts/TopSellingProducts";
import { useGetShopQuery } from "../../../Redux/Features/Shop/shopApi";
import { useEffect, useState } from "react";
import { TProduct } from "../../../Interface";
import ShopDetails from "./ShopDetails/ShopDetails";
import { Alert, Spin } from "antd";

const Shop = () => {
  const { id } = useParams<{ id: string }>();
  const { data: shop = {}, isLoading, error } = useGetShopQuery(id!, { skip: !id });
  const shopData = shop?.data || {};

  const [newArrival, setNewArrival] = useState<TProduct[]>([]);



  useEffect(() => {
    async function fetchNewArrivals() {
      const newArr = await shopData?.products?.filter((product: TProduct) => new Date(product.createdAt).getTime() > new Date().getTime() - 7 * 24 * 60 * 60 * 1000) || [];
      setNewArrival(newArr);
    }
    fetchNewArrivals();
  }, [shopData?.products]);



  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <Spin tip="Loading..." />
      </div>
    );
  }

  if (error) {
    return (
      <Alert
        message="Error"
        description="Failed to load shop details."
        type="error"
        showIcon
      />
    );
  }
  return (
    <div className=" bg-neutral-100 min-h-screen pb-4">
      <div className="max-w-8xl mx-auto lg:mx-16">
        {/* Vendor Details */}
        <ShopDetails shop={shopData} />
        <NewArrivalProducts products={newArrival} />
        <TopSellingProducts products={newArrival} />
        <FeaturedProducts products={newArrival}/>
        {/* Product List */}
        <AllProducts products={shopData?.products} />
      </div>
    </div>
  );
};

export default Shop;
