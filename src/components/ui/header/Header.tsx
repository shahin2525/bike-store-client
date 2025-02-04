// const { Header } = Layout;
import { Layout, Menu, Button, Row, Col, Drawer, Grid } from "antd";
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
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  logout,
  selectCurrentUser,
} from "../../../redux/feature/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
// const { Link } = Typography;
const { Header } = Layout;
const { useBreakpoint } = Grid;
const HeaderComponent = () => {
  // const [user, setUser] = useState(null);
  const user = useAppSelector(selectCurrentUser);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const screens = useBreakpoint(); // Get screen size
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  const menuItems = [
    { key: "home", label: <Link to="/">Home</Link>, icon: <IoHomeOutline /> },
    {
      key: "about",
      label: <Link to="/about">About</Link>,
      icon: <FaCircleInfo />,
    },
    {
      key: "all-products",
      label: <Link to="/all-products">All Products</Link>,
      icon: <MdOutlineProductionQuantityLimits />,
    },
  ];

  return (
    <Header
      style={{ backgroundColor: "#09122C", padding: "0 20px", height: "80px" }}
    >
      <Row align="middle" justify="space-between" wrap={false}>
        {/* Left Side: Logo */}
        <Col flex="auto">
          <Link to="/">
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
            // <Button
            //   type="primary"
            //   icon={user ? <IoLogOutOutline /> : <IoLogInOutline />}

            // >
            //   {user ? (
            //     <Link onClick={handleLogout}>Logout</Link>
            //   ) : (
            //     <Link href="/login">Login</Link>
            //   )}
            // </Button>
            user ? (
              <Button
                type="primary"
                icon={<IoLogOutOutline />}
                onClick={handleLogout}
              >
                Logout
              </Button>
            ) : (
              <Button type="primary" icon={<IoLogInOutline />}>
                <Link to="/login">Login</Link>
              </Button>
            )
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
        {/* <Button
          block
          type="primary"
          style={{ marginTop: "10px" }}
          icon={user ? <IoLogOutOutline /> : <IoLogInOutline />}
          // onClick={() => setUser(user ? null : { name: "User" })}
        >
          {user ? "Logout" : "Login"}
        </Button> */}
        {user ? (
          <Button
            type="primary"
            icon={<IoLogOutOutline />}
            onClick={handleLogout}
          >
            Logout
          </Button>
        ) : (
          <Button type="primary" icon={<IoLogInOutline />}>
            <Link to="/login">Login</Link>
          </Button>
        )}
      </Drawer>
    </Header>
  );
};

export default HeaderComponent;
