import { Link, useParams } from "react-router-dom";
import { useGetSingleBikeQuery } from "../../redux/feature/bike/bikApi";
import { Button, Card } from "antd";
import { useEffect } from "react";
import { toast } from "sonner";

const ProductDetails = () => {
  const { productId } = useParams();

  const { data, isFetching } = useGetSingleBikeQuery(productId);
  useEffect(() => {
    if (isFetching) {
      const id = toast.loading("Data is loading...");

      // Dismiss after 2 seconds
      setTimeout(() => {
        toast.dismiss(id);
      }, 2000);
    }
  }, [isFetching]); // Only depends on `isFetching`

  if (isFetching && data === undefined) {
    return null;
  }

  // console.log(data?.data);
  const bike = data?.data;
  // console.log("bike", bike);
  const {
    bikeImage,
    stock,
    name,
    brand,
    model,
    price,
    quantity,
    description,
    category,
    _id,
  } = bike;
  return (
    <div
      className="flex items-center justify-center"
      style={{ marginTop: "20px", marginBottom: "20px" }}
    >
      <Card
        style={{ width: 600 }}
        cover={<img alt="example" src={bikeImage} />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
          <div>
            <p className="font-bold text-black">Name: {name}</p>
            <p className="font-bold text-black">Brand: {brand}</p>
            <p className="font-bold text-black">Model :{model}</p>
            <p className="font-bold text-black">Category: {category}</p>

            <p className="font-bold text-black">Price: {price}$</p>
          </div>

          <div>
            <p className="font-bold text-black">Stock :{stock}</p>
            <p className="font-bold text-black">Quantity: {quantity}</p>

            <p className="font-bold text-black">Description: {description}$</p>
          </div>
          <div className="" style={{ marginLeft: "auto" }}>
            <Link to={`/checkout/${_id}`}>
              {" "}
              <Button
                style={{ marginTop: "10px", width: "full" }}
                type="primary"
              >
                Buy Now
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProductDetails;
