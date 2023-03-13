import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "bootstrap/dist/css/bootstrap.css";
import Image from "react-bootstrap/Image";
import ImageButton from 'react-image-button';

const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2,
      slidesToSlide: 1 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    }
  };

function MultiCaroseul(props) {
    const image1 = <Image
            className='img-fluid shadow-5'
            src= "https://policplantblob.blob.core.windows.net/policplant-banner/banner-1.jpg"
            alt="First slide"
            rounded
            responsive 
            style={{ height:'50%'}}
            />

    const image2 = <Image
            className='img-fluid shadow-4'
            src= "https://policplantblob.blob.core.windows.net/policplant-banner/banner2.jpg"
            alt="Second slide"
            rounded
            style={{ height:'50%'}}
            />
    return (
        <Carousel
            swipeable={false}
            draggable={false}
            showDots={true}
            responsive={responsive}
            ssr={true} // means to render carousel on server-side.
            infinite={true}
            //autoPlay={this.props.deviceType !== "mobile" ? true : false}
            autoPlaySpeed={1000}
            keyBoardControl={true}
            customTransition="all .5"
            transitionDuration={500}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile"]}
            //deviceType={this.props.deviceType}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
            >
            <div style={{padding:'1rem'}}>
                <ImageButton img={image1}
                             zoomOnHover={0}
                             buttonPosition="bottom"
                             alwaysShowButton={true} >
                    <button primary  className="btn success" style={{ border: '2px solid black'}} > Cetinari pogledajte  </button>
                </ImageButton>
            </div>
            <div style={{padding:'1rem'}}>
                <ImageButton img={image2}
                             alwaysShowButton={true}
                             buttonPosition="bottom" >
                    <button primary className="btn success" style={{ border: '2px solid black'}} > Puzavice pogledajte </button>
                </ImageButton>
            </div> 
        </Carousel>
    )
}

export default MultiCaroseul
