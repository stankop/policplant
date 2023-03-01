import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card, Form} from 'react-bootstrap'
import Rating from '../compontents/Rating'
import Loader from '../compontents/Loader'
import Message from '../compontents/Message'
import { useParams } from 'react-router';
import {useDispatch, useSelector } from 'react-redux'
import {  productDetails } from '../store/product-actions'
import {  addToCart,removeFromCart } from '../store/cart-actions'
import { LinkContainer } from 'react-router-bootstrap'
import WebFont from 'webfontloader';


import {  createReview } from '../store/review-actions'
import { reviewCreateActions } from '../store/review-slice'
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import HomeIcon from '@mui/icons-material/Home';
import ImageZoom from "react-image-zooom";
import '../../node_modules/react-image-gallery/styles/css/image-gallery.css';
import ImageGallery from 'react-image-gallery';

function ProductScreen({match}) {
    
  const { id } = useParams();
  
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);

  const dispatch = useDispatch()

  const userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin

  const productDet = useSelector(state => state.product)
  const {loading, error, product} = productDet


  useEffect(()=>{
        WebFont.load({
        google: {
          families: ['Droid Sans', 'Chilanka']
            }
        });
       dispatch(productDetails(id))
       return () => {}
        
  }, [dispatch, id]);


  const addToCartHandler = () => {
      dispatch(addToCart(Number(id), Number(qty)));
      console.log(`Add to cart where id: ${ id } and ${ qty }`)
      navigate(`/cart/?id=${id}&qty=${qty}`)
  }


  useEffect(() => {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
      })
    }, [])
  
 const images = product?.images?.map(image => {
    return {
        original: image.image,
        thumbnail: image.image
    }
 })
  return (
    <div style={{height:'100%'}}>
        <Breadcrumb style={{ paddingTop:'2rem'}}>
          <Breadcrumb.Item href="/#/"><i className="fa fa-home"></i></Breadcrumb.Item>
          <Breadcrumb.Item href={`#/categories/${product?.category?.map(x => x._id)[0]}`}>
                
          { product?.category?.map(x => x.name)[0]}
          </Breadcrumb.Item>
          <Breadcrumb.Item active>
            { product?.name}
          </Breadcrumb.Item>
        </Breadcrumb>
        <Link to={-1} className='btn btn-primary my-3'> Nazad</Link>
        {userInfo && <Link to={`/admin/product/${id}/edit`} className='btn btn-primary my-3' style={{ marginLeft:'3rem'}}> Edit Biljke</Link>}

        {loading ? 
                 <Loader></Loader>
                : error 
                ? <Message variant='danger'>{error}</Message>
                :(  
                    <div>
                        <Row >
                                <Col  sm={12} md={6} lg={4} xl={5} xs={6} >
                                    <Row>
                                    
                                    {/* {image && <ImageZoom src={image} alt={product.name} zoom="150" fluid>

                                    </ImageZoom>} */}
                                     {images && <ImageGallery items={images}
                                     
                                     lazyLoad={true}
                                      />}
                                    
                                    </Row>
                                    {/* <Row className="justify-content-md-left">
                                    {product?.images?.map(img => (
                                        <Col key={img.id} sm={4} md={4} lg={4} xl={3} xs={6} className="d-flex">
                                            <Image src={img.image} alt={img.id} fluid className="square border border-3">

                                            </Image>
                                        </Col>
                                    ))}
                                    </Row> */}
                                </Col>
                                <Col sm={12} md={6} lg={8} xl={7} xs={6}>
                                    <ListGroup variant='flush'>
                                        <ListGroup.Item>
                                            <h2><strong style={{ fontSize:'2.8rem', fontFamily: 'Oswald, sans-serif'}}>{product.name}</strong> <i style={{fontSize:'1.4rem'}}>{product.botanicki_naziv}</i></h2> 
                                        </ListGroup.Item>
                                        <ListGroup.Item >
                                            <strong style={{ color:'#228B22', fontSize:30 }}>{product.price} rsd</strong> 
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            <strong>Kategorija:</strong> {product.category?.map(x => x.name).join(', ')}
                                        </ListGroup.Item>

                                        {product.color && <ListGroup.Item>
                                            <strong>Boja:</strong> {product.color}
                                        </ListGroup.Item>}

                                        {/* {product.mesto_sadnje && <ListGroup.Item>
                                            <strong>Položaj:</strong> {product.mesto_sadnje}
                                        </ListGroup.Item>} */}
                                        {product.mesto_sadnje?.length > 0 && <ListGroup.Item>
                                            <strong>Položaj:</strong> {Array.isArray(product.mesto_sadnje) ? product.mesto_sadnje?.join(', ') : product.mesto_sadnje}
                                        </ListGroup.Item>}

                                        {product.place_of_planting && <ListGroup.Item>
                                            <strong>Mesto sadnje:</strong> {product.place_of_planting}
                                        </ListGroup.Item>}

                                        {product.vre_cve?.length > 0 && <ListGroup.Item>
                                            <strong>Vreme cvetanja:</strong> {Array.isArray(product.vre_cve) ? product.vre_cve?.join(', ') : product.vre_cve}
                                        </ListGroup.Item>}

                                        {product.orezivanje && <ListGroup.Item>
                                            <strong>Orezivanje:</strong> {product.orezivanje}
                                        </ListGroup.Item>}

                                        {product.high && <ListGroup.Item>
                                            <strong>Visina biljke:</strong> {product.high}
                                        </ListGroup.Item>}
                                        {product.type_of_plant && <ListGroup.Item>
                                            <strong>Tip biljke:</strong> {product.type_of_plant}
                                        </ListGroup.Item>}
                                        {product.privlaci_insekte && <ListGroup.Item>
                                            <strong> Medonosna:</strong> {product.privlaci_insekte}
                                        </ListGroup.Item>}
                                        {product.brzina_rasta && <ListGroup.Item>
                                            <strong> Brzina rasta:</strong> {product.brzina_rasta}
                                        </ListGroup.Item>}
                                        {product.prezimljava && <ListGroup.Item>
                                            <strong> Prezimljava:</strong> {product.prezimljava}
                                        </ListGroup.Item>}
                                        {product.sirina_biljke && <ListGroup.Item>
                                            <strong> Sirina:</strong> {product.sirina_biljke}
                                        </ListGroup.Item>}
                                        {product.velicina_slanja && <ListGroup.Item>
                                            <strong> Isporuka:</strong> {product.velicina_slanja}
                                        </ListGroup.Item>}
                                        <ListGroup.Item>
                                            
                                                
                                                 <Col sm={12} md={6} lg={4} xl={6} xs={12}>
                                                    <Card>
                                                    <Card.Title style={{ textAlign:'center', color:'black'}}>Kupovina</Card.Title>
                                                        <ListGroup variant='flush' >
                                                            {/* <ListGroup.Item>
                                                                <Row>
                                                                    <Col>
                                                                        Cena:
                                                                    </Col>
                                                                    <Col>
                                                                        <strong>{product.price} rsd</strong>
                                                                    </Col>
                                                                </Row>
                                                            </ListGroup.Item> */}
                                                            {/* <ListGroup.Item>
                                                                <Row>
                                                                    <Col>
                                                                        Status:
                                                                    </Col>
                                                                    <Col>
                                                                        <div style={{ 
                                                                                        color: `${ product.countInStock > 0 ? 'green' : 'red'}`,
                                                                                        fontSize: 20
                                                                                    }}>
                                                                            { product.countInStock > 0 ? 'Na stanju' : 'Nema na stanju'}
                                                                        </div>
                                                                    </Col>
                                                                </Row>
                                                            </ListGroup.Item> */}

                                                            {product.countInStock > 0 && (
                                                                <ListGroup.Item>
                                                                    <Row>
                                                                        <Col>Kolicina:</Col>
                                                                        <Col xs='auto' className='my-1'>
                                                                            <Form.Control 
                                                                                as='select'
                                                                                value={qty} 
                                                                                onChange={(e) => setQty(Number(e.target.value)) }>
                                                                                    {
                                                                                        [...Array(product.countInStock).keys()].map((x) => (
                                                                                            <option key={x +1} value={x +1}>
                                                                                                {x+1}
                                                                                            </option>
                                                                                        ))
                                                                                    }

                                                                            </Form.Control>
                                                                        </Col>
                                                                    </Row>
                                                                </ListGroup.Item>
                                                            )}

                                                            <ListGroup.Item>
                                                                <Button 
                                                                    className='btn btn-block' 
                                                                    disabled={product.countInStock === 0} 
                                                                    type='button'
                                                                    onClick= {addToCartHandler}>
                                                                        Dodaj u Korpu
                                                                </Button>
                                                            </ListGroup.Item>
                                                        </ListGroup>
                                                    </Card>

                                                </Col>
                                               
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Col>
                                {/* <Col sm={12} md={6} lg={4} xl={3} xs={12}>
                                    <Card>
                                    <Card.Title style={{ textAlign:'center', color:'black'}}>Kupovina</Card.Title>
                                        <ListGroup variant='flush' >
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>
                                                        Cena:
                                                    </Col>
                                                    <Col>
                                                        <strong>{product.price} rsd</strong>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>
                                                        Status:
                                                    </Col>
                                                    <Col>
                                                        <div style={{ 
                                                                        color: `${ product.countInStock > 0 ? 'green' : 'red'}`,
                                                                        fontSize: 20
                                                                    }}>
                                                            { product.countInStock > 0 ? 'Na stanju' : 'Nema na stanju'}
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>

                                            {product.countInStock > 0 && (
                                                <ListGroup.Item>
                                                    <Row>
                                                        <Col>Kolicina:</Col>
                                                        <Col xs='auto' className='my-1'>
                                                            <Form.Control 
                                                                 as='select'
                                                                 value={qty} 
                                                                 onChange={(e) => setQty(Number(e.target.value)) }>
                                                                     {
                                                                         [...Array(product.countInStock).keys()].map((x) => (
                                                                             <option key={x +1} value={x +1}>
                                                                                 {x+1}
                                                                             </option>
                                                                         ))
                                                                     }

                                                            </Form.Control>
                                                        </Col>
                                                    </Row>
                                                </ListGroup.Item>
                                            )}

                                            <ListGroup.Item>
                                                <Button 
                                                    className='btn btn-block' 
                                                    disabled={product.countInStock == 0} 
                                                    type='button'
                                                    onClick= {addToCartHandler}>
                                                        Dodaj u Korpu
                                                </Button>
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </Card>

                                </Col> */}
                        </Row>

                        <Row>
                            <Col sm={12} md={12} lg={12} xl={12} xs={12} >
                            <h2 style={{color:'black'}}>Detaljni opis:</h2>
                                <ListGroup variant='flush'>
                                        <ListGroup.Item>
                                            {product.description}
                                        </ListGroup.Item>
                                </ListGroup>
                            </Col>
                            {/* <Col md={6}>
                                <h4>Detaljni opis:</h4>
                                {product.reviews?.length === 0 && <Message variant='info'>
                                    Nema Komentara
                                    </Message>}
                                <ListGroup variant='flush'>
                                      {product.reviews?.map(review => (

                                            <ListGroup.Item key={review._id}>
                                                <strong>{review.name}</strong>
                                                <Rating value={review.rating} color='#f8e825'></Rating>
                                                <p>{review.createdAt.substring(0,10)}</p>
                                                <p>{review.comment}</p>
                                            </ListGroup.Item>
                                            
                                        ))}  

                                        <ListGroup.Item>
                                            <h4>Napisite komentar:</h4>
                                            {  loadingReview && <Loader></Loader> }
                                            { successReview && <Message variant='success'> Komentar potpisan</Message>}
                                            { errorReview && <Message variant='danger'> {errorReview}</Message>}
                                            { userInfo ? (
                                                <Form onSubmit={submitHandler}>
                                                    <Form.Group controlId='rating'>
                                                            <Form.Label>
                                                                Rating
                                                            </Form.Label>
                                                            <Form.Control
                                                                as='select'
                                                                value={rating}
                                                                onChange={(e) => setRating(e.target.value)}>
                                                                    <option value=''>Select...</option>
                                                                    <option value='1'>1 - Siromasno</option>
                                                                    <option value='2'>2 - Nezadovoljavajuce</option>
                                                                    <option value='3'>3 - Dobro</option>
                                                                    <option value='4'>4 - Veoma Dobro</option>
                                                                    <option value='5'>5 - Odlicno</option>

                                                            </Form.Control>
                                                    </Form.Group>
                                                    <Form.Group controlId='comment'>
                                                        <Form.Label>Comment</Form.Label>
                                                        <Form.Control
                                                                as='text'
                                                                row='5'
                                                                value={comment}
                                                                onChange={(e) => setComment(e.target.value)}>

                                                        </Form.Control>

                                                    </Form.Group>
                                                    <Button
                                                        disabled={loadingReview}
                                                        type='submit'
                                                        variant='primary'>
                                                        Submit
                                                    </Button>

                                                </Form>
                                            ): (
                                                <Message variant='info'>
                                                        Molim Vas <Link to={'/login'}>Ulogujte se</Link> da biste ostavili Komentar
                                                </Message>
                                            )}
                                        </ListGroup.Item>
                                </ListGroup>
                            </Col> */}
                        </Row>
                    </div>
                    )}  
        
    </div>
  )
}

export default ProductScreen