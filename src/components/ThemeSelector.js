import { Box, Button, Typography } from "@mui/material";

const colors = [
  { name: "Red", value: "#d32f2f" },
  { name: "Blue", value: "#1976d2" },
  { name: "Green", value: "#2e7d32" },
  { name: "Yellow", value: "#f9a825" },
  { name: "Purple", value: "#7b1fa2" },
];

export default function ThemeSelector({ setPrimaryColor }) {
  const applyColor = (color) => {
    setPrimaryColor(color);
    localStorage.setItem("themeColor", color);
  };

  return (
    <Box
  sx={{
    display: "flex",
    gap: 2,
    mb: 3,
    flexDirection: { xs: "column", sm: "row" },
    alignItems: "stretch"
  }}
>

      <Typography variant="h6">🎨 Choose Your Theme Color:</Typography>

      {colors.map((c) => (
        <Button
          key={c.name}
          variant="contained"
          sx={{ backgroundColor: c.value }}
          onClick={() => applyColor(c.value)}
        >
          {c.name}
        </Button>
      ))}
    </Box>
  );
}
