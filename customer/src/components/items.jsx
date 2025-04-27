import { useContext } from "react";
import cart from "../../Home icons/li_shopping-cart.png";
import CartContext from "./cartContext";

function Items({ items }) {
  const { addToCart } = useContext(CartContext);

  return (
    <>
      <div className="m-[1rem] grid grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] justify-center items-center gap-y-[1rem]">
        {items?.length > 0 ? (
          items.map((item, index) => (
            <div className="w-[200px] bg-[white] p-[.5rem]" key={index}>
              <img
                src={item.imageUrl}
                alt={item.name}
                className="size-full h-[130px]"
              />
              <p className="text-[rgba(0,0,0,0.6)] text-xs pt-[.4rem]">
                {item.category.name}
              </p>
              <p>{item.name}</p>
              <div className="pt-[1rem] flex justify-between items-center">
                <span>&#8377; {item.price.$numberDecimal}</span>
                <button
                  className="flex items-center p-[.5rem] active:scale-[1.1] transition"
                  style={{ backgroundColor: "rgba(246, 226, 171, 1)" }}
                  onClick={() => addToCart(item)}
                >
                  <img src={cart} alt="cart" className="mr-[.5rem]" />
                  Add
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No Featured Products</p>
        )}
      </div>
    </>
  );
}

export default Items;
