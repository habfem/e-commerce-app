import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./components/screens/HomeScreen";
import ProductScreen from './components/screens/ProductScreen';
import CartScreen from './components/screens/CartScreen';
import LoginScreen from './components/screens/LoginScreen';
import RegisterScreen from './components/screens/RgisterScreen';
import ProfileScreen from './components/screens/ProfileScreen';
import ShippingScreen from './components/screens/ShippingScreen';
import PaymentScreen from './components/screens/PaymentScreen';
import PlaceOrderScreen from './components/screens/PlaceOrderScreen';
import OrderScreen from './components/screens/OrderScreen';
import UserListScreen from './components/screens/UserListScreen';
import UserEditScreen from './components/screens/UserEditScrren';
import ProductListScreen from './components/screens/ProductListScreen';
import ProductEditScreen from './components/screens/ProductEditScreen';
import OrderListScreen from './components/screens/OrderListScreen';


const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-5'>
        <Container>
          <Routes>
            <Route path='/order/:id' element={<OrderScreen />} />
            <Route path='/shipping' element={<ShippingScreen />} />
            <Route path='/payment' element={<PaymentScreen />} />
            <Route path='/placeorder' element={<PlaceOrderScreen />} />
            <Route path='/login' element={<LoginScreen />} />
            <Route path='/register' element={<RegisterScreen />} />
            <Route path='/profile' element={<ProfileScreen />} />
            <Route path='/product/:id' element={<ProductScreen />} />
            <Route path="/cart/:id" element={<CartScreen />} />
            <Route path="/cart" element={<CartScreen />} />
            <Route path="/admin/userList" element={<UserListScreen />} />
            <Route path="/admin/user/:id/edit" element={<UserEditScreen />} />
            <Route path="/admin/productList" element={<ProductListScreen />} />
            <Route path="/admin/productList/:pageNumber" element={<ProductListScreen />} />
            <Route path="/admin/product/:id/edit" element={<ProductEditScreen />} />
            <Route path="/admin/orderList" element={<OrderListScreen />} />
            <Route path='/search/:keyword' element={<HomeScreen />} />
            <Route path='/page/:pageNumber' element={<HomeScreen />} />
            <Route path='/search/:keyword/page/:pageNumber' element={<HomeScreen />} />
            <Route path='/' element={<HomeScreen />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
