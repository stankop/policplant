import React, { useState, useEffect} from "react";
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../compontents/Loader'
import  Message  from '../compontents/Message' 
import { useParams } from "react-router-dom";
import { getOrderDetails } from '../store/orderDetails-actions'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { payOrder } from '../store/orderPay-actions'

function OrderScreen() {

    const orderId  = useParams('id')
    const dispatch  = useDispatch()
    const orderDetails = useSelector(state => state.orderDetail)
    const {  order, error, loading } = orderDetails

    const orderPay = useSelector(state => state.orderPay)
    const { loading: loadingPay, success: successPay } = orderPay
   
    const [itemsPrice, setItemPrice] = useState(0) 

    if(!loading && error){
        setItemPrice(order.orderItems.reduce((acc,item) => acc + item.price * item.qty, 0).toFixed(2))
    }
    
    useEffect(() => {

        if(order?.orderItems?.length !==0 || successPay || order._id !== Number(orderId.id)){
            dispatch(getOrderDetails(Number(orderId.id)))
        }  

    }, [ orderId._id, dispatch]);


    const successPaymentHandler = (paymentResult) => {

        dispatch(payOrder(orderId._id, paymentResult))

    }

    // const addPayPalScript = () => {

    //     const script = ducument.createElement('script')
    //     script.type = 'text/javascript'
    //     script.src = 
    // }
    //Ab3TFcejtQPynvPI8n2RoDB5h023_M3oOq_5Rm0Lznlo57COnlDvHsFdQ5G-2ld61SpRFmv5IqAYvyRW
  return (
    loading ? (<Loader>

        </Loader>) : error ? (
            <Message variant = 'danger' >
                {error}
            </Message>
        ):
    (<div>
       
       <h1>Narudzba: {order._id}</h1>
        <Row>
            <Col md={8}>

                <ListGroup variant='flush'>
                    <ListGroup.Item >

                        <h2>Poruzbina je poslata na Vas email.</h2>
                        <p>
                            <strong>Name: </strong> { order.user?.user_name}
                        </p>
                        <p>
                            <strong>Email: </strong> <a href={`mailto:${order.user?.email}`}>{order.user?.email}</a>
                        </p>
                        <br/>

                        { order.isDelivered ? (
                            <Message variant="success"  >
                                   Isporuceno dana: {order.deliveredAt}
                            </Message>
                        ): (
                            <Message variant='warning' >
                                    Nije isporuceno
                            </Message>
                        )}
                    </ListGroup.Item>

                     <ListGroup.Item>

                        <h2>Nacin placanja</h2>
                        <p>
                            <strong>Method:</strong> { order.paymentMethod === 'uplata' ? 'Placanje pouzecem' : 'Placanje karticom'}
                            
                        </p>
                        { order.isPaid ? (
                            <Message variant='success' >
                                    <div>Placeno dana:</div>   {order.paidAt}
                            </Message>
                        ): (
                            <Message variant='warning' >
                                    Nije placeno
                            </Message>
                        )}
                    </ListGroup.Item>

                     <ListGroup.Item>

                        <h2>Stavke Narudzbe</h2>
                        { order.orderItems?.lenght === 0 
                            ? <Message variant= 'info'> Narudzba je prazna</Message> 
                            : (
                                <ListGroup variant='flush'>
                                    {
                                        order.orderItems?.map( (item,index) => (
                                                <ListGroup.Item key={index}>

                                                    <Row>
                                                        <Col md={1}>
                                                            <Image src={item.image} alt={item.name} fluid rounded></Image>
                                                        </Col>
                                                        <Col>

                                                            <Link to={`/products/${item.id}`}>{item.name}</Link>
                                                        </Col>
                                                        <Col md={4}>
                                                            {item.qty} X ${item.price} = ${(item.qty *item.price).toFixed(2)}
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
                                <h2>Narudzba konacno:</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                               <Row>
                                   <Col>Ukupna cena:</Col>
                                   <Col>RSD {order.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                {!order.isPaid && loadingPay ? (
                                        <Loader>
                                       
                                       </Loader>
                                    ) : (
                                        <Row>
                                            <PayPalScriptProvider options={{ "client-id": "Ab3TFcejtQPynvPI8n2RoDB5h023_M3oOq_5Rm0Lznlo57COnlDvHsFdQ5G-2ld61SpRFmv5IqAYvyRW" }}>
                                                <PayPalButtons 
                                                    style={{ layout: "horizontal" }}
                                                    amount={order.totalPrice}
                                                    onSuccess= {successPaymentHandler}  />
                                            </PayPalScriptProvider>
                                        </Row>
                                    
                                )}
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
            </Col>
        </Row>
    </div>
  ))
}

export default OrderScreen