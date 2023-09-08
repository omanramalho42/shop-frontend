import React, { useEffect } from 'react';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import moment from 'moment';

import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Gráfico de pedidos',
    },
  },
};

export default function BarChart({ dataChart = [], type = "products" || "orders" || "categories" }:any) {
  useEffect(() => { console.log(dataChart,  "Bar chart:", type )},[dataChart])
  const data = {
    labels: type === 'products' 
    ? dataChart.map((product: any) => product.name) 
    : type === 'orders' 
    ? dataChart.map((order: any) => moment(order.createdAt).subtract(10, 'days').calendar()) 
    : type === "categories" 
    ? ( dataChart.map((category: any) => category.name) ) 
    : ([]),
    datasets: [
      {
        label: 'Valor da taxação',
        data: type === 'products' 
        ? dataChart.map((product: any) => product.countInStock) 
        : type === 'orders' 
        ? dataChart.map((order: any) => order.taxPrice) 
        : ([]),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Valor dos produtos',
        data: type === 'products' 
        ? dataChart.map((product: any) => product.countInStock) 
        : type === 'orders' 
        ? dataChart.map((order: any) => order.itemsPrice) 
        : ([]),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  return (
    <Bar 
      options={options}
      data={data} 
    />
  );
}

