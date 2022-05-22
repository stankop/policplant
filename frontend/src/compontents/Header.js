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
import { Fragment } from 'react'
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import SearchBox from "./SearchBox";
import { logout } from "../store/user-actions";
import HeaderCardButton from './/UI/HeaderCardButton'
import classes from './Header.module.css'
import image from '../../src/assets/images/berberis-erecta-1-350x350.jpg'
function Header(props) {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();
  const logoutHandler = (event) => {
    dispatch(logout());
  };
  return (
    <Fragment>
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
              <LinkContainer to="/">
                <Navbar.Brand>
                  <h2>PolicPlant</h2>
                </Navbar.Brand>
              </LinkContainer>
              
              <Navbar.Text style={{ textAlign: 'center'}}>
                  <div>                     
                    <div style={{fontSize: '20px'}}><FontAwesomeIcon icon={faPhone} />     Pozovite nas</div>
                      
                    <div >065356458</div>
                  </div>

              </Navbar.Text>
              
              <Navbar.Text style={{ textAlign: 'center'}}>
              <LinkContainer to="#" >
                    <Nav.Link >
                      <div style={{fontSize: '20px'}}><FontAwesomeIcon icon={faFlag} /> Placeholder</div>
                    </Nav.Link>
                  </LinkContainer>
              </Navbar.Text>

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
        <Container>
          <Row>
          <Navbar.Toggle aria-controls="basic-navbar-nav" md={4} style={{ pading:2}}/>
            
            <Navbar.Collapse id="basic-navbar-nav">
              <Col md={4} style={{ pading:10, margin:10, size:20}} >
                <SearchBox ></SearchBox>
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
                    <NavDropdown title={userInfo.name} id="username" style={{fontSize: '20px'}}>
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
    { '' && <div className={classes["main-image"]}>
        <img src={image} alt="Green color background" ></img>
    </div>}
    </Fragment>
  );
}

export default Header;
