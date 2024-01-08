import { useState } from "react";
import { useSelector } from "react-redux";
import GenericCard from "../components/GenericCard";
import GenericModal from "../components/GenericModal";
import { Grid, Typography, Button, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const Brands = () => {
  const [open, setOpen] = useState(false);
  const [initialForm, setInitialForm] = useState({ name: "", image: "" });
  const { brands } = useSelector((store) => store.stock);
  const stockName = "brands";

  return (
    <>
      <Box>
        <Typography variant="h4" component="h2" className="textShadow">
          BRANDS
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
          ADD BRAND
        </Button>
      </Box>
      <GenericModal
        {...{ open, setOpen, initialForm, setInitialForm, stockName }}
      />
      <Grid container mt={1} mb={4} spacing={3} justifyContent={"center"}>
        {brands?.map((item, index) => (
          <Grid item key={index}>
            <GenericCard {...{ setOpen, setInitialForm, item, stockName }} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Brands;
