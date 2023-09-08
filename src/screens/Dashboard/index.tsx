import 'react-loading-skeleton/dist/skeleton.css'

import React, { useEffect, useState, useContext, useReducer } from 'react'
import axios from 'axios';


import { Store } from '../../context/Store';
import { getError } from '../../util/utils';

import PieChart from '../../components/PieChart'

import { Toaster, toast } from 'react-hot-toast';
import Skeleton from 'react-loading-skeleton';
import { Container } from 'react-bootstrap';
import BarChart from '../../components/BarChart';
import { AreaChart } from '../../components/AreaChart';
import { MessageBox } from '../../components';
import { Helmet } from 'react-helmet-async';

const reducer = (state: any, action: any) => {
  switch(action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true }
    case 'FETCH_SUCCESS_PRODUCTS':
      return {...state, products: action.payload, loading: false}
      case 'FETCH_SUCCESS_ORDERS':
      return {...state, orders: action.payload, loading: false}
      case 'FETCH_SUCCESS_USERS':
      return {...state, users: action.payload, loading: false}
    case 'FETCH_FAIL':
      return {...state, loading: false, error: action.payload}
    default:
      return state
  }
}

const Dashboard:React.FC = () => {
  const { state } = useContext(Store);
  const { userInfo } = state;

  const [{ 
    loading, 
    error, 
    products, 
    orders, 
    users 
  }, dispatch] = useReducer(reducer , {
    products: {},
    orders: {},
    users: {},
    loading: true,
    error: ''
  });

  const [categories, setCategories]               = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setCategoriesLoading(true);
        const { data }: any = await axios.get(`${process.env.REACT_APP_API_URL}/api/products/categories`);
        setCategories(data);
      } catch (error) {
        toast.error(getError(error));
      } finally {
        setCategoriesLoading(false);
      }
    };

    fetchCategories();
  },[]);

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const { data }: any = await axios.get(`${process.env.REACT_APP_API_URL}/api/orders/listorders`, {
          headers: { authorization: `Bearer ${userInfo.token}` }
        });
        // setOrders(data.orders);
        dispatch({ type: 'FETCH_SUCCESS_ORDERS', payload: data.orders });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    }
    fetchData();
  },[userInfo])

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const { data }: any = await axios.get(`${process.env.REACT_APP_API_URL}/api/products/listproducts`, {
          headers: { authorization: `Bearer ${userInfo.token}` }
        });
        
        dispatch({ type: 'FETCH_SUCCESS_PRODUCTS', payload: data.products });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    }
    fetchData();
  },[userInfo])

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const { data }: any = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/listusers`, {
          headers: { authorization: `Bearer ${userInfo.token}` }
        });
        
        dispatch({ type: 'FETCH_SUCCESS_USERS', payload: data.users });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    }
    fetchData();
  },[userInfo])

  const ContainerInfoLoader = () => {
    return (
      <Skeleton 
        inline
        className='p-4 w-100 m-5 p-2 shadow'
      />
    )
  }

  return (
    <Container className='p-5 mb-5'>
      <Toaster />
      
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      
      <h1>
        Dashboard
      </h1>

      <div className='d-xl-flex justify-content-between align-items-center flex-row text-center'>
        {users && !loading ? (
          <div className='w-100 my-5 d-flex justify-content-center align-items-center bg-warning bg-gradient text-center shadow p-2 text-white'>
            <div>
              <p className='text-white text-uppercase fs-2 fw-bold'>
                Usuários: {users?.length}
              </p>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-people mb-3 mx-2" viewBox="0 0 16 16">
                <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8Zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022ZM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816ZM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z"/>
              </svg>
            </div>
          </div>
        ) : (
          <ContainerInfoLoader />
        )}
        {products && !loading ? (
          <div className='my-5 w-100 mx-xl-5 text-center bg-info bg-gradient d-flex justify-content-center align-items-center shadow p-2 text-white'>
            <div>
              <p className='text-white text-uppercase fs-2 fw-bold'>
                Produtos: {products?.length}
              </p>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-shop mb-3 mx-2" viewBox="0 0 16 16">
                <path d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.371 2.371 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976l2.61-3.045zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0zM1.5 8.5A.5.5 0 0 1 2 9v6h1v-5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v5h6V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5zM4 15h3v-5H4v5zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3zm3 0h-2v3h2v-3z"/>
              </svg>
            </div>
          </div>
        ) : (
          <ContainerInfoLoader />
        )}
        {orders && !loading ? (
          <div className='my-5 w-100 text-center shadow p-2 bg-danger bg-gradient d-flex justify-content-center align-items-center text-white'>
            <div>
              <p className='text-white text-uppercase fs-2 fw-bold'>
                Pedidos: {orders?.length}
              </p>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-clipboard-minus mb-3 mx-2" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M5.5 9.5A.5.5 0 0 1 6 9h4a.5.5 0 0 1 0 1H6a.5.5 0 0 1-.5-.5z"/>
                <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
                <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
              </svg>
            </div>
          </div>
        ) : (
          <ContainerInfoLoader />
        )}
      </div>

      <div className='d-flex justify-content-center flex-md-row flex-column col-12'>
        <div className='col-12 col-md-6 mt-5'>
          { products?.length > 0 && !loading ? (
            <div className=''>
              <PieChart 
                dataChart={products}
                type="products" 
              />
            </div>
          ) : (
            <>
              <Skeleton inline />
              <Skeleton 
                className='w-75 h-75 m-5'
                borderRadius={"50%"}
              />
            </>
          )}
          { error && !loading && (
            <MessageBox variant='danger'>
              { error }
            </MessageBox>
          )}
        </div>

        <div className='col-12 col-md-6 d-flex flex-column mt-5'>
          {orders?.length > 0 && !loading ? (
            <div className=''>
              <BarChart 
                dataChart={orders} 
                type="orders"
              />
            </div>
          ) : (
            <Skeleton
              className='mt-5' 
              height={200}
            />
          )}
            <div className='w-full mt-5'>
              {orders?.length > 0 && !loading ? (
                <div className=''>
                  <AreaChart 
                    dataChart={orders}
                    type="orders" 
                  />
                </div>
              ) : (
                <Skeleton 
                  className='mt-5'
                  height={200}
                />
              )}
            </div>
        </div>
      </div>
    </Container>
  )
}

export default Dashboard;