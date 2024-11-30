import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import { GoArrowLeft } from "react-icons/go";
import { Link } from "react-router-dom";

const NotFound = () => {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  return (
    <Box
      component="main"
      sx={{
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <Stack spacing={3} sx={{ alignItems: "center", maxWidth: "md" }}>
        <Typography variant="h3" sx={{ textAlign: "center" }}>
          404: The page you are looking for isn&apos;t here
        </Typography>
        <Typography
          color="text.secondary"
          variant="body1"
          sx={{ textAlign: "center" }}
        >
          You either tried some shady route or you came here by mistake.
          Whichever it is, try using the navigation
        </Typography>
        <Link to={"/"}>
          <Button startIcon={<GoArrowLeft />} variant="contained">
            {loggedInUser ? "Go back to home" : "Go back to login"}
          </Button>
        </Link>
      </Stack>
    </Box>
  );
};

export default NotFound;
