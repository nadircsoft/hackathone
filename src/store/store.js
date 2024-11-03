// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import notesReducer from './notesSlice'; // You'll create this slice later

const store = configureStore({
    reducer: {
        notes: notesReducer, // Add your notes reducer here
    },
});

export default store;
