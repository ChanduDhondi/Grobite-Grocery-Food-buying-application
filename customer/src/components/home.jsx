import banner from "../../Home icons/hero-bg.png";
import rightarrow from "../../Home icons/li_arrow-right.png";
import heroimage from "../../Home icons/hero image.png";
import { Link } from "react-router-dom";
import "../style.css";
import { useEffect, useState } from "react";
import axios from "axios";
import deals1 from "../../Home icons/deals1.png";
import deals2 from "../../Home icons/deals2.png";
import deals3 from "../../Home icons/deals3.png";
import Deals from "./deals";
import Items from "./items";

const URL = "https://grobite.onrender.com";

function Home() {
  const [category, setCategory] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchCategory = async () => {
      const data = await axios.get(URL + "/api/category");
      setCategory(data.data);
    };

    const fetItems = async () => {
      const data = await axios.get(URL + "/api/items");
      let randomItems = [];
      for (let i = 0; i < 25; i++) {
        let randomIdx = Math.floor(Math.random() * data.data.length);
        randomItems.push(data.data[randomIdx]);
      }
      setItems(randomItems);
    };
    fetchCategory();
    fetItems();
  }, []);

  return (
    <>
      {/* Hero section */}
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

      {/* Categories section */}
      <section className="layout ">
        <h2 className="text-[1.3rem] p-[1rem]">Explore Categories</h2>
        <div className="m-[1rem] flex flex-wrap justify-between items-center gap-x-[.2rem]">
          {category?.length > 0 ? (
            category.map((cat) => (
              <div
                className="p-[0.4rem] text-center rounded-[10px] bg-[rgba(246,226,171,1)]"
                key={cat._id || cat.name}
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

      {/* Products section */}
      <section className="layout ">
        <div className="bg-[rgba(245,245,245,1)] p-[1.5rem] mt-[2rem] rounded-[25px]">
          <h2 className="text-[1.3rem] mb-[0.5rem]">Featured Products</h2>
          <Items items={items}></Items>
        </div>
      </section>

      {/* Deals section */}
      <section className="layout">
        <div className="flex justify-center items-center gap-[1rem]">
          <Deals
            h1={"Get Your Groceries Deliver for Free"}
            p={
              "Order now and get free delivery on orders above 50,000 NGN. Shop from the comfort of your home and let us bring your groceries to you."
            }
            bg={"rgba(197, 234, 217, 0.78)"}
            img={deals1}
            btn={"Order Now"}
            btnBg={"rgba(38, 50, 56, 1)"}
            btnCol={"white"}
          ></Deals>
          <Deals
            h1={"Deals of the Day"}
            p={""}
            bg={"rgba(223, 180, 61, 1)"}
            img={deals2}
            btn={"Shop Now"}
            btnBg={"white"}
            btnCol={"black"}
          ></Deals>
          <Deals
            h1={"Weekend Deals"}
            p={"10% OFF"}
            bg={"rgba(237, 132, 126, 1)"}
            img={deals3}
            btn={"Shop Now"}
            btnBg={"white"}
            btnCol={"black"}
          ></Deals>
        </div>
      </section>
    </>
  );
}

export default Home;
