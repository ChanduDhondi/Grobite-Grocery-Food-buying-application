import "./style.css";
import Layout from "./components/layout.jsx";
import Home from "./components/home.jsx";
import Shop from "./components/shop.jsx";
import Cart from "./components/cart.jsx";
import Login from "./components/login.jsx";
import Logout from "./components/login.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="shop" element={<Shop />} />
            <Route path="cart" element={<Cart />} />
            <Route path="login" element={<Login />} />
            <Route path="logout" element={<Logout />} />
            {/* <Route path="*" element={<NoPage />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
