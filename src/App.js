import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { useState } from "react";

import { lightTheme, darkTheme } from "./theme";
import Navbar from "./components/Navbar";

import BookTable from "./components/BookTable";
import BookForm from "./components/BookForm";
import BookDetails from "./components/BookDetails";
import OnlineBookSearch from "./components/OnlineBookSearch";


function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

        <Routes>
          <Route path="/" element={<BookTable />} />
          <Route path="/add" element={<BookForm />} />
          <Route path="/edit/:id" element={<BookForm />} />
          <Route path="/details/:id" element={<BookDetails />} />
        <Route path="/search-online" element={<OnlineBookSearch />} />
        <Route path="/admin" element={<BookTable role="admin" />} />

        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
