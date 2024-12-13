import { Divider, Rate } from "antd";

const ReviewSummary = () => {
    
    return (
    <div className="bg-gray-100 p-4 rounded-md shadow-sm">
        <div className="flex justify-between items-center">  


      <Rate allowHalf value={4.8} disabled className="text-4xl"/>
      <h3 className="text-4xl font-bold mb-2">4.8</h3>
        </div>
        <Divider />
      <ul className="mt-3 space-y-2">
        {[5, 4, 3, 2, 1].map((star) => (
          <li key={star} className="flex items-center">
            <div className="flex-1 text-gray-600">{star} stars</div>
            <div className="bg-gray-300 h-3 w-1/2 rounded-full overflow-hidden">
              <div
                className="bg-yellow-500 h-full"
                style={{ width: `${star * 20}%` }}
              ></div>
            </div>
            <span className="ml-2 text-sm">{Math.floor(star * Math.random() * 10)}</span>
          </li>
        ))}
      </ul>
    </div>
  )};

  export default ReviewSummary;