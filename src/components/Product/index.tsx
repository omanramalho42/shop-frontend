import React, { useContext } from 'react'

import { 
  Container,
  Typography,
  Image
} from './styled'

import { Link } from 'react-router-dom'

import { Card, Button } from 'react-bootstrap'

import Rating from '../Rating'

import { ProductsProps } from '../../util/data'

import axios from 'axios'

import { Store } from '../../context/Store'

interface ProductProps {
  product: ProductsProps;
}

const Product = ({ product }: ProductProps) => {
  const { state, dispatch: ctxDispatch } = useContext<any>(Store);
  const { 
    cart: { cartItems }
  } = state;
  
  const handleAddToCart = async (item: any) => {
    const existItem = cartItems.find((item:any) => item._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
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
  return (
    <Container style={{ marginBottom: 20 }}>
      <Card>
        <Link to={`/product/${product.slug}`}>
          <Image
            fluid
            rounded
            thumbnail
            bsPrefix='teste'
            src={product.image} 
            alt={product.name}
            className="card-img-top" 
          />
        </Link>
        <Card.Body>
          <Link to={`/product/${product.slug}`}>
            <Typography>
              { product.name }
            </Typography>
          </Link>
          
          <Rating 
            rating={product.rating} 
            numReviews={product.numReviews} 
          />

          <Card.Text>
            <strong>${ product.price }</strong>
          </Card.Text>
          {product.countInStock === 0 ? (
            <Button variant='light' disabled>
              Fora de estoque
            </Button>
          ) : (
            <Button 
              onClick={() => handleAddToCart(product)}
              style={{ 
                color: '#000', 
                backgroundColor: '#f0c040'
              }}
              
            >
              Adiconar ao carrinho
            </Button>
          )}
        </Card.Body>
      </Card>
    </Container>
  )
}

export default Product