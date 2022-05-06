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
import { login } from '../store/user-actions'


function LoginScreen() {

    const [email , setEmail] = useState('')
    const [password , setPassword ] = useState('')

    const dispatch = useDispatch()

    const navigate = useNavigate();
   
    const [search, setSearch] = useSearchParams();
    const redirect = search.get("redirect");
    

    const user = useSelector(state => state.userLogin)
    const { userInfo, error, loading } = user

    useEffect(() => {

        if(userInfo){
            //navigate(`/register?redirect=${redirect}`)
            navigate(`/`)
        }
    },[navigate, userInfo, redirect])


    const submitHandler = (event) => {
        event.preventDefault()
        dispatch(login(email, password))
        
    }
    return (
      <FormContainer>
        <h1>Prijava</h1>
        {error && <Message variant='danger'>
                {error}
            </Message>}
        { loading && <Loader></Loader>}
        <Form onSubmit={submitHandler}>
                <Form.Group controlId='email'>
                    <Form.Label>
                        Email Adresa
                    </Form.Label>
                    <Form.Control 
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
                            type='password'
                            placeholder='Unesite Password...'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}>

                    </Form.Control>
                </Form.Group>

                <Button type='sumbit' varaiant='primary'>
                    Prijavite se
                </Button>
        </Form>

        <Row className='py-3'>
            <Col>
            Novi korisnik? <Link to={ redirect ? `/register?redirect=${redirect}` : '/register' }>Registracija</Link>
            </Col>
        </Row>
      </FormContainer>
    )
  }
  
  export default LoginScreen