import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import { useRecommendation, useSPMV, useTsv } from "../hooks/useComfort";
import { useConsumption } from "../hooks/useConsumption";
import LineChart from "../components/charts/LineChart";
import { Table } from "react-bootstrap";
import RecommendationTable from "../components/RecommendationTable";
import DataDisplayCard from "../components/cards/DataDisplayCard";
import BarChart from "../components/charts/BarChart";
import { CustomSelect } from "../components/CustomSelect";
import { BUILDING, TITO_GARZONI_HOUSE } from "../utils/buildings";
import { useState } from "react";

export const TitoGarzoniBuildingPage = () => {
  const [selectedApartment, setSelectedApartment] = useState(null);
  const {
    data: tsvData,
    isPending: tsvPending,
    isFetching: tsvFetching,
  } = useTsv();

  const {
    data: spmvData,
    isPending: spmvPending,
    isFetching: spmvFetching,
  } = useSPMV(TITO_GARZONI_HOUSE, selectedApartment);

  const {
    data: consumptionData,
    isPending: consumptionPending,
    isFetching: consumptionFetching,
  } = useConsumption();

  const {
    data: recommendationData,
    isPending: recommendationPending,
    isFetching: recommendationFetching,
  } = useRecommendation(TITO_GARZONI_HOUSE, selectedApartment);

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
        backgroundColor: "rgb(255, 190, 0)",
        borderColor: "rgb(255, 190, 0)",
      },
    ],
  };

  const spmvChartData = spmvData && {
    labels: spmvData?.map((record) => record.time),
    datasets: [
      {
        label: `SPMV`,
        data: spmvData?.map((record) => record.forecasted_sPMV.toFixed(2)),
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

  const apartmentOptions = BUILDING["tito_garzoni_house"].map((apartment) => ({
    value: apartment,
    label: apartment,
  }));

  return (
    <>
      <Container className="py-2">
        <Row>
          <Col>
            <h4>DASHBOARD</h4>
          </Col>

          <Row>
            <Col>
              <CustomSelect
                options={apartmentOptions}
                value={{
                  value: selectedApartment ?? "Select apartment",
                  label: selectedApartment ?? "Select apartment",
                }}
                onChange={(e: Record<string, string>) =>
                  setSelectedApartment(e.value || null)
                }
                placeholderText="Select apartment"
              />
            </Col>
          </Row>
        </Row>

        <Row data-masonry='{"percentPosition": true }'>
          <Col lg={6}>
            {/* <DataDisplayCard
              title="Thermal Sensation"
              classCard="mb-3"
              classCardBody="p-4">
              <BarChart inputChartData={tsvChartData} dataLength={1} />
            </DataDisplayCard> */}

            <DataDisplayCard
              title="sPMV Prediction"
              classCard="mb-3"
              classCardBody="p-4"
            >
              <LineChart inputChartData={spmvChartData} dataLength={1} />
            </DataDisplayCard>
            <DataDisplayCard
              title="Consumption"
              classCard="mb-3"
              classCardBody="p-4"
            >
              <LineChart
                inputChartData={consumptionChartData}
                dataLength={1}
                unit="kWh"
              />
            </DataDisplayCard>
          </Col>

          <Col lg={6}>
            <DataDisplayCard
              title="Recommendation"
              classCard="mb-3"
              classCardBody="p-4"
            >
              <RecommendationTable data={recommendationData} />
              {/* <p>test</p> */}
            </DataDisplayCard>
          </Col>
        </Row>
      </Container>
    </>
  );
};
