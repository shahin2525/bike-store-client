import { useParams } from "react-router-dom";
import { useGetSingleBikeQuery } from "../../redux/feature/bike/bikApi";
import { Button, Card, Flex, Grid } from "antd";
import { useCreateOrderMutation } from "../../redux/feature/order/orderApi";
import PHForm from "../../components/form/BSForm";
import { FieldValues } from "react-hook-form";
import PHInput from "../../components/form/BSInput";
const { useBreakpoint } = Grid;
const Checkout = () => {
  const screens = useBreakpoint();
  const { product } = useParams();

  const { data: bikeData } = useGetSingleBikeQuery(product);
  console.log(bikeData?.data);
  const [createOrder] = useCreateOrderMutation();

  const bike = bikeData?.data;
  const cardStyle: React.CSSProperties = {
    width: 620,
  };

  const imgStyle: React.CSSProperties = {
    display: "block",
    width: 273,
  };

  const onsubmit = (data: FieldValues) => {
    console.log(data);
  };
  return (
    <PHForm onSubmit={onsubmit}>
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
              src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
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
              <p>Bike_Name: {bike?.name}</p>
              <p>Model: {bike?.model}</p>
              <p>Price: {bike?.price}</p>
              <PHInput
                type="number"
                name="quantity"
                label="Quantity"
                marginBottom="2px"
              />
              <p>Total_Price:{400}</p>
              <Button type="primary" href="https://ant.design" target="_blank">
                Order Now
              </Button>
            </Flex>
          </Flex>
        </Card>
      </Flex>
    </PHForm>
  );
};

export default Checkout;
