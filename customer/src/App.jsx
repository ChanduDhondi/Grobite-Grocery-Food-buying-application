import "./style.css";
import Layout from "./components/layout.jsx";
import Home from "./components/home.jsx";
import Shop from "./components/shop.jsx";
import Cart from "./components/cart.jsx";
import Login from "./components/login.jsx";
import Logout from "./components/logout.jsx";
import Register from "./components/register.jsx";
import NoPage from "./components/noPage.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./components/cartContext.jsx";
import { AuthProvider } from "./components/authContext.jsx";
import User from "./components/user.jsx";
import PrivateRoute from "./components/privateRoute.jsx";

function App() {
  return (
    <>
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="shop" element={<Shop />} />
                <Route path="cart" element={<Cart />} />
                <Route
                  path="user"
                  element={
                    <PrivateRoute>
                      <User />
                    </PrivateRoute>
                  }
                />
                <Route path="login" element={<Login />} />
                <Route path="logout" element={<Logout />} />
                <Route path="register" element={<Register />} />
                <Route path="*" element={<NoPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </>
  );
}

export default App;
