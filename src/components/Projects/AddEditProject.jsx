import { Card, CardContent, Stack, Typography } from "@mui/material";
import React from "react";
import ProjectFrom from "./ProjectFrom";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const AddEditProject = () => {
  const { t } = useTranslation();
  const addEditProject = t("addEditProject");
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
          {action === "add"
            ? addEditProject.addNewProject
            : addEditProject.editProject}
        </Typography>
      </Stack>

      <Card sx={{ borderRadius: "14px", padding: 3 }}>
        <CardContent>
          <ProjectFrom />
        </CardContent>
      </Card>
    </Stack>
  );
};

export default AddEditProject;
