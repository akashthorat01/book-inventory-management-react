import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pagination } from "@mui/material";
import Loader from "./Loader";
import ThemeSelector from "./ThemeSelector";
import booksData from "../data/books.json";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Button,
    Container,
    Typography,
    TextField,
    Box,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Skeleton
} from "@mui/material";

export default function BookTable({ setPrimaryColor }) {
    const [books, setBooks] = useState([]);
    const [search, setSearch] = useState("");
    const [open, setOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [page, setPage] = useState(1);
    const booksPerPage = 10;
    const [loading, setLoading] = useState(true);



    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            loadBooks();
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    const loadBooks = async () => {
        setBooks(booksData);
        setLoading(false);
    };





    // 🔍 Search logic
    const filteredBooks = books.filter(
        (book) =>
            book.title.toLowerCase().includes(search.toLowerCase()) ||
            book.author.toLowerCase().includes(search.toLowerCase())
    );

    const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

    const paginatedBooks = filteredBooks.slice(
        (page - 1) * booksPerPage,
        page * booksPerPage
    );


    // 🧨 Open dialog
    const handleDeleteClick = (id) => {
        setSelectedId(id);
        setOpen(true);
    };

    // ❌ Cancel delete
    const handleClose = () => {
        setOpen(false);
        setSelectedId(null);
    };

    // ✅ Confirm delete
    const handleConfirmDelete = async () => {
        // Working with local JSON data: remove the book from state
        setBooks((prev) => prev.filter((b) => b.id !== selectedId));
        setOpen(false);
        setSelectedId(null);
    };

    if (loading) {
        return <Loader />;
    }



    return (
        <Container maxWidth="xl" sx={{ mt: 5 }}>
            <Typography variant="h4" align="center" gutterBottom>
                📚 Book Inventory Management System
            </Typography>

            {/* 🔍 Search + Add */}
            <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
                <TextField
                    fullWidth
                    label="Search by Title or Author"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <Button
                    variant="contained"
                    sx={{ minWidth: 150 }}
                    onClick={() => navigate("/add")}
                >
                    ➕ Add Book
                </Button>
            </Box>

            {/* 📊 Table */}
            <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                <Pagination
                    count={totalPages}
                    page={page}
                    onChange={(e, value) => setPage(value)}
                    color="primary"
                    sx={{ mr: 10 }}
                />
            </Box>

            <Box sx={{ overflowX: "auto" }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><b>Title</b></TableCell>
                            <TableCell><b>Author</b></TableCell>
                            <TableCell><b>status</b></TableCell>
                            <TableCell><b>Action</b></TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {filteredBooks.length ? (
                            paginatedBooks.map((b) => (
                                <TableRow key={b.id} hover>
                                    <TableCell>{b.title}</TableCell>
                                    <TableCell>{b.author}</TableCell>
                                    <TableCell>{b.status}</TableCell>
                                    <TableCell>
                                        <Button onClick={() => navigate(`/details/${b.id}`)}>
                                            View
                                        </Button>
                                        <Button onClick={() => navigate(`/edit/${b.id}`)}>
                                            Edit
                                        </Button>
                                        <Button
                                            color="error"
                                            onClick={() => handleDeleteClick(b.id)}
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={3} align="center">
                                    ❌ No books found
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </Box>

            {/* ⚠️ Delete Confirmation Dialog */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this book?
                        <br />
                        This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button color="error" onClick={handleConfirmDelete}>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}
