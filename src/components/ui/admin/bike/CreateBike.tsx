import { Button, Col, Flex } from "antd";
import PHForm from "../../../form/PHForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { useCreateBikeMutation } from "../../../../redux/feature/bike/bikApi";

const CreateBike = () => {
  const [createBike] = useCreateBikeMutation();
  const onsubmit: SubmitHandler<FieldValues> = async (data) => {
    // console.log("data", Number(data.name) - 1);
    console.log(data);
    const toastId = toast.loading("creating .....");

    const bikeData = {};
    try {
      const res = await createBike(bikeData);
      console.log(res);
      if (res?.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("semester create successfully", { id: toastId });
      }
      console.log(res);
    } catch (error) {
      toast.error("something went wrong", { id: toastId });
    }

    console.log(semesterData);
  };
  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm
          onSubmit={onsubmit}
          resolver={zodResolver(academicSemesterSchema)}
        >
          <Button htmlType="submit">submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateBike;
