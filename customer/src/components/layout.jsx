import "../style.css";
import logo from "../../Home icons/logo.png";
import cart from "../../Home icons/cart.png";
import profile from "../../Home icons/profile.png";
import { Outlet, Link } from "react-router-dom";
import footerLogo from "../../footer icons/footer_logo.png";
import mail from "../../footer icons/mail.png";
import location from "../../footer icons/location.png";
import phone from "../../footer icons/phone.png";
import logoutIcon from "../../Home icons/logout.png";
import login from "../../Home icons/login.png";
import { useContext } from "react";
import AuthContext from "./authContext";
import { useLocation } from "react-router-dom";

function Layout() {
  const { user, logout } = useContext(AuthContext);
  const loc = useLocation();
  const hideNavbarPaths = ["/login", "/logout", "/register"];
  return (
    <>
      <div className="min-h-screen flex flex-col">
        {!hideNavbarPaths.includes(loc.pathname) && (
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
                  <Link to="/user">User</Link>
                  <img src={profile} alt="user" className="h-fit" />
                </li>
                <li className="flex gap-2 items-center">
                  {user ? (
                    <>
                      <Link
                        to="/logout"
                        style={{ color: "rgb(224, 79, 95)" }}
                        onClick={() => logout()}
                      >
                        Logout
                      </Link>
                      <img src={logoutIcon} alt="logout" className="h-[30px]" />
                    </>
                  ) : (
                    <>
                      <Link to="/login" style={{ color: "rgb(224, 79, 95)" }}>
                        Login
                      </Link>
                      <img src={login} alt="login" className="h-[30px]" />
                    </>
                  )}
                </li>
              </ul>
            </div>
          </nav>
        )}

        <main className="flex-1">
          <Outlet />
        </main>

        {!hideNavbarPaths.includes(loc.pathname) && (
          <footer
            className="mt-auto pt-[2rem] pb-[2rem] pl-[3rem] pr-[3rem] flex justify-evenly"
            style={{ backgroundColor: "rgba(246, 226, 171, 0.4)" }}
          >
            <div className="flex gap-[2rem] flex-col  items-start">
              <img src={footerLogo} alt="footer logo" />
              <p className="text-[1.5rem] font-thin">
                Subscribe to our Newsletter
              </p>
            </div>
            <div className="flex justify-between gap-[10rem] items-center">
              <div className="flex flex-col gap-[1.5rem]">
                <Link to="/">
                  <button>Home</button>
                </Link>
                <Link to="/shop">
                  <button>Shop</button>
                </Link>
                <Link to="/cart">
                  <button>Cart</button>
                </Link>
                <Link to="/user">
                  <button>User Profile</button>
                </Link>
              </div>
              <div className="flex flex-col gap-[1.5rem]">
                <div className="flex gap-[1rem]">
                  <img src={mail} alt="mail" className="h-fit" />
                  <span>chandudondi23@gmail.com</span>
                </div>
                <div className="flex gap-[1rem]">
                  <img src={location} alt="locatiion" className="h-fit" />
                  <span>Armoor, Nzb, TS</span>
                </div>
                <div className="flex gap-[1rem]">
                  <img src={phone} alt="phone" className="h-fit" />
                  <span>+91 9440095048</span>
                </div>
              </div>
            </div>
          </footer>
        )}
      </div>
    </>
  );
}

export default Layout;
