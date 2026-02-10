import {
  AppBar,
  Toolbar,
  Typography,
  Switch,
  Box,
  Button
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Navbar({ darkMode, setDarkMode }) {
  const navigate = useNavigate();

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          📚 Book Inventory
        </Typography>
<Button color="inherit" onClick={() => navigate("/search-online")}>
  Web Search
</Button>

        <Button color="inherit" onClick={() => navigate("/")}>
          Home
        </Button>
        <Button color="inherit" onClick={() => navigate("/add")}>
          Add Book
        </Button>

        <Box sx={{ ml: 2 }}>
          🌙
          <Switch
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
