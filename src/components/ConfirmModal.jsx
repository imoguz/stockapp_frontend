import { Box, Button, Typography, Modal } from "@mui/material";
import { modalStyle } from "../helpers/styleConfig";
import useStock from "../hooks/useStock";
import WarningIcon from "@mui/icons-material/Warning";

export default function ConfirmModal({
  openConfirm,
  setOpenConfirm,
  _id,
  stockName,
}) {
  const { deleteStock } = useStock();
  const handleDelete = () => {
    deleteStock(_id, stockName);
    setOpenConfirm(false);
  };

  return (
    <Modal
      open={openConfirm}
      onClose={() => setOpenConfirm(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <WarningIcon color={"warning"} />
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Confirmation for Deletion
          </Typography>
        </Box>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {`Are you sure you want to delete this ${stockName.slice(
            0,
            stockName.length - 1
          )}? This action cannot be undone.`}
        </Typography>
        <Box textAlign={"right"} mt={1}>
          <Button
            variant="text"
            color={"info"}
            onClick={() => setOpenConfirm(false)}
            sx={{ fontWeight: "bold" }}
          >
            Cancel
          </Button>
          <Button
            variant="text"
            color={"error"}
            onClick={handleDelete}
            sx={{ fontWeight: "bold" }}
          >
            Delete
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
