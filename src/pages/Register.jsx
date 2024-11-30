import React, { useCallback, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  IconButton,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Grid from "@mui/material/Grid2";
import bcrypt from "bcryptjs";

const validationSchema = Yup.object().shape({
  email: Yup.string().required("Email is required").email("Email is invalid"),
  userName: Yup.string().required("Username is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(12, "Password cannot exceed 12 characters"),
});

const Register = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
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
      email: "",
      userName: "",
      password: "",
    },
  });

  const onSubmit = useCallback(
    async (data) => {
      setIsPending(true);

      const users = JSON.parse(localStorage.getItem("users")) || [];

      if (users.find((user) => user.email === data.email)) {
        setError("root", { type: "server", message: "User already exists" });
        setIsPending(false);
        return;
      }

      const hashedPassword = await bcrypt.hash(data.password, 10);

      const newUser = { ...data, password: hashedPassword };
      users.push(newUser);

      localStorage.setItem("users", JSON.stringify(users));
      setIsPending(false);

      reset();
      navigate("/login");
    },
    [setError, reset, navigate]
  );

  return (
    <Stack spacing={4}>
      <Stack spacing={1}>
        <Typography variant="h4" fontSize={{ xs: "", md: "24px" }}>
          Create an Account
        </Typography>

        <Typography color="text.secondary" fontSize={{ xs: "", md: "14px" }}>
          Create an account to continue
        </Typography>
      </Stack>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <FormControl error={Boolean(errors.email)}>
                <InputLabel>Email address</InputLabel>
                <OutlinedInput
                  {...field}
                  value={field.value || ""}
                  label="Email address"
                  type="email"
                  sx={{ mb: 1 }}
                />
                {errors.email ? (
                  <FormHelperText>{errors.email.message}</FormHelperText>
                ) : null}
              </FormControl>
            )}
          />

          <Controller
            control={control}
            name="userName"
            render={({ field }) => (
              <FormControl error={Boolean(errors.userName)}>
                <InputLabel>Username</InputLabel>
                <OutlinedInput
                  {...field}
                  value={field.value || ""}
                  label="Username"
                  sx={{ mb: 1 }}
                />
                {errors.userName ? (
                  <FormHelperText>{errors.userName.message}</FormHelperText>
                ) : null}
              </FormControl>
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <FormControl error={Boolean(errors.password)}>
                <InputLabel>Password</InputLabel>
                <OutlinedInput
                  {...field}
                  value={field.value || ""}
                  endAdornment={
                    showPassword ? (
                      <IconButton
                        onClick={() => {
                          setShowPassword(false);
                        }}
                      >
                        <FiEye size={16} />
                      </IconButton>
                    ) : (
                      <IconButton
                        onClick={() => {
                          setShowPassword(true);
                        }}
                      >
                        <FiEyeOff size={16} />
                      </IconButton>
                    )
                  }
                  label="Password"
                  type={showPassword ? "text" : "password"}
                />
                {errors.password ? (
                  <FormHelperText>{errors.password.message}</FormHelperText>
                ) : null}
              </FormControl>
            )}
          />

          <FormGroup>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="I accept terms and conditions"
              sx={{
                marginBottom: "16px !important",
                span: {
                  fontSize: "0.875rem",
                  color: "text.secondary",
                },
              }}
            />
          </FormGroup>

          {errors.root ? (
            <Alert color="error">{errors.root.message}</Alert>
          ) : null}

          <Grid container spacing={3} sx={{ justifyContent: "center" }}>
            <Grid size={9}>
              <Box
                sx={{
                  display: "flex",
                  flexFlow: "column",
                  width: "100%",
                }}
              >
                <Button
                  disabled={isPending}
                  type="submit"
                  variant="contained"
                  sx={{ width: "100%", textTransform: "capitalize" }}
                >
                  Sign Up
                </Button>
              </Box>
            </Grid>
          </Grid>

          <Typography
            color="text.secondary"
            variant="body2"
            sx={{
              a: {
                color: "#1565c0",
              },
            }}
          >
            Already have an account? <Link to={"/login"}>Login</Link>
          </Typography>
        </Stack>
      </form>
    </Stack>
  );
};

export default Register;
