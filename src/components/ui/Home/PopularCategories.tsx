// Components/PopularCategories.tsx
import { Card, Col, Row, Typography } from "antd";
import { MdElectricBike } from "react-icons/md";
import { MdBikeScooter } from "react-icons/md";
import { TbMotorbike } from "react-icons/tb";
import { MdOutlineElectricBike } from "react-icons/md";
// import { Bike, MountainBike, RoadBike, ElectricBike } from "@ant-design/icons";

const categories = [
  { name: "Mountain Bikes", icon: <MdOutlineElectricBike />, count: 42 },
  { name: "Road Bikes", icon: <TbMotorbike />, count: 35 },
  { name: "Electric Bikes", icon: <MdElectricBike />, count: 28 },
  { name: "Kids Bikes", icon: <MdBikeScooter />, count: 19 },
];

export default function PopularCategories() {
  return (
    <section style={{ padding: "40px 15px", background: "#f5f5f5" }}>
      <Typography.Title level={2} style={{ textAlign: "center" }}>
        Shop By Category
      </Typography.Title>
      <Row gutter={[24, 24]} justify="center" style={{ marginTop: 30 }}>
        {categories.map((category) => (
          <Col xs={12} sm={8} md={6} key={category.name}>
            <Card
              hoverable
              cover={category.icon}
              style={{
                textAlign: "center",
                height: "150px",
                maxWidth: "300px",
                paddingTop: "20px",
                color: "primary",
              }}
            >
              <Typography.Title level={4}>{category.name}</Typography.Title>
              <Typography.Text>
                {category.count} models available
              </Typography.Text>
            </Card>
          </Col>
        ))}
      </Row>
    </section>
  );
}
