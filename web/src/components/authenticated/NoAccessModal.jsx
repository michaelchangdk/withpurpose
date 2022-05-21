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
            This content is currently not available.
          </Typography>
          <Typography sx={{ mt: 2 }}>
            We have decided to enable the content one week at a time to ensure
            everyone learns at the same pace.
            <br />
            Therefore, you can't access this specific content at the moment.
            <br />
            Xx, Nermeen, Ana & Ella
          </Typography>
          {/* <Typography sx={{ mt: 1 }}></Typography> */}
        </Box>
      </Modal>
    </div>
  );
};

export default NoAccessModal;
