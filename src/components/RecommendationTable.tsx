import Table from "react-bootstrap/Table";
import { WiThermometer, WiHumidity } from "react-icons/wi";
import { MdEnergySavingsLeaf } from "react-icons/md";

import { Recommendation } from "../api/models";

interface RecommendationTableProps {
  data: Recommendation[];
}

const solutionCondition: Record<string, string> = {
  S1: "To stay in comfort set",
  S2: "To minimize energy consumption without taking into account comfort set",
  S3: "To minimize energy consumption with an acceptable comfort set",
};

const RecommendationTable = ({ data }: RecommendationTableProps) => {
  const dataWithCondition = data?.map((recomendation: Recommendation) => {
    return {
      // ...recomendation,
      condition: solutionCondition?.[recomendation?.solution],
      settings: [
        {
          setting: "Internal Temperature",
          value: `${recomendation.avgTempC} °C`,
          icon: <WiThermometer className="text-danger fs-3" />,
        },
        {
          setting: "Relative Humidity",
          value: `${recomendation.avgHumidity} %`,
          icon: <WiHumidity className="text-primary fs-3" />,
        },
        {
          setting: "Energy Saving",
          value: `${recomendation.energySavings} %`,
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
                  <td rowSpan={3} style={{ maxWidth: "220px" }}>
                    <strong>{recommendation.condition}</strong>
                  </td>
                )}
                <td>
                  {setting.setting} {setting.icon}
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
