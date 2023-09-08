import axios from 'axios'
import React, { useContext, useEffect, useReducer, useState } from 'react'
import { getError } from '../../util/utils'
import { useNavigate } from 'react-router-dom'
import { Store } from '../../context/Store'
import { LoadingBox, MessageBox } from '../../components'
import { Button, Modal, ModalBody, ModalDialog, ModalTitle } from 'react-bootstrap'

const reducer = (state: any, action: any) => {
  switch(action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true }
    case 'FETCH_SUCCESS':
      return {...state, orders: action.payload, loading: false}
    case 'FETCH_FAIL':
      return {...state, loading: false, error: action.payload}
    default:
      return state
  }
}

const OrdersScreen:React.FC = () => {
  const navigate = useNavigate();
  const { state } = useContext(Store);
  const { userInfo } = state;

  const [{ loading, error, orders }, dispatch] = useReducer(reducer , {
    orders: {},
    loading: true,
    error: ''
  });

  const [show, setShow] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const { data }: any = await axios.get(`${process.env.REACT_APP_API_URL}/api/orders/listorders`, {
          headers: { authorization: `Bearer ${userInfo.token}` }
        });
        
        dispatch({ type: 'FETCH_SUCCESS', payload: data.orders });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    }
    fetchData();
  },[userInfo]);

  const [trackerCode, setTrackerCode] = useState("");
  const handleSubmit = (event: any) => {
    console.log(event);
  }

  return (
    <div>
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
              {order.deliveredTrackingCode !== null ? (
                <>
                  <Button
                    type='button'
                    disabled
                    variant='success'
                    className='mx-1'
                    value={order.deliveredTrackingCode}
                    onClick={(event: any) => {
                      setShow(!show)
                      setTrackerCode(event.target.value)
                    }}
                  >
                    { order.deliveredTrackingCode.toString() }
                  </Button>
                </>
              ) : (
                <Button
                  type='button'
                  variant='warning'
                  className='mx-1'
                  onClick={() => setShow((value) => !value)}
                >
                  + Add Tracker Code
                </Button>
              )}
            </td>
          </tr>
        ))}
        </tbody>
      </table>
      )}
      <Modal
        show={show}
        keyboard
        onHide={() => setShow(false)}
        onExit={() => setShow(false)} 
        // onEnter={() => setShow(true)}
      >
        <ModalTitle className='p-1'>
          + Adicionar codigo de rastreio ao pedido
        </ModalTitle>
        <ModalBody className='d-flex'>
          <label htmlFor='trackerCode' className='m-1'>
            Escreva o codigo de rastreio:
          </label>
          <input 
            name='trackerCode'
            type="text" 
            value={trackerCode || ""} 
            onChange={(event) => 
              setTrackerCode(() => event.target.value)
            } 
          />
          <Button 
            className='' 
            variant='success' 
            onClick={(event: any) => 
              handleSubmit(event)
            }
          >
            + Add
          </Button>
        </ModalBody>
      </Modal>
    </div>
  )
}

export default OrdersScreen