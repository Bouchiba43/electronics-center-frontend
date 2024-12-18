"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { LoadingButton } from "@mui/lab";
import { Container, CssBaseline, Box, Avatar, Typography, TextField, FormControlLabel, Checkbox, Grid } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useAppDispatch } from "@/hooks/hooks";
import { store } from "@/lib/store";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { signInUser } from "@/components/auth/accountSlice";
import Link from "next/link";

export default function SignInPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const { register, handleSubmit, formState: { isSubmitting, errors, isValid } } = useForm({
    mode: "onTouched",
  });

  async function submitForm(data: FieldValues) {
    try {
      // Dispatch the sign-in action
      await dispatch(signInUser(data));
      const { user } = store.getState().account;
      if (user) {
        const from = searchParams.get("from") || "/store";
        router.push(from);
        // router.push(router.query.from || "/store");
      } else {
        toast.error("Sign in Failed. Please try again");
      }
    } catch (error) {
      console.error("Error signing in:", error);
      toast.error("Sign in Failed. Please try again");
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit(submitForm)} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            autoFocus
            {...register("username", { required: "Username is required" })}
            error={!!errors.username}
            helperText={errors?.username?.message as string}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            id="password"
            {...register("password", { required: "Password is required" })}
            error={!!errors.password}
            helperText={errors?.password?.message as string}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <LoadingButton
            loading={isSubmitting}
            disabled={!isValid}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </LoadingButton>
          <Grid container>
            <Grid item xs>
              <Typography variant="body2">
                <Link href="/auth/forgot-password">
                  Forgot password?
                </Link>
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2">
                <Link href="/auth/signup">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
