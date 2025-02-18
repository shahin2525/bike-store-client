import { Carousel } from "antd";
import img1 from "../../../assets/images/ca1.jpg";
import img2 from "../../../assets/images/ca2.jpg";
import img3 from "../../../assets/images/ca3.jpg";
import img4 from "../../../assets/images/ca4.jpg";
import "./Carousel.style.css";

const Banner = () => {
  const images = [img1, img2, img3, img4];
  const texts = [
    {
      left: "Top Motorbikes of the Year!",
      center: "First Milage",
      right: "Best Collected",
    },
    {
      left: "Rev Up Your Ride",
      center: "Speed, Style, and Power",
      right: "Unleash the Beast",
    },
    {
      left: "Left Text 3",
      center: "Selling Motorbikes!",
      right: "Electric vs. Gas",
    },
    {
      left: "The Evolution of Motorbikes!",
      center: "A Rider’s Guide!",
      right: "Super Power",
    },
  ];
  return (
    <>
      <Carousel autoplay>
        {images.map((image, index) => (
          <div key={index} className="slide">
            {" "}
            {/* Use a class name */}
            <img src={image} alt={`carousel${index + 1}`} />
            <div className="text-overlay">
              <div className="left-text">{texts[index].left}</div>
              <div className="center-text">{texts[index].center}</div>
              <div className="right-text">{texts[index].right}</div>
            </div>
          </div>
        ))}
      </Carousel>
    </>
  );
};

export default Banner;
