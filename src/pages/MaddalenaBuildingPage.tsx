import { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import LineChart from "../components/charts/LineChart";
import RecommendationTable from "../components/RecommendationTable";
import DataDisplayCard from "../components/cards/DataDisplayCard";
import { CustomSelect } from "../components/CustomSelect";
import CircularProgress from "../components/CircularProgress";

import { useCo2 } from "../hooks/useCo2";
import { useRecommendation, useSPMV } from "../hooks/useComfort";
import {
  useFlexiblityHeatingForecast,
  useTodaysEnergy,
} from "../hooks/useEnergy";

import { BUILDING, MADDALENA_HOUSE } from "../utils/buildings";

import { FlexibilityHeating, Option } from "../api/models";
import { formatDate } from "../utils/dateUtils";

import LineChartCo2 from "../components/charts/LineChartCo2";
import ServiceDModule from "../components/ServiceDModule";

export const MaddalenaBuildingPage = () => {
  const [selectedApartment, setSelectedApartment] = useState<string | null>(
    null
  );

  const {
    data: co2Data,
    isPending: co2Pending,
    isFetching: co2Fetching,
  } = useCo2(MADDALENA_HOUSE, selectedApartment || "");

  const {
    data: spmvData,
    isPending: spmvPending,
    isFetching: spmvFetching,
  } = useSPMV(MADDALENA_HOUSE, selectedApartment || "");

  const {
    data: flexHeatingData,
    isPending: flexHeatingPending,
    isFetching: flexHeatingFetching,
  } = useFlexiblityHeatingForecast(MADDALENA_HOUSE, selectedApartment || "");
  const {
    data: energyData,
    isPending: energyPending,
    isFetching: energyFetching,
  } = useTodaysEnergy(MADDALENA_HOUSE, selectedApartment || "");

  const {
    data: recommendationData,
    isPending: recommendationPending,
    isFetching: recommendationFetching,
  } = useRecommendation(MADDALENA_HOUSE, selectedApartment || "");

  const loadingCo2 = co2Pending || co2Fetching;
  const loadingSpmv = spmvPending || spmvFetching;
  const loadingRecommendation = recommendationPending || recommendationFetching;
  const loadingFlexHeating = flexHeatingPending || flexHeatingFetching;
  const loadingEnergy = energyPending || energyFetching;

  const isLoading =
    loadingCo2 || loadingSpmv || loadingRecommendation || loadingFlexHeating || loadingEnergy;

  const co2ChartData = co2Data && {
    labels: co2Data.map((record) => record.time),
    datasets: [
      {
        label: "Co2 (ppm)",
        data: co2Data.map((record) =>
          record?.value?.toFixed(2)
        ),
        fill: true,
        borderColor: "rgba(111, 230, 0, 1)",
        backgroundColor: "rgba(0, 230, 77, 0.3)",
        yAxisID: "y", // asse principale per CO2
      }
    ],
  };
  const spmvChartData = spmvData && {
    labels: spmvData.map((record) => record.time),
    datasets: [
      {
        label: "sPMV",
        data: spmvData.map((record) =>
          record.forecastedSPmv.toFixed(2)
        ),
        fill: true,
        borderColor: "rgba(0, 72, 230, 1)",
        backgroundColor: "rgba(0, 72, 230, 0.3)",
        yAxisID: "y", // asse principale per sPMV
      },
    {
        label: "Outdoor Temperature (°C)",
        data: spmvData.map((record) =>
          record.forecastedTemp.toFixed(1)
        ),
        fill: false,
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.3)",
        borderDash: [4, 4],
        yAxisID: "y1",
      },
      {
        label: "Indoor Temperature (°C)",
        data: spmvData.map((record) =>
          record.internalTemp?.toFixed(1)
        ),
        fill: false,
        borderColor: "rgba(99, 255, 169, 1)",
        backgroundColor: "rgba(5, 154, 47, 0.3)",
        borderDash: [4, 4],
        yAxisID: "y1",
      },
    ],
  };
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
      //{
      //  label: `Flexibility Above`,
      //  data:
      //    flexHeatingData?.map((record) =>
      //      Number(record?.flexibilityAbove).toFixed(2)
      //    ) ?? [],
      //  fill: false,
      //  borderDash: [2, 6],
      //  borderColor: "rgba(40, 167, 69, 0.7)",
      //},
      //{
      //  label: `Flexibility Below `,
      //  data:
      //    flexHeatingData?.map((record) =>
      //      Number(record?.flexibilityBelow).toFixed(2)
      //    ) ?? [],
      //  fill: false,
      //  borderDash: [4, 4],
      //  borderColor: "rgba(140, 215, 144, 0.7)",
      //},
      {
        label: `S1 Consumption`,
        data: flexHeatingData?.map((record) =>
          record?.expectedEnergyConsumptionS1 != null
            ? Number(record.expectedEnergyConsumptionS1).toFixed(2)
            : null
        ) ?? [],
        fill: false,
        borderDash: [4, 4],
        borderColor: "rgba(140, 215, 144, 0.7)",
      },
      {
        label: `S2 Consumption`,
        data: flexHeatingData?.map((record) =>
          record?.expectedEnergyConsumptionS2 != null
            ? Number(record.expectedEnergyConsumptionS2).toFixed(2)
            : null
        ) ?? [],
        fill: false,
        borderDash: [4, 4],
        borderColor: "rgba(182, 140, 215, 0.7)",
      },
      {
        label: `S3 Consumption`,
        data: flexHeatingData?.map((record) =>
          record?.expectedEnergyConsumptionS3 != null
            ? Number(record.expectedEnergyConsumptionS3).toFixed(2)
            : null
        ) ?? [],
        fill: false,
        borderDash: [4, 4],
        borderColor: "rgba(255, 59, 59, 0.7)",
      },
    ],
  };

  const apartmentOptions = BUILDING["maddalenaHouse"].map((apartment) => ({
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
                onChange={(selectedOption: Option | null) =>
                  setSelectedApartment(selectedOption?.value || null)
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
            <DataDisplayCard
              title="Air Quality"
              classCard="mb-3"
              classCardBody="p-2"
            >
              <LineChartCo2
                inputChartData={co2ChartData}
                dataLength={1}
                //minLabelValue={-3}
                //maxLabelValue={3}
                baselineValue={550}
                minRecommended={800}
                maxRecommended={1350}
              />
            </DataDisplayCard>
          </Col>

          <Col lg={5}>
            <DataDisplayCard
              title="Recommendation"
              classCard="mb-3"
              classCardBody="p-2"
            >
              <RecommendationTable data={recommendationData ?? []} />
              {/* <p>test</p> */}
            </DataDisplayCard>
            <ServiceDModule />
          </Col>
        </Row>
      </Container>
    </>
  );
};
