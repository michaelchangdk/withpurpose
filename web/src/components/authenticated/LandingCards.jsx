import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import NoAccessModal from "./NoAccessModal";
import { urlFor } from "../../client";
import styled from "styled-components";

const LandingCards = ({ title, headline, description, linkTo, coverImage }) => {
  const access = useSelector((store) => store.authenticated.access);
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const coverImageURL = coverImage.asset._ref;

  // FEEL LIKE THIS IF STATEMENT CAN BE SOLVED IN A BETTER WAY VIA NAMING CONVENTIONS?
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
    <Card
      sx={{
        width: "100%",
        maxWidth: 500,
      }}
    >
      <CardActionArea onClick={clickCard}>
        <AspectRatioBox>
          <AspectRatioChild
            backgroundimage={urlFor(coverImageURL).url()}
            xposition={coverImage.crop.top}
            yposition={coverImage.hotspot.y}
          ></AspectRatioChild>
        </AspectRatioBox>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {headline}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <NoAccessModal openModal={openModal} setOpenModal={setOpenModal} />
    </Card>
  );
};

export default LandingCards;

const AspectRatioBox = styled.div`
  height: 0;
  overflow: hidden;
  padding-top: 56.25%;
  position: relative;
`;

const AspectRatioChild = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.backgroundimage});
  background-position-x: ${(props) => props.xposition * 100}%;
  background-position-y: ${(props) => props.yposition * 100}%;
  background-repeat: no-repeat;
  background-size: cover;
`;
