import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

function App() {
  const [notes, setNotes] = useState([]);

  function fetchNotes() {
    axios.get("https://notes-pbcr.onrender.com//api/notes").then((res) => {
      setNotes(res.data.notes);
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const { title, description } = e.target.elements;
    axios
      .post("https://notes-pbcr.onrender.com//api/notes", {
        title: title.value,
        description: description.value,
      })
      .then((res) => {
        console.log(res.data);
        fetchNotes();
      });
  }

  function handleDeletion(noteId) {
    console.log(noteId);
    axios
      .delete("https://notes-pbcr.onrender.com//api/notes/" + noteId)
      .then((res) => {
        console.log(res.data.message);
        fetchNotes();
      });
  }

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <main>
      <form className="note-create-form" onSubmit={handleSubmit}>
        <input name="title" type="text" placeholder="Enter title" />
        <input name="description" type="text" placeholder="Enter description" />
        <button>Create Note</button>
      </form>

      <div className="notes">
        {notes.map((note) => {
          return (
            <div key={note._id} className="note">
              <h1>{note.title}</h1>
              <p>{note.description}</p>
              <button onClick={() => handleDeletion(note._id)}>delete</button>
            </div>
          );
        })}
      </div>
    </main>
  );
}

export default App;
