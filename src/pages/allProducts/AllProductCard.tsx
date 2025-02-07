import { Button, Card } from "antd";
import { TBike } from "../../types/bike.type";
const { Meta } = Card;

type AllProductCardProps = {
  bike: TBike;
};
const AllProductCard = ({ bike }: AllProductCardProps) => {
  console.log(bike);
  const { name, brand, model, category, price } = bike;
  return (
    <Card
      style={{ width: 300 }}
      cover={
        <img
          alt="example"
          src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        />
      }
    >
      <Meta
        className="text-black"
        title={name}
        description={
          <>
            <p className="font-bold text-black">Brand: {brand}</p>
            <p className="font-bold text-black">Model: {model}</p>
            <p className="font-bold text-black">Category: {category}</p>
            <p className="font-bold text-black">Price: {price}$</p>
            <div style={{ marginTop: "8px" }}>
              <Button type="primary">Product Details</Button>
            </div>
          </>
        }
      />
    </Card>
  );
};

export default AllProductCard;
