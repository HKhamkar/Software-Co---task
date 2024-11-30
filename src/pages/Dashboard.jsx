import React from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import TotalCard from "../components/Dashboard/TotalCard";
import TotalUser from "../assets/svgs/TotalUser";
import TotalOrder from "../assets/svgs/TotalOrder";
import TotalSales from "../assets/svgs/TotalSales";
import TotalPanding from "../assets/svgs/TotalPanding";
import ApexChart from "../components/Dashboard/LineChart";

const Dashboard = () => {
  const { t } = useTranslation();
  const dashboard = t("dashboard");

  return (
    <>
      <Stack>
        <Stack mb={3}>
          <Typography
            variant="h4"
            fontSize={{ xs: "", md: "24px" }}
            sx={{ fontWeight: "700" }}
          >
            {dashboard.dashboard}
          </Typography>
        </Stack>

        <Grid container spacing={3} mb={4}>
          <Grid size={{ xs: 12, md: 6, lg: 3 }}>
            <TotalCard
              title={dashboard.totalUser}
              amount="40,689"
              direction="up"
              description={dashboard.upFromYesterday}
              icon={<TotalUser />}
              color="rgba(130,128,255,0.21)"
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6, lg: 3 }}>
            <TotalCard
              title={dashboard.totalOrder}
              amount="10,293"
              direction="up"
              description={dashboard.upFromPastWeek}
              icon={<TotalOrder />}
              color="rgba(254,197,61,0.21)"
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6, lg: 3 }}>
            <TotalCard
              title={dashboard.totalSales}
              amount="$89,000"
              direction="down"
              description={dashboard.downFromYesterday}
              icon={<TotalSales />}
              color="rgba(74,217,145,0.21)"
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6, lg: 3 }}>
            <TotalCard
              title={dashboard.totalPending}
              amount="2,040"
              direction="up"
              description={dashboard.upFromYesterday}
              icon={<TotalPanding />}
              color="rgba(255,144,102,0.21)"
            />
          </Grid>
        </Grid>

        <Card sx={{ borderRadius: "14px" }}>
          <CardContent>
            <Stack>
              <Typography
                variant="h6"
                sx={{
                  fontSize: "20px",
                  fontWeight: "700",
                }}
              >
                {dashboard.salesDetails}
              </Typography>
              <ApexChart />
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </>
  );
};

export default Dashboard;
