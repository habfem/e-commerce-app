import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../Message';
import Loader from '../Loader';
import { listProductDetails, updateProduct } from '../../actions/productActions';
import FormContainer from '../FormContainer';
import { PRODUCT_UPDATE_RESET } from '../../constants/productConstants';

const ProductEditScreen = () => {
  const { id } = useParams();

  const productId = id;

  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [description, setDescription] = useState('')


  const dispatch = useDispatch()
  const navigate = useNavigate()

  const productDetails = useSelector(state => state.productDetails)
  const { loading, error, product } = productDetails

  const productUpdate = useSelector(state => state.productUpdate)
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET })
      navigate(`/admin/productlist`)
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId))
      } else {
        setName(product.name)
        setPrice(product.price)
        setImage(product.image)
        setBrand(product.brand)
        setCategory(product.category)
        setCountInStock(product.countInStock)
        setDescription(product.description)
      }
    }
  }, [dispatch, navigate, productId, product, successUpdate])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateProduct({
      _id: productId,
      name,
      price,
      image,
      brand,
      category,
      description,
      countInStock,
    }))
  }

  return (
    <>
      <Link to='/admin/productlist' className='btn btn-outline-primary my-3'>
        &lt; Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control className='py-3' type='name' placeholder='Enter Full Name' value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
            </Form.Group>
            <br></br>

            <Form.Group controlId='price'>
              <Form.Label>Price</Form.Label>
              <Form.Control className='py-3' type='number' placeholder='Enter price' value={price} onChange={(e) => setPrice(e.target.value)}></Form.Control>
            </Form.Group>

            <br></br>

            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control className='py-3' type='text' placeholder='Enter image url' value={image} onChange={(e) => setImage(e.target.value)}></Form.Control>
            </Form.Group>

            <br></br>

            <Form.Group controlId='brand'>
              <Form.Label>Brand</Form.Label>
              <Form.Control className='py-3' type='text' placeholder='Enter brand' value={brand} onChange={(e) => setBrand(e.target.value)}></Form.Control>
            </Form.Group>

            <br></br>

            <Form.Group controlId='countInStock'>
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control className='py-3' type='number' placeholder='Enter countInStock' value={countInStock} onChange={(e) => setCountInStock(e.target.value)}></Form.Control>
            </Form.Group>

            <br></br>

            <Form.Group controlId='category'>
              <Form.Label>Category</Form.Label>
              <Form.Control className='py-3' type='text' placeholder='Enter category' value={category} onChange={(e) => setCategory(e.target.value)}></Form.Control>
            </Form.Group>

            <br></br>

            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control className='py-3' type='text' placeholder='Enter description' value={description} onChange={(e) => setDescription(e.target.value)}></Form.Control>
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

export default ProductEditScreen