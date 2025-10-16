import { Spin, Alert, Divider, Dropdown, Menu, Button, Avatar, Tooltip } from "antd";
// import Review from "./Review";
// import ReviewForm from "./ReviewForm";
import { useGetProductReviewsQuery } from "../../../../Redux/Features/Review/reviewApi";
import ReviewCard from "../ReviewCard/ReviewCard";
import ReviewSummary from "../ReviewSummary/ReviewSummary";
import { FiFilter } from "react-icons/fi";
import { AntDesignOutlined, UserOutlined } from '@ant-design/icons';
import { TReviewItem } from "../../../../Interface";

const Reviews = ({ id }: { id: string }) => {
  const { data = {}, error, isLoading } = useGetProductReviewsQuery({ productId: id }, { skip: !id });
  const { reviewItems = [] } = data?.data || {};

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <Spin tip="Loading..." />
      </div>
    );
  }


  if (error) {
    return <Alert message="Error" description="Error loading reviews." type="error" showIcon />;
  }
  const sortMenu = (
    <Menu >
      <Menu.Item key="newest">Newest</Menu.Item>
      <Menu.Item key="highest">Highest Rating</Menu.Item>
      <Menu.Item key="lowest">Lowest Rating</Menu.Item>
    </Menu>
  );

  return (
    <div className="p-6  min-h-[50vh]">
      <div className=" flex justify-between  lg:gap-8 gap-6">
        {/* Left Section */}
        <div className="lg:w-3/5 w-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Reviews</h2>
            <Dropdown overlay={sortMenu} trigger={["click"]}>
              <Button icon={<FiFilter />} iconPosition="end" className="p-2 bg-gray-200 rounded-md">Newest</Button>
            </Dropdown>
          </div>
          {
            reviewItems.length === 0 && (
              <div className="text-center py-10">
                <p className="text-gray-500">No reviews yet. Be the first to review this product!</p>
              </div>
            )
          }
          {reviewItems?.map((review:TReviewItem) => (
            <>
              <ReviewCard key={review.id} review={review} />
              <Divider />
            </>
          ))}
        </div>

        {/* Right Section */}
        <div className="lg:w-2/5 w-full">
          <ReviewSummary />
          <div className="mt-6 bg-gray-100 p-4 rounded-md shadow-sm">
            {/* Placeholder for promotional content */}
            <div className="p-10 space-y-2 bg-gray-200 rounded-md ">
              <h2 className="text-4xl font-bold font-sans ">
                Popular brands with discount over 25%
              </h2>
              <div className="">

                <Avatar.Group>
                  <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />
                  <a href="https://ant.design">
                    <Avatar style={{ backgroundColor: '#f56a00' }}>K</Avatar>
                  </a>
                  <Tooltip title="Ant User" placement="top">
                    <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                  </Tooltip>
                  <Avatar style={{ backgroundColor: '#1677ff' }} icon={<AntDesignOutlined />} />
                </Avatar.Group>
              </div>
              <Button type="primary" className="mt-4">Shop Now</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Reviews;
