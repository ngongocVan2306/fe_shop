import { IUser } from "@/utils/interface";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface IAuthSlice {
    isLogin: boolean;
    infoUser: Omit<IUser, "password">;
}

const initialState: IAuthSlice = {
    isLogin: false,
    infoUser: {
        id: 0,
        email: "",
        firstName: "",
        lastName: "",
        address: "",
        age: "",
        avatar: "",
        gender: false,
        role: "user",
    },
};

export const authSlice = createSlice({
    name: "auth",
    initialState,

    reducers: {
        loginSuccess: (
            state,
            action: PayloadAction<Omit<IUser, "password">>
        ) => {
            state.isLogin = true;
            state.infoUser = { ...state.infoUser, ...action.payload };
        },

        logout: (state) => {
            state.isLogin = false;
            state.infoUser = {
                ...state.infoUser,
                id: 0,
                email: "",
                firstName: "",
                lastName: "",
                address: "",
                age: "",
                avatar: "",
                gender: false,
                role: "user",
            };
        },
    },
});

// Action creators are generated for each case reducer function
export const { loginSuccess, logout } = authSlice.actions;

export const authReducer = authSlice.reducer;
