import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    userDetails: null,
    isAdmin: null
}
export const ProductSlice = createSlice({
    initialState,
    name: 'UserSlice',
    reducers: {
        setIsLoggedIn(state, action) {
            state.isLoggedIn = action.payload;
        },
        setIsAdmin(state, action) {
            state.isAdmin = action.payload;
        },
        setUserDetails(state, action) {
            state.userDetails = action.payload;
        }
    }
})
export const { setIsLoggedIn, setIsAdmin, setUserDetails } = ProductSlice.actions;
export default ProductSlice.reducer;