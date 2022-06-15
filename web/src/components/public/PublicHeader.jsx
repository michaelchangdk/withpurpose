import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// MUI Imports
import AppBar from "@mui/material/AppBar";
import {
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
// Styling Imports
import styled from "styled-components/macro";
// Asset Imports
import LogoText from "../../assets/logo_text.webp";

const PublicHeader = () => {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElNavAbout, setAnchorElNavAbout] = useState(null);

  // This is for the hamburger menu when it is condensed into one
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  // This is for the about menu when the menu is expanded
  const handleOpenAboutMenu = (event) => {
    setAnchorElNavAbout(event.currentTarget);
  };
  const handleCloseAboutMenu = () => {
    setAnchorElNavAbout(null);
  };

  return (
    <StyledAppBar position="static" color="transparent" elevation={0}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Button onClick={() => navigate("/")}>
            <Logo src={LogoText} alt="logo" />
          </Button>
          {/* This is the menu visible on mobile */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              justifyContent: "flex-end",
            }}
          >
            <IconButton
              size="large"
              aria-label="navigation menu bar"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem onClick={() => navigate("/openletter")}>
                <Typography textAlign="center">Open Letter</Typography>
              </MenuItem>
              <MenuItem onClick={() => navigate("/startup-school")}>
                <Typography textAlign="center">Startup School</Typography>
              </MenuItem>
              <MenuItem onClick={() => navigate("/blog")} divider={true}>
                <Typography textAlign="center">Blog</Typography>
              </MenuItem>
              <MenuItem onClick={() => navigate("/team")}>
                <Typography textAlign="center">Meet the Team</Typography>
              </MenuItem>
              <MenuItem onClick={() => navigate("/mentors")}>
                <Typography textAlign="center">Mentors</Typography>
              </MenuItem>
              <MenuItem onClick={() => navigate("/alumni")}>
                <Typography textAlign="center">Alumni</Typography>
              </MenuItem>
              <MenuItem onClick={() => navigate("/contact")} divider={true}>
                <Typography textAlign="center">Contact Us</Typography>
              </MenuItem>
              <MenuItem onClick={() => navigate("/login")}>
                <Typography textAlign="center">Sign In</Typography>
              </MenuItem>
            </Menu>
          </Box>
          {/* This is the menu visible on tablet/desktop */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "flex-end",
            }}
          >
            <Button
              onClick={() => navigate("/openletter")}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Open Letter
            </Button>
            <Button
              onClick={() => navigate("/startup-school")}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Startup School
            </Button>
            <Button
              onClick={() => navigate("/blog")}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Blog
            </Button>
            <Button
              onClick={handleOpenAboutMenu}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              About Us
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorElNavAbout}
              open={Boolean(anchorElNavAbout)}
              onClose={handleCloseAboutMenu}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={() => navigate("/team")}>
                Meet the Team
              </MenuItem>
              <MenuItem onClick={() => navigate("/mentors")}>Mentors</MenuItem>
              <MenuItem onClick={() => navigate("/alumni")}>Alumni</MenuItem>
              <MenuItem onClick={() => navigate("/contact")}>
                Contact Us
              </MenuItem>
            </Menu>
            <Button
              onClick={() => navigate("/login")}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Sign In
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </StyledAppBar>
  );
};

export default PublicHeader;

const Logo = styled.img`
  width: 230px;
  height: auto;
`;

const StyledAppBar = styled(AppBar)`
  && {
    padding-top: 8px;
    margin-bottom: 40px;
  }

  @media (min-width: 768px) {
    && {
      margin-bottom: 60px;
    }
  }
`;
