import React, { useState, useContext, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { Button, Form } from 'react-bootstrap'
import { CheckoutSteps } from '../../components'
import { Store } from '../../context/Store'
import { useNavigate } from 'react-router-dom'

const Payament: React.FC = () => {
  const navigate = useNavigate();

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { shippingAddress, payamentMethod },
  } = state;

  const [payamentMethodName, setPayamentMethodName] = useState(
    payamentMethod || "PayPal"
  );

  useEffect(() => {
    if(!shippingAddress.address) {
      navigate('/shipping');
    }
  },[shippingAddress, navigate]);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    ctxDispatch({ type: 'SAVE_PAYAMENT_METHOD', payload: payamentMethodName });
    localStorage.setItem('payamentMethod', payamentMethodName);
    navigate('/placeorder');
  }

  return (
    <div>
      <CheckoutSteps step1 step2 step3/>
      <div className='container small-container'>
        <Helmet>
          <title>Pagamento</title>
        </Helmet>
        <h1>Método de pagamento</h1>
        <div className="my-3">
          <Form onSubmit={handleSubmit}>
            <div className="mb-3">
              <Form.Check 
                type='radio'
                id="PayPal"
                label="PayPal"
                value="PayPal"
                checked={payamentMethodName === 'PayPal'}
                onChange={(e) => setPayamentMethodName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <Form.Check 
                type='radio'
                id="Stripe"
                label="Stripe"
                value="Stripe"
                checked={payamentMethodName === 'Stripe'}
                onChange={(e) => setPayamentMethodName(e.target.value)}
              />
            </div>
            <Button type="submit">
              Continuar
            </Button>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default Payament