import { Card } from "antd";

const About = () => {
  return (
    <div
      className="max-w-7xl mx-auto px-4 py-12"
      style={{ padding: "5px 10px" }}
    >
      <div
        className="text-center mb-10 max-w-2xl"
        style={{ margin: "10px auto" }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          About Our Bike Shop
        </h2>
        <p className="text-gray-600 mt-3 mx-auto" style={{ marginTop: "10px" }}>
          Welcome to our premium bike shop, where we provide high-quality bikes
          for every type of rider. Whether you're a sports enthusiast, a daily
          commuter, or an adventure seeker, we have the perfect bike for you.
        </p>
      </div>

      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        style={{ marginTop: "20px" }}
      >
        <Card className="shadow-md rounded-lg">
          <h3 className="text-2xl font-semibold text-gray-700">Our Mission</h3>
          <p className="text-gray-600 mt-2">
            Our mission is to inspire and enable more people to experience the
            joy of cycling by providing high-quality, affordable, and
            eco-friendly bikes. We are committed to innovation, sustainability,
            and excellent customer service.
          </p>
        </Card>

        <Card className="shadow-md rounded-lg" style={{ paddingLeft: "10px" }}>
          <h3 className="text-2xl font-semibold text-gray-700">
            Why Choose Us?
          </h3>
          <ul className="list-disc ml-5 mt-2 text-gray-600 space-y-2">
            <li>Wide range of high-quality bikes</li>
            <li>Affordable pricing with flexible payment options</li>
            <li>Expert customer support and maintenance services</li>
            <li>Eco-friendly and sustainable bike models</li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default About;
