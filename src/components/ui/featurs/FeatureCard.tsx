import { Button } from "antd";
import { TBike } from "../../../types/bike.type";
import { Link } from "react-router-dom";
type FeatureCardProps = {
  bike: TBike;
};

const FeatureCard = ({ bike }: FeatureCardProps) => {
  const { bikeImage, description, brand, _id } = bike;
  return (
    <div
      className=" rounded-md shadow-md dark:bg-gray-50 dark:text-gray-900"
      style={{ maxWidth: "400px", marginBottom: "10px" }}
    >
      <img
        src={bikeImage}
        alt=""
        className="object-cover object-center w-full rounded-md h-72 dark:bg-gray-500"
      />
      <div className="mt-6 mb-2" style={{ padding: "0 6px" }}>
        <h2 className="text-xl font-semibold tracking-wide">{brand}</h2>
      </div>
      <p
        className="dark:text-gray-800"
        style={{ marginBottom: "5px", padding: "6px" }}
      >
        {description}
      </p>
      <div style={{ padding: "4px 7px" }}>
        <Button type="primary">
          <Link to={`/product-details/${_id}`}>Bike Details</Link>
        </Button>
      </div>
    </div>
  );
};

export default FeatureCard;
