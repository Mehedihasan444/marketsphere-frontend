import {  Rate } from "antd";
import { UserOutlined, LikeOutlined, CommentOutlined, DislikeOutlined } from "@ant-design/icons";
import {  TReviewItem } from "../../../../Interface";

const ReviewCard = ({ review }: { review: TReviewItem }) => {

    return (  <div className="p-4 bg-white  rounded-md mb-4">
      <div className="flex items-center">
        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
          <UserOutlined />
        </div>
        <div className="ml-3">
          <h4 className="font-bold">{review?.customer?.name}</h4>
          <p className="text-sm text-gray-500">{new Date(review.createdAt).toDateString()}</p>
        </div>
      </div>
      <Rate allowHalf value={review.rating} disabled className="mt-2" />
      <p className="mt-2 text-gray-700">{review.comment}</p>
      <div className="flex items-center mt-3 gap-4">
        <button className="flex items-center gap-1 text-gray-600 hover:text-gray-800">
          <LikeOutlined />
          <span>{review?.likes ||32}</span>
        </button>
        <button className="flex items-center gap-1 text-gray-600 hover:text-gray-800">
          <DislikeOutlined />
          <span>{review?.likes|| 56}</span>
        </button>
        <button className="flex items-center gap-1 text-gray-600 hover:text-gray-800">
          <CommentOutlined />
          <span>{review?.replies || 65}</span>
        </button>
      </div>
    
    </div>)
  
 } ;

export default ReviewCard;