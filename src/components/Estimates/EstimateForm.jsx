import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Button,
  Paper,
  Box,
  InputAdornment,
  OutlinedInput,
  Tooltip,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { FaCircleMinus, FaCirclePlus } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";
import { addEstimate, updateEstimate } from "../../redux/slices/estimateSlice";
import { useDispatch } from "react-redux";

const EstimateForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const estimate = location.state?.estimate;
  const pathSegments = location.pathname.split("/").filter(Boolean);
  const action = pathSegments[pathSegments.length - 1];

  const initialSection = [
    {
      id: Date.now(),
      title: "",
      items: [
        {
          id: Date.now(),
          title: "",
          description: "",
          unit: "",
          quantity: 0,
          price: 0,
          margin: 0,
          total: 0,
        },
      ],
    },
  ];
  const [sections, setSections] = useState(initialSection);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (estimate?.sections) {
      const mappedSections = estimate.sections.map((section) => ({
        id: section.id,
        title: section.title,
        items: section.items.map((item) => ({
          id: item.id,
          title: item.title,
          description: item.description,
          unit: item.unit,
          quantity: item.quantity,
          price: item.price,
          margin: item.margin,
          total: parseFloat(item.total),
        })),
      }));
      setSections(mappedSections);
    }
  }, [estimate]);

  const calculateItemTotal = (quantity, price, margin) => {
    const base = quantity * price;
    const marginAmount = (margin / 100) * base;
    return base + marginAmount;
  };

  const handleSectionTitleChange = (sectionId, value) => {
    setSections((prevSections) =>
      prevSections.map((section) =>
        section.id === sectionId ? { ...section, title: value } : section
      )
    );
    setErrors((prevErrors) => ({ ...prevErrors, [sectionId]: !value.trim() }));
  };

  const handleItemChange = (sectionId, itemId, field, value) => {
    setSections((prevSections) =>
      prevSections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              items: section.items.map((item) =>
                item.id === itemId
                  ? {
                      ...item,
                      [field]: value,
                      total:
                        field === "quantity" ||
                        field === "price" ||
                        field === "margin"
                          ? calculateItemTotal(
                              field === "quantity" ? +value : +item.quantity,
                              field === "price" ? +value : +item.price,
                              field === "margin" ? +value : +item.margin
                            )
                          : item.total,
                    }
                  : item
              ),
            }
          : section
      )
    );
  };

  const handleAddItem = (sectionId) => {
    const newItem = {
      id: Date.now(),
      title: "",
      description: "",
      unit: "",
      quantity: 0,
      price: 0,
      margin: 0,
      total: 0,
    };

    setSections((prevSections) =>
      prevSections.map((section) =>
        section.id === sectionId
          ? { ...section, items: [...section.items, newItem] }
          : section
      )
    );
  };

  const handleRemoveItem = (sectionId, itemId) => {
    setSections((prevSections) =>
      prevSections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              items:
                section.items.length > 1
                  ? section.items.filter((item) => item.id !== itemId)
                  : section.items,
            }
          : section
      )
    );
  };

  const handleAddSection = () => {
    const newSection = {
      id: Date.now(),
      title: "",
      items: [
        {
          id: Date.now(),
          title: "",
          description: "",
          unit: "",
          quantity: 0,
          price: 0,
          margin: 0,
          total: 0,
        },
      ],
    };
    setSections([...sections, newSection]);
  };

  const handleRemoveSection = (sectionId) => {
    if (sections.length > 1) {
      setSections(sections.filter((section) => section.id !== sectionId));
      setErrors((prevErrors) => {
        const updatedErrors = { ...prevErrors };
        delete updatedErrors[sectionId];
        return updatedErrors;
      });
    }
  };

  const calculateSectionTotal = (items) =>
    items.reduce((acc, item) => acc + item.total, 0);

  const calculateTotalMargin = () =>
    sections.reduce(
      (acc, section) =>
        acc +
        section.items.reduce(
          (itemAcc, item) =>
            itemAcc + (item.margin / 100) * (item.quantity * item.price),
          0
        ),
      0
    );

  const calculateGrandTotal = () =>
    sections.reduce(
      (acc, section) => acc + calculateSectionTotal(section.items),
      0
    );

  const calculateFinalTotal = () =>
    calculateGrandTotal() + calculateTotalMargin();

  const handleCancel = () => {
    setSections(initialSection);
    setErrors({});
    navigate("/estimates");
  };

  const handleSubmit = () => {
    const validationErrors = {};
    sections.forEach((section) => {
      if (!section.title.trim()) {
        validationErrors[section.id] = true;
      }
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const formattedSections = sections.map((section) => {
      const sectionTotal = calculateSectionTotal(section.items);
      return {
        id: section.id.toString(),
        title: section.title,
        total: sectionTotal.toFixed(2),
        items: section.items.map((item) => ({
          id: item.id,
          title: item.title,
          description: item.description,
          unit: item.unit,
          quantity: item.quantity,
          price: item.price,
          margin: item.margin,
          total: item.total.toFixed(2),
        })),
      };
    });

    const totalMargin = calculateTotalMargin().toFixed(2);
    const grandTotal = calculateGrandTotal().toFixed(2);
    const finalTotal = calculateFinalTotal().toFixed(2);
    const id = Math.floor(Math.random() * 1000000).toString();

    const submittedData = {
      sections: formattedSections,
      totalMargin,
      grandTotal,
      finalTotal,
      id: estimate && estimate.id ? estimate.id : id,
      estimateName: `Estimate ${estimate && estimate.id ? estimate.id : id}`,
      createdAt:
        estimate && estimate.createdAt ? estimate.createdAt : new Date(),
      lastModified: estimate ? new Date() : "",
    };

    if (estimate) {
      dispatch(updateEstimate(submittedData));
    } else if (action === "add") {
      dispatch(addEstimate(submittedData));
    }

    navigate("/estimates");
  };

  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ textAlign: "center" }}>Title</TableCell>
            <TableCell sx={{ textAlign: "center" }}>Description</TableCell>
            <TableCell sx={{ textAlign: "center" }}>Unit</TableCell>
            <TableCell sx={{ textAlign: "center" }}>Quantity</TableCell>
            <TableCell sx={{ textAlign: "center" }}>Price</TableCell>
            <TableCell sx={{ textAlign: "center" }}>Margin (%)</TableCell>
            <TableCell sx={{ textAlign: "center" }}>Total</TableCell>
            <TableCell sx={{ textAlign: "center" }}>Actions</TableCell>
          </TableRow>
        </TableHead>
      </Table>

      <Box
        sx={{ padding: "12px 26px", display: "inline-block", width: "100%" }}
      >
        {sections.map((section) => (
          <Box sx={{ display: "flex", flexFlow: "column" }} key={section.id}>
            <Box
              sx={{
                display: "inline-block",
                width: "100%",
                border: "1px solid #949494",
                position: "relative",
                my: 6,
              }}
            >
              <Tooltip title="Add" placement="top">
                <Box
                  sx={{
                    display: "inline-block",
                    position: "absolute",
                    left: "-16px",
                    top: "-9px",
                    bottom: 0,
                    cursor: "pointer",
                  }}
                  onClick={handleAddSection}
                >
                  <FaCirclePlus />
                </Box>
              </Tooltip>

              <Box
                sx={{
                  display: "inline-block",
                  position: "absolute",
                  left: "30px",
                  top: "-30px",
                  bottom: 0,
                }}
              >
                <TextField
                  label="Sample Section"
                  value={section.title}
                  onChange={(e) =>
                    handleSectionTitleChange(section.id, e.target.value)
                  }
                  error={!!errors[section.id]}
                  helperText={
                    errors[section.id] ? "Section name is required" : ""
                  }
                  sx={{ marginBottom: 2, background: "white" }}
                />
              </Box>

              <Box
                sx={{
                  display: "inline-block",
                  position: "absolute",
                  right: sections.length > 1 ? "30px" : "-1px",
                  top: "-30px",
                  bottom: 0,
                }}
              >
                <OutlinedInput
                  value={calculateSectionTotal(section.items).toFixed(2)}
                  InputProps={{
                    readOnly: true,
                  }}
                  endAdornment={
                    <InputAdornment position="end">$</InputAdornment>
                  }
                  sx={{ background: "white", width: "140px" }}
                />
              </Box>

              {sections.length > 1 && (
                <Tooltip title="Remove" placement="top">
                  <Box
                    sx={{
                      display: "inline-block",
                      position: "absolute",
                      right: "-16px",
                      top: "-9px",
                      bottom: 0,
                      cursor: "pointer",
                    }}
                    onClick={() => handleRemoveSection(section.id)}
                  >
                    <FaCircleMinus />
                  </Box>
                </Tooltip>
              )}
            </Box>

            <Table>
              <TableBody>
                {section.items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <TextField
                        value={item.title}
                        onChange={(e) =>
                          handleItemChange(
                            section.id,
                            item.id,
                            "title",
                            e.target.value
                          )
                        }
                        fullWidth
                        label="Item Name"
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        value={item.description}
                        onChange={(e) =>
                          handleItemChange(
                            section.id,
                            item.id,
                            "description",
                            e.target.value
                          )
                        }
                        fullWidth
                        label="Item Description"
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        value={item.unit}
                        onChange={(e) =>
                          handleItemChange(
                            section.id,
                            item.id,
                            "unit",
                            e.target.value
                          )
                        }
                        fullWidth
                        type="number"
                        label="Unit"
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          handleItemChange(
                            section.id,
                            item.id,
                            "quantity",
                            +e.target.value
                          )
                        }
                        fullWidth
                        label="Quntity"
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        type="number"
                        value={item.price}
                        onChange={(e) =>
                          handleItemChange(
                            section.id,
                            item.id,
                            "price",
                            +e.target.value
                          )
                        }
                        fullWidth
                        label="Price"
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        type="number"
                        value={item.margin}
                        onChange={(e) =>
                          handleItemChange(
                            section.id,
                            item.id,
                            "margin",
                            +e.target.value
                          )
                        }
                        fullWidth
                        label="Margin"
                      />
                    </TableCell>

                    <TableCell>
                      <TextField
                        type="number"
                        value={item.total.toFixed(2)}
                        InputProps={{
                          readOnly: true,
                        }}
                        fullWidth
                        label="Total"
                      />
                    </TableCell>

                    <TableCell>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Tooltip title="Add" placement="top">
                          <Box
                            sx={{ display: "inline-block", cursor: "pointer" }}
                            onClick={() => handleAddItem(section.id)}
                          >
                            <FaCirclePlus size={16} />
                          </Box>
                        </Tooltip>

                        <Tooltip title="Remove" placement="top">
                          <Box
                            sx={{ display: "inline-block", cursor: "pointer" }}
                            onClick={() =>
                              handleRemoveItem(section.id, item.id)
                            }
                          >
                            <FaCircleMinus size={16} />
                          </Box>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        ))}

        <Grid container spacing={3} sx={{ justifyContent: "end", my: 6 }}>
          <Grid size={5}>
            <Grid container spacing={3}>
              <Grid size={4} />
              <Grid size={8}>
                <Grid
                  container
                  spacing={3}
                  py={2}
                  sx={{ borderTop: "1px solid #979797" }}
                >
                  <Grid size={6}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: "16px",
                        color: "rgba(32,34,36,0.70)",
                        fontWeight: "600",
                      }}
                    >
                      Sub Total
                    </Typography>
                  </Grid>
                  <Grid size={6}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: "16px",
                        color: "rgba(32,34,36,0.70)",
                        fontWeight: 600,
                        textAlign: "end",
                      }}
                    >
                      {`$ ${calculateGrandTotal().toFixed(2)}`}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid
                  container
                  spacing={3}
                  py={2}
                  sx={{
                    borderTop: "1px solid #979797",
                    borderBottom: "1px solid #979797",
                  }}
                >
                  <Grid size={6}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: "16px",
                        color: "rgba(32,34,36,0.70)",
                        fontWeight: 600,
                      }}
                    >
                      Total Margin
                    </Typography>
                  </Grid>
                  <Grid size={6}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: "16px",
                        color: "rgba(32,34,36,0.70)",
                        textAlign: "end",
                        fontWeight: "600",
                      }}
                    >
                      {`$ ${calculateTotalMargin().toFixed(2)}`}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container spacing={3} pt={2}>
                  <Grid size={6}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: "16px",
                        fontWeight: 600,
                      }}
                    >
                      Total Amount
                    </Typography>
                  </Grid>
                  <Grid size={6}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: "16px",
                        textAlign: "end",
                        fontWeight: "600",
                      }}
                    >
                      {`$ ${calculateFinalTotal().toFixed(2)}`}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Box sx={{ display: "flex", justifyContent: "end", gap: 2, mb: 1 }}>
          <Button
            onClick={handleCancel}
            variant="outlined"
            color="primary"
            sx={{ px: 10, py: 1, borderRadius: "12px" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            sx={{ px: 10, py: 1, borderRadius: "12px" }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default EstimateForm;
