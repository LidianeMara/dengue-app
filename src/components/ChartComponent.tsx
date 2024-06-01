// src/components/ChartComponent.tsx
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface ChartComponentProps {
    data: {
        geocode: string;
        disease: string;
        ew: number;
        ey: number;
        SE: number;
        value: number;
        casos: number;
    }[];
}

const ChartComponent: React.FC<ChartComponentProps> = ({ data }) => {
    const chartData = {
        labels: data.map(d => `${d.SE}`),
        datasets: [
            {
                label: 'Casos de Dengue',
                data: data.map(d => d.casos),
                fill: true,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Casos de Dengue ao Longo do Tempo',
            },
        },
    };

    return <Line data={chartData} options={options} />;
};

export default ChartComponent;
