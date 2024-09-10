import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface ICartSlice {
    count: number;
}

const initialState: ICartSlice = {
    count: 0,
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,

    reducers: {
        startCart: (state, action: PayloadAction<number>) => {
            state.count = action.payload;
        },
        clearCart: (state) => {
            state.count = 0;
        },
        AddCart: (state) => {
            state.count += 1;
        },
        DeleteCart: (state) => {
            if (state.count > 0) {
                state.count -= 1;
            }
        },
    },
});

// Action creators are generated for each case reducer function
export const { AddCart, DeleteCart, startCart, clearCart } = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
