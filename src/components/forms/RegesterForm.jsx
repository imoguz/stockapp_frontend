import { Form } from "formik";
import { Grid, TextField, Button, Typography } from "@mui/material/";
import { VisuallyHiddenInput } from "../../helpers/styleConfig";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import google from "../../assets/google.png";
import useAuthProvider from "../../hooks/useAuthProvider";
import { useState } from "react";
import { OutlinedInput, InputLabel, InputAdornment } from "@mui/material";
import { IconButton, FormControl } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const RegesterForm = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
  setFieldValue,
}) => {
  const { GoogleProvider } = useAuthProvider();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Form
      onSubmit={handleSubmit}
      style={{ marginTop: "20px" }}
      encType="multipart/form-data"
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
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
        <Grid item xs={12} sm={6}>
          <TextField
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
        <Grid item xs={12} sm={6}>
          <TextField
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
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
          >
            Upload image
            <VisuallyHiddenInput
              type="file"
              name="image"
              accept="image/*"
              onChange={(e) => setFieldValue("image", e.currentTarget.files[0])}
            />
          </Button>
          {values.image && (
            <Typography noWrap variant={"span"} fontSize={10}>
              Selected image: ../{values.image.name?.slice(0, 20)}
              {values.image.name?.length > 20 && "..."}
            </Typography>
          )}
        </Grid>
        <Grid item xs={12}>
          <TextField
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
        <Grid item xs={12}>
          <TextField
            type={showPassword ? "text" : "password"}
            fullWidth
            margin="normal"
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
        <Grid item xs={12}>
          <TextField
            type={showPassword ? "text" : "password"}
            fullWidth
            margin="normal"
            id="confirmPassword"
            label="Confirm Password"
            name="confirmPassword"
            value={values.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.confirmPassword && Boolean(errors.confirmPassword)}
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
      <Grid display={"flex"} gap={1} mt={2}>
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
        >
          <img
            style={{ width: 40, borderRadius: 20 }}
            src={google}
            alt="google logo"
          />
          Sign Up with Google
        </Button>
      </Grid>
    </Form>
  );
};

export default RegesterForm;
