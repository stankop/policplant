import React, { useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../compontents/Product'
import Kategorija from '../compontents/Kategorija'
import { useDispatch , useSelector } from 'react-redux'
import { listProducts, productsReset } from '../store/product-actions'
import { listCategories } from '../store/category-actions'
import Loader from '../compontents/Loader'
import Message from '../compontents/Message'
import { useNavigate, useLocation } from "react-router-dom";
import { useParams, useSearchParams } from "react-router-dom";
import Paginate from '../compontents/Paginate'
import ProductCarucel from '../compontents/ProductCarusel'
import { CSSTransition } from 'react-transition-group'
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from "react-router-dom";
import DOMPurify from 'dompurify';
import useScreenType from "react-screentype-hook";

function CategoryScreen() {

  const dispatch = useDispatch()
  const prod = useSelector(state => state.productList)
  const { error, loading, products, allProducts } = prod
  const cat = useSelector(state => state.categoryList)
  const { error: catError, loading: carLoading, categories: catProducts } = cat
  const [search, setSearch] = useSearchParams();
  const { id } = useParams();
  //const id = search.get("id");
  const screenType = useScreenType();

  useEffect(()=>{
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
      })
   //dispatch(listProducts(id))
        
 }, [dispatch, id]);

 const htmlString = {__html: DOMPurify.sanitize(catProducts?.find( cat => cat._id?.toString() === id)?.description)}
 
 const bordureImages = ['https://policplantblob.blob.core.windows.net/policplant-banner/Bordura1.png',
                        'https://policplantblob.blob.core.windows.net/policplant-banner/Bordura2.png',
                        'https://policplantblob.blob.core.windows.net/policplant-banner/Bordura3.png',
                        'https://policplantblob.blob.core.windows.net/policplant-banner/Bordura4.png',
                        'https://policplantblob.blob.core.windows.net/policplant-banner/Bordura5.png',
                        'https://policplantblob.blob.core.windows.net/policplant-banner/Bordura6.png',
                        'https://policplantblob.blob.core.windows.net/policplant-banner/Bordura7.png']
                        
  const resetProducts = () => {
    dispatch(productsReset())
  }
 const filter = allProducts?.filter(product => product?.category?.map(x => x._id.toString())?.includes(id))
  return (
    <div>
        { false && <ProductCarucel></ProductCarucel>}
        <Breadcrumb style={{ paddingTop:'1.7rem'}}>
          <Breadcrumb.Item href="/"><i className="fa fa-home" style={{color:'green'}}></i></Breadcrumb.Item>
          <Breadcrumb.Item  active>
            { catProducts?.find( cat => cat._id?.toString() === id)?.name}
          
          </Breadcrumb.Item>
          
        </Breadcrumb>
        <Link to={-1} className='btn btn-success  my-3' onClick={resetProducts}> Nazad</Link>
        <h1 style={{color:'#333333'}}>{ catProducts?.find( cat => cat._id?.toString() === id)?.name}</h1>
        
        {/* <p>{ catProducts?.find( cat => cat._id?.toString() === id)?.description}</p> */}
        <p dangerouslySetInnerHTML={htmlString}></p>
        <div >
          <img alt='Bordura' style={screenType.isMobile ? {maxWidth:'95%', margin:'.5rem'} : { margin:'.5rem'}}  src={bordureImages[(Math.random() * bordureImages.length) | 0]} ></img>
          
        </div>
        { !filter?.length ? <Loader></Loader>
                 : error ? <Message variant='danger'>{error}</Message> 
                 :
                 <div >  
                    <Row >
                     {filter?.length === 0 ? <div>Trenutno nema proizvoda iz ove kategorije na stanju.</div> : filter?.filter(product => product?.category?.map(x => x._id.toString())?.includes(id))?.map(product => (
                     <Col key={product._id} sm={12} md={6} lg={4} xl={3} xs={6} className="d-flex">
                         <Product product={product} catId={id} />
                     </Col>
                      ))}

                      {/* <Paginate page={page} pages={pages} keyword={keyword}></Paginate> */}
                    </Row>
                </div>}
                
        
    </div>
  )
}

export default CategoryScreen