import { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import LineChart from "../components/charts/LineChart";
import RecommendationTable from "../components/RecommendationTable";
import DataDisplayCard from "../components/cards/DataDisplayCard";
import { CustomSelect } from "../components/CustomSelect";

import { useConsumption } from "../hooks/useConsumption";
import { useRecommendation, useSPMV, useTsv } from "../hooks/useComfort";

import { BUILDING, MADDALENA_HOUSE } from "../utils/buildings";
import CircularProgress from "../components/CircularProgress";

export const MaddalenaBuildingPage = () => {
  const [selectedApartment, setSelectedApartment] = useState(null);
  // const {
  //   data: tsvData,
  //   isPending: tsvPending,
  //   isFetching: tsvFetching,
  // } = useTsv();

  const {
    data: spmvData,
    isPending: spmvPending,
    isFetching: spmvFetching,
  } = useSPMV(MADDALENA_HOUSE, selectedApartment);

  const {
    data: consumptionData,
    isPending: consumptionPending,
    isFetching: consumptionFetching,
  } = useConsumption();

  const {
    data: recommendationData,
    isPending: recommendationPending,
    isFetching: recommendationFetching,
  } = useRecommendation(MADDALENA_HOUSE, selectedApartment);

  // const loadingTsv = tsvPending || tsvFetching;
  const loadingSpmv = spmvPending || spmvFetching;
  const loadingRecommendation = recommendationPending || recommendationFetching;
  // const loadingConsumption = consumptionPending || consumptionFetching;

  const isLoading = loadingSpmv || loadingRecommendation;
  // || loadingConsumption loadingTsv ||;

  // const tsvChartData = tsvData && {
  //   labels: tsvData.map((record) => record.date),
  //   datasets: [
  //     {
  //       label: `TSV`,
  //       data: tsvData.map((record) => record.tsv),
  //       fill: true,
  //       backgroundColor: "rgb(255, 190, 0)",
  //       borderColor: "rgb(255, 190, 0)",
  //     },
  //   ],
  // };

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

  const apartmentOptions = BUILDING["maddalena_house"].map((apartment) => ({
    value: apartment,
    label: apartment,
  }));

  useEffect(() => {
    setSelectedApartment(apartmentOptions?.[0].value || "");
  }, []);
  return (
    <>
      <Container className="py-2">
        <Row>
          <Col>
            <h4>MADDALENA</h4>
          </Col>
          <Col>{isLoading && <CircularProgress />}</Col>

          <Row>
            <Col lg={4} className="pb-2">
              <CustomSelect
                options={apartmentOptions}
                value={{
                  value: selectedApartment ?? "",
                  label: selectedApartment ?? "",
                }}
                onChange={(e: Record<string, string>) =>
                  setSelectedApartment(e.value || null)
                }
                placeholderText=""
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
              classCardBody="p-2"
            >
              <LineChart inputChartData={spmvChartData} dataLength={1} />
            </DataDisplayCard>
            <DataDisplayCard
              title="Consumption"
              classCard="mb-3"
              classCardBody="p-2"
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
              classCardBody="p-2"
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
