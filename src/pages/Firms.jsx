import { useState } from "react";
import { useSelector } from "react-redux";
import GenericCard from "../components/GenericCard";
import GenericModal from "../components/GenericModal";
import { Grid, Typography, Button, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const Firms = () => {
  const [open, setOpen] = useState(false);
  const [initialForm, setInitialForm] = useState({
    name: "",
    address: "",
    phone: "",
    image: "",
  });
  const { firms } = useSelector((store) => store.stock);
  const stockName = "firms";

  return (
    <>
      <Box>
        <Typography variant="h4" component="h2" className="textShadow">
          FIRMS
        </Typography>
        <Button
          variant="contained"
          onClick={() => setOpen(true)}
          startIcon={<AddIcon />}
          sx={{
            mt: 1,
            backgroundColor: "#2192FF",
            "&:hover": { backgroundColor: "#31C6D4" },
          }}
        >
          ADD FIRM
        </Button>
      </Box>
      <GenericModal
        {...{ open, setOpen, initialForm, setInitialForm, stockName }}
      />
      <Grid container mt={1} mb={4} spacing={3} justifyContent={"center"}>
        {firms?.map((item, index) => (
          <Grid item key={index}>
            <GenericCard {...{ setOpen, setInitialForm, item, stockName }} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Firms;
