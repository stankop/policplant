'use client'
import React, { useEffect , useState, useRef, useMemo} from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import Product from '../compontents/Product'
import Kategorija from '../compontents/Kategorija'
import Search from '../compontents/Search'
import { useDispatch , useSelector } from 'react-redux'
import { listFilterProducts, getAllProducts } from '../store/product-actions'
import { listCategories } from '../store/category-actions'
import Loader from '../compontents/Loader'
import Message from '../compontents/Message'
//import { useNavigate, useLocation } from "react-router-dom";
//import { useParams, useSearchParams } from "react-router-dom";
import Paginate from '../compontents/Paginate'
import ProductCarucel from '../compontents/ProductCarusel'
import { CSSTransition } from 'react-transition-group'
//import Sidebar from "../compontents/UI/SideBar"
import SearchModal from '../compontents/UI/SearchModal'
//import useScreenType from "react-screentype-hook";
//import MUISearchModal from '../compontents/UI/MUISearchModal'
//import MDBCarusel from '../compontents/MDBCarusel'
//import ReactCarusel from '../compontents/ReactCarusel'
//import ProductCarusel from '../compontents/ProductCarusel'
//import CarouselFadeExample from '../compontents/StaticCarusel'
import 'bootstrap/dist/css/bootstrap.min.css';
//import { sliderClasses } from '@mui/material'
//import { SimpleCarouselSlider } from 'react-simple-carousel-image-slider'
//import Carousel from 'flat-carousel';
import MultiCaroseul from '../compontents/MultiCaroseul'
//import Spinner from 'react-bootstrap/Spinner';
import _ from 'lodash'
//import { faCommentsDollar } from '@fortawesome/free-solid-svg-icons'
import { catMemory } from '../compontents/UI/categories'
import { products as prodMemory } from '../compontents/UI/allProducts'
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';


function HomeScreen({clearProducts, clearFilter}) {

  //const dispatch = useDispatch()
  const [carucel, setCarucel] = useState(true)
  const [ toggle, setToggle ] = useState(true)
  const all = useRef([])
  const [filter, setFilter] = useState([])
  //const screenType = useScreenType();
  const dispatch = useDispatch();
  

  const cat = useSelector(state => state.categoryList)
  const { error:  categoryError, loading: categoryLoading, categories } = cat
  const prod = useSelector(state => state.productList)
  const { error:  productError , loading: productLoading , products, success, allProducts } = prod
  //const [search, setSearch] = useSearchParams();
  //const keyword = search.get("keyword");
  const customerLogo = useRef(true);
  const isFirst = useRef(true);

  // useEffect(()=>{

  //   dispatch(listCategories())
         
  // }, [dispatch]);

  // useEffect(()=>{

  //   dispatch(getAllProducts())
         
  // }, [dispatch]);

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

  useEffect(() => {
   
    
    dispatch(getAllProducts())
    
    
  }, [dispatch]);
  
  const searchFunc = useMemo(() => {
    const setSearchValue = (value) => {
     
      if((value.color?.length || value.high?.length || value.type?.length || value.category?.length  || value.flow?.length || value.search !== '' || !(value.keyword === '' || value.keyword === null)) && clearProducts){
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
    
    
    const cati = []
    const flow = []
    const type = []
    const color = []

    if(val?.category?.length){
      Array.from(val?.category)?.forEach(cat => {
        let temp = allProducts?.filter(x => Array.from(x.category)?.map(y => y.name).includes(cat.value))
        cati?.push(...temp)
      })

    }

    if(val?.type?.length){
      Array.from(val?.type)?.forEach(cat => {
        let temp = allProducts?.filter(x => x.type_of_plant?.toLowerCase() === cat.value?.toLowerCase())
        type?.push(...temp)
      })
 
    }

    if(val?.flow?.length){
      Array.from(val?.flow)?.forEach(cat => {
        let temp = allProducts?.filter(x => typeof x.mesto_sadnje === "string" ?  x.mesto_sadnje.toLowerCase() === cat.value?.toLowerCase() : Array.from(x.mesto_sadnje)?.includes(cat.value.toLowerCase()))
        flow?.push(...temp)
      })
      
      
    }

    if(val?.color){
      
      let ukupno = []
      if (val?.color){
          ukupno.push(val?.color.toLowerCase())
          if ( val?.color.toLowerCase().includes('ž') || val?.color.toLowerCase().includes('z')){
            ukupno.push(val?.color.toLowerCase())
            ukupno.push(val?.color.toLowerCase().replace('ž','z'))
            ukupno.push(val?.color.toLowerCase().replace('z','ž'))
          }

          if (val?.color.toLowerCase().includes('č') || val?.color.toLowerCase().includes('c')){
            ukupno.push(val?.color.toLowerCase())
            ukupno.push(val?.color.toLowerCase().replace('č','c'))
            ukupno.push(val?.color.toLowerCase().replace('c','č'))
          }

          if (val?.color.toLowerCase().includes('ć') || val?.color.toLowerCase().includes('c')){
            ukupno.push(val?.color.toLowerCase())
            ukupno.push(val?.color.toLowerCase().replace('ć','c'))
            ukupno.push(val?.color.toLowerCase().replace('c','ć'))
          }
              
          if (val?.color.toLowerCase().includes('š') || val?.color.toLowerCase().includes('s')){
            ukupno.push(val?.color.toLowerCase())
            ukupno.push(val?.color.toLowerCase().replace('š','s'))
            ukupno.push(val?.color.toLowerCase().replace('s','š'))
          }
          
      }

      let temp = allProducts?.map(val => {
        let search = []
        
        if (val?.color){
          search.push(val.color)
          if ( val?.color.toLowerCase().includes('ž') || val?.color.toLowerCase().includes('z')){
              search.push(val?.color.toLowerCase())
              search.push(val?.color.toLowerCase().replace('ž','z'))
              search.push(val?.color.toLowerCase().replace('z','ž'))
          }

          if (val?.color.toLowerCase().includes('ć') || val?.color.toLowerCase().includes('c')){
              search.push(val?.color.toLowerCase())
              search.push(val?.color.toLowerCase().replace('ć','c'))
              search.push(val?.color.toLowerCase().replace('c','ć'))
          }

          if (val?.color.toLowerCase().includes('č') || val?.color.toLowerCase().includes('c')){
            search.push(val?.color.toLowerCase())
            search.push(val?.color.toLowerCase().replace('č','c'))
            search.push(val?.color.toLowerCase().replace('c','č'))
        }
              
          if (val?.color.toLowerCase().includes('š') || val?.color.toLowerCase().includes('s')){
              search.push(val?.color.toLowerCase())
              search.push(val?.color.toLowerCase().replace('š','s'))
              search.push(val?.color.toLowerCase().replace('s','š'))
          }
      }
        
        return {search: search,
                val: val}
      }).filter(x => ukupno?.some( item => x.search?.some(item2 => item2?.includes(item))))

      

      if(temp?.map(x => x.val)?.length){
        color.push(...temp?.map(x => x.val))
      }else{
        color.push('1111')
      }
    }

    const catiIds = Array.from(cati?.map(x => x._id))
    const typeIds = Array.from(type?.map(x => x._id))
    const flowIds = Array.from(flow?.map(x => x._id))
    const colorIds = Array.from(color?.map(x => x._id))

    var temp = []
    var ukupno = []
    temp.push(catiIds)
    temp.push(typeIds)
    temp.push(flowIds)
    temp.push(colorIds)
    temp.forEach(x => {
      if(x.length){
        ukupno.push(x)
      }
    })

    
    if(ukupno.length){
      var a = _.intersection.apply(_, ukupno);
      all.current = a
      let broj = allProducts?.filter(x => all.current?.includes(x._id))
      setFilter(broj)
      localStorage.setItem('filter', JSON.stringify(broj))
      
    } else {
      all.current = []
      setFilter([])
      localStorage.setItem('filter', [])
    }
    
  }

  useEffect(() => {
    

    if(localStorage.getItem('filter')){
      const items = JSON.parse(localStorage.getItem('filter'))
      console.log('Items:', items)
      if(items?.length !== 0){
        setFilter(items)
        window.scrollTo({
          top: 500,
          left: 200,
          behavior: "smooth"
        });
      }
    }
    
  }, []);

  

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

  const orderCategories = catMemory?.slice().sort((a, b) =>{return a.order - b.order})

  return (
    <div style={isMobile ? { backgroundColor: '#FFF' , margin:0} : { }}>
        {/* { carucel && <MDBCarusel itemRef={customerLogo}></MDBCarusel>}   */}
        {/* { carucel && <ReactCarusel ></ReactCarusel>} */}
        {/* { carucel && <CarouselFadeExample></CarouselFadeExample>}  */}
        {/* { carucel && <SimpleCarouselSlider images={slike} autoplay={false} width= "100%" height="450px"/>} */}
        {/* {  carucel && <DragCoruseal></DragCoruseal>} */}
        { carucel && <MultiCaroseul></MultiCaroseul>}

        <div style={{ textAlign:'center', margin:'1rem'}}><h1 style={{color:'red', alignItems:'center', fontSize:'2.5rem'}}> <strong>{ 'Sajt je u Pripremi!'}</strong></h1></div>
        <h1 style={{color:'#333333', fontSize:'1.2rem'}}> <strong>{carucel ? 'Detaljna pretraga:' : 'Filtrirani Proizvodi:'}</strong></h1>
        {/* <Sidebar></Sidebar> */}
        {isMobile && <SearchModal onSearch={ searchFunc} forToogle={ forToogle}></SearchModal>} 
        {/* {screenType.isMobile && <MUISearchModal onSearch={ setSearchValue}></MUISearchModal>} */}
        { false ?  //categoryLoading
                  <Loader></Loader>
                 : false //categoryError
                   ? 
                   <Message variant='danger'>{categoryError}</Message> 
                   :
                 <div > 
                  <Container fluid > 
                    <Row>
                    { (!isMobile) 
                      && 
                      <Col>
                          <div style={{ border:'.2rem solid #83B735', borderRadius: '1rem', paddingBottom:'1rem', paddingLeft:'1rem'}}>
                            <Search onSearch={ searchFunc} forToogle={forToogle}></Search> 
                          </div>
                      </Col> 
                    }

                      <Col sm={6} md={6} lg={8} xl={9} xs={12}>
                        { filter?.length === 0 

                          ? 

                          ( 
                            isMobile 
                            
                            ? 
                              
                              
                                (<Row >
                                    {orderCategories?.map(category => (
                                    <Col  key={category._id} sm={6} md={6} lg={4} xl={3} xs={6} className="d-flex my-1 p-1">
                                        <Kategorija category={category} />
                                    </Col>
                                      ))}
                                      {/* <Paginate page={page} pages={pages} keyword={keyword}></Paginate> */}
                                </Row>)
                                
                              
                            : 
                              ( 
                               
                                (<Row  className={'gy-2'}>
                                  {orderCategories?.map(category => (
                                  <Col key={category._id} sm={12} md={6} lg={4} xl={3} xs={4} className="d-flex my-1 p-1">
                                      <Kategorija category={category} />
                                  </Col>
                                    ))}
                                    {/* <Paginate page={page} pages={pages} keyword={keyword}></Paginate> */}
                                </Row>)
                                 
                              )
                          ) 
                          :
                          ( isMobile
                            
                            ? 
                          
                              <Row>
                                {filter?.map(product => (
                                <Col key={product._id} sm={6} md={6} lg={4} xl={3} xs={6} className="d-flex">
                                    <Product product={product} />
                                </Col>
                                  ))} 
                                  {/* <Paginate page={page} pages={pages} keyword={keyword}></Paginate> */}
                              </Row> 
                            :
                              <Row>
                                {filter?.map(product => (
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