import React, { useState } from 'react'
import { Button, Container, Form, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from "react-router-dom";
import { useParams, useSearchParams } from "react-router-dom";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';


function Search() {

    const [keyword, setKeyword] = useState('')
    const [pretraga, setPretraga] = useState('')
    const [boja, setBoja] = useState('')
    const navigate = useNavigate()
    const location = useLocation();

   
    
    const submitHandler = (e) => {
        e.preventDefault()
        console.log('Vrednost KEYWORDA: ', keyword)
        if(keyword){
            
            navigate(`/?keyword=${keyword}`)
        }else{

            navigate(location.pathname)
        }

    }

    const btnStyle = {
        background: 'greenyellow',
        // backgroundImage: 'url(' + imgUrl + ')',
    };

  return (
    
    <Form onSubmit={submitHandler} >
        <Container style={{ padding: '0.2rem'}}>
           
            <h7>Pretraga Proizvoda:</h7>
            <Row md={12} xl={12} style={{margin: 'auto', display: 'flex',  justifyContent:'center', alignItems:'center', }}>
                <Row md={12} xl={12} style={{ padding:'0.5rem', width: '100%'}}>
                    <Form.Control 
                        type='search'
                        name='pretraga'
                        inline ='true'
                        placeholder='Trazeni proizvod'
                        onChange={(e) => setPretraga(e.target.value) }>
                    </Form.Control>
                </Row>
                <hr/>
                <Row md={12} xl={12} style={{ padding:'0.5rem', width: '100%'}}>
                    <h7>Boja proizvoda</h7>
                    <Form.Control 
                        type='search'
                        name='boja'
                        inline ='true'
                        placeholder='Boja proizvoda'
                        onChange={(e) => setBoja(e.target.value) }>
                    </Form.Control>
                </Row>
                <hr/>
                <Row md={12} xl={12} style={{ padding:'0.5rem', width: '100%'}}>
                <h7>Tip biljke</h7>
                    <Form.Control 
                        type='search'
                        name='tip'
                        inline ='true'
                        placeholder='Tip biljke'
                        onChange={(e) => setBoja(e.target.value) }>
                    </Form.Control>
                </Row>
                <hr/>
                <Row md={12}>
                    
                        <Button 
                            type='submit'
                            variant='outline-success'
                            className='p-2'
                            style={btnStyle}>
                            Filter
                        </Button>
                
                </Row>
            </Row>
        </Container>
    </Form>
  )
}

export default Search