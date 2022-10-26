import React, { useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../compontents/Product'
import Kategorija from '../compontents/Kategorija'
import { useDispatch , useSelector } from 'react-redux'
import { listProducts } from '../store/product-actions'
import { listCategories } from '../store/category-actions'
import Loader from '../compontents/Loader'
import Message from '../compontents/Message'
import { useNavigate, useLocation } from "react-router-dom";
import { useParams, useSearchParams } from "react-router-dom";
import Paginate from '../compontents/Paginate'
import ProductCarucel from '../compontents/ProductCarusel'
import { CSSTransition } from 'react-transition-group'

function HomeScreen() {

  const dispatch = useDispatch()
  const cat = useSelector(state => state.categoryList)
  const { error, loading, categories } = cat
  const [search, setSearch] = useSearchParams();
  const keyword = search.get("keyword");

  useEffect(()=>{

    dispatch(listCategories())
        
 }, [dispatch, keyword]);

 
  return (
    <div>
        { true && <ProductCarucel></ProductCarucel>}
        
        <h1>Kategorije:</h1>
        { loading ? <Loader></Loader>
                 : error ? <Message variant='danger'>{error}</Message> 
                 :
                 <div >  
                    <Row >
                     {categories?.map(category => (
                     <Col key={category._id} sm={12} md={6} lg={4} xl={3} xs={6} className="d-flex">
                         <Kategorija category={category} />
                     </Col>
                      ))}
                      {/* <Paginate page={page} pages={pages} keyword={keyword}></Paginate> */}
                    </Row>
                </div>}
                
        
    </div>
  )
}

export default HomeScreen