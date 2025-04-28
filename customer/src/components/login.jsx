import "../style.css";
import logo from "../../footer icons/footer_logo.png";
import { useContext, useState } from "react";
import back from "../../Home icons/back.png";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import AuthContext from "./authContext";

function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const URL = "https://grobite-backend.onrender.com";
  const navigate = useNavigate();
  const [error, setError] = useState({});
  const { login } = useContext(AuthContext);

  function handleChange(evt) {
    const { name, value } = evt.target;

    setError((preErr) => ({ ...preErr, [name]: "" }));

    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    let validationErrors = {};
    if (!data.email) validationErrors.email = "Email is required";
    if (!data.password) validationErrors.password = "Password is required";
    setError(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;
    try {
      const response = await axios.post(URL + "/api/login", data);
      setData({
        email: "",
        password: "",
      });
      //store token in session storage
      login(response?.data.token);
      navigate(-1);
    } catch (err) {
      window.alert("Login Error:" + err.response?.data?.error);
    }
  }
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
          <button
            onClick={() => navigate(-1)}
            className="absolute top-2 left-2 rounded-[50%]"
            style={{ backgroundColor: "white" }}
          >
            <img src={back} alt="back" />
          </button>
          <h1 className="text-3xl text-center">Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col my-[1.5rem]">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                name="email"
                value={data.email}
                onChange={handleChange}
                id="email"
                style={{ backgroundColor: "#5c844c" }}
                className="p-[.3rem] rounded-md shadow-[1px_1px_3px_white]"
              />
              {error.email && <p className="text-red-400">{error.email}</p>}
            </div>
            <div className="flex flex-col my-[1.5rem]">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                id="password"
                style={{ backgroundColor: "#5c844c" }}
                className="p-[.3rem] rounded-md shadow-[1px_1px_3px_white]"
              />
              {error.password && (
                <p className="text-red-400">{error.password}</p>
              )}
            </div>
            <div className="mt-[1.5rem] flex justify-center">
              <button
                type="submit"
                className="w-[50%] py-[.2rem] rounded-md active:scale-[1.05] transition"
                style={{ backgroundColor: "#5c844c" }}
              >
                Login
              </button>
            </div>
          </form>
          <div className="flex justify-between mt-[10px]">
            <span>Don't have account</span>
            <span>
              <button className="underline">
                <Link to="/register">Register here!</Link>
              </button>
            </span>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
