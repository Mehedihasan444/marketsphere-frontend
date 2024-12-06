import React from "react";
import { Carousel } from "antd";

const BannerCarousal: React.FC = () => (
  <Carousel autoplay arrows infinite={true} className="h-[362px]">
    <div className="h-[362px]">
      <img
        src="https://img.freepik.com/free-psd/smartphone-camera-control-social-media-banner-design-template_47987-25416.jpg?semt=ais_hybrid"
        alt=""
        className="object-cover h-full w-full "
      />
    </div>
    <div className="h-[362px]">
      <img
        src="https://img.freepik.com/premium-psd/smartphone-sale-banner-template_185005-374.jpg?semt=ais_hybrid"
        alt=""
        className="object-cover h-full w-full"
      />
    </div>
    <div className="h-[362px]">
      <img
        src="https://img.freepik.com/premium-psd/smartphone-sale-banner-template_185005-374.jpg?semt=ais_hybrid"
        alt=""
        className="object-cover h-full w-full"
      />
    </div>
    <div className="h-[362px]">
      <img
        src="https://img.freepik.com/premium-psd/smartphone-sale-banner-template_185005-374.jpg?semt=ais_hybrid"
        alt=""
        className="object-cover h-full w-full"
      />
    </div>
  </Carousel>
);

export default BannerCarousal;
