import axios from "axios";


const API_URL = "http://localhost:8080/api/trains/";

const getAllStations= () => {
    return axios.get(API_URL + "allStations");
    
  };

  const genderItems = [
    {
      id: "male",
      title: "Male",
    },
    {
      id: "female",
      title: "Female",
    },
    {
      id: "other",
      title: "Other",
    },
  ];

const StationService =  {
 getAllStations,
 genderItems
}

export default StationService;