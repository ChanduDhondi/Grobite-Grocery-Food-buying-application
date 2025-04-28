import "../style.css";
import { useLocation } from "react-router-dom";
import BreadCrumb from "./breadcrumb";
import { useState, useEffect } from "react";
import axios from "axios";
import Items from "./items";

function Shop() {
  const URL = "https://grobite-backend.onrender.com";
  const { pathname } = useLocation();
  const [searchProduct, setSearchProduct] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [category, setCategory] = useState([]);
  const [allItems, setAllItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    const fetchCategory = async () => {
      const data = await axios.get(URL + "/api/category");
      setCategory(data.data);

      if (data?.data?.length > 0) {
        setSelectedCategory(data.data[0].name);
      }
    };
    const fetchItems = async () => {
      const response = await axios.get(URL + "/api/items");
      setAllItems(response.data);
    };

    fetchCategory();
    fetchItems();
  }, []);

  useEffect(() => {
    if (allItems.length > 0 && selectedCategory) {
      const filtered = allItems.filter(
        (item) => item.category?.name === selectedCategory
      );
      setSelectedItems(filtered);
    }
  }, [allItems, selectedCategory]);

  function handleSearch(evt) {
    let value = evt.target.value;
    setSearchProduct(value);

    if (value.trim() === "") {
      setIsSearch(false);
      setFilteredItems([]);
      return;
    }

    let filtered = allItems.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredItems(filtered);
    setIsSearch(true);
  }

  function handleRadio(evt) {
    setSelectedCategory(evt.target.value);
  }

  return (
    <>
      <div
        className="pl-[3rem] pr-[3rem] pt-[1rem] pb-[1rem] min-h-screen"
        style={{ backgroundColor: "rgba(250, 250, 250, 1)" }}
      >
        <nav className="flex flex-col gap-[1.3rem] justify-center">
          <BreadCrumb path={pathname}></BreadCrumb>
          <div className="flex justify-between">
            <h1 className="text-3xl">Explore our Shop</h1>
            <input
              type="text"
              id="searchBox"
              placeholder="Find what you need..."
              value={searchProduct}
              onChange={handleSearch}
              style={{
                border: "1px solid black",
                padding: ".5rem",
                width: "50vw",
              }}
            />
          </div>
        </nav>

        <main className=" mt-[2rem] flex gap-[1.5rem] w-full">
          {/* sidebar */}
          <div
            className="sticky top-0 flex flex-col gap-[2rem] h-fit"
            style={{ width: "18vw" }}
          >
            <div className="card">
              <h3 className="text-2xl mb-[1rem]">Filters</h3>
              <p style={{ color: "rgba(0,0,0, 0.8)" }}>{selectedCategory}</p>
            </div>
            <div className="card">
              <h3 className="text-2xl mb-[1rem]">Categories</h3>
              {category?.length > 0 ? (
                category.map((cate) => (
                  <div
                    className="flex justify-between items-center"
                    key={cate.id || cate.name}
                  >
                    <label htmlFor={cate.id}>{cate.name}</label>
                    <input
                      type="radio"
                      id={cate.id}
                      name="category"
                      value={cate.name}
                      onChange={handleRadio}
                      checked={selectedCategory === cate.name}
                    />
                  </div>
                ))
              ) : (
                <p>No Categories Exists</p>
              )}
            </div>
          </div>
          {/* category items */}
          <div className="flex-1">
            <h1 className="m-[1rem] text-2xl font-medium">Products List</h1>
            <Items items={isSearch ? filteredItems : selectedItems}></Items>
          </div>
        </main>
      </div>
    </>
  );
}

export default Shop;
