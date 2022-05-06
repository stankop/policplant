import React, { useState, useEffect} from "react";
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../compontents/Loader'
import Message from '../compontents/Message'
import  FormContainer  from '../compontents/FormContainer'
import { saveShippingAddress } from "../store/shipping-actions"; 
import { useNavigate, useLocation } from "react-router-dom";
import { useParams, useSearchParams } from "react-router-dom";
import CheckoutSteps from "../compontents/CheckoutSteps";
//import { register } from '../store/userRegister-actions'

function ShippingScreen() {

    const shipping = useSelector(state => state.shipping)
    const { shippingAddress } = shipping

    const [address , setAddress] = useState(shippingAddress.address)
    const [city , setCity] = useState(shippingAddress.city)
    const [postalCode , setPostalCode ] = useState(shippingAddress.postalCode)
    const [country , setCountry ] = useState(shippingAddress.country)
    


    const dispatch = useDispatch()

    const navigate = useNavigate();
   
    const [search, setSearch] = useSearchParams();
    const redirect = search.get("redirect");
    


    const submitHandler = (event) => {

        event.preventDefault()
        dispatch(saveShippingAddress({address, city, postalCode, country}))
        navigate('/payment')
    }

  return (
    <FormContainer>
        <CheckoutSteps step1 step2></CheckoutSteps>
        <h1>Adresa Kupca</h1>
        <Form onSubmit={submitHandler}>
            
                <Form.Group controlId='address'>
                    <Form.Label>
                        Adresa
                    </Form.Label>
                    <Form.Control 
                            required
                            type='text' 
                            placeholder='Unesie Adresu..'
                            value={address ? address : ''}
                            onChange={(e) => setAddress(e.target.value)}>

                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='city'>
                    <Form.Label>
                        Grad
                    </Form.Label>
                    <Form.Control 
                            required
                            type='text' 
                            placeholder='Unesite City..'
                            value={city ? city : ''}
                            onChange={(e) => setCity(e.target.value)}>

                    </Form.Control>
                </Form.Group>


                <Form.Group controlId='postalCode'>
                    <Form.Label>
                        Postanski broj
                    </Form.Label>
                    <Form.Control 
                            required
                            type='text' 
                            placeholder='Enter Postal Code..'
                            value={postalCode ? postalCode : ''}
                            onChange={(e) => setPostalCode(e.target.value)}>

                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='country'>
                    <Form.Label>
                        Zemlja
                    </Form.Label>
                    <Form.Control 
                            required
                            type='text' 
                            placeholder='Enter Country..'
                            value={country ? country : ''}
                            onChange={(e) => setCountry(e.target.value)}>

                    </Form.Control>

                    <Button type='submit' variant='primary'>
                        Nastavite  
                    </Button>
                </Form.Group>

        </Form>
    </FormContainer>
  )
}

export default ShippingScreen