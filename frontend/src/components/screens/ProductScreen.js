import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button, ListGroupItem } from 'react-bootstrap';
import Rating from '../Rating';
import axios from 'axios'

const ProductScreen = () => {
  const [product, setProduct] = useState({})
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`/api/products/${encodeURIComponent(id)}`)
      setProduct(data)
    }
    fetchProduct()
  }, [id])

  //const product = products.find((p) => p._id === (id))
  return (
    <>
      <Link className='btn btn-outline-primary my-3' to='/'> &lt;Go back</Link>
      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant='flush'>
            <ListGroupItem>
              <h2>{product.name}</h2>
            </ListGroupItem>
            <ListGroupItem>
              <Rating value={product.rating} text={`${product.numReviews} reviews`} />
            </ListGroupItem>
            <ListGroupItem>
              Price: ₦{product.price}
            </ListGroupItem>
            <ListGroupItem>
              Description: {product.description}
            </ListGroupItem>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroupItem>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>{product.price}</strong>
                  </Col>
                </Row>
              </ListGroupItem>

              <ListGroupItem>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    {product.countInStock > 0 ? `In Stock (${product.countInStock})` : 'Out of Stock'}
                  </Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <div className="d-grid gap-2">
                  <Button className='btn-block' type='button' disabled={product.countInStock === 0}>
                    Add to Cart
                  </Button>
                </div>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default ProductScreen