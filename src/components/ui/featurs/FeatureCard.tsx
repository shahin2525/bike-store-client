import { Card, Image } from "antd";
import { TBike } from "../../../types/bike.type";
type FeatureCardProps = {
  bike: TBike;
};

const FeatureCard = ({ bike }: FeatureCardProps) => {
  console.log(bike.bikeImage);
  const { bikeImage, description, brand } = bike;
  return (
    // <Card
    //   hoverable
    //   style={{ width: 400 }}
    //   cover={
    //     <div style={imageContainerStyle}>
    //         <img alt="example" src={bikeImage} />
    //         <div style={brandOverlayStyle}>{brand}</div>
    //     </div>
    //   }
    // ></Card>
    <div
      className=" rounded-md shadow-md dark:bg-gray-50 dark:text-gray-900"
      style={{ width: "400px", marginBottom: "10px" }}
    >
      <img
        src={bikeImage}
        alt=""
        className="object-cover object-center w-full rounded-md h-72 dark:bg-gray-500"
      />
      <div className="mt-6 mb-2">
        <h2 className="text-xl font-semibold tracking-wide">{brand}</h2>
      </div>
      <p
        className="dark:text-gray-800"
        style={{ marginBottom: "5px", paddingBottom: "5px" }}
      >
        {description}
      </p>
    </div>
  );
};

export default FeatureCard;
