import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProjects, deleteProject } from "../../redux/slices/projectSlice";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Box,
  Stack,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Menu,
  ButtonGroup,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import FilterIcon from "../../assets/svgs/FilterIcon";
import ResetIcon from "../../assets/svgs/ResetIcon";
import Grid from "@mui/material/Grid2";
import { IoMdArrowDropdown } from "react-icons/io";
import { BiSolidEditAlt } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useTranslation } from "react-i18next";

const ProjectTable = () => {
  const { t } = useTranslation();
  const projectData = t("projects");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects.projects);

  // State for filters
  const [filters, setFilters] = useState({
    customer: "",
    dueDate: "",
    projectName: "",
  });

  const [filteredProjects, setFilteredProjects] = useState([]);

  // State for column visibility
  const [columns, setColumns] = useState({
    id: true,
    customer: true,
    refNo: true,
    projectName: true,
    projectNumber: true,
    areaLocation: true,
    address: true,
    dueDate: true,
  });

  // State for column widths
  const [columnWidths, setColumnWidths] = useState({
    id: 100,
    customer: 150,
    refNo: 150,
    projectName: 200,
    projectNumber: 200,
    areaLocation: 200,
    address: 200,
    dueDate: 150,
  });

  // State for resizing behavior
  const [isResizing, setIsResizing] = useState(false);
  const [resizingColumn, setResizingColumn] = useState(null);
  const [startX, setStartX] = useState(0);
  const [startWidth, setStartWidth] = useState(0);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  useEffect(() => {
    let filtered = projects;

    if (filters.customer) {
      filtered = filtered.filter((project) =>
        project.customer.toLowerCase().includes(filters.customer.toLowerCase())
      );
    }

    if (filters.dueDate) {
      filtered = filtered.filter(
        (project) =>
          new Date(project.dueDate).toDateString() ===
          new Date(filters.dueDate).toDateString()
      );
    }

    if (filters.projectName) {
      filtered = filtered.filter((project) =>
        project.projectName
          .toLowerCase()
          .includes(filters.projectName.toLowerCase())
      );
    }

    setFilteredProjects(filtered);
  }, [projects, filters]);

  const handleUpdateProject = (project) => {
    navigate("/projects/edit", { state: { project } });
  };

  const handleDeleteProject = (id) => {
    dispatch(deleteProject(id));
  };

  const handleResetFilters = () => {
    setFilters({ customer: "", dueDate: "", projectName: "" });
  };

  const toggleColumn = (column) => {
    setColumns((prevColumns) => ({
      ...prevColumns,
      [column]: !prevColumns[column],
    }));
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Mouse down event for starting the resize
  const handleMouseDown = (column) => (event) => {
    setIsResizing(true);
    setResizingColumn(column);
    setStartX(event.clientX);
    setStartWidth(columnWidths[column]);
  };

  // Mouse move event to resize column
  const handleMouseMove = (event) => {
    if (!isResizing) return;
    const diff = event.clientX - startX;
    setColumnWidths((prevWidths) => ({
      ...prevWidths,
      [resizingColumn]: startWidth + diff,
    }));
  };

  // Mouse up event to stop resizing
  const handleMouseUp = () => {
    setIsResizing(false);
    setResizingColumn(null);
  };

  useEffect(() => {
    if (isResizing) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing]);

  return (
    <Stack>
      {/* Filters and Column Visibility Options */}
      <Box
        sx={{ mb: "20px", display: "flex", justifyContent: "space-between" }}
      >
        <ButtonGroup variant="outlined" aria-label="Basic button group">
          <Button
            sx={{
              background: "#f9f9fb",
              borderColor: "#D5D5D5",
              padding: "12px 16px",
            }}
          >
            <FilterIcon />
          </Button>
          <Button
            sx={{
              background: "#f9f9fb",
              color: "#202224",
              textTransform: "capitalize",
              borderColor: "#D5D5D5",
              padding: "12px 14px",
              fontWeight: "700",
            }}
          >
            {projectData.filterBy}
          </Button>
          <Button
            sx={{
              background: "#f9f9fb",
              borderColor: "#D5D5D5",
              padding: "12px 10px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                cursor: "pointer",
                fontSize: "14px",
                color: "#202224",
                textTransform: "capitalize",
              }}
              onClick={handleMenuOpen}
            >
              {projectData.hideColumns}
              <IoMdArrowDropdown size={20} color="#727273" />
            </Box>

            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
              PaperProps={{ style: { maxHeight: 300, width: 550 } }}
              sx={{
                ul: {
                  display: "flex",
                  flexWrap: "wrap",
                },
              }}
            >
              <Grid container spacing={3} p={2}>
                {Object.keys(columns).map((column) => (
                  <Grid size={4} key={column}>
                    <Box sx={{ display: "flex", width: "100%" }}>
                      <Button
                        onClick={() => toggleColumn(column)}
                        style={{
                          textTransform: "uppercase",
                          width: "100%",
                          justifyContent: "center",
                          backgroundColor: columns[column]
                            ? "#4880FF"
                            : "transparent",
                          color: columns[column] ? "white" : "#000",
                          border: "1px solid #979797",
                          borderRadius: "50px",
                        }}
                      >
                        {column
                          .replace(/([A-Z])/g, " $1")
                          .replace(/^./, (str) => str.toUpperCase())}
                      </Button>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Menu>
          </Button>
          <Button
            sx={{
              background: "#f9f9fb",
              borderColor: "#D5D5D5",
              padding: "12px 16px",
            }}
          >
            <FormControl sx={{ minWidth: 150 }}>
              <InputLabel
                sx={{
                  textTransform: "capitalize",
                  fontSize: "14px",
                  color: "#202224",
                }}
              >
                {projectData.customer}
              </InputLabel>
              <Select
                value={filters.customer}
                onChange={(e) =>
                  setFilters({ ...filters, customer: e.target.value })
                }
                label={projectData.customer}
                sx={{ fontSize: "14px", color: "#202224" }}
              >
                {[...new Set(projects.map((project) => project.customer))].map(
                  (customer) => (
                    <MenuItem key={customer} value={customer}>
                      {customer}
                    </MenuItem>
                  )
                )}
              </Select>
            </FormControl>
          </Button>
          <Button
            sx={{
              background: "#f9f9fb",
              borderColor: "#D5D5D5",
              padding: "12px 10px",
            }}
          >
            <TextField
              label={projectData.dueDate}
              type="date"
              InputLabelProps={{ shrink: true }}
              value={filters.dueDate}
              onChange={(e) =>
                setFilters({ ...filters, dueDate: e.target.value })
              }
              sx={{
                input: {
                  fontSize: "14px",
                },
              }}
            />
          </Button>
          <Button
            sx={{
              background: "#f9f9fb",
              borderColor: "#D5D5D5",
              padding: "12px 10px",
            }}
          >
            <TextField
              label={projectData.projectName}
              type="text"
              value={filters.projectName}
              onChange={(e) =>
                setFilters({ ...filters, projectName: e.target.value })
              }
              sx={{
                textTransform: "capitalize",
                fontSize: "14px",
                color: "#202224",
                width: "160px",
                label: {
                  textTransform: "capitalize",
                  fontSize: "14px",
                  color: "#202224",
                },
              }}
            />
          </Button>
          <Button
            sx={{
              background: "#f9f9fb",
              color: "#EA0234",
              textTransform: "capitalize",
              borderColor: "#D5D5D5",
              padding: "12px 10px",
              alignItems: "center",
              fontWeight: "700",
              gap: 1,
            }}
            onClick={handleResetFilters}
          >
            <ResetIcon />
            {projectData.resetFilters}
          </Button>
        </ButtonGroup>

        <Stack direction="row" spacing={2} alignItems="center">
          <Link to="/projects/add">
            <Button
              variant="contained"
              sx={{
                textTransform: "capitalize",
                px: 4,
                py: "12px",
                whiteSpace: "nowrap",
              }}
            >
              {projectData.addProject}
            </Button>
          </Link>
        </Stack>
      </Box>

      {/* Project Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.id && (
                <TableCell
                  style={{
                    width: columnWidths.id,
                    cursor: "col-resize",
                  }}
                  onMouseDown={handleMouseDown("id")}
                >
                  {projectData.ID}
                </TableCell>
              )}
              {columns.customer && (
                <TableCell
                  style={{
                    width: columnWidths.customer,
                    cursor: "col-resize",
                  }}
                  onMouseDown={handleMouseDown("customer")}
                >
                  {projectData.Customer}
                </TableCell>
              )}
              {columns.refNo && (
                <TableCell
                  style={{
                    width: columnWidths.refNo,
                    cursor: "col-resize",
                  }}
                  onMouseDown={handleMouseDown("refNo")}
                >
                  {projectData.RefNumber}
                </TableCell>
              )}
              {columns.projectName && (
                <TableCell
                  style={{
                    width: columnWidths.projectName,
                    cursor: "col-resize",
                  }}
                  onMouseDown={handleMouseDown("projectName")}
                >
                  {projectData.ProjectName}
                </TableCell>
              )}
              {columns.projectNumber && (
                <TableCell
                  style={{
                    width: columnWidths.projectNumber,
                    cursor: "col-resize",
                  }}
                  onMouseDown={handleMouseDown("projectNumber")}
                >
                  {projectData.ProjectNumber}
                </TableCell>
              )}
              {columns.areaLocation && (
                <TableCell
                  style={{
                    width: columnWidths.areaLocation,
                    cursor: "col-resize",
                  }}
                  onMouseDown={handleMouseDown("areaLocation")}
                >
                  {projectData.AreaLocation}
                </TableCell>
              )}
              {columns.address && (
                <TableCell
                  style={{
                    width: columnWidths.address,
                    cursor: "col-resize",
                  }}
                  onMouseDown={handleMouseDown("address")}
                >
                  {projectData.Address}
                </TableCell>
              )}
              {columns.dueDate && (
                <TableCell
                  style={{
                    width: columnWidths.dueDate,
                    cursor: "col-resize",
                  }}
                  onMouseDown={handleMouseDown("dueDate")}
                >
                  {projectData.DueDate}
                </TableCell>
              )}
              <TableCell>{projectData.Action}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <TableRow key={project.id}>
                  {columns.id && <TableCell>{project.id}</TableCell>}
                  {columns.customer && (
                    <TableCell>{project.customer}</TableCell>
                  )}
                  {columns.refNo && <TableCell>{project.refNo}</TableCell>}
                  {columns.projectName && (
                    <TableCell>{project.projectName}</TableCell>
                  )}
                  {columns.projectNumber && (
                    <TableCell>{project.projectNumber}</TableCell>
                  )}
                  {columns.areaLocation && (
                    <TableCell>{project.areaLocation}</TableCell>
                  )}
                  {columns.address && <TableCell>{project.address}</TableCell>}
                  {columns.dueDate && (
                    <TableCell>
                      {new Date(project.dueDate).toLocaleDateString()}
                    </TableCell>
                  )}
                  <TableCell>
                    <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                      <Box
                        sx={{ display: "flex", cursor: "pointer" }}
                        onClick={() => handleUpdateProject(project)}
                      >
                        <BiSolidEditAlt size={20} />
                      </Box>
                      <Box
                        sx={{ display: "flex", cursor: "pointer" }}
                        onClick={() => handleDeleteProject(project.id)}
                      >
                        <AiFillDelete size={20} />
                      </Box>
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={Object.keys(columns).length + 1}
                  align="center"
                >
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};

export default ProjectTable;
