import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Form, Button, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
//import Loader from '../Loader';
import FormContainer from '../FormContainer';
import CheckoutSteps from '../CheckoutSteps'
import { savePaymentMethod } from '../../actions/cartActions'

const PaymentScreen = () => {

  const cart = useSelector(state => state.cart)
  const { shippingAddress } = cart

  const dispatch = useDispatch()
  const navigate = useNavigate()

  if (!shippingAddress) {
    Navigate('/shipping')
  }

  const [paymentMethod, setPaymentMethod] = useState('PayPal')

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    navigate('/placeorder')
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as='legend'>Select Method</Form.Label>
          <br></br>
          <Col>
            <Form.Check type='radio' label='PayPal or Card Payment' id='PayPal' name='paymentMethod' value='Paypal' checked onChange={(e) => setPaymentMethod(e.target.value)}></Form.Check>
            <br></br>
            <Form.Check type='radio' label='E-naira' id='Stripe' name='paymentMethod' disabled value='E-naira' onChange={(e) => setPaymentMethod(e.target.value)}></Form.Check>
          </Col>
        </Form.Group>
        <div className="d-grid gap-2">
          <Button type='submit' variant='primary'>
            Continue
          </Button>
        </div>
      </Form>

      <br></br>

    </FormContainer>
  )
}

export default PaymentScreen