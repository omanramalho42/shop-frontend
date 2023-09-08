import axios from 'axios';
import React, { useContext } from 'react'
import { Button, Card, Col, ListGroup, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { Link, Navigate } from 'react-router-dom';
import { MessageBox } from '../../components';
import { Store } from '../../context/Store';
import { Image } from '../../styles/Cart';
import { useNavigate } from 'react-router-dom';

const Cart: React.FC = () => {
  const { state, dispatch: ctxDispatch } = useContext<any>(Store);
  const { 
    cart: { cartItems }
  } = state;
  const navigate = useNavigate();

  const handleUpdateCart = async (item: any, quantity: number) => {
    const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/products/${item._id}`);
    
    if(data.countInStock < quantity) {
      window.alert("Desculpe o produto esta fora de estoque");
      return;
    }

    ctxDispatch({
      type: 'CART_ADD_ITEM', 
      payload: { ...item, quantity }
    });
  }

  const handleRemoveItemCart = (item: any) => {
    ctxDispatch({ type: 'CART_REMOVE_ITEM', payload: item })
  }

  const handleCheckoutPayament = () => {
    navigate('/signin?redirect=/shipping');
  }

  return (
    <div>
      <Helmet>
        <title>Carrinho de compras</title>
      </Helmet>
      <h1>Carrinho</h1>
      <Row>
        <Col md={8}>
          {cartItems.length === 0 ? (
            <MessageBox>
              Carrinho vazio. <Link to="/">Voltar as compras</Link>
            </MessageBox>
          ) : (
            <ListGroup>
              {cartItems.map((item: any) => (
                <ListGroup.Item key={item._id}>
                  <Row className='align-items-center'>
                    <Col md={4}>
                      <Image
                        src={item.image}
                        alt={item.name}
                        className="img-fluid rounded"
                      />{' '}
                      <Link to={`/product/${item.slug}`}>{item.name}</Link>
                    </Col>
                    <Col md={3}>
                      <Button 
                        variant="light" 
                        disabled={item.quantity === 1}
                        onClick={() => handleUpdateCart(item, item.quantity - 1)}
                      >
                        <i className='fas fa-minus-circle'></i>
                      </Button>{' '}
                      <Button 
                        variant="light" 
                        disabled={item.quantity === item.countInStock}
                        onClick={() => handleUpdateCart(item, item.quantity + 1)}
                      >
                        <i className='fas fa-plus-circle'></i>
                      </Button>{' '}
                    </Col>
                    <Col md={3}>
                      R${item.price}
                    </Col>
                    <Col md={2}>
                      <Button 
                        variant='light'
                        onClick={() => handleRemoveItemCart(item)}
                      >
                        <i className='fas fa-trash'></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>
                    Subtotal ({cartItems.reduce((a: any, c:any) => a + c.quantity, 0)}{' '}items) : R$
                    {cartItems.reduce((a:any, c:any) => a + c.price * c.quantity, 0)}
                  </h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className='d-grid'>
                    <Button
                      type="button"
                      variant="primary"
                      disabled={cartItems.length === 0}
                      onClick={() => handleCheckoutPayament()}
                    >
                      Prosseguir com o pagamento
                    </Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default Cart