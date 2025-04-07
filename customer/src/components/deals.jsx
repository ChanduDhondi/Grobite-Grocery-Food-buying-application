import "../style.css";
import { Link } from "react-router-dom";

function Deals({ h1, p, bg, img, btn, btnBg, btnCol }) {
  return (
    <>
      <div
        className="p-[1rem] w-[30vw] h-[550px] flex justify-center flex-col items-center rounded-[10px] shadow-[0_0_5px_black]"
        style={{ backgroundColor: `${bg}` }}
      >
        <h1 className="text-[3rem]">{h1}</h1>
        <p className="mt-[2rem] mb-[1rem]">{p}</p>
        <Link to="/shop">
          <button
            className="p-[1rem] rounded-[20px] mt-[1rem] mb-[1rem]"
            style={{
              backgroundColor: `${btnBg}`,
              color: `${btnCol}`,
            }}
          >
            {btn}
          </button>
        </Link>
        <img src={img} alt="delivery boy" className="w-[10rem]  mt-auto" />
      </div>
    </>
  );
}

export default Deals;
