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
import TitleCase from 'react-title-case';


function PlaceOrderScreen(props) {

    const dispatch  = useDispatch()
    const navigate = useNavigate()

    const [iznos, setIznos] = useState(0)
    const [ orderId, setOrderId] = useState(0)
    const [ orderi, setOrderi] = useState({})

    const orderCreate = useSelector(state => state.order)
    const { order , error, success, loading} = orderCreate

    const  shipping  = useSelector(state => state.shipping)
    const { shippingAddress } = shipping

    //const  orderDetail  = useSelector(state => state.orderDetail)
    //const { order: { _id }   } = orderDetail

    const cart = useSelector(state => state.cart)
    const {placanje, dostava } = cart

    const itemsPrice = cart.cartItems.reduce((acc,item) => acc + item.price * item.qty, 0).toFixed(2)
    const shippingPrice =  (itemsPrice > 100 ? 0 : 10).toFixed(2)
    const taxPrice = Number((0.0082) * itemsPrice).toFixed(2)
    const totalPrice = (Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice)).toFixed(2)
 
   
    useEffect(() =>{
        console.log('ovo je pre succesa',success)
        //dispatch(resetOrder())
        if (success){
            setIznos(order.totalPrice)
            setOrderId(order._id)
            setOrderi(order.orderItems)
            console.log('ovo je order:',order)
            //navigate(`/order/${order._id}`)
            props.onShowOrder({iznos: order.totalPrice,
                               orderId: order._id,
                               orderi: order.orderItems})
            dispatch(resetOrder())
        }


    }, [success])


    const placeOrder = (event) => {

        event.preventDefault()
        dispatch(createOrder({
            orderItems:cart.cartItems,
            name: shippingAddress.name,
            email:shippingAddress.email,
            password: shippingAddress.password,
            address: shippingAddress.address,
            itemsPrice: itemsPrice,
            place: shippingAddress.post,
            fix_phone: shippingAddress.fix_phone,
            self_phone: shippingAddress.self_phone,
            demands: shippingAddress.demands,
            dostava: dostava,
            placanje:placanje,
            ukupno: totalPrice

        }))
        console.log('jel doslo dovde?')

    }

  return (
    <div>
        <CheckoutSteps step1 step2 step3 ></CheckoutSteps>
        <Row>
            <Col md={8}>

                <ListGroup variant='flush'>
                    <ListGroup.Item>

                        <h2>Adresa</h2>
                        <div>

                            <div>
                                <strong>Name:</strong> { shippingAddress.name}
                            </div>
                            <div>
                                <strong>Adresa:</strong> { shippingAddress.address}
                            </div>
                            <div>
                                <strong>Email:</strong> <label type="email">{ shippingAddress.email}</label>
                                <p>Bice poslat mail na ovu adresu sa sadrzajem Vase porudzbine.</p>
                            </div>
                            <div>
                                <strong>Post:</strong> { shippingAddress.post}
                            </div>
                            <div>
                                <strong>Fixni telefon:</strong> { shippingAddress.fix_phone}
                            </div>
                            <div>
                                <strong>Mobilni telefon:</strong> { shippingAddress.self_phone}
                            </div>
                            <div>
                                <strong>Posebni zahtevi:</strong> { shippingAddress.demands}
                            </div>
                        </div>
                    </ListGroup.Item>

                     <ListGroup.Item>

                        <h2>Nacin Placanja</h2>
                        <p>
                            <strong>Method:</strong> <TitleCase string={placanje} />
                            
                        </p>
                    </ListGroup.Item>

                     <ListGroup.Item>

                        <h2>Narucene biljke</h2>
                        { cart.cartItems.length === 0 
                            ? <div>
                                <Message variant= 'info'> Vasa Korpa je prazna</Message> 
                                <Button to="/"

                                         type='button'
                                         className='btn-block'
                                         href="/"
                                         >Povratak na pocetak
                                </Button>
                              </div>
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
                                                            {item.qty} x {item.price} din = {(item.qty *item.price).toFixed(2)} din
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
                                   <Col><strong>Stavke(zbirno):</strong></Col>
                                   <Col>{itemsPrice} din</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                               <Row>
                                   <Col><strong>Shiping:</strong></Col>
                                   <Col>{shippingPrice} din</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                               <Row>
                                   <Col><strong>Pdv:</strong></Col>
                                   <Col>{taxPrice} din</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                               <Row>
                                   <Col><strong>Ukupno:</strong></Col>
                                   <Col>{totalPrice} din</Col>
                                </Row>
                            </ListGroup.Item>
                            {error &&
                                <ListGroup.Item>
                                    <Message variant='danger'>
                                        {error}
                                    </Message>
                            </ListGroup.Item>
                            }
                            <ListGroup.Item>
                                <Button

                                         type='button'
                                         className='btn-block'
                                         disabled={cart.cartItems.length === 0 }
                                         onClick={placeOrder}>Posalji porudzbu</Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
            </Col>
        </Row>
    </div>
  )
}

export default PlaceOrderScreen