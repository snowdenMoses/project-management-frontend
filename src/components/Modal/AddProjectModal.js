import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import AddProject from '../AddProject';
import ArticleIcon from '@mui/icons-material/Article';


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

export default function AddProjectModal({  
  open, 
  handleClose, 
  editButtonClicked, 
  individualProjectData, 
  setIndividualProjectData,
  setShowSuccessMessage,
  setFlashMessage,
  isSignUp
}) {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <AddProject 
          handleClose= {handleClose} 
          editButtonClicked = {editButtonClicked} 
          individualProjectData = {individualProjectData} 
          setIndividualProjectData = {setIndividualProjectData}
          setShowSuccessMessage = { setShowSuccessMessage }
          setFlashMessage = {setFlashMessage}
          isSignUp = {isSignUp}
          />
        </Box>
      </Modal>
    </div>
  );
}