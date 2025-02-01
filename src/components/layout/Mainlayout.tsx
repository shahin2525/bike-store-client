import { Layout, Menu, MenuProps } from "antd";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { createElement } from "react";
const { Header, Content, Footer, Sider } = Layout;
const items1: MenuProps["items"] = ["1", "2", "3"].map((key) => ({
  key,
  label: `nav ${key}`,
}));
const items = [
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  UserOutlined,
].map((icon, index) => ({
  key: String(index + 1),
  icon: createElement(icon),
  label: `nav ${index + 1}`,
}));
// const headerStyle: React.CSSProperties = {
//   textAlign: "center",
//   color: "#fff",
//   height: 64,
//   paddingInline: 48,
//   lineHeight: "64px",
//   backgroundColor: "#4096ff",
// };

// const contentStyle: React.CSSProperties = {
//   textAlign: "center",
//   minHeight: 120,
//   lineHeight: "120px",
//   color: "#fff",
//   backgroundColor: "#0958d9",
// };

// const siderStyle: React.CSSProperties = {
//   textAlign: "center",
//   lineHeight: "120px",
//   color: "#fff",
//   backgroundColor: "#1677ff",
// };

// const footerStyle: React.CSSProperties = {
//   textAlign: "center",
//   color: "#fff",
//   backgroundColor: "#4096ff",
// };

// const layoutStyle = {
//   borderRadius: 8,
//   overflow: "hidden",
//     width: "calc(50% - 8px)",
//     maxWidth: "calc(50% - 8px)",
// };
const MainLayout = () => {
  return (
    <Layout>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
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
          items={items}
        />
      </Sider>
      <Layout>
        <Header style={{ background: "white" }}>
          {" "}
          <div className="demo-logo" />
          <Menu
            // theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["1"]}
            items={items1}
            style={{ flex: 1, minWidth: 0 }}
          />{" "}
        </Header>
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            content first in main
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
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

export default MainLayout;
