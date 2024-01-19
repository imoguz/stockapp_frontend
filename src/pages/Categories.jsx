import { useSelector } from "react-redux";
import { Grid, Typography, Button, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CategoryCard from "../components/CategoryCard";
import { useEffect, useState } from "react";
import useStock from "../hooks/useStock";

const Categories = () => {
  const { categories } = useSelector((store) => store.stock);
  const [categoryData, setCategoryData] = useState(categories);
  const { readStock } = useStock();

  const handleAdd = () => {
    setCategoryData((prev) => [...prev, { _id: 100, name: "" }]);
  };

  useEffect(() => {
    const readStockData = async () => {
      await readStock("categories");
      setCategoryData(categories);
    };
    readStockData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories]);

  return (
    <>
      <Box>
        <Typography variant="h4" component="h2" className="textShadow">
          CATEGORIES
        </Typography>
        <Button
          variant="contained"
          onClick={handleAdd}
          startIcon={<AddIcon />}
          sx={{
            mt: 1,
            backgroundColor: "#2192FF",
            "&:hover": { backgroundColor: "#31C6D4" },
          }}
        >
          ADD CATEGORY
        </Button>
      </Box>
      <Grid container mt={1} mb={4} spacing={3} justifyContent={"center"}>
        {categoryData?.map((item, index) => (
          <Grid item key={index}>
            <CategoryCard {...{ item, setCategoryData }} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Categories;
