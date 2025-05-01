import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';

export default function Notes() {
    const { id } = useParams();
    const navigate = useNavigate();
    const[notes, setNotes] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchNotes();
    }, [id])

    const fetchNotes = async () => {
        try {
            const token = localStorage.getItem("accessToken");
            const response = await fetch(`http://localhost:8000/user-applications`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                }
            });
            const data = await response.json()
            setNotes(data.notes || '')
        } catch(err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }
    const handleSave = async () => {
        try {
          const res = await fetch(`http://localhost:8000/applications/${id}/update-notes`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ notes })
          });
    
          if (!res.ok) throw new Error("Failed to update notes");
    
          alert("Notes updated successfully");

        } catch (err) {
          console.error(err);
          alert("Something went wrong");
        }
      };

    if (loading) return <p> Loading Notes </p>

    return (
    <div style={{ padding: '2rem' }}>
        <h2>Edit Notes for Application #{id}</h2>
        <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        rows={10}
        style={{ width: '100%', padding: '1rem', fontSize: '1rem' }}
        />
        <br />
        <button onClick={handleSave} style={{ marginTop: '1rem' }}>Save Notes</button>
    </div>
    );
}