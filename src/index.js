import React ,{StrictMode}from 'react';
import ReactDOM, { createRoot } from 'react-dom/client';
//import { AppProvider } from "./components/AppContext";
import './css/App.css';import './css/fonts.css';
//import from 'react-dom/client';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import Home from './pages/Home';
import Layout from './components/Layout'
import Category from './pages/Category';
import Product from './pages/Product';
import Profile from './pages/Profile';
import Cart from './pages/Cart';
import Checkout from './pages/CheckOut';
import Failed from './pages/static/fail';
import CallbackUrl from './pages/static/callbackUrl';
import Pages from './pages/pages';
import SheetLabel from './pages/sheetLabels';
import QuickSearchPage from './pages/quickSearch';
import CategoryLanding from './modules/CategoryPage/CategoryLanding';
import Brand from './pages/brand';
import Kinds from './pages/kind';
import OilBrand from './pages/oilBrand';
/*import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Payment from './pages/Payment';
import Fail from './pages/fail';*/

//import { createRoot } from 'react-dom/client';
const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <Layout>
     <Router>
       <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/category" element={<Category/>/*<CategoryLanding/>*/}/>
        <Route path="/category/:catID" element={<Category/>}/>
        <Route path="/brand/:brandID" element={<Category/>}/>
        <Route path="/oil-brand/:brandID" element={<Category/>}/>
        <Route path="/product/:id" element={<Product/>}/>

        <Route path="/cart" element={<Cart/>}/>
        <Route path="/checkout" element={<Checkout/>}/>
        <Route path="/failed" element={<Failed/>}/>
        <Route path="/callback-url/:state" element={<CallbackUrl/>}/>
        <Route path="/landing/:title" element={<SheetLabel/>}/>
        <Route path="/quick-search" element={<QuickSearchPage />} />
        <Route path="/category-landing/:title" element={<CategoryLanding />} />

        <Route path="/brands" element={<Brand/>}/>
        <Route path="/oil-brands" element={<OilBrand/>}/>
        <Route path="/kinds" element={<Kinds/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/pages/:title" element={<Pages/>}/>
       </Routes>
     </Router>
    </Layout>
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
