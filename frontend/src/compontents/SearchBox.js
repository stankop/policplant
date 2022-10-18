import React, { useState } from 'react'
import { Button, Container, Form, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from "react-router-dom";
import { useParams, useSearchParams } from "react-router-dom";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';


function SearchBox() {

    const [keyword, setKeyword] = useState('')
    const navigate = useNavigate()
    const location = useLocation();

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
          Pretraga
        </Tooltip>
      );
    
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
        <Container>
            <Row>
                <Col md={10}>
                    <Form.Control 
                        type='search'
                        name='keyword'
                        inline ='true'
                        className='mr-sm-2 ml-sm-5'
                        onChange={(e) => setKeyword(e.target.value) }>
                    </Form.Control>
                </Col>
                <Col md={2}>
                <OverlayTrigger
                    placement="right"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltip}
                    >
                        <Button 
                            type='submit'
                            variant='outline-success'
                            className='p-2'
                            style={btnStyle}>
                            Pretraga
                        </Button>
                </OverlayTrigger>
                </Col>
            </Row>
        </Container>
    </Form>
  )
}

export default SearchBox