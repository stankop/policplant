import React, { useEffect } from "react";
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
} from "react-bootstrap";
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
  console.log("Ovo su podaci:", search.get("id"), search.get("qty"));

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
            {cartItems.map((item) => (
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
                    <Link to={`/products/${item.id}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>{item.price} din</Col>
                  <Col md={3}>
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(addToCart(item.id, Number(e.target.value)))
                      }
                    >
                      { item.countInStock > 0 && (

                            [...Array(item?.countInStock)?.keys()]?.map((x) => (
                              <option key={x + 1} value={x + 1}>
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
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>
                Ukupan broj proizvoda ({cartItems.reduce((acc, item ) => acc + item.qty, 0)}) Ukupna Cena:
                {cartItems.reduce((acc, item ) => acc + item.qty * item.price, 0).toFixed(2)} din
              </h3>
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
