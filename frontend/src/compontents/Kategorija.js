import React from 'react'
import { Card } from 'react-bootstrap'
import Rating from './Rating'
import { Link } from 'react-router-dom'
import classes from './Product.module.css'

function Kategorija({category}) {
  return (
    <Card className={`my-1 p-1  ${classes["img/-hover-zoom"]} h-100 `} border="dark"  style={{ width: '18rem', height: '25rem' }}>
        <Card.Header as="h7"></Card.Header>
        <Link to={`/categories/${category._id}`}>
            <Card.Img src={category.image}></Card.Img>
        </Link>
        <Card.Body style={{ textAlign: "center"}}>
            <Link to={`/categories/${category._id}`}>
             <Card.Title as="div" >
                 <strong style={{ fontSize: '1.6rem'}}>{category.name}</strong>
             </Card.Title>
            </Link>
            
            <Card.Text as="h7" style={{ color:'black', fontSize: '1.1rem'}}>
                    {category.productNumber} proizvoda
            </Card.Text>
            {/* <Card.Text as="h7">
                    //{category.countInStock > 0 ? <strong style={{ color:'green'}}>{category.countInStock} proizvoda</strong> : <strong style={{ color:'red'}}>Nema na stanju</strong>} 
            </Card.Text> */}
        </Card.Body>
    </Card>
  )
}

export default Kategorija