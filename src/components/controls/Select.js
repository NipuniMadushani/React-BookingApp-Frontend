// import { FormControl, InputLabel,MenuItem,Select as MuiSelect } from '@material-ui/core';
// import React from 'react'

//  function Select(props) {

//     const {name,label,value,onChange,options}=props;
//     console.log("options:"+options);
    
    

//   return (
//     <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
//     <InputLabel id="demo-simple-select-label">{label}</InputLabel>
//     <MuiSelect
//       labelId="demo-simple-select-label"
//       id="demo-simple-select"
//       name={name}
//       value={value}
//       label={label}
//       onChange={onChange}
//     >
//       <MenuItem value="">None</MenuItem>
//       {
//        options.map(
//         item=>(<MenuItem key={item.stationId} value={item.stationId}>{item.stationName}</MenuItem>)
//        )
//       }
//       {/* <MenuItem value={20}>Twenty</MenuItem>
//       <MenuItem value={30}>Thirty</MenuItem> */}
//     </MuiSelect>
//   </FormControl>
//   )
// }

// export default Select;


import React from 'react'
import { FormControl, InputLabel, Select as MuiSelect, MenuItem, FormHelperText } from '@material-ui/core';

export default function Select(props) {

    const { name, label, value,error=null, onChange, options } = props;

    return (
        <FormControl variant="outlined"
        {...(error && {error:true})}>
            <InputLabel>{label}</InputLabel>
            <MuiSelect
                label={label}
                name={name}
                value={value}
                onChange={onChange}>
                <MenuItem value="">None</MenuItem>
                {
                    options.map(
                      item=>(<MenuItem key={item.stationId} value={item.stationName}>{item.stationName}</MenuItem>)
                    )
                } 
            </MuiSelect>
            {error && <FormHelperText>{error}</FormHelperText>}
        </FormControl>
    )
}

