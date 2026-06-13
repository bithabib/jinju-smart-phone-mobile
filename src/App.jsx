import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Links from "./pages/Links";
import QR from "./pages/QR";
import Card from "./pages/Card";
import Gallery from "./pages/Gallery";
import Admin from "./pages/Admin";
import Sell from "./pages/Sell";

export default function App() {
  const { pathname } = useLocation();
  // Scroll to top on route change
  useEffect(() => window.scrollTo(0, 0), [pathname]);

  return (
    <div className="app">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/links" element={<Links />} />
          <Route path="/qr" element={<QR />} />
          <Route path="/card" element={<Card />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/sell" element={<Sell />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
