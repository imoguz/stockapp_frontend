import { Box, Paper, Button, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import UpdateCategory from "./UpdateCategory";
import SaveIcon from "@mui/icons-material/Save";
import useStock from "../hooks/useStock";
import CloseIcon from "@mui/icons-material/Close";

export default function CategoryCard({ item: { _id, name }, setCategoryData }) {
  const [formData, setFormData] = useState([_id, name]);
  const [update, setUpdate] = useState(false);
  const { deleteStock, createStock, updateStock } = useStock();

  const handleSave = async () => {
    if (_id === 100) {
      const data = await createStock({ name: formData[1] }, "categories");
      data
        ? setCategoryData((prev) =>
            prev.map((item) => (item._id === 100 ? data : item))
          )
        : setCategoryData((prev) => prev.filter((item) => item._id !== 100));
    } else {
      const data = await updateStock(
        { name: formData[1] },
        "categories",
        formData[0]
      );
      data &&
        setCategoryData((prev) =>
          prev.map((item) =>
            item._id === formData[0] ? { ...item, name: formData[1] } : item
          )
        );
    }

    setUpdate(false);
  };

  const handleDelete = () => {
    deleteStock(_id, "categories");
    setCategoryData((prev) => prev.filter((item) => item._id !== _id));
  };
  const handleCancel = () => {
    update
      ? setUpdate(false)
      : setCategoryData((prev) => prev.filter((item) => item._id !== 100));
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        "& > :not(style)": {
          m: 1,
          p: 2,
          width: 250,
          height: 130,
        },
      }}
    >
      <Paper elevation={3}>
        {update || _id === 100 ? (
          <UpdateCategory {...{ _id, name, setUpdate, setFormData }} />
        ) : (
          <Tooltip placement="top" title={name} arrow>
            <Typography variant="h5" component="h5" noWrap>
              {name}
            </Typography>
          </Tooltip>
        )}
        <Box
          mx={"auto"}
          mt={2}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          {update || _id === 100 ? (
            <Button
              type="submit"
              variant="text"
              color="success"
              startIcon={<SaveIcon />}
              onClick={handleSave}
            >
              Save
            </Button>
          ) : (
            <Button
              type="submit"
              variant="text"
              color="success"
              startIcon={<EditIcon />}
              onClick={() => setUpdate(true)}
            >
              Update
            </Button>
          )}
          {update || _id === 100 ? (
            <Button
              type="submit"
              variant="text"
              color="error"
              startIcon={<CloseIcon />}
              onClick={handleCancel}
            >
              Cancel
            </Button>
          ) : (
            <Button
              type="submit"
              variant="text"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={handleDelete}
            >
              Delete
            </Button>
          )}
        </Box>
      </Paper>
    </Box>
  );
}
