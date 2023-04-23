'use client'
import {useEffect, useState, useRef} from 'react'
import { Card, Button } from 'react-bootstrap'
import Rating from './Rating'
import { Link } from 'next/link'
import classes from './Product.module.css'  
import {useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router';
import {  addToCart,removeFromCart } from '../store/cart-actions'
//import { useParams } from 'react-router';
//import WebFont from 'webfontloader';
//import '../compontents/Product.css'
//import useScreenType from "react-screentype-hook";
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';
import { IKImage, IKVideo, IKContext, IKUpload } from 'imagekitio-react'
import Overlay from 'react-bootstrap/Overlay';
//import { isBrowser } from '@unly/utils';

function Product({product, catId}) {

    //const navigate = useRouter();
    const dispatch = useDispatch()
    
    //const screenType =  useScreenType();
    const [show, setShow] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const target = useRef(null);

    const addToCartHandler = () => {
        
        dispatch(addToCart(Number(product._id), Number(1)));
        setShow(!show)
        setLoading(true)
       // navigate(`/cart/?id=${product._id}&qty=${1}`)
    }


    if(isBrowser){
        const WebFontLoader = require('webfontloader');
        useEffect(() => {
            WebFontLoader.load({
            google: {
                families: ['Poppins', 'Chilanka']
            }
            });
        }, [])

    }
    

  return (
    <Card className={`my-1 p-1 rounded ${classes["img-hover-zoomA"]}`} border="success" style={  isMobile ? {  height: '23.8rem' } : { width: '100%', height: '30rem' }}>
        <Link href={`/products/${product._id}/${catId}`}> 
            <Card.Img src={product.images?.findLast( image => image.order === 0)?.image} loading='lazy' style={isMobile ? { width: '100%', height: '24vh', objectFit: 'cover' } : { width: '100%', height: '18rem', objectFit: 'cover' }}></Card.Img>
            <Card.ImgOverlay style={{width: '100%', height: '10rem' }}>
                {product?.countInStock < 1 && <Card.Title><div style={ isMobile ? { backgroundColor:"red",fontSize:'.8rem', color:"white", width:'50%', display: 'inline-flex', padding: '4px', marginBottom: '1em'} : { backgroundColor:"red", color:"white", display: 'inline-flex', padding: '4px', marginBottom: '1em'}}>Nema na stanju</div></Card.Title>}
            </Card.ImgOverlay>
            <Card.ImgOverlay className="card-img-overlay d-flex align-items-end flex-column bd-highlight mb-3" style={ isMobile ? {width: '100%', height: '12rem' } : {width: '100%', height: '14rem' }}>
                {product?.prodajno_mesto && 
                    <Card.Img src='https://policplantblob.blob.core.windows.net/policplant-banner/samo_na_projadnom_mestu1.png' 
                              loading='lazy'
                              style={{width: '40%', height: '50%' }}>
                    </Card.Img>}
            </Card.ImgOverlay> 
        </Link> 
        <Card.Body style={{ textAlign: "center"}}>
            <Link style={{ textDecoration: 'none' }} href={`/products/${product._id}`}> 
             <Card.Title as="h3" >
                 <div className='click' style={{ fontSize: '1rem', color:'#333333', fontFamily: '"Poppins", sans-serif'}}>{product?.name}</div>
                 <div className='click' style={{ fontSize: '.9rem', fontStyle: 'italic', color:'#333333', fontFamily: 'Poppins'}}>{product?.botanicki_naziv}</div>
             </Card.Title>
             </Link> 
            {/* <Card.Text as="div">
                <div className="my-3">
                        <Rating value={product.rating} text={`${product.numReviews} komentara`} color={'#f8e825'}></Rating>
                </div>
            </Card.Text> */}
            <Card.Text as="h5" style={{ color:'#83b735', fontSize: '1rem'}}>
                    {product.price} RSD
            </Card.Text>
            {/* <Card.Text as="h6"> */}
                    {/* {product.countInStock > 0 ? <strong style={{ color:'green'}}>Na stanju</strong> : ''}  */}
                    {/* {product.countInStock > 0 ? '' : <strong style={{ color:'red'}}>Nema na stanju</strong>}  */}
            {/* </Card.Text> */}
            <Button     variant="primary" 
                        disabled={product.countInStock < 1} 
                        type='button'
                        style={isMobile ? {background:'#83b735', width:'80%', height:'35%', border:'1px solid #83b735'} : {background:'#83b735', width:'70%', height:'36%', border:'1px solid #83b735'}}
                        onClick= {addToCartHandler}
                        ref={target}>
                               { !isLoading ? 'Dodaj u Korpu' : 'Dodato u korpu'}
            </Button>
            <Overlay target={target.current} show={show} placement="right">
                {({
                placement: _placement,
                arrowProps: _arrowProps,
                show: _show,
                popper: _popper,
                hasDoneInitialMeasure: _hasDoneInitialMeasure,
                ...props
                }) => (
                <div
                    {...props}
                    style={{
                    position: 'absolute',
                    backgroundColor: 'green',
                    padding: '2px 10px',
                    color: 'white',
                    borderRadius: 3,
                    ...props.style,
                    }}
                >
                    Biljka dodata u korpu...
                </div>
                )}
            </Overlay>
        </Card.Body>
    </Card>
  )
}

export default Product