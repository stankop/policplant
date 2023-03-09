import Carousel from 'react-bootstrap/Carousel';

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
        <img
          className="d-block w-100"
          src="https://policplantpublic.s3.eu-west-2.amazonaws.com/slika1.jpg"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://policplantpublic.s3.eu-west-2.amazonaws.com/jesenji+izgled.jpg"
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>

      {/* <Carousel.Item>
        <img
          className="d-block w-100"
          src="holder.js/800x400?text=Third slide&bg=20232a"
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item> */}
    </Carousel>
  );
}

export default CarouselFadeExample;