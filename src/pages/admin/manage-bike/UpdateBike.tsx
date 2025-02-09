import { Button, Col, Row } from "antd";
import PHForm from "../../../components/form/BSForm";
import PHInput from "../../../components/form/BSInput";
import BSSelect from "../../../components/form/BSSelect";
import {
  bikeCategoriesOptions,
  bikeModelOptions,
  brandsOptions,
} from "../../../constants/global.const";

const UpdateBike = () => {
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

export default UpdateBike;
