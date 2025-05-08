import { Button } from "antd";
import { useGetAllBikeQuery } from "../../../redux/feature/bike/bikApi";
import { TBike } from "../../../types/bike.type";
import FeatureCard from "./FeatureCard";
import { Link } from "react-router-dom";

const Features = () => {
  const { data, isLoading, isFetching } = useGetAllBikeQuery(undefined);
  // console.log(data?.data?.slice(0, 6));

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
    <div style={{ marginTop: "40px", padding: "0px 10px 0px 15px" }}>
      {/* <Row  gutter={4}>
        {data?.data?.map((bike: TBike) => (
          <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
            <FeatureCard key={bike._id} bike={bike}></FeatureCard>
          </Col>
        ))}
      </Row> */}
      <h1
        style={{ marginBottom: "20px" }}
        className="text-center text-3xl font-bold"
      >
        Features BIkes
      </h1>
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-2"
        style={{ marginTop: "12px" }}
      >
        {data?.data?.slice(0, 6)?.map((bike: TBike) => (
          <FeatureCard key={bike._id} bike={bike}></FeatureCard>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button type="primary" style={{ margin: "14px" }}>
          <Link to="all-products"> View All</Link>
        </Button>
      </div>
    </div>
  );
};

export default Features;
