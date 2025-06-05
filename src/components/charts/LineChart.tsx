import { Line } from "react-chartjs-2";
import { Chart, Filler, Tooltip, Legend } from "chart.js";
import { memo } from "react";
import "chart.js/auto";

Chart.register(Filler, Tooltip, Legend);
interface LineChartProps {
  inputChartData?:
    | {
        labels?: string[];
        datasets: {
          label?: string;
          data: (string | number)[];
          fill?: boolean;
          backgroundColor?: string;
          borderColor?: string;
          borderDash?: number[];
        }[];
      }
    | undefined;

  dataLength?: number;
  unit?: string;
  minLabelValue?: number;
  maxLabelValue?: number;
}

const LineChart = memo(
  ({
    inputChartData,
    dataLength,
    unit,
    minLabelValue,
    maxLabelValue,
  }: LineChartProps) => {
    const placeholderData = {
      labels: ["No Data"],
      datasets: [
        {
          label: dataLength && dataLength > 0 ? "Select" : "No Data",
          data: [0 as number],
          fill: true,
          backgroundColor: "rgba(226,243,235,0.5)",
          borderColor: "rgba(147,208,167,255)",
        },
      ],
    };
    const isEmptyData =
      !inputChartData || inputChartData?.datasets?.length === 0;
    const chartData = isEmptyData ? placeholderData : inputChartData;

    const options = {
      maintainAspectRatio: false,
      scales: {
        y: {
          min: minLabelValue,
          max: maxLabelValue,
          ticks: {
            callback: function (tickValue: string | number) {
              const value =
                typeof tickValue === "number"
                  ? tickValue
                  : parseFloat(tickValue);
              if (minLabelValue !== undefined && maxLabelValue !== undefined) {
                return value;
              }
              return unit
                ? `${value.toFixed(2)} ${unit}`
                : `${value.toFixed(2)}`;
            },
          },
        },
      },
    };

    return (
      <div style={{ height: "310px" }}>
        <Line data={chartData} height={200} options={options} />
      </div>
    );
  }
);

LineChart.displayName = "LineChart";
export default LineChart;
