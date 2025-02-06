import { Card } from "antd";
import { TBike } from "../../../types/bike.type";
type FeatureCardProps = {
  bike: TBike;
};
const { Meta } = Card;
const FeatureCard = ({ bike }: FeatureCardProps) => {
  console.log(bike.bikeImage);
  const { bikeImage, price, model, brand } = bike;
  return (
    <Card
      hoverable
      style={{ width: 240 }}
      cover={<img alt="example" src={bikeImage} />}
    >
      <Meta title={brand} description={model} />
    </Card>
  );
};

export default FeatureCard;
