import axios from "axios";


const API_URL = "http://localhost:9956/api/booking";

const getAllBookingDetails= () => {
    console.log("Called");
    console.log("booking details:"+axios.get(API_URL + "/"));
    return axios.get(API_URL + "/");
    
  };


const saveBookingDetails = (bookingDate,countOfAdults,countOfKids,totalAmount,trainId,userId) =>  {
  // const  id=77,countOfAdults=78,countOfKids=98;
  console.log('save')
  console.log("booking date:"+bookingDate)
    console.log("adults 1:"+countOfAdults)
    console.log("kids ser"+countOfKids)
    console.log("total amount:"+totalAmount)
    console.log("user id:"+userId)
    console.log("train id:"+trainId)
    if(bookingDate==undefined){
     bookingDate=new Date();
     console.log("default date:"+bookingDate)
    }
    // return axios.get(API_URL + "trains");
    return axios.post(API_URL + "/ticket", {
      bookingDate,
       countOfAdults,
       countOfKids,
       totalAmount,
       trainId,
       userId
    })
    .then((response) => {
      return response.data;
    });
  };



const BookingService =  {
 saveBookingDetails,
 getAllBookingDetails
}

export default BookingService;