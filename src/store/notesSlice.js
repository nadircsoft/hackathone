// src/store/notesSlice.js
import { createSlice } from '@reduxjs/toolkit';

const notesSlice = createSlice({
    name: 'notes',
    initialState: [],
    reducers: {
        addNote: (state, action) => {
            state.push(action.payload);
        },
        editNote: (state, action) => {
            const { id, content } = action.payload;
            const existingNote = state.find(note => note.id === id);
            if (existingNote) {
                existingNote.content = content;
            }
        },
        deleteNote: (state, action) => {
            return state.filter(note => note.id !== action.payload);
        },
    },
});

// Export actions
export const { addNote, editNote, deleteNote } = notesSlice.actions;

// Export reducer
export default notesSlice.reducer;
