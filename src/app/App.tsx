import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { ContactSupport } from "./components/ContactSupport";
import Checkout from "./components/Checkout";   // ← add this
import FeaturePage from './pages/FeaturePage';

export default function App() {
  return (
    <Routes>
      <Route path="/"                element={<Home />} />
      <Route path="/contact-support" element={<ContactSupport />} />
      <Route path="/checkout"        element={<Checkout />} />   {/* ← add this */}
      <Route path="/features/:slug" element={<FeaturePage />} />
    </Routes>
  );
}