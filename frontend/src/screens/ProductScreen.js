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
import {  createReview } from '../store/review-actions'
import { reviewCreateActions } from '../store/review-slice'

function ProductScreen({match}) {
    
  const { id } = useParams();
  
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');


  const dispatch = useDispatch()

  

  const userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin


  const productReview = useSelector(state => state.reviewCreate)
  const {loading: loadingReview, error: errorReview, success: successReview} = productReview


  useEffect(()=>{

       if(successReview){
            setRating(0)
            setComment('')
            dispatch(reviewCreateActions.reviewCreateReset())
       }
       dispatch(productDetails(id))

       return () => {}
        
  }, [dispatch, id, successReview]);

  const productDet = useSelector(state => state.product)
  const {loading, error, product} = productDet

  const addToCartHandler = () => {
      console.log(`Add to cart where id: ${ id } and ${ qty }`)
      navigate(`/cart/?id=${id}&qty=${qty}`)
  }

  const submitHandler= (event) => {

    event.preventDefault()
    dispatch(createReview(id, {

        rating,
        comment
    }))
  }

  useEffect(() => {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
      })
    }, [])
  

  return (
    <div>
        <Link to='/' className='btn btn-light my-3'> Nazad</Link>

        {loading ? 
                 <Loader></Loader>
                : error 
                ? <Message variant='danger'>{error}</Message>
                :(  
                    <div>
                        <Row>
                                <Col md={6}>
                                    <Image src={product.image} alt={product.name} fluid>

                                    </Image>
                                </Col>
                                <Col md={3}>
                                    <ListGroup variant='flush'>
                                        <ListGroup.Item>
                                            <h3>{product.name}</h3>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'}>
                                            </Rating>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <strong>Cena:</strong> {product.price} din
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <strong>Opis:</strong> {product.description}
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Col>
                                <Col md={3}>
                                    <Card>
                                        <ListGroup variant='flush' >
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>
                                                        Cena:
                                                    </Col>
                                                    <Col>
                                                        <strong>{product.price} din</strong>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>
                                                        Status:
                                                    </Col>
                                                    <Col>
                                                        { product.countInStock > 0 ? 'Na stanju' : 'Nema na stanju'}
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
                                                                 onChange={(e) => setQty(e.target.value) }>
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

                                </Col>
                        </Row>

                        <Row>
                            <Col md={6}>
                                <h4>Komentari</h4>
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
                            </Col>
                        </Row>
                    </div>
                    )}  
        
        {product.name}
    </div>
  )
}

export default ProductScreen