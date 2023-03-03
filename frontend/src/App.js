import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import Loader from './components/Loader';

const LoginScreen = lazy(() => import('./screens/LoginScreen'));
const RegisterScreen = lazy(() => import('./screens/RegisterScreen'));
const ProfileScreen = lazy(() => import('./screens/ProfileScreen'));
const ProductScreen = lazy(() => import('./screens/ProductScreen'));
const CartScreen = lazy(() => import('./screens/CartScreen'));
const ShippingScreen = lazy(() => import('./screens/ShippingScreen'));
const PaymentScreen = lazy(() => import('./screens/PaymentScreen'));
const PlaceOrderScreen = lazy(() => import('./screens/PlaceOrderScreen'));
const OrderScreen = lazy(() => import('./screens/OrderScreen'));
const UsersListScreen = lazy(() => import('./screens/UsersListScreen'));
const UserEditScreen = lazy(() => import('./screens/UserEditScreen'));
const ProductsListScreen = lazy(() => import('./screens/ProductsListScreen'));
const OrdersListScreen = lazy(() => import('./screens/OrdersListScreen'));
const ProductEditScreen = lazy(() => import('./screens/ProductEditScreen'));
const HomeScreen = lazy(() => import('./screens/HomeScreen'));

function App() {
  return (
    <Router>
      <Header></Header>
      <main className='py-3'>
        <Container>
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path='/login' element={<LoginScreen />} />
              <Route path='/register' element={<RegisterScreen />} />
              <Route path='/profile' element={<ProfileScreen />} />
              <Route path='/product/:id' element={<ProductScreen />} />
              <Route path='/cart/:id?' element={<CartScreen />} />
              <Route path='/shipping' element={<ShippingScreen />} />
              <Route path='/payment' element={<PaymentScreen />} />
              <Route path='/placeorder' element={<PlaceOrderScreen />} />
              <Route path='/order/:id' element={<OrderScreen />} />
              <Route path='/admin/userlist' element={<UsersListScreen />} />
              <Route path='/admin/user/:id/edit' element={<UserEditScreen />} />
              <Route
                path='/admin/productlist'
                element={<ProductsListScreen />}
              />
              <Route
                path='/admin/productlist/:pageNumber'
                element={<ProductsListScreen />}
              />
              <Route path='/admin/orderlist' element={<OrdersListScreen />} />
              <Route
                path='/admin/product/:id/edit'
                element={<ProductEditScreen />}
              />
              <Route path='/search/:keyword' element={<HomeScreen />} />
              <Route path='/page/:pageNumber' element={<HomeScreen />} />
              <Route
                path='/search/:keyword/page/:pageNumber'
                element={<HomeScreen />}
              />
              <Route path='/' element={<HomeScreen />} />
            </Routes>
          </Suspense>
        </Container>
      </main>
      <Footer></Footer>
    </Router>
  );
}

export default App;
