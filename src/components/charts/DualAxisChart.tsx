import { memo, useMemo } from 'react';
import { Line } from 'react-chartjs-2';

import {
  Chart,
  Filler,
  Tooltip,
  Legend,
  LinearScale,
  PointElement,
  LineElement,
  TimeScale,
  ChartOptions
} from 'chart.js';

import 'chart.js/auto';
import 'chartjs-adapter-date-fns';

import { GreenJson, DamJson } from '../../api/models';

Chart.register(
  Filler,
  Tooltip,
  Legend,
  LinearScale,
  PointElement,
  LineElement,
  TimeScale
);

interface DualAxisChartProps {
  damData: DamJson[];
  greenData: GreenJson[];
}

const DualAxisChart = ({ damData, greenData }: DualAxisChartProps) => {
  /**
   * =========================
   * DATASET MAPPING
   * =========================
   * Convertiamo i dati nel formato { x: date, y: value }
   * così Chart.js usa direttamente la scala temporale
   */

  damData = damData.slice(1);
  
  //console.log('DAM DATA IN DUAL AXIS CHART', damData);
  //console.log('GREEN DATA IN DUAL AXIS CHART', greenData);

  const toUtcDisplayDate = (iso: string) => {
    const d = new Date(iso);
    return new Date(
      d.getUTCFullYear(),
      d.getUTCMonth(),
      d.getUTCDate(),
      d.getUTCHours(),
      d.getUTCMinutes(),
      d.getUTCSeconds()
    );
  };

  const data = useMemo(() => {
    const damDataset = damData.map(d => ({
      x: toUtcDisplayDate(d.timePeriod),
      y: d.dam,
    }));

    const greenDataset = greenData.map(g => ({
      x: toUtcDisplayDate(g.timePeriod),
      y: g.tariff,
    }));

    console.log(damDataset.slice(0, 3));
    console.log(greenDataset.slice(0, 3));

    return {
      datasets: [
        {
          label: 'Day-Ahead Market electricity prices (€/MWh)',
          data: damDataset,
          borderWidth: 2,
          pointRadius: 0,
          yAxisID: 'yDam',
          tension: 0.3,
        },
        {
          label: 'RES share (%)',
          data: greenDataset,
          borderWidth: 2,
          pointRadius: 0,
          yAxisID: 'yGreen',
          tension: 0.3,
        },
      ],
    };
  }, [damData, greenData]);


  //const chartTitle = useMemo(() => {
  //  const firstDate =
  //    damData?.[0]?.timePeriod || greenData?.[0]?.timePeriod;
//
  //  if (!firstDate) return '';
//
  //  const d = new Date(firstDate);
//
  //  return d.toLocaleDateString('it-IT', {
  //    day: '2-digit',
  //    month: '2-digit',
  //    year: 'numeric',
  //  });
  //}, [damData, greenData]);

  /**
   * =========================
   * CHART OPTIONS
   * =========================
   */
  const options: ChartOptions<'line'> = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    stacked: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      x: {
        type: 'time',
        time: {
          tooltipFormat: 'dd/MM/yyyy HH:mm',
        },
        title: {
          display: true,
          text: 'Time',
        },
      },

      /**
       * ASSE Y SINISTRO → DAM
       */
      yDam: {
        type: 'linear',
        display: true,
        position: 'left',
        title: {
          display: true,
          text: 'DAM (€/MWh)',
        },
      },

      /**
       * ASSE Y DESTRO → GREEN
       */
      yGreen: {
        type: 'linear',
        display: true,
        position: 'right',
        grid: {
          drawOnChartArea: false, // evita sovrapposizione griglie
        },
        title: {
          display: true,
          text: 'RES share (%)',
        },
      },
    },
  }), []);

  return <Line data={data} options={options} />;
};

export default memo(DualAxisChart);
