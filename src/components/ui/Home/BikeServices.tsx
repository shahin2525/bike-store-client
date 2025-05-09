// Components/BikeServices.tsx
import { List, Typography, Button } from "antd";
import { ToolOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const services = [
  {
    title: "Full Tune-Up",
    description: "Complete bike overhaul including gear adjustment",
    icon: <ToolOutlined />,
    price: "$79",
  },
  {
    title: "Quick Service",
    description: "Basic maintenance in under 30 minutes",
    icon: <ClockCircleOutlined />,
    price: "$35",
  },
];
//background: "#fff"
export default function BikeServices() {
  const navigate = useNavigate();
  const handleBook = () => {
    navigate("/services");
  };
  return (
    <section style={{ padding: "40px 0" }}>
      <Typography.Title level={2} style={{ textAlign: "center" }}>
        Professional Bike Services
      </Typography.Title>
      <List
        itemLayout="horizontal"
        dataSource={services}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button onClick={handleBook} type="primary" key="book">
                Book Now
              </Button>,
            ]}
          >
            <List.Item.Meta
              avatar={item.icon}
              title={
                <Typography.Text strong>
                  {item.title} ({item.price})
                </Typography.Text>
              }
              description={item.description}
            />
          </List.Item>
        )}
        style={{ maxWidth: 800, margin: "0 auto" }}
      />
    </section>
  );
}
