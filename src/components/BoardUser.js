import React, { useState, useEffect } from "react";
// import * as React from 'react';
import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AdbIcon from "@mui/icons-material/Adb";
import Button from "@mui/material/Button";
import TrainIcon from "@material-ui/icons/Train";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import BookTrainTicket from "./BookTrainTicket/BookTrainTicket";

const BoardUser = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getUserBoard().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);

        if (error.response && error.response.status === 401) {
          // EventBus.dispatch("logout");
        }
      }
    );
  }, []);

  return (
    <div className="container">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              {/* <MenuIcon /> */}
              <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            ></Typography>
            <Button color="inherit" startIcon={<TrainIcon />}>
              Seat Booking
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      {/* <header className="jumbotron">
        {/* <h3>{content}</h3> */}

      {/* </header> */}
      {/* add Card */}
      <br/>
      <Card sx={{ minWidth: 275}}>
      <CardContent>
        <Typography sx={{ fontSize: 14,color:"#18bdf5",fontStyle:"oblique",fontFamily:"fantasy" }} color="text.secondary" gutterBottom>
          Book Train Ticket Online
        </Typography>
      </CardContent>

      <BookTrainTicket/>
      </Card>


    </div>
  );
};

export default BoardUser;
