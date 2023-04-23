'use client'
//import { Container } from "react-bootstrap";
import Header from "../compontents/Header";
import Footer from "../compontents/Footer";
import HomeScreen from "../screens/HomeScreen";


import { useState, useRef, useEffect } from "react";
import Cart from '../compontents/UI/Cart/Cart'
import Order from '../compontents/UI/Order/Order'
import { useRouter} from "next/router";


import { productsReset } from '../store/product-actions'
import { useDispatch, useSelector } from "react-redux";
import { listFilterProducts, getAllProducts } from '../store/product-actions'
import 'bootstrap/dist/css/bootstrap.min.css';
//import '../styles/globals.css'
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';
import Head from 'next/head'
import { Html, Main, NextScript } from 'next/document'
import Script from 'next/script'
//export const config = { amp: true }

function App() {

  const prod = useSelector(state => state.productList)
  const { error:  productError , loading: productLoading , products, success, allProducts } = prod

  const [cartIsShown, setCartIsShown] = useState(false)
  const [orderIsShown, setOrderIsShown] = useState(false)
  const [clearFil, setClearFil] = useState(false)
  const [seaBox, setSeaBox] = useState(false)

  const [value, setValue] = useState({})
  const [clear, setClear] = useState(false)
  //const screenType = useScreenType();
  const dispatch = useDispatch();
  const navigate = useRouter()

  const showCartHalnder = () =>{
    setCartIsShown(true)
  }

  const hideCartHanlder = () => {
    setCartIsShown(false)
  }

   const showOrderHalnder = (event) =>{
    setValue(event)
    setOrderIsShown(true)
  }

  const hideOrderHanlder = (event) => {
    setOrderIsShown(false)
  }

  const clearProducts = () => {
    setClear(true)
    dispatch(productsReset())
  }

  const clearFilter = () => {
    
    localStorage.setItem('filter', JSON.stringify([]))
    setClearFil(true)
   
  }

  const searchBox = (keyword) => {
    console.log('Searchbox mozda', keyword)

    let filter = allProducts?.map(val => {
      let search = []
      
      if (keyword){
        search.push(keyword)
        if ( keyword.toLowerCase().includes('ž') || keyword.toLowerCase().includes('z')){
            search.push(keyword.toLowerCase())
            search.push(keyword.toLowerCase().replace('ž','z'))
            search.push(keyword.toLowerCase().replace('z','ž'))
        }

        if (keyword.toLowerCase().includes('č') || keyword.toLowerCase().includes('c')){
            search.push(keyword.toLowerCase())
            search.push(keyword.toLowerCase().replace('č','c'))
            search.push(keyword.toLowerCase().replace('c','č'))
        }

        if (keyword.toLowerCase().includes('ć') || keyword.toLowerCase().includes('c')){
          search.push(keyword.toLowerCase())
          search.push(keyword.toLowerCase().replace('ć','c'))
          search.push(keyword.toLowerCase().replace('c','ć'))
      }
            
        if (keyword.toLowerCase().includes('š') || keyword.toLowerCase().includes('s')){
            search.push(keyword.toLowerCase())
            search.push(keyword.toLowerCase().replace('š','s'))
            search.push(keyword.toLowerCase().replace('s','š'))
        }
    }
      
      return {search: search,
              val: val}
    }).filter(x => x.search?.some(y => x.val?.name?.toLowerCase().includes(y.toLowerCase())) || x.search?.some(y => x.val?.hesteg?.toLowerCase().includes(y.toLowerCase()))
     || x.search?.some(y => x.val?.color?.toLowerCase().includes(y.toLowerCase())) || x.search?.some(y => x.val?.botanicki_naziv?.toLowerCase().includes(y.toLowerCase()))
     ||  x.search?.some(y => x.val?.description?.toLowerCase().includes(y.toLowerCase())))?.map(y =>
      {return y.val})
    

    // let filter = allProducts?.filter(x => x.name?.toLowerCase().includes(keyword.toLowerCase()) || x.hesteg?.toLowerCase().includes(keyword.toLowerCase()) 
    // || x.color?.toLowerCase().includes(keyword.toLowerCase()) || x.botanicki_naziv?.toLowerCase().includes(keyword.toLowerCase()))
    //.filter(x => ukupno?.some( item => x.search?.some(item2 => item2?.includes(item))))
    
    if(filter?.length > 0 && filter?.length < 144){
      localStorage.setItem('filter', JSON.stringify(filter))
    }else{
      localStorage.setItem('filter', JSON.stringify([]))
    }
   
    setClearFil(true)
    navigate.replace('/')
  }

  useEffect(() => {
 
    setClearFil(false)
  }, [clearFil]);

  return (
    //<Router>
    <div>
    {/* <Html> */}
      <Head >
        <meta charset="utf-8" />
        {/* <!-- <link rel="shortcut icon" type="image/png" href="%PUBLIC_URL%/favicon.ico" /> --> */}
        <link rel="shortcut icon" type="image/png" href="/static/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta
        name="description"
        content="Web site created using create-react-app"
        />
        <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css"/>
        {/* <!--
        manifest.json provides metadata used when your web app is installed on a
        user's mobile device or desktop. See https://developers.google.com/web/fundamentals/web-app-manifest/
        --> */}
        <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" rel="stylesheet" />
        {/* <!-- <link rel="manifest" href="/backend/frontend/build/manifest.json" crossorigin=”use-credentials” /> --> */}
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g==" crossorigin="anonymous" referrerpolicy="no-referrer" />
        {/* <!--
        Notice the use of %PUBLIC_URL% in the tags above.
        It will be replaced with the URL of the `public` folder during the build.
        Only files inside the `public` folder can be referenced from the HTML.

        Unlike "/favicon.ico" or "favicon.ico", "%PUBLIC_URL%/favicon.ico" will
        work correctly both with client-side routing and a non-root public URL.
        Learn how to configure a non-root public URL by running `npm run build`.
        --> */}
        
        <title>Rasadnik Ema</title>
      </Head>
        { cartIsShown &&  <Cart onClose={hideCartHanlder}></Cart> }
        { orderIsShown &&  <Order onClose={hideOrderHanlder} value={value}></Order> }
        {<Header onShowCart={showCartHalnder} clearProducts={clearProducts} clearFilter={clearFilter} searchBox={searchBox}/> }
        <main >
        
            <div className="container-fluid" style={ isMobile ? { backgroundColor: '#FFF' , width:'100%', margin:0} : { backgroundColor: '#FFF' , width:'85%'}}>
            
                <HomeScreen clearProducts={clear} key={clearFil} clearFilter={clearFil}/>
            
         
        </div>
        
      </main>
      <Footer />
    {/* </Html> */}
    </div>
    //</Router>
  );
}

export default App;
