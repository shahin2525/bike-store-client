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
              // padding: 24,
              minHeight: 360,
            }}
          >
            {/* content first in main */}
            <Outlet />
          </div>
        </Content>
      </Layout>
      <FooterComponent />
    </Layout>
    // <Layout style={layoutStyle}>
    //   <Header style={headerStyle}>Header</Header>
    //   <Layout>
    //     <Sider width="25%" style={siderStyle}>
    //       Sider
    //     </Sider>
    //     <Content style={contentStyle}>Content</Content>
    //   </Layout>
    //   <Footer style={footerStyle}>Footer</Footer>
    // </Layout>
  );
};

export default UserLayout;
