import { IUser } from "@/utils/interface";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface IAuthSlice {
    isLogin: boolean;
    infoUser: Omit<IUser, "password">;
}

const initialInfoUser: Omit<IUser, "password"> = {
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

const initialState: IAuthSlice = {
    isLogin: false,
    infoUser: initialInfoUser,
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
            state.infoUser = { ...initialInfoUser };
        },
    },
});

export const { loginSuccess, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
