import React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authenticated } from "../../reducers/authenticated";
import logo from "../../assets/BWP_logotype.svg";
import styled from "styled-components";

const HeaderAuth = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const open = Boolean(anchorEl);
  const user = useSelector((store) => store.authenticated.uid);
  const displayName = useSelector((store) => store.authenticated.displayName);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigateProfile = () => {
    setAnchorEl(null);
    navigate(`/profile/${user}`);
  };

  const logout = () => {
    dispatch(authenticated.actions.logout());
    setAnchorEl(null);
    navigate("/");
  };

  return (
    <HeaderNav>
      <Logo src={logo} alt="logo navigation." />
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        {displayName}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={navigateProfile}>Profile</MenuItem>
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
  width: 92vw;
  margin: 0 auto;
`;

const Logo = styled.img`
  width: 50px;
  height: 50px;
`;
