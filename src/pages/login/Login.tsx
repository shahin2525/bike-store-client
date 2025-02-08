import { Button, Col, Flex } from "antd";
import { FieldValues } from "react-hook-form";
import { useLoginMutation } from "../../redux/feature/auth/authApi";
import { verifyToken } from "../../utils/verifyToken";
import { useAppDispatch } from "../../redux/hooks";
import { setUser } from "../../redux/feature/auth/authSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import PHForm from "../../components/form/PHForm";
import PHInput from "../../components/form/PHInput";
import { toast } from "sonner";

const Login = () => {
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();
  const [error, setError] = useState("");
  console.log(error);
  const location = useLocation();
  const navigate = useNavigate();

  const defaultValues = {
    email: "samin@s.com",
    password: "user1234",
  };

  const onSubmit = async (data: FieldValues) => {
    // const toastId = toast.loading("logging user", { duration: 2000 });
    const toastId = toast.loading("logging user", { duration: 2000 });
    console.log(data);
    try {
      const userInfo = {
        email: data.email,
        password: data.password,
      };
      const res = await login(userInfo).unwrap();
      const user = verifyToken(res?.data);
      console.log(user);

      dispatch(setUser({ user: user, token: res?.data }));
      toast.success("user login successfully", { id: toastId, duration: 2000 });

      navigate(location?.state ? location.state : "/");
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };
  return (
    // <Row justify="center" align="middle" style={{ height: "100vh" }}>
    //   <PHForm onSubmit={onSubmit} defaultValues={defaultValues}>
    //     <PHInput type={"text"} name="email" label="Email" />
    //     <PHInput type={"text"} name="password" label="Password" />
    //     {error && (
    //       <p style={{ color: "red", fontSize: "20px" }}>
    //         {error?.data?.message || "An error occurred"}
    //       </p>
    //     )}
    //     <Button htmlType="submit">Submit</Button>
    //   </PHForm>
    // </Row> style={{ height: "100vh" }}
    <Flex align="center" justify="center" style={{ marginTop: "30px" }}>
      <Col span={6}>
        <PHForm onSubmit={onSubmit} defaultValues={defaultValues}>
          <PHInput type="text" name="email" label="Email" />

          <PHInput type="text" name="password" label="Password" />

          <Button htmlType="submit">submit</Button>
          {error && (
            <p style={{ color: "red", fontSize: "20px" }}>
              {error?.data?.message || "An error occurred"}
            </p>
          )}
        </PHForm>
      </Col>
    </Flex>
  );
};

export default Login;
