import Table from "react-bootstrap/Table";
import { WiThermometer, WiHumidity } from "react-icons/wi";
import { MdEnergySavingsLeaf } from "react-icons/md";
import { IoMdHappy } from "react-icons/io";

import { Recommendation } from "../api/models";

interface RecommendationTableProps {
  data: Recommendation[];
}

const solutionCondition: Record<string, string> = {
  S1: "Stay in comfort set",
  S2: "Minimize energy consumption without taking into account comfort set",
  S3: "Minimize energy consumption with an acceptable comfort set",
};

const RecommendationTable = ({ data }: RecommendationTableProps) => {

  console.log("DATA PASSED TO TABLE:", data);

  const dataWithCondition = data?.map((recomendation: Recommendation) => {
    return {
      // ...recomendation,
      solution: recomendation?.solution,
      condition: solutionCondition?.[recomendation?.solution],
      settings: [
        {
          setting: "Internal Temperature",
          value: recomendation?.t_r_min !== recomendation?.t_r_max
            ? `${recomendation?.t_r_min}°C - ${recomendation?.t_r_max}°C`
            : `${recomendation?.t_r_min}°C`,
          icon: <WiThermometer className="text-danger fs-3" />,
        },
        {
          setting: "Relative Humidity",
          value: recomendation?.rh_r_min !== recomendation?.rh_r_max
            ? `${recomendation?.rh_r_min}% - ${recomendation?.rh_r_max}%`
            : `${recomendation?.rh_r_min}%`,
          icon: <WiHumidity className="text-primary fs-3" />,
        },
        {
          setting: "Expected Comfort",
          value: recomendation?.comfortMin !== recomendation?.comfortMax
            ? `${recomendation?.comfortMin} - ${recomendation?.comfortMax}`
            : `${recomendation?.comfortMin}`,
          icon: <IoMdHappy className="text-success fs-3" />
        },
        {
          setting: "Energy Saving",
          value: recomendation?.energySavingWhMin !== recomendation?.energySavingWhMax
            ? `${recomendation?.energySavingWhMin}% - ${recomendation?.energySavingWhMax}%`
            : `${recomendation?.energySavingWhMin}%`,
          icon: <MdEnergySavingsLeaf className="text-warning fs-3" />,
        },
      ],
    };
  });

  return (
    <Table bordered>
      <thead className="sticky-top">
        <tr>
          <th>Condition</th>
          <th>Setting</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        {dataWithCondition?.length > 0 ? (
          dataWithCondition?.map((recommendation) =>
            recommendation.settings.map((setting, settingIndex) => (
              <tr key={settingIndex}>
                {settingIndex == 0 && (
                  <td rowSpan={4} style={{ maxWidth: "150px" }}>
                    <strong>{recommendation.condition} ({recommendation.solution})</strong>
                  </td>
                )}
                <td>
                  {setting.icon}
                  {setting.setting}
                </td>
                <td className="fw-bold">{setting.value}</td>
              </tr>
            ))
          )
        ) : (
          <tr>
            <td colSpan={3} className="text-center">
              No data available
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default RecommendationTable;
