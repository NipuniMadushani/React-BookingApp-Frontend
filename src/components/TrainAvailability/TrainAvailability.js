import React, { useState, useEffect,useRef } from "react";
import MaterialTable, { MTableToolbar } from "material-table";
import TrainService from "../../services/train.service";
import tableIcons from "../MaterialIcons";
import Typical from "react-typical";
import Controls from "../controls/Controls";
import BookTrainTicketForm from "../BookTrainTicket/BookTrainTicketForm";
import AuthService from "../../services/auth.service";
import AddIcon from "@material-ui/icons/Add";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import CloseIcon from "@material-ui/icons/Close";
import Popup from "../Popup/Popup";
import { Button } from "@material-ui/core";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Snackbar from "../Snackbar/Snackbar";
// or
// import { Alert } from '@mui/material';

const steps = [
  "Hello Travellers 👋",
  1000,
  "General Information about Train",
  1000,
  "Enjoy Journey With Us 👌",
  1000,
];
// const data = [
//   { name: "Mohammad", surname: "Faisal", birthYear: 1995 },
//   { name: "Nayeem Raihan ", surname: "Shuvo", birthYear: 1994 },
// ];
const columns = [
  { title: "Train ID", field: "trainId", hidden: true },
  { title: "Train Code", field: "trainCode" },
  { title: "Train Name", field: "trainName" },
  { title: "From", field: "startStation" },
  { title: "To", field: "endStation" },
  { title: "Departs", field: "departsTime" },
  { title: "Arrives", field: "arrivesTime" },
  // {title:"Image",field:"imageUrl"},
  {
    title: "Image",
    field: "imageUrl",
    render: (rowData) => (
      <img src={rowData.imageUrl} style={{ width: 40, borderRadius: "20%" }} />
    ),
  },
];

const SnackbarType = {
  success: "success",
  fail: "fail",
};

const TrainAvailability = () => {
  const [tableData, setTableData] = useState([]);
  const notify = () => toast("Wow so easy!");
  const [currentUserLogin, setCurentUserLogin] = useState("");
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [openPopup, setOpenPopup] = useState(false);
  const [openPopupN, setOpenPopupN] = useState(false);
  const [records, setRecords] = useState(TrainService.getTrainDetails())

  // const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })

  useEffect(() => {
    // setTimeout(() => {
    TrainService.getTrainDetails().then(
      (response) => {
        console.log(response.data); 
        setTableData(response.data);
      },
      (error) => {
        console.log("Down server");
      }
    );
    console.log("current user login:" + currentUserLogin);

    // setTableData("John Doe")
    // }, []);
    // Passing an empty array as the second argument to useEffect makes it only run on mount and unmount, thus stopping any infinite loops.
  }, []);

  // async function  bookTrain(rowData){
  //   console.log("nnn")
  //   AuthService.getCurrentUser().then(
  //     (response)=>{
  //       console.log("cy user:"+response)
  //       setCurentUser(response)

  //     }
  //   )
  //   checkCurrentUser(rowData);
  // }
  const bookTrain = (item) => {
    const currentUser = AuthService.getCurrentUser();
    console.log("book trai:" + currentUser);
    if (currentUser != null) {
      item.totalAmount='';
      // alert("not null:" + currentUser.name);
      setCurentUserLogin(currentUser);
      console.log("item:"+item)
      setRecordForEdit(item)
      setOpenPopup(true);
  
    }else if(currentUser == null){
      setOpenPopupN(true);
      console.log("ophsjdhsds:"+openPopupN)
      // showToasterMessage();
    }


  
  };

  const addOrEdit = (employee, resetForm) => {
    // if (employee.id == 0)
    //     employeeService.insertEmployee(employee)
    // else
    //     employeeService.updateEmployee(employee)
    // resetForm()
    // setRecordForEdit(null)
    // setOpenPopup(false)
    // setRecords(TrainService.getTrainDetails())
}

  const openInPopup = (value) => {
    console.log("value:" + value);
    setRecordForEdit(value);
    setOpenPopup(true);
  };

  // const openInPopupN = (value) => {
  //   console.log("value:" + value);
  //   // setRecordForEdit(value);
  //   setOpenPopupN(true);
  //   console.log("openpopupN train booking:"+openInPopupN)
  // };

  return (
    <div>
      <MaterialTable
        title="Train Details"
        columns={columns}
        data={tableData}
        options={{
          exportButton: true,
          grouping: true,
          sorting: true,
        }}

        actions={[
          {
            icon: 'save',
            tooltip: 'Save User',
            onClick: (event, rowData) => 
            bookTrain(rowData)
            // setOpenPopup(true)
            // bookTrain(rowData) 
            // alert("You saved " + rowData.name)
          }
        ]}
        components={{
          Action: props => (
            <Button
              onClick={(event) => props.action.onClick(event, props.data)}
              color="primary"
              variant="contained"
              style={{textTransform: 'none'}}
              size="small"
            >
              Book Train
            </Button>
          ),
        }}
        detailPanel={(rowData) => {
          return (
            <div
              style={{
                // fontSize: 100,
                textAlign: "center",
                color: "white",
                backgroundColor: "#27425c",
              }} >
      
              <Typical
                wrapper="span"
                steps={steps}
                loop={1}
                className={"caca"}
              />
              <hr />
              {/* console.log("{rowData.name}:"+{rowData.name}) */}
              <span> Price For Adult : </span> RS. {rowData.priceForAdult}
              <br />
              Price For Kid : RS. {rowData.priceForKid}
              <br />
              Train Type :{rowData.trainType}
              <br />
              Amount Of Available Seat :{rowData.amountOfAvailableSeats}
              <br />
              Description : {rowData.trainDescription}
            </div>
          );
        }}
      />
      {/* <Popup>
        
      </Popup> */}
      <Popup
        title="Online Train Booking"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <BookTrainTicketForm
                    recordForEdit={recordForEdit}
                    // addOrEdit={addOrEdit}
                    />
      </Popup>

      {/* <Popup
        title="Online Train Booking"
        openPopup={openPopupN}
        setOpenPopup={setOpenPopupN}
      > */}
        <Snackbar   
         openPopupN={openPopupN}
        // setOpenPopupN={setOpenPopupN}
                    // recordForEdit={recordForEdit}
                    // addOrEdit={addOrEdit} 
                    />
      {/* </Popup> */}
    </div>
  );
};

export default TrainAvailability;
