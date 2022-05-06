import React, { useState, useEffect} from "react";
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../compontents/Loader'
import  Message  from '../compontents/Message' 
import { useParams } from "react-router-dom";
import { getOrderDetails } from '../store/orderDetails-actions'


function OrderScreen() {

    const orderId  = useParams('id')
    const dispatch  = useDispatch()
    const orderDetails = useSelector(state => state.orderDetail)
    const {  order, error, loading } = orderDetails
    
   
    const [itemsPrice, setItemPrice] = useState(0) 

    if(!loading && error){
        itemsPrice = order.orderItems.reduce((acc,item) => acc + item.price * item.qty, 0).toFixed(2)
    }
    
    useEffect(() => {

        if(order?.orderItems?.length !==0 || order._id !== Number(orderId.id)){
            dispatch(getOrderDetails(Number(orderId.id)))
        }  

    }, [ orderId._id, dispatch]);

  return (
    loading ? (<Loader>

        </Loader>) : error ? (
            <Message variant = 'danger' >
                {error}
            </Message>
        ):
    (<div>
       
       <h1>Order: {order._id}</h1>
        <Row>
            <Col md={8}>

                <ListGroup variant='flush'>
                    <ListGroup.Item >

                        <h2>Shipping</h2>
                        <p>
                            <strong>Name: </strong> { JSON.stringify(order.user)/*.name*/}
                        </p>
                        <p>
                            <strong>Email: </strong> <a href={`mailto:${JSON.stringify(order.user)/*.email*/}`}>{JSON.stringify(order.user)/*.email*/}</a>
                        </p>
                        <p>
                            <strong>Shipping:</strong>
                            {JSON.stringify( order.shippingAddress)/*.address*/}, { JSON.stringify(order.shippingAddress)/*.city */}
                            { '     '}
                            { JSON.stringify(order.shippingAddress)/*.postalCode*/ },
                            { '     '}
                            { JSON.stringify(order.shippingAddress)/*.country*/ }
                        </p>
                        { order.isDelivered ? (
                            <Message variant="success" message= 'Info about delivered values' >
                                    Delivered on: {order.deliveredAt}
                            </Message>
                        ): (
                            <Message variant='warning' message= 'Info about delivered values'>
                                    Not Delivered
                            </Message>
                        )}
                    </ListGroup.Item>

                     <ListGroup.Item>

                        <h2>Payement Method</h2>
                        <p>
                            <strong>Method:</strong>
                            { order.paymentMethod}
                            
                        </p>
                        { order.isPaid ? (
                            <Message variant='success' message= 'Info about Payment method'>
                                    Paid on: {order.paidAt}
                            </Message>
                        ): (
                            <Message variant='warning' message= 'Info about Payment method'>
                                    Not Paid
                            </Message>
                        )}
                    </ListGroup.Item>

                     <ListGroup.Item>

                        <h2>Order Items</h2>
                        { order/*.orderItems.lenght === 0 */
                            ? <Message variant= 'info'> Order is emtpy</Message> 
                            : (
                                <ListGroup variant='flush'>
                                    {
                                        order.orderItems.map( (item,index) => (
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
                                <h2>Order Summery</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                               <Row>
                                   <Col>Item</Col>
                                   <Col>${itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                               <Row>
                                   <Col>Shipping:</Col>
                                   <Col>${order.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            
                           
                           
                        </ListGroup>
                    </Card>
            </Col>
        </Row>
    </div>
  ))
}

export default OrderScreen