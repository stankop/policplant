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
import { Fragment, useEffect, useRef, useState } from 'react'
import { LinkContainer, Link } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import SearchBox from "./SearchBox";
import { logout } from "../store/user-actions";
import HeaderCardButton from './/UI/HeaderCardButton'
import classes from './Header.module.css'
import { listCategories } from "../store/category-actions";
//import { plantCategories } from '../store/plantCategory-actions'
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from 'react-bootstrap/Image'
import '../compontents/Header.css'
import useScreenType from "react-screentype-hook";
import { productsReset } from '../store/product-actions'
import { useNavigate, useLocation } from "react-router-dom";
import { catMemory } from  '../compontents/UI/categories'
import { listFilterProducts, getAllProducts } from '../store/product-actions'


function Header(props) {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const category = useSelector((state) => state.categoryList);
  const { categories } = category;
  const image = 'https://policplantblob.blob.core.windows.net/policplant-container/veliki logo verzija 1.0.png'
  //const image = 'https://policplantblob.blob.core.windows.net/policplant-banner/veliki logo verzija 1.0-350x350.png'
  const listKagetorija= useRef([])

  const [cat, setCat] = useState(categories)

  const dispatch = useDispatch();
  const navigate = useNavigate()
  const screenType = useScreenType();

  useEffect(() => {
   
    console.log('Pokusaj Header')
    dispatch(getAllProducts())
    localStorage.setItem('categories', JSON.stringify(categories))
    listKagetorija.current = JSON.parse(localStorage.getItem('categories'))
    setCat(listKagetorija.current)
    
  }, [categories]);
  
  const logoutHandler = (event) => {
    dispatch(logout());
  };

  const info = [
    // {
    //   id:0,
    //   value: 'Informacije',
    //   src: 'a'
    // },
    { 
      id:1,
      value: 'Poručivanje',
      src: 'porucivanje'},
    {
      id:2,
      value: 'Način plaćanja i isporuke ',
      src: 'isporuke'
    },
    {
      id:3,
      value:'Najčešća pitanja ',
      src: 'pitanja'
    },
    {
      id:4,
      value:'Reklamacije',
      src: 'reklamacije'
    },
    {
      id:5,
      value:'Politika privatnosti',
      src: 'privatnost'
    }]
  
  const clearFilter = () => {
    console.log('Jakako ')
    localStorage.setItem('filter', JSON.stringify([]))
  }
  //smooth toggled header

  function useScrollDirection() {
    const [isHidden, setIsHidden] = useState(false);
  
    useEffect(() => {
      // store the last scrolled Y to detect how fast users scroll pages
      let lastScrollY = window.pageYOffset
  
      const updateScrollDirection = () => {
        const scrollY = window.pageYOffset
        const goingDown = scrollY > lastScrollY
        const diff = 4
        // There are two cases that the header might want to change the state:
        // - when scrolling up but the header is hidden
        // - when scrolling down but the header is shown
        // stateNotMatched variable decides when to try changing the state
        const stateNotMatched = goingDown !== isHidden
        const scrollDownTooFast = scrollY - lastScrollY > diff
        const scrollUpTooFast = scrollY - lastScrollY <- diff
  
        const shouldToggleHeader = stateNotMatched && (scrollDownTooFast || scrollUpTooFast)
        if (shouldToggleHeader) {
          setIsHidden(goingDown)
        }
        lastScrollY = scrollY > 0 ? scrollY : 0
      };
  
      window.addEventListener("scroll", updateScrollDirection)
      return () => {
        window.removeEventListener("scroll", updateScrollDirection)
      }
    }, [isHidden]);
  
    return isHidden;
  }
  
  const isHidden = useScrollDirection()
  //
  return (
    <Fragment >
    <header className={`header ${isHidden ? "header-hide" : "header-show"}`}>
      
      <Navbar  variant="dark" expand="lg" collapseOnSelect style={{ height:'12rem'}} className={classes["color-navbar"]}>
        { screenType.isMobile 
          ? 
              <Container  style={{ overflow:'hidden'}}>
                  <Row>
                    <Col>
                      <LinkContainer to="/" >
                        <Navbar.Brand>
                          {/* <h1 className={classes["h1"]}>Rasadnik Ema</h1> */}
                          <Image fluid  src={image} loading="eager" style={{ width:'16rem', height:'14rem', overflow:'hidden'}} alt="Rasadnik Ema" onClick={props.clearFilter}/>
                        </Navbar.Brand>
                      </LinkContainer>
                    </Col>
                    {/* <Navbar.Text style={{ textAlign: 'center'}}>
                        {<div>                     
                          <div style={{fontSize: '1.6rem', color:'black'}}><FontAwesomeIcon icon={faPhone} />     Pozovite nas</div>
                            
                          <div style={{color:'black',fontSize: '1.4rem'}}>0652077257</div>
                        </div>}

                    </Navbar.Text> */}
                    
                      {/* <SearchBox ></SearchBox> */}
                    <Col>
                      <Navbar.Text style={{ textAlign: 'center'}}>
                          <LinkContainer to="/cart" >
                            <Nav.Link style={{ margin:'1rem'}}>
                              <HeaderCardButton onClick={props.onShowCart}></HeaderCardButton>
                            </Nav.Link>
                          </LinkContainer>
                        </Navbar.Text>
                        <Navbar.Text style={{ textAlign: 'center'}}>
                        {<div>                     
                          <div style={{fontSize: '1.2rem', color:'black'}}><FontAwesomeIcon icon={faPhone} />     Pozovite nas</div>
                            
                          <div style={{color:'black',fontSize: '1.2rem'}}>0652077257</div>
                        </div>}

                      </Navbar.Text>
                    </Col>
                    </Row>
                </Container> 
              :
              <Container  style={{ overflow:'hidden'}}>
              
                <LinkContainer to="/">
                  <Navbar.Brand >
                    {/* <h1 className={classes["h1"]}>Rasadnik Ema</h1> */}
                    <Image fluid  src={image} loading="eager" style={{ width:'22rem', height:'22rem',marginTop: '+2rem', overflow:'hidden'}} alt="Rasadnik Ema" onClick={props.clearFilter}/>
                  </Navbar.Brand>
                </LinkContainer>
                
                <Navbar.Text style={{ textAlign: 'center'}}>
                    {<div>                     
                      <div style={{fontSize: '1.6rem', color:'black'}}><FontAwesomeIcon icon={faPhone} />     Pozovite nas</div>
                        
                      <div style={{color:'black',fontSize: '1.4rem'}}>0652077257</div>
                    </div>}

                </Navbar.Text>
                
                  <SearchBox onClick={props.searchBox}></SearchBox>

                <Navbar.Text style={{ textAlign: 'center'}}>
                <LinkContainer to="/cart" >
                      <Nav.Link style={{ margin:'1rem'}}>
                        <HeaderCardButton onClick={props.onShowCart}></HeaderCardButton>
                      </Nav.Link>
                    </LinkContainer>
                </Navbar.Text>
              </Container>}
      </Navbar>
      
      
      <Navbar bg="light" variant="light" expand="lg" collapseOnSelect>
        <Container >
          
          <Row style={{width:'auto', display: 'flex'}}>
          
          <Navbar.Toggle aria-controls="basic-navbar-nav" md={4}/>
          
            <Navbar.Collapse id="basic-navbar-nav" style={{width:'100%'}}>
              
              <Col md={{ span: 12, offset: 14 }}>
                <Nav style={{width:'100%'}}>
                    
                    <div style={{fontSize: '1.4rem', paddingRight:'2rem'}}><FontAwesomeIcon icon={faStore}></FontAwesomeIcon>   
                          <NavDropdown title="Prodavnica" 
                                  id="basic-nav-dropdown" 
                                  
                                  style={{
                                          fontSize: '1.4rem', 
                                          display: 'inline-block'}}>
                            {catMemory?.slice().sort((a, b) =>{return a.order - b.order}).map( (category) => (
                              <LinkContainer to={`/categories/${category._id}`} key={category._id}>
                                  <NavDropdown.Item  key={category._id}>
                                      { category.name }  
                                  </NavDropdown.Item>
                                </LinkContainer>
                            ))}
                        
                          </NavDropdown>  
                    </div>
                    
                    <div style={{fontSize: '1.4rem',display: 'inline-block', paddingRight:'1rem'}}><FontAwesomeIcon icon={faInfo}></FontAwesomeIcon>   
                          <NavDropdown title="Info" 
                                  id="basic-nav-dropdown" 
                                  
                                  style={{
                                          
                                          fontSize: '1.4rem', 
                                          display: 'inline-block'}}>
                            {info?.map( (i) => (
                              <LinkContainer to={`/${i.src}/`} key={i.id}>
                                  <NavDropdown.Item className='click'  key={i.id}>
                                      { i.value }  
                                  </NavDropdown.Item>
                                </LinkContainer>
                            ))}
                        
                          </NavDropdown>  
                    </div>
                   
                  <LinkContainer to="/onama" >
                  
                    <Nav.Link>
                      <div style={{fontSize: '1.4rem',display: 'inline-block',paddingRight:'1rem'}}><FontAwesomeIcon icon={faAnchor}></FontAwesomeIcon>     O nama</div>
                   
                    </Nav.Link>
                  </LinkContainer>

                  <LinkContainer
                    to="/kontakt">
                    <Nav.Link>
                    <div style={{fontSize: '1.4rem'}}><FontAwesomeIcon icon={faContactBook} />   Kontakt</div>
                      
                    </Nav.Link>
                  </LinkContainer>

                  {userInfo ? (
                    <NavDropdown title={userInfo.user_name} id="username" style={{fontSize: '1.4rem', paddingRight:'1rem'}}>
                      <LinkContainer
                        to="/profile">
                        <NavDropdown.Item>Profile</NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Item onClick={logoutHandler} >
                        LogOut
                      </NavDropdown.Item>
                    </NavDropdown>
                  ) : (
                    
                    <LinkContainer to="/login" style={{fontSize: '1.3rem', paddingRight:'1rem'}}>
                      <Nav.Link>
                        <FontAwesomeIcon icon={faUser} style={{paddingRight:'.5rem'}} />
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
