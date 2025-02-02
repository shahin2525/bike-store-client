// import { Layout, Menu, Button, Row, Col, Typography, Drawer } from "antd";
// import { useState } from "react";
// import { FaCircleInfo } from "react-icons/fa6";
// import { IoHomeOutline, IoMenu } from "react-icons/io5";
// import { IoCartOutline } from "react-icons/io5";
// import bikeIcon from "../../../assets/icons/bike-icon5.png";
// import { IoLogInOutline } from "react-icons/io5";
// import { IoLogOutOutline } from "react-icons/io5";
// import style from "../header/header.module.css";
// // import buttonStyle from "../../../style/global.css"
// const { Link } = Typography;
// // import logo from "../public/bike-logo.png"; // Add a bike shop type logo in public folder

// const { Header } = Layout;
import { Layout, Menu, Button, Row, Col, Typography, Drawer, Grid } from "antd";
import { useState } from "react";
import { FaCircleInfo } from "react-icons/fa6";
import {
  IoHomeOutline,
  IoLogInOutline,
  IoLogOutOutline,
  IoMenu,
} from "react-icons/io5";
import bikeIcon from "../../../assets/icons/bike-icon5.png";
import style from "../header/header.module.css";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";

const { Link } = Typography;
const { Header } = Layout;
const { useBreakpoint } = Grid;
const HeaderComponent = () => {
  const [user, setUser] = useState(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const screens = useBreakpoint(); // Get screen size
  const menuItems = [
    { key: "home", label: <Link href="/">Home</Link>, icon: <IoHomeOutline /> },
    {
      key: "about",
      label: <Link href="/about">About</Link>,
      icon: <FaCircleInfo />,
    },
    {
      key: "all-products",
      label: <Link href="/all-products">All Products</Link>,
      icon: <MdOutlineProductionQuantityLimits />,
    },
  ];

  return (
    // </Header>09122C#727D73
    // <Header
    //   style={{ backgroundColor: "#09122C", padding: "0 20px", height: "100px" }}
    // >
    //   <Row align="middle" justify="space-between" wrap={false}>
    //     {/* Logo Section */}
    //     <Col flex="100px">
    //       <Link href="/">
    //         {/* <Image
    //           src={logo}
    //           alt="Bike Shop Logo"
    //           width={50}
    //           height={50}
    //           priority
    //         /> */}
    //         <img src={bikeIcon} alt="" />
    //       </Link>
    //     </Col>

    //     {/* Navigation Menu (Centered) */}
    //     <Col flex="auto">
    //       <Menu
    //         // defaultSelectedKeys={["home"]}
    //         className={style["menu-item"]}
    //         mode="horizontal"
    //         theme="dark"
    //         items={menuItems} // ✅ Fixed Menu Structure
    //         style={{
    //           backgroundColor: "transparent",
    //           justifyContent: "center",
    //           color: "white",
    //           borderBottom: "none",
    //           alignItems: "center",
    //           marginBottom: "15px",
    //           // fontWeight: "bold",
    //           // opacity: 1,
    //         }}
    //         // itemStyle={{ color: "white", opacity: 1 }}
    //       />
    //     </Col>

    //     {/* Login/Logout Button (Right Side) */}
    //     <Col flex="100px" style={{ textAlign: "right", marginBottom: "15px" }}>
    //       {user ? (
    //         <Button
    //           // className={buttonStyle}
    //           type="primary"
    //           danger
    //           icon={<IoLogOutOutline />}
    //           onClick={() => setUser(null)}
    //         >
    //           Logout
    //         </Button>
    //       ) : (
    //         <Button
    //           type="primary"
    //           icon={<IoLogInOutline />}
    //           // onClick={() => setUser({ name: "User" })}
    //         >
    //           Login
    //         </Button>
    //       )}
    //     </Col>
    //   </Row>
    // </Header>
    <Header
      style={{ backgroundColor: "#09122C", padding: "0 20px", height: "80px" }}
    >
      <Row align="middle" justify="space-between" wrap={false}>
        {/* Left Side: Logo */}
        <Col flex="auto">
          <Link href="/">
            <img
              src={bikeIcon}
              alt="Bike Shop Logo"
              style={{
                marginTop: screens.xs ? "4px" : "8px",
                width: screens.xs ? "40px" : "75px",
                height: screens.xs ? "40px" : "75px",
              }}
            />
          </Link>
        </Col>

        {/* Center: Menu (Hidden on Mobile) */}
        <Col flex="auto" style={{ display: screens.md ? "block" : "none" }}>
          <Menu
            mode="horizontal"
            theme="dark"
            items={menuItems}
            className={style["menu-item"]}
            style={{
              backgroundColor: "transparent",
              justifyContent: "center",
              color: "white",
              borderBottom: "none",
              marginBottom: screens.lg ? "18px" : screens.md ? "12px" : "",
            }}
          />
        </Col>

        {/* Right Side: Login/Logout + Mobile Menu Button */}
        <Col
          flex="auto"
          style={{
            textAlign: "right",
            marginBottom: screens.lg ? "18px" : screens.md ? "12px" : "",
          }}
        >
          {screens.md ? (
            <Button
              type="primary"
              icon={user ? <IoLogOutOutline /> : <IoLogInOutline />}
              // onClick={() =>  setUser(user ? null : { name: "User" })}
            >
              {user ? <Link>Logout</Link> : <Link href="/login">Login</Link>}
            </Button>
          ) : (
            <Button
              type="text"
              icon={<IoMenu size={24} color="white" />}
              onClick={() => setDrawerVisible(true)}
            />
          )}
        </Col>
      </Row>

      {/* Drawer for Mobile Menu */}
      <Drawer
        title="Menu"
        placement="right"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
      >
        <Menu mode="inline" theme="light" items={menuItems} />
        <Button
          block
          type="primary"
          style={{ marginTop: "10px" }}
          icon={user ? <IoLogOutOutline /> : <IoLogInOutline />}
          // onClick={() => setUser(user ? null : { name: "User" })}
        >
          {user ? "Logout" : "Login"}
        </Button>
      </Drawer>
    </Header>
  );
};

export default HeaderComponent;
