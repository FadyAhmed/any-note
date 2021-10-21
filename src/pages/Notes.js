import { Container } from "@material-ui/core";
import Masonry from "react-masonry-css";
import React, { useEffect, useState } from "react";
import Note from "../components/Note";

export default function Notes() {
  const [notes, setNotes] = useState([]);

  const deleteNoteHandler = (id) => {
    console.log(id);

    fetch("http://localhost:8000/notes/" + id, {
      method: "DELETE",
    }).then(() => {
      setNotes(notes.filter((note) => note.id != id));
    });
  };

  useEffect(() => {
    fetch("http://localhost:8000/notes")
      .then((res) => res.json())
      .then((data) => setNotes(data));
  }, []);

  return (
    <Container>
      <Masonry
        breakpointCols={{
          default: 3,
          1100: 2,
          700: 1,
        }}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {notes.map((note) => {
          return (
            <div className="grid-item">
              <Note note={note} deleteNote={deleteNoteHandler} />
            </div>
          );
        })}
      </Masonry>
    </Container>
  );
}
