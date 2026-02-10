import {
  Card, CardContent, Typography, CardMedia, Button
} from "@mui/material";

export default function BookCard({ book, role, onDelete, onView }) {
  return (
    <Card
      sx={{
        height: "100%",
        transition: "0.3s",
        "&:hover": { transform: "scale(1.05)" }
      }}
    >
      <CardMedia
        component="img"
        height="220"
        image={book.thumbnail || "https://via.placeholder.com/150"}
        alt={book.title}
      />

      <CardContent>
        <Typography variant="h6">{book.title}</Typography>
        <Typography color="text.secondary">{book.author}</Typography>

        <Button size="small" onClick={onView}>View</Button>

        {role === "admin" && (
          <Button size="small" color="error" onClick={onDelete}>
            Delete
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
