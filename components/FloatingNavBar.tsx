import React, { useState, useEffect } from 'react'
import { IconButton } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import ChurchIcon from '@mui/icons-material/Church';
import CelebrationIcon from '@mui/icons-material/Celebration';
import FlightIcon from '@mui/icons-material/Flight';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import BedIcon from '@mui/icons-material/Bed';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';

export function FloatingNavBar({ show, setSelectedView }) {

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = () => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div
      className={`${
        show ? 'translate-y-0' : '-translate-y-full'
      } drop-shadow-sm bg-white border-b-1 border-gray-500 fixed top-0 w-screen transition-transform duration-500 ease-in-out flex justify-between z-50 items-center`}
    >
      <div className="text-5xl pt-3 px-4 sm:px-5" style={{ fontFamily: 'Copperplate'}}>P + S</div>
      <div className='pr-2 sm:pr-4' onClick={handleClick}>
        <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
            >
            <MenuIcon sx={{ fontSize: 40 }} />
          </IconButton>
      </div>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        disableScrollLock={true}
        PaperProps={{
          elevation: 0,
          sx: {
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        <MenuItem onClick={() => { handleClose(); setSelectedView('story') }}>
          <ListItemIcon>
            <AutoStoriesOutlinedIcon fontSize="small" />
          </ListItemIcon>
          Our Story
        </MenuItem>
        <MenuItem onClick={() => { handleClose(); setSelectedView('ceremony') }}>
          <ListItemIcon>
            <ChurchIcon fontSize="small" />
          </ListItemIcon>
          Ceremony
        </MenuItem>
        <MenuItem onClick={() => { handleClose(); setSelectedView('reception') }}>
          <ListItemIcon>
            <CelebrationIcon fontSize="small" />
          </ListItemIcon>
          Reception
        </MenuItem>
        <MenuItem onClick={() => { handleClose(); setSelectedView('hotel') }}>
          <ListItemIcon>
            <BedIcon fontSize="small" />
          </ListItemIcon>
          Hotel
        </MenuItem>
        <MenuItem onClick={() => { handleClose(); setSelectedView('travel') }}>
          <ListItemIcon>
            <FlightIcon fontSize="small" />
          </ListItemIcon>
          Travel
        </MenuItem>
        <MenuItem onClick={() => { handleClose(); setSelectedView('registry') }}>
          <ListItemIcon>
            <CardGiftcardIcon fontSize="small" />
          </ListItemIcon>
          Registry
        </MenuItem>
        <MenuItem onClick={() => { handleClose(); setSelectedView('rsvp') }}>
          <ListItemIcon>
            <MailOutlineIcon fontSize="small" />
          </ListItemIcon>
          RSVP
        </MenuItem>
      </Menu>
    </div>
  )
}
