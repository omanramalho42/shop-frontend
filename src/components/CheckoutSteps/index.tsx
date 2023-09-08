import React from 'react'

import { Col, Row } from 'react-bootstrap'

const CheckoutSteps = (props: any) => {
  return (
    <Row className="checkout-steps my-2">
      <Col className={props.step1 ? 'active' : ''}>
        Sign-In
      </Col>
      <Col className={props.step2 ? 'active' : ''}>
        Shipping
      </Col>
      <Col className={props.step3 ? 'active' : ''}>
        Payament
      </Col>
      <Col className={props.step4 ? 'active' : ''}>
        Place Order
      </Col>
    </Row>
  )
}

export default CheckoutSteps