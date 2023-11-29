import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ProjectDetailsModal({ open, handleClose, individualProjectData }) {

  return (
    <div className='projectDetailContainer'>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}  className="modalBox">
          <CloseIcon className='closePojectDetails' onClick={handleClose} />
          <h2> Project Details </h2>
          <Typography> Name: {individualProjectData?.name}</Typography>
          <Typography> Description: {individualProjectData?.description}</Typography>
          <Typography> Duration: {individualProjectData?.duration} days</Typography>
          <Typography> Manager: {individualProjectData?.projectManager}</Typography>
          <Typography> From: {individualProjectData?.from}</Typography>
          <Typography> To: {individualProjectData?.to}</Typography>
        </Box>
      </Modal>
    </div>
  );
}