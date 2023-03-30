import React, { useEffect, useState, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
  ToggleButtonGroup,
  ToggleButton,
  InputGroup
} from "react-bootstrap";
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import Message from "../compontents/Message";
import { addToCart, removeFromCart, addDostavaAndPlacanjeCart } from "../store/cart-actions";
import { useNavigate, useLocation } from "react-router-dom";
import { useParams, useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { orderActions } from "../store/order-slice";
import { color } from "@mui/system";
import useScreenType from "react-screentype-hook";
import {  Plus, Dash } from 'react-bootstrap-icons';

function CartScreen() {

  const navigate = useNavigate();
  const location = useLocation();
  const [search, setSearch] = useSearchParams();
  const [color, setColor] = useState(true)
  const id = search.get("id");
  const qty = search.get("qty");
  //const [qty, setQty] = useState(1);


  const [dostava, setDostava] = useState("licno");
  const [placanje, setPlacanje] = useState("pouzece");

  const dispatch = useDispatch();
  const screenType = useScreenType();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  

  useEffect(() => {
    if (id) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
      });
    }
  }, [id]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  };

  const chechoutHandler = (e) => {
    if(cartItems.reduce((acc, item ) => acc + item.qty * item.price, 0) < 1000){
      setColor(false)
    }else{
    //navigate('/login?redirect=shipping')
    dispatch(addDostavaAndPlacanjeCart(dostava, placanje))
    navigate('/shipping')
    }
  }

  const backHandler = () => {

    navigate('/')
  }

  return (
    <div>
    <Row>
      <Col sm={12} md={6} lg={4} xl={6} xs={12}>
        <h1 style={{color:'green'}}>Korpa</h1>
        {cartItems?.length === 0 ? (
          <Message variant="info">
            Vasa korpa je prazna <Link to="/">Vratite se Nazad</Link>
          </Message>
        ) : (
          <ListGroup variant="flush" >
            {cartItems?.map((item) => {
              return (
              <ListGroup.Item key={item.id} hidden={item.qty < 1}>
                <Row>
                  <Col sm={12} md={6} lg={3} xl={2} xs={2}>
                    <Image
                      src={item.image}
                      alt={item.name}
                      fluid
                      rounded
                    ></Image>
                  </Col>
                  <Col sm={12} md={3} lg={4} xl={3} xs={3}>
                    <Link style={{ textDecoration:'none'}} to={`/products/${item.id}`}><strong><h4 style={{color:'green', fontSize:'1.2rem', textDecoration:'none'}}>{item.name}</h4></strong></Link>
                  </Col>
                  <Col sm={12} md={6} lg={4} xl={3} xs={3}><strong>{item.price.toFixed(2)} rsd</strong></Col>
                  <Col sm={12} md={6} lg={4} xl={2} xs={2}>
                    {/* <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(addToCart(item.id, Number(e.target.value)))
                      }
                    >
                      { item.countInStock > 0 && (

                            [...Array(item?.countInStock)?.keys()]?.map((x) => (
                              <option key={x + 1} value={x + 1} style={{ width: 5}}>
                                {x + 1}
                              </option>
                            ))
                      ) }
                      
                    </Form.Control> */}
                    <Form.Control
                      disabled
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(addToCart(item.id, Number(e.target.value)))
                      }
                    >
                     
                      
                    </Form.Control>
                    {/* <Col className="justify-content-md-right">
                      <Row  sm={12}>
                          <Col sm={4}>
                              <Button variant="light" 
                                      onClick={decrementHandle}> 
                                  <Dash color="red" size={16} />
                              </Button>
                          </Col>
                          <Col sm={4}>
                              <InputGroup >
                                  <Form.Control 
                                      onChange={(e) => setQty(Number(e.target.value))}
                                      value={qty} 
                                      sm={2}
                                  >
                                          

                                  </Form.Control>
                              </InputGroup>
                          </Col>
                          <Col sm={4}>
                              <Button variant="light"
                                      onClick={incrementHandle}> 
                                  <Plus color="green" size={16} />
                              </Button>
                          </Col>
                      </Row>
                    </Col> */}
                  </Col>
                  <Col md={1} xl={2} xs={1}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeFromCartHandler(item.id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>);
            })}
          </ListGroup>
        )}
      </Col>
      <Col sm={12} md={6} lg={4} xl={6} xs={12}>
        <Card border="success">
           <Card.Header as="h4">Vasa Porudzbina</Card.Header>
          <ListGroup variant="flush">
            <ListGroup.Item >
              <Row>
                <Col sm={12} md={6} lg={4} xl={8} xs={8}><strong>Proizvodi</strong></Col>
                <Col sm={12} md={6} lg={4} xl={4} xs={4}> <strong>Ukupno</strong></Col>
              </Row>

            </ListGroup.Item>

            {cartItems?.filter(x => x.qty > 0).map((item) => (
                <ListGroup.Item key={item.id}>
                  <Row>
                    <Col m={12} md={6} lg={4} xl={8} xs={8}>{item.qty}      x      {item.name}</Col>
                    <Col m={12} md={6} lg={4} xl={4} xs={4}> {(item.qty * item.price).toFixed(2)}</Col>
                  </Row>

                 </ListGroup.Item>))}

            <ListGroup.Item>
                  <Row>
                    <Col m={12} md={6} lg={4} xl={8} xs={8}><strong>Ukupan broj proizvoda:</strong></Col>
                    <Col m={12} md={6} lg={4} xl={4} xs={4}> {cartItems.reduce((acc, item ) => acc + item.qty, 0)}</Col>
                  </Row>
            </ListGroup.Item>

            <ListGroup.Item>
                  <Row>
                    <Col m={12} md={6} lg={4} xl={8} xs={8}> <strong>Ukupna Cena:</strong></Col>
                    <Col m={12} md={6} lg={4} xl={4} xs={4}> {cartItems.reduce((acc, item ) => acc + item.qty * item.price, 0).toFixed(2)} rsd</Col>
                  </Row>
            </ListGroup.Item>

            <ListGroup.Item>

                <FormControl>
                  <FormLabel id="demo-controlled-radio-buttons-group"><h4 style={{color:'black'}}>Dostava</h4></FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={dostava}
                    onChange={(e) => setDostava(e.target.value)}
                  >
                    <FormControlLabel value="licno" control={<Radio color="success"/>} label="Licno preuzimanje" />
                    <FormControlLabel value="posta" control={<Radio color="success"/>} label="Slanje brzom postom" />
                  </RadioGroup>
                </FormControl>
            </ListGroup.Item>

            <ListGroup.Item>

                <FormControl>
                  <FormLabel id="demo-controlled-radio-buttons-group"><h4 style={{color:'black'}}>Placanje</h4></FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={placanje}
                    onChange={(e) => setPlacanje(e.target.value)}
                  >
                    <FormControlLabel value="uplata" control={<Radio color="success"/>} label="Uplata na racun" />
                    <FormControlLabel value="pouzece" control={<Radio color="success"/>} label="Prilikom preuzimanja" />
                  </RadioGroup>
                </FormControl>
            </ListGroup.Item>

            <ListGroup.Item>
              <Button
                type='button'
                className='btn-block btn-success'
                disabled={ cartItems.length === 0 }
                onClick={chechoutHandler}>
                    Nastavite sa kupovinom
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
    <Row>
      <Col style={{ padding:'1.2rem'}} md={4}>
          <Button type='button'
                className='btn-block btn-success'
                
                onClick={backHandler}>
                Nazad na listu proizvoda          
          </Button>
      </Col>
    </Row>
    <Row>
      <span style={{ border: color ? 'solid 3px green' : 'solid 3px red' , width:'80%', position:'center', padding: '10px', textAlign:'center', margin: 'auto', fontSize:'1.1rem'}}>
        Minimalna vrednost porudžbine ne može biti manja od 1.000rsd. Vaš trenutni ukupni iznos porudžbine je {cartItems.reduce((acc, item ) => acc + item.qty * item.price, 0).toFixed(2)} rsd</span>
    </Row>
    </div>
  );
}

export default CartScreen;
