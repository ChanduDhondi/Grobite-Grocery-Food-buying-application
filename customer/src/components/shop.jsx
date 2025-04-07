import "../style.css";
import { useLocation } from "react-router-dom";

function Shop() {
  const { pathname } = useLocation();
  return (
    <>
      <section className="layout">
        <p>{pathname.split("/")}</p>
        Shop Section
      </section>
    </>
  );
}

export default Shop;
