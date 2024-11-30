import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteEstimate,
  fetchEstimates,
} from "../../redux/slices/estimateSlice";
import {
  Box,
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { BiSolidEditAlt } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";

const EstimateTable = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const estimates = useSelector((state) => state.estimates.estimates);

  useEffect(() => {
    dispatch(fetchEstimates());
  }, [dispatch]);

  const handleUpdateEstimate = (estimate) => {
    navigate("/estimates/edit", { state: { estimate } });
  };

  const handleDeleteEstimate = (id) => {
    dispatch(deleteEstimate(id));
  };

  return (
    <Stack>
      <Box
        sx={{
          mb: "20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h4"
          fontSize={{ xs: "", md: "24px" }}
          sx={{ fontWeight: "700" }}
        >
          Estimates
        </Typography>

        <Link to="/estimates/add">
          <Button
            variant="contained"
            sx={{
              textTransform: "capitalize",
              px: 4,
              py: "12px",
              whiteSpace: "nowrap",
            }}
          >
            Add Estimate
          </Button>
        </Link>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>ESTIMATE NAME</TableCell>
              <TableCell>GRAND TOTAL</TableCell>
              <TableCell>TOTAL MARGIN</TableCell>
              <TableCell>FINAL TOTAL</TableCell>
              <TableCell>PROJECT</TableCell>
              <TableCell>CREATED DATE</TableCell>
              <TableCell>LAST MODIFIED</TableCell>
              <TableCell>ACTION</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {estimates.length > 0 ? (
              estimates.map((estimate) => (
                <TableRow key={estimate.id}>
                  <TableCell>{estimate.id}</TableCell>
                  <TableCell>{estimate.estimateName}</TableCell>
                  <TableCell>{estimate.grandTotal}</TableCell>
                  <TableCell>{estimate.totalMargin}</TableCell>
                  <TableCell>{estimate.finalTotal}</TableCell>
                  <TableCell>Christine Brooks</TableCell>
                  <TableCell>
                    {estimate && estimate?.createdAt
                      ? dayjs(estimate?.createdAt).format("DD MMM YYYY")
                      : "-"}
                  </TableCell>
                  <TableCell>
                    {estimate && estimate?.lastModified
                      ? dayjs(estimate?.lastModified).format("DD MMM YYYY")
                      : "-"}
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                      <Box
                        sx={{ display: "flex", cursor: "pointer" }}
                        onClick={() => handleUpdateEstimate(estimate)}
                      >
                        <BiSolidEditAlt size={20} />
                      </Box>
                      <Box
                        sx={{ display: "flex", cursor: "pointer" }}
                        onClick={() => handleDeleteEstimate(estimate.id)}
                      >
                        <AiFillDelete size={20} />
                      </Box>
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell align="center">No data available</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};

export default EstimateTable;
