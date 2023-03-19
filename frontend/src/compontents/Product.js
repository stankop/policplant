import React, {useEffect} from 'react'
import { Card, Button } from 'react-bootstrap'
import Rating from './Rating'
import { Link } from 'react-router-dom'
import classes from './Product.module.css'
import {useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import {  addToCart,removeFromCart } from '../store/cart-actions'
import { useParams } from 'react-router';
import WebFont from 'webfontloader';
import '../compontents/Product.css'

function Product({product, catId}) {

    const navigate = useNavigate();
    const dispatch = useDispatch()

    const addToCartHandler = () => {
        
        dispatch(addToCart(Number(product._id), Number(1)));
        navigate(`/cart/?id=${product._id}&qty=${1}`)
    }

    useEffect(() => {
        WebFont.load({
          google: {
            families: ['Poppins', 'Chilanka']
          }
        });
        console.log('CatId:', catId)
    }, [])

  return (
    <Card className={`my-1 p-1 rounded ${classes["img-hover-zoomA"]}`} border="success"  style={{ width: '17.5rem', height: 'auto' }}>
        <Link to={`/products/${product._id}/${catId}`}> 
            <Card.Img src={product.images?.findLast( image => image.order === 0)?.image} loading='lazy' style={{width: '100%', height: '14rem' }}></Card.Img>
            <Card.ImgOverlay style={{width: '95%', height: '14rem' }}>
                {product?.countInStock < 1 && <Card.Title><div style={{ backgroundColor:"red", color:"white", display: 'inline-flex', padding: '4px', marginBottom: '1em'}}>Nema na stanju</div></Card.Title>}
            </Card.ImgOverlay>
            <Card.ImgOverlay className="card-img-overlay d-flex align-items-end flex-column bd-highlight mb-3" style={{width: '100%', height: '14rem' }}>
                {product?.prodajno_mesto && 
                    <Card.Img src='https://policplantblob.blob.core.windows.net/policplant-banner/samo_na_projadnom_mestu1.png' 
                              loading='lazy'
                              style={{width: '40%', height: '50%' }}>
                    </Card.Img>}
            </Card.ImgOverlay> 
        </Link> 
        <Card.Body style={{ textAlign: "center"}}>
            <Link style={{ textDecoration: 'none' }} to={`/products/${product._id}`}> 
             <Card.Title as="h3" >
                 <div className='click' style={{ fontSize: '1rem', color:'#333333', fontFamily: '"Poppins", sans-serif'}}>{product?.name}</div>
                 <div className='click' style={{ fontSize: '1rem', fontStyle: 'italic', color:'#333333', fontFamily: 'Poppins'}}>{product?.botanicki_naziv}</div>
             </Card.Title>
             </Link> 
            {/* <Card.Text as="div">
                <div className="my-3">
                        <Rating value={product.rating} text={`${product.numReviews} komentara`} color={'#f8e825'}></Rating>
                </div>
            </Card.Text> */}
            <Card.Text as="h4" style={{ color:'#83b735', fontSize: '1rem'}}>
                    {product.price} RSD
            </Card.Text>
            {/* <Card.Text as="h6"> */}
                    {/* {product.countInStock > 0 ? <strong style={{ color:'green'}}>Na stanju</strong> : ''}  */}
                    {/* {product.countInStock > 0 ? '' : <strong style={{ color:'red'}}>Nema na stanju</strong>}  */}
            {/* </Card.Text> */}
            <Button     variant="primary" 
                        disabled={product.countInStock < 1} 
                        type='button'
                        style={{background:'#83b735', border:'1px solid #83b735'}}
                        onClick= {addToCartHandler}>
                                Dodaj u Korpu
            </Button>
        </Card.Body>
    </Card>
  )
}

export default Product