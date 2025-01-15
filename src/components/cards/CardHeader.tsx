import Card from "react-bootstrap/Card";

interface CardHeaderProps {
  title: string;
}
const CardHeader = ({ title }: CardHeaderProps) => {
  return (
    <Card.Header>
      <p className="m-0 fw-bold text-primary h4">{title}</p>
    </Card.Header>
  );
};

export default CardHeader;
