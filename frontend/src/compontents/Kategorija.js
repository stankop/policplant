
import { Card } from 'react-bootstrap'
import  Link  from 'next/link'
import classes from './Product.module.css'
//import useScreenType from "react-screentype-hook";
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';

function Kategorija({category}) {

  //const screenType = useScreenType();
  return (
    <Card className={`my-1 p-1   ${classes["img/-hover-zoom"]} h-100 `} border="success"  style={ isMobile ? { width: '100%', height: '19rem' } : { width: '100%', height: '22rem' }}>
        <Card.Header as="h6"></Card.Header>
        <Link href={`/categories/${category._id}`}>
            <Card.Img src={category.image} loading='lazy' style={isMobile ? { width: '100%', height: '24vh', objectFit: 'cover' } : { width: '100%', height: '26vh', objectFit: 'cover' }}></Card.Img>
        </Link>
        <Card.Body style={{ textAlign: "center", textDecoration: 'none'}}>
            <Link href={`/categories/${category._id}`}>
             <Card.Title as="div" >
                 <strong style={{ display: 'inline-block', textAlign: "center", fontSize: '1.2rem', color:'#333333'}}>{category.name}</strong>
             </Card.Title>
            </Link>
            
            {/* <Card.Text as="h6" style={{ color:'black', fontSize: '1.1rem'}}>
                    {category.productNumber} proizvoda
            </Card.Text> */}
            {/* <Card.Text as="h7">
                    //{category.countInStock > 0 ? <strong style={{ color:'green'}}>{category.countInStock} proizvoda</strong> : <strong style={{ color:'red'}}>Nema na stanju</strong>} 
            </Card.Text> */}
        </Card.Body>
    </Card>
  )
}

export default Kategorija