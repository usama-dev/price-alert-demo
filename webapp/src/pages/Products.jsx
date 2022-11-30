import { useQuery } from "@tanstack/react-query";
import Row from "react-bootstrap/Row";

import CardComponent from "../components/Card";
import SpinnerComponent from "../components/Spinner";

const ProductComponent = () => {
  let { isLoading, error, data } = useQuery(
    ["products"],
    async () =>
      await (await fetch(`${import.meta.env.VITE_API_BASE_URL}/product`)).json()
  );
  if (isLoading) {
    return <SpinnerComponent />;
  }
  if (error) {
    return <h2>Please try again!</h2>;
  }
  if (data) {
    return (
      <div className="product-div">
        <h1 className="text-center p-4">Products</h1>
        <Row xs={1} md={4} className="g-4">
          {data.map((el) => (
            <CardComponent key={el._id} props={{ ...el }} />
          ))}
        </Row>
      </div>
    );
  }
};

export default ProductComponent;
