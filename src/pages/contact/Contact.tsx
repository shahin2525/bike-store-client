import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Typography,
  Divider,
  Space,
  Grid,
} from "antd";
import {
  EnvironmentOutlined,
  PhoneOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { toast } from "sonner";
// import { useBreakpoint } from "antd/es/grid";

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
const { useBreakpoint } = Grid;
const Contact = () => {
  const screens = useBreakpoint();
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Received values:", values);
    toast.success("Your message has been sent successfully!");
    form.resetFields();
  };

  return (
    <div
      style={{
        padding: screens.xs ? "16px" : "24px",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      <Title
        level={1}
        style={{
          textAlign: "center",
          marginBottom: screens.xs ? "24px" : "40px",
        }}
      >
        Contact Our Bike Shop
      </Title>

      <Row gutter={[24, 24]} style={{ marginBottom: "40px" }}>
        <Col xs={24} md={8}>
          <Card hoverable style={{ height: "100%" }}>
            <Space direction="vertical" size="middle">
              <div>
                <EnvironmentOutlined
                  style={{ fontSize: "24px", color: "#1890ff" }}
                />
                <Title level={4} style={{ marginTop: "8px" }}>
                  Our Location
                </Title>
                <Text>
                  123 Cycling Street
                  <br />
                  Bikeville, BV 12345
                  <br />
                  United States
                </Text>
              </div>
              <Divider />
              <div>
                <Button
                  type="primary"
                  block
                  href="https://maps.google.com"
                  target="_blank"
                >
                  Get Directions
                </Button>
              </div>
            </Space>
          </Card>
        </Col>

        <Col xs={24} md={8}>
          <Card hoverable style={{ height: "100%" }}>
            <Space direction="vertical" size="middle">
              <div>
                <PhoneOutlined style={{ fontSize: "24px", color: "#1890ff" }} />
                <Title level={4} style={{ marginTop: "8px" }}>
                  Contact Info
                </Title>
                <Text>
                  <Paragraph strong>Phone:</Paragraph>
                  <Paragraph>(123) 456-7890</Paragraph>
                  <Paragraph strong>Email:</Paragraph>
                  <Paragraph>contact@bikeshop.com</Paragraph>
                </Text>
              </div>
              <Divider />
              <div>
                <Button type="primary" block href="tel:+11234567890">
                  Call Us
                </Button>
              </div>
            </Space>
          </Card>
        </Col>

        <Col xs={24} md={8}>
          <Card hoverable style={{ height: "100%" }}>
            <Space direction="vertical" size="middle">
              <div>
                <ClockCircleOutlined
                  style={{ fontSize: "24px", color: "#1890ff" }}
                />
                <Title level={4} style={{ marginTop: "8px" }}>
                  Business Hours
                </Title>
                <Text>
                  <Paragraph>Monday - Friday: 9am - 7pm</Paragraph>
                  <Paragraph>Saturday: 10am - 6pm</Paragraph>
                  <Paragraph>Sunday: 11am - 5pm</Paragraph>
                </Text>
              </div>
              <Divider />
              <div>
                <Button type="primary" block href="#contact-form">
                  Send Message
                </Button>
              </div>
            </Space>
          </Card>
        </Col>
      </Row>

      <Row gutter={[24, 24]} id="contact-form">
        <Col xs={24} lg={12}>
          <Card>
            <Title level={3} style={{ marginBottom: "24px" }}>
              Send Us a Message
            </Title>
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              size={screens.xs ? "middle" : "large"}
            >
              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="name"
                    label="Full Name"
                    rules={[
                      { required: true, message: "Please enter your name" },
                    ]}
                  >
                    <Input placeholder="Your name" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                      { required: true, message: "Please enter your email" },
                      { type: "email", message: "Please enter a valid email" },
                    ]}
                  >
                    <Input placeholder="your.email@example.com" />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                name="subject"
                label="Subject"
                rules={[{ required: true, message: "Please enter a subject" }]}
              >
                <Input placeholder="How can we help?" />
              </Form.Item>

              <Form.Item
                name="message"
                label="Message"
                rules={[
                  { required: true, message: "Please enter your message" },
                ]}
              >
                <TextArea
                  rows={6}
                  placeholder="Tell us about your bike needs..."
                />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" block={screens.xs}>
                  Send Message
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card style={{ height: "100%" }}>
            <Title level={3} style={{ marginBottom: "24px" }}>
              Our Location
            </Title>
            <div
              style={{
                height: "400px",
                background: "#f0f2f5",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* Replace with your actual map embed */}
              <Text strong>Map of Our Bike Shop Location</Text>
            </div>
            <Divider />
            <Title level={4}>Need Immediate Help?</Title>
            <Paragraph>
              For urgent inquiries, please call us directly at{" "}
              <Text strong>(123) 456-7890</Text> during business hours.
            </Paragraph>
            <Paragraph>
              You can also email us at <Text strong>contact@bikeshop.com</Text>{" "}
              and we'll respond within 24 hours.
            </Paragraph>
          </Card>
        </Col>
      </Row>

      <Divider style={{ margin: "40px 0" }} />

      <Title level={3} style={{ textAlign: "center", marginBottom: "24px" }}>
        Follow Us
      </Title>
      <Row justify="center" gutter={[16, 16]} style={{ marginBottom: "40px" }}>
        <Col>
          <Button shape="circle" size="large" icon={<span>FB</span>} />
        </Col>
        <Col>
          <Button shape="circle" size="large" icon={<span>IG</span>} />
        </Col>
        <Col>
          <Button shape="circle" size="large" icon={<span>TW</span>} />
        </Col>
        <Col>
          <Button shape="circle" size="large" icon={<span>YT</span>} />
        </Col>
      </Row>
    </div>
  );
};

export default Contact;
