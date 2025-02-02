import { Button } from "antd";
import { FieldValues, useForm } from "react-hook-form";
import { useLoginMutation } from "../../redux/feature/auth/authApi";

const Login = () => {
  const [login, { data, error }] = useLoginMutation();
  console.log("data", data);
  console.log("err", error);

  console.log(error);
  const { register, handleSubmit } = useForm();
  const onSubmit = (data: FieldValues) => {
    const userInfo = {
      id: data.id,
      password: data.password,
    };
    login(userInfo);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="">Id:</label>
      <input type="text" {...register("id")} />
      <br />
      <label htmlFor="">Password:</label>
      <input type="text" {...register("password")} />
      <Button htmlType="submit">Submit</Button>
    </form>
  );
};

export default Login;
