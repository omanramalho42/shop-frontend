import React, { useContext, useEffect, useState } from 'react'

import { Helmet } from 'react-helmet-async'

import { Store } from '../../context/Store'
import { useNavigate } from 'react-router-dom'

import { Button, Form } from 'react-bootstrap'

import { Container } from '../../styles/ShippingScreen'
import CheckoutSteps from '../../components/CheckoutSteps'

const ShippingScreen:React.FC = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { 
    userInfo,
    cart: { shippingAddress } 
  } = state

  const [fullName, setFullName] = useState(shippingAddress.fullName || "");
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || "");
  const [country, setCountry] = useState(shippingAddress.country || "");

  const navigate = useNavigate();

  useEffect(() => {
    if(!userInfo) {
      navigate("/signin?redirect=/shipping");
    }
  },[userInfo, navigate]);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    ctxDispatch({
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: {
        fullName,
        address,
        city,
        postalCode,
        country
      }
    });

    localStorage.setItem('shippingAddress', JSON.stringify({
      fullName,
      address,
      city,
      postalCode,
      country  
    }));

    navigate("/payament");
  }

  return (
    <div>
      <Helmet>
        <title>Sihpping Address</title>
      </Helmet>

      <CheckoutSteps step1 step2 />
      <Container className="container small-container">
        <h1 className='my-3'>
          Shipping Address
        </h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group className='mb-3' controlId='fullName'>
            <Form.Label>Nome completo</Form.Label>
            <Form.Control 
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className='mb-3' controlId='address'>
            <Form.Label>Endereço</Form.Label>
            <Form.Control 
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Form.Group>

          <Form.Group className='mb-3' controlId='city'>
            <Form.Label>Cidade</Form.Label>
            <Form.Control 
              required
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </Form.Group>

          <Form.Group className='mb-3' controlId='postalCode'>
            <Form.Label>Postal code</Form.Label>
            <Form.Control 
              required
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </Form.Group>

          <Form.Group className='mb-3' controlId='country'>
            <Form.Label>Páis</Form.Label>
            <Form.Control 
              required
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </Form.Group>

          <Button type='submit'>
            Continuar
          </Button>
        </Form>
      </Container>
    </div>
  )
}

export default ShippingScreen