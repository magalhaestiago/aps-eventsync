import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface DonutChartProps {
  labels: string[];
  data: number[];
  backgroundColors?: string[]; // opcional: permite passar cores personalizadas
  borderColors?: string[]; // opcional: permite passar bordas personalizadas
}

const DonutChart: React.FC<DonutChartProps> = ({ labels, data, backgroundColors, borderColors }) => {
  // Definindo cores padrão caso não sejam passadas via props
  const defaultBackgroundColors = [
    'rgba(255, 99, 132, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(255, 159, 64, 0.2)',
  ];

  const defaultBorderColors = [
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)',
  ];

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'número de horas',
        data: data,
        backgroundColor: backgroundColors || defaultBackgroundColors,
        borderColor: borderColors || defaultBorderColors,
        borderWidth: 0,
      },
    ],
  };

  return <Doughnut data={chartData} />;
};

export default DonutChart;
