import React, { useState, useEffect } from 'react';
import { db } from '../../firebaseConfig';
import { addDoc, collection, doc, updateDoc, deleteDoc, onSnapshot } from 'firebase/firestore';
import { useAuth } from '../../context/AuthContext';
// import Comments from '../comments/Comments'; // Key Point 1: Import the Comments Component

import Comments from '../Comments';
function Notes() {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState({ title: '', content: '', subject: '' });
    const { user } = useAuth();

    const notesCollectionRef = collection(db, 'notes');

    useEffect(() => {
        const unsubscribe = onSnapshot(notesCollectionRef, (snapshot) => {
            const fetchedNotes = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            setNotes(fetchedNotes);
        });
        return unsubscribe;
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewNote((prevNote) => ({ ...prevNote, [name]: value }));
    };

    const addNote = async (e) => {
        e.preventDefault();
        if (!user || !newNote.title || !newNote.content || !newNote.subject) return;

        await addDoc(notesCollectionRef, {
            ...newNote,
            createdBy: user.uid,
            lastEditedBy: user.uid,
            lastEditedAt: new Date(),
            createdAt: new Date(),
            collaborators: [user.uid],
        });

        setNewNote({ title: '', content: '', subject: '' });
    };

    const editNote = async (noteId) => {
        const noteRef = doc(db, 'notes', noteId);
        await updateDoc(noteRef, {
            ...newNote,
            lastEditedBy: user.uid,
            lastEditedAt: new Date(),
        });
    };

    const deleteNote = async (noteId) => {
        await deleteDoc(doc(db, 'notes', noteId));
    };

    return (
        <div>
            <h1>Notes</h1>
            <form onSubmit={addNote}>
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={newNote.title}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    value={newNote.subject}
                    onChange={handleInputChange}
                />
                <textarea
                    name="content"
                    placeholder="Content"
                    value={newNote.content}
                    onChange={handleInputChange}
                />
                <button type="submit">Add Note</button>
            </form>
            <div>
                {notes.map((note) => (
                    <div key={note.id} className="note-container">
                        <h3>{note.title}</h3>
                        <p><strong>Subject:</strong> {note.subject}</p>
                        <p>{note.content}</p>
                        <p><strong>Last edited by:</strong> {note.lastEditedBy}</p>
                        <button onClick={() => editNote(note.id)}>Edit</button>
                        <button onClick={() => deleteNote(note.id)}>Delete</button>
                        
                        {/* Key Point 2: Call the Comments component here */}
                        <Comments noteId={note.id} /> {/* This line renders the Comments component */}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Notes;
