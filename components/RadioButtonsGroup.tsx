import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function RadioButtonsGroup({ isAttending, handleChange }) {
  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">RSVP</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        name="radio-buttons-group"
        value={isAttending.toString()} // Set value to the state variable
        onChange={(e, value) => handleChange(value)} // Update state when value changes
      >
        <FormControlLabel value="true" control={<Radio />} label="I'll be there!" />
        <FormControlLabel value="false" control={<Radio />} label="Sorry, can't make it :(" />
      </RadioGroup>
    </FormControl>
  );
}