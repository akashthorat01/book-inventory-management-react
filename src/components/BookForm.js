import { useFormik } from "formik";
import * as Yup from "yup";
import { addBook, getBookById, updateBook } from "../services/api";
import { TextField, Button, Container } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

export default function BookForm() {
    const navigate = useNavigate();
    const { id } = useParams();

    const formik = useFormik({
        initialValues: {
            title: "",
            author: "",
            publisher: "",
            publishedDate: "",
            overview: "",
            email: "",
            age: ""
        },
        validationSchema: Yup.object({
            title: Yup.string().required(),
            author: Yup.string().required(),
            email: Yup.string().email("Invalid email"),
            age: Yup.number().integer("Age must be integer")
        }),
        onSubmit: async (values) => {
            id ? await updateBook(id, values) : await addBook(values);
            navigate("/");
        }
    });

    useEffect(() => {
        if (id) {
            getBookById(id).then(res => formik.setValues(res.data));
        }
    }, [id]);

    return (
        <Container maxWidth="xl" sx={{ mt: 5 }}>
            <form onSubmit={formik.handleSubmit}>
                <TextField fullWidth label="Title" {...formik.getFieldProps("title")} />
                <TextField fullWidth label="Author" {...formik.getFieldProps("author")} />
                <TextField fullWidth label="Publisher" {...formik.getFieldProps("publisher")} />
                <TextField fullWidth label="Email" {...formik.getFieldProps("email")} />
                <TextField fullWidth label="Age" {...formik.getFieldProps("age")} />
                <TextField fullWidth multiline rows={4} label="Overview" {...formik.getFieldProps("overview")} />
                <TextField
                    select
                    fullWidth
                    label="Reading Status"
                    {...formik.getFieldProps("status")}
                    SelectProps={{ native: true }}
                >
                    <option value="Wishlist">⏳ Wishlist</option>
                    <option value="Reading">📖 Reading</option>
                    <option value="Completed">✅ Completed</option>
                </TextField>

                <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                    Save Book
                </Button>
            </form>
        </Container>
    );
}
