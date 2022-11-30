import Row from "react-bootstrap/Row";
import { useForm } from "react-hook-form";
import { Toast } from "primereact/toast";
import { useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import CardComponent from "../components/Card";

const SubscribedProductsComponent = () => {
  const [items, setItems] = useState([]);
  console.log(items);
  const toast = useRef(null);

  // For form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // On email submit
  const onSubmit = async (data) => {
    console.log(data);
    let email = data.email;

    if (email) {
      try {
        let result = await (
          await fetch(
            `${import.meta.env.VITE_API_BASE_URL}/user?email=${email}`
          )
        ).json();

        // console.log(result);
        setItems([...result.subscribedProducts]);
      } catch (err) {
        console.log(err);
        toast.current.show({
          severity: "error",
          summary: err.message,
        });
      }
    } else setItems([]); // Set to empty state
  };

  return (
    <div className="product-div">
      <Toast ref={toast} />
      <h1 className="text-center p-4 mb-4">Subscribed Products of Users</h1>
      <h5>Please enter your email address to get all subscribed products:</h5>
      <Form onSubmit={handleSubmit(onSubmit)} className="mb-5">
        {/* <Form.Label className="mt-2">Email address</Form.Label> */}
        <Form.Control
          type="email"
          placeholder="name@example.com"
          {...register("email")}
        />
        {/* errors will return when field validation fails  */}
        {errors.exampleRequired && <p>This field is required</p>}
        <div className="d-grid gap-2 mt-2">
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </div>
      </Form>
      {!items.length ? (
        <h5 className="">No Products..</h5>
      ) : (
        <Row xs={1} md={4} className="g-4">
          {items.map((el) => (
            <CardComponent key={el._id} props={{ ...el }} />
          ))}
        </Row>
      )}
    </div>
  );
};

export default SubscribedProductsComponent;
