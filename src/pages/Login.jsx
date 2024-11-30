import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import {
  Alert,
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
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(12, "Password cannot exceed 12 characters"),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState();
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
      password: "",
    },
  });

  const onSubmit = useCallback(
    async (data) => {
      setIsPending(true);

      const users = JSON.parse(localStorage.getItem("users")) || [];
      const user = users.find((user) => user.email === data.email);

      if (!user) {
        setError("root", { type: "server", message: "Invalid credentials" });
        setIsPending(false);
        return;
      }

      const isPasswordValid = await bcrypt.compare(
        data.password,
        user.password
      );
      if (!isPasswordValid) {
        setError("root", { type: "server", message: "Invalid credentials" });
        setIsPending(false);
        return;
      }

      const { password, ...userWithoutPassword } = user;
      localStorage.setItem("loggedInUser", JSON.stringify(userWithoutPassword));
      setIsPending(false);

      reset();
      navigate("/");
    },
    [setError, reset, navigate]
  );

  return (
    <Stack spacing={4}>
      <Stack spacing={1}>
        <Typography variant="h4" fontSize={{ xs: "", md: "24px" }}>
          Login to Account
        </Typography>

        <Typography color="text.secondary" fontSize={{ xs: "", md: "14px" }}>
          Please enter your email and password to continue
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
                <OutlinedInput {...field} label="Email address" type="email" />
                {errors.email ? (
                  <FormHelperText>{errors.email.message}</FormHelperText>
                ) : null}
              </FormControl>
            )}
          />

          <Typography
            variant="body2"
            sx={{
              display: "flex",
              justifyContent: "end",
              a: {
                textDecoration: "none",
                color: "text.secondary",
              },
            }}
          >
            <Link to="/reset-password">Forgot password?</Link>
          </Typography>

          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <FormControl error={Boolean(errors.password)}>
                <InputLabel>Password</InputLabel>
                <OutlinedInput
                  {...field}
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
              label="Remember Password"
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
              <Button
                disabled={isPending}
                type="submit"
                variant="contained"
                sx={{ width: "100%", textTransform: "capitalize" }}
              >
                Sign in
              </Button>
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
            Don&apos;t have an account?{" "}
            <Link to={"/register"}>Create Account</Link>
          </Typography>
        </Stack>
      </form>
    </Stack>
  );
};

export default Login;
