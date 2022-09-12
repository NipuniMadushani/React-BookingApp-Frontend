import axios from "axios";


const API_URL = "http://localhost:8080/api/trains/";

const getTrainDetails= () => {
    return axios.get(API_URL + "trains");
  };



const TrainService =  {
 getTrainDetails
}

export default TrainService;
