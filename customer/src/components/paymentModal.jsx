import paymentAnimation from "../../payment success.json";
import Lottie from "lottie-react";

function PaymentSuccessModal() {
  return (
    <>
      <div
        className="fixed top-0 left-0 w-[100vw] h-[100vh] flex justify-center items-center z-10"
        style={{ background: "rgba(0,0,0,0.5)" }}
      >
        <div
          className="p-[1rem] w-[500px] rounded-lg"
          style={{ background: "white" }}
        >
          <Lottie animationData={paymentAnimation} loop={true}></Lottie>
        </div>
      </div>
    </>
  );
}

export default PaymentSuccessModal;
