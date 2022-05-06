import React, { useState, useEffect} from "react";
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../compontents/Loader'
import Message from '../compontents/Message'
import  FormContainer  from '../compontents/FormContainer'
import { savePaymentMethod } from "../store/payment-actions"; 
import { useNavigate, useLocation } from "react-router-dom";
import { useParams, useSearchParams } from "react-router-dom";
import CheckoutSteps from "../compontents/CheckoutSteps";

function PaymentScreen() {

    const shipping = useSelector(state => state.shipping)
    const { shippingAddress } = shipping

    const dispatch = useDispatch()

    const navigate = useNavigate();

    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    if(!shippingAddress.address){
            navigate('/shipping')
    }

    const submitHandler = (event) =>{
        event.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder')
    }
  return (

    <FormContainer>
        <CheckoutSteps step1 step2 step3></CheckoutSteps>

        <Form onSubmit={submitHandler}>

            <Form.Group>

                <Form.Label as='legend'>
                    Nacin Placanja:
                </Form.Label>
                <Col>
                    <Form.Check 
                            type='radio'
                            label='PayPal or Credit Card'
                            id='paypal'
                            name='paymentMethod'
                            checked
                            onChange={(e) =>setPaymentMethod(e.target.value) }>

                    </Form.Check>
                    <Form.Check 
                            type='radio'
                            label='Pouzecem'
                            id='address'
                            name='addressMethod'
                            
                            onChange={(e) =>setPaymentMethod(e.target.value) }>

                    </Form.Check>
                </Col>
            </Form.Group>

            <Button type='submit' variant='primary'>
                Nastavite
            </Button>
        </Form>
    </FormContainer>
  )
}

export default PaymentScreen