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
  faStore
} from "@fortawesome/free-solid-svg-icons";
import { Fragment, useEffect } from 'react'
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import SearchBox from "./SearchBox";
import { logout } from "../store/user-actions";
import HeaderCardButton from './/UI/HeaderCardButton'
import classes from './Header.module.css'
import image from '../../src/assets/images/berberis-erecta-1-350x350.jpg'
import { listCategories } from "../store/category-actions";
//import { plantCategories } from '../store/plantCategory-actions'
import 'bootstrap/dist/css/bootstrap.min.css';



function Header(props) {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const category = useSelector((state) => state.categoryList);
  const { categories } = category;
  const image = 'https://policplantpublic.s3.eu-west-2.amazonaws.com/veliki+logo+verzija+1.0.png'
  const dispatch = useDispatch();

  useEffect(() => {
    
    dispatch(listCategories())

  }, []);
  
  const logoutHandler = (event) => {
    dispatch(logout());
  };
  return (
    <Fragment >
    <header >
      <Row>
      <Navbar  variant="dark" expand="lg" collapseOnSelect style={{ height:'12rem'}} className={classes["color-navbar"]}>
        <Container  >
        
              <LinkContainer to="/">
                <Navbar.Brand>
                  {/* <h1 className={classes["h1"]}>Rasadnik Ema</h1> */}
                  <img src={image} style={{ width:'22rem', height:'22rem',marginTop: '+2rem'}} alt="Facebook"/>
                </Navbar.Brand>
              </LinkContainer>
              
              <Navbar.Text style={{ textAlign: 'center'}}>
                  {<div>                     
                    <div style={{fontSize: '1.6rem', color:'black'}}><FontAwesomeIcon icon={faPhone} />     Pozovite nas</div>
                      
                    <div style={{color:'black',fontSize: '1.4rem'}}>0652077257</div>
                  </div>}

              </Navbar.Text>
              
                <SearchBox ></SearchBox>

              <Navbar.Text style={{ textAlign: 'center'}}>
              <LinkContainer to="/cart" >
                    <Nav.Link style={{ margin:'1rem'}}>
                      <HeaderCardButton onClick={props.onShowCart}></HeaderCardButton>
                    </Nav.Link>
                  </LinkContainer>
              </Navbar.Text>
        </Container>
      </Navbar>
      </Row>
      
      <Navbar bg="light" variant="light" expand="lg" collapseOnSelect>
        <Container >
          
          <Row >
          
          <Navbar.Toggle aria-controls="basic-navbar-nav" md={4} style={{ pading:2}}/>
          
            <Navbar.Collapse id="basic-navbar-nav">
              
              <Col md={{ span: 12, offset: 10 }}>
                <Nav>
                    
                    <div style={{fontSize: '1.4rem'}}><FontAwesomeIcon icon={faStore}></FontAwesomeIcon>   
                          <NavDropdown title="Prodavnica" 
                                  id="basic-nav-dropdown" 
                                  style={{
                                          fontSize: '1.4rem', 
                                          display: 'inline-block'}}>
                        {categories?.map( (category) => (
                            <NavDropdown.Item  key={category._id}>
                                <LinkContainer to={`/categories/${category._id}`} >
                                    <Nav.Link >
                                    { category.name }
                                    </Nav.Link>
                                </LinkContainer>
                                
                            </NavDropdown.Item>
                            ))}
                        
                          </NavDropdown>  
                    </div>
                  
                   
                  <LinkContainer to="/onama" >
                  
                    <Nav.Link>
                    <div style={{fontSize: '1.4rem',display: 'inline-block'}}><FontAwesomeIcon icon={faAnchor}></FontAwesomeIcon>     O nama</div>
                   
                    </Nav.Link>
                  </LinkContainer>

                  <LinkContainer
                    to="/kontakt">
                    <Nav.Link>
                    <div style={{fontSize: '1.4rem'}}><FontAwesomeIcon icon={faContactBook} />   Kontakt</div>
                      
                    </Nav.Link>
                  </LinkContainer>

                  {userInfo ? (
                    <NavDropdown title={userInfo.user_name} id="username" style={{fontSize: '1.4rem'}}>
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
                    <NavDropdown title="Admin" id="adminmenu" style={{fontSize: '1.4rem'}}>
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
