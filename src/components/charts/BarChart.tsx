import { Bar } from "react-chartjs-2";
import { Chart, Filler, Tooltip, Legend } from "chart.js";
import { memo } from "react";
import "chart.js/auto";

Chart.register(Filler, Tooltip, Legend);
interface BarChartProps {
  inputChartData?: {
    labels?: string[];
    datasets: {
      label?: string;
      data: number[];
      fill?: boolean;
      backgroundColor?: string;
      borderColor?: string;
    }[];
  };

  dataLength?: number;
}

const BarChart = memo(({ inputChartData, dataLength }: BarChartProps) => {
  const placeholderData = {
    labels: ["No Data"],
    datasets: [
      {
        label: dataLength && dataLength > 0 ? "Select" : "No Data",
        data: [0],
        fill: true,
        backgroundColor: "rgba(226,243,235,0.5)",
        borderColor: "rgba(147,208,167,255)",
      },
    ],
  };
  const isEmptyData = !inputChartData || inputChartData?.datasets?.length === 0;
  const chartData = isEmptyData ? placeholderData : inputChartData;

  const options = {
    maintainAspectRatio: false,
  };

  return (
    <div style={{ height: "310px" }}>
      <Bar data={chartData} height={200} options={options} />
    </div>
  );
});

BarChart.displayName = "BarChart";
export default BarChart;
