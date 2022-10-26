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

function CategoryScreen() {

  const dispatch = useDispatch()
  const prod = useSelector(state => state.productList)
  const { error, loading, products } = prod
  const cat = useSelector(state => state.categoryList)
  const { error: catError, loading: carLoading, categories: catProducts } = cat
  const [search, setSearch] = useSearchParams();
  const { id } = useParams();
  //const id = search.get("id");

  useEffect(()=>{

    dispatch(listProducts())
        
 }, [dispatch, id]);

 
  return (
    <div>
        { false && <ProductCarucel></ProductCarucel>}
        
        <h1>{ catProducts?.find( cat => cat._id.toString() === id)?.name}</h1>
        { loading ? <Loader></Loader>
                 : error ? <Message variant='danger'>{error}</Message> 
                 :
                 <div >  
                    <Row >
                     {products?.filter(product => product.category.toString() === id).length == 0 ? <div>Trenutno nema proizvoda iz ove kategorije na stanju.</div> : products?.filter(product => product.category.toString() === id).map(product => (
                     <Col key={product._id} sm={12} md={6} lg={4} xl={3} xs={6} className="d-flex">
                         <Product product={product} />
                     </Col>
                      ))}

                      {/* <Paginate page={page} pages={pages} keyword={keyword}></Paginate> */}
                    </Row>
                </div>}
                
        
    </div>
  )
}

export default CategoryScreen