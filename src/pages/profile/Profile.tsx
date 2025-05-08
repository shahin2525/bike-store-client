// import { Card, Descriptions, Divider, Space, Typography, Avatar } from "antd";
// import { UserOutlined } from "@ant-design/icons";
// import { useAppSelector } from "../../redux/hooks";
// import { selectCurrentUser } from "../../redux/feature/auth/authSlice";

// const { Title, Text } = Typography;

// const Profile = () => {
//   const userData = useAppSelector(selectCurrentUser);
//   const user = userData?.data;
//   console.log(user);

//   if (!user) {
//     return <div>Loading user data...</div>;
//   }

//   return (
//     <div className="min-h-screen p-4 md:p-8">
//       <Title level={2} className="text-center mb-6">
//         User Profile
//       </Title>

//       <Card className="max-w-4xl mx-auto">
//         <Space size="large" className="w-full mb-6">
//           <Avatar
//             size={128}
//             icon={<UserOutlined />}
//             className="bg-blue-500"
//             // src={user.avatar} // Uncomment if you have avatar in user data
//           />
//           <div>
//             <Title level={3}>{user.name}</Title>
//             <Text type="secondary">{user.email}</Text>
//             <div className="mt-2">
//               <Text strong>Role: </Text>
//               <Text>{user.role}</Text>
//             </div>
//           </div>
//         </Space>

//         <Divider orientation="left">Personal Information</Divider>

//         <Descriptions bordered column={1} className="w-full">
//           <Descriptions.Item label="User ID">{user._id}</Descriptions.Item>
//           <Descriptions.Item label="Name">{user.name}</Descriptions.Item>
//           <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
//           <Descriptions.Item label="Role">{user.role}</Descriptions.Item>
//           {user.phone && (
//             <Descriptions.Item label="Phone">{user.phone}</Descriptions.Item>
//           )}
//           {user.address && (
//             <Descriptions.Item label="Address">
//               {user.address}
//             </Descriptions.Item>
//           )}
//           {user.city && (
//             <Descriptions.Item label="City">{user.city}</Descriptions.Item>
//           )}
//           <Descriptions.Item label="Account Status">
//             <Text type={user.deactivate ? "danger" : "success"}>
//               {user.deactivate ? "Deactivated" : "Active"}
//             </Text>
//           </Descriptions.Item>
//           <Descriptions.Item label="Member Since">
//             {new Date(user.createdAt).toLocaleDateString()}
//           </Descriptions.Item>
//         </Descriptions>

//         <Divider orientation="left" className="mt-6">
//           Account Details
//         </Divider>

//         <Descriptions bordered column={1} className="w-full">
//           <Descriptions.Item label="Last Updated">
//             {new Date(user.updatedAt).toLocaleDateString()}
//           </Descriptions.Item>
//         </Descriptions>
//       </Card>
//     </div>
//   );
// };

// export default Profile;
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
  // const user = useAppSelector(selectCurrentUser);
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
    <div className="min-h-screen p-4 md:p-8">
      <Title level={2} className="text-center mb-6">
        User Profile
      </Title>

      <Card className="max-w-4xl mx-auto">
        <Space
          size="large"
          direction={screens.xs ? "vertical" : "horizontal"}
          align="center"
          className="w-full mb-6"
        >
          <Avatar
            size={avatarSize}
            icon={<UserOutlined />}
            className="bg-blue-500"
            // src={user.avatar} // Uncomment if you have avatar in user data
          />
          <div className={screens.xs ? "text-center" : ""}>
            <Title level={3}>{user.name}</Title>
            <Text type="secondary">{user.email}</Text>
            <div className="mt-2">
              <Text strong>Role: </Text>
              <Text>{user.role}</Text>
            </div>
          </div>
        </Space>

        <Divider orientation={screens.md ? "left" : undefined}>
          Personal Information
        </Divider>

        <Descriptions
          bordered
          column={descColumn}
          layout={layout}
          className="w-full"
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

        <Divider orientation={screens.md ? "left" : undefined} className="mt-6">
          Account Details
        </Divider>

        <Descriptions
          bordered
          column={descColumn}
          layout={layout}
          className="w-full"
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
