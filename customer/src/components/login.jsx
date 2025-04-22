import "../style.css";
import logo from "../../footer icons/footer_logo.png";
import { useState } from "react";

function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({});
  function handleChange(evt) {
    const { name, value } = evt.target;

    setError((preErr) => ({ ...preErr, [name]: "" }));

    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }
  function handleSubmit(evt) {
    evt.preventDefault();
    let validationErrors = {};
    if (!data.email) validationErrors.email = "Email is required";
    if (!data.password) validationErrors.password = "Password is required";
    setError(validationErrors);
  }
  return (
    <>
      <section
        className="w-screen h-screen flex flex-col items-center justify-evenly"
        style={{ backgroundColor: "#e0f7fa" }}
      >
        <img src={logo} alt="logo" className="w-[250px]" />
        <div
          className="p-[2rem] min-w-[30%] rounded-xl"
          style={{ backgroundColor: "#23460f", color: "white" }}
        >
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
                className="w-[50%] py-[.2rem] rounded-md active:scale-[1.05] transition"
                style={{ backgroundColor: "#5c844c" }}
                onSubmit={handleSubmit}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default Login;
