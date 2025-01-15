import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import { useSPMV, useTsv } from "../hooks/useComfort";
import { useConsumption } from "../hooks/useConsumption";
import LineChart from "../components/LineChart";
import { Table } from "react-bootstrap";
import RecommendationTable from "../components/RecommendationTable";
import DataDisplayCard from "../components/cards/DataDisplayCard";

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
        <Row data-masonry='{"percentPosition": true }'>
          <Col lg={6}>
            <DataDisplayCard
              title="Thermal sensation vote"
              classCard="mb-3"
              classCardBody="p-4">
              <LineChart inputChartData={tsvChartData} dataLength={1} />
            </DataDisplayCard>

            <DataDisplayCard title="SPMV" classCard="mb-3" classCardBody="p-4">
              <LineChart inputChartData={spmvChartData} dataLength={1} />
            </DataDisplayCard>
          </Col>

          <Col lg={6}>
            <DataDisplayCard
              title="Recommendation"
              classCard="mb-3"
              classCardBody="p-4">
              <RecommendationTable />
              {/* <p>test</p> */}
            </DataDisplayCard>
            <DataDisplayCard
              title="Consumption"
              classCard="mb-3"
              classCardBody="p-4">
              <LineChart inputChartData={consumptionChartData} dataLength={1} />
            </DataDisplayCard>
          </Col>
        </Row>
      </Container>
    </>
  );
};
