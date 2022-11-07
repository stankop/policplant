import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
function Footer() {
  return (
    <footer style={{backgroundColor:'white'}}>
        <Container>
            <Row>
                <Col className="text-center py-3">Copyright &copy; PolicPlant</Col>
            </Row>
        </Container>
    </footer>
  )
}

export default Footer