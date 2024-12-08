import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../Axios/Axios";

export const userLogin = createAsyncThunk(
    "/login",
    async (loginData) => {
        const response = await axiosClient.post(`/login`, loginData);
        return response.data;
    }
);

export const userRegister = createAsyncThunk(
    "/register",
    async (registerData) => {
        const response = await axiosClient.post(`/register`, registerData);
        return response.data;
    }
);

export const verifyToken = createAsyncThunk(
    "/verify",
    async (registerData) => {
        const token = localStorage.getItem("token")
        const response = await axiosClient.get(`/verify`, {
            headers: {
                token: token
            }
        });
        return response.data;
    }
);

const initialState = { data: [], loading: true };

const authSlice = createSlice({
    name: "auth",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(userLogin.pending, (state) => {
                state.loading = true;
            })
            .addCase(userLogin.fulfilled, (state, { payload }) => {
                state.data = payload;
                state.loading = false;
            })
            .addCase(userLogin.rejected, (state) => {
                console.log("getting data rejected!");
                state.data = {};
                state.loading = false;
            })
            .addCase(userRegister.pending, (state) => {
                state.loading = true;
            })
            .addCase(userRegister.fulfilled, (state, { payload }) => {
                state.data = payload;
                state.loading = false;
            })
            .addCase(userRegister.rejected, (state) => {
                console.log("getting data rejected!");
                state.data = {};
                state.loading = false;
            })
            .addCase(verifyToken.pending, (state) => {
                state.loading = true;
            })
            .addCase(verifyToken.fulfilled, (state, { payload }) => {
                state.data = payload;
                state.loading = false;
            })
            .addCase(verifyToken.rejected, (state) => {
                console.log("getting data rejected!");
                state.data = {};
                state.loading = false;
            });
    },
});

export default authSlice.reducer;
