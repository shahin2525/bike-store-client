import { Button, Col, Flex } from "antd";
import { FieldValues } from "react-hook-form";
import { useLoginMutation } from "../../redux/feature/auth/authApi";
import { verifyToken } from "../../utils/verifyToken";
import { useAppDispatch } from "../../redux/hooks";
import { setUser } from "../../redux/feature/auth/authSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import PHForm from "../../components/form/BSForm";
import PHInput from "../../components/form/BSInput";
import { toast } from "sonner";

const Login = () => {
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();
  const [error, setError] = useState("");
  // console.log(error);
  const location = useLocation();
  const navigate = useNavigate();

  const defaultValues = {
    email: "samin@s.com",
    password: "user1234",
  };

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Logging in");
    // console.log(data);
    try {
      const userInfo = {
        email: data.email,
        password: data.password,
      };
      const res = await login(userInfo).unwrap();
      // const res = (await login(userInfo).unwrap()) as TResponse<any>;

      // console.log(res);
      if (res?.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        const user = verifyToken(res?.data);
        // console.log(user);

        dispatch(setUser({ user: user, token: res?.data }));
        toast.success("user login successfully", {
          id: toastId,
          duration: 2000,
        });

        navigate(location?.state ? location.state : "/");
      }
    } catch (error: any) {
      toast.error(error.data.message, { id: toastId });
      // console.log(error?.data?.message);
    }
  };

  return (
    <Flex align="center" justify="center" style={{ marginTop: "30px" }}>
      <Col span={6}>
        <PHForm onSubmit={onSubmit} defaultValues={defaultValues}>
          <PHInput type="text" name="email" label="Email" />

          <PHInput type="text" name="password" label="Password" />

          <Button type="primary" htmlType="submit">
            submit
          </Button>
        </PHForm>
        <p
          className="flex justify-center items-center"
          style={{ marginTop: "10px", fontSize: "16px" }}
        >
          <span> Do not have an Account Please</span>
          <Link to="/register">
            <Button style={{ marginLeft: "10px" }} type="primary">
              Register
            </Button>
          </Link>
        </p>
      </Col>
    </Flex>
  );
};

export default Login;
