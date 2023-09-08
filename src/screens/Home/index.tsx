import React, { useEffect, useReducer, useState } from 'react'

import axios from 'axios'
import logger from 'use-reducer-logger'

import { motion } from 'framer-motion'

import { Row, Col, Card } from 'react-bootstrap'

import { LoadingBox, MessageBox, Product } from '../../components'

import { Helmet } from 'react-helmet-async'

import { ProductProps } from '../../util/data'
import Skeleton from 'react-loading-skeleton'

const reducer = (state: any , action: any) => {
  switch(action.type) {
    case 'FETCH_REQUEST':
      return {...state, loading: true}
    case 'FETCH_SUCCESS':
      return {...state, products: action.payload, loading: false}
    case 'FETCH_FAIL':
      return {...state, loading: false, error: action.payload}
    default:
      return state
  }
}

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
};

const Home = () => {
  const [dataProducts, setDataProducts] = useState<ProductProps>()
  
  const [{loading, error, products}, dispatch] = useReducer(logger(reducer), {
    loading: true,
    error: ''
  });

  useEffect(() => {
    const fetchDataProducts = async () => {
      dispatch({ type: 'FETCH_REQUEST' })

      await axios.get(`${process.env.REACT_APP_API_URL}/api/products`)
        .then((res) => {
          setDataProducts({ products: res.data })
          dispatch({ type: 'FETCH_SUCCESS', payload: res.data })
        })
        .catch((error) => dispatch({ type: 'FETCH_FAIL', payload: error.message }))
    }

    fetchDataProducts();
  },[])

  return (
    <div>
      <div>
        <Helmet>
          <title>Amazona</title>
        </Helmet>
      </div>
      {loading ? ( 
        // <LoadingBox />
        <Row className='mb-5'>
          {[1,2,3,4,5,6].map((i) => (
            <Col 
              sm={6} md={4} lg={3} 
              style={{ display: 'flex', justifyContent:'center', alignItems: 'center', transition: '0.325'}}
            >
              <Card className='w-100 my-3' style={{ height: 350, border: 'none' }}>
                <Skeleton
                  key={i} 
                  borderRadius={5}
                  style={{ height: '350px' }}
                  className='w-100'
                  />
              </Card>
            </Col>
          ))}
        </Row>
      ) : error ? (
        <MessageBox variant="danger">
          { error }
        </MessageBox>
      ) : (
          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
          >
          <Row className='mb-5'>
            {dataProducts?.products.map(( product ) => (
              <Col sm={6} md={4} lg={3} key={product.slug}>
                <motion.div variants={item}>
                  <Product product={product} />
                </motion.div>
              </Col>
            ))}
          </Row>
        </motion.div>
      )}
    </div>
  )
}

export default Home