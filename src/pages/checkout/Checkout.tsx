import { useParams } from "react-router-dom";
import { useGetSingleBikeQuery } from "../../redux/feature/bike/bikApi";
import { Button, Card, Flex, Grid, Input } from "antd";
import { useCreateOrderMutation } from "../../redux/feature/order/orderApi";
import PHForm from "../../components/form/BSForm";
import { FieldValues } from "react-hook-form";
import PHInput from "../../components/form/BSInput";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/feature/auth/authSlice";
import { toast } from "sonner";
const { useBreakpoint } = Grid;
const Checkout = () => {
  const screens = useBreakpoint();
  const { product } = useParams();
  const [quantity, setQuantity] = useState<number | string>(1);

  const { data: bikeData } = useGetSingleBikeQuery(product);
  // console.log(bikeData?.data);
  const [createOrder, { isLoading, isSuccess, data, isError, error }] =
    useCreateOrderMutation();

  const bike = bikeData?.data;
  const cardStyle: React.CSSProperties = {
    width: 620,
  };

  const imgStyle: React.CSSProperties = {
    display: "block",
    width: 273,
  };

  const handleChange = (e: FieldValues) => {
    e.preventDefault();
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

  // const onsubmit = (e: FieldValues) => {
  //   e.preventDefault();
  //   console.log("Input Value:", quantity);
  // };
  // const [createOrder, { isLoading, isSuccess, data, isError, error }] =
  //   useCreateOrderMutation();
  const user = useAppSelector(selectCurrentUser);
  const userEmail = user?.data?.email;

  const onsubmit = async (e: FieldValues) => {
    e.preventDefault();
    console.log(e);

    const orderInfo = {
      email: userEmail,
    };
    await createOrder(orderInfo);
  };

  const toastId = "cart";
  useEffect(() => {
    if (isLoading) toast.loading("Processing ...", { id: toastId });

    if (isSuccess) {
      toast.success(data?.message, { id: toastId });
      if (data?.data) {
        setTimeout(() => {
          window.location.href = data.data;
        }, 1000);
      }
    }

    if (isError) toast.error(JSON.stringify(error), { id: toastId });
  }, [data?.data, data?.message, error, isError, isLoading, isSuccess]);

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
