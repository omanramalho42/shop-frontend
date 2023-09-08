import React, { useContext, useEffect, useReducer } from 'react'

import axios from 'axios';

import { PayPalButtons, SCRIPT_LOADING_STATE, usePayPalScriptReducer } from '@paypal/react-paypal-js'

import { Card, Col, ListGroup, Row } from 'react-bootstrap';

import { Helmet } from 'react-helmet-async';

import { Link } from 'react-router-dom';

import { useNavigate, useParams } from 'react-router-dom';

import { Image } from '../../styles/Order'

import { LoadingBox, MessageBox } from '../../components';

import { Store } from '../../context/Store'

import { getError } from '../../util/utils';
import { toast } from 'react-toastify';

const reducer = (state: any, action: any) => {
  switch(action.type) {
    case 'FETCH_REQUEST':
      return {
        ...state,
        loading: true, error: ''
      }
    case 'FETCH_SUCCESS':
      return {
        ...state,
        loading: false, order: action.payload, error: ''
      }
    case 'FETCH_FAIL':
      return {
        ...state,
        loading: true, error: action.payload
      }
    case 'PAY_REQUEST':
      return {
        ...state,
        loadingPay: true
      }
    case 'PAY_SUCCESS':
      return {
        ...state,
        loadingPay: false, successPay: true
      }
    case 'PAY_FAIL':
      return {
        ...state,
        loadingPay: false, errorPay: action.payload
      }
    case 'PAY_RESET':
      return {
        ...state,
        loadingPay: false, successPay: false
      }
    default:
      return { ...state }
  }
}

const Order = () => {
  const navigate = useNavigate();
  
  const [{ loading, error, order, successPay, loadingPay }, dispatch] = useReducer(reducer, {
    loading: true,
    order: {},
    error: '',
    successPay: false,
    loadingPay: false
  });

  const params = useParams();
  const { id: orderId } = params;
  
  const { state } = useContext(Store);
  const { userInfo } = state;

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer(); 

  const createOrder = (data:any , actions: any) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: { value: order.totalPrice },
        },
      ],
    })
    .then((orderId: any) => {
      return orderId
    });
  }

  const onApprove = (data: any, actions: any) => {
    return actions.order.capture().then(async function (details: any) {
      try {
        dispatch({ type: 'PAY_REQUEST' });
        const { data }: any = axios.put(`${process.env.REACT_APP_API_URL}/api/orders/${order._id}/pay`, 
          {
            details,
          },
          {
            headers: { authorization: `Bearer ${userInfo.token}` }
          }
        );
        dispatch({ type: 'PAY_SUCCESS', payload: data });
        toast.success('Pedido foi pago');
      } catch (err) {
        dispatch({ type: 'PAY_FAIL', payload: getError(err) })
        toast.error(getError(err));
      }
    })
  }

  const onError = (err: any) => {
    toast.error(getError(err))
  }

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data }: any = await axios.get(`${process.env.REACT_APP_API_URL}/api/orders/${orderId}`, {
          headers: { authorization: `Bearer ${userInfo.token}`}
        });
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (error: any) {  
        dispatch({ type: 'FETCH_FAIL', payload: getError(error) });
      }
    }

    if(!userInfo) {
      return navigate("/login");
    }
    if(!order._id || (order._id && order._id !== orderId)) {
      fetchOrder(); 
      if(successPay) {
        dispatch({ type: 'PAY_RESET' });
      }
    } else {
      const loadPaypalScript = async () => {
        const { data: clientId } = await axios.get(`${process.env.REACT_APP_API_URL}/api/keys/paypal`, {
          headers: { authorization: `Bearer ${userInfo.token}` }
        });
        paypalDispatch({
          type: 'resetOptions',
          value: {
            'client-id': clientId,
            currency: 'BRL',
          },
        });
        paypalDispatch({ type: "setLoadingStatus", value: SCRIPT_LOADING_STATE.PENDING });
      }

      loadPaypalScript();
    }
  },[order, navigate, userInfo, orderId, successPay]);

  return (
    loading ? (
      <LoadingBox />
    ) : error ? (
      <MessageBox variant='danger'>
        { error }
      </MessageBox>
    ) : (
      <div>
        <Helmet>
          <title>Pedido { orderId } </title>
        </Helmet>
        <h1 className='my-3'>
          Pedido: {orderId}
        </h1>
        <Row>
          <Col md={8}>
            <Card className='mb-3'>
              <Card.Body>
                <Card.Title>Entrega</Card.Title>
                <Card.Text>
                  <strong>Nome:</strong> {order.shippingAddress.fullName} <br />
                  <strong>Endereço:</strong> {order.shippingAddress.address},
                  {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                </Card.Text>
                {order.isDelivered ? (
                  <MessageBox>
                    Enviado: { order.deliveredAt }
                  </MessageBox>
                ) : (
                  <MessageBox variant='danger'>
                    Não enviado
                  </MessageBox>
                )}
              </Card.Body>
            </Card>
            <Card className='mb-3'>
              <Card.Body>
                <Card.Title>Pagamento</Card.Title>
                <Card.Text>
                  <strong>Método: { order.payamentMethod }</strong>
                </Card.Text>
                {order.isPaid ? (
                  <MessageBox>
                    Pagamento efetuado: { order.paidAt }
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">
                    Pagamento não efetuado
                  </MessageBox>
                )}
              </Card.Body>
            </Card>
            <Card className='mb-3'>
              <Card.Body>
                <Card.Title>Items</Card.Title>
                <ListGroup variant='flush'>
                  {order.orderItems.map((item: any) => (
                    <ListGroup.Item key={item._id}>
                      <Row className='align-items-center'>
                        <Col md={6}>
                          <Image 
                            src={item.image}
                            alt={item.name}
                            className="img-fluid rounded img-thumbnail"
                          /> { ' ' }
                          <Link to={`/product${item.slug}`}>{item.name}</Link>
                        </Col>
                        <Col md={3}>
                          {item.quantity}
                        </Col>
                        <Col md={3}>
                          R${item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card>
              <Card.Body>
                <Card.Title>Resumo do pedido</Card.Title>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>Items</Col>
                      <Col>R${order.itemsPrice.toFixed(2)}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Entrega</Col>
                      <Col>R${order.shippingPrice.toFixed(2)}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Taxas</Col>
                      <Col>R${order.taxPrice.toFixed(2)}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>
                        <strong>Pedido Total</strong>
                      </Col>
                      <Col>
                        <strong>
                          R${ order.totalPrice.toFixed(2) }
                        </strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                {!order.isPaid && (
                  <ListGroup.Item>
                    {isPending ? (
                      <LoadingBox />
                    ) : (
                      <div>
                        <PayPalButtons
                          createOrder={createOrder}
                          onApprove={onApprove}
                          onError={onError}
                        ></PayPalButtons>
                      </div>
                    )}
                    {loadingPay && (
                      <LoadingBox />
                    )}
                  </ListGroup.Item>
                )}
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    )
  )
}

export default Order