import { useState } from "react";
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import ContactUs from "./components/ContactUs";
import Homepage from "./components/Homepage";
import Navbar from "./components/Navbar";
import ProductData from "./components/ProductData";
import ProductPage from "./components/ProductPage";
import Shop from "./components/Shop";

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
    setCartTotal(cartTotal + item.price);
    setCartTotal(cartTotal + item.price);
  };
  const removeFromCart = (itemToRemove) => {
    const items = [...cartItems];
    const filtered = items.filter((item) => item !== itemToRemove);
    setCartItems(filtered);
    setCartTotal(cartTotal - itemToRemove.price);
  };

  return (
    <HashRouter>
      <Navbar cartItems={cartItems} cartTotal={cartTotal} removeItem={removeFromCart} />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/:brand" element={<ProductPage />} />
        <Route path="/shop/:brand/:model" element={<ProductData cartItems={cartItems} addToCart={addToCart} removeFromCart={removeFromCart} />} />
        <Route path="/contact" element={<ContactUs />} />
      </Routes>
      <div id="cart-portal" style={{ fontFamily: "Mooli" }} />
      <div id="status-portal" className="status" style={{ fontFamily: "Mooli" }} />
    </HashRouter>
  );
}

export default App;
