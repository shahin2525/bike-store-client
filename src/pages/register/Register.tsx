import { Button, Col, Flex } from "antd";
import PHForm from "../../components/form/BSForm";
import PHInput from "../../components/form/BSInput";
import { Link } from "react-router-dom";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { useCreateUserMutation } from "../../redux/feature/auth/authApi";

import { TResponse } from "../../types/global.types";

const Register = () => {
  const [register] = useCreateUserMutation();

  // const defaultValues = {
  //   name: "samin",
  //   email: "samin@s.com",
  //   password: "user1234",
  // };

  const onSubmit = async (data: FieldValues) => {
    // const toastId = toast.loading("logging user", { duration: 2000 });
    const toastId = toast.loading("creating", { duration: 2000 });
    console.log(data);

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
        toast.success("user register successfully", { id: toastId });
      }
    } catch (error: any) {
      toast.error(error.data.message, { id: toastId });
    }
  };
  return (
    <Flex align="center" justify="center" style={{ marginTop: "30px" }}>
      <Col span={6}>
        <PHForm onSubmit={onSubmit}>
          <PHInput type="text" name="name" label="Name" />
          <PHInput type="text" name="email" label="Email" />

          <PHInput type="text" name="password" label="Password" />

          <Button htmlType="submit">submit</Button>
        </PHForm>
        <p
          className="flex justify-center items-center"
          style={{ marginTop: "10px", fontSize: "16px" }}
        >
          <span style={{ marginRight: "5px" }}>
            Already have an Account Please
          </span>
          <Link to="/login">
            <Button type="primary">login</Button>
          </Link>
        </p>
      </Col>
    </Flex>
  );
};

export default Register;
