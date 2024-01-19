import * as React from "react";
import { loginSchema } from "../helpers/validator";
import useAuth from "../hooks/useAuth";
import { Avatar, Box, Typography, Container, IconButton } from "@mui/material";
import { Button, TextField, InputAdornment, Grid } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import uploadToCloudinary from "../helpers/uploadToCloudinary";
import { Link } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useFormik } from "formik";
import google from "../assets/google.png";
import useAuthProvider from "../hooks/useAuthProvider";
import { useSelector } from "react-redux";
import { VisuallyHiddenInput } from "../helpers/styleConfig";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

export default function Login() {
  const [showPassword, setShowPassword] = React.useState(false);
  const { register } = useAuth();
  const { user } = useSelector((state) => state.auth);
  const { GoogleProvider } = useAuthProvider();
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
    setFieldValue,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      values?.image || delete values?.image;
      values.image = values?.image && (await uploadToCloudinary(values.image));
      register(values);
      setSubmitting(false);
      user?.username && resetForm();
    },
  });
  return (
    <Container component="main" maxWidth="xs" className="minheight2">
      <Box
        sx={{
          pt: 5,
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
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} mb={1}>
              <TextField
                size="small"
                autoFocus
                fullWidth
                id="firstname"
                label="First Name"
                name="firstname"
                value={values.firstname}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.firstname && Boolean(errors.firstname)}
                helperText={touched.firstname && errors.firstname}
              />
            </Grid>
            <Grid item xs={12} sm={6} mb={1}>
              <TextField
                size="small"
                fullWidth
                id="lastname"
                label="Last Name"
                name="lastname"
                value={values.lastname}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.lastname && Boolean(errors.lastname)}
                helperText={touched.lastname && errors.lastname}
              />
            </Grid>
            <Grid
              item
              width={"100%"}
              height={{ xs: 120, sm: 65 }}
              display="flex"
              flexDirection={{ xs: "column", sm: "row" }}
              gap={2.2}
            >
              <TextField
                size="small"
                fullWidth
                id="username"
                label="Username"
                name="username"
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.username && Boolean(errors.username)}
                helperText={touched.username && errors.username}
              />
              <Box>
                <Button
                  sx={{ width: 190, height: 40 }}
                  component="label"
                  variant="outlined"
                  startIcon={<CloudUploadIcon />}
                >
                  Upload image
                  <VisuallyHiddenInput
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={(e) =>
                      setFieldValue("image", e.currentTarget.files[0])
                    }
                  />
                </Button>
                {values.image && (
                  <Typography
                    noWrap
                    variant={"span"}
                    fontSize={10}
                    position="relative"
                    top={-5}
                  >
                    Selected image: ../{values.image.name?.slice(0, 20)}
                    {values.image.name?.length > 20 && "..."}
                  </Typography>
                )}
              </Box>
            </Grid>
            <Grid item xs={12} height={65}>
              <TextField
                size="small"
                sx={{ my: 0 }}
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={values.email}
                autoComplete="email"
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />
            </Grid>
            <Grid item xs={12} height={65}>
              <TextField
                size="small"
                sx={{ my: 0 }}
                type={showPassword ? "text" : "password"}
                fullWidth
                id="password"
                label="Password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} mb={3}>
              <TextField
                size="small"
                type={showPassword ? "text" : "password"}
                fullWidth
                id="confirmPassword"
                label="Confirm Password"
                name="confirmPassword"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  touched.confirmPassword && Boolean(errors.confirmPassword)
                }
                helperText={touched.confirmPassword && errors.confirmPassword}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>

          <Grid display={"flex"} gap={1}>
            <Button
              type="submit"
              disabled={isSubmitting}
              fullWidth
              variant="contained"
            >
              Sign Up
            </Button>
            <Button
              fullWidth
              variant="contained"
              onClick={() => GoogleProvider("register", "googleUsers")}
              sx={{ display: "flex" }}
            >
              <img
                style={{
                  width: 30,
                  borderRadius: 3,
                  position: "relative",
                  left: -12,
                }}
                src={google}
                alt="google logo"
              />
              Sign Up Google
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
                to="/"
                style={{
                  "&:hover": { cursor: "pointer" },
                  color: "#1976D2",
                  fontSize: 15,
                }}
              >
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
