// import { Button, Col, Flex } from "antd";
// import PHForm from "../../components/form/BSForm";
// import PHInput from "../../components/form/BSInput";
// import { Link } from "react-router-dom";
// import { FieldValues } from "react-hook-form";
// import { toast } from "sonner";
// import { useCreateUserMutation } from "../../redux/feature/auth/authApi";

// import { TResponse } from "../../types/global.types";

// const Register = () => {
//   const [register] = useCreateUserMutation();

//   // const defaultValues = {
//   //   name: "samin",
//   //   email: "samin@s.com",
//   //   password: "user1234",
//   // };

//   const onSubmit = async (data: FieldValues) => {
//     // const toastId = toast.loading("logging user", { duration: 2000 });
//     const toastId = toast.loading("creating", { duration: 2000 });
//     // console.log(data);

//     try {
//       const userInfo = {
//         name: data.name,
//         email: data.email,
//         password: data.password,
//       };
//       const res = (await register(userInfo).unwrap()) as TResponse<any>;
//       if (res?.error) {
//         toast.error(res.error.data.message, { id: toastId });
//       } else {
//         toast.success("user register successfully", { id: toastId });
//       }
//     } catch (error: any) {
//       toast.error(error.data.message, { id: toastId });
//     }
//   };
//   return (
//     <Flex align="center" justify="center" style={{ marginTop: "30px" }}>
//       <Col span={6}>
//         <PHForm onSubmit={onSubmit}>
//           <PHInput type="text" name="name" label="Name" />
//           <PHInput type="text" name="email" label="Email" />

//           <PHInput type="text" name="password" label="Password" />

//           <Button htmlType="submit">submit</Button>
//         </PHForm>
//         <p
//           className="flex justify-center items-center"
//           style={{ marginTop: "10px", fontSize: "16px" }}
//         >
//           <span style={{ marginRight: "5px" }}>
//             Already have an Account Please
//           </span>
//           <Link to="/login">
//             <Button type="primary">login</Button>
//           </Link>
//         </p>
//       </Col>
//     </Flex>
//   );
// };

// export default Register;
import { Button, Card, Divider, Flex, Grid, Typography, theme } from "antd";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { useCreateUserMutation } from "../../redux/feature/auth/authApi";
import { TResponse } from "../../types/global.types";
import PHForm from "../../components/form/BSForm";
import PHInput from "../../components/form/BSInput";

const { useToken } = theme;
const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

const Register = () => {
  const [register] = useCreateUserMutation();
  const { token } = useToken();
  const screens = useBreakpoint();

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Creating account...", { duration: 2000 });

    try {
      const userInfo = {
        name: data.name,
        email: data.email,
        password: data.password,
      };
      const res = (await register(userInfo).unwrap()) as TResponse<any>;
      if (res?.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("User registered successfully!", { id: toastId });
      }
    } catch (error: any) {
      toast.error(error.data.message, { id: toastId });
    }
  };

  return (
    <Flex
      align="center"
      justify="center"
      style={{
        minHeight: "100vh",
        padding: screens.xs ? "16px" : "24px",
        background: `linear-gradient(135deg, ${token.colorPrimaryBg} 0%, #f0f2f5 100%)`,
      }}
    >
      <Card
        style={{
          width: "100%",
          maxWidth: "500px",
          boxShadow: token.boxShadow,
          border: `1px solid ${token.colorBorderSecondary}`,
        }}
        bodyStyle={{ padding: screens.xs ? "20px" : "32px" }}
      >
        <Flex
          vertical
          align="center"
          gap="middle"
          style={{ marginBottom: "24px" }}
        >
          <Title level={3} style={{ margin: 0, color: token.colorPrimary }}>
            Create Your Account
          </Title>
          <Text type="secondary">Join us today to get started</Text>
        </Flex>

        <PHForm onSubmit={onSubmit}>
          <PHInput
            type="text"
            name="name"
            label="Full Name"
            prefix={<UserOutlined />}
            placeholder="John Doe"
            size={screens.xs ? "middle" : "large"}
          />

          <PHInput
            type="email"
            name="email"
            label="Email Address"
            prefix={<MailOutlined />}
            placeholder="john@example.com"
            size={screens.xs ? "middle" : "large"}
          />

          <PHInput
            type="password"
            name="password"
            label="Password"
            prefix={<LockOutlined />}
            placeholder="••••••••"
            size={screens.xs ? "middle" : "large"}
          />

          <Button
            type="primary"
            htmlType="submit"
            block
            size={screens.xs ? "middle" : "large"}
            style={{ marginTop: "16px" }}
          >
            Register
          </Button>
        </PHForm>

        <Divider
          plain
          style={{ margin: "24px 0", color: token.colorTextSecondary }}
        >
          OR
        </Divider>

        <Flex justify="center" align="center" gap="small">
          <Text>Already have an account?</Text>
          <Link to="/login">
            <Button type="link" style={{ padding: 0 }}>
              Sign In
            </Button>
          </Link>
        </Flex>
      </Card>
    </Flex>
  );
};

export default Register;
