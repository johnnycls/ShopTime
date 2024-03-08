import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminProducts from "../pages/shop/AdminProducts";
import AdminTx from "../pages/adminTx/AdminTx";
import Cart from "../pages/cart/Cart";
import Form from "../pages/form/Form";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Shop from "../pages/shop/Shop";
import Shops from "../pages/shops/Shops";
import Home from "../pages/admin/Home";
import Success from "../pages/success/Success";
import AboutUs from "../pages/info/AboutUs";
import ContactUs from "../pages/info/ContactUs";
import CreateEShop from "../pages/info/CreateEShop";
import FAQ from "../pages/info/FAQ";
import PrivacyPolicies from "../pages/info/PrivacyPolicies";
import TermsOfService from "../pages/info/TermsOfService";
import UserGuide from "../pages/info/UserGuide";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Shops />} />
      <Route path="/aboutus" element={<AboutUs />} />
      <Route path="/contactus" element={<ContactUs />} />
      <Route path="/createeshop" element={<CreateEShop />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/privacypolicies" element={<PrivacyPolicies />} />
      <Route path="/termsofservice" element={<TermsOfService />} />
      <Route path="/userguide" element={<UserGuide />} />
      <Route path=":shopName" element={<Shop />} />
      <Route path=":shopName/cart" element={<Cart />} />
      <Route path=":shopName/success" element={<Success />} />
      <Route path=":shopName/form" element={<Form />} />
      <Route path=":shopName/admin" element={<Home />} />
      <Route path=":shopName/admin/login" element={<Login />} />
      <Route path=":shopName/admin/register" element={<Register />} />
      <Route path=":shopName/admin/tx" element={<AdminTx />} />
      <Route path=":shopName/admin/products" element={<AdminProducts />} />
    </Routes>
  );
}
