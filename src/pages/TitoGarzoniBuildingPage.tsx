import { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import LineChart from "../components/charts/LineChart";
import RecommendationTable from "../components/RecommendationTable";
import DataDisplayCard from "../components/cards/DataDisplayCard";
import { CustomSelect } from "../components/CustomSelect";
import CircularProgress from "../components/CircularProgress";

import { useRecommendation, useSPMV } from "../hooks/useComfort";

import { BUILDING, TITO_GARZONI_HOUSE } from "../utils/buildings";

import { FlexibilityHeating, Option } from "../api/models";
import {
  useFlexiblityHeatingForecast,
  useTodaysEnergy,
} from "../hooks/useEnergy";
import { formatDate } from "../utils/dateUtils";

export const TitoGarzoniBuildingPage = () => {
  const [selectedApartment, setSelectedApartment] = useState<string | null>(
    null
  );

  const {
    data: spmvData,
    isPending: spmvPending,
    isFetching: spmvFetching,
  } = useSPMV(TITO_GARZONI_HOUSE, selectedApartment || "");

  const {
    data: flexHeatingData,
    isPending: flexHeatingPending,
    isFetching: flexHeatingFetching,
  } = useFlexiblityHeatingForecast(TITO_GARZONI_HOUSE, selectedApartment || "");
  const {
    data: energyData,
    isPending: energyPending,
    isFetching: energyFetching,
  } = useTodaysEnergy(TITO_GARZONI_HOUSE, selectedApartment || "");

  const {
    data: recommendationData,
    isPending: recommendationPending,
    isFetching: recommendationFetching,
  } = useRecommendation(TITO_GARZONI_HOUSE, selectedApartment || "");

  const loadingSpmv = spmvPending || spmvFetching;
  const loadingRecommendation = recommendationPending || recommendationFetching;
  const loadingFlexHeating = flexHeatingPending || flexHeatingFetching;
  const loadingEnergy = energyPending || energyFetching;

  const isLoading =
    loadingSpmv || loadingRecommendation || loadingFlexHeating || loadingEnergy;

  const spmvChartData = spmvData
    ? {
        labels: spmvData?.map((record) => formatDate(record.time)),
        datasets: [
          {
            label: `SPMV`,
            data: spmvData?.map((record) => record.forecastedSPmv.toFixed(2)),
            fill: true,
            borderColor: "rgba(0, 72, 230, 1)",
            backgroundColor: "rgba(0, 72, 230, 0.5)",
          },
        ],
      }
    : undefined;

  const flexHeatingChartData = flexHeatingData && {
    labels: flexHeatingData?.map((record) => formatDate(record.time)),
    datasets: [
      {
        label: `Baseline`,
        data:
          flexHeatingData?.map((record: FlexibilityHeating) =>
            Number(record?.baseline).toFixed(2)
          ) ?? [],
        backgroundColor: "rgba(0, 72, 230, 0.5)",
        borderColor: "rgba(0, 72, 230, 0.8)",
      },
      {
        label: `Average Energy`,
        data:
          energyData?.energyA?.map((record) =>
            Number(record.value).toFixed(2)
          ) ?? [],
        backgroundColor: "rgba(255, 190, 0, 0.5)",
        borderColor: "rgba(255, 190, 0, 1)",
      },
      {
        label: `Flexibility Above`,
        data:
          flexHeatingData?.map((record) =>
            Number(record?.flexibilityAbove).toFixed(2)
          ) ?? [],
        fill: false,
        borderDash: [2, 6],
        borderColor: "rgba(40, 167, 69, 0.7)",
      },
      {
        label: `Flexibility Below `,
        data:
          flexHeatingData?.map((record) =>
            Number(record?.flexibilityBelow).toFixed(2)
          ) ?? [],
        fill: false,
        borderDash: [4, 4],
        borderColor: "rgba(140, 215, 144, 0.7)",
      },
    ],
  };

  const apartmentOptions = BUILDING["titoGarzoniHouse"].map((apartment) => ({
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
            <h4>TITO GARZONI</h4>
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
                onChange={(e: Option | null) =>
                  setSelectedApartment(e?.value || null)
                }
                placeholderText=""
              />
            </Col>
          </Row>
        </Row>

        <Row data-masonry='{"percentPosition": true }'>
          <Col lg={7}>
            <DataDisplayCard
              title="Energy Flexibility Heating"
              classCard="mb-3"
              classCardBody="p-2"
            >
              <LineChart
                inputChartData={flexHeatingChartData}
                dataLength={1}
                unit="kWh"
              />
            </DataDisplayCard>

            <DataDisplayCard
              title="sPMV Prediction"
              classCard="mb-3"
              classCardBody="p-2"
            >
              <LineChart
                inputChartData={spmvChartData}
                dataLength={1}
                minLabelValue={-3}
                maxLabelValue={3}
              />
            </DataDisplayCard>
          </Col>

          <Col lg={5}>
            <DataDisplayCard
              title="Recommendation"
              classCard="mb-3"
              classCardBody="p-2"
            >
              <RecommendationTable data={recommendationData} />
            </DataDisplayCard>
          </Col>
        </Row>
      </Container>
    </>
  );
};
