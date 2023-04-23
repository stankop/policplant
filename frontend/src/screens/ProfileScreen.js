import React, { useState, useEffect} from "react";

import { Link} from 'next/link'
import { Form, Button, Row, Col, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../compontents/Loader'
import Message from '../compontents/Message'
import  FormContainer  from '../compontents/FormContainer'
import { userActions } from "../store/user_slice";
import { useNavigate, useLocation } from "react-router-dom";
import { useParams, useSearchParams } from "react-router-dom";
import { register } from '../store/userRegister-actions' 
import { getUserDetails } from "../store/userDetails-actions";
import { updateUserProfile } from '../store/userUpdateProfile-actions'
import { userUpdateProfileActions } from '../store/userUpdateProfile-slice'
import { listMyOrders } from '../store/orderOrdersProfile-actions'

function ProfileScreen() {

    const [name , setName] = useState('')
    const [email , setEmail] = useState('')
    const [password , setPassword ] = useState('')
    const [confirmPassword , setConfirmPassword ] = useState('')
    const [message , setMessage ] = useState('')

    const dispatch = useDispatch()

    const navigate = useNavigate();
   
    const userDetails = useSelector(state => state.userDetails)
    const { user, error, loading } = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile

    const orderOrdersProfile = useSelector(state => state.orderOrdersProfile)
    const { orders, loading: loadingOrders, error: errorOrders } = orderOrdersProfile


    useEffect(() => {

        if(!userInfo){
            navigate(`/login`)
        }else{
            if(Object.keys(user).length === 0 || success ){
                dispatch(userUpdateProfileActions.userUpdateProfileReset())
                dispatch(getUserDetails('profile'))
                dispatch(listMyOrders())
            }else{
                setName(user.name)
                setEmail(user.email)
            }
        }
    },[navigate, userInfo, dispatch, user, success])


    const submitHandler = (event) => {
        event.preventDefault()
        if(password != confirmPassword){

            setMessage('Password do not match.')
        }else{
                dispatch(updateUserProfile({
                    'id': user._id,
                    'name':name,
                    'email':email,

                    'password':password
                }))
                setMessage('')
        }

    }

  return (
    <Row>
        
        <Col md={3}>
            <h2>User Profile</h2>
            {message && <Message variant='danger'>
                {message}
            </Message>}
        {error && <Message variant='danger'>
                {error}
            </Message>}
        { loading && <Loader></Loader>}
        <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                    <Form.Label>
                        Name
                    </Form.Label>
                    <Form.Control 
                            required
                            type='name' 
                            placeholder='Unesite Ime..'
                            value={name}
                            onChange={(e) => setName(e.target.value)}>

                    </Form.Control>
                </Form.Group>


                <Form.Group controlId='email'>
                    <Form.Label>
                        Email Adress
                    </Form.Label>
                    <Form.Control 
                            required
                            type='email' 
                            placeholder='Unesite Email..'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}>

                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>
                        Password
                    </Form.Label>
                    <Form.Control 
                            
                            type='password'
                            placeholder='Unesite Password..'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}>

                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='confirmPassword'>
                    <Form.Label>
                        Confirm Password
                    </Form.Label>
                    <Form.Control 
                            
                            type='password'
                            placeholder='Potvrdite Password..'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}>

                    </Form.Control>
                </Form.Group>

                <Button type='sumbit' varaiant='primary'>
                    Update
                </Button>
                
        </Form>
        </Col>
        <Col md={9}>
            <h2>Moje Porudzbine</h2>

            {loadingOrders ? (
                <Loader>

                </Loader>
            ) : errorOrders ? (
                <Message variant = 'danger'>
                        {errorOrders}
                </Message>
            ) : (

                <Table striped responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Date</th>
                            <th>Total</th>
                            <th>Paid</th>
                            <th>Delivered</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>

                        {orders.map(order => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.createdAt.substring(0, 10)}</td>
                                <td>{order.totalPrice} din</td>
                                <td>{order.isPaid ? order.paidAt.substring(0, 10) : (
                                    <i className='fas fa-times' style={{ color: 'red'}} ></i>
                                )}</td>
                                <td>{order._id}</td>
                                <td>
                                    <Link href={`/order/${order._id}`}>
                                        <Button className='btn-sm'>
                                            Detalji
                                        </Button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </Table>
            )}
        </Col>
    </Row>
  )
}

export default ProfileScreen