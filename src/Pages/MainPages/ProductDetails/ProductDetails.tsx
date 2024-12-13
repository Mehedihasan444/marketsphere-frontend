import { HomeOutlined, ProductFilled } from "@ant-design/icons";
import DynamicBreadcrumb from "../../../Components/Shared/DynamicBreadcrumb";
import ProductImages from "./ProductImages/ProductImages";
import ProductInfo from "./ProductInfo/ProductInfo";
import { useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../../../Redux/Features/Product/productApi";
import ProductDetailsTabs from "./Product_Details_Tabs";
import { Alert, Spin } from "antd";

const ProductDetails = () => {
  const productId = useParams<{ id: string }>().id;
  const { data={} ,isLoading,error} = useGetProductByIdQuery(productId as string);
  const product = data?.data || {};


  const breadcrumbItems = [
    {
      href: "/",
      title: <HomeOutlined />,
    },
    {
      href: "/products",
      title: (
        <>
          <ProductFilled />
          <span>Products</span>
        </>
      ),
    },
    {
      title:  product.name ,
    },
  ];
  const images = product?.images?.map((image: string) => ({
    original: image,
    thumbnail: image,
    description: product.name,
  })) || [];

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
        description="Failed to load product details."
        type="error"
        showIcon
      />
    );
  }
  return (
    <div className="p-6 bg-neutral-100 ">
      <div className="lg:mx-16 max-w-8xl mx-auto bg-white p-4">
        {/* Breadcrumb */}
        <div className="mb-4">
          <DynamicBreadcrumb items={breadcrumbItems} />
        </div>

        {/* Product Info Section */}
        <div className="mt-6 flex flex-col lg:flex-row gap-8">
          {/* Left Section: Product Images */}
          <div className="flex-1">
            <ProductImages images={images} />
          </div>

          {/* Right Section: Product Details */}
          <div className="flex-1">
            <ProductInfo product={product} />
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-8">
          <ProductDetailsTabs id={product.id} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
