import { Button, Flex, Typography, Divider, Card } from "antd";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { useLoginMutation } from "../../redux/feature/auth/authApi";
import { verifyToken } from "../../utils/verifyToken";
import { useAppDispatch } from "../../redux/hooks";
import { setUser } from "../../redux/feature/auth/authSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PHForm from "../../components/form/BSForm";
import PHInput from "../../components/form/BSInput";
import { toast } from "sonner";

const { Title, Text } = Typography;

const Login = () => {
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();
  const location = useLocation();
  const navigate = useNavigate();

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Logging in...");
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
      toast.error(error?.data?.message || "Login failed", { id: toastId });
      console.error("Login Error:", error?.data?.message);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "24px",
      }}
    >
      <Card
        style={{
          width: "100%",
          maxWidth: "580px",
          borderRadius: "12px",
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
          border: "none",
          overflow: "hidden",
        }}
        styles={{ body: { padding: "40px" } }}
      >
        <Flex vertical gap="large" align="center">
          {/* Logo and Header */}
          <Flex vertical align="center" gap="middle">
            <div
              style={{
                width: "84px",
                height: "84px",
                borderRadius: "50%",
                backgroundColor: "#09122C",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "white",
                fontSize: "24px",
                fontWeight: "bold",
              }}
            >
              BShop
            </div>
            <Title level={3} style={{ margin: 0, color: "#09122C" }}>
              Welcome Back
            </Title>
            <Text type="secondary">Sign in to continue to Bike Shop</Text>
          </Flex>

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
                <Flex vertical gap="large" style={{ width: "100%" }}>
                  {/* Quick Login Buttons */}
                  <Flex vertical gap="small">
                    <Divider
                      plain
                      style={{ margin: "8px 0", fontSize: "12px" }}
                    >
                      Or try demo accounts
                    </Divider>
                    <Flex gap="small">
                      <Button
                        onClick={fillAdminCredentials}
                        block
                        style={{
                          backgroundColor: "#f0f0f0",
                          color: "#09122C",
                          border: "none",
                        }}
                      >
                        Admin
                      </Button>
                      <Button
                        onClick={fillCustomerCredentials}
                        block
                        style={{
                          backgroundColor: "#f0f0f0",
                          color: "#09122C",
                          border: "none",
                        }}
                      >
                        Customer
                      </Button>
                    </Flex>
                  </Flex>

                  {/* Form Fields */}
                  <Flex vertical gap="middle">
                    <PHInput
                      type="text"
                      name="email"
                      label="Email"
                      placeholder="Enter your email"
                      size="large"
                    />
                    <PHInput
                      type="password"
                      name="password"
                      label="Password"
                      placeholder="Enter your password"
                      size="large"
                    />
                  </Flex>

                  {/* Submit Button */}
                  <Button
                    type="primary"
                    htmlType="submit"
                    block
                    size="large"
                    style={{
                      marginTop: "16px",
                      backgroundColor: "#09122C",
                      height: "48px",
                      fontWeight: "500",
                    }}
                  >
                    Sign In
                  </Button>
                </Flex>
              );
            }}
          </PHForm>

          {/* Footer Link */}
          <Flex gap="small">
            <Text type="secondary">Don't have an account?</Text>
            <Link to="/register">
              <Button
                type="link"
                style={{
                  padding: 0,
                  fontWeight: "500",
                  color: "#09122C",
                }}
              >
                Sign up
              </Button>
            </Link>
          </Flex>
        </Flex>
      </Card>
    </div>
  );
};

export default Login;
