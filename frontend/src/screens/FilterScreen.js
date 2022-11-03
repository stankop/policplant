import React, { useEffect, useState } from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import Product from '../compontents/Product'
import Kategorija from '../compontents/Kategorija'
import { useDispatch , useSelector } from 'react-redux'
import { listProducts, listFilterProducts } from '../store/product-actions'
import { listCategories } from '../store/category-actions'
import Loader from '../compontents/Loader'
import Message from '../compontents/Message'
import { useNavigate, useLocation } from "react-router-dom";
import { useParams, useSearchParams } from "react-router-dom";
import Paginate from '../compontents/Paginate'
import ProductCarucel from '../compontents/ProductCarusel'
import { CSSTransition } from 'react-transition-group'
import Search from '../compontents/Search'


function FilterScreen() {

  const dispatch = useDispatch()
  const prod = useSelector(state => state.productList)
  const { error, loading, products } = prod
  const cat = useSelector(state => state.categoryList)
  const { error: catError, loading: carLoading, categories: catProducts } = cat
  const [search, setSearch] = useSearchParams();
  const { id } = useParams();

  const location = useLocation();
  
    useEffect(()=>{

        dispatch(listFilterProducts(location.state))
        
    }, [dispatch, location.state]);

    const setSearchValue = (value) => {
        
       }
 
  return (
    <div>
        { false && <ProductCarucel></ProductCarucel>}
        
        <h2>Filtrirani proizvodi:</h2>
        { loading ? <Loader></Loader>
                 : error ? <Message variant='danger'>{error}</Message> 
                 :
                 <div >  
                    <Container fluid> 
                    <Row>
                      <Col sm={8} md={8} lg={8} xl={9} xs={8}>
                        <Row >
                          {products?.map(product => (
                          <Col key={product._id} sm={12} md={6} lg={4} xl={3} xs={12} className="d-flex">
                              <Product product={product} />
                          </Col>
                            ))}
                            {/* <Paginate page={page} pages={pages} keyword={keyword}></Paginate> */}
                        </Row>
                      </Col>
                      <Col>
                          <Search onSearch={ setSearchValue}></Search>
                      </Col>
                    </Row>
                  </Container>
                </div>}
                
        
    </div>
  )
}

export default FilterScreen