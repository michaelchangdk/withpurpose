import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const NoAccessModal = ({ openModal, setOpenModal }) => {
  const handleClose = () => setOpenModal(false);

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h6" component="h2">
            You don't have access to this page yet.
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Please contact us if you believe you should have access.
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            You may need to sign out and sign in again if you have been provided
            access.
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default NoAccessModal;
