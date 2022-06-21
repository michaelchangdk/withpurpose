import React from "react";
// import { Helmet } from "react-helmet";
import HelmetMetaData from "./HelmetMetaData";

// React Share imports
import {
  TwitterShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  TwitterIcon,
  FacebookIcon,
  LinkedinIcon,
} from "react-share";
// MUI Imports
import { Box, Container, Modal } from "@mui/material";

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

const SharingModal = ({
  openModal,
  setOpenModal,
  id,
  title,
  excerpt,
  image,
  hashtags
}) => {
  const handleClose = () => setOpenModal(false);
  // console.log("ID", id, "Title", title, "Excerpt", excerpt, "image", image);
  return (
    <div>
      {openModal && (
        <HelmetMetaData 
          url={`https://withpurpose.netlify.app/blog/${id}`}
          image={image}
          title={title}
          excerpt={excerpt}
          hashtags={hashtags}
        />
      )}
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Container sx={{ display: "flex", justifyContent: "space-evenly" }}>
            <TwitterShareButton
              title={title}
              hashtags={hashtags}
              url={`https://withpurpose.netlify.app/blog/${id}`}
            >
              <TwitterIcon size={32} round />
            </TwitterShareButton>

            <FacebookShareButton
              title={title}
              hashtag={`#${hashtags[0]}`}
              url={`https://withpurpose.netlify.app/blog/${id}`}
            >
              <FacebookIcon size={32} round />
            </FacebookShareButton>

            <LinkedinShareButton
              title={title}
              summary={excerpt}
              url={`https://withpurpose.netlify.app/blog/${id}`}
              source={`https://withpurpose.netlify.app/blog/${id}`}
            >
              <LinkedinIcon size={32} round />
            </LinkedinShareButton>
          </Container>
        </Box>
      </Modal>
    </div>
  );
};

export default SharingModal;
