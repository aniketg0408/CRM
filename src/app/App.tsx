import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home"; 
import { ContactSupport } from "./components/ContactSupport";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/contact-support" element={<ContactSupport/>} />
    </Routes>
  );
}