import { Container, Typography } from "@material-ui/core";
import Masonry from "react-masonry-css";
import React, { useEffect, useState } from "react";
import Note from "../components/Note";
import { useSelector } from "react-redux";

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const textContainer = useSelector((state) => state.language.textContainer);

  const deleteNoteHandler = (id) => {
    fetch(
      `https://reactcoursetest-b6d20-default-rtdb.firebaseio.com/notes/${id}.json`,
      {
        method: "DELETE",
      }
    ).then(() => {
      setNotes(notes.filter((note) => note.id != id));
    });
  };

  useEffect(() => {
    fetch(
      "https://reactcoursetest-b6d20-default-rtdb.firebaseio.com/notes.json/"
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        let dummyNotes = [];
        for (const note in data) {
          let fetchedNote = data[note];
          fetchedNote.id = note;
          dummyNotes.push(fetchedNote);
        }
        setNotes(dummyNotes);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  if (notes.length !== 0) {
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
  } else {
    return (
      <Container style={{display:'flex', justifyContent: "center" }}>
        <Typography>{textContainer.noNotesYet}</Typography>
      </Container>
    );
  }
}
