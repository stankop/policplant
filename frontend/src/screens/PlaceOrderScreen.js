import React, { useState, useEffect} from "react";
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../compontents/Loader'
import  FormContainer  from '../compontents/FormContainer'
import  Message  from '../compontents/Message'
import { saveShippingAddress } from "../store/shipping-actions"; 
import { useNavigate, useLocation } from "react-router-dom";
import { useParams, useSearchParams } from "react-router-dom";
import CheckoutSteps from "../compontents/CheckoutSteps";
import { createOrder, resetOrder } from '../store/order-actions'


function PlaceOrderScreen() {

    const dispatch  = useDispatch()
    const navigate = useNavigate()
    const orderCreate = useSelector(state => state.order)
    const { order, error, success} = orderCreate

    const shipping = useSelector(state => state.shipping)
    const payment = useSelector(state => state.payment)
    const cart = useSelector(state => state.cart)

    const itemsPrice = cart.cartItems.reduce((acc,item) => acc + item.price * item.qty, 0).toFixed(2)
    const shippingPrice =  (itemsPrice > 100 ? 0 : 10).toFixed(2)
    const taxPrice = Number((0.0082) * itemsPrice).toFixed(2)
    const totalPrice = (Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice)).toFixed(2)

    if(!payment.paymentMethod){
        navigate('/payment')
    }
   
    useEffect(() =>{

       
        if (success){
            navigate(`/order/${order._id}`)
            dispatch(resetOrder())
        }


    }, [success, navigate])


    const placeOrder = (event) => {

        event.preventDefault()
        dispatch(createOrder({
            orderItems:cart.cartItems,
            shippingAddress: shipping.shippingAddress,
            paymentMethod:payment.paymentMethod,
            itemsPrice: itemsPrice,
            shippingPrice: shippingPrice,
            taxPrice: taxPrice,
            totalPrice: totalPrice,

        }))

    }
  return (
    <div>
        <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
        <Row>
            <Col md={8}>

                <ListGroup variant='flush'>
                    <ListGroup.Item>

                        <h2>Adresa</h2>
                        <p>
                            <strong>Adresa:</strong>
                            { shipping.shippingAddress.address}, { shipping.shippingAddress.city}
                            { '     '}
                            { shipping.shippingAddress.postalCode},
                            { '     '}
                            { shipping.shippingAddress.country}
                        </p>
                    </ListGroup.Item>

                     <ListGroup.Item>

                        <h2>Nacin Placanja</h2>
                        <p>
                            <strong>Method:</strong>
                            { payment.paymentMethod}
                            
                        </p>
                    </ListGroup.Item>

                     <ListGroup.Item>

                        <h2>Narucene biljke</h2>
                        { cart.cartItems.length === 0 
                            ? <Message variant= 'info'> Vasa Korpa je prazna</Message> 
                            : (
                                <ListGroup variant='flush'>
                                    {
                                        cart.cartItems.map( (item,index) => (
                                                <ListGroup.Item key={index}>

                                                    <Row>
                                                        <Col md={1}>
                                                            <Image src={item.image} alt={item.name} fluid rounded></Image>
                                                        </Col>
                                                        <Col>

                                                            <Link to={`/products/${item.id}`}>{item.name}</Link>
                                                        </Col>
                                                        <Col md={4}>
                                                            {item.qty} X {item.price} din = {(item.qty *item.price).toFixed(2)} din
                                                        </Col>
                                                    </Row>
                                                </ListGroup.Item>

                                            ))
                                    }

                                </ListGroup>
                            )}
                        
                    </ListGroup.Item>
                </ListGroup>

            </Col>

            <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Narudzba</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                               <Row>
                                   <Col>Stavke:</Col>
                                   <Col>{itemsPrice} din</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                               <Row>
                                   <Col>Shiping:</Col>
                                   <Col>{shippingPrice} din</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                               <Row>
                                   <Col>Pdv:</Col>
                                   <Col>{taxPrice} din</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                               <Row>
                                   <Col>Ukupno:</Col>
                                   <Col>{totalPrice} din</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                {error && <Message variant='danger'>
                                    {error}
                                    </Message>}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button
                                         disabled='true'
                                         type='button'
                                         className='btn-block'
                                         //disabled={cart.cartItems.lenght === 0 }
                                         onClick={placeOrder}>Plati</Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
            </Col>
        </Row>
    </div>
  )
}

export default PlaceOrderScreen