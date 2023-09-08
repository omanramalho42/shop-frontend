import React, { useEffect, useReducer, useContext } from 'react'

import axios from 'axios'

import { useParams } from 'react-router-dom'

import { Image } from '../../styles/ProductScreen'

import { Col, Row, ListGroup, Card, Badge, Button } from 'react-bootstrap'

import { LoadingBox, MessageBox, Rating } from '../../components'

import { Store } from '../../context/Store'

import { Helmet } from 'react-helmet-async'

import { getError } from '../../util/utils'

import { useNavigate } from 'react-router-dom'

const reducer = (state: any, action: any) => {
  switch(action.type) {
    case 'FETCH_REQUEST':
      return {...state, loading: true}
    case 'FETCH_SUCCESS':
      return {...state, product: action.payload, loading: false}
    case 'FETCH_FAIL':
      return {...state, loading: false, error: action.payload}
    default:
      return state
  }
}

const ProductScreen = () => {
  const params = useParams();
  const { slug } = params;
  const navigate = useNavigate();

  const { state, dispatch: ctxDispatch } = useContext<any>(Store);
  const { userInfo, cart } = state;

  const [{loading, error, product}, dispatch] = useReducer(reducer, {
    product: {},
    loading: true,
    error: ''
  });

  useEffect(() => {
    const fetchDataProducts = async () => {
      dispatch({ type: 'FETCH_REQUEST' })

      await axios.get(`${process.env.REACT_APP_API_URL}/api/products/slug/${slug}`,
        { headers: { authorization: `Bearer ${userInfo.token}` }
      }).then((res) => {
        dispatch({ type: 'FETCH_SUCCESS', payload: res.data })
      }).catch((error) => dispatch({ type: 'FETCH_FAIL', payload: getError(error) }))
    }

    fetchDataProducts();
  },[slug])
  
  const handleAddItemCart = async () => {
    const existItem = cart.cartItems.find(
      (item: any) => item._id === product._id
    );
    
    const quantity = 
      existItem 
      ? existItem.quantity + 1 
      : 1;

    const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/products/${product._id}`);
    
    if(data.countInStock < quantity) {
      window.alert("Desculpe o produto esta fora de estoque");
      return;
    }

    ctxDispatch({
      type: 'CART_ADD_ITEM', 
      payload: { ...product, quantity }
    })

    navigate('/cart');
  }

  return (
    loading ? (
      <LoadingBox />
    ) : error ? (
      <MessageBox variant="danger">
        { error }
      </MessageBox>
    ) : (
      <div>
        <Row>
          <Col md={6}>
            <Image 
              src={product.image} 
              alt={product.name} 
            />
          </Col>
          <Col md={3}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Helmet>
                  <title>{product.name}</title>
                </Helmet>
                <h1>{product.name}</h1>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating 
                  rating={product.rating} 
                  numReviews={product.numReviews}
                />
              </ListGroup.Item>
              <ListGroup.Item>
                Preço : R${product.price}
              </ListGroup.Item>
              <ListGroup.Item>
                Descrição : {product.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <Card.Body>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col> Preço: </Col>
                      <Col> R${product.price} </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col> Status: </Col>
                      <Col> 
                        {product.countInStock > 0 ? (
                          <Badge bg="success">
                            Em estoque
                          </Badge>
                        ) : (
                          <Badge bg="danger">
                            Fora de estoque
                          </Badge>
                        )} 
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <div className='d-grid'>
                      <Button variant='primary' onClick={handleAddItemCart}>
                        Adicionar ao carrinho
                      </Button>
                      </div>
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

export default ProductScreen