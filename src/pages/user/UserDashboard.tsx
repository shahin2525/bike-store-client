// import { selectCurrentUser } from "../../redux/feature/auth/authSlice";
// import { useGetAllOrderByEmailQuery } from "../../redux/feature/order/orderApi";
// import { useAppSelector } from "../../redux/hooks";
// const UserDashboard = () => {
//   const userData = useAppSelector(selectCurrentUser);
//   const user = userData?.data;
//   return (
//     <div>
//       <h1>User dashboard</h1>
//     </div>
//   );
// };

// export default UserDashboard;
import { Card, Col, Row, Space, Spin, Typography, Table } from "antd";
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
import { useGetAllOrderByEmailQuery } from "../../redux/feature/order/orderApi";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/feature/auth/authSlice";
import { TUser } from "../../types/user.type";
import { TOrder } from "../../types/order.type";
// import { TOrder, TUser } from "../../types";

const { Title, Text } = Typography;

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

const UserDashboard = () => {
  const userData = useAppSelector(selectCurrentUser);
  const user = userData?.data as TUser;
  const { data: orderData, isLoading: orderLoading } =
    useGetAllOrderByEmailQuery(user?.email);

  const isLoading = orderLoading;

  // Prepare Pie chart data for order status distribution
  const orderStatus = orderData?.data?.reduce((acc: any, order: TOrder) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {});

  const orderStatusChartData = {
    labels: orderStatus ? Object.keys(orderStatus) : [],
    datasets: [
      {
        label: "Order Status",
        data: orderStatus ? Object.values(orderStatus) : [],
        backgroundColor: [
          "#0088FE", // Pending
          "#00C49F", // Processing
          "#FFBB28", // Shipped
          "#FF8042", // Delivered
          "#8884d8", // Cancelled
        ],
      },
    ],
  };

  // Prepare Bar chart data for order amounts
  const orderAmounts = orderData?.data?.map(
    (order: TOrder) => order.totalPrice
  );
  const orderIds = orderData?.data?.map(
    (order: TOrder) => `Order #${order._id.slice(-4)}`
  );

  const orderAmountChartData = {
    labels: orderIds || [],
    datasets: [
      {
        label: "Order Amount ($)",
        data: orderAmounts || [],
        backgroundColor: "#8884d8",
      },
    ],
  };

  // Table columns for recent orders
  const columns = [
    {
      title: "Order ID",
      dataIndex: "_id",
      key: "_id",
      render: (text: string) => `#${text.slice(-4)}`,
    },
    {
      title: "Product",
      dataIndex: "product",
      key: "product",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (text: number) => `$${text.toFixed(2)}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text: string) => (
        <Text
          style={{
            color:
              text === "Delivered"
                ? "#52c41a"
                : text === "Processing"
                ? "#1890ff"
                : text === "Shipped"
                ? "#faad14"
                : text === "Cancelled"
                ? "#f5222d"
                : "#d9d9d9",
          }}
        >
          {text}
        </Text>
      ),
    },
  ];

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
      <Title level={2}>Welcome back, {user?.name}</Title>

      {/* Summary Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
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
              <Text type="secondary">Total Spent</Text>
              <Title level={3}>
                $
                {orderData?.data
                  ?.reduce(
                    (sum: number, order: TOrder) =>
                      sum + (order.totalPrice || 0),
                    0
                  )
                  .toFixed(2) || "0.00"}
              </Title>
            </Space>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card bordered={false} hoverable>
            <Space direction="vertical">
              <Text type="secondary">Pending Orders</Text>
              <Title level={3}>
                {orderData?.data?.filter(
                  (order: TOrder) => order.status === "Pending"
                ).length || 0}
              </Title>
            </Space>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card bordered={false} hoverable>
            <Space direction="vertical">
              <Text type="secondary">Delivered Orders</Text>
              <Title level={3}>
                {orderData?.data?.filter(
                  (order: TOrder) => order.status === "Delivered"
                ).length || 0}
              </Title>
            </Space>
          </Card>
        </Col>
      </Row>

      {/* Charts Section */}
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Card
            title="Your Order Status Distribution"
            bordered={false}
            hoverable
          >
            <Pie data={orderStatusChartData} />
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card title="Your Order Amounts" bordered={false} hoverable>
            <Bar
              data={orderAmountChartData}
              options={{
                scales: {
                  y: {
                    beginAtZero: true,
                    title: {
                      display: true,
                      text: "Amount ($)",
                    },
                  },
                  x: {
                    title: {
                      display: true,
                      text: "Order ID",
                    },
                  },
                },
              }}
            />
          </Card>
        </Col>
      </Row>

      {/* Recent Orders Section */}
      <Row gutter={[16, 16]} style={{ marginTop: "24px" }}>
        <Col span={24}>
          <Card title="Your Recent Orders" bordered={false} hoverable>
            <Table
              columns={columns}
              dataSource={orderData?.data?.slice(0, 5) || []}
              pagination={false}
              rowKey="_id"
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default UserDashboard;
