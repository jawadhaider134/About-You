import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import HeroSlider from "./components/HeroSlider";
import WomenProducts from "./pages/WomenProducts";
import MenProducts from "./pages/MenProducts";
import KidsProducts from "./pages/KidProducts";
// import AdminPanel from "./pages/AdminPanel";
import AllCollection from "./pages/AllCollection";
import Sweaters from "./pages/Sweaters";

function DefaultLayout({ children }) {
  return (
    <>
      <Header />
      <HeroSlider />
      {children}
    </>
  );
}

function AdminLayout({ children }) {
  return <>{children}</>;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <DefaultLayout>
              <WomenProducts />
            </DefaultLayout>
          }
        />
        <Route
          path="/women"
          element={
            <DefaultLayout>
              <WomenProducts />
            </DefaultLayout>
          }
        />
        <Route
          path="/men"
          element={
            <DefaultLayout>
              <MenProducts />
            </DefaultLayout>
          }
        />
        <Route
          path="/kids"
          element={
             <DefaultLayout>
              <KidsProducts />
            </DefaultLayout>
          }
        />
        <Route
          path="/collections"
          element={
            <DefaultLayout>
              <AllCollection />
            </DefaultLayout>
          }
        />
        <Route
          path="/products/1"
          element={
            <DefaultLayout>
              <Sweaters />
            </DefaultLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
