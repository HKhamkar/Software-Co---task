import React from "react";
import { Avatar, Card, CardContent, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import UpTrand from "../../assets/svgs/UpTrand";
import DownTrand from "../../assets/svgs/DownTrand";

const TotalCard = ({ title, amount, direction, description, icon, color }) => {
  return (
    <Card sx={{ borderRadius: "14px" }}>
      <CardContent>
        <Stack>
          <Grid container spacing={2} mb={4}>
            <Grid size={8}>
              <Stack>
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: "16px",
                    color: "rgba(32,34,36,0.70)",
                    mb: 1,
                  }}
                >
                  {title}
                </Typography>

                <Typography
                  variant="h6"
                  sx={{ fontSize: "24px", fontWeight: "700" }}
                >
                  {amount}
                </Typography>
              </Stack>
            </Grid>
            <Grid size={4}>
              <Stack alignItems={"end"}>
                <Avatar
                  sx={{
                    backgroundColor: color,
                    height: "60px",
                    width: "60px",
                    borderRadius: "23px",
                  }}
                >
                  {icon}
                </Avatar>
              </Stack>
            </Grid>
          </Grid>

          <Stack direction="row" spacing={1} alignItems={"center"}>
            {direction === "up" ? <UpTrand /> : <DownTrand />}
            <Typography
              variant="body2"
              sx={{
                fontSize: "16px",
                color: "rgba(32,34,36,0.70)",
                fontWeight: "600",
                span: {
                  color: direction === "up" ? "#00B69B" : "#F93C65",
                },
              }}
            >
              <span>{description.match(/^([\d.]+%)\s+(.*)$/)[1]}</span>{" "}
              {description.match(/^([\d.]+%)\s+(.*)$/)[2]}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default TotalCard;
