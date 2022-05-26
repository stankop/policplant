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

    const [username , setName] = useState('')
    const [email , setEmail] = useState('')
    const [fullname , setUserName] = useState('')
    const [place , setPlace] = useState('')
    const [address , setAddress] = useState('')
    const [self_phone , setSelfPhone] = useState('')
    const [fix_phone , setFixPhone] = useState('')
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
        dispatch(register(username, email, password, fullname, place, address, self_phone, fix_phone))
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
                        User Name
                    </Form.Label>
                    <Form.Control 
                            required
                            type='name' 
                            placeholder='Unesite User Name...'
                            value={username}
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

                <Form.Group controlId='fullmame'>
                    <Form.Label>
                        Ime i Prezime
                    </Form.Label>
                    <Form.Control 
                            type='fullname' 
                            placeholder='Unesite Vase ime i prezime...'
                            value={fullname}
                            onChange={(e) => setUserName(e.target.value)}>

                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='place'>
                    <Form.Label>
                        Postanski broj
                    </Form.Label>
                    <Form.Control 
                            type='place' 
                            placeholder='Unesite Vas postanski broj...'
                            value={place}
                            onChange={(e) => setPlace(e.target.value)}>

                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='address'>
                    <Form.Label>
                        Adresa
                    </Form.Label>
                    <Form.Control 
                            type='address' 
                            placeholder='Unesite Vasu adresu...'
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}>

                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='self_phone'>
                    <Form.Label>
                        Broj Mobilnog
                    </Form.Label>
                    <Form.Control 
                            type='self_phone' 
                            placeholder='Unesite Vas mobilni telefon...'
                            value={self_phone}
                            onChange={(e) => setSelfPhone(e.target.value)}>

                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='fix_phone'>
                    <Form.Label>
                        Broj fixnog telefona
                    </Form.Label>
                    <Form.Control 
                            type='fix_phone' 
                            placeholder='Unesite Vas fixni telefon...'
                            value={fix_phone}
                            onChange={(e) => setFixPhone(e.target.value)}>

                    </Form.Control>
                </Form.Group>
                <br/>
                <br/>
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