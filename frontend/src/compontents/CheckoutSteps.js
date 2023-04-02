import React from 'react'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

function CheckoutSteps({step1, step2, step3}) {
  return (
    <Nav className='justify-content-center mb-4'>
        <Nav.Item>
            {step1 ? (
                    <LinkContainer to='/login'>
                        <Nav.Link >
                            <strong style={{color:'green'}}>Login</strong>  
                        </Nav.Link>
                    </LinkContainer>
            ) : (
                <Nav.Link disabled>
                        Login
                </Nav.Link>
            )}
            
        </Nav.Item>

        <Nav.Item>
            {step2 ? (
                    <LinkContainer to='/shipping'>
                        <Nav.Link>
                        <strong style={{color:'green'}}>Adresa</strong>
                        </Nav.Link>
                    </LinkContainer>
            ) : (
                <Nav.Link disabled>
                        Adresa
                </Nav.Link>
            )}
            
        </Nav.Item>

        <Nav.Item>
            {step3 ? (
                    <LinkContainer to='/placeorder'>
                        <Nav.Link>
                        <strong style={{color:'green'}}>Narudzba</strong>
                        </Nav.Link>
                    </LinkContainer>
            ) : (
                <Nav.Link disabled>
                        Narudzba
                </Nav.Link>
            )}
            
        </Nav.Item>


    </Nav>
  )
}

export default CheckoutSteps