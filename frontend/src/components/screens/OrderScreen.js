import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import { PayPalButton } from 'react-paypal-button-v2'
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Form, Row, Col, ListGroup, Image, Card, Button, ListGroupItem } from 'react-bootstrap';
import PaystackPop from '@paystack/inline-js'
import { useDispatch, useSelector } from 'react-redux';
import Message from '../Message';
import Loader from '../Loader'
import { getOrderDetails, payOrder, deliverOrder } from '../../actions/orderActions'
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from '../../constants/orderConstants'

const OrderScreen = () => {
  const { id } = useParams()

  const orderId = id

  const [email, setEmail] = useState('')
  const [amount, setAmount] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  //const [sdkReady, setSdkReady] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const orderDetails = useSelector(state => state.orderDetails)
  const { order, loading, error } = orderDetails

  const orderPay = useSelector((state) => state.orderPay)
  const { loading: loadingPay, success: successPay } = orderPay

  const orderDeliver = useSelector((state) => state.orderDeliver)
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }
  if (!loading) {
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2)
    }

    order.itemsPrice = addDecimals(order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0))
  }

  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    }

    /* const addPayStack = async () => {
      const { data: clientId } = await axios.get('/api/config/paystack')
      console.log(clientId)
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
      script.async = true
      script.onload = () => {
        setSdkReady(true)
      }
      document.body.appendChild(script)
    } */

    if (!order || successPay || successDeliver) {
      dispatch({ type: ORDER_PAY_RESET })
      dispatch({ type: ORDER_DELIVER_RESET })
      dispatch(getOrderDetails(orderId))
    }
  }, [dispatch, orderId, successPay, order, successDeliver, userInfo, navigate])

  /*  const successPaymentHandler = (paymentResult) => {
     console.log(paymentResult)
     dispatch(payOrder(orderId, paymentResult))
   } */
  const payWithPaystack = async (e, paymentResult) => {
    const { data: clientId } = await axios.get('/api/config/paystack')
    e.preventDefault()
    const paystack = new PaystackPop()
    paystack.newTransaction({
      key: clientId,
      amount: amount / 100,
      email,
      firstName,
      lastName,
      onSuccess(transaction) {
        let message = `Paymet Complete! Reference ${transaction.reference}`
        alert(message)
        setEmail("")
        order.isPaid = true
        dispatch(payOrder(orderId, paymentResult))
      },
      onCancel() {
        alert("You have Cancelled the transaction")
      }
    })

  }
  const deliverHandler = () => {
    dispatch(deliverOrder(order))
  }

  return loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : <>
    <h1>Order {order._id}</h1>
    <Row>
      <Col md={8}>
        <ListGroup variant='flush'>
          <ListGroup.Item>
            <h2>Shipping</h2>

            <p> <strong>Name: </strong> {order.user.name}
            </p>
            <p> <strong>Email: </strong> <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
            </p>
            <p>
              <strong>Address: </strong>
              {order.shippingAddress.address}, {order.shippingAddress.city}{' '} {order.shippingAddress.postalCode},{' '} {order.shippingAddress.country}
            </p>
            {order.isDelivered ? <Message variant='success'>Delivered to {order.deliveredAt}</Message> : <Message variant='danger'>Not Delivered</Message>}
          </ListGroup.Item>

          <ListGroup.Item>
            <h2>Payment Method</h2>
            <p> <strong>Method: </strong>
              {order.paymentMethod}
            </p>
            {order.isPaid ? <Message variant='success'>Paid on {order.paidAt}</Message> : <Message variant='danger'>Not Paid</Message>}
          </ListGroup.Item>

          <ListGroup.Item>
            <h2>Order Items</h2>
            {order.orderItems.length === 0 ? <Message>Order is empty</Message> : (
              <ListGroup variant='flush'>
                {order.orderItems.map((item, index) => (
                  <ListGroup.Item key={index}>
                    <Row>
                      <Col md={1}>
                        <Image src={item.image} alt={item.name} fluid rounded />
                      </Col>
                      <Col>
                        <Link to={`/product/${item.product}`}>
                          {item.name}
                        </Link>
                      </Col>
                      <Col md={4}>
                        {item.qty} x ₦{(item.price)} = ₦{numberWithCommas(addDecimals(item.qty * item.price))}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </ListGroup.Item>
        </ListGroup>
      </Col>

      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Order Summary</h2>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>Items</Col>
                <Col>₦{numberWithCommas(order.itemsPrice)}</Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>Shipping</Col>
                <Col>₦{numberWithCommas(addDecimals(order.shippingPrice))}</Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>Tax</Col>
                <Col>₦{numberWithCommas(addDecimals(order.taxPrice))}</Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>Total</Col>
                <Col>₦{numberWithCommas(addDecimals(order.totalPrice))}</Col>
              </Row>
            </ListGroup.Item>
            <br></br>
            {!order.isPaid && (
              <ListGroup.Item>
                {loadingPay && <Loader />}
                {/* <Button amount={order.totalPrice} onClick={payWithPaystack} /> */}
                <Form.Group controlId='email'>
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control className='py-3' type='email' placeholder='Enter email Address' value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
                </Form.Group>
                <br></br>
                <Form.Group controlId='amount'>
                  <Form.Label>Amount</Form.Label>
                  <Form.Control className='py-3' type='fixed' value={amount} onChange={(e) => setAmount(order.totalPrice)}></Form.Control>
                </Form.Group>
                <br></br>
                <Form.Group controlId='email'>
                  <Form.Label>First Name</Form.Label>
                  <Form.Control className='py-3' type='name' placeholder='Enter First name' value={firstName} onChange={(e) => setFirstName(e.target.value)}></Form.Control>
                </Form.Group>
                <br></br>
                <Form.Group controlId='email'>
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control className='py-3' type='name' placeholder='Enter Last name' value={lastName} onChange={(e) => setLastName(e.target.value)}></Form.Control>
                </Form.Group>
                <br></br>
                <div className="d-grid gap-2">
                  <Button type='submit' variant='primary' onClick={payWithPaystack}>
                    Pay
                  </Button>
                </div>
              </ListGroup.Item>
            )}

            {loadingDeliver && <Loader />}
            {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
              <ListGroupItem>
                <div className="d-grid gap-2">
                  <Button type='button' onClick={deliverHandler} variant='primary'>
                    Mark as Delivered
                  </Button>
                </div>
              </ListGroupItem>
            )}
          </ListGroup>
        </Card>
      </Col>
    </Row>
  </>
}

export default OrderScreen