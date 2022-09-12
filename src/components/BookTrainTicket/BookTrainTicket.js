import { Paper } from '@material-ui/core';
import React from 'react'
import BookTrainTicketForm from './BookTrainTicketForm';
import { makeStyles } from '@material-ui/core/styles';

// const paperStyle = { padding: '30px 20px', width: 1300, margin: "20px auto" }

const useStyles = makeStyles(theme => ({
  pageContent: {
    // '& .MuiFormControl-root':{
      // width:'80%',
      margin: theme.spacing(5),
      padding:theme.spacing(3),
      

    // }
    
  },
}));

 function BookTrainTicket() {
const classes =useStyles();

  return (
    <div className="submission-form">
      <Paper className={classes.pageContent} >
      <BookTrainTicketForm/>
      </Paper>
      
    </div>
  )
}

export default BookTrainTicket;
