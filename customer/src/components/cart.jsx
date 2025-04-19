import "../style.css";
import { useLocation } from "react-router-dom";
import BreadCrumb from "./breadcrumb";
import { useContext, useState } from "react";
import CartContext from "./cartContext";
import CartTable from "./cartTable";

function Cart() {
  const { pathname } = useLocation();
  const { cartItems } = useContext(CartContext);
  const [isFilter, setIsFilter] = useState(false);
  const [filteredItems, setFilteredItems] = useState([]);

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
          {/* Total */}
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
          {/* Proceed to Checkout */}
          <div className="flex justify-end mt-[2rem] ">
            <div
              className="py-[1rem] px-[1.5rem] rounded-[5px] w-fit relative right-0 text-4xl"
              style={{
                backgroundColor: "rgba(223, 90, 61, 1)",
                color: "white",
              }}
            >
              Proceed to Checkout
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
