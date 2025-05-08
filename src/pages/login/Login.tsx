// import { Button, Col, Flex, Row } from "antd";
// import { FieldValues } from "react-hook-form";
// import { useLoginMutation } from "../../redux/feature/auth/authApi";
// import { verifyToken } from "../../utils/verifyToken";
// import { useAppDispatch } from "../../redux/hooks";
// import { setUser } from "../../redux/feature/auth/authSlice";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import PHForm from "../../components/form/BSForm";
// import PHInput from "../../components/form/BSInput";
// import { toast } from "sonner";
// import { useForm } from "react-hook-form";

// const Login = () => {
//   const dispatch = useAppDispatch();
//   const [login] = useLoginMutation();
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { setValue } = useForm();

//   const onSubmit = async (data: FieldValues) => {
//     const toastId = toast.loading("Logging in");
//     try {
//       const userInfo = {
//         email: data.email,
//         password: data.password,
//       };
//       const res = await login(userInfo).unwrap();

//       if (res?.error) {
//         toast.error(res.error.data.message, { id: toastId });
//       } else {
//         const user = verifyToken(res?.data);
//         dispatch(setUser({ user: user, token: res?.data }));
//         toast.success("Logged in successfully", {
//           id: toastId,
//           duration: 2000,
//         });
//         navigate(location?.state ? location.state : "/");
//       }
//     } catch (error: any) {
//       toast.error(error?.data?.message, { id: toastId });
//       console.log("error", error?.data?.message);
//     }
//   };

//   // Function to auto-fill recruiter credentials
//   const fillCustomerCredentials = () => {
//     setValue("email", "samin@s.com");
//     setValue("password", "user12345");
//   };

//   // Function to auto-fill admin credentials
//   const fillAdminCredentials = () => {
//     setValue("email", "jhankar@j.com");
//     setValue("password", "user123");
//   };

//   return (
//     <Row justify="center" style={{ minHeight: "80vh", padding: "20px 0" }}>
//       <Col
//         xs={24}
//         sm={20}
//         md={16}
//         lg={12}
//         xl={10}
//         style={{
//           padding: "20px",
//           border: "1px solid #d9d9d9",
//           borderRadius: "8px",
//           boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
//           backgroundColor: "#fff",
//           fontSize: "20px",
//           fontWeight: "bold",
//         }}
//       >
//         <Flex vertical gap="middle">
//           <h2 style={{ textAlign: "center", marginBottom: "24px" }}>Login</h2>

//           {/* Quick Login Buttons */}
//           <Flex gap="middle" justify="center" style={{ marginBottom: "16px" }}>
//             <Button
//               type="dashed"
//               onClick={fillAdminCredentials}
//               style={{ fontWeight: "bold" }}
//             >
//               Login as Admin
//             </Button>
//             <Button
//               type="dashed"
//               onClick={fillCustomerCredentials}
//               style={{ fontWeight: "bold" }}
//             >
//               Login as Customer
//             </Button>
//           </Flex>

//           <PHForm onSubmit={onSubmit}>
//             <PHInput type="text" name="email" label="Email" />
//             <PHInput type="password" name="password" label="Password" />

//             <Button
//               type="primary"
//               htmlType="submit"
//               block
//               size="large"
//               style={{ marginTop: "16px" }}
//             >
//               Login
//             </Button>
//           </PHForm>

//           <div style={{ textAlign: "center", marginTop: "16px" }}>
//             <span>Don't have an account? </span>
//             <Link to="/register">
//               <Button type="link" style={{ padding: 0 }}>
//                 Register
//               </Button>
//             </Link>
//           </div>
//         </Flex>
//       </Col>
//     </Row>
//   );
// };

// export default Login;
import { Button, Col, Flex, Row } from "antd";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { useLoginMutation } from "../../redux/feature/auth/authApi";
import { verifyToken } from "../../utils/verifyToken";
import { useAppDispatch } from "../../redux/hooks";
import { setUser } from "../../redux/feature/auth/authSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PHForm from "../../components/form/BSForm";
import PHInput from "../../components/form/BSInput";
import { toast } from "sonner";

const Login = () => {
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();
  const location = useLocation();
  const navigate = useNavigate();

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Logging in");
    try {
      const userInfo = {
        email: data.email,
        password: data.password,
      };
      const res = await login(userInfo).unwrap();

      if (res?.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        const user = verifyToken(res?.data);
        dispatch(setUser({ user: user, token: res?.data }));
        toast.success("Logged in successfully", {
          id: toastId,
          duration: 2000,
        });
        navigate(location?.state ? location.state : "/");
      }
    } catch (error: any) {
      toast.error(error?.data?.message, { id: toastId });
      console.log("error", error?.data?.message);
    }
  };

  return (
    <Row justify="center" style={{ minHeight: "80vh", padding: "20px 0" }}>
      <Col
        xs={24}
        sm={20}
        md={16}
        lg={12}
        xl={10}
        style={{
          padding: "20px",
          border: "1px solid #d9d9d9",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#fff",
          fontSize: "20px",
          fontWeight: "bold",
        }}
      >
        <Flex vertical gap="middle">
          <h2 style={{ textAlign: "center", marginBottom: "24px" }}>Login</h2>

          <PHForm onSubmit={onSubmit}>
            {(methods: UseFormReturn<FieldValues>) => {
              const { setValue } = methods;

              const fillCustomerCredentials = () => {
                setValue("email", "samin@s.com");
                setValue("password", "user123");
              };

              const fillAdminCredentials = () => {
                setValue("email", "jhankar@j.com");
                setValue("password", "user123");
              };

              return (
                <>
                  {/* Quick Login Buttons */}
                  <Flex
                    gap="middle"
                    justify="center"
                    style={{ marginBottom: "16px" }}
                  >
                    <Button
                      type="dashed"
                      onClick={fillAdminCredentials}
                      style={{ fontWeight: "bold" }}
                    >
                      Login as Admin
                    </Button>
                    <Button
                      type="dashed"
                      onClick={fillCustomerCredentials}
                      style={{ fontWeight: "bold" }}
                    >
                      Login as Customer
                    </Button>
                  </Flex>

                  <PHInput type="text" name="email" label="Email" />
                  <PHInput type="password" name="password" label="Password" />

                  <Button
                    type="primary"
                    htmlType="submit"
                    block
                    size="large"
                    style={{ marginTop: "16px" }}
                  >
                    Login
                  </Button>
                </>
              );
            }}
          </PHForm>

          <div style={{ textAlign: "center", marginTop: "16px" }}>
            <span>Don't have an account? </span>
            <Link to="/register">
              <Button type="link" style={{ padding: 0 }}>
                Register
              </Button>
            </Link>
          </div>
        </Flex>
      </Col>
    </Row>
  );
};

export default Login;
