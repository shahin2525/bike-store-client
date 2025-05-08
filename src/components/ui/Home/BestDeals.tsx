// Components/SpecialOffers.tsx
import { Carousel, Card, Typography, Tag } from "antd";

const offers = [
  {
    title: "Summer Sale",
    discount: "30% OFF",
    description: "All mountain bikes this weekend",
    image: "/summer-sale.jpg",
    tagColor: "red",
  },
  {
    title: "E-Bike Special",
    discount: "Free Accessories",
    description: "With every electric bike purchase",
    image: "/ebike-offer.jpg",
    tagColor: "green",
  },
];

export default function SpecialOffers() {
  return (
    <section style={{ padding: "0 0" }}>
      <Typography.Title
        level={2}
        style={{ textAlign: "center", marginBottom: "20px" }}
      >
        Hot Deals & Special Offers
      </Typography.Title>
      <Carousel autoplay style={{ maxWidth: 800, margin: "0 auto" }}>
        {offers.map((offer) => (
          <div key={offer.title}>
            <Card
              cover={<img alt={offer.title} src={offer.image} height={300} />}
              style={{ textAlign: "center" }}
            >
              <Tag color={offer.tagColor} style={{ fontSize: 18 }}>
                {offer.discount}
              </Tag>
              <Typography.Title level={3}>{offer.title}</Typography.Title>
              <Typography.Paragraph>{offer.description}</Typography.Paragraph>
            </Card>
          </div>
        ))}
      </Carousel>
    </section>
  );
}
