import React, { useEffect, useState,useMemo, useRef } from 'react'
import { Button, Container, Form, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from "react-router-dom";
import { useParams, useSearchParams } from "react-router-dom";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { listFilterProducts, listFilterGornjeProducts } from '../store/product-actions'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ArrowRight } from 'react-bootstrap-icons';


function SearchBox() {

    const [keyword, setKeyword] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation();

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
          Pretraga
        </Tooltip>
      );
    
    const submitHandler = (e) => {
        e.preventDefault()
        console.log('Keyword:', keyword)
        dispatch(listFilterGornjeProducts(keyword))
            //localStorage.setItem('keyword', keyword)
    }

    // useEffect(() => {
    //     localStorage.setItem('keyword', keyword)
    // },[keyword])


    const btnStyle = {
        background: 'rgb(131, 183, 53)',
        border:'2px solid rgb(131, 183, 53)'
        // backgroundImage: 'url(' + imgUrl + ')',
    };

  return (
    
    <Form onSubmit={submitHandler} >
        <Container fluid >
            <Row>
                <Col style={{ padding:0}}>
                    <Form.Control 
                        placeholder='Unesi pojam...'
                        type='search'
                        name='keyword'
                        
                       
                        onChange={(e) => setKeyword(e.target.value) }
                        style={{ border:'2px solid rgb(131, 183, 53)', width:'20rem'}}>
                    </Form.Control>
                </Col>
                <Col style={{ padding:0}}>
                    <OverlayTrigger
                        placement="right"
                        delay={{ show: 250, hide: 400 }}
                        overlay={renderTooltip}
                        >
                            <Button 
                                type='submit'
                                variant='outline-success'
                                className='p-1.8'
                                style={btnStyle}>
                                {/* <ArrowRight size={16}/> */}
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                                </svg>
                            </Button>
                    </OverlayTrigger>
                </Col>
            </Row>
        </Container>
    </Form>
  )
}

export default SearchBox