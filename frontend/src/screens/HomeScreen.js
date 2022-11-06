import React, { useEffect , useState} from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import Product from '../compontents/Product'
import Kategorija from '../compontents/Kategorija'
import Search from '../compontents/Search'
import { useDispatch , useSelector } from 'react-redux'
import { listFilterProducts } from '../store/product-actions'
import { listCategories } from '../store/category-actions'
import Loader from '../compontents/Loader'
import Message from '../compontents/Message'
import { useNavigate, useLocation } from "react-router-dom";
import { useParams, useSearchParams } from "react-router-dom";
import Paginate from '../compontents/Paginate'
import ProductCarucel from '../compontents/ProductCarusel'
import { CSSTransition } from 'react-transition-group'
import Sidebar from "../compontents/UI/SideBar"
import SearchModal from '../compontents/UI/SearchModal'
import useScreenType from "react-screentype-hook";
import MUISearchModal from '../compontents/UI/MUISearchModal'

function HomeScreen() {

  const dispatch = useDispatch()
  const [carucel, setCarucel] = useState(true)
  const [ toggle, setToggle ] = useState(true)
  const [ val, setVal ] = useState({
    color: [],
    high: [],
    type: [],
    category: [],
    flow: [],
    search: ''
})
  const screenType = useScreenType();
  const cat = useSelector(state => state.categoryList)
  const { error: { categoryError}, loading:{ categoryLoading}, categories } = cat
  const prod = useSelector(state => state.productList)
  const { error: { productError }, loading:{ productLoading }, products } = prod
  const [search, setSearch] = useSearchParams();
  const keyword = search.get("keyword");

  useEffect(()=>{

    dispatch(listCategories())
    //dispatch(listFilterProducts(val))
        
 }, [dispatch, keyword]);


 const setSearchValue = (value) => {
  setVal(value)
  if(value.color?.length || value.high?.length || value.type?.length || value.category?.length  || value.flow?.length || value.search !== ''){
    setToggle(false)
    setCarucel(false)
  } else{
    setToggle(true)
    setCarucel(true)
  }
 }
 
  return (
    <div>
        { carucel && <ProductCarucel></ProductCarucel>}
        
        <h1> {carucel ? 'Kategorije:' : 'Filtrirani Proizvodi:'}</h1>
        {/* <Sidebar></Sidebar> */}
        {screenType.isMobile && <SearchModal onSearch={ setSearchValue}></SearchModal>} 
        {/* {screenType.isMobile && <MUISearchModal onSearch={ setSearchValue}></MUISearchModal>} */}
        { categoryLoading ? <Loader></Loader>
                 : categoryError ? <Message variant='danger'>{categoryError}</Message> 
                 :
                 <div > 
                  <Container fluid> 
                    <Row>
                      <Col sm={6} md={6} lg={8} xl={9} xs={12}>
                        { toggle ? (<Row >
                          {categories?.map(category => (
                          <Col key={category._id} sm={12} md={6} lg={4} xl={3} xs={6} className="d-flex">
                              <Kategorija category={category} />
                          </Col>
                            ))}
                            {/* <Paginate page={page} pages={pages} keyword={keyword}></Paginate> */}
                        </Row>) :
                        (<Row >
                          {products?.map(product => (
                          <Col key={product._id} sm={12} md={6} lg={4} xl={3} xs={6} className="d-flex">
                              <Product product={product} />
                          </Col>
                            ))} 
                            {/* <Paginate page={page} pages={pages} keyword={keyword}></Paginate> */}
                        </Row>)}
                      </Col>
                      { (screenType.isDesktop || screenType.isLargeDesktop) && <Col>
                          <Search onSearch={ setSearchValue}></Search> 
                      </Col> }
                    </Row>
                  </Container>
                  
                </div>}
                
        
    </div>
  )
}

export default HomeScreen