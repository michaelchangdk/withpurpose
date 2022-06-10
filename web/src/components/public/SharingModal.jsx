import React from "react";
import Box from "@mui/material/Box";
import { Container } from "@mui/material";
import {
    TwitterShareButton,
    FacebookShareButton, 
    LinkedinShareButton,
    TwitterIcon,
    FacebookIcon,
    LinkedinIcon
  } from 'react-share';
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.default",
  color: "text.primary",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const SharingModal = ({ openModal, setOpenModal, id }) => {
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
            <Container sx={{display: "flex", justifyContent: "space-evenly"}}>
                <TwitterShareButton url={`https://withpurpose.netlify.app/blog/${id}`}>{<TwitterIcon size={32} round/>}</TwitterShareButton>
                <FacebookShareButton url={`https://withpurpose.netlify.app/blog/${id}`}>{<FacebookIcon size={32} round />}</FacebookShareButton>
                <LinkedinShareButton url={`https://withpurpose.netlify.app/blog/${id}`}>{<LinkedinIcon size={32} round />}</LinkedinShareButton>
            </Container>
            
        </Box>
      </Modal>
    </div>
  );
};

export default SharingModal;
