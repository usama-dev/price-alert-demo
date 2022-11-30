import Spinner from "react-bootstrap/Spinner";

const SpinnerComponent = ({ props }) => {
  console.log(props);
  return (
    <div style={{ height: "100%" }}>
      <Spinner
        animation="border"
        role="status"
        style={{
          position: "fixed",
          left: "50%",
          top: "50%",
        }}
      >
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
};

export default SpinnerComponent;
