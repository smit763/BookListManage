import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slices/AuthSlice";
import bookReducer from "./Slices/BookSlice";

export const store = configureStore({
    reducer: {
        authData: authReducer,
        booksData: bookReducer
    },
});


