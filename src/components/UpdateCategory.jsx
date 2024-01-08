import { TextField } from "@mui/material";

const UpdateCategory = ({ _id, name, setUpdate, setFormData }) => {
  return (
    <>
      <TextField
        id="update"
        autoFocus
        fullWidth
        defaultValue={name}
        onChange={(e) =>
          setFormData((prev) => [prev[0], (prev[1] = e.target.value)])
        }
        variant="standard"
        inputProps={{ sx: { fontSize: 24, width: 200 } }}
      />
    </>
  );
};

export default UpdateCategory;
