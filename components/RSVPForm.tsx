import React, { useState } from 'react';
import { TextField, Select, MenuItem, FormControl, InputLabel, Button, Typography } from '@mui/material';

function RSVPForm({ guestNumber, onGuestChange }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    dinnerSelection: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    onGuestChange({ ...formData, [name]: value });
  };

  return (
    <div className='w-full'>
        {guestNumber && <div className='text-base'>Guest {guestNumber}</div>}
        <TextField
            name="fullName"
            label="Full Name"
            required={!guestNumber || guestNumber === 1}
            value={formData.fullName}
            onChange={handleInputChange}
            margin="normal"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
              }
            }}
            fullWidth
        />
        <FormControl fullWidth margin="normal" required={formData.fullName !== ''}>
            <InputLabel id="dinner-selection-label">Dinner Selection</InputLabel>
            <Select
            labelId="dinner-selection-label"
            name="dinnerSelection"
            label="Dinner Selection"
            disabled={!formData.fullName}
            value={formData.dinnerSelection}
            onChange={handleInputChange}
            >
            <MenuItem value="Steak">Beef: Filet Mignon</MenuItem>
            <MenuItem value="Fish">Fish: Grouper</MenuItem>
            <MenuItem value="Vegetarian">Vegetarian: Squash Ravioli</MenuItem>
            </Select>
        </FormControl>
        <TextField
            name="phoneNumber"
            label={`Phone Number${(guestNumber && guestNumber !== 1) ? ' (optional)' : ''}`}
            value={formData.phoneNumber}
            onChange={handleInputChange}
            helperText='May be used for relevant wedding updates'
            margin="normal"
            required={!guestNumber || guestNumber === 1}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
              }
            }}
            fullWidth
        />
        <TextField
            name="email"
            type="email"
            label={`Email${(guestNumber && guestNumber !== 1) ? ' (optional)' : ''}`}
            value={formData.email}
            onChange={handleInputChange}
            required={!guestNumber || guestNumber === 1}
            margin="normal"
            helperText='May be used for relevant wedding updates'
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
              }
            }}
            fullWidth
        />
    </div>
  );
}

export default RSVPForm;
