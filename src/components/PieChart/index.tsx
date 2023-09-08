import React, { useEffect } from 'react';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Gráfico de Produtos em estoque',
    },
  },
};

export default function PieChart({ dataChart = [], type = "products" || "orders" || "categories" }:any) {
  
  const data = {
    labels: type === 'products' 
    ? dataChart.map((product: any) => product.name) 
    : type === 'orders' 
    ? dataChart.map((order: any) => order._id) 
    : type === "categories" 
    ? ( dataChart.map((category: any) => category.name) ) 
    : ([]),
    datasets: [
      {
        label: type === "products" 
        ? 'Quantidade em estoque' 
        : type ==='orders' 
        ? 'Total do pedido' 
        : type === "categories" 
        ? ( 'categoria: ' ) 
        : (""),
        data: type === 'products' 
        ? dataChart.map((product: any) => product.countInStock) 
        : type === 'orders' 
        ? dataChart.map((order: any) => order.totalPrice) 
        : type === "categories" 
        ? ( dataChart.map((category: any) => category) ) 
        : ([]),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Pie 
      data={data}
      options={options} 
    />
  );
}
