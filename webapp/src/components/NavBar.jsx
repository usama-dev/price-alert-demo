import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";

function NavBarComponent() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Link to="/" className="pe-5" style={{ textDecoration: "none" }}>
            <Navbar.Brand className="fs-4">Home</Navbar.Brand>
          </Link>
          <Nav className="me-auto">
            <Link to="/products" className="navbar-nav nav-link">
              Products
            </Link>
            <Link to="/subscribedusers" className="navbar-nav nav-link">
              Subscribed Users
            </Link>
            <Link to="/subscribedproducts" className="navbar-nav nav-link">
              Subscribed Products
            </Link>
            <Link to="/admin" className="navbar-nav nav-link">
              Admin
            </Link>
          </Nav>
          <h5 className="justify-content-end text-light fs-3">
            Price Alert Demo
          </h5>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBarComponent;
