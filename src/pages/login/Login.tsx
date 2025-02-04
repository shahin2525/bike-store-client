import { Button } from "antd";
import { FieldValues, useForm } from "react-hook-form";
import { useLoginMutation } from "../../redux/feature/auth/authApi";
import { verifyToken } from "../../utils/verifyToken";
import { useAppDispatch } from "../../redux/hooks";
import { setUser } from "../../redux/feature/auth/authSlice";
import { useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useAppDispatch();
  const [login, { error }] = useLoginMutation();
  const location = useLocation();
  const navigate = useNavigate();

  console.log(location);
  // console.log("data", data);
  console.log("err", error);

  console.log(error);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      email: "samin@s.com",
      password: "user1234",
    },
  });
  const onSubmit = async (data: FieldValues) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };
    const res = await login(userInfo).unwrap();
    const user = verifyToken(res?.data);
    console.log(user);
    dispatch(setUser({ user: user, token: res?.data }));
    navigate(location?.state ? location.state : "/");
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="">Id:</label>
      <input type="text" {...register("email")} />
      <br />
      <label htmlFor="">Password:</label>
      <input type="text" {...register("password")} />
      <Button htmlType="submit">Submit</Button>
    </form>
  );
};

export default Login;
