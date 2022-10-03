import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
  return (
    <footer>
      <hr></hr>
      <Container>
        <Row>
          <h4 className='text-center py-3'>CONTACT FOR SUPPORT</h4>
          <Col>
            <a href="mailto:freshoutgadget@gmail.com" className="btn btn-outline-primary my-3"><i className="fas fa-at"></i> Send an mail</a>
          </Col>
          <Col>
            <a href="tel:+2349133968613" className="btn btn-outline-primary my-3"><i className="fas fa-mobile-alt"></i> Call US</a>
          </Col>
          <Col>
            <a href="https://twitter.com/freshoutgadgets" target="_blank" rel='noreferrer' className="btn btn-outline-primary my-3"><i className="fab fa-twitter"></i> Twitter</a>
          </Col>
          <Col>
            <a href="https://instagram.com/freshoutgadgets" target="_blank" rel='noreferrer' className="btn btn-outline-primary my-3"><i className="fab fa-instagram"></i> Instagram</a>
          </Col>
        </Row>
        <hr></hr>
        <Row>
          <Col className='text-center py-3'>
            Copyright &copy; Freshout Gadgets
          </Col>
        </Row>
      </Container>

    </footer>
  )
}

export default Footer