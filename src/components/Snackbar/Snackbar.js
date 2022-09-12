// import React, { useState, forwardRef, useImperativeHandle } from "react";
// import "./Snackbar.css";

// const Snackbar = forwardRef((props, ref) => {
//   const [showSnackbar, setShowSnackbar] = useState(false);

//   useImperativeHandle(ref, () => ({
//     show() {
//       setShowSnackbar(true);
//       setTimeout(() => {
//         setShowSnackbar(false);
//       }, 3000);
//     },
//   }));
//   return (
//     <div
//       className="snackbar"
//       id={showSnackbar ? "show" : "hide"}
//       style={{
//         backgroundColor: props.type === "success" ? "#00F593" : "#FF0033",
//         color: props.type === "success" ? "black" : "white",
//       }}
//     >
//       <div className="symbol">
//         {props.type === "success" ? <h1>&#x2713;</h1> : <h1>&#x2613;</h1>}
//       </div>
//       <div className="message">{props.message}</div>
//     </div>
//   );
// });

// export default Snackbar;

import React, { useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Snackbar = (props) => {
  const { openPopupN } = props;
  console.log("open popup:"+openPopupN)
  
  const notify = () =>
  // toast.warn("Please Signin to the system for BookinG !", {
  //   position: toast.POSITION.TOP_CENTER
  // });
  toast.warn("Please Signin to the system for booking", {
    theme: "dark",
    position: toast.POSITION.TOP_CENTER
    
  })
  //  toast("Please Signin to the system for booking");

  // useEffect(() => {
  //   if(openPopup==true){
  //       console.log("true ooooo")
  //   }
  //  notify();
  //   // Update the document title using the browser API
  //   // document.title = `You clicked ${count} times`;
  // },[]);
  useEffect(() => {
    if (openPopupN==true){
      notify();
      console.log("called")
    }
        // setValues({
        //     ...openPopup
        // })
}, [openPopupN])
  
  return (
    <div>
        {/* <button onClick={notify}>Notify!</button> */}
        <ToastContainer />
      </div>
  )
}

export default Snackbar
