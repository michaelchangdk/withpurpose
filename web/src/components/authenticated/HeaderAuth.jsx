import React, { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authenticated } from "../../reducers/authenticated";
import logo from "../../assets/BWP_logotype.svg";
import styled from "styled-components";
import NoAccessModal from "./NoAccessModal";

const HeaderAuth = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElNav, setAnchorELNav] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const openProfile = Boolean(anchorEl);
  const openNav = Boolean(anchorElNav);
  const user = useSelector((store) => store.authenticated.uid);
  const displayName = useSelector((store) => store.authenticated.displayName);
  const [openModal, setOpenModal] = useState(false);
  const access = useSelector((store) => store.authenticated.access);

  const openProfileNav = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const openSiteNav = (event) => {
    setAnchorELNav(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setAnchorELNav(null);
  };

  const navigateSchool = () => {
    if (access.approvedSchool) {
      navigate(`/startup-school-weeks`);
    } else {
      setOpenModal(true);
    }
  };

  const navigateMasterClass = () => {
    if (access.approvedMasterClass) {
      navigate(`/masterclass`);
    } else {
      setOpenModal(true);
    }
  };

  const navigateMentor = () => {
    if (access.approvedMentorBooking) {
      navigate(`/masterclass`);
    } else {
      setOpenModal(true);
    }
  };

  // Add community to reducer, login, logout, signup, and also Sanity
  const navigateCommunity = () => {
    if (access.approvedCommunity) {
      navigate(`/masterclass`);
    } else {
      setOpenModal(true);
    }
  };

  const logout = () => {
    dispatch(authenticated.actions.logout());
    setAnchorEl(null);
    navigate("/");
    localStorage.clear();
  };

  return (
    <HeaderNav>
      <IconButton
        id="nav-button"
        aria-controls={openNav ? "nav-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={openNav ? "true" : undefined}
        onClick={openSiteNav}
      >
        <Logo src={logo} alt="logo navigation." />
      </IconButton>
      <Menu
        id="nav-menu"
        anchorEl={anchorElNav}
        open={openNav}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "nav-button",
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={() => navigate(`/startup-school-elearning`)}>
          Home
        </MenuItem>
        <MenuItem onClick={navigateSchool}>Startup School</MenuItem>
        <MenuItem onClick={navigateMasterClass}>Masterclasses</MenuItem>
        <MenuItem onClick={navigateMentor}>Mentors</MenuItem>
        <MenuItem onClick={navigateCommunity}>Community</MenuItem>
      </Menu>
      <NoAccessModal openModal={openModal} setOpenModal={setOpenModal} />
      <Button
        id="basic-button"
        aria-controls={openProfile ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={openProfile ? "true" : undefined}
        onClick={openProfileNav}
      >
        {displayName}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={openProfile}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={() => navigate(`/profile/${user}`)}>
          Profile
        </MenuItem>
        <MenuItem onClick={logout}>Logout</MenuItem>
      </Menu>
    </HeaderNav>
  );
};

export default HeaderAuth;

const HeaderNav = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  /* margin: 5px 20px; */
  /* width: 92vw; */
  width: calc(100vw - 32px);
  margin: 0 auto 2vh auto;
  padding-top: 3vh;
  /* z-index: 2; */
  /* position: absolute;
  top: 0;
  left: 0;
  right: 0; */
  /* bottom: 0; */
`;

const Logo = styled.img`
  width: 50px;
  height: 50px;
`;
