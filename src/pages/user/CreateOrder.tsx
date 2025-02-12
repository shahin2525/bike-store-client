import { Button, Col, Row } from "antd";
// import PHForm from "../../form/BSForm";
// import PHInput from "../../form/BSInput";
// import BSSelect from "../../form/BSSelect";
import { toast } from "sonner";
// import { TResponse } from "../../../types/global.types";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useGetAllBikeQuery } from "../../redux/feature/bike/bikApi";
import { useCreateOrderMutation } from "../../redux/feature/order/orderApi";
import { TBike } from "../../types/bike.type";
import { TResponse } from "../../types/global.types";
import PHForm from "../../components/form/BSForm";
import PHInput from "../../components/form/BSInput";
import BSSelect from "../../components/form/BSSelect";
// import { useCreateOrderMutation } from "../../../redux/feature/order/orderApi";
// import { useGetAllBikeQuery } from "../../../redux/feature/bike/bikApi";
// import { TBike } from "../../../types/bike.type";

const CreateOrder = () => {
  const { data: productData } = useGetAllBikeQuery(undefined);
  console.log(productData);
  const [createOrder] = useCreateOrderMutation();

  const productOptions = productData?.data?.map((item: TBike) => ({
    value: item._id,
    label: item.name,
  }));

  const onsubmit: SubmitHandler<FieldValues> = async (data) => {
    // console.log("data", Number(data.name) - 1);

    const toastId = toast.loading("creating .....");

    const orderData = {
      email: data.email,

      product: data?.product,

      quantity: data?.quantity,

      totalPrice: data?.quantity,
    };
    try {
      const res = (await createOrder(orderData)) as TResponse<any>;
      console.log(res);
      if (res?.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("order create successfully", { id: toastId });
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
              <PHInput label="Email" type="text" name="email" />
            </Col>
            <Col
              span={24}
              md={{ span: 12 }}
              lg={{ span: 12 }}
              style={{ padding: "0px 3px" }}
            >
              <BSSelect
                label="Product"
                name="product"
                options={productOptions}
              />
            </Col>
            <Col
              span={24}
              md={{ span: 12 }}
              lg={{ span: 12 }}
              style={{ padding: "0px 3px" }}
            >
              <PHInput label="Quantity" type="text" name="quantity" />
            </Col>
          </Row>

          <Row>
            <Col
              span={24}
              md={{ span: 12 }}
              lg={{ span: 12 }}
              style={{ padding: "0px 3px" }}
            >
              <PHInput label="Total Price" type="text" name="totalPrice" />
            </Col>
            <Col
              span={24}
              md={{ span: 12 }}
              lg={{ span: 12 }}
              style={{ padding: "0px 3px" }}
            >
              <PHInput label="Quantity" type="text" name="quantity" />
            </Col>
          </Row>

          <Button
            type="primary"
            htmlType="submit"
            style={{ marginLeft: "3px" }}
          >
            Submit
          </Button>
        </PHForm>
      </Col>
    </Row>
  );
};

export default CreateOrder;
