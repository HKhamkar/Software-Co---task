import React, { useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid2";
import {
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
  Select,
  MenuItem,
  Stack,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { addProject, updateProject } from "../../redux/slices/projectSlice";
import { useTranslation } from "react-i18next";

const validationSchema = Yup.object().shape({
  customer: Yup.string().required("Customer is required"),
  refNo: Yup.string().required("Ref Number is required"),
  projectName: Yup.string().required("Project Name is required"),
  projectNumber: Yup.string().required("Project Number is required"),
  areaLocation: Yup.string().required("Area Location is required"),
  address: Yup.string().required("Address is required"),
  dueDate: Yup.string().required("Due Date is required"),
});

const AddEditForm = () => {
  const { t } = useTranslation();
  const projectData = t("addEditProject");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const project = location.state?.project;
  const pathSegments = location.pathname.split("/").filter(Boolean);
  const action = pathSegments[pathSegments.length - 1];

  const [isPending, setIsPending] = useState(false);

  const {
    control,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      customer: "",
      refNo: "",
      projectName: "",
      projectNumber: "",
      areaLocation: "",
      address: "",
      dueDate: "",
      contact: "",
      manager: "",
      staff: "",
      status: "",
      email: "",
    },
  });

  useEffect(() => {
    if (project) {
      reset(project);
    }
  }, [project, reset]);

  const onSubmit = useCallback(
    async (data) => {
      setIsPending(true);
      const id = Math.floor(Math.random() * 1000000).toString();

      const updatedData = {
        ...data,
        id: project && project?.id ? project?.id : id,
      };

      if (project) {
        dispatch(updateProject(updatedData));
      } else if (action === "add") {
        dispatch(addProject(updatedData));
      }

      setIsPending(false);
      reset();
      navigate("/projects");
    },
    [setError, reset, navigate, project]
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3} mb={4}>
          <Grid size={{ xs: 12, md: 6, lg: 4 }}>
            <Controller
              control={control}
              name="customer"
              render={({ field }) => (
                <FormControl
                  fullWidth
                  error={Boolean(errors.customer)}
                  sx={{ width: "100%" }}
                >
                  <InputLabel>{projectData.customer}</InputLabel>
                  <Select {...field} label={projectData.customer}>
                    <MenuItem value={"Olivia Martin"}>Olivia Martin</MenuItem>
                    <MenuItem value={"Michael Jones"}>Michael Jones</MenuItem>
                    <MenuItem value={"John Doe"}>John Doe</MenuItem>
                  </Select>
                  {errors.customer ? (
                    <FormHelperText>{errors.customer.message}</FormHelperText>
                  ) : null}
                </FormControl>
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6, lg: 4 }}>
            <Controller
              control={control}
              name="refNo"
              render={({ field }) => (
                <FormControl
                  error={Boolean(errors.refNo)}
                  sx={{ width: "100%" }}
                >
                  <InputLabel>{projectData.referenceNumber}</InputLabel>
                  <OutlinedInput
                    {...field}
                    label={projectData.referenceNumber}
                    placeholder={projectData.enterYourReferenceNumber}
                  />
                  {errors.refNo ? (
                    <FormHelperText>{errors.refNo.message}</FormHelperText>
                  ) : null}
                </FormControl>
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6, lg: 4 }}>
            <Controller
              control={control}
              name="projectName"
              render={({ field }) => (
                <FormControl
                  error={Boolean(errors.projectName)}
                  sx={{ width: "100%" }}
                >
                  <InputLabel>{projectData.projectName}</InputLabel>
                  <OutlinedInput
                    {...field}
                    label={projectData.projectName}
                    placeholder={projectData.enterYourProjectName}
                  />
                  {errors.projectName ? (
                    <FormHelperText>
                      {errors.projectName.message}
                    </FormHelperText>
                  ) : null}
                </FormControl>
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6, lg: 4 }}>
            <Controller
              control={control}
              name="projectNumber"
              render={({ field }) => (
                <FormControl
                  error={Boolean(errors.projectNumber)}
                  sx={{ width: "100%" }}
                >
                  <InputLabel>{projectData.projectNumber}</InputLabel>
                  <OutlinedInput
                    {...field}
                    label={projectData.projectNumber}
                    placeholder={projectData.enterYourProjectNumber}
                  />
                  {errors.projectNumber ? (
                    <FormHelperText>
                      {errors.projectNumber.message}
                    </FormHelperText>
                  ) : null}
                </FormControl>
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6, lg: 4 }}>
            <Controller
              control={control}
              name="areaLocation"
              render={({ field }) => (
                <FormControl
                  error={Boolean(errors.areaLocation)}
                  sx={{ width: "100%" }}
                >
                  <InputLabel>{projectData.areaLocation}</InputLabel>
                  <OutlinedInput
                    {...field}
                    label={projectData.areaLocation}
                    placeholder={projectData.enterYourProjectAreaLocation}
                  />
                  {errors.areaLocation ? (
                    <FormHelperText>
                      {errors.areaLocation.message}
                    </FormHelperText>
                  ) : null}
                </FormControl>
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6, lg: 4 }}>
            <Controller
              control={control}
              name="address"
              render={({ field }) => (
                <FormControl
                  error={Boolean(errors.address)}
                  sx={{ width: "100%" }}
                >
                  <InputLabel>{projectData.Address}</InputLabel>
                  <OutlinedInput
                    {...field}
                    label={projectData.Address}
                    placeholder={projectData.enterYourProjectAddress}
                  />
                  {errors.address ? (
                    <FormHelperText>{errors.address.message}</FormHelperText>
                  ) : null}
                </FormControl>
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6, lg: 4 }}>
            <Controller
              control={control}
              name="dueDate"
              render={({ field }) => (
                <FormControl
                  error={Boolean(errors.dueDate)}
                  sx={{ width: "100%" }}
                >
                  <DatePicker
                    {...field}
                    label={projectData.dueDate}
                    renderInput={(params) => (
                      <OutlinedInput
                        {...params}
                        sx={{ width: "100%" }}
                        error={Boolean(errors.dueDate)}
                        placeholder={projectData.selectDueDate}
                      />
                    )}
                    value={field.value ? dayjs(field.value) : null}
                    onChange={(value) => field.onChange(value)}
                  />
                  {errors.dueDate ? (
                    <FormHelperText>{errors.dueDate.message}</FormHelperText>
                  ) : null}
                </FormControl>
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6, lg: 4 }}>
            <Controller
              control={control}
              name="contact"
              render={({ field }) => (
                <FormControl
                  error={Boolean(errors.contact)}
                  sx={{ width: "100%" }}
                >
                  <InputLabel>{projectData.contact}</InputLabel>
                  <OutlinedInput
                    {...field}
                    label={projectData.contact}
                    placeholder={projectData.enterYourContact}
                    type="number"
                  />
                  {errors.contact ? (
                    <FormHelperText>{errors.contact.message}</FormHelperText>
                  ) : null}
                </FormControl>
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6, lg: 4 }}>
            <Controller
              control={control}
              name="manager"
              render={({ field }) => (
                <FormControl
                  error={Boolean(errors.manager)}
                  sx={{ width: "100%" }}
                >
                  <InputLabel>{projectData.manager}</InputLabel>
                  <OutlinedInput
                    {...field}
                    label={projectData.manager}
                    placeholder={projectData.selectProjectManager}
                  />
                  {errors.manager ? (
                    <FormHelperText>{errors.manager.message}</FormHelperText>
                  ) : null}
                </FormControl>
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6, lg: 4 }}>
            <Controller
              control={control}
              name="staff"
              render={({ field }) => (
                <FormControl
                  error={Boolean(errors.staff)}
                  sx={{ width: "100%" }}
                >
                  <InputLabel>{projectData.staff}</InputLabel>
                  <OutlinedInput
                    {...field}
                    label={projectData.staff}
                    placeholder={projectData.selectProjectStaff}
                  />
                  {errors.staff ? (
                    <FormHelperText>{errors.staff.message}</FormHelperText>
                  ) : null}
                </FormControl>
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6, lg: 4 }}>
            <Controller
              control={control}
              name="status"
              render={({ field }) => (
                <FormControl
                  error={Boolean(errors.status)}
                  sx={{ width: "100%" }}
                >
                  <InputLabel>{projectData.status}</InputLabel>
                  <OutlinedInput
                    {...field}
                    label={projectData.status}
                    placeholder={projectData.selectProjectStatus}
                  />
                  {errors.status ? (
                    <FormHelperText>{errors.status.message}</FormHelperText>
                  ) : null}
                </FormControl>
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6, lg: 4 }}>
            <Controller
              control={control}
              name="email"
              render={({ field }) => (
                <FormControl
                  error={Boolean(errors.email)}
                  sx={{ width: "100%" }}
                >
                  <InputLabel>{projectData.email}</InputLabel>
                  <OutlinedInput
                    {...field}
                    label={projectData.email}
                    type="email"
                    placeholder={projectData.enterYourEmail}
                  />
                  {errors.email ? (
                    <FormHelperText>{errors.email.message}</FormHelperText>
                  ) : null}
                </FormControl>
              )}
            />
          </Grid>
        </Grid>

        <Stack direction="row" spacing={2}>
          <Button
            disabled={isPending}
            type="submit"
            variant="contained"
            sx={{
              px: 10,
              py: 1,
              borderRadius: "12px",
              textTransform: "capitalize",
            }}
          >
            {action === "add" ? projectData.addNow : projectData.editNow}
          </Button>

          <Link to="/projects">
            <Button
              disabled={isPending}
              type="button"
              variant="outlined"
              sx={{
                px: 10,
                py: 1,
                borderRadius: "12px",
                textTransform: "capitalize",
              }}
            >
              {projectData.cancel}
            </Button>
          </Link>
        </Stack>
      </form>
    </LocalizationProvider>
  );
};

export default AddEditForm;
