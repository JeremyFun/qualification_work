import React from 'react'
import {Col, Container, Row} from "react-bootstrap"

const FormContainer = ({ children }) => {
  return (
      <Container>
        <Row className="justify-content-md-center" style={{marginTop: "3rem"}}>
          <Col xs={12} md={6}>
            {children}
          </Col>
        </Row>
      </Container>
  )
}

export default FormContainer