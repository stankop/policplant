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
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Cart from './compontents/UI/Cart/Cart'
import Order from './compontents/UI/Order/Order'

function App() {

  const [cartIsShown, setCartIsShown] = useState(false)
  const [orderIsShown, setOrderIsShown] = useState(false)

  const [value, setValue] = useState({})

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

  return (
    <Router>
      { cartIsShown &&  <Cart onClose={hideCartHanlder}></Cart> }
      { orderIsShown &&  <Order onClose={hideOrderHanlder} value={value}></Order> }
      {<Header onShowCart={showCartHalnder}/> }
      <main className="py-3">
        <Container className="container-fluid">
          <Routes>
            <Route path="/" element={<HomeScreen />} exact></Route>
            <Route path="/products/:id" element={<ProductScreen />}></Route>
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
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
