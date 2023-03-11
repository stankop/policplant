import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';

function CarouselFadeExample() {

    const slike = [
        { 
            id: 1,
            src: 'https://policplantpublic.s3.eu-west-2.amazonaws.com/slika1.jpg',
            name: 'amazonska suma'
        },
        {
            id:2,
            src: 'https://policplantpublic.s3.eu-west-2.amazonaws.com/jesenji+izgled.jpg',
            name: 'borova suma'
        }]
  return (
    <Carousel fade>
      <Carousel.Item>
        <div>
          <img
            className="d-block w-100" 
            src="https://policplantpublic.s3.eu-west-2.amazonaws.com/slika1.jpg"
            alt="First slide"
          />
        </div>
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <div>
          <img
            className="d-block w-100" 
            src="https://policplantpublic.s3.eu-west-2.amazonaws.com/jesenji+izgled.jpg"
            alt="Second slide"
          />
        </div>
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselFadeExample;