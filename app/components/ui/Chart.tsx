'use client';
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartOptions,
  TooltipItem,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

type APIDataItem = {
  date: number;
  rate: number;
};

interface ChartState {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
    fill: boolean;
    borderColor: string;
    backgroundColor: string | CanvasGradient;
    pointRadius?: number;
    tension?: number;
    borderWidth?: number;
  }>;
}

const Chart = () => {
  const [chartData, setChartData] = useState<ChartState>({
    labels: [],
    datasets: [
      {
        label: 'PUG Price',
        data: [],
        fill: true,
        borderColor: '#273c75',
        borderWidth: 1,
        backgroundColor: 'rgba(39, 60, 117, 0.5)',
        pointRadius: 0,
        tension: 0.4,
      },
    ],
  });

  useEffect(() => {
    const fetchChartData = async () => {
      const start = 1709548500000; 
      const end = 1717320900000; 

      try {
        const response = await axios.get<{ data: APIDataItem[] }>(
          'https://http-api.livecoinwatch.com/coins/history/range',
          {
            params: {
              coin: '___PUG',
              start: start,
              end: end,
              currency: 'USD',
            },
          }
        );

        // Vérifiez la réponse de l'API
        console.log('Réponse API:', response.data);

        if (response.data && response.data.data) {
          const data = response.data.data;

          const chartLabels = data.map((item) => {
            const date = new Date(item.date);
            return date.toLocaleString('fr-FR', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
              timeZone: 'Europe/Paris',
            });
          });

          const chartRates = data.map((item) => item.rate);

          // Mise à jour de l'état avec les nouvelles données
          setChartData({
            labels: chartLabels,
            datasets: [
              {
                label: 'PUG Price',
                data: chartRates,
                fill: true,
                borderColor: '#273c75',
                backgroundColor: 'rgba(39, 60, 117, 0.5)',
                pointRadius: 0,
                tension: 0.4,
              },
            ],
          });
        } else {
          console.error('Les données de l\'API sont vides ou incorrectes.');
        }
      } catch (error) {
        console.error('Erreur lors de la requête à l\'API:', error);
      }
    };

    fetchChartData();
  }, []);

  const options: ChartOptions<'line'> = {
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        mode: 'index',
        intersect: false,
        position: 'nearest',
        callbacks: {
          label: function (tooltipItem: TooltipItem<'line'>) {
            let label = tooltipItem.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (tooltipItem.raw !== null) {
              label += `$${(tooltipItem.raw as number).toFixed(6)}`;
            }
            return label;
          },
        },
      },
    },
    interaction: {
      mode: 'nearest',
      intersect: false,
      axis: 'x',
    },
    elements: {
      point: {
        radius: 0,
      },
      line: {
        tension: 0.4,
      },
    },
    animation: {
      onComplete: (animation: { chart: any }) => {
        const chart = animation.chart;
        const ctx = chart.ctx;
        const gradient = ctx.createLinearGradient(0, 0, 0, chart.height);
        gradient.addColorStop(0, 'rgba(39, 60, 117, 1)'); 
        gradient.addColorStop(1, 'rgba(39, 60, 117, 0)');
        chart.data.datasets[0].backgroundColor = gradient;
        chart.update();
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div>
      <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-poetsen text-[#273c75] py-20 text-center">
        PUGDAG Price Chart
      </h1>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '70vh',
          width: '80vw',
          margin: 'auto',
          zIndex: '30',
          cursor: 'none',
        }}
      >
        <Line data={chartData} options={options} />
      </div>
      <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-poetsen text-[#273c75] py-10 text-center">
        Listing
      </h1>
      <a href="https://xeggex.com/market/PUG_USDT" target="_blank" rel="noopener noreferrer">
        <img
          src="/Xeggex.png"
          alt="Pug"
          className="w-1/2 h-1/2 mx-auto -mt-12"
        />
      </a>
    </div>
  );
};

export default Chart;
