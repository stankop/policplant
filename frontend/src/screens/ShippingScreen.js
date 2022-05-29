import React, { useState, useEffect} from "react";
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, Card, Nav } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../compontents/Loader'
import Message from '../compontents/Message'
import  FormContainer  from '../compontents/FormContainer'
import { saveShippingAddress } from "../store/shipping-actions"; 
import { useNavigate, useLocation } from "react-router-dom";
import { useParams, useSearchParams } from "react-router-dom";
import CheckoutSteps from "../compontents/CheckoutSteps";
import { TabContext, TabList, TabPanel  } from '@mui/lab';
import { Tab , Box } from '@mui/material';
//import { register } from '../store/userRegister-actions'

function ShippingScreen() {

    const shipping = useSelector(state => state.shipping)
    const { shippingAddress } = shipping

    const [value , setValue] = useState('1')
    const [name , setName] = useState(shippingAddress.name)
    const [email , setEmail] = useState(shippingAddress.email)
    const [password , setPassword] = useState(shippingAddress.password)
    const [post , setPost] = useState(shippingAddress.post)
    const [address , setAddress] = useState(shippingAddress.address)
    const [fix_phone , setFixPhone] = useState(shippingAddress.fix_phone)
    const [self_phone , setSelfPhone] = useState(shippingAddress.self_phone)
    const [demands , setDemands ] = useState(shippingAddress.demands)

    const dispatch = useDispatch()

    const navigate = useNavigate();
   
    const [search, setSearch] = useSearchParams();
    const redirect = search.get("redirect");

    const handleTab = (e, value) => setValue(value);
    const submitHandler1 = (event) => {

        event.preventDefault()
        dispatch(saveShippingAddress({
            name, email, password, post,
            address, fix_phone, self_phone, demands
        }))
        navigate('/placeorder')
    }

    const submitHandler2 = (event) => {

        event.preventDefault()
        dispatch(saveShippingAddress({
            name, email, password, post,
            address, fix_phone, self_phone, demands
        }))
        navigate('/placeorder')
    }

  return (
    <div>
      <CheckoutSteps step1 step2></CheckoutSteps>
      <TabContext value={value}>
      <Box sx={{ borderBottom:1, borderColor: 'divider' }}>
        <TabList onChange={handleTab} aria-label="lab API tabs example">
          <Tab label="Novi Kupac" value="1" />
          <Tab label="Postojeci Kupac" value="2" />

        </TabList>
      </Box>
      <TabPanel value="1">
          <FormContainer>

        <h1>Podaci Kupca</h1>
        <Form onSubmit={submitHandler1}>

                <Form.Group controlId='name'>
                    <Form.Label>
                        Vase Ime i Prezime
                    </Form.Label>
                    <Form.Control
                            required
                            type='text'
                            placeholder='Unesite Vase ime i prezime...'
                            value={name ? name : ''}
                            onChange={(e) => setName(e.target.value)}>

                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='email'>
                    <Form.Label>
                        Email
                    </Form.Label>
                    <Form.Control
                            required
                            type='text'
                            placeholder='Unesite Email...'
                            value={email ? email : ''}
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
                            placeholder='Unesite lozinku...'
                            value={password ? password : ''}
                            onChange={(e) => setPassword(e.target.value)}>

                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='postanski broj'>
                    <Form.Label>
                        Postanski broj i mesto
                    </Form.Label>
                    <Form.Control
                            required
                            type='text'
                            placeholder='Unesite postanski broj i mesto...'
                            value={post ? post : ''}
                            onChange={(e) => setPost(e.target.value)}>

                    </Form.Control>
                </Form.Group>

                 <Form.Group controlId='address'>
                    <Form.Label>
                        Adresa
                    </Form.Label>
                    <Form.Control
                            required
                            type='text'
                            placeholder='Unesite Adresu..'
                            value={address ? address : ''}
                            onChange={(e) => setAddress(e.target.value)}>

                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='fix_phone'>
                    <Form.Label>
                        Fixni telefon
                    </Form.Label>
                    <Form.Control
                            required
                            type='text'
                            placeholder='Unesite fixni broj telefona..'
                            value={fix_phone ? fix_phone : ''}
                            onChange={(e) => setFixPhone(e.target.value)}>

                    </Form.Control>
                </Form.Group>


                <Form.Group controlId='self_phone'>
                    <Form.Label>
                        Mobilni telefon
                    </Form.Label>
                    <Form.Control
                            required
                            type='text'
                            placeholder='Unesite mobilni telefon..'
                            value={self_phone ? self_phone : ''}
                            onChange={(e) => setSelfPhone(e.target.value)}>

                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='demands'>
                    <Form.Label>
                        Zahtevi oko isporuke
                    </Form.Label>
                    <Form.Control
                            required
                            type='text'
                            placeholder='Enter Country..'
                            value={demands ? demands : ''}
                            onChange={(e) => setDemands(e.target.value)}>

                    </Form.Control>

                    <Button type='submit' variant='primary'>
                        Nastavite
                    </Button>
                </Form.Group>

        </Form>
    </FormContainer>
      </TabPanel>
      <TabPanel value="2">
          <FormContainer>

        <h1>Podaci Kupca</h1>
        <Form onSubmit={submitHandler2}>

                <Form.Group controlId='name'>
                    <Form.Label>
                        Vase Ime i Prezime
                    </Form.Label>
                    <Form.Control
                            required
                            type='text'
                            placeholder='Unesite Vase ime i prezime...'
                            value={name ? name : ''}
                            onChange={(e) => setName(e.target.value)}>

                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='email'>
                    <Form.Label>
                        Email
                    </Form.Label>
                    <Form.Control
                            required
                            type='text'
                            placeholder='Unesite Email...'
                            value={email ? email : ''}
                            onChange={(e) => setEmail(e.target.value)}>

                    </Form.Control>
                    </Form.Group>
                    <Form.Group>
                    <Button type='submit' variant='primary'>
                        Nastavite
                    </Button>
                    </Form.Group>

                    </Form>
                </FormContainer>

            </TabPanel>

        </TabContext>

        </div>

  )}

export default ShippingScreen