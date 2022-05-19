import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import NoAccessModal from "./NoAccessModal";

const LandingCards = ({ title, headline, description, linkTo }) => {
  const access = useSelector((store) => store.authenticated.access);
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);

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
      sx={
        {
          // maxWidth: 345
        }
      }
    >
      <CardActionArea onClick={clickCard}>
        {/* <CardMedia
          component="img"
          height="140"
          image="/static/images/cards/contemplative-reptile.jpg"
          alt="green iguana"
        /> */}
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
