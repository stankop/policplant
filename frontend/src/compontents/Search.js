import React, { useEffect, useState, useMemo, useRef, useCallback } from 'react'
import { Button, Container, Form, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from "next/router";
//import { useParams, useSearchParams } from "react-router-dom";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Dropdown from 'react-bootstrap/Dropdown';
import CustomDropDown from './CustomDropDown';
import CustomSelect from './CustomSelect';
import { listProducts, listFilterProducts } from '../store/product-actions'
import { catMemory } from  '../compontents/UI/categories'

function useDebounce(value, delay) {
    // State and setters for debounced value
    const [debouncedValue, setDebouncedValue] = useState(value);
    const prod = useSelector(state => state.productList)
    const { error:  productError , loading: productLoading , products, success, allProducts } = prod

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

function Search( { onSearch, forToogle}) {

    const dispatch = useDispatch()
    const cat = useSelector(state => state.categoryList)
    const { allcategories, categories } = cat
    const prod = useSelector(state => state.productList)
    const { products, allProducts } = prod

    const navigate = useRouter()
    const [keyword, setKeyword] = useState('')
    //const location = useLocation();

    useEffect(() => {
        setKeyword((localStorage.getItem('keyword')))
        
    }, []);
    //const keyword = localStorage.getItem('keyword')

    const [pretraga, setPretraga] = useState('')
    const [high, setHigh] = useState([])


    const [pozicija, setPozicija] = useState([])
    const [boja, setBoja] = useState('')
    const [tip, setTip] = useState([])
    const [kategorija, setKategorija] = useState([])

   

    
    const memoizedValue = useMemo(() => {
        const value = {
            color: boja,
            high: high,
            type: tip,
            category: kategorija,
            flow: pozicija,
            search: pretraga,
            keyword: keyword
        }
        
        return value;
        }, [boja, high, tip, kategorija, pozicija, pretraga, keyword]);
        
    const debouncedSearchTerm = useDebounce(memoizedValue, 500);
    const initialRender = useRef(true)

    useEffect(()=>{
       
        if(!initialRender.current || (boja || high.length > 0 || tip.length > 0 || kategorija.length > 0 || pozicija.length > 0 || pretraga || keyword)){
            //dispatch(listFilterProducts(debouncedSearchTerm))
            
            forToogle(memoizedValue)
        }
        initialRender.current =false
        onSearch(debouncedSearchTerm)
        
         
    }, [dispatch, debouncedSearchTerm]);

    const submitHandler = (e) => {
        e.preventDefault()
        navigate.replace(`filter`, {state: debouncedSearchTerm})    
    }

    const btnStyle = {
        background: 'greenyellow',
        // backgroundImage: 'url(' + imgUrl + ')',
    };

    const type_plant = ["zimzelena", "listopadna", "višegodišnja","delimično zimzelena"]
    const mest_plant = ["sunce", "polusenka","hlad"]

  return (
    
    <Form onSubmit={submitHandler} >
        <Container fluid style={{display: 'flex', padding: '0.2rem'}}>
            <Row md={12} xl={12} style={{margin: 'auto', display: 'flex', textAlign:'left' , justifyContent:'left' , width:'100%' }}>
                
                <Row md={12} xl={12} style={{ padding:'0.5rem', width: '100%'}}>
                    <h6><strong style={{color:'#333333'}}>Kategorija biljke</strong></h6>
                        <CustomSelect  values={ catMemory?.slice().sort((a, b) =>{return a.order - b.order}).map(col => (
                            { value: col.name, label: col.name}
                            ))} onAction={setKategorija}>

                        </CustomSelect>
                </Row>

                <Row md={12} xl={12} style={{ padding:'0.5rem', width: '100%'}}>

                    <h6><strong style={{color:'#333333'}}>Tip biljke</strong></h6>
                        <CustomSelect values={ type_plant.map(col => (
                            { value: col, label: col}
                            ))} onAction={setTip}>

                        </CustomSelect>
                </Row>

                <Row md={12} xl={12} style={{ padding:'0.5rem', width: '100%'}}>
                
                    <h6><strong style={{color:'#333333'}}>Pozicija za sadnju</strong></h6>
                        <CustomSelect values={ mest_plant.map(col => (
                            { value: col, label: col}
                            ))} onAction={setPozicija}>

                        </CustomSelect>
                </Row>

                <Row md={12} xl={12} style={{}}>
                    
                    
                    <h6><strong style={{color:'#333333'}}>Boja cveta</strong></h6>
                        <Form.Control 
                            type='search'
                            name='boja'
                            inline ='true'
                            placeholder='Unesite boju...'
                            onChange={(e) => setBoja(e.target.value) }>
                        </Form.Control>
                   
                </Row>
                {/* style={{ display: 'flex', padding:'0.5rem', width: '100%'}} */}
                {/* <Row md={12} xl={12} style={{ }}> 
                        
                        <h6><strong style={{color:'#333333'}}>Pretraga Proizvoda:</strong></h6>
                            <Form.Control 
                                type='search'
                                name='pretraga'
                                inline ='true'
                                placeholder='Trazeni proizvod...'
                                onChange={(e) => setPretraga(e.target.value) }>
                            </Form.Control>     
                </Row> */}

                {/* <Row md={12}>
                    
                        <Button 
                            type='submit'
                            variant='outline-success'
                            className='p-2'
                            style={btnStyle}
                            disabled={true}>
                            Filter
                        </Button>
                
                </Row> */}
            
            </Row>
        </Container>
    </Form>
  )
}

export default Search