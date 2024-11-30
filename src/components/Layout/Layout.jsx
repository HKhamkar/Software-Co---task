import React, { useState } from "react";
import { Outlet, NavLink, Link, useNavigate } from "react-router-dom";
import {
  Box,
  CssBaseline,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  useMediaQuery,
  useTheme,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Badge,
} from "@mui/material";
import { FiMenu } from "react-icons/fi";
import Logo from "../../assets/svgs/Logo";
import DashboardIcon from "../../assets/svgs/DashboardIcon";
import ProjectIcon from "../../assets/svgs/ProjectIcon";
import EstimateIcon from "../../assets/svgs/EstimateIcon";
import LogoutIcon from "../../assets/svgs/LogoutIcon";
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "../../helper/constant";
import { IoSearchOutline } from "react-icons/io5";
import DayThemeIcon from "../../assets/svgs/DayThemeIcon";
import profileAvatar from "../../assets/pngs/avatar.png";
import LanguageSelector from "./languageSelector";
import NotificationIcon from "../../assets/svgs/NotificationIcon";
import { useTranslation } from "react-i18next";

const drawerWidth = 240;

const Layout = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const sideBar = t("sideBar");
  const navbar = t("navbar");

  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("sm"));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  const drawer = (
    <Box sx={{ overflow: "auto" }}>
      <Toolbar sx={{ justifyContent: "center" }}>
        <Link to="/">
          <Box sx={{ display: "flex", cursor: "pointer" }}>
            <Logo />
          </Box>
        </Link>
      </Toolbar>
      <List sx={{ p: 0 }}>
        {[
          { text: sideBar.dashboard, path: "/", icon: <DashboardIcon /> },
          { text: sideBar.projects, path: "/projects", icon: <ProjectIcon /> },
          {
            text: sideBar.estimates,
            path: "/estimates",
            icon: <EstimateIcon />,
          },
        ].map((item, index) => (
          <ListItem
            button
            key={index}
            sx={{
              padding: "4px 20px",
              ":hover": {
                background: "white",
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                "&.active": {
                  backgroundColor: "#4880FF",
                  color: "white",
                  "& svg": {
                    fill: "white",
                  },
                },
                textDecoration: "none",
                p: "10px 12px",
                width: "100%",
                borderRadius: "6px",
                color: "#202224",
              }}
              component={NavLink}
              to={item.path}
            >
              {item.icon}
              <ListItemText
                primary={item.text}
                sx={{
                  margin: 0,
                  span: {
                    ":active": {
                      color: "#202224 !important",
                      fill: "#202224",
                    },
                    fontSize: "14px",
                  },
                }}
              />
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: {
            sm:
              isDesktop && mobileOpen
                ? `calc(100% - ${drawerWidth}px)`
                : "100%",
          },
          ml: { sm: isDesktop && mobileOpen ? `${drawerWidth}px` : 0 },
          bgcolor: "white",
          boxShadow: "none",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{
                mr: 2,
                display: { sm: "block" },
                ":hover": {
                  background: "white",
                },
              }}
            >
              <FiMenu color="#202224" />
            </IconButton>

            <Search>
              <SearchIconWrapper>
                <IoSearchOutline color="#202224" />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder={navbar.search}
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
            <Box sx={{ display: "flex" }}>
              <Badge
                badgeContent={6}
                color="error"
                sx={{
                  span: {
                    background: "#f93c65",
                  },
                }}
              >
                <NotificationIcon />
              </Badge>
            </Box>

            <Box sx={{ display: "flex" }}>
              <LanguageSelector />
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Avatar
                sx={{ bgcolor: "#8b8c8f", width: 34, height: 34 }}
                alt={loggedInUser ? loggedInUser.userName : "Admin"}
                src={profileAvatar}
              />

              <Box sx={{ display: "flex", flexFlow: "column" }}>
                {loggedInUser && loggedInUser.userName && (
                  <Typography
                    variant="h6"
                    sx={{
                      color: "#202224",
                      fontSize: "14px",
                      fontWeight: "700",
                    }}
                  >
                    {loggedInUser.userName}
                  </Typography>
                )}

                <Typography
                  variant="h6"
                  sx={{
                    color: "#565656",
                    fontSize: "10px",
                  }}
                >
                  {navbar.admin}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: "flex" }}>
              <DayThemeIcon />
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        variant={isDesktop ? "persistent" : "temporary"}
        open={mobileOpen}
        onClose={!isDesktop ? handleDrawerToggle : undefined}
        sx={{
          display: { xs: "block", sm: "block" },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            justifyContent: "space-between",
          },
        }}
      >
        {drawer}

        <Toolbar sx={{ justifyContent: "center" }}>
          <Box
            sx={{ display: "flex", gap: 1, cursor: "pointer" }}
            onClick={handleLogout}
          >
            <LogoutIcon />
            <Typography
              variant="h6"
              sx={{ color: "#202224", fontSize: "14px" }}
            >
              {sideBar.logout}
            </Typography>
          </Box>
        </Toolbar>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "#f5f6fa",
          p: 3,
          width: {
            sm:
              isDesktop && mobileOpen
                ? `calc(100% - ${drawerWidth}px)`
                : "100%",
          },
          ml: { sm: isDesktop && mobileOpen ? `${drawerWidth}px` : 0 },
          minHeight: "100vh",
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
