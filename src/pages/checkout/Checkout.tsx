import { useParams } from "react-router-dom";

const Checkout = () => {
  const param = useParams();
  console.log(param);
  return (
    <div>
      <h1> i am from Checkout</h1>
    </div>
  );
};

export default Checkout;
