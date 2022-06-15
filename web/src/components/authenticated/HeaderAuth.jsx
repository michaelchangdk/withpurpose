import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authenticated } from "../../reducers/authenticated";

// MUI Imports
import { Avatar, IconButton, MenuItem, Menu, Container } from "@mui/material";
// Component Imports
import NoAccessModal from "./NoAccessModal";
// Styling Imports
import logo from "../../assets/BWP_logotype.svg";
// Asset Imports
import styled from "styled-components/macro";

const HeaderAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // For the menu & navigation
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElNav, setAnchorELNav] = useState(null);
  const openProfile = Boolean(anchorEl);
  const openNav = Boolean(anchorElNav);
  const [openModal, setOpenModal] = useState(false);
  const access = useSelector((store) => store.authenticated.access);
  // For avatar and navigation to user profile
  const userAvatarUrl = useSelector((store) => store.authenticated.photoURL);
  const displayName = useSelector((store) => store.authenticated.displayName);
  const userslug = displayName.split(" ").join("").toLowerCase();

  // Creates a string avatar if there
  const stringAvatar = () => {
    return {
      children: `${displayName.split(" ")[0][0]}${
        displayName.split(" ")[1][0]
      }`,
    };
  };

  const openSiteNav = (event) => {
    setAnchorELNav(event.currentTarget);
  };

  const openProfileNav = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setAnchorELNav(null);
  };

  const logout = () => {
    dispatch(authenticated.actions.logout());
    setAnchorEl(null);
    navigate("/");
    localStorage.clear();
  };

  return (
    <Container maxWidth="lg">
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
          <MenuItem
            onClick={() => {
              access.approvedSchool
                ? navigate(`/startup-school-weeks`)
                : setOpenModal(true);
            }}
          >
            Startup School
          </MenuItem>
          <MenuItem
            onClick={() => {
              access.approvedMasterClass
                ? navigate(`/masterclass`)
                : setOpenModal(true);
            }}
          >
            Masterclasses
          </MenuItem>
          <MenuItem
            onClick={() => {
              access.approvedMentorBooking
                ? navigate(`/book-a-mentor`)
                : setOpenModal(true);
            }}
          >
            Mentors
          </MenuItem>
          <MenuItem
            onClick={() => {
              access.approvedCommunity
                ? navigate(`/community`)
                : setOpenModal(true);
            }}
          >
            Community
          </MenuItem>
        </Menu>
        <NoAccessModal openModal={openModal} setOpenModal={setOpenModal} />
        <IconButton
          id="basic-button"
          aria-controls={openProfile ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={openProfile ? "true" : undefined}
          onClick={openProfileNav}
        >
          {userAvatarUrl.length > 0 && (
            <Avatar
              src={userAvatarUrl}
              alt={displayName}
              sx={{ height: 48, width: 48 }}
            />
          )}
          {userAvatarUrl.length === 0 && (
            <Avatar
              {...stringAvatar({ displayName })}
              alt={displayName}
              sx={{
                bgcolor: "primary.main",
                color: "primary.contrastText",
                height: 48,
                width: 48,
              }}
            />
          )}
        </IconButton>
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
          <MenuItem onClick={() => navigate(`/profile/${userslug}`)}>
            Profile
          </MenuItem>
          <MenuItem onClick={logout}>Logout</MenuItem>
        </Menu>
      </HeaderNav>
    </Container>
  );
};

export default HeaderAuth;

const HeaderNav = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto 28px auto;
  padding-top: 32px;
`;

const Logo = styled.img`
  width: 50px;
  height: 50px;
`;
