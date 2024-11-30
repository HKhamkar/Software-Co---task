import React from "react";
import ProjectTable from "../components/Projects/ProjectTable";
import { Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const Projects = () => {
  const { t } = useTranslation();
  const projects = t("projects");

  return (
    <Stack>
      <Stack mb={3}>
        <Typography
          variant="h4"
          fontSize={{ xs: "", md: "24px" }}
          sx={{ fontWeight: "700" }}
        >
          {projects.projects}
        </Typography>
      </Stack>
      <ProjectTable />
    </Stack>
  );
};

export default Projects;
