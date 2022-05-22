import React, { useState } from 'react'
import { Button, Container, Form, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from "react-router-dom";
import { useParams, useSearchParams } from "react-router-dom";


function SearchBox() {

    const [keyword, setKeyword] = useState('')
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
  return (
    
    <Form onSubmit={submitHandler} >
        <Container>
            <Row>
                <Col md={10}>
                    <Form.Control 
                        type='text'
                        name='keyword'
                        inline ='true'
                        className='mr-sm-2 ml-sm-5'
                        onChange={(e) => setKeyword(e.target.value) }>
                    </Form.Control>
                </Col>
                <Col md={2}>
                <Button 
                    type='submit'
                    variant='outline-success'
                    className='p-2'>
                    Pretraga
                </Button>
                </Col>
            </Row>
        </Container>
    </Form>
  )
}

export default SearchBox