import "../style.css";
import logo from "../../footer icons/footer_logo.png";
import { useState } from "react";
import back from "../../Home icons/back.png";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Register() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  const URL = "https://grobite-backend.onrender.com";
  const navigate = useNavigate();
  const [error, setError] = useState({});
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
    if (!data.email) validationErrors.name = "Name is required";
    if (!data.email) validationErrors.email = "Email is required";
    if (!data.password) validationErrors.password = "Password is required";
    if (!data.phone) validationErrors.phone = "Phone is required";
    setError(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;
    try {
      const response = await axios.post(URL + "/api/register", data);
      if (response?.data) window.alert(response.data.message);
      setData({
        name: "",
        email: "",
        password: "",
        phone: "",
      });
    } catch (err) {
      const errorMessage = err.response?.data?.error || "Something went wrong!";
      window.alert("Register Error: " + errorMessage);
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
          <h1 className="text-3xl text-center">Register</h1>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col my-[1.5rem]">
              <label htmlFor="name">Full Name:</label>
              <input
                type="text"
                name="name"
                value={data.name}
                onChange={handleChange}
                id="name"
                style={{ backgroundColor: "#5c844c" }}
                className="p-[.3rem] rounded-md shadow-[1px_1px_3px_white]"
              />
              {error.name && <p className="text-red-400">{error.name}</p>}
            </div>
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
                pattern=".+@gmail\.com"
                size="50"
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
            <div className="flex flex-col my-[1.5rem]">
              <label htmlFor="phone">Phone:</label>
              <input
                type="tel"
                name="phone"
                value={data.phone}
                onChange={handleChange}
                id="phone"
                style={{ backgroundColor: "#5c844c" }}
                className="p-[.3rem] rounded-md shadow-[1px_1px_3px_white]"
                min="10"
                pattern="[6-9][0-9]{9}"
              />
              {error.phone && <p className="text-red-400">{error.password}</p>}
            </div>
            <div className="mt-[1.5rem] flex justify-center">
              <button
                type="submit"
                className="w-[50%] py-[.2rem] rounded-md active:scale-[1.05] transition"
                style={{ backgroundColor: "#5c844c" }}
              >
                Register
              </button>
            </div>
          </form>
          <div className="flex justify-between mt-[10px]">
            <span>Already have an Account</span>
            <span>
              <button className="underline">
                <Link to="/login">Signin</Link>
              </button>
            </span>
          </div>
        </div>
      </section>
    </>
  );
}

export default Register;
