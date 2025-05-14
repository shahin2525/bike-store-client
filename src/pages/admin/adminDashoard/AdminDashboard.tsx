import { Card, Col, Row, Space, Spin, Typography } from "antd";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";

import { useGetAllBikeJustQuery } from "../../../redux/feature/bike/bikApi";
import { useGetAllOrderQuery } from "../../../redux/feature/order/orderApi";
import { useGetAllUserQuery } from "../../../redux/feature/user/userApi";

const { Title, Text } = Typography;

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

const AdminDashboard = () => {
  const { data: bikeData, isLoading: bikeLoading } =
    useGetAllBikeJustQuery(undefined);
  const { data: orderData, isLoading: orderLoading } =
    useGetAllOrderQuery(undefined);
  const { data: userData, isLoading: userLoading } =
    useGetAllUserQuery(undefined);

  const isLoading = bikeLoading || orderLoading || userLoading;

  // Prepare Pie chart data for bike categories
  const bikeCategories = bikeData?.data?.reduce((acc: any, bike: any) => {
    acc[bike.category] = (acc[bike.category] || 0) + 1;
    return acc;
  }, {});

  const bikeChartData = {
    labels: bikeCategories ? Object.keys(bikeCategories) : [],
    datasets: [
      {
        label: "Bike Categories",
        data: bikeCategories ? Object.values(bikeCategories) : [],
        backgroundColor: [
          "#0088FE",
          "#00C49F",
          "#FFBB28",
          "#FF8042",
          "#8884d8",
        ],
      },
    ],
  };

  // Prepare Bar chart data for order status
  const orderStatus = orderData?.data?.reduce((acc: any, order: any) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {});

  const orderChartData = {
    labels: orderStatus ? Object.keys(orderStatus) : [],
    datasets: [
      {
        label: "Orders",
        data: orderStatus ? Object.values(orderStatus) : [],
        backgroundColor: "#8884d8",
      },
    ],
  };

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ padding: "24px" }}>
      <Title level={2}>Admin Dashboard Overview</Title>

      {/* Summary Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card bordered={false} hoverable>
            <Space direction="vertical">
              <Text type="secondary">Total Bikes</Text>
              <Title level={3}>{bikeData?.data?.length || 0}</Title>
            </Space>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card bordered={false} hoverable>
            <Space direction="vertical">
              <Text type="secondary">Total Orders</Text>
              <Title level={3}>{orderData?.data?.length || 0}</Title>
            </Space>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card bordered={false} hoverable>
            <Space direction="vertical">
              <Text type="secondary">Total Users</Text>
              <Title level={3}>{userData?.data?.length || 0}</Title>
            </Space>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card bordered={false} hoverable>
            <Space direction="vertical">
              <Text type="secondary">Revenue</Text>
              <Title level={3}>
                $
                {orderData?.data?.reduce(
                  (sum: number, order: any) => sum + (order.total || 0),
                  0
                ) || 0}
              </Title>
            </Space>
          </Card>
        </Col>
      </Row>

      {/* Charts Section */}
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Card title="Bike Categories Distribution" bordered={false} hoverable>
            <Pie data={bikeChartData} />
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card title="Order Status Overview" bordered={false} hoverable>
            <Bar data={orderChartData} />
          </Card>
        </Col>
      </Row>

      {/* Recent Activity Section */}
      <Row gutter={[16, 16]} style={{ marginTop: "24px" }}>
        <Col span={24}>
          <Card title="Recent Orders" bordered={false} hoverable>
            <div
              style={{
                minHeight: "200px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text>Recent orders list will appear here</Text>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdminDashboard;
