import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../Message';
import Loader from '../Loader';
import Meta from '../Meta'
import { register } from '../../actions/userActions';
import FormContainer from '../FormContainer';


const RegisterScreen = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const location = useLocation()

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userRegister = useSelector(state => state.userRegister)
  const { loading, error, userInfo } = userRegister

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [navigate, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Password do not match')
    } else {
      dispatch(register(name, email, password))
    }
  }

  return (
    <FormContainer>
      <Meta title='Sign Up - Best Deals' />
      <h1>Sign Up</h1>
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control className='py-3' type='name' placeholder='Enter Full Name' value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
        </Form.Group>
        <br></br>

        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control className='py-3' type='email' placeholder='Enter email Address' value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
        </Form.Group>

        <br></br>

        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control type='password' placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
        </Form.Group>

        <br></br>

        <Form.Group controlId='confirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type='password' placeholder='Enter password again' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></Form.Control>
        </Form.Group>

        <br></br>

        <div className="d-grid gap-2">
          <Button type='submit' variant='primary'>
            Register
          </Button>
        </div>
      </Form>

      <br></br>

      <Row className='py-3'>
        <Col>
          Have an Account? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Log in</Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default RegisterScreen