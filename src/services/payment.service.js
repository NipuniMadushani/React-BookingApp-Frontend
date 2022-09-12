import axios from "axios";
import swal from "sweetalert";


const API_URL = "http://localhost:9031/api/payment/charge";

 async function makePayment(token) {
const totalAmount=  JSON.parse(localStorage.getItem("totalAmount"))
    await axios
      .post(API_URL, "", {
        headers: {
          token: token.id,
          amount: totalAmount,
        },
      })
      .then(() => {

        swal({
            title: "Payment Sucess!",
            // text: "You clicked the button!",
            icon: "success",
          });
          localStorage.removeItem("totalAmount");
        // alert("Payment Success");
      })
      .catch((error) => {
        alert(error);
      });
  };



const PaymentService =  {
    makePayment
}

export default PaymentService;