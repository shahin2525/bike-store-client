import { Button, Row } from "antd";
import { FieldValues, useForm } from "react-hook-form";
import { useLoginMutation } from "../../redux/feature/auth/authApi";
import { verifyToken } from "../../utils/verifyToken";
import { useAppDispatch } from "../../redux/hooks";
import { setUser } from "../../redux/feature/auth/authSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import PHForm from "../../components/form/PHForm";
import PHInput from "../../components/form/PHInput";

const Login = () => {
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();
  const [error, setError] = useState("");
  console.log(error?.data?.message);
  const location = useLocation();
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      email: "samin@s.com",
      password: "user1234",
    },
  });
  const onSubmit = async (data: FieldValues) => {
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

      navigate(location?.state ? location.state : "/");
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };
  return (
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <PHForm onSubmit={onSubmit}>
        <PHInput type={"text"} name="email" label="Email" />
        <PHInput type={"text"} name="password" label="Password" />
        {error && (
          <p style={{ color: "red", fontSize: "20px" }}>
            {error?.data?.message || "An error occurred"}
          </p>
        )}
        <Button htmlType="submit">Submit</Button>
      </PHForm>
    </Row>
  );
};

export default Login;
