import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./feauture/authSlice";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { cartReducer } from "./feauture/cartSlice";

const authPersistConfig = {
    key: "auth",
    storage,
};

const cartPersistConfig = {
    key: "cart",
    storage,
};

const rootReducer = combineReducers({
    auth: persistReducer(authPersistConfig, authReducer),
    cart: persistReducer(cartPersistConfig, cartReducer),
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
