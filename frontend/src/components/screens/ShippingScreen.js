import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
//import Loader from '../Loader';
import FormContainer from '../FormContainer';
import CheckoutSteps from '../CheckoutSteps'
import { saveShippingAddress } from '../../actions/cartActions'

const ShippingScreen = () => {

  const cart = useSelector(state => state.cart)
  const { shippingAddress } = cart

  const [address, setAddress] = useState(shippingAddress.address)
  const [city, setCity] = useState(shippingAddress.city)
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
  const [country, setCountry] = useState(shippingAddress.country)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveShippingAddress({ address, city, postalCode, country }))
    navigate('/payment')
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='address'>
          <Form.Label>Address</Form.Label>
          <Form.Control className='py-3' type='address' placeholder='Enter your address' required value={address} onChange={(e) => setAddress(e.target.value)}></Form.Control>
        </Form.Group>
        <br></br>

        <Form.Group controlId='city'>
          <Form.Label>City</Form.Label>
          <Form.Control className='py-3' type='text' placeholder='Enter city' value={city} required onChange={(e) => setCity(e.target.value)}></Form.Control>
        </Form.Group>
        <br></br>

        <Form.Group controlId='postalCode'>
          <Form.Label>PostalCode</Form.Label>
          <Form.Control className='py-3' type='text' placeholder='Enter PostalCode' value={postalCode} required onChange={(e) => setPostalCode(e.target.value)}></Form.Control>
        </Form.Group>
        <br></br>

        <Form.Group controlId='country'>
          <Form.Label>Country</Form.Label>
          <Form.Control className='py-3' type='text' placeholder='Enter Country' value={country} required onChange={(e) => setCountry(e.target.value)}></Form.Control>
        </Form.Group>
        <br></br>

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

export default ShippingScreen