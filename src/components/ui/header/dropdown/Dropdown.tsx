import { Avatar, Dropdown, MenuProps, Space } from "antd";
import { SettingOutlined, UserOutlined } from "@ant-design/icons";

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
    extra: "⌘P",
  },
  {
    key: "3",
    label: "Billing",
    extra: "⌘B",
  },
];
const DropdownComponent = () => {
  return (
    <Dropdown menu={{ items }}>
      <a style={{ marginRight: "8px" }} onClick={(e) => e.preventDefault()}>
        <Space>
          <Avatar
            size="default"
            icon={<UserOutlined />}
            // You can also use src for an image:
            // src="https://example.com/avatar.jpg"
            style={{ backgroundColor: "#1890ff" }}
          />
        </Space>
      </a>
    </Dropdown>
  );
};

export default DropdownComponent;
