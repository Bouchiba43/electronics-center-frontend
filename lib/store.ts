import { configureStore } from "@reduxjs/toolkit";
import { basketSlice } from "@/lib/features/basket/basketSlice";
import { accountSlice } from "@/components/auth/accountSlice";

export const store = configureStore({
    reducer:{
        basket: basketSlice.reducer,
        account: accountSlice.reducer
    }
});

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
