import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import HeroSlider from "./components/HeroSlider";
import WomenProducts from "./pages/WomenProducts";
import MenProducts from "./pages/MenProducts";
import KidsProducts from "./pages/KidProducts";
import AdminPanel from "./pages/AdminPanel";
import AllCollection from "./pages/AllCollection";
import Sweaters from "./pages/Sweaters";

// Layout for normal pages (with Header + Hero)
function DefaultLayout({ children }) {
  return (
    <>
      <Header />
      <HeroSlider />
      {children}
    </>
  );
}

// Layout for admin (no Header / no Hero)
function AdminLayout({ children }) {
  return <>{children}</>;
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Normal user pages */}
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
            <AdminLayout>
              <AdminPanel />
            </AdminLayout>
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

        {/* Admin panel page (without header + hero) */}
        <Route
          path="/admin"
          element={
            <AdminLayout>
              <AdminPanel />
            </AdminLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
