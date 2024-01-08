import RegesterForm from "../components/forms/RegesterForm";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import useAuth from "../hooks/useAuth";
import { Avatar, Link, Grid, Box, Typography, Container } from "@mui/material";
import { registerSchema } from "../helpers/validator";
import uploadToCloudinary from "../helpers/uploadToCloudinary";
import { useSelector } from "react-redux";
import { Formik } from "formik";

export default function Register() {
  const { user } = useSelector((state) => state.auth);
  const { register } = useAuth();
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
      </Box>
      <Formik
        initialValues={{
          firstname: "",
          lastname: "",
          username: "",
          image: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={registerSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          values?.image || delete values?.image;
          values.image =
            values?.image && (await uploadToCloudinary(values.image));
          register(values);
          setSubmitting(false);
          user?.username && resetForm();
        }}
        component={(props) => <RegesterForm {...props} />}
      ></Formik>
      <Grid container justifyContent="flex-end">
        <Grid item>
          <Link href="/" variant="body2">
            Already have an account? Sign in
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
}
