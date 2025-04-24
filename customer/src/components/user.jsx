import "../style.css";
import { useContext } from "react";
import AuthContext from "./authContext";
import CartContext from "./cartContext";
import BreadCrumb from "./breadcrumb";
import { useLocation, Link } from "react-router-dom";

function User() {
  const { user } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);
  const { pathname } = useLocation();

  async function handlePassChange() {
    console.log("Request sent to passwordChange");
  }

  return (
    <>
      <section
        className="pl-[3rem] pr-[3rem] pt-[1rem] pb-[1rem]"
        style={{ backgroundColor: "rgba(250, 250, 250, 1)" }}
      >
        {/* Navbar */}
        <BreadCrumb path={pathname}></BreadCrumb>
        <div className="flex justify-between my-[1rem]">
          <div>
            <h1 className="text-3xl">Chandu Dhondi</h1>
            <p className="mt-[.5rem]">Account created on 12/03/2025</p>
          </div>
          <div className="text-right">
            <button
              className="py-[.5rem] px-[1rem] text-xl rounded-md"
              style={{
                backgroundColor: "rgba(223, 90, 61, 1)",
                color: "white",
              }}
            >
              <Link to="/cart">View Cart</Link>
            </button>
            <p className="mt-[.5rem]">
              You have{" "}
              <span className="text-[1.5rem]" style={{ color: "green" }}>
                {cartItems?.length}
              </span>{" "}
              item
              {cartItems?.length > 1 ? "s" : ""} in your cart
            </p>
          </div>
        </div>

        {/* Body */}
        <div
          className="px-[3rem] py-[1rem] -mx-[3rem] -my-[1rem] flex gap-[1rem]"
          style={{ backgroundColor: "white" }}
        >
          {/* User Profile */}
          <div className="min-w-[50%] py-[.7rem] px-[1rem] border rounded-xl flex flex-col gap-[.6rem]">
            <h1 className="text-2xl">User Profile</h1>
            <hr />
            <div className="my-[.5rem]">
              <p
                style={{ color: "rgba(85, 85, 85, 1)" }}
                className="text-large"
              >
                Name
              </p>
              <p className="text-large">Chandu Dhondi</p>
            </div>
            <div className="my-[.5rem]">
              <p
                style={{ color: "rgba(85, 85, 85, 1)" }}
                className="text-large"
              >
                Phone Number
              </p>
              <p className="text-large">+91 9440095048</p>
            </div>
            <div className="my-[.5rem]">
              <p
                style={{ color: "rgba(85, 85, 85, 1)" }}
                className="text-large"
              >
                Email Address
              </p>
              <p className="text-large">chandudhondi23@gmail.com</p>
            </div>
            <div className="my-[.5rem]">
              <button
                className="py-[.3rem] px-[.7rem] rounded-md"
                onClick={handlePassChange}
                style={{
                  backgroundColor: "rgba(37, 61, 78, 1)",
                  color: "white",
                }}
              >
                Change Password
              </button>
            </div>
          </div>

          {/* Order history */}
          <div
            className="min-w-[50%] py-[.7rem] px-[1rem] border rounded-xl flex flex-col gap-[.6rem]"
            style={{ backgroundColor: "rgba(250, 250, 250, 1)" }}
          >
            <h1 className="text-2xl">Order History</h1>
          </div>
        </div>
      </section>
    </>
  );
}

export default User;
