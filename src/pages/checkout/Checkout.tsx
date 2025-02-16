import { useParams } from "react-router-dom";
import { useGetSingleBikeQuery } from "../../redux/feature/bike/bikApi";
import { Button, Card, Flex, Grid, Input } from "antd";
import { useCreateOrderMutation } from "../../redux/feature/order/orderApi";
import PHForm from "../../components/form/BSForm";
import { FieldValues } from "react-hook-form";
import PHInput from "../../components/form/BSInput";
import { useState } from "react";
const { useBreakpoint } = Grid;
const Checkout = () => {
  const screens = useBreakpoint();
  const { product } = useParams();
  const [quantity, setQuantity] = useState<number | string>(1);

  const { data: bikeData } = useGetSingleBikeQuery(product);
  // console.log(bikeData?.data);
  const [createOrder] = useCreateOrderMutation();

  const bike = bikeData?.data;
  const cardStyle: React.CSSProperties = {
    width: 620,
  };

  const imgStyle: React.CSSProperties = {
    display: "block",
    width: 273,
  };

  const handleChange = (e: FieldValues) => {
    let value = e.target.value.trim(); // Get input value

    if (value === "") {
      setQuantity(""); // Allow empty input
    } else {
      const parsedValue = parseInt(value, 10);
      setQuantity(isNaN(parsedValue) || parsedValue < 1 ? 1 : parsedValue);
    }
  };

  // Calculate Total Price
  const totalPrice = (bike?.price || 0) * ((quantity as number) || 0);

  const onsubmit = (e: FieldValues) => {
    e.preventDefault();
    console.log("Input Value:", quantity);
  };
  return (
    <form onSubmit={onsubmit}>
      <Flex
        justify="center"
        align="center"
        style={{
          height: "100vh",
          width: "100%",
          padding: 16,
        }}
      >
        <Card
          hoverable
          style={{
            width: "100%",
            maxWidth: 620,
          }}
          styles={{ body: { padding: 0, overflow: "hidden" } }}
        >
          {/* Responsive Flex */}
          <Flex
            wrap="wrap"
            justify="space-between"
            align="center"
            gap={16}
            style={{ padding: 16 }}
          >
            {/* Image - Responsive Width */}
            <img
              alt="bike"
              src={bike?.bikeImage}
              style={{
                width: screens.xs ? "100%" : "40%", // Full width on small screens, 40% on large
                maxWidth: 273,
              }}
            />

            {/* Text & Button Section - Responsive Width */}
            <Flex
              vertical
              align={screens.xs ? "center" : "start"} // Center on small screens, right-align on large
              justify="space-between"
              style={{
                width: screens.xs ? "100%" : "55%", // Full width on small screens, 55% on large
                textAlign: screens.xs ? "center" : "left",
              }}
            >
              <p
                className="text-bold text-[16px] "
                style={{ marginTop: "20px" }}
              >
                Bike_Name: {bike?.name}
              </p>
              <p className="text-bold text-[16px] ">Model: {bike?.model}</p>
              <p className="text-bold text-[16px] ">Price: {bike?.price}</p>
              <Input
                className="text-bold text-[16px] "
                type="number"
                value={quantity}
                onChange={handleChange}
                min={1}
                placeholder="Enter quantity"
                style={{ width: "150px" }}
              />
              <p className="text-bold text-[18px] ">
                Total_Price: <span>{totalPrice} </span>
              </p>
              <Flex
                align={screens.xs ? "center" : "end"}
                justify={screens.xs ? "center" : "flex-end"} // Center on small screens, right-align on large
                style={{ width: "100%", marginTop: 8 }}
              >
                {" "}
                <Button
                  htmlType="submit"
                  type="primary"
                  //  href="https://ant.design" target="_blank"
                >
                  Order Now
                </Button>
              </Flex>
            </Flex>
          </Flex>
        </Card>
      </Flex>
    </form>
  );
};

export default Checkout;
