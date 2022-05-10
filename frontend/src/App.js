import { Container } from "react-bootstrap";
import Header from "./compontents/Header";
import Footer from "./compontents/Footer";
import HomeScreen from "./screens/HomeScreen";
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
import { HashRouter as Router, Route, Routes } from "react-router-dom";


function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/" element={<HomeScreen />} exact></Route>
            <Route path="/products/:id" element={<ProductScreen />}></Route>
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
            <Route path="/placeorder" element={<PlaceOrderScreen />}></Route>
            <Route path="/order/:id" element={<OrderScreen />}></Route>
            <Route path="/admin/userlist" element={<UserListScreen />}></Route>
            <Route path="/admin/productlist" element={<ProductListScreen />}></Route>
            <Route path="/info" element={<InfoScreen />}></Route>
            <Route path="/onama" element={<ONamaScreen />}></Route>
            <Route path="/kontakt" element={<KontaktScreen />}></Route>
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
