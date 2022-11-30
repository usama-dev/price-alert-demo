import { useQuery } from "@tanstack/react-query";
import { useState, useRef } from "react";
import { useParams } from "react-router";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { Toast } from "primereact/toast";

import SpinnerComponent from "../components/Spinner";

const ProductDetailComponent = () => {
  const { id } = useParams();
  const toast = useRef(null);

  // For modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // For form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // On form submit
  const onSubmit = async (data) => {
    data.product_id = id;
    console.log(data);

    try {
      let result = await (
        await fetch(`${import.meta.env.VITE_API_BASE_URL}/user`, {
          method: "POST",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...data }),
        })
      ).text();
      console.log(result);

      toast.current.show({
        severity: "success",
        summary: "Successfully Subscribed!",
      });
    } catch (err) {
      console.log(err);
      toast.current.show({
        severity: "error",
        summary: err.message,
      });
    }
  };

  let { isLoading, error, data } = useQuery(
    ["productDetail"],
    async () =>
      await (
        await fetch(`${import.meta.env.VITE_API_BASE_URL}/product?_id=${id}`)
      ).json()
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
        <Toast ref={toast} />
        <Container>
          <h1 className="text-center p-4">Product Detail Page</h1>
          <Row>
            <Col sm={8}>
              <Image src={data.img_url} style={{ maxWidth: "inherit" }}></Image>
            </Col>
            <Col sm={4}>
              <h1>{data.name}</h1>
              <h4>${data.price}</h4>
              <div className="d-grid gap-2">
                <Button variant="success" onClick={handleShow}>
                  Get Price Alerts for this Product!
                </Button>
              </div>
            </Col>
          </Row>
          {/* This following model can be extracted into a seperate component by figuring out the state management for it  */}
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Price Alerts</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Container>
                <div className="mb-3">
                  You will get price alerts whenever the price for this product
                  falls $1 or more!
                </div>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="John Doe"
                    {...register("name")}
                  />
                  <Form.Label className="mt-2">Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="name@example.com"
                    {...register("email")}
                  />
                  {/* errors will return when field validation fails  */}
                  {errors.exampleRequired && <p>This field is required</p>}
                  <div className="d-grid gap-2 mt-2">
                    <Button
                      variant="primary"
                      type="submit"
                      onClick={handleClose}
                    >
                      Submit
                    </Button>
                  </div>
                </Form>
              </Container>
            </Modal.Body>
          </Modal>
        </Container>
      </div>
    );
  }
};

export default ProductDetailComponent;
