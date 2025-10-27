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
  const dataWithCondition = data?.map((recomendation: Recommendation) => {
    return {
      // ...recomendation,
      condition: solutionCondition?.[recomendation?.solution],
      settings: [
        {
          setting: "Internal Temperature",
          value: `from ${recomendation.t_r_min}°C to ${recomendation.t_r_max}°C`,
          icon: <WiThermometer className="text-danger fs-3" />,
        },
        {
          setting: "Relative Humidity",
          value: `from ${recomendation.rh_r_min}% to ${recomendation.rh_r_max}%`,
          icon: <WiHumidity className="text-primary fs-3" />,
        },
        {
          setting: "Expected Comfort",
          value: `from ${recomendation.comfortMin} to ${recomendation.comfortMax}`,
          icon: <IoMdHappy className="text-success fs-3" />
        },
        {
          setting: "Energy Saving",
          value: `from ${recomendation.energySavingWhMin}% to ${recomendation.energySavingWhMax}%`,
          icon: <MdEnergySavingsLeaf className="text-warning fs-4" />,
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
                  <td rowSpan={3} style={{ maxWidth: "150px" }}>
                    <strong>{recommendation.condition}</strong>
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
