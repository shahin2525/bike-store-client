import { TBike } from "../../types/bike.type";

type AllProductCardProps = {
  bike: TBike;
};
const AllProductCard = ({ bike }: AllProductCardProps) => {
  console.log(bike);
  return (
    <div>
      <h1>All product card</h1>
    </div>
  );
};

export default AllProductCard;
