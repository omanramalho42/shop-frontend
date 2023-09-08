import React from 'react'
import { Badge, Button } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';

interface NewsScreenProps {
  title: string;
  description: string;
  subTitle: string;
  image: string;
  content: string;
  createdAt: any;
  updatedAt: any;
  rating: number;
}

const NewsScreen:React.FC = () => {

  const data: NewsScreenProps[] = [
    { 
      title: "Tela de Anúncios", 
      description: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugit nam error incidunt quis perferendis
      culpa? Reiciendis nam debitis, fuga, quo praesentium, voluptatem atque quibusdam ullam sunt eveniet eum odit velit!
      `,
      subTitle: "",
      image: "",
      content: "", 
      createdAt: Date.now(), 
      updatedAt: Date.toString(), 
      rating: 0 
    },
    { 
      title: "Tela de Dashboard", 
      description: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugit nam error incidunt quis perferendis
      culpa? Reiciendis nam debitis, fuga, quo praesentium, voluptatem atque quibusdam ullam sunt eveniet eum odit velit!
      `,
      subTitle: "",
      image: "",
      content: "", 
      createdAt: Date.now(), 
      updatedAt: Date.toString(), 
      rating: 0 
    },
    { 
      title: "Tela de ediçao de produtos", 
      description: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugit nam error incidunt quis perferendis
      culpa? Reiciendis nam debitis, fuga, quo praesentium, voluptatem atque quibusdam ullam sunt eveniet eum odit velit!
      `,
      subTitle: "",
      image: "",
      content: "", 
      createdAt: Date.now(), 
      updatedAt: Date.toString(), 
      rating: 0 
    },
  ]

  return (
    <div className='mt-5 mb-5 p-5'>
      
      <Helmet>
        <title>Adsense</title>
      </Helmet>
      
      <h1 className='mb-5'>Tela de Noticias do App</h1>
      {data.map((i, idx) => (
        <div key={idx} className='mb-5 mt-5'>
          <Badge style={{ position: 'relative', left: '20%' }}>
            New
          </Badge>
          <h1 className='w-25'> 
            { i.title } 
          </h1>
          <h5>
            { i.subTitle }
          </h5>
          <p>{i.createdAt}</p>
          <span>{i.description}</span>
          <p>
            { i.content }
          </p>

          <Button variant='info'>
            ver mais...
          </Button>
        </div>
      ))}
    </div>
  )
}

export default NewsScreen