import { useEffect, useState } from "react";
import { getBookById, getBooks } from "../services/api";
import { useParams } from "react-router-dom";
import { Container, Typography } from "@mui/material";

export default function BookDetails() {
    const { id } = useParams();
    const [book, setBook] = useState({});
    const [similar, setSimilar] = useState([]);


    useEffect(() => {
        let mounted = true;

        async function fetchSimilar() {
            try {
                const bookRes = await getBookById(id);
                if (!mounted) return;
                const fetchedBook = bookRes.data;
                setBook(fetchedBook);

                const booksRes = await getBooks();
                if (!mounted) return;
                const filtered = booksRes.data.filter(
                    (b) =>
                        b.id !== fetchedBook.id &&
                        (b.author === fetchedBook.author || b.publisher === fetchedBook.publisher)
                );
                setSimilar(filtered);
            } catch (err) {
                console.error("Failed to load book details or similar books", err);
                if (mounted) setSimilar([]);
            }
        }

        if (id) fetchSimilar();

        return () => {
            mounted = false;
        };

    }, [id]);

    return (
        <Container maxWidth="xl" sx={{ mt: 5 }}>
            <Typography variant="h4">{book.title}</Typography>
            <Typography>Author: {book.author}</Typography>
            <Typography>Publisher: {book.publisher}</Typography>
            <Typography>Published: {book.publishedDate}</Typography>
            <Typography sx={{ mt: 2 }}>{book.overview}</Typography>

            {similar && similar.length > 0 && (
                <>
                    <Typography variant="h6" sx={{ mt: 4 }}>
                        📚 You may also like
                    </Typography>
                    {similar.map((b) => (
                        <Typography key={b.id}>
                            • {b.title} — {b.author}
                        </Typography>
                    ))}
                </>
            )}

        </Container>
    );
}
