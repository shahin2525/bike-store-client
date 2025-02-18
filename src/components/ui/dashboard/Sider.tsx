import { Layout, Menu, MenuProps } from "antd";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../../redux/hooks";
import { selectCurrentToken } from "../../../redux/feature/auth/authSlice";
import { verifyToken } from "../../../utils/verifyToken";

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
        key: "Manage Bike",
        label: <NavLink to="manage-bike">Manage Bike</NavLink>,
      },

      {
        key: "Manage User",
        label: <NavLink to="manage-user">Manage Customer</NavLink>,
      },
      {
        key: "Manage Order",
        label: <NavLink to="manage-order">Manage Order</NavLink>,
      },
    ],
  },
];

const customerItems: MenuProps["items"] = [
  {
    label: "Customer Management",
    type: "group",
    children: [
      // {
      //   key: "Create Order",
      //   label: <NavLink to="create-order">Create Order</NavLink>,
      // },

      {
        key: "Update Password",
        label: <NavLink to="update-password">Change Password</NavLink>,
      },
      {
        key: "Orders Views",
        label: <NavLink to="order-view">Orders View</NavLink>,
      },
    ],
  },
];
export type TAuthData = {
  email: string;
  role: string;
};
export type TAuthUser = {
  data: TAuthData;
  iat: string;
  exp: string;
};

const Sidebar = () => {
  // const role = "admin";
  const token = useAppSelector(selectCurrentToken);
  // const user = useAppSelector(selectCurrentUser);
  let user: TAuthUser | null = null;
  if (token) {
    const decodedToken = verifyToken(token) as unknown as Partial<TAuthUser>;
    if (decodedToken?.data) {
      user = decodedToken as TAuthUser; // Now we safely assert it
    }
  }
  // console.log(user);

  const role = (user as TAuthUser)?.data?.role;
  // console.log(role);

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
