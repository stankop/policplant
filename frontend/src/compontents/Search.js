import React, { useEffect, useState, useMemo, useRef } from 'react'
import { Button, Container, Form, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from "react-router-dom";
import { useParams, useSearchParams } from "react-router-dom";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Dropdown from 'react-bootstrap/Dropdown';
import CustomDropDown from './CustomDropDown';
import CustomSelect from './CustomSelect';
import { listProducts, listFilterProducts } from '../store/product-actions'

function useDebounce(value, delay) {
    // State and setters for debounced value
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(
      () => {
        // Update debounced value after delay
        const handler = setTimeout(() => {
          setDebouncedValue(value);
        }, delay);
        // Cancel the timeout if value changes (also on delay change or unmount)
        // This is how we prevent debounced value from updating if value is changed ...
        // .. within the delay period. Timeout gets cleared and restarted.
        return () => {
          clearTimeout(handler);
        };
      },
      [value, delay] // Only re-call effect if value or delay changes
    );
    return debouncedValue;
}

function Search( { onSearch}) {

    const dispatch = useDispatch()
    const cat = useSelector(state => state.categoryList)
    const { allcategories } = cat
    const [keyword, setKeyword] = useState('')

    const [pretraga, setPretraga] = useState('')
    const [pozicija, setPozicija] = useState('')
    const [boja, setBoja] = useState('')
    const [high, setHigh] = useState('')
    const [tip, setTip] = useState('')
    const [kategorija, setKategorija] = useState('')

    const navigate = useNavigate()
    const location = useLocation();

    const memoizedValue = useMemo(() => {
        const value = {
            color: boja,
            high: high,
            type: tip,
            category: kategorija,
            flow: pozicija,
            search: pretraga
        }
        onSearch(value)
        return value;
        }, [boja, high, tip, kategorija, pozicija, pretraga]);
    
    const debouncedSearchTerm = useDebounce(memoizedValue, 1000);
    const initialRender = useRef(true);
    
    useEffect(()=>{
       if(initialRender.current){
        initialRender.current = false;
       }
       else{
        console.count(debouncedSearchTerm)
        dispatch(listFilterProducts(debouncedSearchTerm))
        //navigate(`filter`, {state: debouncedSearchTerm, replace:true})
       }    
    }, [debouncedSearchTerm]);

    const submitHandler = (e) => {
        e.preventDefault()
        navigate(`filter`, {state: debouncedSearchTerm})    
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
                
                <h7>Pozicija za sadnju</h7>
                    <Row md={12} xl={12} style={{ padding:'0.5rem', width: '100%'}}>
                        <CustomSelect values={ allcategories?.flowering_time?.map(col => (
                            { value: col, label: col}
                        ))} onAction={setPozicija}></CustomSelect>
                        
                    </Row>
                <hr/>
                <h7>Boja cveta</h7>
                    <Row md={12} xl={12} style={{ padding:'0.5rem', width: '100%'}}>
                        <CustomSelect values={ allcategories?.color?.map(col => (
                            { value: col, label: col}
                        ))} onAction={setBoja}></CustomSelect>
                        
                    </Row>
                <hr/>
                
                <h7>Tip biljke</h7>
                    <Row md={12} xl={12} style={{ padding:'0.5rem', width: '100%'}}>
                        <CustomSelect values={ allcategories?.type_of_plant?.map(col => (
                            { value: col, label: col}
                        ))} onAction={setTip}></CustomSelect>
                    </Row>
                <hr/>
                
                <h7>Visina biljke</h7>
                    <Row md={12} xl={12} style={{ padding:'0.5rem', width: '100%'}}>
                        <CustomSelect values={ allcategories?.high?.map(col => (
                            { value: col, label: col}
                        ))} onAction={setHigh}></CustomSelect>
                    </Row>
                <hr/>
                
                <h7>Kategorija biljke</h7>
                    <Row md={12} xl={12} style={{ padding:'0.5rem', width: '100%'}}>
                        <CustomSelect  values={ allcategories?.categories?.map(col => (
                            { value: col.name, label: col.name}
                        ))} onAction={setKategorija}></CustomSelect>
                    </Row>
                <hr/>
                <Row md={12}>
                    
                        <Button 
                            type='submit'
                            variant='outline-success'
                            className='p-2'
                            style={btnStyle}
                            disabled={true}>
                            Filter
                        </Button>
                
                </Row>
            </Row>
        </Container>
    </Form>
  )
}

export default Search