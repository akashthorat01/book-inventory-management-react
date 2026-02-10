import { useState } from "react";
import axios from "axios";
import {
    Container,
    TextField,
    Button,
    Card,
    CardContent,
    Typography,
    Grid,
    CardMedia,
    Box,
    Rating
} from "@mui/material";
import { addBook } from "../services/api";
import { getBooks } from "../services/api";


export default function OnlineBookSearch() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);

    const searchBooks = async () => {
        if (!query) return;

        const res = await axios.get(
            `https://www.googleapis.com/books/v1/volumes?q=${query}`
        );

        setResults(res.data.items || []);
    };

    const addToInventory = async (book) => {
  const v = book.volumeInfo;

  const existing = await getBooks();

  const isDuplicate = existing.data.some(
    (b) =>
      b.title.toLowerCase() === v.title?.toLowerCase() &&
      b.author.toLowerCase() === (v.authors?.[0] || "").toLowerCase()
  );

  if (isDuplicate) {
    alert("⚠️ Book already exists");
    return;
  }

  const newBook = {
    title: v.title || "N/A",
    author: v.authors?.[0] || "Unknown",
    publisher: v.publisher || "N/A",
    publishedDate: v.publishedDate || "N/A",
    overview: v.description || "No description",
    status: "Wishlist"
  };

  await addBook(newBook);
  alert("✅ Book added");
};


    return (
        <Container maxWidth="xl" sx={{ mt: 5 }}>
            <Typography variant="h4" align="center" gutterBottom>
                🌍 Search Books from Web
            </Typography>

            <TextField
                fullWidth
                label="Search book by name"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />

            <Button
                variant="contained"
                sx={{ mt: 2, mb: 4 }}
                onClick={searchBooks}
            >
                🔍 Search
            </Button>

            <Grid container spacing={3}>
                {results.map((book) => {
                    const info = book.volumeInfo;

                    return (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={book.id}>
                            <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>

                                {/* 🖼️ Book Image */}
                                {info.imageLinks?.thumbnail && (
                                    <CardMedia
                                        component="img"
                                        height="200"
                                        image={info.imageLinks.thumbnail}
                                        alt={info.title}
                                    />
                                )}

                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography variant="h6" gutterBottom>
                                        {info.title}
                                    </Typography>

                                    <Typography variant="body2">
                                        Author: {info.authors?.[0] || "Unknown"}
                                    </Typography>

                                    {/* ⭐ Rating */}
                                    {info.averageRating && (
                                        <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                                            <Rating
                                                value={info.averageRating}
                                                precision={0.5}
                                                readOnly
                                            />
                                            <Typography variant="caption" sx={{ ml: 1 }}>
                                                ({info.ratingsCount || 0})
                                            </Typography>
                                        </Box>
                                    )}

                                    <Typography variant="body2" sx={{ mt: 1 }}>
                                        {info.description
                                            ? info.description.slice(0, 100) + "..."
                                            : "No description available"}
                                    </Typography>
                                </CardContent>

                                <Box sx={{ p: 2 }}>
                                    <Button
                                        fullWidth
                                        variant="outlined"
                                        onClick={() => addToInventory(book)}
                                    >
                                        ➕ Add to Inventory
                                    </Button>
                                </Box>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>
        </Container>
    );
}
