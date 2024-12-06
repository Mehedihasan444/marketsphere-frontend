import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import DynamicBreadcrumb from "../../../Components/Shared/DynamicBreadcrumb";
import ProductImages from "./ProductImages/ProductImages";
import ProductInfo from "./ProductInfo/ProductInfo";
import DetailsTab from "./DetailsTab/DetailsTab";

const ProductDetails = () => {
  const product = {};
  const breadcrumbItems = [
    {
      href: "/",
      title: <HomeOutlined />,
    },
    {
      href: "/products",
      title: (
        <>
          <UserOutlined />
          <span>Application List</span>
        </>
      ),
    },
    {
      title: "Shoes Reebok Zig Kinetica 3",
    },
  ];
  const images = [
    {
      original: "https://via.placeholder.com/400",
      thumbnail: "https://via.placeholder.com/80",
      description: "Main Product Image",
    },
    {
      original: "https://via.placeholder.com/400",
      thumbnail: "https://via.placeholder.com/80",
      description: "Thumbnail 1",
    },
    {
      original: "https://via.placeholder.com/400",
      thumbnail: "https://via.placeholder.com/80",
      description: "Thumbnail 2",
    },
    {
      original: "https://via.placeholder.com/400",
      thumbnail: "https://via.placeholder.com/80",
      description: "Thumbnail 3",
    },
  ];

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
          <DetailsTab />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
