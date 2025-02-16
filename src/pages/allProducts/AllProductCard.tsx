import { Button, Card } from "antd";
import { TBike } from "../../types/bike.type";
import { Link } from "react-router-dom";
const { Meta } = Card;

type AllProductCardProps = {
  bike: TBike;
};
const AllProductCard = ({ bike }: AllProductCardProps) => {
  // console.log(bike);
  const { bikeImage, name, brand, model, category, price, _id } = bike;
  return (
    <Card
      style={{ maxWidth: 300 }}
      cover={<img alt="example" src={bikeImage} />}
    >
      <Meta
        className="text-black"
        title={`Name: ${name}`}
        description={
          <>
            <p className="font-bold text-black">Brand: {brand}</p>
            <p className="font-bold text-black">Model: {model}</p>
            <p className="font-bold text-black">Category: {category}</p>
            <p className="font-bold text-black">Price: {price}$</p>
            <div style={{ marginTop: "8px" }}>
              <Button type="primary">
                <Link to={`/product-details/${_id}`}>Product Details</Link>
              </Button>
            </div>
          </>
        }
      />
    </Card>
  );
};

export default AllProductCard;
