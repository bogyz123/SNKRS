
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allProducts: [],
    selectedProducts: [],
    isCartOpen: true,
    snack: { open: false, severity: null, message: "" }
}
export const ProductSlice = createSlice({
    initialState,
    name: 'ProductSlice',
    reducers: {
        setSelectedProducts(state, action) {
            state.selectedProducts = action.payload;
        },
        setAllProducts(state, action) {
            state.allProducts = action.payload;
        },
        setIsCartOpen(state, action) {
            state.isCartOpen = action.payload;
        },
        setSnack(state, action) {
            state.snack = action.payload;
        }
    }
})
export const { setSelectedProducts, setSnack, setAllProducts, setIsCartOpen } = ProductSlice.actions;
export default ProductSlice.reducer;