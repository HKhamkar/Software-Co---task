import { Stack, Typography } from "@mui/material";
import React from "react";
import EstimateForm from "./EstimateForm";
import { useLocation } from "react-router-dom";

const AddEditEstimate = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);
  const action = pathSegments[pathSegments.length - 1];

  return (
    <Stack>
      <Stack mb={3}>
        <Typography
          variant="h4"
          fontSize={{ xs: "", md: "24px" }}
          sx={{ fontWeight: "700" }}
        >
          {action === "add" ? "Add New Estimates" : "Edit Estimates"}
        </Typography>
      </Stack>
      <EstimateForm />
    </Stack>
  );
};

export default AddEditEstimate;
