import React from 'react';
import Stripe from "react-stripe-checkout";
import PaymentService from '../../services/payment.service';

function Payment() {
    async function handleToken(token) {
        PaymentService.makePayment(token).then(
            (response) => {
              console.log(response.data); 
            //   setTableData(response.data);
            },
            (error) => {
              console.log("Down server");
            }
          );


        // console.log(token);
        // await axios
        //   .post("http://localhost:8089/api/payment/charge", "", {
        //     headers: {
        //       token: token.id,
        //       amount: 500,
        //     },
        //   })
        //   .then(() => {
        //     alert("Payment Success");
        //   })
        //   .catch((error) => {
        //     alert(error);
        //   });
      }



  return (
    <div>
       {/* <div className="App"> */}
      <Stripe
        stripeKey="pk_test_51Ld3w1E1b0Yn7D2JCsh2prL6ODEGaeHvi4XzXNy859KDuBIjZFPEVGl8x7uPPSKvcEOsUR9OhfFTCaJcPiezNDqX0005Y6up44"
        token={handleToken}
      />
    {/* </div> */}
    </div>
  )
}

export default Payment
