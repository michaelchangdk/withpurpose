import React from "react";
import { Helmet } from "react-helmet";

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
}) => {
  const handleClose = () => setOpenModal(false);
  console.log("ID", id, "Title", title, "Excerpt", excerpt, "image", image);
  return (
    <div>
      {openModal && (
        <Helmet>
          <title>{title}</title>
          <meta charset="utf-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="csrf_token" content="" />
          <meta property="type" content="website" />
          <meta
            property="url"
            content={`https://withpurpose.netlify.app/blog/${id}`}
          />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <meta name="msapplication-TileColor" content="#ffffff" />
          <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
          <meta name="theme-color" content="#ffffff" />
          <meta name="_token" content="" />
          <meta name="robots" content="noodp" />
          <meta property="title" content={title} />
          <meta property="quote" content={excerpt} />
          <meta name="description" content={excerpt} />
          <meta property="image" content={image} />
          <meta property="og:locale" content="en_US" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content={title} />
          <meta property="og:quote" content={excerpt} />
          <meta property="og:hashtag" content={"#WithPurpose"} />
          <meta property="og:image" content={image} />
          <meta content="image/*" property="og:image:type" />
          <meta
            property="og:url"
            content={`https://withpurpose.netlify.app/blog/${id}`}
          />
          <meta property="og:site_name" content="With Purpose" />
          <meta property="og:description" content={excerpt} />
        </Helmet>
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
              hashtags={["WithPurpose", "Entrepreneur"]}
              url={`https://withpurpose.netlify.app/blog/${id}`}
            >
              <TwitterIcon size={32} round />
            </TwitterShareButton>

            <FacebookShareButton
              title={title}
              hashtag={"#WithPurpose"}
              url={`https://withpurpose.netlify.app/blog/${id}`}
              image={image}
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
