import "../style.css";
import { useContext, useEffect, useState } from "react";
import AuthContext from "./authContext";
import CartContext from "./cartContext";
import BreadCrumb from "./breadcrumb";
import { useLocation, Link } from "react-router-dom";
import { localUrl, backendUrl } from "../utils/util";
import { io } from "socket.io-client";
const socket = io(backendUrl);

function User() {
  const { user } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);
  const { pathname } = useLocation();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    socket.on("orderError", (data) => {
      console.error("Error:", data.error);
    });
    if (user) socket.emit("registerUser", user.id);
    socket.on("showOrders", (data) => {
      setOrders(data);
      console.log(data);
    });
    return () => {
      socket.off("showOrders");
      socket.off("orderError");
    };
  }, [user]);

  async function handlePassChange() {
    console.log("Request sent to passwordChange");
  }

  return (
    <>
      {user ? (
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
            className="px-[3rem] py-[1rem] -mx-[3rem] -my-[1rem] flex gap-[1rem] h-[400px]"
            style={{ backgroundColor: "white" }}
          >
            {/* User Profile */}
            <div className="min-w-[50%] h-full py-[.7rem] px-[1rem] border rounded-xl flex flex-col gap-[.6rem]">
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
              className="min-w-[50%] h-full  border rounded-xl flex flex-col gap-[.6rem] overflow-auto"
              style={{ backgroundColor: "rgba(250, 250, 250, 1)" }}
            >
              <h1
                className="text-2xl py-[.7rem] px-[1rem] sticky top-0 py-[.5rem] "
                style={{ backgroundColor: "rgba(250, 250, 250, 1)" }}
              >
                Order History
              </h1>
              {/* content */}
              <div className="py-[.5rem] px-[1rem]">
                {orders?.length > 0 ? (
                  orders.map((order, index) => (
                    <div key={order._id || index}>
                      <div className="flex gap-[.6rem]">
                        <div className="w-[70%] text-lg">
                          {order.items.map((item) => item.name.concat(", "))}
                        </div>
                        <div className="w-[30%] text-right flex flex-col gap-[.5rem]">
                          <h3 className="text-2xl font-bold">
                            &#8377;{order.totalPrice.$numberDecimal}
                          </h3>
                          <p>
                            {
                              new Date(order.date)
                                .toLocaleString()
                                .split(",")[0]
                            }
                          </p>
                        </div>
                      </div>
                      <hr className="w-full h-px py-[.5rem]" />
                    </div>
                  ))
                ) : (
                  <h1 className="text-xl relative top-[40%] left-[40%]">
                    No Orders Exists!
                  </h1>
                )}
              </div>
            </div>
          </div>
        </section>
      ) : (
        <h1 className="text-2xl text-center my-[5rem]" style={{ color: "red" }}>
          {" "}
          Login to see User Profile{" "}
          <Link
            to="/login"
            style={{ color: "green" }}
            className="text-md underline"
          >
            - click here!
          </Link>
        </h1>
      )}
    </>
  );
}

export default User;
