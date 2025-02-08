import { Layout, Menu, MenuProps } from "antd";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../../redux/hooks";
import { selectCurrentUser } from "../../../redux/feature/auth/authSlice";

const { Sider } = Layout;
const adminItems: MenuProps["items"] = [
  {
    label: "Admin Management",
    type: "group",
    children: [
      {
        key: "Create Bike",
        label: <NavLink to="create-bike">Create Bike</NavLink>,
      },

      {
        key: "Update Bike",
        label: <NavLink to="update-bike">Update Bike</NavLink>,
      },
      {
        key: "Delete Bike",
        label: <NavLink to="delete-bike">delete Bike</NavLink>,
      },
      {
        key: "deactivate-customer",
        label: <NavLink to="deactivate-customer">Deactivate Customer</NavLink>,
      },
    ],
  },
];

const customerItems: MenuProps["items"] = [
  {
    key: "Create Order",
    label: <NavLink to="create-order">Create Order</NavLink>,
  },

  {
    key: "Update Password",
    label: <NavLink to="update-password">Change Password</NavLink>,
  },
  {
    key: "order-cancel",
    label: <NavLink to="order-cancel">Order Cancel</NavLink>,
  },
];

const Sidebar = () => {
  // const role = "admin";
  const user = useAppSelector(selectCurrentUser);
  const role = user?.data?.role;

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
    <Sider breakpoint="lg" collapsedWidth="0">
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
