import { Typography, Spin, Alert, Divider, Rate } from "antd";
import Review from "./Review";
import ReviewForm from "./ReviewForm";
import { useGetProductReviewsQuery } from "../../../Redux/Features/Review/reviewApi";

const { Title } = Typography;

const Reviews = ({ id }: { id: string }) => {
  const { data = {}, error, isLoading } = useGetProductReviewsQuery({ productId: id }, { skip: !id });
  const { reviewItems: reviews = [] } = data?.data || {};

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

  return (
    <div className="container mx-auto py-8">
      <Title level={1} className="mb-4">Product Reviews</Title>

      <div className="mb-8">
        <Title level={2} className="mb-4">
          Average Rating:
          <span>
            <Rate allowHalf defaultValue={3.5} />
          </span>
        </Title>
      </div>

      <Divider />

      <div className="mb-8">
        <Title level={2} className="mb-4">User Reviews</Title>
        {reviews?.map((review: any) => (
          <Review key={review._id} review={review} />
        ))}
      </div>

      <Divider />

      <ReviewForm id={id} />
    </div>
  );
};

export default Reviews;
