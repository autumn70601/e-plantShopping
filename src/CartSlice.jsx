
import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [], // Initialize items as an empty array
        numOfItems: 0 // Number of items in the cart
    },

    reducers: {
        addItem: (state, action) => {
            const { name, image, cost } = action.payload;
            const existingItem = state.items.find(item => item.name === name);

            if (existingItem) {
                // In existing items, quantity is already added as property
                existingItem.quantity++;
            } else {
                state.items.push({ name, image, cost, quantity: 1 });
            }

            state.numOfItems += 1;
        },

        removeItem: (state, action) => {
            const { name, quantity } = action.payload;
            state.items = state.items.filter(item => item.name !== name);
            state.numOfItems -= quantity;
        },

        updateQuantity: (state, action) => {
            const { name, quantity } = action.payload; // Destructure the product name and new quantity from the action payload
            // Find the item in the cart that matches the given name
            const itemToUpdate = state.items.find(item => item.name === name);
            if (itemToUpdate) {
                const diff = quantity - itemToUpdate.quantity;
                state.numOfItems += diff;
                itemToUpdate.quantity = quantity; // If the item is found, update its quantity to the new value
            }
        },
    },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
