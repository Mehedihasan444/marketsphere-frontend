import { HomeOutlined, ProductFilled } from "@ant-design/icons";
import DynamicBreadcrumb from "../../../Components/Shared/DynamicBreadcrumb";
import ProductImages from "./ProductImages/ProductImages";
import ProductInfo from "./ProductInfo/ProductInfo";
import { useNavigate, useParams } from "react-router-dom";
import { useGetProductByIdQuery, useGetProductsQuery } from "../../../Redux/Features/Product/productApi";
import ProductDetailsTabs from "./Product_Details_Tabs/Product_Details_Tabs";
import { Alert, Button, Divider, Spin } from "antd";
import ProductCard from "../../../Components/Shared/ProductCard";
import { TProduct } from "../../../Interface";

const ProductDetails = () => {
  const productId = useParams<{ id: string }>().id;
  const navigate = useNavigate();
  const { data = {}, isLoading, error } = useGetProductByIdQuery(productId as string, { skip: !productId });
  const product = data?.data || {};

  const category = product?.category?.name;
  const { data: allProducts = {}, } = useGetProductsQuery({ category, }, { skip: !category });
  const { data: relatedProducts = [], } = allProducts?.data || {};


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
      href: `/products/${product?.category?.name}`,
      title: (
        <>
          {/* <ProductFilled /> */}
          <span>{product?.category?.name}</span>
        </>
      ),
    },
    {
      title: product?.name,
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
    <div className=" bg-neutral-100 ">
      <div className="lg:mx-16 max-w-8xl mx-auto bg-white p-8">
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
      {/* shop info */}
      <div className="">
        <div className="lg:mx-16 max-w-8xl mx-auto bg-white p-6 mt-4">
          <div className="flex justify-between items-center gap-4">

            <h2 className="text-2xl font-semibold ">Shop Information</h2>
            <Button variant="outlined" size="large" onClick={() => navigate(`/shops/${product.shop.id}`)}>GO TO STORE</Button>
          </div>
          <Divider />
          <div className="flex gap-4 mt-4 justify-between">
            <div className="flex items-center gap-4">
              <div className="">
                <img src={product.shop.logo} alt="shop logo" className="w-16 h-16 rounded-full" />
              </div>

              <div className="">

                <h3 className="text-xl font-semibold">{product.shop.name}</h3>
                <p className="text-gray-600">{product.shop.description}</p>
              </div>
            </div>

            <div className="flex gap-4 ">
              <div className="">
                <h3 className="font-semibold">Positive Seller Ratings</h3>
                <p className="text-3xl text-gray-600 font-bold text-center">91%</p>
              </div>
              <Divider type="vertical" variant="solid" className="h-full text-blue-500" />
              <div className="">
                <h3 className="font-semibold">Ship on Time</h3>
                <p className="text-3xl text-gray-600 font-bold text-center">100%</p>

              </div>
              <Divider type="vertical" variant="solid" className="h-full " />
              <div className="">
                <h3 className="font-semibold">Chat Response Rate</h3>
                <p className="text-3xl text-gray-600 font-bold text-center">100%</p>

              </div>


            </div>

          </div>
        </div>
      </div>
      {/* related products */}
      <div className=" lg:mx-16 max-w-8xl mx-auto bg-white p-6 mt-4">
        <div className="flex justify-between items-center gap-4">
          <h2 className="text-2xl font-semibold ">Related Products</h2>
          <Button variant="outlined" type="default" size="large" >Sell More</Button>
        </div>
        <Divider />
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-4">
          {
            relatedProducts?.map((p: TProduct, idx: number) => <ProductCard key={idx} product={p} />)
          }

        </div>
      </div>

    </div>
  );
};

export default ProductDetails;
