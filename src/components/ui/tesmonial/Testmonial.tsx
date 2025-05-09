import { Card, Typography } from "antd";
import React from "react";
import img1 from "../../../assets/images/h1.jpg";
import img2 from "../../../assets/images/h2.jpg";
import img3 from "../../../assets/images/h3.jpg";
import img4 from "../../../assets/images/h4.jpg";

const { Title, Text } = Typography;

interface TestimonialItem {
  id: number;
  quote: string;
  name: string;
  location: string;
  image: string;
}

const Testimonial: React.FC = () => {
  const testimonials: TestimonialItem[] = [
    {
      id: 1,
      quote:
        "I absolutely love this product! It's exactly what I was looking for and it works perfectly. The quality is excellent and the price is fair.",
      name: "Distinctio Animi",
      location: "Liverpool, UK",
      image: img1,
    },
    {
      id: 2,
      quote:
        "The customer service representative was incredibly helpful. They answered all my questions patiently and resolved my issue quickly and efficiently. I was really impressed.",
      name: "Distinctio Animi",
      location: "Cape Town, South Africa",
      image: img2,
    },
    {
      id: 3,
      quote:
        "My experience with your company has been fantastic. From the initial purchase to the delivery, everything went smoothly. I would definitely recommend you to others.",
      name: "Distinctio Animi",
      location: "Blumberg, Germany",
      image: img3,
    },
    {
      id: 4,
      quote:
        "The new feature you added to the app is amazing! It makes the whole process so much easier. Thank you for listening to your customers.",
      name: "Distinctio Animi",
      location: "Seoul, South Korea",
      image: img4,
    },
  ];

  return (
    <div
      style={{ padding: "40px 15px" }}
      className="bg-white dark:bg-gray-800 py-12 px-4"
    >
      <div className="max-w-7xl mx-auto">
        <Title
          level={2}
          style={{ paddingBottom: "10px" }}
          className="text-center mb-12 dark:text-white"
        >
          What our customers are saying about us
        </Title>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.id}
              className="h-full flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white"
              style={{ padding: 0 }}
              hoverable
            >
              <div className="p-6 bg-white flex-grow">
                <div className="relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    fill="currentColor"
                    className="w-6 h-6 text-gray-500"
                  >
                    <path d="M232,246.857V16H16V416H54.4ZM48,48H200V233.143L48,377.905Z"></path>
                    <path d="M280,416h38.4L496,246.857V16H280ZM312,48H464V233.143L312,377.905Z"></path>
                  </svg>
                  <Text className="block italic text-gray-800 mt-2">
                    {testimonial.quote}
                  </Text>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    fill="currentColor"
                    className="absolute right-0 bottom-0 w-6 h-6 text-gray-500"
                  >
                    <path d="M280,185.143V416H496V16H457.6ZM464,384H312V198.857L464,54.1Z"></path>
                    <path d="M232,16H193.6L16,185.143V416H232ZM200,384H48V198.857L200,54.1Z"></path>
                  </svg>
                </div>
              </div>
              <div
                className=" text-center"
                style={{
                  marginBottom: "0px",
                  paddingBottom: "0px",
                  backgroundColor: "#09122C",
                  color: "white",
                }}
              >
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 mb-3 -mt-12 mx-auto rounded-full border-4 border-white object-cover"
                />
                <Title level={4} className="mb-1" style={{ color: "white" }}>
                  {testimonial.name}
                </Title>
                <Text className="uppercase text-xs" style={{ color: "white" }}>
                  {testimonial.location}
                </Text>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
