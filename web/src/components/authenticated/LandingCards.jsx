import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { urlFor } from "../../client";

// MUI Imports
import {
  CardMedia,
  CardContent,
  Typography,
  Card,
  CardActionArea,
} from "@mui/material";
// Component Imports
import NoAccessModal from "./NoAccessModal";
// Styling Imports
import {
  AspectRatioBox,
  AspectRatioChild,
} from "../../styledcomponents/containers";

const LandingCards = ({ title, headline, description, linkTo, coverImage }) => {
  const access = useSelector((store) => store.authenticated.access);
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const coverImageURL = coverImage.asset._ref;

  // Checking access for navigating to the four sections, if not - opening the access modal
  const clickCard = () => {
    if (title.includes("School") && access.approvedSchool) {
      navigate(linkTo);
    }
    if (title.includes("Masterclass") && access.approvedMasterClass) {
      navigate(linkTo);
    }
    if (title.includes("Mentors") && access.approvedMentorBooking) {
      navigate(linkTo);
    }
    if (title.includes("Community") && access.approvedCommunity) {
      navigate(linkTo);
    } else {
      setOpenModal(true);
    }
  };

  return (
    <>
      <CardActionArea
        onClick={clickCard}
        sx={{ maxWidth: "sm", borderRadius: "4px" }}
      >
        <Card
          sx={{
            maxWidth: "sm",
            height: "100%",
          }}
        >
          <CardMedia>
            <AspectRatioBox>
              <AspectRatioChild
                backgroundimage={urlFor(coverImageURL).url()}
                xposition={coverImage.crop.top}
                yposition={coverImage.hotspot.y}
              ></AspectRatioChild>
            </AspectRatioBox>
          </CardMedia>
          <CardContent sx={{ alignSelf: "start", height: "100%" }}>
            <Typography
              gutterBottom
              variant="h5"
              fontWeight={400}
              component="div"
            >
              {title}
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              fontWeight={500}
              mb={0.5}
            >
              {headline}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {description}
            </Typography>
          </CardContent>
        </Card>
        <NoAccessModal openModal={openModal} setOpenModal={setOpenModal} />
      </CardActionArea>
    </>
  );
};

export default LandingCards;
