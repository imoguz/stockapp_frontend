import { Box, Typography, Avatar, Paper } from "@mui/material";
export default function KpiCards({ item }) {
  return (
    <Paper elevation={8} sx={{ minWidth: 280, p: 2 }}>
      <Box sx={{ display: "flex", gap: 2, justifyItems: "center" }}>
        <Avatar
          sx={{ bgcolor: item?.color, width: 56, height: 56 }}
          variant="rounded"
        >
          {item?.icon}
        </Avatar>
        <Box color={"black"}>
          <Typography variant="p">{item?.name}</Typography>
          <Typography variant="h5">${item?.total}</Typography>
        </Box>
      </Box>
    </Paper>
  );
}
