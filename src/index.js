import React from 'react';
import ReactDOM from 'react-dom/client';

import './css/App.css';
import './css/board.css';
import './css/order.css';
import './css/fontAwesome.css';
import './css/salimi.css';
import './css/reyham.css';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import Dashboard from './pages/Dashboard'
import Layout from './components/Layout'
import Login from './pages/Login';
import Cookies from 'universal-cookie';
import errortrans from './translate/error';
import LayoutLogin from './components/LayoutLogin';
import env from './env';
import AccessHolder from './modules/AccessControl/AccessHolder';
import ProfileAdd from './modules/AccessControl/ProfileAdd';
import Orders from './pages/Orders';
import OrderDetailHolder from './modules/Orders/OrderData/OrderDetailHolder';
import Profile from './pages/Profile';
import Services from './pages/Services';
import ServiceDetailHolder from './modules/Service/ServiceData/ServiceDetailHolder';
import Products from './pages/Products';
import ProductDetailHolder from './modules/Products/ProductData/ProductDetailHolder';
import Brands from './pages/Brands';
import BrandDetailHolder from './modules/Brands/BrandData/BrandDetailHolder';
import Category from './pages/Category';
import CatDetailHolder from './modules/Category/CatData/CatDetailHolder';
import Sepidar from './modules/Config/Sepidar';
import Sliders from './pages/Sliders';
import SliderDetailHolder from './modules/Sliders/SliderData/SliderDetailHolder';
import Transactions from './pages/Transactions';
import CRM from './pages/Crm';
import CrmList from './modules/Crm/CRMList/crmList';
import CRMAdd from './modules/Crm/CRMList/crmAdd';
import Customers from './pages/Customers';
import CustomerDetailHolder from './modules/Customer/CustomerData/CustomerDetailHolder';
import OrderHolder from './Order/OrderHolder';

const cookies = new Cookies();
const style = document.getElementById('style-direction');
var lang = JSON.parse(localStorage.getItem(env.cookieLang));
/*if (lang.dir === 'rtl') {
  style.href = '/css/rtl.css';
} */
if(!lang){
  localStorage.setItem(env.cookieLang,JSON.stringify(
    { lang:errortrans.defaultLang,
      dir:errortrans.defaultDir,
      color:errortrans.defaultColor}));
  lang = JSON.parse(localStorage.getItem(env.cookieLang));
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
    {cookies.get(env.cookieName)?
      <Routes>
        <Route path="/" element={<Layout><Dashboard lang={lang}/></Layout>}/>
        <Route path="/login" element={<Layout><Profile lang={lang}/></Layout>}/>
        <Route path="/dashboard" element={<Layout><Dashboard lang={lang}/></Layout>}/>
        <Route path="/customers" element={<Layout><Customers lang={lang}/></Layout>}/>
        <Route path="/customers/detail/:userId" element={<Layout><CustomerDetailHolder lang={lang}/></Layout>}/>
        <Route path="/crm" element={<Layout><CRM lang={lang}/></Layout>}/>
        <Route path="/crmlist" element={<Layout><CrmList lang={lang}/></Layout>}/>
        <Route path="/crmlist/detail/:crmId" element={<Layout><CRMAdd lang={lang}/></Layout>}/>
        <Route path="/access" element={<Layout><AccessHolder lang={lang}/></Layout>}/>
        <Route path="/access/detail/:profileId" element={<Layout><ProfileAdd lang={lang}/></Layout>}/>
        
        <Route path="/orders" element={<Layout><Orders lang={lang}/></Layout>}/>
        <Route path="/orders/detail/:orderId" element={<Layout><OrderDetailHolder lang={lang}/></Layout>}/>
        <Route path="/orders/business" element={<OrderHolder lang={"fa"}/>}/>

        <Route path="/services" element={<Layout><Services lang={lang}/></Layout>}/>
        <Route path="/services/detail/:orderId" element={<Layout><ServiceDetailHolder lang={lang}/></Layout>}/>
        <Route path="/products" element={<Layout><Products lang={lang}/></Layout>}/>
        <Route path="/products/detail/:orderId" element={<Layout><ProductDetailHolder lang={lang}/></Layout>}/>

        <Route path="/brands" element={<Layout><Brands lang={lang}/></Layout>}/>
        <Route path="/brands/detail/:orderId" element={<Layout><BrandDetailHolder lang={lang}/></Layout>}/>
        <Route path="/category" element={<Layout><Category lang={lang}/></Layout>}/>
        <Route path="/category/detail/:orderId" element={<Layout><CatDetailHolder lang={lang}/></Layout>}/>
        <Route path="/transactions" element={<Layout><Transactions lang={lang}/></Layout>}/>

        <Route path="/config/sepidar" element={<Layout><Sepidar lang={lang}/></Layout>}/>
        <Route path="/sliders" element={<Layout><Sliders lang={lang}/></Layout>}/>
        <Route path="/sliders/detail/:orderId" element={<Layout><SliderDetailHolder lang={lang}/></Layout>}/>

      </Routes>:
        <Routes>
          <Route path="/" element={<LayoutLogin><Login lang={lang}/></LayoutLogin>}/>
          <Route path="/:auth" element={<LayoutLogin><Login lang={lang}/></LayoutLogin>}/>
          <Route path="/:page/:auth" element={<LayoutLogin><Login lang={lang}/></LayoutLogin>}/>
          <Route path="/:page/:page/:auth" element={<LayoutLogin><Login lang={lang}/></LayoutLogin>}/>
        </Routes>}
     </Router>
);

serviceWorkerRegistration.unregister();

reportWebVitals();
