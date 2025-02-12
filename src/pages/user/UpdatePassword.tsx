import { Button, Col, Flex } from "antd";
// import PHForm from "../../form/BSForm";
// import PHInput from "../../form/BSInput";
import { Link, Navigate } from "react-router-dom";
import { toast } from "sonner";
import { FieldValues } from "react-hook-form";
import { useUpdatePasswordMutation } from "../../redux/feature/user/userApi";
import PHForm from "../../components/form/BSForm";
import PHInput from "../../components/form/BSInput";
// import { useUpdatePasswordMutation } from "../../../redux/feature/user/userApi";

const UpdatePassword = () => {
  const [updatePassword] = useUpdatePasswordMutation();
  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("updating...");
    // console.log(data);
    try {
      const updatePasswordInfo = {
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      };
      const res = await updatePassword(updatePasswordInfo).unwrap();
      // const res = (await login(userInfo).unwrap()) as TResponse<any>;

      // console.log(res);
      if (res?.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        // console.log(user);

        toast.success("password update successfully", {
          id: toastId,
          duration: 2000,
        });
        // navigate(location?.state ? location.state : "/");
        // <Navigate to="/login" />;
        return <Navigate to="/login" replace={true} />;
      }
    } catch (error: any) {
      toast.error(error.data.message, { id: toastId });
      // console.log(error?.data?.message);
    }
  };
  return (
    <Flex align="center" justify="center" style={{ marginTop: "30px" }}>
      <Col span={6}>
        <PHForm onSubmit={onSubmit}>
          <PHInput type="text" name="oldPassword" label="Old Password" />

          <PHInput type="text" name="newPassword" label="New Password" />

          <Button type="primary" htmlType="submit">
            submit
          </Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default UpdatePassword;
