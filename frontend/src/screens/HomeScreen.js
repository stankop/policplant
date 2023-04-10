import React, { useEffect , useState, useRef, useMemo} from 'react'
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
import MDBCarusel from '../compontents/MDBCarusel'
import ReactCarusel from '../compontents/ReactCarusel'
import ProductCarusel from '../compontents/ProductCarusel'
import CarouselFadeExample from '../compontents/StaticCarusel'
import 'bootstrap/dist/css/bootstrap.min.css';
import { sliderClasses } from '@mui/material'
import { SimpleCarouselSlider } from 'react-simple-carousel-image-slider'
import Carousel from 'flat-carousel';
import MultiCaroseul from '../compontents/MultiCaroseul'
import Spinner from 'react-bootstrap/Spinner';

function HomeScreen() {

  const dispatch = useDispatch()
  const [carucel, setCarucel] = useState(true)
  const [ toggle, setToggle ] = useState(true)

  const screenType = useScreenType();
  const cat = useSelector(state => state.categoryList)
  const { error:  categoryError, loading: categoryLoading, categories } = cat
  const prod = useSelector(state => state.productList)
  const { error:  productError , loading: productLoading , products, success } = prod
  const [search, setSearch] = useSearchParams();
  const keyword = search.get("keyword");
  const customerLogo = useRef(true);
  const isFirst = useRef(true);

  useEffect(()=>{

    dispatch(listCategories())
    //dispatch(listFilterProducts(val))
         
  }, [dispatch]);

  // useEffect(()=>{
  //   // console.log('Ulazka:')
  //   // if(!customerLogo.current || products?.length < 60 ){
  //   //   console.log('Unutra:', products)
  //   //   if(products?.length < 60){
  //   //     console.log('Toggle:', toggle)
  //   //     setToggle(false)
  //   //     if(screenType.isMobile){
  //   //       if(products?.length === 0){
           
  //   //         setToggle(true)
  //   //       }
  //   //     }
  //   //   }else{
  //   //     setToggle(true)
  //   //   }
      
      
  //   //   customerLogo.current = false 
  //   // }    
  //   console.log('Prazno')
  // }, []);
  
  const searchFunc = useMemo(() => {
    const setSearchValue = (value) => {
     
      if(value.color?.length || value.high?.length || value.type?.length || value.category?.length  || value.flow?.length || value.search !== '' || !(value.keyword === '' || value.keyword === null)){
       setToggle(false)
       setCarucel(false)
       
     } else{
       setToggle(true)
       setCarucel(true)
      
     }
     
   }
   return setSearchValue
  }, [])

  const forToogle = (val) => {
    console.log('Mozda ovo', val)
    if(val?.keyword){
      setToggle(true)
      console.log('Rerender', val)
    }
  }
//  const setSearchValue = (value) => {
//     //setVal(value)
//     if(value.color?.length || value.high?.length || value.type?.length || value.category?.length  || value.flow?.length || value.search !== '' || value.keyword !== ''){
//      setToggle(false)
//      setCarucel(false)
//    } else{
//      setToggle(true)
//      setCarucel(true)
//    }
//    console.log('Mozda ovo', value)
//  }
 
  const orderCategories = categories?.slice().sort((a, b) =>{return a.order - b.order})
  

  return (
    <div style={ screenType.isMobile ? { backgroundColor: '#FFF' , margin:0} : { }}>
        {/* { carucel && <MDBCarusel itemRef={customerLogo}></MDBCarusel>}   */}
        {/* { carucel && <ReactCarusel ></ReactCarusel>} */}
        {/* { carucel && <CarouselFadeExample></CarouselFadeExample>}  */}
        {/* { carucel && <SimpleCarouselSlider images={slike} autoplay={false} width= "100%" height="450px"/>} */}
        {/* {  carucel && <DragCoruseal></DragCoruseal>} */}
        { carucel && <MultiCaroseul></MultiCaroseul>}

        <div style={{ textAlign:'center', margin:'1rem'}}><h1 style={{color:'red', alignItems:'center', fontSize:'2.5rem'}}> <strong>{ 'Sajt je u Pripremi!'}</strong></h1></div>
        <h1 style={{color:'#333333', fontSize:'1.2rem'}}> <strong>{carucel ? 'Detaljna pretraga:' : 'Filtrirani Proizvodi:'}</strong></h1>
        {/* <Sidebar></Sidebar> */}
        {screenType.isMobile && <SearchModal onSearch={ searchFunc} forToogle={ forToogle}></SearchModal>} 
        {/* {screenType.isMobile && <MUISearchModal onSearch={ setSearchValue}></MUISearchModal>} */}
        { categoryLoading ? <Loader></Loader>
                 : categoryError ? <Message variant='danger'>{categoryError}</Message> 
                 :
                 <div > 
                  <Container fluid > 
                    <Row>
                    { (screenType.isDesktop || screenType.isLargeDesktop) 
                      && 
                      <Col>
                          <div style={{ border:'.2rem solid #83B735', paddingBottom:'1rem', paddingLeft:'1rem'}}>
                            <Search onSearch={ searchFunc} forToogle={forToogle}></Search> 
                          </div>
                      </Col> 
                    }

                      <Col sm={6} md={6} lg={8} xl={9} xs={12}>
                        { !(products?.length > 0 && products?.length < 64)  
                        ? 
                          ( 
                            screenType.isMobile 
                            
                            ? 
                              (
                                <Row >
                                    {orderCategories?.map(category => (
                                    <Col  key={category._id} sm={6} md={6} lg={4} xl={3} xs={6} className="d-flex my-1 p-1">
                                        <Kategorija category={category} />
                                    </Col>
                                      ))}
                                      {/* <Paginate page={page} pages={pages} keyword={keyword}></Paginate> */}
                                </Row>
                              )
                            : 
                              ( ( toggle) 
                                ?
                                  (<Row  className={'gy-2'}>
                                    {orderCategories?.map(category => (
                                    <Col key={category._id} sm={12} md={6} lg={4} xl={3} xs={4} className="d-flex ">
                                        <Kategorija category={category} />
                                    </Col>
                                      ))}
                                      {/* <Paginate page={page} pages={pages} keyword={keyword}></Paginate> */}
                                  </Row>)
                                  :
                                  <Loader></Loader>
                              )
                          ) 
                        :
                          ( screenType.isMobile
                            
                            ? 
                          
                              <Row>
                                {products?.map(product => (
                                <Col key={product._id} sm={6} md={6} lg={4} xl={3} xs={6} className="d-flex">
                                    <Product product={product} />
                                </Col>
                                  ))} 
                                  {/* <Paginate page={page} pages={pages} keyword={keyword}></Paginate> */}
                              </Row> 
                            :
                              <Row>
                                {products?.map(product => (
                                <Col key={product._id} sm={6} md={6} lg={4} xl={3} xs={6} className="d-flex">
                                    <Product product={product} />
                                </Col>
                                  ))} 
                                  {/* <Paginate page={page} pages={pages} keyword={keyword}></Paginate> */}
                              </Row>
                          ) 
                        }
                      </Col>
                      {/* { (screenType.isDesktop || screenType.isLargeDesktop) && <Col>
                          <Search onSearch={ setSearchValue}></Search> 
                      </Col> } */}
                    </Row>
                  </Container>
                  
                </div>}
                
        
    </div>
  )
}

export default HomeScreen