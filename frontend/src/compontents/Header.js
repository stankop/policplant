import React from "react";
import { Container, Navbar, Nav, Row, NavDropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartFlatbed, faUser, faInfo, faAddressBook, faAnchor, faContactBook } from "@fortawesome/free-solid-svg-icons";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from 'react-redux'
import SearchBox from './SearchBox'
import { logout } from '../store/user-actions'

function Header() {

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const dispatch = useDispatch()
  const logoutHandler = (event) => {

    dispatch(logout())

  }
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand><h1>PolicPlant</h1></Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <SearchBox className="ml-auto"></SearchBox>
            <Nav className="ml-auto">
              <LinkContainer to="/cart">
                <Nav.Link>
                  <FontAwesomeIcon icon={faCartFlatbed} />
                  Korpa
                </Nav.Link>
              </LinkContainer>

              <LinkContainer to="/info">
                <Nav.Link>
                <FontAwesomeIcon icon={faInfo }  />
                  Info
                </Nav.Link>
              </LinkContainer>

              <LinkContainer to="/onama">
                <Nav.Link>
                  <FontAwesomeIcon icon={faAnchor} />
                  O nama
                </Nav.Link>
              </LinkContainer>

              <LinkContainer to="/kontakt">
                <Nav.Link>
                  <FontAwesomeIcon icon={faContactBook} />
                  Kontakt
                </Nav.Link>
              </LinkContainer>

              { userInfo  ? (
                <NavDropdown title={userInfo.name} id='username'>
                    <LinkContainer to='/profile'>
                        <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                        <NavDropdown.Item onClick={logoutHandler}>LogOut</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <FontAwesomeIcon icon={faUser} />
                    Login/Register
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (

                <NavDropdown title='Admin' id='adminmenu'>
                  <LinkContainer to='/admin/userlist'>
                      <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to='/admin/productlist'>
                      <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to='/admin/orderlist'>
                      <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                    
                </NavDropdown>
              )}
             
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
