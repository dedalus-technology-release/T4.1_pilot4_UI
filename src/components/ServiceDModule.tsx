import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";

import DataDisplayCard from "./cards/DataDisplayCard";

import { GreenJson, DamJson } from "../api/models";
import DualAxisChart from "./charts/DualAxisChart";

import { getGreen, getDam } from "../api/serviceD";
import CircularProgress from "./CircularProgress";

/**
 * format YYYY-MM-DD per input date e API
 */
const formatDateYYYYMMDD = (date: Date) => {
  return date.toISOString().split("T")[0];
};

export const ServiceDModule = () => {
  /**
   * =========================
   * STATE
   * =========================
   */
  const [selectedDate, setSelectedDate] = useState<string>(
    formatDateYYYYMMDD(new Date())
  );

  const [greenData, setGreenData] = useState<GreenJson[]>([]);
  const [damData, setDamData] = useState<DamJson[]>([]);
  const [loading, setLoading] = useState(false);

  const toApiDate = (isoDate: string) => isoDate.replace(/-/g, "");

  /**
   * =========================
   * FETCH DATI
   * =========================
   */
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        console.log("Fetching data for date:", selectedDate);

        const apiDate = toApiDate(selectedDate);

        const [green, dam] = await Promise.all([
          getGreen(apiDate, apiDate),
          getDam(apiDate, apiDate),
        ]);

        setGreenData(green);
        setDamData(dam);

        console.log("GREEN RAW", green.slice(0, 3));
        console.log("DAM RAW", dam.slice(0, 3));
      } catch (error) {
        console.error("Error fetching data:", error);
        setGreenData([]);
        setDamData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedDate]);

  /**
   * =========================
   * HANDLER INPUT DATA
   * =========================
   */
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  /**
   * =========================
   * FORMAT TITOLO
   * =========================
   */
  const formattedTitleDate = new Date(selectedDate).toLocaleDateString(
    "it-IT",
    {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }
  );

  return (
      <div>
          <DataDisplayCard
            title={`Service D - (${formattedTitleDate})`}
            classCard="mb-3"
            classCardBody="p-2"
          >
            <div className="mb-3">
              <Form.Label>Select Day</Form.Label>
              <Form.Control
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
              />
            </div>

            {loading && <CircularProgress />}

            {!loading &&
              greenData.length > 0 &&
              damData.length > 0 && (
                <div style={{ height: "30vh", position: "relative" }}>
                  <DualAxisChart
                    greenData={greenData}
                    damData={damData}
                  />
                </div>
              )}

            {!loading &&
              (greenData.length === 0 || damData.length === 0) && (
                <div>No data available for selected date</div>
              )}
          </DataDisplayCard>
        </div>
  );
};

export default ServiceDModule;