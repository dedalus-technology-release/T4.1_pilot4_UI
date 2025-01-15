import Card from "react-bootstrap/Card";

import { ReactNode } from "react";
import CardHeader from "./CardHeader";

interface DataDisplayCardProps {
  title: string;
  children: ReactNode;
  classCard?: string;
  classCardBody?: string;
}

const DataDisplayCard = ({
  title,
  children,
  classCard,
  classCardBody,
}: DataDisplayCardProps) => {
  return (
    <Card className={`shadow ${classCard}`}>
      <CardHeader title={title} />
      <Card.Body className={classCardBody}>{children}</Card.Body>
    </Card>
  );
};

export default DataDisplayCard;
