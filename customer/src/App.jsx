import "./style.css";
import Layout from "./components/layout.jsx";
import Cart from "./components/cart.jsx";
import Login from "./components/login.jsx";
import Logout from "./components/logout.jsx";
import Register from "./components/register.jsx";
import NoPage from "./components/noPage.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./components/cartContext.jsx";
import { AuthProvider } from "./components/authContext.jsx";
import User from "./components/user.jsx";
import { Suspense, lazy } from "react";
import Loading from "./components/loading.jsx";

const Home = lazy(() => import("./components/home.jsx"));
const Shop = lazy(() => import("./components/shop.jsx"));

function App() {
  return (
    <>
      <AuthProvider>
        <CartProvider>
          <Suspense fallback={<Loading />}>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<Home />} />
                  <Route path="shop" element={<Shop />} />
                  <Route path="cart" element={<Cart />} />
                  <Route path="user" element={<User />} />
                  <Route path="login" element={<Login />} />
                  <Route path="logout" element={<Logout />} />
                  <Route path="register" element={<Register />} />
                  <Route path="*" element={<NoPage />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </Suspense>
        </CartProvider>
      </AuthProvider>
    </>
  );
}

export default App;
