import { Card, CardActions, CardContent, CardMedia } from "@mui/material";
import { Box, Grid, Button, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import noimage from "../assets/noimage.jpg";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export default function Account() {
  const { user } = useSelector((store) => store.auth);
  const avatar = user?.image
    ? user?.uid
      ? user?.image
      : `http://res.cloudinary.com/yami0510/stockapp/image/${user?.image}`
    : noimage;
  const position = user?.isAdmin ? "Admin" : user?.isStaff ? "Staff" : "User";
  const style = {
    width: { xs: 250, md: 350 },
    border: "1px solid grey",
    borderRadius: 1,
    p: "3px 7px 2px 7px",
    backgroundColor: "#f4f4f4",
    color: "#585858",
    fontSize: { xs: 12, md: 14 },
  };
  const boxStyle = {
    display: "flex",
    mt: 2,
    gap: { xs: 1, md: 5 },
    alignItems: "flex-end",
  };
  return (
    <Grid sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
      <Card sx={{ maxWidth: { xs: 270, md: 600 }, p: 1 }}>
        <Box sx={{ display: "flex", gap: { xs: 2, md: 5 } }}>
          <CardMedia
            component={"img"}
            sx={{
              height: { xs: 100, md: 150 },
              width: 150,
              objectFit: "contain",
            }}
            image={avatar}
            title={user?.firstname}
          />
          <Box>
            <Typography mt={{ xs: 2, md: 5 }} variant={"h5"}>
              {user?.firstname + " " + user?.lastname}
            </Typography>
            <Typography mt={1} variant="p">
              {position}
            </Typography>
          </Box>
        </Box>
        <CardContent>
          <Typography gutterBottom variant="h5" mb={3}>
            Account
          </Typography>

          <Box sx={boxStyle}>
            <Typography
              mr={{ xs: 3.5, md: 0 }}
              variant="body2"
              color="text.secondary"
              fontSize={{ xs: 12, md: 14 }}
            >
              First Name
            </Typography>
            <Typography sx={style} variant="outlined">
              {user?.firstname}
            </Typography>
          </Box>
          <Box sx={boxStyle}>
            <Typography
              mr={{ xs: 3.5, md: 0 }}
              variant="body2"
              color="text.secondary"
              fontSize={{ xs: 12, md: 14 }}
            >
              Last Name
            </Typography>
            <Typography sx={style} variant="outlined">
              {user?.lastname}
            </Typography>
          </Box>
          <Box sx={boxStyle}>
            <Typography
              mr={4}
              variant="body2"
              color="text.secondary"
              fontSize={{ xs: 12, md: 14 }}
            >
              Email
            </Typography>
            <Typography noWrap sx={style} variant="outlined">
              {user?.email}
            </Typography>
          </Box>
          <Box sx={boxStyle}>
            <Typography
              mr={{ xs: 1, md: 0.5 }}
              variant="body2"
              color="text.secondary"
              fontSize={{ xs: 12, md: 14 }}
            >
              Password
            </Typography>
            <Typography sx={style} variant="outlined">
              ************
            </Typography>
          </Box>
        </CardContent>
        <CardActions>
          <Box
            mx={"auto"}
            sx={{ display: "flex", gap: { xs: 2, md: 4 }, mt: 2 }}
          >
            <Button
              variant="contained"
              color="success"
              startIcon={<EditIcon />}
              // onClick={handleUpdate}
            >
              Update
            </Button>
            <Button
              variant="contained"
              color="error"
              startIcon={<DeleteIcon />}
              // onClick={() => setOpenConfirm(true)}
            >
              Delete
            </Button>
          </Box>
        </CardActions>
      </Card>
    </Grid>
  );
}
