// import { Col, Layout, Row, Space, Typography } from "antd";
// const { Footer } = Layout;
import { Layout, Row, Col, Typography, Space } from "antd";
import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";

const { Footer } = Layout;
const { Link, Text } = Typography;
const FooterComponent = () => {
  return (
    // <Footer style={{ textAlign: "center" }}>
    //   Ant Design ©{new Date().getFullYear()} Created by Ant UED
    // </Footer>
    <Footer
      style={{
        textAlign: "center",
        backgroundColor: "#001529",
        color: "#fff",
        padding: "40px 20px",
      }}
    >
      <Row gutter={[32, 32]} justify="center">
        <Col xs={24} sm={12} md={6}>
          <Typography.Title level={4} style={{ color: "#fff" }}>
            Quick Links
          </Typography.Title>
          <Space direction="vertical">
            <Link href="/" style={{ color: "#aaa" }}>
              Home
            </Link>
            <Link href="/all-products" style={{ color: "#aaa" }}>
              All Products
            </Link>
            <Link href="/about" style={{ color: "#aaa" }}>
              About Us
            </Link>
            <Link href="/contact" style={{ color: "#aaa" }}>
              Contact
            </Link>
          </Space>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Typography.Title level={4} style={{ color: "#fff" }}>
            Contact Us
          </Typography.Title>
          <Text style={{ color: "#aaa" }}>
            <MailOutlined /> support@bikeshop.com
          </Text>
          <br />
          <Text style={{ color: "#aaa" }}>
            <PhoneOutlined /> +123 456 7890
          </Text>
        </Col>

        {/* <Col xs={24} sm={12} md={6}>
          <Typography.Title level={4} style={{ color: "#fff" }}>
            Follow Us
          </Typography.Title>
          <Space size="large">
            <a href="#" style={{ color: "#aaa", fontSize: "20px" }}>
              <FacebookOutlined />
            </a>
            <a href="#" style={{ color: "#aaa", fontSize: "20px" }}>
              <TwitterOutlined />
            </a>
            <a href="#" style={{ color: "#aaa", fontSize: "20px" }}>
              <InstagramOutlined />
            </a>
          </Space>
        </Col> */}
      </Row>
      <div style={{ marginTop: "20px", color: "#aaa" }}>
        © {new Date().getFullYear()} Bike Shop. All Rights Reserved.
      </div>
    </Footer>
  );
};

export default FooterComponent;
