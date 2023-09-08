import React, { useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import moment from 'moment';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
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
      text: 'Gráfico de preço total dos pedidos',
    },
  },
};

export function AreaChart({ dataChart = [], type = "products" || "orders" || "users" }: any) {
  const labels = type === 'products' 
  ? dataChart.map((product: any) => product.name) 
  : type === 'orders' 
  ? dataChart.map((order: any) => moment(order.createdAt).subtract(10, 'days').calendar()) 
  : type === "categories" 
  ? ( dataChart.map((category: any) => category.name) ) 
  : type === 'users' 
  ? dataChart.map((user: any) => moment(user.createdAt).subtract(10,'days').calendar())
  : ([]); 

  useEffect(() => {
  console.log(dataChart,"Area chart:",type);
  },[dataChart]);

  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: type === "products" 
        ? 'Quantidade em estoque' 
        : type ==='orders' 
        ? 'Total do pedido em R$' 
        : type === "categories" 
        ? ( 'categoria: ' ) 
        : (""),
        data: type === 'products' 
        ? dataChart.map((product: any) => product.countInStock) 
        : type === 'orders' 
        ? dataChart.map((order: any) => order.totalPrice) 
        : type === 'users' ? 
          dataChart.map((user:any) => user) 
        : ([]),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };
  
  return (
    <Line 
      options={options} 
      data={data} 
    />
  );
}
