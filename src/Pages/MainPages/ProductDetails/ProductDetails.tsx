import { HomeOutlined, ProductFilled } from "@ant-design/icons";
import DynamicBreadcrumb from "../../../Components/Shared/DynamicBreadcrumb";
import ProductImages from "./ProductImages/ProductImages";
import ProductInfo from "./ProductInfo/ProductInfo";
import { useNavigate, useParams } from "react-router-dom";
import { useGetProductByIdQuery, useGetProductsQuery } from "../../../Redux/Features/Product/productApi";
import ProductDetailsTabs from "./Product_Details_Tabs/Product_Details_Tabs";
import { Alert, Button, Divider, message, Spin } from "antd";
import ProductCard from "../../../Components/Shared/ProductCard";
import { TCouponItem, TProduct } from "../../../Interface";
import { useGetSingleShopCouponsQuery } from "../../../Redux/Features/Coupon/couponApi";

const ProductDetails = () => {
  const productId = useParams<{ id: string }>().id;
  const navigate = useNavigate();
  const { data = {}, isLoading, error } = useGetProductByIdQuery(productId as string, { skip: !productId });
  const product = data?.data || {};
  const category = product?.category?.name;
  const { data: allProducts = {}, } = useGetProductsQuery({ category, }, { skip: !category });
  const { data: relatedProducts = [], } = allProducts?.data || {};

  const { data: couponsData = {} } = useGetSingleShopCouponsQuery(product?.shop?.id, { skip: !product?.shop?.id })
  const { couponItem: coupons = [] } = couponsData?.data || {}


  // breadcrumbs
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

  // extract images
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
    <div className="min-h-screen ">
      <div className="max-w-7xl mx-auto bg-white py-8">
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
        <Divider />
        {/* Coupons Section */}
        <div className="mt-4 p-4 bg-gray-50 rounded-lg ">
          <h3 className="text-lg font-semibold mb-4">Available Coupons</h3>
          <div className="flex items-center gap-4 w-full overflow-x-auto shadow-inner p-2 rounded-md bg-neutral-100">
            {coupons && coupons?.length > 0 ? (
              coupons?.map((coupon: TCouponItem) => (
                <div
                  key={coupon.id}
                  className="flex justify-between items-center border p-3 rounded-md bg-white shadow-sm hover:shadow-md transition
                    min-w-[400px] max-w-[400px] w-full sm:w-auto "
                >
                  <div>
                    <p className="text-md font-medium">
                      Code: <span className="font-bold text-blue-600">{coupon.code}</span>
                    </p>
                    <p className="text-sm text-gray-500">
                      Discount: {coupon.discount}% off
                    </p>
                    <p className="text-xs text-gray-400">
                      Expires on: {new Date(coupon.expiryDate).toLocaleDateString()}
                    </p>
                    <details>
                      <summary className="text-xs text-gray-400 cursor-pointer">Details</summary>
                      <p className="text-xs text-gray-400">{coupon.code.split("-")[1] === "100" ? "Minimum spend $500 To get discount" :
                        coupon.code.split("-")[1] === "500" ? "Minimum spend $1000 To get discount" :
                          coupon.code.split("-")[1] === "1000" ? "Minimum spend $1500 To get discount" :
                            coupon.code.split("-")[1] === "1500" ? "Minimum spend $2000 To get discount" :
                              coupon.code.split("-")[1] === "2000" ? "Minimum spend $2500 To get discount" :
                                coupon.code.split("-")[1] === "2500" ? "Minimum spend $3000 To get discount" : "Minimum spend $5000 To get discount"
                      }</p>
                    </details>
                  </div>
                  <div>
                    <Button
                      type="default"
                      variant="outlined"
                      // className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                      onClick={() => {
                        navigator.clipboard.writeText(coupon.code);
                        message.success('Coupon code copied!');
                      }}
                    >
                      Copy Code
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No coupons available at the moment.</p>
            )}
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-8">
          <ProductDetailsTabs id={product.id} />
        </div>
      </div>
      {/* shop info */}
      <div className="">
        <div className=" max-w-7xl mx-auto bg-white p-4 mt-4">
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
      <div className="  max-w-7xl mx-auto bg-white p-6 mt-4">
        <div className="flex justify-between items-center gap-4">
          <h2 className="text-2xl font-semibold ">Related Products</h2>
          <Button variant="outlined" type="default" size="large" >Sell More</Button>
        </div>
        <Divider />
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-4">
          {
            relatedProducts?.length === 0 && <p className="text-gray-500">No related products found.</p>
          }
          {
            relatedProducts?.map((p: TProduct, idx: number) => <ProductCard key={idx} product={p} />)
          }

        </div>
      </div>

    </div>
  );
};

export default ProductDetails;
