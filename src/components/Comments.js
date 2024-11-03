// src/components/comments/Comments.js
import React, { useState, useEffect } from 'react';
// import { db } from '../../firebaseConfig';
import { db } from '../firebaseConfig';
// import { useAuth } from '../../context/AuthContext';
import { useAuth } from '../context/AuthContext';
import { collection, addDoc, doc, deleteDoc, updateDoc, onSnapshot, query, orderBy } from 'firebase/firestore';

function Comments({ noteId }) {
    const { user } = useAuth();
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    // Reference to the comments sub-collection under the specified note
    const commentsCollectionRef = collection(db, `notes/${noteId}/comments`);

    // Load comments in real time
    useEffect(() => {
        const q = query(commentsCollectionRef, orderBy('createdAt', 'asc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const fetchedComments = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setComments(fetchedComments);
        });
        return unsubscribe;
    }, [noteId]);

    // Add a new comment
    const handleAddComment = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        await addDoc(commentsCollectionRef, {
            text: newComment,
            userId: user.uid,
            createdAt: new Date(),
        });
        setNewComment('');
    };

    // Update an existing comment
    const handleUpdateComment = async (commentId, updatedText) => {
        const commentRef = doc(db, `notes/${noteId}/comments`, commentId);
        await updateDoc(commentRef, { text: updatedText });
    };

    // Delete a comment
    const handleDeleteComment = async (commentId) => {
        await deleteDoc(doc(db, `notes/${noteId}/comments`, commentId));
    };

    return (
        <div>
            <h3>Comments</h3>
            <form onSubmit={handleAddComment}>
                <input
                    type="text"
                    placeholder="Add a comment"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                />
                <button type="submit">Post</button>
            </form>
            <div>
                {comments.map((comment) => (
                    <div key={comment.id}>
                        <p>{comment.text}</p>
                        {comment.userId === user.uid && (
                            <>
                                <button onClick={() => handleUpdateComment(comment.id, prompt("Edit Comment", comment.text))}>
                                    Edit
                                </button>
                                <button onClick={() => handleDeleteComment(comment.id)}>Delete</button>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Comments;
