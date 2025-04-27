import "../style.css";
import { useLocation } from "react-router-dom";
import BreadCrumb from "./breadcrumb";
import { useContext, useEffect, useState } from "react";
import CartContext from "./cartContext";
import AuthContext from "./authContext";
import CartTable from "./cartTable";
import PaymentSuccessModal from "./paymentModal";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
const socket = io("http://127.0.0.1:8080");

function Cart() {
  const URL = "http://127.0.0.1:8080/api";
  const { pathname } = useLocation();
  const { cartItems, emptyCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isFilter, setIsFilter] = useState(false);
  const [filteredItems, setFilteredItems] = useState([]);
  const [isConfirm, setIsConfirm] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  function handleChange(evt) {
    console.log(evt.target.value);
    if (evt.target.value === "price") {
      let filteredItems = [...cartItems].sort(
        (a, b) =>
          parseFloat(a.price.$numberDecimal) -
          parseFloat(b.price.$numberDecimal)
      );
      setFilteredItems(filteredItems);
      setIsFilter(true);
    } else if (evt.target.value === "name") {
      const filteredItems = [...cartItems].sort((a, b) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
        return nameA.localeCompare(nameB);
      });
      setFilteredItems(filteredItems);
      setIsFilter(true);
    } else {
      setIsFilter(false);
    }
  }

  async function handleConfirm() {
    const items = cartItems.map((item) => ({
      itemId: item._id,
      name: item.name,
      price: item.price,
    }));
    const totalPrice = cartItems.reduce(
      (acc, currValue) => acc + parseFloat(currValue.price.$numberDecimal),
      0
    );
    try {
      socket.on("orderError", (data) => {
        window.alert(`${data.error}`);
      });
      socket.emit("newOrder", {
        status: "successful",
        items: items,
        totalPrice: totalPrice,
        userId: user.id,
      });
    } catch (err) {
      console.log(
        "Error while placing Order",
        err.response?.data?.error || "something went wrong"
      );
      return window.alert(
        err.response?.data?.error || "Something went wrong! Try again"
      );
    }
    setIsConfirm(true);
    setIsProcessing(true);
    emptyCart();
  }

  useEffect(() => {
    if (!isConfirm) return;

    const timeoutId = setTimeout(() => {
      navigate("/user");
      emptyCart();
      sessionStorage.removeItem("cartItem");
    }, 1500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isConfirm]);

  return (
    <>
      <div
        className="pl-[3rem] pr-[3rem] pt-[1rem] pb-[1rem]"
        style={{ backgroundColor: "rgba(250, 250, 250, 1)" }}
      >
        <BreadCrumb path={pathname}></BreadCrumb>
        <div className="mt-[1rem]">
          <h1 className="text-2xl font-medium">Shopping Cart</h1>
          <div className="mt-[1rem] flex justify-between">
            <p>
              You have{" "}
              <span className="text-[1.5rem]" style={{ color: "green" }}>
                {cartItems.length}
              </span>{" "}
              item
              {cartItems.length !== 1 ? "s" : ""} in your cart
            </p>
            <div className="text-xl">
              <label htmlFor="sortby">Sort by:</label>
              <select
                name="sortby"
                id="sortby"
                className="font-medium focus:none"
                onChange={handleChange}
              >
                <option value="default">Default</option>
                <option value="price">Price</option>
                <option value="name">Name</option>
              </select>
            </div>
          </div>
        </div>
        {/* Cart Items */}
        <div
          className="my-[1.5rem] -ml-[3rem] -mr-[3rem] px-[2rem] py-[1rem]"
          style={{ backgroundColor: "white" }}
        >
          {isFilter ? (
            <CartTable items={filteredItems}></CartTable>
          ) : (
            <CartTable items={cartItems}></CartTable>
          )}

          {cartItems.length > 0 && (
            <>
              <div className="flex justify-end mt-4 ">
                <div className="p-[1rem] border rounded-[5px] w-fit relative right-0">
                  <span className="text-2xl">Total</span> &nbsp;{" "}
                  <span className="text-4xl" style={{ color: "green" }}>
                    &#8377;
                    {cartItems.reduce(
                      (acc, currValue) =>
                        acc + parseFloat(currValue.price.$numberDecimal),
                      0
                    )}
                  </span>
                </div>
              </div>
              <div className="flex justify-end mt-[2rem] ">
                <button
                  className="py-[1rem] px-[1.5rem] rounded-[5px] w-fit relative right-0 text-3xl active:scale-[1.03] transition"
                  style={{
                    backgroundColor: "rgba(223, 90, 61, 1)",
                    color: "white",
                  }}
                  onClick={handleConfirm}
                  disabled={isProcessing}
                  aria-label="Confirm your order"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                      Processing...
                    </>
                  ) : (
                    "Confirm Order"
                  )}
                </button>
              </div>
            </>
          )}
        </div>

        {/* Payment modal */}
        {isConfirm && <PaymentSuccessModal></PaymentSuccessModal>}
      </div>
    </>
  );
}

export default Cart;
