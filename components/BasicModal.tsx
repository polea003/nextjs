import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100%',
  maxWidth: 450,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 2,
};

export default function BasicModal({ children, open, handleClose }) {

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="rounded-lg">
            <div className='flex justify-between items-start'>
                <div className='pt-2'>Please review your selections</div>
                <IconButton onClick={handleClose}><CloseIcon /></IconButton>
            </div>
          { children }
        </Box>
      </Modal>
    </div>
  );
}