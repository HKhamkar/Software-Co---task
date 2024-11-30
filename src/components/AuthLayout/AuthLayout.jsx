import React from "react";
import { Outlet } from "react-router-dom";
import { Box, Paper } from "@mui/material";

const AuthLayout = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#4880FF",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          width: "400px",
          maxWidth: "90%",
          textAlign: "center",
          borderRadius: "14px",
        }}
      >
        <Outlet />
      </Paper>
    </Box>
  );
};

export default AuthLayout;
