import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import { useSPMV, useTsv } from "../hooks/useComfort";
import { useConsumption } from "../hooks/useConsumption";
import LineChart from "../components/LineChart";
import { Table } from "react-bootstrap";
import RecommendationTable from "../components/RecommendationTable";

export const Dashboard = () => {
  const {
    data: tsvData,
    isPending: tsvPending,
    isFetching: tsvFetching,
  } = useTsv();

  const {
    data: spmvData,
    isPending: spmvPending,
    isFetching: spmvFetching,
  } = useSPMV();

  const {
    data: consumptionData,
    isPending: consumptionPending,
    isFetching: consumptionFetching,
  } = useConsumption();

  const loadingTsv = tsvPending || tsvFetching;
  const loadingSpmv = spmvPending || spmvFetching;
  const loadingConsumption = consumptionPending || consumptionFetching;

  const loading = loadingTsv || loadingSpmv || loadingConsumption;

  const tsvChartData = tsvData && {
    labels: tsvData.map((record) => record.date),
    datasets: [
      {
        label: `TSV`,
        data: tsvData.map((record) => record.tsv),
        fill: true,
        backgroundColor: "rgba(54,162,235,0.5)",
        borderColor: "rgba(54,162,235,1)",
      },
    ],
  };

  const spmvChartData = spmvData && {
    labels: spmvData.map((record) => record.date),
    datasets: [
      {
        label: `SPMV`,
        data: spmvData.map((record) => record.sPMV),
        fill: true,
        backgroundColor: "rgba(54,162,235,0.5)",
        borderColor: "rgba(54,162,235,1)",
      },
    ],
  };

  const consumptionChartData = consumptionData && {
    labels: consumptionData.map((record) => record.date),
    datasets: [
      {
        label: `CONSUMPTION`,
        data: consumptionData.map((record) => record.consumption),
        fill: true,
        backgroundColor: "rgba(54,162,235,0.5)",
        borderColor: "rgba(54,162,235,1)",
      },
    ],
  };

  return (
    <>
      <Container className="py-2">
        <Row>
          <Col>
            <h4>DASHBOARD</h4>
          </Col>
        </Row>
        <Row>
          <Col lg={6}>
            <LineChart inputChartData={tsvChartData} dataLength={1} />
          </Col>
          <Col lg={6}>
            <LineChart inputChartData={spmvChartData} dataLength={1} />
          </Col>
          <Col lg={6}>
            <LineChart inputChartData={consumptionChartData} dataLength={1} />
          </Col>
          <Col lg={6}>
            <RecommendationTable />
          </Col>
        </Row>
      </Container>
    </>
  );
};
