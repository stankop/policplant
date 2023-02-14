import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import GoogleMap from './UI/GoogelMap'

const location = {
  address: 'Prnjavorska 114, Budisava',
  lat: 45.27563,
  lng: 19.99407,
}

function Footer() {
  return (
    <footer style={{backgroundColor:'white'}}>
        <Container>
            <Row>
                <Col className="text-center py-3">Copyright &copy; Rasadnik Ema</Col>
                {/* <GoogleMap location={location} zoomLevel={17} />  */}

            </Row>
            <Row>
              <Col>
                <h6>Korisni linkovi</h6>
                <h5>Kako poručiti putem sajta</h5>
                <h5>Izrada plana sadnje</h5>
                <h5>Najčešća pitanja</h5>
                <h5>Način plaćanja</h5>
                <h5>Isporuka</h5>
              </Col>
            </Row>
        </Container>
    </footer>
  )
}

export default Footer