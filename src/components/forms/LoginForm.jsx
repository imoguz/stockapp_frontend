import FormControlLabel from "@mui/material/FormControlLabel";
import { Checkbox, TextField, Button, Grid } from "@mui/material";
import { Form } from "formik";
import google from "../../assets/google.png";
import useAuthProvider from "../../hooks/useAuthProvider";
import { useState } from "react";
import { InputAdornment, IconButton } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const LoginForm = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
}) => {
  const { GoogleProvider } = useAuthProvider();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Form onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        fullWidth
        autoFocus
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
      <TextField
        fullWidth
        variant="outlined"
        label="Password"
        type={showPassword ? "text" : "password"}
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
          Sign In
        </Button>
        <Button
          fullWidth
          variant="contained"
          onClick={() => GoogleProvider("login", "googleUser")}
        >
          <img
            style={{ width: 40, borderRadius: 20 }}
            src={google}
            alt="google logo"
          />
          Sign In with Google
        </Button>
      </Grid>
    </Form>
  );
};

export default LoginForm;
