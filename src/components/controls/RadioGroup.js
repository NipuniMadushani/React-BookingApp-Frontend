import { FormControl, FormControlLabel, FormLabel,Radio,RadioGroup as MUIRadioGroup } from '@material-ui/core'
// import { Radio } from '@material-ui/icons'
// import { Label } from '@mui/icons-material'
import React from 'react'


export default function RadioGroup(props) {
    const {name,label,value,onChange,items}=props;
  return (
    <FormControl>
    <FormLabel id="demo-radio-buttons-group-label">{label}</FormLabel>
    <MUIRadioGroup
    //   defaultValue="female"
    // label={label}
      value={value}
      onChange={onChange}
      name={name}
      row>

        {
            items.map(
                (item)=>(
                    <FormControlLabel
                    key={item.id}
                    value={item.id}
                    control={<Radio />}
                    label={item.title}
                  />
                )
            )
        }
   
      {/* <FormControlLabel
        value="male"
        control={<Radio />}
        label="Male"
      />
      <FormControlLabel
        value="other"
        control={<Radio />}
        label="Other"
      /> */}
    </MUIRadioGroup>
  </FormControl>
  )
}
