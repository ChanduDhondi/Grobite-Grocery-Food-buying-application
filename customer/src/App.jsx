import "./style.css";
import Layout from "./components/layout.jsx";
import Home from "./components/home.jsx";
import Shop from "./components/shop.jsx";
import Cart from "./components/cart.jsx";
import Profile from "./components/profile.jsx";
import Logout from "./components/logout.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./components/cartContext.jsx";

function App() {
  return (
    <>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="shop" element={<Shop />} />
              <Route path="cart" element={<Cart />} />
              <Route path="user" element={<Profile />} />
              <Route path="logout" element={<Logout />} />
              {/* <Route path="*" element={<NoPage />} /> */}
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </>
  );
}

export default App;
