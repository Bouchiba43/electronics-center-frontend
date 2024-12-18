import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { User } from "@/models/user";
import agent from "@/utils/agent";
import { toast } from "react-toastify";
import { FieldValues } from "react-hook-form";

interface AccountState {
    user: User | null;
    error: string | null;
}

const initialState: AccountState = {
    user: null,
    error: null
}

export const signInUser = createAsyncThunk<User, FieldValues>(
    'auth/login',
    async (data, thunkAPI) => {
        try {
            const user = await agent.Account.login(data);
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
)

export const fetchCurrentUser = createAsyncThunk<User | null>(
    'auth/fetchCurrentUser',
    async (_, thunkAPI) => {
        try {
            // Retrieve user data from local storage
            const userString = localStorage.getItem('user');
            if (userString) {
                const user = JSON.parse(userString) as User;
                return user;
            }
            return null;
        } catch (error) {
            console.error("Error Fetching current User:", error);
            return null;
        }
    }
)

export const logoutUser = createAsyncThunk<void>(
    'auth/logout',
    async (_, thunkAPI) => {
        try {
            // Remove user from local storage
            localStorage.removeItem('user');
        } catch (error) {
            console.error("Error logging out user");
        }
    }
)

export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        logOut: (state) => {
            state.user = null;
            state.error = null;
            localStorage.removeItem('user');
        },
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(isAnyOf(signInUser.fulfilled, fetchCurrentUser.fulfilled), (state, action) => {
            state.user = action.payload;
            state.error = null;
            toast.success('Sign in successful');
        });
        builder.addMatcher(isAnyOf(signInUser.rejected, fetchCurrentUser.rejected, logoutUser.fulfilled), (state, action) => {
            const payload = action.payload as string | null;
            state.error = payload;
            toast.error('Sign in failed. Please try again');
        });
    }
})

export const { logOut, clearError } = accountSlice.actions;


