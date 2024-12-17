import { configureStore } from "@reduxjs/toolkit";
import { basketSlice } from "@/lib/features/basket/basketSlice";

export const store = configureStore({
    reducer:{
        basket: basketSlice.reducer
    }
});

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
