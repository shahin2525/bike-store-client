import { useParams } from "react-router-dom";
import { useGetSingleBikeQuery } from "../../redux/feature/bike/bikApi";
import { Button, Card, Flex, Grid } from "antd";
const { useBreakpoint } = Grid;
const Checkout = () => {
  const screens = useBreakpoint();
  const { product } = useParams();

  const { data: bikeData } = useGetSingleBikeQuery(product);
  console.log(bikeData?.data);
  const bike = bikeData?.data;
  const cardStyle: React.CSSProperties = {
    width: 620,
  };

  const imgStyle: React.CSSProperties = {
    display: "block",
    width: 273,
  };
  return (
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
        {/* <Flex
          wrap="wrap"
          justify="space-between"
          align="center"
          gap={16}
          style={{ padding: 16 }}
        >
          <img
            alt="bike"
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            style={{
              width: "100%",
              maxWidth: 273,
            }}
          />
          <Flex
            vertical
            align={screens.xs ? "center" : "flex-end"} // Center on small screens, right-align on large screens
            justify="space-between"
            style={{
              flex: 1,
              textAlign: screens.xs ? "center" : "right", // Ensure text is centered on small screens
            }}
          >
            <p>
              Ant Design is an enterprise-class UI design language and React UI
              library.
            </p>
            <Button type="primary" href="https://ant.design" target="_blank">
              Get Started
            </Button>
          </Flex>
        </Flex> */}
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
            align={screens.xs ? "center" : "flex-end"} // Center on small screens, right-align on large
            justify="space-between"
            style={{
              width: screens.xs ? "100%" : "55%", // Full width on small screens, 55% on large
              textAlign: screens.xs ? "center" : "right",
            }}
          >
            <p>
              Ant Design is an enterprise-class UI design language and React UI
              library.
            </p>
            <Button type="primary" href="https://ant.design" target="_blank">
              Get Started
            </Button>
          </Flex>
        </Flex>
      </Card>
    </Flex>
  );
};

export default Checkout;
