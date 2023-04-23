import { Container } from "react-bootstrap";
import Header from "./compontents/Header";
import Footer from "../src/compontents/Footer";
import HomeScreen from "../src/screens/HomeScreen";
import CategoryScreen from "../src../src/screens/CategoryScreen";
import ProductScreen from "../src/screens/ProductScreen";
import CartScreen from "../src/screens/CartScreen";
import LoginScreen from "../src/screens/LoginScreen";
import RegisterScreen from "../src/screens/RegisterScreen";
import ProfileScreen from "../src/screens/ProfileScreen";
import ShippingScreen from "../src/screens/ShippingScreen";
import PaymentScreen from "../src/screens/PaymentScreen";
import PlaceOrderScreen from "../src/screens/PlaceOrderScreen";
import OrderScreen from "../src/screens/OrderScreen";
import UserListScreen from "../src/screens/UserListScreen";
import ProductListScreen from "../src/screens/ProductListScreen";
import InfoScreen from "../src/screens/InfoScreen";
import ONamaScreen from "../src/screens/ONamaScreen";
import KontaktScreen from "../src/screens/KontakScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ProductEditScreen from "./screens/ProductEditScreen"
import ProductCreateScreen from "./screens/ProductCreateScreen"
import OrderListScreen from "./screens/OrderListScreen"
import FilterScreen from "./screens/FilterScreen"
import { HashRouter as Router, useNavigate, Route, Routes, Navigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import Cart from './compontents/UI/Cart/Cart'
import Order from './compontents/UI/Order/Order'
import InformacijeIsporuka from './screens/InformacijeIsporuka'
import InformacijePorucivanje from './screens/InformacijePorucivanje'
import InformacijePitanja from './screens/InformacijePitanja'
import InformacijeReklamacije from './screens/InformacijeReklamacije'
import InformacijePrivatnost from './screens/InformacijePrivatnost'
import useScreenType from "react-screentype-hook";
import { productsReset } from './store/product-actions'
import { useDispatch, useSelector } from "react-redux";
import { listFilterProducts, getAllProducts } from './store/product-actions'

function App() {

  const prod = useSelector(state => state.productList)
  const { error:  productError , loading: productLoading , products, success, allProducts } = prod

  const [cartIsShown, setCartIsShown] = useState(false)
  const [orderIsShown, setOrderIsShown] = useState(false)
  const [clearFil, setClearFil] = useState(false)
  const [seaBox, setSeaBox] = useState(false)

  const [value, setValue] = useState({})
  const [clear, setClear] = useState(false)
  const screenType = useScreenType();
  const dispatch = useDispatch();
  const navigate = useNavigate()

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
    navigate('/')
  }

  useEffect(() => {
 
    setClearFil(false)
  }, [clearFil]);

  return (
    //<Router>
    <div>
      { cartIsShown &&  <Cart onClose={hideCartHanlder}></Cart> }
      { orderIsShown &&  <Order onClose={hideOrderHanlder} value={value}></Order> }
      {<Header onShowCart={showCartHalnder} clearProducts={clearProducts} clearFilter={clearFilter} searchBox={searchBox}/> }
      <main >
        
        <div className="container-fluid" style={ screenType.isMobile ? { backgroundColor: '#FFF' , width:'100%', margin:0} : { backgroundColor: '#FFF' , width:'85%'}}>
          <Routes>
            <Route path="/" element={<HomeScreen clearProducts={clear} key={clearFil} clearFilter={clearFil}/>} exact></Route>
            <Route path="/products/:id/:catId" element={<ProductScreen />}></Route>
            <Route path="/categories/:id" element={<CategoryScreen />}></Route>
            <Route path="/filter" element={<FilterScreen />}></Route>
            <Route path="/cart" >
              <Route path=":qty" element={<CartScreen />} />
              <Route path=":id" element={<CartScreen />} />
              <Route path="" element={<CartScreen />} />
            </Route>
            <Route path="/login" element={<LoginScreen />}></Route>
            <Route path="/register" element={<RegisterScreen />}></Route>
            <Route path="/profile" element={<ProfileScreen />}></Route>
            <Route path="/shipping" element={<ShippingScreen />}></Route>
            <Route path="/payment" element={<PaymentScreen />}></Route>
            <Route path="/placeorder" element={<PlaceOrderScreen onShowOrder={showOrderHalnder} />}></Route>
            <Route path="/order/:id" element={<OrderScreen />}></Route>
            <Route path="/admin/userlist" element={<UserListScreen />}></Route>
            <Route path="/admin/productlist" element={<ProductListScreen />}></Route>
            <Route path="/admin/createproduct" element={<ProductCreateScreen />}></Route>
            <Route path="/info" element={<InfoScreen />}></Route>
            <Route path="/onama" element={<ONamaScreen />}></Route>
            <Route path="/kontakt" element={<KontaktScreen />}></Route>
            <Route path="/admin/user/:id/edit" element={<UserEditScreen />}></Route>
            <Route path="/admin/product/:id/edit" element={<ProductEditScreen />}></Route>
            <Route path="/admin/orderlist" element={<OrderListScreen />}></Route>
            <Route path="/isporuke" element={<InformacijeIsporuka />}></Route>
            <Route path="/porucivanje" element={<InformacijePorucivanje />}></Route>
            <Route path="/pitanja" element={<InformacijePitanja />}></Route>
            <Route path="/reklamacije" element={<InformacijeReklamacije />}></Route>
            <Route path="/privatnost" element={<InformacijePrivatnost />}></Route>
          </Routes>
        </div>
        
      </main>
      <Footer />
    </div>
    //</Router>
  );
}

export default App;
