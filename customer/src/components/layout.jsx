import "../style.css";
import logo from "../../Home icons/logo.png";
import cart from "../../Home icons/cart.png";
import login from "../../Home icons/login.png";
import { Outlet, Link } from "react-router-dom";

function Layout() {
  return (
    <>
      <nav className="flex flex-row items-center m-0.5 pl-[2rem] pr-[2rem]">
        <div className="">
          <img src={logo} alt="logo" />
        </div>
        <div className="ml-auto flex flex-row gap-[10rem]">
          <ul className="flex gap-4 items-center">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/shop">Shop</Link>
            </li>
          </ul>
          <ul className="flex gap-4">
            <li className="flex gap-2 items-center">
              <Link to="/cart">Cart</Link>
              <img src={cart} alt="cart" className="h-fit" />
            </li>
            <li className="flex gap-2 items-center">
              <Link to="/logout">Login</Link>
              <img src={login} alt="login" className="h-fit" />
            </li>
          </ul>
        </div>
      </nav>
      <Outlet />
    </>
  );
}

export default Layout;
