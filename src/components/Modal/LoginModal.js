import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Login from '../Authentication/SignIn';


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

export default function LoginModal({loginModalState, setLoginModalState}) {
  return (
    <div >
      <Modal
        open={loginModalState}
        onClose={()=>{setLoginModalState(false)}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        
      >
        <Box sx={style} >
          <Login setLoginModalState = { setLoginModalState } />
        </Box>
      </Modal>
    </div>
  );
}