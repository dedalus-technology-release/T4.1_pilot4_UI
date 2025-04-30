import Spinner from "react-bootstrap/Spinner";

const CircularProgress = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: 0,
        left: 0,
        background: "rgba(255, 255, 255, 0.3)",
        height: "100%",
        width: "100%",
        zIndex: 10,
      }}
    >
      <Spinner
        animation="border"
        variant="primary"
        style={{ width: "4rem", height: "4rem" }}
      />
    </div>
  );
};

export default CircularProgress;
