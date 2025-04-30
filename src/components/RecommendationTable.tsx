import Table from "react-bootstrap/Table";

import { Recommendation } from "../api/models";
interface RecommendationTableProps {
  data: Recommendation[];
}

const solutionCondition: Record<string, string> = {
  S1: "If you want to stay in comfort set",
  S2: "If you want to minimize energy consumption without taking into account comfort set",
  S3: "If you want to minimize energy consumption with an acceptable comfort set",
};

const RecommendationTable = ({ data }: RecommendationTableProps) => {
  const dataWithCondition = data.map((recomendation: Recommendation) => {
    return {
      // ...recomendation,
      condition: solutionCondition?.[recomendation?.solution],
      settings: [
        {
          setting: "Internal Temperature",
          value: `${recomendation.avgTempC} °C`,
        },
        {
          setting: "Relative Humidity",
          value: `${recomendation.avgHumidity} °C`,
        },
        {
          setting: "Energy Saving",
          value: `${recomendation.energySavings} °C`,
        },
      ],
    };
  });

  return (
    <Table bordered hover>
      <thead className="sticky-top">
        <tr>
          <th>Condition</th>
          <th>Setting</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        {dataWithCondition.length > 0 ? (
          dataWithCondition.map((recommendation) =>
            recommendation.settings.map((setting, settingIndex) => (
              <tr key={settingIndex}>
                {settingIndex == 0 && (
                  <td rowSpan={3}>
                    <strong>{recommendation.condition}</strong>
                  </td>
                )}
                <td>{setting.setting}</td>
                <td>{setting.value}</td>
              </tr>
            ))
          )
        ) : (
          <p>Select apartment to see recommendations</p>
        )}
      </tbody>
    </Table>
  );
};

export default RecommendationTable;
