import { Container } from "react-bootstrap";
import Header from "./compontents/Header";
import Footer from "./compontents/Footer";
import HomeScreen from "./screens/HomeScreen";
import CategoryScreen from "./screens/CategoryScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/UserListScreen";
import ProductListScreen from "./screens/ProductListScreen";
import InfoScreen from "./screens/InfoScreen";
import ONamaScreen from "./screens/ONamaScreen";
import KontaktScreen from "./screens/KontakScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ProductEditScreen from "./screens/ProductEditScreen"
import ProductCreateScreen from "./screens/ProductCreateScreen"
import OrderListScreen from "./screens/OrderListScreen"
import FilterScreen from "./screens/FilterScreen"
import { HashRouter as Router, useNavigate, Route, Routes } from "react-router-dom";
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
    let filter = allProducts?.filter(x => x.name?.toLowerCase().includes(keyword.toLowerCase()) || x.hesteg?.toLowerCase().includes(keyword.toLowerCase()))
    
    if(filter?.length > 0 && filter?.length < 131){
      localStorage.setItem('filter', JSON.stringify(filter))
    }else{
      localStorage.setItem('filter', JSON.stringify([]))
    }
   
    setClearFil(true)
   
  }

  useEffect(() => {
 
    console.log('Useefect')
    setClearFil(false)
  }, [clearFil]);

  return (
    <Router>
      { cartIsShown &&  <Cart onClose={hideCartHanlder}></Cart> }
      { orderIsShown &&  <Order onClose={hideOrderHanlder} value={value}></Order> }
      {<Header onShowCart={showCartHalnder} clearProducts={clearProducts} clearFilter={clearFilter} searchBox={searchBox}/> }
      <main >
        
        <div className="container-fluid" style={ screenType.isMobile ? { backgroundColor: '#FFF' , width:'100%', margin:0} : { backgroundColor: '#FFF' , width:'80%'}}>
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
    </Router>
  );
}

export default App;
