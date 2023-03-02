import React from 'react'
import { Card } from 'react-bootstrap'
import Rating from './Rating'
import { Link } from 'react-router-dom'
import classes from './Product.module.css'

function Product({product}) {
  return (
    <Card className={`my-1 p-1 rounded ${classes["img-hover-zoomA"]}`} border="primary"  style={{ width: '17.5rem', height: '21.5rem' }}>
        <Link to={`/products/${product._id}`}>
            <Card.Img src={product.images?.findLast( image => image.order === 0)?.image} style={{width: '100%', height: '14rem' }}></Card.Img>
            <Card.ImgOverlay>
                {product?.countInStock < 1 && <Card.Title><div style={{ backgroundColor:"red", color:"white", display: 'inline-flex', padding: '5px', marginBottom: '1em'}}>Nema na stanju</div></Card.Title>}
            </Card.ImgOverlay>
        </Link>
        <Card.Body style={{ textAlign: "center"}}>
            <Link to={`/products/${product._id}`}>
             <Card.Title as="div" >
                 <strong style={{ fontSize: '1.2rem'}}>{product.name}</strong>
             </Card.Title>
            </Link>
            {/* <Card.Text as="div">
                <div className="my-3">
                        <Rating value={product.rating} text={`${product.numReviews} komentara`} color={'#f8e825'}></Rating>
                </div>
            </Card.Text> */}
            <Card.Text as="h4" style={{ color:'black', fontSize: '1.4rem'}}>
                    {product.price} rsd
            </Card.Text>
            {/* <Card.Text as="h6"> */}
                    {/* {product.countInStock > 0 ? <strong style={{ color:'green'}}>Na stanju</strong> : ''}  */}
                    {/* {product.countInStock > 0 ? '' : <strong style={{ color:'red'}}>Nema na stanju</strong>}  */}
            {/* </Card.Text> */}
        </Card.Body>
    </Card>
  )
}

export default Product