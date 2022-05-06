import React, { useState, useEffect} from "react";
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../compontents/Loader'
import Message from '../compontents/Message'
import  FormContainer  from '../compontents/FormContainer'
import { userActions } from "../store/user_slice";
import { useNavigate, useLocation } from "react-router-dom";
import { useParams, useSearchParams } from "react-router-dom";
import { register } from '../store/userRegister-actions' 


function RegisterScreen() {

    const [name , setName] = useState('')
    const [email , setEmail] = useState('')
    const [password , setPassword ] = useState('')
    const [confirmPassword , setConfirmPassword ] = useState('')
    const [message , setMessage ] = useState('')


    const dispatch = useDispatch()

    const navigate = useNavigate();
   
    const [search, setSearch] = useSearchParams();
    const redirect = search.get("redirect");
    

    const userRegister = useSelector(state => state.userRegister)
    const { userInfo, error, loading } = userRegister

    useEffect(() => {

        if(userInfo){
            navigate(`/register?redirect=${redirect}`)
        }
    },[navigate, userInfo, redirect])


    const submitHandler = (event) => {
        event.preventDefault()
        if(password != confirmPassword){

            setMessage('Password do not match.')
        }else{
        dispatch(register(name, email, password))
        }

    }


  return (
    <FormContainer>
        <h1>Registracija</h1>
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
                        Ime
                    </Form.Label>
                    <Form.Control 
                            required
                            type='name' 
                            placeholder='Unesite Ime...'
                            value={name}
                            onChange={(e) => setName(e.target.value)}>

                    </Form.Control>
                </Form.Group>


                <Form.Group controlId='email'>
                    <Form.Label>
                        Email Adresa
                    </Form.Label>
                    <Form.Control 
                            required
                            type='email' 
                            placeholder='Unesite Email...'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}>

                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>
                        Password
                    </Form.Label>
                    <Form.Control 
                            required
                            type='password'
                            placeholder='Enter Password..'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}>

                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='confirmPassword'>
                    <Form.Label>
                        Confirm Password
                    </Form.Label>
                    <Form.Control 
                            required
                            type='password'
                            placeholder='Potvrdite Password..'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}>

                    </Form.Control>
                </Form.Group>

                <Button type='sumbit' varaiant='primary'>
                    Registracija
                </Button>
                
        </Form>

        <Row className='py-3'>
            <Col>
            Imate Nalog vec? <Link to={ redirect ? `/login?redirect=${redirect}` : '/login' }>Login</Link>
            </Col>
        </Row>
    </FormContainer>
  )
}

export default RegisterScreen