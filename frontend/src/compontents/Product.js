import React from 'react'
import { Card } from 'react-bootstrap'
import Rating from './Rating'
import { Link } from 'react-router-dom'
import classes from './Product.module.css'

function Product({product}) {
  return (
    <Card className={`my-3 p-3 rounded ${classes["img-hover-zoom"]}`} border="primary" style={{ width: '18rem', height: '30rem' }}>
        <Link to={`/products/${product._id}`}>
            <Card.Img src={product.image}></Card.Img>
        </Link>
        <Card.Body style={{ textAlign: "center"}}>
            <Link to={`/products/${product._id}`}>
             <Card.Title as="div" >
                 <strong style={{ fontSize: 28}}>{product.name}</strong>
             </Card.Title>
            </Link>
            {/* <Card.Text as="div">
                <div className="my-3">
                        <Rating value={product.rating} text={`${product.numReviews} komentara`} color={'#f8e825'}></Rating>
                </div>
            </Card.Text> */}
            <Card.Text as="h3" style={{ color:'black'}}>
                    {product.price} din
            </Card.Text>
            <Card.Text as="h7">
                    {product.countInStock > 0 ? <strong style={{ color:'green'}}>{product.countInStock} proizvoda</strong> : <strong style={{ color:'red'}}>Nema na stanju</strong>} 
            </Card.Text>
        </Card.Body>
    </Card>
  )
}

export default Product