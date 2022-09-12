import React from "react";
import { useState, useEffect } from "react";
import {
  Grid,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
  TextField,
  FormHelperText,
  InputAdornment,
  Input,
} from "@material-ui/core";
import { useForm, Form } from "../useForm";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Controls from "../controls/Controls";
import StationService from "../../services/station.service";
import TrainService from "../../services/train.service";
import "./BookTrainTicket.css";
import AuthService from "../../services/auth.service";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import ToastServive from "react-material-toast";
import BookingService from "../../services/booking.service";
import swal from "sweetalert";
import Payment from "../Payment/Payment";
import { useNavigate } from "react-router-dom";
// import withReactContent from 'sweetalert2-react-content'
const toast = ToastServive.new({
  place: "topRight",
  duration: 4,
  maxCount: 8,
});

// moved
// const useStyles = makeStyles(theme => ({
//     root: {
//       '& .MuiFormControl-root':{
//         width:'80%',
//         margin: theme.spacing(1),

//       }
//     },
//   }));

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

const initialFValues = {
  id: 0,
  trainId: "",
  startStation: "",
  endStation: "",
  countOfAdults: 0,
  countOfKids: 0,
  priceForAdult: 0,
  priceForKid: 0,
  totalAmount: "",
  bookingDate: new Date(),
};

const commonSelectData = {
  stationId: "",
  stationName: "",
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const BookTrainTicketForm = (props) => {
  const navigate = useNavigate();
  const { addOrEdit, recordForEdit } = props;

  console.log("addor edit:" + recordForEdit);
  // moved to the useForm
  // const [values, setValues] = useState(initialFValues);
  // const classes = useStyles();
  // const { values, setValues, handleInputChange } = useForm(initialFValues);
  const [stations, setStations] = useState([]);
  const [trains, setTableData] = useState([]);

  // const { addOrEdit, recordForEdit } = props
  //   const minValue = 0  //Or whichever number you want
  // const maxValue = 10
  // const [value, setValue] = useState(minValue)

  const [countOfAdults, setCountOfAdults] = useState(0);
  const [countOfKids, setCountOfKids] = useState(0);
  const [totalAdult, setTotalAdult] = useState(0);
  const [totalKids, setTotalKids] = useState(0);
  const validate = (fieldValues = values) => {
    console.log("Validate");
    let temp = { ...errors };
    if ("trainId" in fieldValues)
      temp.trainId = fieldValues.trainId ? "" : "This field is required.";
    if ("bookingDate" in fieldValues)
      temp.bookingDate = fieldValues.bookingDate
        ? ""
        : "This field is required.";

    // if ("mobile" in fieldValues)
    //   temp.mobile =
    //     fieldValues.mobile.length > 9 ? "" : "Minimum 10 numbers required.";
    if ("startStation" in fieldValues)
      temp.startStation =
        fieldValues.startStation.length != 0 ? "" : "This field is required.";
    if ("endStation" in fieldValues)
      temp.endStation =
        fieldValues.endStation.length != 0 ? "" : "This field is required.";
    if ("totalAmount" in fieldValues)
      temp.totalAmount = fieldValues.totalAmount
        ? ""
        : "This field is required.";
    setErrors({
      ...temp,
    });

    if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFValues, true, validate);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const currentUser = AuthService.getCurrentUser();
      toast.error('Hi '+ ""+ currentUser.name+" ! "+'Total Price  :'+values.totalAmount,()=>{
        console.log('closed')
      });
      values.userId = currentUser.id;

      swal({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          BookingService.saveBookingDetails(
            values.bookingDate,
            countOfAdults,
            countOfKids,
            values.totalAmount,
            values.trainId,
            currentUser.id
          ).then((response) => {
            swal("Sucessfully Saved !", {
              icon: "success",
            });
            resetForm();
            localStorage.setItem("totalAmount", JSON.stringify(values.totalAmount));
            navigate("/payment");
            // <Payment/>
          },
          (error) => {
            swal("Unsucessfull !", {
              icon: "error",
            });
          }
          
          );
        } else {
          // swal("Something Went Wrong!");
        }
      });

      // BookingService.saveBookingDetails(values.bookingDate,countOfAdults,countOfKids,values.totalAmount,values.trainId,currentUser.id).then(
      //   (response) => {
      //     console.log("data bbbbb :"+countOfAdults)
      //   }
      // );

      // addOrEdit(values, resetForm);
      // addOrEdit(values, resetForm);
    }
  };

  function handler(e) {
    if (Number(e.target.value) > 100) {
      setCountOfAdults(100);
    } else {
      setCountOfAdults(e.target.value);
      console.log("count of Adults:" + e.target.value);

      const totalAdult = Number(e.target.value) * Number(values.priceForAdult);
      console.log("total Adult:" + totalAdult);
      setTotalAdult(totalAdult);
      //  const totalKids=Number(values.valueKids)*Number(values.priceForKid);
      //  console.log("total kids:"+totalKids)
      //  const total=Number(totalAdult)+Number(totalKids);

      console.log("total:" + totalAdult);
      values.totalAmount = totalAdult + totalKids;
    }
  }

  function handlerNew(e) {
    if (Number(e.target.value) > 100) {
      setCountOfKids(100);
    } else {
      setCountOfKids(e.target.value);
      const totalValue = Number(e.target.value * values.priceForKid);
      setTotalKids(totalValue);
      values.totalAmount = totalValue + totalAdult;
    }
  }

  useEffect(() => {
    StationService.getAllStations().then(
      (response) => {
        setStations(response.data);

        // commonSelectData.stationId=response.data;
        // console.log('commonSelectData.stationId:'+commonSelectData.stationId)
      },
      (error) => {
        console.log("Down server");
      }
    );

    TrainService.getTrainDetails().then(
      (response) => {
        console.log(response.data);
        setTableData(response.data);
      },
      (error) => {
        console.log("Down server....");
      }
    );

    if (recordForEdit != null)
      setValues({
        ...recordForEdit,
      });
  }, [recordForEdit]);

  console.log("strat station:" + values.endStation);
  console.log("trainId:" + values.trainId);

  // moved to the useForm.js
  // const handleInputChange=e=>{
  // const {name,value}= e.target
  // setValues({
  //   ...values,\
  //   [name]:value
  // })

  // }
  return (
    <div>
      {/* <form className={classes.root}> */}
      <Form onSubmit={handleSubmit}>
        <Grid container>
          <Grid item xs={6} align="center">
            <Item>
              {/* <label>
                Select Train: */}
              {/* <Controls.Select
                name="selectTrain"
                label="Choose Train"
                value={values.selectTrain}
                onChange={handleInputChange}
                options={trains}
              /> */}
              <FormControl
                variant="filled"
                sx={{ m: 1, minWidth: 120 }}
                {...(errors.trainId && { error: true })}
              >
                {/* <InputLabel id="demo-simple-select-label">Choose Select</InputLabel> */}
                <InputLabel id="demo-simple-select-standard-label">
                  Choose Train
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select"
                  name="trainId"
                  value={values.trainId}
                  label="Choose Train"
                  onChange={handleInputChange}
                  error={errors.trainId}
                  // options={trains}
                >
                  <MenuItem value="">None</MenuItem>
                  {trains.map((item) => (
                    <MenuItem key={item.trainId} value={item.trainId}>
                      {item.trainName}
                    </MenuItem>
                  ))}
                  {/* <MenuItem value={20}>Twenty</MenuItem>
      <MenuItem value={30}>Thirty</MenuItem> */}
                </Select>
                {errors.trainId && (
                  <FormHelperText>{errors.trainId}</FormHelperText>
                )}
              </FormControl>
              {/* </label> */}

              {/* Date Picker */}

              <Controls.DatePicker
                name="bookingDate"
                label="Date"
                value={values.bookingDate}
                onChange={handleInputChange}
                error={errors.bookingDate}
                // options={stations}
              />

              {/* <br /> */}
              <Grid container>
                <Grid item xs={6} align="center">
                  <TextField
                    id="outlined-number"
                    label="Count of Adults"
                    name="countOfAdults"
                    type="number"
                    InputProps={{
                      inputProps: { min: "0", max: "100", step: "1" },
                    }}
                    variant="outlined"
                    onChange={handler}
                    value={countOfAdults}
                    error={errors.countOfAdults}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Controls.Input
                    name="priceForAdult"
                    label="Adult Price"
                    InputProps={{
                      readOnly: true,
                    }}
                    value={values.priceForAdult}
                    onChange={handleInputChange}
                  />
                </Grid>
              </Grid>

              <Grid container>
                <Grid item xs={6} align="center">
                  <TextField
                    id="outlined-number"
                    name="countOfKids"
                    label="Count of Kids"
                    type="number"
                    InputProps={{
                      inputProps: { min: "0", max: "100", step: "1" },
                    }}
                    variant="outlined"
                    onChange={handlerNew}
                    value={countOfKids}
                  />
                </Grid>

                <Grid item xs={6} align="center">
                  <Controls.Input
                    name="priceForKid"
                    label="Child Price"
                    InputProps={{
                      readOnly: true,
                    }}
                    value={values.priceForKid}
                    onChange={handleInputChange}
                    type="number"
                  />
                </Grid>
              </Grid>

              {/* <Controls.Input
              name="fullName"
              label="Full Name"
              value={values.fullName}
              onChange={handleInputChange}
            /> */}

              {/* <Controls.Input
              name="email"
              label="Email"
              value={values.email}
              onChange={handleInputChange}
            /> */}
              {/* moved to the input.js */}

              {/* <TextField
              id="outlined-basic"
              label="Email"
              name="email"
              variant="outlined"
              value={values.email}
              onChange={handleInputChange}
            /> */}
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item>
              {/* <label>From: </label> */}

              <Controls.Select
                name="startStation"
                label="From "
                value={values.startStation}
                onChange={handleInputChange}
                options={stations}
                error={errors.startStation}
              />

              {/* <label>To: </label> */}
              <Controls.Select
                name="endStation"
                label="To"
                value={values.endStation}
                onChange={handleInputChange}
                options={stations}
                error={errors.endStation}
              />
              <FormControl variant="standard">
                <InputLabel htmlFor="input-with-icon-adornment">
                  Total Amount For Tickets
                </InputLabel>
                <Input
                  id="input-with-icon-adornment"
                  required
                  name="totalAmount"
                  // id="outlined-error"
                  label="Total Amount"
                  value={values.totalAmount}
                  startAdornment={
                    <InputAdornment position="start">
                      <MonetizationOnIcon />
                    </InputAdornment>
                  }
                />
              </FormControl>
              {/* <Controls.Input required

                        label="Total Amount"
                        name="totalAmount"
                        // InputProps={{
                        //   readOnly: true,
                        // }}
                        value={values.totalAmount}
                        onChange={handleInputChange}
                        // error={values.totalAmount}
                    /> */}

              {/* <TextField
         required
          id="outlined-error"
          label="Total Amount"
          value={values.totalAmount}
          onChange={handleInputChange}
        /> */}
              {/* <br /> */}
              <hr />
              <div>
                <Controls.Button type="submit" text="Submit" />
                <Controls.Button
                  text="Reset"
                  color="default"
                  onClick={resetForm}
                />
              </div>

              {/* <Controls.RadioGroup  value={values.gender}
            label="gender"
                onChange={handleInputChange}
                name="gender"
                items={genderItems}
                /> */}

              {/* Moved to RadioGroup */}
              {/* <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                value={values.gender}
                onChange={handleInputChange}
                name="gender"
                row
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                />
              </RadioGroup>
            </FormControl> */}
            </Item>
          </Grid>
        </Grid>
        {/* <Grid item xs={4}>
    <Item>xs=4</Item>
  </Grid>
  <Grid item xs={8}>
    <Item>xs=8</Item>
  </Grid> */}
      </Form>
      {/* </form> */}
    </div>
  );
};

export default BookTrainTicketForm;
