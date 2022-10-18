import React from "react";
import { Container, Navbar, Nav, Row, Col, NavDropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartFlatbed,
  faUser,
  faInfo,
  faAddressBook,
  faAnchor,
  faContactBook,
  faPhone,
  faFlag,
} from "@fortawesome/free-solid-svg-icons";
import { Fragment, useEffect } from 'react'
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import SearchBox from "./SearchBox";
import { logout } from "../store/user-actions";
import HeaderCardButton from './/UI/HeaderCardButton'
import classes from './Header.module.css'
import image from '../../src/assets/images/berberis-erecta-1-350x350.jpg'
import { plantCategories } from '../store/plantCategory-actions'


function Header(props) {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const category = useSelector((state) => state.categoryList);
  const { categories: { categories} } = category;

  const dispatch = useDispatch();

  useEffect(() => {
    
    dispatch(plantCategories())

  }, []);
  
  const logoutHandler = (event) => {
    dispatch(logout());
  };
  return (
    <Fragment >
    <header >
      <Navbar  variant="dark" expand="lg" collapseOnSelect className={classes["color-navbar"]}>
        <Container  >
              <LinkContainer to="/">
                <Navbar.Brand>
                  <h1 className={classes["h1"]}>PolicPlant</h1>
                </Navbar.Brand>
              </LinkContainer>
              
              <Navbar.Text style={{ textAlign: 'center'}}>
                  {<div>                     
                    <div style={{fontSize: '1.6rem'}}><FontAwesomeIcon icon={faPhone} />     Pozovite nas</div>
                      
                    <div >065356458</div>
                  </div>}

              </Navbar.Text>
              
                <SearchBox ></SearchBox>

              <Navbar.Text style={{ textAlign: 'center'}}>
              <LinkContainer to="/cart" >
                    <Nav.Link >
                      <HeaderCardButton onClick={props.onShowCart}></HeaderCardButton>
                    </Nav.Link>
                  </LinkContainer>
              </Navbar.Text>
        </Container>
      </Navbar>
      <Navbar bg="light" variant="light" expand="lg" collapseOnSelect>
        <Container >
          <Row>
          <Navbar.Toggle aria-controls="basic-navbar-nav" md={4} style={{ pading:2}}/>
            
            <Navbar.Collapse id="basic-navbar-nav">
              <Col md={6} style={{ pading:10, margin:10, size:20}} >
                
                <NavDropdown title="Kategorije proizvoda" id="basic-nav-dropdown" style={{fontSize: '1.4rem', color: 'red'}}>
                  {categories?.map( (category) => (
                    <NavDropdown.Item href="#" key={category._id}>
                        { category.name }
                    </NavDropdown.Item>
                  ))}
                  {/* <NavDropdown.Item href="#action/3.1">
                    Action
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">
                    Something
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Separated link
                  </NavDropdown.Item> */}
                </NavDropdown>
              </Col>
              <Col md={{ span: 10, offset: 2 }}>
                <Nav>
                  <LinkContainer to="/cart" >
                    <Nav.Link >
                      <div style={{fontSize: '20px'}}><FontAwesomeIcon icon={faCartFlatbed} />     Korpa</div>
                    </Nav.Link>
                  </LinkContainer>

                  <LinkContainer
                    to="/info">
                    <Nav.Link>
                    <div style={{fontSize: '20px'}}><FontAwesomeIcon icon={faInfo} />  Info</div>
                    </Nav.Link>
                  </LinkContainer>

                  <LinkContainer to="/onama" >
                  
                    <Nav.Link>
                    <div style={{fontSize: '20px'}}><FontAwesomeIcon icon={faAnchor}></FontAwesomeIcon>     O nama</div>
                   
                    </Nav.Link>
                  </LinkContainer>

                  <LinkContainer
                    to="/kontakt">
                    <Nav.Link>
                    <div style={{fontSize: '20px'}}><FontAwesomeIcon icon={faContactBook} />   Kontakt</div>
                      
                    </Nav.Link>
                  </LinkContainer>

                  {userInfo ? (
                    <NavDropdown title={userInfo.user_name} id="username" style={{fontSize: '20px'}}>
                      <LinkContainer
                        to="/profile">
                        <NavDropdown.Item>Profile</NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Item onClick={logoutHandler} >
                        LogOut
                      </NavDropdown.Item>
                    </NavDropdown>
                  ) : (
                    <LinkContainer
                      to="/login"
                      
                    >
                      <Nav.Link>
                        <FontAwesomeIcon icon={faUser} />
                        Login/Register
                      </Nav.Link>
                    </LinkContainer>
                  )}
                  {userInfo && userInfo.isAdmin && (
                    <NavDropdown title="Admin" id="adminmenu" style={{fontSize: '20px'}}>
                      <LinkContainer to="/admin/userlist">
                        <NavDropdown.Item>Users</NavDropdown.Item>
                      </LinkContainer>

                      <LinkContainer to="/admin/productlist">
                        <NavDropdown.Item>Products</NavDropdown.Item>
                      </LinkContainer>

                      <LinkContainer to="/admin/orderlist">
                        <NavDropdown.Item>Orders</NavDropdown.Item>
                      </LinkContainer>
                    </NavDropdown>
                  )}
                </Nav>
              </Col>
            </Navbar.Collapse>
          </Row>
        </Container>
      </Navbar>
    </header>
    { false && <div className={classes["main-image"]}>
        <img src={image} alt="Green color background" ></img>
    </div>}
    </Fragment>
  );
}

export default Header;
