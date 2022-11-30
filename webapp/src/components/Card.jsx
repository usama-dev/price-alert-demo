import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

const CardComponent = ({ props }) => {
  // console.log(props);
  return (
    <Link
      key={props._id}
      to={`/product/${props._id}`}
      style={{ color: "inherit", textDecoration: "inherit" }}
    >
      <Card>
        <Card.Img variant="top" src={props.img_url} />
        <Card.Body>
          <Card.Title>{props.name}</Card.Title>
          <Card.Text>${props.price}</Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default CardComponent;
