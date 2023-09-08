import axios from 'axios'
import React, { useContext, useEffect, useReducer } from 'react'
import { Button } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'
import { LoadingBox, MessageBox } from '../../components'
import { Store } from '../../context/Store'
import { getError } from '../../util/utils'

const reducer = (state: any, action: any) => {
  switch(action.type) {
    case 'FETCH_REQUEST':
      return {
        ...state,
        loading: true
      }
    case 'FETCH_SUCCESS':
      return  {
        ...state,
        loading: false, orders: action.payload
      }
    case 'FETCH_FAIL':
      return  {
        ...state,
        loading: false, error: action.payload
      }
    default:
      return state
      
  }
}

const OrderHistory:React.FC = () => {
  const navigate = useNavigate();
  const { state } = useContext(Store);
  const { userInfo } = state;

  const [{ loading, error, orders }, dispatch] = useReducer(reducer , {
    loading: true,
    error: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const { data }: any = await axios.get(`${process.env.REACT_APP_API_URL}/api/orders/mine`, {
          headers: { authorization: `Bearer ${userInfo.token}` }
        });
        
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    }
    fetchData();
  },[userInfo])


  return (
    <div>
      <Helmet>
        <title>Histórico de pedidos</title>
      </Helmet>
      <h1>Histórico de pedidos</h1>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant='danger'>
          { error }
        </MessageBox>
      ) : (
        <table className='table'>
          <thead>
            <tr>
              <th>ID</th>
              <th>DATA</th>
              <th>TOTAL</th>
              <th>PAGAMENTO</th>
              <th>ENTREGA</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
          {orders.map((order: any) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.createdAt.substring(0, 10)}</td>
              <td>{order.totalPrice.toFixed(2)}</td>
              <td>{order.isPaid ? /*order.paidAt.substring(0,10)*/ 'Sim' : 'Não'}</td>
              <td>
                {order.isDelivered ? (
                  order.deliveredAt.substring(0,10)
                ) : (
                  'No'
                )}
              </td>
              <td>
                <Button
                  type="button"
                  variant='light'
                  onClick={() => {
                    navigate(`/order/${order._id}`)
                  }}
                >
                  Detalhes
                </Button>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default OrderHistory