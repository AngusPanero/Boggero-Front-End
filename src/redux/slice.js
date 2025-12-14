import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API_URL from "../config/api";

// Create
export const createHouse = createAsyncThunk("createHouse", 
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL}/createhouse`, data)
            if(response.status !== 201) {
                return rejectWithValue(`Error creating house! 🔴`)
            }
            return response.data
        } catch (error) {
            console.error(`Internal error, ${error}`);
            return rejectWithValue(error.response?.data?.message || `Internal error, ${error}`)
        }
    }
)

// Read
export const getHouses = createAsyncThunk("getHouses", 
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}/houses`)
            if(response.status === 404){
                return rejectWithValue(`No houses found! 🔴`)
            }
            if(response.status !== 200){
                return rejectWithValue(`Error getting houses! 🔴`)
            }
            return response.data
        } catch (error) {
            console.error(`Internal error creating house, ${error}`);
            return rejectWithValue(error.response?.data?.message || `Internal error, ${error}`)
        }
    }
)

// Read by ID
export const readById = createAsyncThunk("readById",
    async(id, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}/house/${id}`)
            if(response.status === 404){
                return rejectWithValue(`House with ID: ${id} not found! 🔴`)
            }
            return response.data
        } catch (error) {
            console.error(`Internal error reading by ID: ${id} , ${error}`);
            return rejectWithValue(error.response?.data?.message || `Internal error, ${error}`)
        }
    }
)

// Update
export const updateHouse = createAsyncThunk("updateHouse", 
    async ({ id, form }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${API_URL}/update/${id}`, form)
            if(response.status === 404){
                return rejectWithValue(`Error updating house! 🔴`)
            }
            return response.data.message
        } catch (error) {
            console.error(`Internal error updating house with ID: ${id}, ${error}`);
            return rejectWithValue(error.response?.data?.message || `Internal error, ${error}`)
        }
    }
)

// Delete
export const deleteHouse = createAsyncThunk("deleteHouse", 
    async(id, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`${API_URL}/delete/${id}`)
            if(response.status === 404){
                return rejectWithValue(`Error deleting house! 🔴`)
            }
            return response.data.message
        } catch (error) {
            console.error(`Internal error deleting house with ID: ${id}, ${error}`);
            return rejectWithValue(error.response?.data?.message || `Internal error, ${error}`)
        }
    }
)

const houseSlice = createSlice({
    name: "houseSelector",
    initialState: {
        houses: [],
        loading: false,
        error: null,
        successMessage: null,
        houseDetails: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Create
            .addCase(createHouse.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.successMessage = null;
            })
            .addCase(createHouse.fulfilled, (state, action) => {
                state.loading = false;
                state.houses.push(action.payload.house) // si el back devuelve la nueva casa
                state.successMessage = action.payload.message;
            })
            .addCase(createHouse.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Read
            .addCase(getHouses.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getHouses.fulfilled, (state, action) => {
                state.loading = false;
                state.houses = action.payload;
            })
            .addCase(getHouses.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Read by ID
            .addCase(readById.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.houseDetails = null;
            })
            .addCase(readById.fulfilled, (state, action) => {
                state.loading = false;
                state.houseDetails = action.payload;
            })
            .addCase(readById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Update
            .addCase(updateHouse.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.successMessage = null;
            })
            .addCase(updateHouse.fulfilled, (state, action) => {
                state.loading = false;
                state.successMessage = action.payload;
            })
            .addCase(updateHouse.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            
            // Delete
            .addCase(deleteHouse.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.successMessage = null;
            })
            .addCase(deleteHouse.fulfilled, (state, action) => {
                state.loading = false;
                state.successMessage = action.payload; 
                state.houses = state.houses.filter(house => house._id !== action.meta.arg); // dispatch(deleteHouse("12345")) al pasarle id el thunk guarda el valor en action.meta.arg
            })
            .addCase(deleteHouse.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
}})

export default houseSlice.reducer;