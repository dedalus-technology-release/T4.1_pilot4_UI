import Table from "react-bootstrap/Table";

const RecommendationTable = () => {
  const recommendations = [
    {
      condition: "If you want to stay in comfort set:",
      settings: [
        { setting: "Internal Temperature", value: "23°C" },
        { setting: "Relative Humidity", value: "50%" },
        { setting: "Energy Saving", value: "15%" },
      ],
    },
    {
      condition:
        "If you want to minimize energy consumption without taking into account comfort set:",
      settings: [
        { setting: "Internal Temperature", value: "20°C" },
        { setting: "Relative Humidity", value: "50%" },
        { setting: "Energy Saving", value: "30%" },
      ],
    },
    {
      condition:
        "If you want to minimize energy consumption with an acceptable comfort set:",
      settings: [
        { setting: "Internal Temperature", value: "21°C" },
        { setting: "Relative Humidity", value: "50%" },
        { setting: "Energy Saving", value: "13%" },
      ],
    },
  ];
  return (
    <div>
      <h2>Recomendation</h2>
      <Table bordered hover>
        <thead className="sticky-top">
          <tr>
            <th>Condition</th>
            <th>Setting</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {recommendations.map((recommendation) =>
            recommendation.settings.map((setting, settingIndex) => (
              <>
                <tr>
                  {settingIndex == 0 && (
                    <td rowSpan={3}>
                      <strong>{recommendation.condition}</strong>
                    </td>
                  )}
                  <td>{setting.setting}</td>
                  <td>{setting.value}</td>
                </tr>
              </>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default RecommendationTable;
