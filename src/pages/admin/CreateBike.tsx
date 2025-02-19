import { Button, Col, Row } from "antd";
// import PHForm from "../../../form/BSForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { useCreateBikeMutation } from "../../redux/feature/bike/bikApi";
import { TResponse } from "../../types/global.types";
import PHForm from "../../components/form/BSForm";
import PHInput from "../../components/form/BSInput";
import BSSelect from "../../components/form/BSSelect";
import {
  bikeCategoriesOptions,
  bikeModelOptions,
  brandsOptions,
} from "../../constants/global.const";

const CreateBike = () => {
  const [createBike] = useCreateBikeMutation();
  const onsubmit: SubmitHandler<FieldValues> = async (data) => {
    // console.log("data", Number(data.name) - 1);

    const toastId = toast.loading("creating .....");

    const bikeData = {
      bikeImage: data?.bikeImage,

      brand: data?.brand,

      category: data?.category,

      description: data?.description,

      model: data?.model,

      name: data?.name,

      price: data?.price,

      quantity: data?.quantity,
    };
    try {
      const res = (await createBike(bikeData)) as TResponse<any>;
      // console.log(res);
      if (res?.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("bike create successfully", { id: toastId });
      }
    } catch (error: any) {
      toast.error(error.data.message, { id: toastId });
    }
  };
  return (
    <Row
      justify="center"
      style={{ marginTop: "30px", marginBottom: "20px", padding: "0px 10px" }}
    >
      <Col span={24}>
        <PHForm
          onSubmit={onsubmit}
          // resolver={zodResolver(academicSemesterSchema)}
        >
          <Row gutter={4}>
            <Col
              span={24}
              md={{ span: 12 }}
              lg={{ span: 12 }}
              style={{ padding: "0px 3px" }}
            >
              <PHInput label="Name" type="text" name="name" />
            </Col>
            <Col
              span={24}
              md={{ span: 12 }}
              lg={{ span: 12 }}
              style={{ padding: "0px 3px" }}
            >
              <BSSelect label="Brand" name="brand" options={brandsOptions} />
            </Col>
            <Col
              span={24}
              md={{ span: 12 }}
              lg={{ span: 12 }}
              style={{ padding: "0px 3px" }}
            >
              <PHInput label="Price" type="text" name="price" />
            </Col>
            <Col
              span={24}
              md={{ span: 12 }}
              lg={{ span: 12 }}
              style={{ padding: "0px 3px" }}
            >
              <BSSelect
                label="Category"
                name="category"
                options={bikeCategoriesOptions}
              />
            </Col>
          </Row>

          <Row>
            <Col
              span={24}
              md={{ span: 12 }}
              lg={{ span: 12 }}
              style={{ padding: "0px 3px" }}
            >
              <PHInput label="Description" type="text" name="description" />
            </Col>
            <Col
              span={24}
              md={{ span: 12 }}
              lg={{ span: 12 }}
              style={{ padding: "0px 3px" }}
            >
              <PHInput label="Quantity" type="text" name="quantity" />
            </Col>
            <Col
              span={24}
              md={{ span: 12 }}
              lg={{ span: 12 }}
              style={{ padding: "0px 3px" }}
            >
              <BSSelect label="Model" name="model" options={bikeModelOptions} />
            </Col>
            <Col
              span={24}
              md={{ span: 12 }}
              lg={{ span: 12 }}
              style={{ padding: "0px 3px" }}
            >
              <PHInput label="BikeImage" type="text" name="bikeImage" />
            </Col>
          </Row>

          <Button
            type="primary"
            htmlType="submit"
            style={{ marginLeft: "3px" }}
          >
            submit
          </Button>
        </PHForm>
      </Col>
    </Row>
  );
};

export default CreateBike;
