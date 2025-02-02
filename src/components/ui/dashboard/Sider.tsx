import { Layout, Menu, MenuProps } from "antd";
import { NavLink } from "react-router-dom";

const { Sider } = Layout;
const adminItems: MenuProps["items"] = [
  {
    key: "create-product",
    label: <NavLink to="admin/create-product">Create Product</NavLink>,
  },

  {
    key: "update-product",
    label: <NavLink to="admin/update-product">Create Product</NavLink>,
  },
  {
    key: "deactivate-customer",
    label: <NavLink to="admin/deactivate-customer">Create Product</NavLink>,
  },
];

const customerItems: MenuProps["items"] = [
  {
    key: "create-order",
    label: <NavLink to="customer/create-order">Create Product</NavLink>,
  },

  {
    key: "update-password",
    label: <NavLink to="customer/update-password">Change Password</NavLink>,
  },
  {
    key: "order-cancel",
    label: <NavLink to="order/order-cancel">Order Cancle</NavLink>,
  },
];

const Sidebar = () => {
  const role = "admin";
  const UserRole = {
    Admin: "admin",
    Customer: "customer",
  };
  let sidebarItems;

  switch (role) {
    case UserRole.Admin:
      sidebarItems = adminItems;
      break;
    case UserRole.Customer:
      sidebarItems = customerItems;
      break;

    default:
      break;
  }

  return (
    <Sider>
      <div
        style={{
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "4rem",
          font: "bold",
          fontSize: "30px",
        }}
      >
        Bike Shop
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={sidebarItems}
      />
    </Sider>
  );
};

export default Sidebar;
