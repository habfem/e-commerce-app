import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../Message';
import Loader from '../Loader';
import { getUserDetails } from '../../actions/userActions';
import FormContainer from '../FormContainer';


const UserEditScreen = () => {
  const { id } = useParams();

  const userId = id;
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)


  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userDetails = useSelector(state => state.userDetails)
  const { loading, error, user } = userDetails


  useEffect(() => {
    if (!user.name || user._id !== userId) {
      dispatch(getUserDetails(userId))
    } else {
      setName(user.name)
      setEmail(user.email)
      setIsAdmin(user.isAdmin)
    }
  }, [dispatch, user, userId])

  const submitHandler = (e) => {
    e.preventDefault()
  }

  return (
    <>
      <Link to='/admin/userlist' className='btn btn-outline-primary my-3'>
        &lt; Go Back
      </Link>

      <FormContainer>
        <h1>Edit User</h1>
        {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
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

            <Form.Group controlId='isAdmin'>
              <Form.Check type='checkbox' label='is Admin' checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)}></Form.Check>
            </Form.Group>

            <br></br>

            <div className="d-grid gap-2">
              <Button type='submit' variant='primary'>
                Update
              </Button>
            </div>
          </Form>
        )}

      </FormContainer>
    </>

  )
}

export default UserEditScreen