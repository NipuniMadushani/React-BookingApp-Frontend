import React from 'react';
import { KeyboardDatePicker, MuiPickersUtilsProvider, } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

export default function DatePicker(props) {
    const {name,label,value,onChange}=props;
   
    const convertToDefEventPara = (name,value) => ({
      target:{
        name,value
      }
    });


 
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
       <KeyboardDatePicker disableToolbar
       variant='inline '
       inputVariant='outlined'
          margin="normal"
          id="date-picker-dialog"
          name={name}
          label={label}
          format="MM/dd/yyyy"
          value={value}
          onChange={date=>onChange(convertToDefEventPara(name,date))}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
       
    </MuiPickersUtilsProvider>
  )
}
