import React, { useEffect, useRef} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
//import { Carousel, Image} from 'react-bootstrap'
import Loader from './Loader'
import Message from './Message'
import { caruselTop } from '../store/carusel-actions'
import {
    MDBCarousel,
    MDBCarouselItem,
  } from 'mdb-react-ui-kit';
import "react-responsive-carousel/lib/styles/carousel.min.css"
import {  Image} from 'react-bootstrap'

import { Rerousel } from 'rerousel';

function MDBCarusel( {itemRef}) {

    const dispatch = useDispatch()
    const productTop = useSelector(state => state.carusel)
    const { loading, error, products} = productTop
    
    const slike = [
        { 
            id: 1,
            src: 'https://policplantpublic.s3.eu-west-2.amazonaws.com/ogrod-angielski-sciezka.png',
            name: 'amazonska suma'
        },
        {
            id:2,
            src: 'https://policplantpublic.s3.eu-west-2.amazonaws.com/jesenji+izgled.jpg',
            name: 'borova suma'
        }]
    useEffect(() => {
        //dispatch(caruselTop())
    }, [dispatch])
  return (
    
    loading ? <Loader></Loader> 
            : error ? <Message variant='danger'>

            </Message>
            : (
                <Rerousel itemRef={itemRef} interval={5000}>
                {slike.map((c) => {
                    return <Image key={c.id} src={c.src} ref={itemRef} fluid  rounded   style={{ offsetPosition: 'auto', position: 'relative' , right:'1.4rem',  width:'100%',
                        height: '28rem', objectFit:'fill', margin:'auto', padding:'0.2rem 0.8rem'}}/>
                })}
                </Rerousel>
            )
  )
}

export default MDBCarusel