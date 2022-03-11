import { Container, Typography } from "@material-ui/core";
import Masonry from "react-masonry-css";
import React, { useEffect, useState } from "react";
import Note from "../components/Note";
import { useSelector } from "react-redux";
import { Snackbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => {
  return {
    snackbar: {
      "& .MuiSnackbarContent-root": {
        backgroundColor: theme.palette.snackBarColor,
        color: "#000",
      },
    },
  };
});

export default function Notes() {
  const isDark = useSelector((state) => state.dark.isDark);
  const [notes, setNotes] = useState([]);
  const textContainer = useSelector((state) => state.language.textContainer);
  const classes = useStyles({ isDark });

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
        <Snackbar
          className={classes.snackbar}
          open={true}
          autoHideDuration={600000}
          message="asd"
        ></Snackbar>
      </Container>
    );
  } else {
    return (
      <Container style={{ display: "flex", justifyContent: "center" }}>
        <Typography>{textContainer.noNotesYet}</Typography>
      </Container>
    );
  }
}
