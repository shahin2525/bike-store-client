// import { Avatar, Dropdown, MenuProps, Space } from "antd";
// import { SettingOutlined, UserOutlined } from "@ant-design/icons";

// const items: MenuProps["items"] = [
//   {
//     key: "1",
//     label: "My Account",
//     disabled: true,
//   },
//   {
//     type: "divider",
//   },
//   {
//     key: "2",
//     label: "Profile",
//   },
//   {
//     key: "3",
//     label: "Billing",
//     extra: "⌘B",
//   },
// ];
// const DropdownComponent = () => {
//   return (
//     <Dropdown menu={{ items }}>
//       <a style={{ marginRight: "8px" }} onClick={(e) => e.preventDefault()}>
//         <Space>
//           <Avatar
//             size="default"
//             icon={<UserOutlined />}
//             // You can also use src for an image:
//             // src="https://example.com/avatar.jpg"
//             style={{ backgroundColor: "#1890ff" }}
//           />
//         </Space>
//       </a>
//     </Dropdown>
//   );
// };

// export default DropdownComponent;
import { Avatar, Dropdown, MenuProps, Space } from "antd";
// import { UserOutlined } from "@ant-design/icons";
import { TiUserOutline } from "react-icons/ti";
import { useNavigate } from "react-router-dom"; // or your routing library

const DropdownComponent = () => {
  const navigate = useNavigate(); // Hook for navigation

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    if (e.key === "2") {
      // '2' is the key for Profile
      navigate("/profile"); // Navigate to profile page
    }
    // Add other cases if needed
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "My Account",
      disabled: true,
    },
    {
      type: "divider",
    },
    {
      key: "2",
      label: "Profile",
    },
    // {
    //   key: "3",
    //   label: "Billing",
    //   extra: "⌘B",
    // },
  ];

  return (
    <Dropdown menu={{ items, onClick: handleMenuClick }}>
      <a style={{ marginRight: "8px" }} onClick={(e) => e.preventDefault()}>
        <Space>
          <Avatar
            size="default"
            icon={<TiUserOutline />}
            style={{ backgroundColor: "#1890ff" }}
          />
        </Space>
      </a>
    </Dropdown>
  );
};

export default DropdownComponent;
