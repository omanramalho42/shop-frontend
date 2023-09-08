import React, { useContext, useEffect, useReducer } from 'react'

import axios from 'axios'

import { Store } from '../../context/Store'

import { Link, useNavigate } from 'react-router-dom'

import { Helmet } from 'react-helmet-async'

import { toast } from 'react-toastify'
import { getError } from '../../util/utils'

import { CheckoutSteps, LoadingBox } from '../../components'

import { Button, Card, Col, ListGroup, Row } from 'react-bootstrap'

import { 
  Container,
  Image
} from '../../styles/PlaceOrder'

const reducer = (state: any, action: any) => {
  switch(action.type) {
    case 'CREATE_REQUEST':
      return { ...state, loading: true }
    case 'CREATE_SUCCESS':
      return { ...state, loading: false }
    case 'CREATE_FAIL':
      return { ...state, loading: false }
    default: 
      return state;
  }
}

const PlaceOrder:React.FC = () => {
  const navigate = useNavigate();

  const [{loading, error}, dispatch] = useReducer(reducer, {
    loading: false,
    error: ''
  })

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { 
    cart, userInfo
  } = state;

  const round2 = (num: any) => Math.round(num * 100 + Number.EPSILON) / 100;
  cart.itemsPrice = round2(
    cart.cartItems.reduce((a: any, c: any) => a + c.quantity * c.price, 0)
  );
  cart.shippingPrice = cart.itemsPrice > 100 ? round2(0) : round2(10);
  cart.taxPrice = round2(0.15 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

  const handlePlaceOrder = async () => {
    try {
      dispatch({ type: 'CREATE_REQUEST' });
    
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/orders`,
        {
          orderItems: cart.cartItems,
          shippingAddress: cart.shippingAddress,
          payamentMethod: cart.payamentMethod,
          itemsPrice: cart.itemsPrice,
          shippingPrice: cart.shippingPrice,
          taxPrice: cart.taxPrice,
          totalPrice: cart.totalPrice,
        },
        { 
          headers: {
            authorization: `Bearer ${userInfo.token}`
          },
        }
      );

      ctxDispatch({ type: 'CART_CLEAR' });
      dispatch({ type: 'CREATE_SUCCESS' });
      localStorage.removeItem('cartItems');

      navigate(`/order/${data.order._id}`);
    } catch (error) {
      dispatch({ type: 'CREATE_FAIL' });
      toast.error(getError(error));
    }
  }

  useEffect(() => {
    if(!cart.payamentMethod) {
      navigate("payament");
    }
  }, [cart, navigate])
  

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4 />
      <Helmet>
        <title>Visualizar Pedido</title>
      </Helmet>
      <h1 className="my-3">
        Visualizar Pedido
      </h1>
      <Row>
        <Col md={8}>
          <Card className='mb-3'>
            <Card.Body>
              <Card.Title>Shipping</Card.Title>
              <Card.Text>
                <strong>Name:</strong> {cart.shippingAddress.fullName} <br />
                <strong>Address:</strong> {cart.shippingAddress.address},
                {cart.shippingAddress.city}, {cart.shippingAddress.postalCode},
                {cart.shippingAddress.country}
              </Card.Text>
              <Link to="/shipping">Edit</Link>
            </Card.Body>
          </Card>
          
          <Card className='mb-3'>
            <Card.Body>
              <Card.Title>Payament</Card.Title>
              <Card.Text>
                <strong>Method:</strong> {cart.payamentMethod}
              </Card.Text>
              <Link to="/payament">Edit</Link>
            </Card.Body>
          </Card>

          <Card className='mb-3'>
            <Card.Body>
              <Card.Title>Items</Card.Title>
              <ListGroup variant='flush'>
                {cart.cartItems.map((item: any) => (
                  <ListGroup.Item key={item._id}>
                    <Row className='align-items-center'>
                      <Col md={6}>
                        <Image 
                          src={item.image} 
                          alt={item.name} 
                          className="img-fluid rounded img-thumbnail" 
                        /> {' '}
                        <Link to={`/product/${item._slug}`}>
                          {item.name}
                        </Link>
                      </Col>
                      <Col md={3}><span>{item.quantity}</span></Col>
                      <Col md={3}>R${item.price}</Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <Link to="/cart">Edit</Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Order summary</Card.Title>
              <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>Items</Col>
                      <Col>R${cart.itemsPrice.toFixed(2)}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Shipping</Col>
                      <Col>R${cart.shippingPrice.toFixed(2)}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Tax</Col>
                      <Col>R${cart.taxPrice.toFixed(2)}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>
                        <strong>Order Total</strong>
                      </Col>
                      <Col>
                        <strong>R${cart.totalPrice.toFixed(2)}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <div className='d-grid'>
                      <Button
                        type="button"
                        onClick={handlePlaceOrder}
                        disabled={cart.cartItems.length === 0}
                      >
                        Place Order
                      </Button>
                    </div>
                    {loading && <LoadingBox />}
                  </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default PlaceOrder