import { Layout } from "antd";

import { Outlet } from "react-router-dom";
import HeaderComponent from "../ui/header/Header";
import FooterComponent from "../ui/footer/Footer";
import Sidebar from "../ui/dashboard/Sider";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/feature/auth/authSlice";
const { Content } = Layout;

const UserLayout = () => {
  const user = useAppSelector(selectCurrentUser);

  return (
    <Layout>
      <HeaderComponent />
      <Layout>
        {user && <Sidebar />}
        <Content
          style={
            {
              // margin: "0px",
              // padding: "0px",
            }
          }
        >
          <div
            style={{
              padding: 0,
              margin: 0,

              minHeight: 360,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
      <FooterComponent />
    </Layout>
  );
};

export default UserLayout;
