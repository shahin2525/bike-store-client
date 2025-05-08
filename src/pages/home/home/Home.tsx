import { Footer } from "antd/es/layout/layout";
import Banner from "../../../components/ui/banner/Banner";
import Features from "../../../components/ui/featurs/Features";
import Testimonial from "../../../components/ui/tesmonial/Testmonial";
import PopularCategories from "../../../components/ui/Home/PopularCategories";
import SpecialOffers from "../../../components/ui/Home/BestDeals";
import BikeServices from "../../../components/ui/Home/BikeServices";

const Home = () => {
  return (
    <>
      <Banner />
      <Features />
      <Testimonial />
      <PopularCategories />
      <SpecialOffers />
      <BikeServices />
      <Footer />
    </>
  );
};

export default Home;
