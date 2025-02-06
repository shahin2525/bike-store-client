import { Col, Row } from "antd";
import { useGetAllBikeQuery } from "../../../redux/feature/bike/bikApi";
import { TBike } from "../../../types/bike.type";
import FeatureCard from "./FeatureCard";

const Features = () => {
  const { data, isLoading, isFetching } = useGetAllBikeQuery(undefined);

  if (isFetching) {
    return (
      <p style={{ color: "red", fontSize: "18px", textAlign: "center" }}>
        data is fetching
      </p>
    );
  }
  if (isLoading) {
    <p style={{ color: "red", fontSize: "18px", textAlign: "center" }}>
      ...Loading
    </p>;
  }
  return (
    <Col>
      {/* <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
        {data?.data?.map((bike: TBike) => (
          <FeatureCard key={bike._id} bike={bike}></FeatureCard>
        ))}
      </Col> */}
      <Row gutter={4}>
        {data?.data?.slice(0, 6).map((bike: TBike) => (
          <Col
            key={bike._id}
            xs={24} // 1 card per row on small screens
            sm={12} // 2 cards per row on medium screens
            lg={8} // 3 cards per row on large screens
          >
            <FeatureCard bike={bike} />
          </Col>
        ))}
      </Row>
    </Col>
  );
};

export default Features;
