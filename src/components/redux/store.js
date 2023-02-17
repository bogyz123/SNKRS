import { configureStore } from "@reduxjs/toolkit";
import ProductSlice from "./ProductSlice";
import UserSlice from "./UserSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";

const persistConfig = {
    key: 'root',
    version: 1,
    storage
}
const reducer = combineReducers({
    UserSlice: UserSlice,
    ProductSlice: ProductSlice
});
const persisted = persistReducer(persistConfig, reducer);

export default configureStore({
    reducer: persisted
});
