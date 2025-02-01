import { Footer } from "antd/es/layout/layout";
import Banner from "../../../components/ui/banner/Banner";
import Features from "../../../components/ui/featurs/Features";
import Testimonial from "../../../components/ui/tesmonial/Testmonial";

const Home = () => {
  return (
    <div>
      <h1>I am from Home</h1>
      <Banner />
      <Features />
      <Testimonial />
      <Footer />
    </div>
  );
};

export default Home;
