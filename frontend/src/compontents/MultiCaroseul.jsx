import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "bootstrap/dist/css/bootstrap.css";
import Image from "react-bootstrap/Image";
import ImageButton from 'react-image-button';
import { useRouter } from 'next/router';
//import useScreenType from "react-screentype-hook";
import 'react-multi-carousel/lib/styles.css';
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';

const responsive = {
    superLargeDesktop: {
    // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 3,
      slidesToSlide: 1 // optional, default to 1.
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
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

    const navigate = useRouter();
    //const screenType = useScreenType();

    const image1 = <Image
            className='img-fluid shadow-5'
            src= "https://policplantblob.blob.core.windows.net/policplant-banner/biljke za senku baner_800x600.jpg"
            alt="First slide"
            rounded
            onClick={() => { navigate.replace('/categories/37')}}
            width='100%'
            
            />
    const image1_mobile = <Image
            className='img-fluid shadow-5'
            src= "https://policplantblob.blob.core.windows.net/policplant-banner/biljke za senku baner_350x250.jpg"
            alt="First slide"
            rounded
            onClick={() => { navigate.replace('/categories/37')}}
            
            />

    const image2 = <Image
            className='img-fluid shadow-4'
            src= "https://policplantblob.blob.core.windows.net/policplant-banner/trajnice baner_800x600.jpg"
            alt="Second slide"
            rounded
            onClick={() => { navigate.replace('/categories/28')}}
            width='100%'
            />

    const image2_mobile = <Image
            className='img-fluid shadow-4'
            src= "https://policplantblob.blob.core.windows.net/policplant-banner/trajnice baner_350x250.jpg"
            alt="Second slide"
            rounded
            onClick={() => { navigate.replace('/categories/28')}}
            style={{ height:'50%'}}
            />

    const image3 = <Image
            className='img-fluid shadow-4'
            src= "https://policplantblob.blob.core.windows.net/policplant-banner/ukrasno zbunje baner_800x600.jpg"
            alt="Third slide"
            rounded
            onClick={() => { navigate.replace('/categories/31')}}
            width='100%'
            />
    
    const image3_mobile = <Image
            className='img-fluid shadow-4'
            src= "https://policplantblob.blob.core.windows.net/policplant-banner/ukrasno zbunje baner_350x250.jpg"
            alt="Third slide"
            rounded
            onClick={() => { navigate.replace('/categories/31')}}
            style={{ height:'50%'}}
            />

    return (
      <div style={{ border: '1px solid green', marginTop:'2rem', borderRadius: '1rem'}}>
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
            removeArrowOnDeviceType={["tablet"]} //, "mobile"]}
            //deviceType={this.props.deviceType}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
            >
            <div style={{padding:'1rem'}}>
                <ImageButton img={!isMobile ? image1 : image1_mobile}
                             //zoomOnHover={0}
                            
                             buttonPosition="bottom"
                             alwaysShowButton={true} >
                    <button onClick={() => { navigate.replace('/categories/37')}} primary="true"  className="btn success" style={{ border: '2px solid black',cursor:'pointer', backgroundColor:'white'}} > Za vaš kutak u senci </button>
                </ImageButton>
            </div>
            <div style={{padding:'1rem'}}>
                <ImageButton img={!isMobile ? image2 : image2_mobile}
                             //zoomOnHover={0}
                             alwaysShowButton={true}
                             buttonPosition="bottom" >
                    <button onClick={() => { navigate.replace('/categories/28')}} primary="true" className="btn success" style={{ border: '2px solid black',cursor:'pointer', backgroundColor:'white'}} > Veliki izbor trajnica </button>
                </ImageButton>
            </div> 
            <div style={{padding:'1rem'}}>
                <ImageButton img={!isMobile ? image3 : image3_mobile}
                             alwaysShowButton={true}
                             buttonPosition="bottom" >
                    <button onClick={() => { navigate.replace('/categories/31')}} primary="true" className="btn success" style={{ border: '2px solid black',cursor:'pointer', backgroundColor:'white'}} >  Neizostavni deo vrta </button>
                </ImageButton>
            </div> 
        </Carousel>
      </div>
    )
}

export default MultiCaroseul
