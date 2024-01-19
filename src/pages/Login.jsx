import * as React from "react";
import { loginSchema } from "../helpers/validator";
import useAuth from "../hooks/useAuth";
import { Checkbox, FormControlLabel } from "@mui/material";
import { Avatar, Box, Typography, Container, IconButton } from "@mui/material";
import { Button, TextField, FormControl, FormHelperText } from "@mui/material";
import { OutlinedInput, InputLabel, InputAdornment, Grid } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useFormik } from "formik";
import google from "../assets/google.png";
import useAuthProvider from "../hooks/useAuthProvider";
import { useSelector } from "react-redux";

export default function Login() {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClick = () => setShowPassword((show) => !show);
  const { login } = useAuth();
  const { user } = useSelector((state) => state.auth);

  const { GoogleProvider } = useAuthProvider();

  const {
    handleChange,
    handleSubmit,
    values,
    errors,
    handleBlur,
    touched,
    isSubmitting,
    setSubmitting,
    resetForm,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      login(values);
      user?.username && resetForm();
      setSubmitting(false);
    },
  });
  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          pt: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box position="relative" width="100%">
          <img
            height="120"
            width="100%"
            src="/stockimage.png"
            alt="stockImage"
          />
          <Typography
            variant="caption"
            sx={{ position: "absolute", bottom: 5, right: 2, color: "#ffffff" }}
          >
            Stock Management App
          </Typography>
        </Box>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            fullWidth
            id="email"
            label="Email Address"
            autoComplete="email"
            onChange={handleChange}
            value={values.email}
            onBlur={handleBlur}
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email ? errors.email : ""}
          />
          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel htmlFor="password">Password</InputLabel>
            <OutlinedInput
              variant="TextField"
              value={values.password}
              onChange={handleChange}
              id="password"
              name="password"
              label="password"
              type={showPassword ? "text" : "password"}
              onBlur={handleBlur}
              error={touched.password && Boolean(errors.password)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClick}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <FormHelperText sx={{ color: "#D32F2F" }}>
              {touched.password ? errors.password : ""}
            </FormHelperText>
          </FormControl>

          <FormControlLabel
            sx={{ display: "flex", alignItems: "center" }}
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Grid display={"flex"} gap={1}>
            <Button
              type="submit"
              disabled={isSubmitting}
              fullWidth
              variant="contained"
            >
              Sign in
            </Button>
            <Button
              fullWidth
              variant="contained"
              onClick={() => GoogleProvider("login", "googleUser")}
              sx={{ display: "flex", gap: 1 }}
            >
              <img
                style={{
                  width: 30,
                  borderRadius: 3,
                  position: "relative",
                  left: -10,
                }}
                src={google}
                alt="google logo"
              />
              Sign In Google
            </Button>
          </Grid>
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            mt={1}
          >
            <Grid item>
              <Link
                to="/register"
                style={{
                  "&:hover": { cursor: "pointer" },
                  color: "#1976D2",
                  fontSize: 15,
                }}
              >
                Don't have an account? Sign Up
              </Link>
            </Grid>
            <Grid item>
              <Button
                type="submit"
                variant="text"
                onClick={() => {
                  values.email = "guest@mail.com";
                  values.password = "Guest.12";
                }}
              >
                Guest access
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
