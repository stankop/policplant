import React, { useEffect, useState } from "react";
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
  ToggleButton
} from "react-bootstrap";
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import Message from "../compontents/Message";
import { addToCart, removeFromCart } from "../store/cart-actions";
import { useNavigate, useLocation } from "react-router-dom";
import { useParams, useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function CartScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const [search, setSearch] = useSearchParams();
  const id = search.get("id");
  const qty = search.get("qty");


  const [dostava, setDostava] = useState("licno");
  console.log("Ovo su podaci:",dostava);
  const handleDostavaChange = (val) => setDostava(val);

  const [placanje, setPlacanje] = useState("uplata");
  console.log("Ovo su podaci:",placanje);
  const handleUplataChange = (val) => setPlacanje(val);

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (id) {
      dispatch(addToCart(Number(id), Number(qty)));
    }
  }, [dispatch, id, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  };

  const chechoutHandler =( ) => {

    //navigate('/login?redirect=shipping')
    navigate('/shipping')
  }

  const backHandler = () => {

    navigate('/')
  }

  return (
    <div>
    <Row>
      <Col md={8}>
        <h1>Korpa</h1>
        {cartItems.length === 0 ? (
          <Message variant="info">
            Vasa korpa je prazna <Link to="/">Vratite se Nazad</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems?.map((item) => (
              <ListGroup.Item key={item.id}>
                <Row>
                  <Col md={2}>
                    <Image
                      src={item.image}
                      alt={item.name}
                      fluid
                      rounded
                    ></Image>
                  </Col>
                  <Col md={3}>
                    <Link to={`/products/${item.id}`}><strong><h4>{item.name}</h4></strong></Link>
                  </Col>
                  <Col md={2}><strong>{item.price} din</strong></Col>
                  <Col md={1}>
                    <Form.Control
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
                      
                    </Form.Control>
                  </Col>
                  <Col md={1}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeFromCartHandler(item.id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card border="info">
           <Card.Header as="h4">Vasa Porudzbina</Card.Header>
          <ListGroup variant="flush">
            <ListGroup.Item >
              <Row>
                <Col md={8}>Proizvodi</Col>
                <Col md={4}> Ukupno</Col>
              </Row>

            </ListGroup.Item>

            {cartItems?.map((item) => (
                <ListGroup.Item>
                  <Row>
                    <Col md={8}>{item.qty} X {item.name}</Col>
                    <Col md={4}> {(item.qty * item.price).toFixed(2)}</Col>
                  </Row>

                 </ListGroup.Item>))}

            <ListGroup.Item>
                  <Row>
                    <Col md={8}>Ukupan broj proizvoda:</Col>
                    <Col md={4}> {cartItems.reduce((acc, item ) => acc + item.qty, 0)}</Col>
                  </Row>
            </ListGroup.Item>

            <ListGroup.Item>
                  <Row>
                    <Col md={8}> Ukupna Cena:</Col>
                    <Col md={4}> {cartItems.reduce((acc, item ) => acc + item.qty * item.price, 0).toFixed(2)} din</Col>
                  </Row>
            </ListGroup.Item>

            <ListGroup.Item>

                <FormControl>
                  <FormLabel id="demo-controlled-radio-buttons-group"><h4>Dostava</h4></FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={dostava}
                    onChange={(e) => handleDostavaChange(e.target.value)}
                  >
                    <FormControlLabel value="licno" control={<Radio />} label="Licno preuzimanje" />
                    <FormControlLabel value="posta" control={<Radio />} label="Slanje brzom postom" />
                  </RadioGroup>
                </FormControl>
            </ListGroup.Item>

            <ListGroup.Item>

                <FormControl>
                  <FormLabel id="demo-controlled-radio-buttons-group"><h4>Placanje</h4></FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={placanje}
                    onChange={(e) => handleUplataChange(e.target.value)}
                  >
                    <FormControlLabel value="uplata" control={<Radio />} label="Uplata na racun" />
                    <FormControlLabel value="pouzece" control={<Radio />} label="Prilikom preuzimanja" />
                  </RadioGroup>
                </FormControl>
            </ListGroup.Item>

            <ListGroup.Item>
              <Button
                type='button'
                className='btn-block'
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
      <Col md={4}>
          <Button type='button'
                className='btn-block'
                
                onClick={backHandler}>
                Nazad na listu proizvoda          
          </Button>
      </Col>
    </Row>
    </div>
  );
}

export default CartScreen;
