import React, { useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../compontents/Product'
import { useDispatch , useSelector } from 'react-redux'
import { listProducts } from '../store/product-actions'
import Loader from '../compontents/Loader'
import Message from '../compontents/Message'
import { useNavigate, useLocation } from "react-router-dom";
import { useParams, useSearchParams } from "react-router-dom";
import Paginate from '../compontents/Paginate'
import ProductCarucel from '../compontents/ProductCarusel'

function HomeScreen() {

  const dispatch = useDispatch()
  const product = useSelector(state => state.productList)
  const { error, loading, products, page, pages } = product
  const [search, setSearch] = useSearchParams();
  const keyword = search.get("keyword");
  
  console.log('uspehhhhhh:',page,keyword,page,pages)

  useEffect(()=>{

    dispatch(listProducts(keyword,page))
        
 }, [dispatch, keyword]);

 
  return (
    <div>
        { !keyword && <ProductCarucel></ProductCarucel>}
        
        <h1>Proizvodi:</h1>
        { loading ? <Loader></Loader>
                 : error ? <Message variant='danger'>{error}</Message> 
                 :
                 <div>  
                    <Row>
                     {products?.map(product => (
                     <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                         <Product product={product}/>
                     </Col>
                      ))}
                      <Paginate page={page} pages={pages} keyword={keyword}></Paginate>
                    </Row>
                </div>}
                
        
    </div>
  )
}

export default HomeScreen