import React from 'react'
import  {useEffect} from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import GoogleMap from './UI/GoogelMap'
import Image from 'react-bootstrap/Image'
import WebFont from 'webfontloader';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../compontents/Footer.css'

const location = {
  address: 'Prnjavorska 114, Budisava',
  lat: 45.27563,
  lng: 19.99407,
}

function Footer() {

  const image = 'https://policplantblob.blob.core.windows.net/policplant-container/veliki logo verzija 1.0.png'

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Poppins', 'Chilanka']
      }
    });
  }, [])

  return (
    <footer style={{backgroundColor:'white'}}>
        <Container>
            <hr></hr>
            {/* <Row>
                <Col className="text-center py-3">Copyright &copy; Rasadnik Ema</Col>
                <GoogleMap location={location} zoomLevel={17} />  

            </Row> */}
            <Row>
              <Col style={{ }}>
                <Image xs={6} md={4} src={image}
                       
                       fluid
                       responsive='true'
                       style={{width:'50%', height:'auto', objectFit:'fill'}}  >
                       
                </Image>
                <div>
                  Adresa: Prnjavorska 114, Budisava
                </div>
                <div>
                  Telefon: 0652077257
                </div>
                <div>
                  Email: emapolic021@gmail.com
                </div>
                <div style={{padding:'.5rem'}}>
                    
                    <a href='https://www.facebook.com/rasadnikema ' style={{margin:'0.5rem' }} title="Face">
                            <i className="fa-brands fa-facebook fa-2x"></i>
                    </a>
                    {/* <a href='https//:' style={{margin:'0.3rem'}} TITLE="Twitter">
                            <i class="fa-brands fa-twitter"></i>
                    </a> */}
                    <a href='https//:' style={{margin:'0.3rem'}} TITLE="Instagram">
                            <i className="fa-brands fa-instagram fa-2x"></i>
                    </a>
                    {/* <a href='https//:' style={{margin:'0.3rem'}} TITLE="Messenger">
                            <i class="fa-brands fa-facebook-messenger"></i>
                    </a>
                    <a href='https//:' style={{margin:'0.3rem'}} TITLE="Mail">
                            <i class="fa-regular fa-envelope"></i>
                    </a> */}
                </div>
              </Col>
              <Col style={{margin:'2rem', paddingTop:'2rem'}}>
                <h4 style={{ fontSize: '1.2rem', color:'#333333', fontFamily: '"Poppins", sans-serif', marginBottom:'1.2rem'}}><strong>Korisni linkovi</strong></h4>
                <Link to="/porucivanje" style={{ textDecoration: 'none' }}>
                  <h5 className='click' style={{ fontSize: '1rem', color:'#333333', fontFamily: '"Poppins", sans-serif'}}>Kako poručiti putem sajta</h5>
                </Link>
                <h5 style={{ fontSize: '1rem', color:'#333333', fontFamily: '"Poppins", sans-serif'}}>Izrada plana sadnje</h5>
                <h5 style={{ fontSize: '1rem', color:'#333333', fontFamily: '"Poppins", sans-serif'}}>Najčešća pitanja</h5>
                <h5 style={{ fontSize: '1rem', color:'#333333', fontFamily: '"Poppins", sans-serif'}}>Način plaćanja</h5>
                <Link to="/isporuka" style={{ textDecoration: 'none' }}>
                  <h5 className='click' style={{ fontSize: '1rem', color:'#333333', fontFamily: '"Poppins", sans-serif'}}>Isporuka</h5>
                </Link>
              </Col>
            </Row>
            <Row>
                <Col className="text-center py-3">Copyright &copy; Rasadnik Ema</Col>
                {/* <GoogleMap location={location} zoomLevel={17} />  */}

            </Row>
        </Container>
    </footer>
  )
}

export default Footer