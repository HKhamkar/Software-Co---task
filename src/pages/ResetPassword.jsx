import React, { useCallback, useState } from "react";
import {
  Alert,
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  email: Yup.string().required("Email is required").email("Email is invalid"),
});

const ResetPassword = () => {
  const [isPending, setIsPending] = useState(false);

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: { email: "" },
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = useCallback(async (values) => {}, [setError]);

  return (
    <Stack spacing={4}>
      <Stack spacing={1}>
        <Typography variant="h4" fontSize={{ xs: "", md: "24px" }}>
          Reset password
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

          <Box
            sx={{
              display: "flex",
              width: "100%",
              marginTop: "36px !important",
            }}
            mt={6}
          >
            {errors.root ? (
              <Alert color="error">{errors.root.message}</Alert>
            ) : null}
            <Button
              disabled={isPending}
              type="submit"
              variant="contained"
              sx={{ width: "100%", mx: 8, textTransform: "capitalize" }}
            >
              Send recovery link
            </Button>
          </Box>
        </Stack>
      </form>
    </Stack>
  );
};

export default ResetPassword;
