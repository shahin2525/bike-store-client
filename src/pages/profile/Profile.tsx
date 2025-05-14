import {
  Card,
  Descriptions,
  Divider,
  Space,
  Typography,
  Avatar,
  Grid,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/feature/auth/authSlice";

const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

const Profile = () => {
  const userData = useAppSelector(selectCurrentUser);
  const user = userData?.data;
  const screens = useBreakpoint();

  if (!user) {
    return <div>Loading user data...</div>;
  }

  // Responsive settings
  const avatarSize = screens.xs ? 64 : 128;
  const layout = screens.md ? "horizontal" : "vertical";
  const descColumn = screens.md ? 2 : 1;

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: screens.xs ? "16px" : "15px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: "transparent",
      }}
    >
      <Title level={2} style={{ textAlign: "center", marginBottom: "24px" }}>
        User Profile
      </Title>

      <Card
        style={{
          width: "100%",
          maxWidth: "1100px",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Space
          size="large"
          direction={screens.xs ? "vertical" : "horizontal"}
          align="center"
          style={{ width: "100%", marginBottom: "24px" }}
        >
          <Avatar
            size={avatarSize}
            icon={<UserOutlined />}
            style={{ backgroundColor: "#1890ff" }}
            // src={user.avatar} // Uncomment if you have avatar in user data
          />
          <div style={{ textAlign: screens.xs ? "center" : "left" }}>
            <Title level={3}>{user.name}</Title>
            <Text type="secondary">{user.email}</Text>
            <div style={{ marginTop: "8px" }}>
              <Text strong>Role: </Text>
              <Text>{user.role}</Text>
            </div>
          </div>
        </Space>

        <Divider orientation={screens.md ? "left" : "center"}>
          Personal Information
        </Divider>

        <Descriptions
          bordered
          column={descColumn}
          layout={layout}
          style={{ width: "100%" }}
        >
          <Descriptions.Item label="User ID" span={descColumn}>
            <Text copyable>{user._id}</Text>
          </Descriptions.Item>
          <Descriptions.Item label="Name">{user.name}</Descriptions.Item>
          <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
          <Descriptions.Item label="Role">{user.role}</Descriptions.Item>
          {user.phone && (
            <Descriptions.Item label="Phone">{user.phone}</Descriptions.Item>
          )}
          {user.address && (
            <Descriptions.Item label="Address" span={descColumn}>
              {user.address}
            </Descriptions.Item>
          )}
          {user.city && (
            <Descriptions.Item label="City">{user.city}</Descriptions.Item>
          )}
          <Descriptions.Item label="Account Status">
            <Text type={user.deactivate ? "danger" : "success"}>
              {user.deactivate ? "Deactivated" : "Active"}
            </Text>
          </Descriptions.Item>
          <Descriptions.Item label="Member Since">
            {new Date(user.createdAt).toLocaleDateString()}
          </Descriptions.Item>
        </Descriptions>

        <Divider
          orientation={screens.md ? "left" : "center"}
          style={{ marginTop: "24px" }}
        >
          Account Details
        </Divider>

        <Descriptions
          bordered
          column={descColumn}
          layout={layout}
          style={{ width: "100%" }}
        >
          <Descriptions.Item label="Last Updated">
            {new Date(user.updatedAt).toLocaleDateString()}
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
};

export default Profile;
