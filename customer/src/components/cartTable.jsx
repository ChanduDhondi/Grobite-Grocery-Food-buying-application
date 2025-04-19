import { useContext } from "react";
import CartContext from "./cartContext";

function CartTable({ items }) {
  const { removeFromCart } = useContext(CartContext);
  return (
    <>
      {items?.length > 0 ? (
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="w-[130px]"></th>
              <th className="border-0 px-4 py-2 text-center">Name</th>
              <th className="border-0 px-4 py-2 text-center">Price(&#8377;)</th>
              <th className="px-4 py-2 text-right">Remove</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={item._id || index}>
                <td className="border-0 px-4 py-2">
                  <img
                    src={item.imageUrl}
                    alt="imageUrl"
                    className="size-full h-[130px]"
                  />
                </td>
                <td className="border-0 px-4 py-2 text-center">{item.name}</td>
                <td className="border-0 px-4 py-2 text-center">
                  {item.price.$numberDecimal}
                </td>
                <td
                  onClick={() => removeFromCart(item.id || item._id)}
                  className="border-0 px-4 py-2 text-right cursor-pointer"
                >
                  {" "}
                  &#10060;
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h1 className="text-2xl font-medium ml-[40%] p-[5rem]">
          No items in the Cart
        </h1>
      )}
    </>
  );
}

export default CartTable;
