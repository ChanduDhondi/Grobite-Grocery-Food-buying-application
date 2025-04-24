import "../style.css";
import logo from "../../footer icons/footer_logo.png";
import { Link } from "react-router-dom";

function Logout() {
  return (
    <>
      <section
        className="w-screen h-screen flex flex-col items-center justify-evenly"
        style={{ backgroundColor: "#e0f7fa" }}
      >
        <img src={logo} alt="logo" className="w-[250px]" />
        <div
          className="p-[2rem] min-w-[30%] rounded-xl relative"
          style={{ backgroundColor: "#23460f", color: "white" }}
        >
          <h1 className="text-3xl text-center">Logged Out</h1>
          <p className="text-center mt-[1rem]">
            Thank you for using <b>Grobite</b>
          </p>
          <div className="mt-[1rem] flex justify-center">
            <button
              className="w-[50%] py-[.2rem] rounded-md active:scale-[1.05] transition"
              style={{ backgroundColor: "#5c844c" }}
            >
              <Link to="/login">Login</Link>
            </button>
          </div>
          <div className="mt-[1rem] text-center">
            <span>Go to Home Page - </span>
            <span>
              <button className="underline">
                <Link to="/">click</Link>
              </button>
            </span>
          </div>
        </div>
      </section>
    </>
  );
}

export default Logout;
