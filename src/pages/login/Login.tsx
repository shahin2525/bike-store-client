import { Button } from "antd";
import { FieldValues, useForm } from "react-hook-form";
import { useLoginMutation } from "../../redux/feature/auth/authApi";
import { verifyToken } from "../../utils/verifyToken";
import { useAppDispatch } from "../../redux/hooks";
import { setUser } from "../../redux/feature/auth/authSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

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
    <form style={{ margin: "20px" }} onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="">Id:</label>
      <input type="text" {...register("email")} />
      <br />
      <label htmlFor="">Password:</label>
      <input type="text" {...register("password")} />
      {error && (
        <p style={{ color: "red", fontSize: "20px" }}>
          {error?.data?.message || "An error occurred"}
        </p>
      )}
      <Button htmlType="submit">Submit</Button>
    </form>
  );
};

export default Login;
