import { Line } from "react-chartjs-2";
import {
  Chart,
  Filler,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";
import annotationPlugin from "chartjs-plugin-annotation";
import { memo } from "react";
import "chart.js/auto";

Chart.register(
  Filler,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  annotationPlugin
);

interface LineChartProps {
  inputChartData?: {
    labels?: string[];
    datasets: {
      label?: string;
      data: (string | number | null)[];
      fill?: boolean;
      backgroundColor?: string;
      borderColor?: string;
      borderDash?: number[];
    }[];
  };
  dataLength?: number;
  unit?: string;
  minLabelValue?: number;
  maxLabelValue?: number;
  minRecommended?: number;
  maxRecommended?: number;
}

const LineChartCo2 = memo(
  ({
    inputChartData,
    dataLength,
    unit,
    minLabelValue,
    maxLabelValue,
    minRecommended = 800,
    maxRecommended = 1000,
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
      responsive: true,
      plugins: {
        legend: { position: "top" as const },
        annotation: {
          annotations: {
            co2Min: {
              type: "line" as const,
              yMin: minRecommended,
              yMax: minRecommended,
              borderColor: "rgba(255, 193, 7, 0.8)",
              borderWidth: 2,
              borderDash: [6, 4],
              label: {
                content: `Min Recommended (${minRecommended} ppm)`,
                position: "start" as const,
                backgroundColor: "rgba(255, 193, 7, 0.7)",
                color: "#000",
              },
            },
            co2Max: {
              type: "line" as const,
              yMin: maxRecommended,
              yMax: maxRecommended,
              borderColor: "rgba(255, 99, 132, 0.8)",
              borderWidth: 2,
              borderDash: [6, 4],
              label: {
                content: `Max Recommended (${maxRecommended} ppm)`,
                position: "start" as const,
                backgroundColor: "rgba(255, 99, 132, 0.7)",
                color: "#fff",
              },
            },
          },
        },
      },
      scales: {
        y: {
          min: minLabelValue,
          max: maxLabelValue,
          title: {
            display: true,
            text: unit ? `Value (${unit})` : "Value",
          },
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
        }
      },
    } satisfies import("chart.js").ChartOptions<"line">; // ✅ garantisce compatibilità con TS

    return (
      <div style={{ height: "310px" }}>
        <Line data={chartData} height={200} options={options} />
      </div>
    );
  }
);

LineChartCo2.displayName = "LineChartCo2";
export default LineChartCo2;
