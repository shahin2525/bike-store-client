import { Button, Col, Flex } from "antd";
import PHForm from "../../../form/BSForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { useCreateBikeMutation } from "../../../../redux/feature/bike/bikApi";
import { TResponse } from "../../../../types/global.types";
import PHInput from "../../../form/BSInput";
import BSSelect from "../../../form/BSSelect";
import {
  bikeCategoriesOptions,
  brandsOptions,
} from "../../../../constants/global.const";

const CreateBike = () => {
  const [createBike] = useCreateBikeMutation();
  const onsubmit: SubmitHandler<FieldValues> = async (data) => {
    // console.log("data", Number(data.name) - 1);
    console.log(data);
    const toastId = toast.loading("creating .....");

    const bikeData = {};
    try {
      const res = (await createBike(bikeData)) as TResponse<any>;
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

    console.log(bikeData);
  };
  return (
    <Flex justify="center" align="center" style={{ marginTop: "30px" }}>
      <Col span={6}>
        <PHForm
          onSubmit={onsubmit}
          // resolver={zodResolver(academicSemesterSchema)}
        >
          <PHInput label="Name" type="text" name="name" />
          <BSSelect label="Brand" name="brand" options={brandsOptions} />
          <PHInput label="Price" type="text" name="price" />
          <BSSelect
            label="Category"
            name="category"
            options={bikeCategoriesOptions}
          />
          <Button htmlType="submit">submit2</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateBike;
