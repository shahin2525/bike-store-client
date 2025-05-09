import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Typography,
  message,
  Grid,
} from "antd";

import { useForm } from "react-hook-form";

const { Title, Text } = Typography;
const { TextArea } = Input;
const { useBreakpoint } = Grid;

interface ServiceFormValues {
  name: string;
  email: string;
  phone: string;
  bikeBrand: string;
  bikeModel: string;
  problemDescription: string;
}

const Services = () => {
  const screens = useBreakpoint();
  const [form] = Form.useForm();
  const { handleSubmit, reset } = useForm<ServiceFormValues>();

  const onSubmit = (data: ServiceFormValues) => {
    console.log(data);
    message.success("Service request submitted successfully!");
    reset();
    form.resetFields();
  };

  const services = [
    {
      title: "Basic Tune-Up",
      description:
        "Includes chain lubrication, brake adjustment, gear tuning, and safety check.",
      price: "$49.99",
    },
    {
      title: "Full Service",
      description:
        "Complete bike overhaul including wheel truing, bearing service, and full component adjustment.",
      price: "$129.99",
    },
    {
      title: "Brake Service",
      description:
        "Brake pad replacement, cable/hydraulic system service, and lever adjustment.",
      price: "$39.99",
    },
    {
      title: "Wheel Truing",
      description: "Professional wheel alignment and spoke tension adjustment.",
      price: "$25.99 per wheel",
    },
    {
      title: "Suspension Service",
      description: "Fork and shock maintenance for optimal performance.",
      price: "$79.99",
    },
    {
      title: "Custom Builds",
      description:
        "Complete bike assembly from frame up to your specifications.",
      price: "Starting at $199.99",
    },
  ];

  return (
    <div style={{ padding: screens.xs ? "20px" : "40px" }}>
      <Title level={1} className="text-center" style={{ marginBottom: 40 }}>
        Our Bike Services
      </Title>

      <Row gutter={[24, 24]} style={{ marginBottom: 40 }}>
        {services.map((service, index) => (
          <Col key={index} xs={24} sm={12} md={8} lg={8} xl={8}>
            <Card
              title={service.title}
              bordered={false}
              hoverable
              style={{ height: "100%" }}
            >
              <Text>{service.description}</Text>
              <div style={{ marginTop: 16, fontWeight: "bold" }}>
                {service.price}
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <Title level={2} className="text-center" style={{ marginBottom: 30 }}>
          Request a Service
        </Title>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit(onSubmit)}
          size={screens.xs ? "middle" : "large"}
        >
          <Row gutter={24}>
            <Col xs={24} md={12}>
              <Form.Item
                label="Full Name"
                name="name"
                rules={[{ required: true, message: "Please input your name!" }]}
              >
                <Input placeholder="John Doe" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please input your email!" },
                  { type: "email", message: "Please enter a valid email!" },
                ]}
              >
                <Input placeholder="john@example.com" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col xs={24} md={12}>
              <Form.Item
                label="Phone Number"
                name="phone"
                rules={[
                  {
                    required: true,
                    message: "Please input your phone number!",
                  },
                ]}
              >
                <Input placeholder="+1 (555) 123-4567" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label="Bike Brand"
                name="bikeBrand"
                rules={[
                  { required: true, message: "Please input your bike brand!" },
                ]}
              >
                <Input placeholder="Trek, Specialized, Giant, etc." />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="Bike Model"
            name="bikeModel"
            rules={[
              { required: true, message: "Please input your bike model!" },
            ]}
          >
            <Input placeholder="Domane SL5, Roubaix, Defy, etc." />
          </Form.Item>

          <Form.Item
            label="Problem Description"
            name="problemDescription"
            rules={[
              { required: true, message: "Please describe the problem!" },
            ]}
          >
            <TextArea
              rows={4}
              placeholder="Describe the issue you're experiencing with your bike..."
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size={screens.xs ? "middle" : "large"}
              block={screens.xs}
            >
              Submit Service Request
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Services;
