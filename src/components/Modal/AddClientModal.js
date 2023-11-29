import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import AddClient from '../AddClient';
import PersonAddIcon from '@mui/icons-material/PersonAdd';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 2,
};

export default function AddClientModal({open, handleClose, isSignUp}) {
  return (
    <div >
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        
      >
        <Box sx={style} >
          <AddClient handleClose={handleClose} isSignUp = {isSignUp}/>
        </Box>
      </Modal>
    </div>
  );
}