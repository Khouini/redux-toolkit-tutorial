import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { openModal } from '../modal/modalSlice';
const initialState = {
    cartItems: [],
    amount: 0,
    total: 0,
    isLoading: true
}
const remove = function (store, id) {
    store.cartItems = store.cartItems.filter(item => item.id !== id)
}
const url = 'https://course-api.com/react-useReducer-cart-projects';
const getCartItems = createAsyncThunk('cart/getCartItems', async (name, thunkAPI) => {
    try {
        // console.log("Name: ", name);

        // console.log(thunkAPI.getState());
        // thunkAPI.dispatch(openModal())
        const response = await axios(url)
        return response.data
    } catch (error) {
        return thunkAPI.rejectWithValue("Something went wrong!")
    }
})
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        //! Whatever you return, it will be your state (previous state will be ecrased)
        clearCart: (state => {
            state.cartItems = []
            // return { cartItems: [] }
        }),
        removeItem: (state, action) => {
            remove(state, action.payload)
        },
        toggleItem: (state, { payload: { type, id } }) => {
            const item = state.cartItems.find(item => item.id === id)
            switch (type) {
                case 'increase':
                    item.amount += 1
                    break;
                case 'decrease':
                    item.amount -= 1
                    if (item.amount === 0) {
                        remove(state, id)
                    }
                    break;
                default:
                    break;
            }
        },
        calculateTotals: (state) => {
            let amount = 0
            let total = 0
            state.cartItems.forEach(item => {
                amount += item.amount
                total += item.price * item.amount
            })
            state.total = total.toFixed(2);
            state.amount = amount
        }
    },
    extraReducers: {
        [getCartItems.pending]: (state) => {
            state.isLoading = true;
        },
        [getCartItems.fulfilled]: (state, action) => {
            // console.log(action);
            state.isLoading = false;
            state.cartItems = action.payload;
        },
        [getCartItems.rejected]: (state, action) => {
            console.log(action)
            state.isLoading = false;
        },
    },
});
export { getCartItems }
export const { clearCart, removeItem, toggleItem, calculateTotals } = cartSlice.actions
export default cartSlice.reducer;