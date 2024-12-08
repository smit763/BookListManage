import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../Axios/Axios";

export const getBooks = createAsyncThunk(
    "books/getBooks",
    async (page, limit) => {
        const token = localStorage.getItem("token")
        const response = await axiosClient.get(`/books?limit=${limit}&page=${page}`, {
            headers: {
                token: token
            }
        });
        return response.data;
    }
);

export const createBook = createAsyncThunk(
    "books/createBook",
    async (bookData) => {
        const token = localStorage.getItem("token")
        const response = await axiosClient.post("/books", bookData, {
            headers: {
                token: token
            }
        });
        return response.data;
    }
);

const initialState = {
    books: [],
    loading: false,
    error: null,
};

const bookSlice = createSlice({
    name: "books",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getBooks.pending, (state) => {
                state.loading = true;
            })
            .addCase(getBooks.fulfilled, (state, { payload }) => {
                state.books = payload;
                state.loading = false;
            })
            .addCase(getBooks.rejected, (state, { error }) => {
                state.error = error.message;
                state.loading = false;
            })
            .addCase(createBook.pending, (state) => {
                state.loading = true;
            })
            .addCase(createBook.fulfilled, (state, { payload }) => {
                state.loading = false;
            })
            .addCase(createBook.rejected, (state, { error }) => {
                state.error = error.message;
                state.loading = false;
            });
    },
});

export default bookSlice.reducer;
