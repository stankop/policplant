import React, { useState, useEffect} from "react";
import { LinkContainer } from 'react-router-bootstrap'
import { Form, Button, Row, Col, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../compontents/Loader'
import Message from '../compontents/Message'
import  FormContainer  from '../compontents/FormContainer'
import { orderListActions } from "../store/orderList-slice";
import { useNavigate, useLocation } from "react-router-dom";
import { useParams, useSearchParams } from "react-router-dom";
import { listOrders } from '../store/orderList-actions' 
import { deleteUser, deleteUserReset } from '../store/userDelete-actions'
import {  userDetailsReset } from '../store/userDetails-actions'

function OrderListScreen() {

    const dispatch = useDispatch()
    const listOrds = useSelector(state => state.orderList)
    const { loading, error, orders} = listOrds

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo} = userLogin

    const navigate = useNavigate()

    useEffect(() => {

        if(userInfo && userInfo.isAdmin){
            dispatch(listOrders())
            
        }else{
            navigate('/login')
        }
       

    }, [dispatch, navigate ,userInfo])

    

  return (
    <div>
        <h1>Orders</h1>
        {loading 
                ? (
                    <Loader>

                    </Loader>
                ) 
                : error ? (
                            <Message variant='danger'>
                                    {error}
                            </Message>)
                        : (

                    <Table striped bordered hover responsive className='table-sm'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>USER</th>
                                    <th>DATE</th>
                                    <th>Total</th>
                                    <th>PAID</th>
                                    <th>DELIVERED</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders?.map(order => (

                                    <tr key={order._id}>
                                        <td>{order._id}</td>
                                        <td>{order.user && order.user.name}</td>
                                        <td>{order.createdAt?.substring(0,10)}</td>
                                        <td>RSD{order.totalPrice}</td>
                                        <td>{order.isPaid ? (
                                            order.isPaid
                                        ) : (
                                            
                                            <i className='fas fa-check' style={{ color: 'red'}}></i>)
                                        
                                            }
                                        </td>

                                        <td>{order.isDelivered ? (
                                            order.deliverdAt?.substring(0,10)
                                        ) : (
                                            
                                            <i className='fas fa-check' style={{ color: 'red'}}></i>)
                                        
                                            }
                                        </td>

                                        <td><LinkContainer to={`/order/${order._id}/`}>

                                                <Button variant = 'light' className='btn'>
                                                     Details
                                                </Button>
                                            </LinkContainer>
                                        </td>
                                        
                                    </tr>

                                ))}
                            </tbody>
                    </Table>

                )}

    </div>
  )
}

export default OrderListScreen