import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ConfirmModal from "../components/ConfirmModal";
import { Card, CardActions, CardContent, CardMedia } from "@mui/material";
import { Box, Button, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import noimage from "../assets/noimage.jpg";

const GenericCard = ({ setOpen, setInitialForm, item, stockName }) => {
  const { _id, name, address, phone, image } = item;
  const [openConfirm, setOpenConfirm] = useState(false);
  const imageURL = `${process.env.REACT_APP_CLOUDINARY_BASE_URL}`;

  const handleUpdate = () => {
    setInitialForm(item);
    setOpen(true);
  };
  return (
    <Card sx={{ width: 270, p: 1 }} elevation={8}>
      <CardMedia
        component={"img"}
        sx={{ height: 140, objectFit: "contain", boxShadow: 1, p: 1 }}
        image={image ? `${imageURL + image}` : noimage}
        title={name}
      />
      <CardContent>
        <Tooltip title={name} arrow>
          <Typography
            gutterBottom
            noWrap
            variant="h6"
            component="div"
            className="cardShadow"
          >
            {name}
          </Typography>
        </Tooltip>
        {address && (
          <Tooltip title={address} arrow>
            <Typography
              variant="body1"
              noWrap
              mb={1}
              color="text.secondary"
              sx={{ cursor: "pointer" }}
            >
              {address}
            </Typography>
          </Tooltip>
        )}
        {phone && (
          <Typography variant="body2" color="text.secondary">
            {phone}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <Box mx={"auto"} sx={{ display: "flex" }}>
          <Button
            variant="text"
            color="success"
            startIcon={<EditIcon />}
            onClick={handleUpdate}
          >
            Update
          </Button>
          <Button
            variant="text"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={() => setOpenConfirm(true)}
          >
            Delete
          </Button>
          <ConfirmModal {...{ openConfirm, setOpenConfirm, _id, stockName }} />
        </Box>
      </CardActions>
    </Card>
  );
};

export default GenericCard;
