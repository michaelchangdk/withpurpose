import React from "react";

// MUI Imports
import { Box, Typography, Modal } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  maxWidth: "80%",
  bgcolor: "background.default",
  color: "text.primary",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const NoAccessModal = ({ openModal, setOpenModal }) => {
  const handleClose = () => setOpenModal(false);

  return (
    <>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h5" component="h2" fontWeight={400}>
            This content is currently not available.
          </Typography>
          <Typography sx={{ mt: 2 }}>
            We have decided to enable the content one week at a time to ensure
            everyone learns at the same pace.
          </Typography>
          <Typography sx={{ mt: 1 }}>
            Therefore, you can't access this specific content at the moment.
          </Typography>
          <Typography sx={{ mt: 1 }}>Xx, </Typography>
          <Typography>Nermeen, Ana & Ella</Typography>
        </Box>
      </Modal>
    </>
  );
};

export default NoAccessModal;
