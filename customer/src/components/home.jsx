import banner from "../../Home icons/hero-bg.png";
import rightarrow from "../../Home icons/li_arrow-right.png";
import heroimage from "../../Home icons/hero image.png";
import { Link } from "react-router-dom";
import "../style.css";
import { useEffect, useState } from "react";
import axios from "axios";
import cart from "../../Home icons/li_shopping-cart.png";

function Home() {
  const [category, setCategory] = useState([]);
  const [items, setItems] = useState([]);
  const URL = "http://127.0.0.1:8080/api/";

  useEffect(() => {
    const fetchCategory = async () => {
      const data = await axios.get(URL + "category");
      setCategory(data);
    };

    const fetItems = async () => {
      const data = await axios.get(URL + "items");
      let randomItems = [];
      for (let i = 0; i < 25; i++) {
        let randomIdx = Math.floor(Math.random() * data.data.length);
        randomItems.push(data.data[randomIdx]);
      }
      setItems(randomItems);
      console.log(randomItems);
    };
    fetchCategory();
    fetItems();
  }, []);

  return (
    <>
      <section
        className="layout h-[25rem] rounded-lg p-[1rem] bg-cover bg-center flex items-center justify-between"
        style={{ backgroundImage: `url(${banner})` }}
      >
        <div className="hero-text text-white">
          <h1 className="text-[3rem]">
            Fresh Savings Every Week! Enjoy Up to 30% Off on Selected Produce.
          </h1>
          <p className="text-lg text-[#F6E2AB]">
            Fresh fruits and vegetables, packaged goods, snacks, beverages,
            household essentials.
          </p>
          <div className="flex gap-4 text-lg bg-white text-black w-fit mt-4 pt-2 pb-2 pl-4 pr-4 items-center rounded-lg">
            <Link to="/shop">Shop</Link>
            <Link to="/shop">
              <img src={rightarrow} alt="rightarrow" />
            </Link>
          </div>
        </div>
        <div className="hero-image relative">
          <img src={heroimage} alt="hero-image" className="h-90" />
        </div>
      </section>

      <section className="layout ">
        <h2 className="text-[1.3rem] p-[1rem]">Explore Categories</h2>
        <div className="m-[1rem] flex flex-wrap justify-between items-center gap-x-[.2rem]">
          {category?.data?.length > 0 ? (
            category.data.map((cat) => (
              <div
                className="p-[0.4rem] text-center rounded-[10px] bg-[rgba(246,226,171,1)]"
                key={cat.id || cat.name}
              >
                <img
                  src={cat.imageUrl}
                  alt={cat.name}
                  className="w-[100px] h-[100px]"
                />
                <p className="text-xs mt-[0.5rem]">{cat.name}</p>
              </div>
            ))
          ) : (
            <p>No categories available.</p>
          )}
        </div>
      </section>

      <section className="layout ">
        <div className="bg-[rgba(245,245,245,1)] p-[1.5rem] mt-[2rem] rounded-[25px]">
          <h2 className="text-[1.3rem] mb-[0.5rem]">Featured Products</h2>
          <div className="m-[1rem] grid grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] justify-center items-center gap-y-[1rem]">
            {items?.length > 0 ? (
              items.map((item) => (
                <div className="w-[200px] bg-[white] p-[.5rem]" key={item.id}>
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
                      className="flex items-center p-[.5rem]"
                      style={{ backgroundColor: "rgba(246, 226, 171, 1)" }}
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
        </div>
      </section>
    </>
  );
}

export default Home;
