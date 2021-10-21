import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import { DeleteOutlined } from "@material-ui/icons";
import { Avatar, makeStyles, Typography } from "@material-ui/core";
import { blue, green, pink, yellow } from "@material-ui/core/colors";

const useStyles = makeStyles({
  note: {
    // border: ({ note }) => {
    //   if (note.category == "work") {
    //     return "1px solid red";
    //   }
    // },
  },
  avatar: {
    backgroundColor: ({ note }) => {
      if (note.category == "work") return yellow[700];
      if (note.category == "money") return green[500];
      if (note.category == "todos") return pink[500];
      return blue[700];
    },
  },
});

const Note = ({ note, deleteNote }) => {
  const classes = useStyles({ note: note });

  const deleteNoteHandler = (id) => {
    deleteNote(id);
  };

  return (
    <Card elevation={1} className={classes.note}>
      <CardHeader
        avatar={
          <Avatar className={classes.avatar}>
            {note.category.charAt(0).toUpperCase()}
          </Avatar>
        }
        action={
          <IconButton
            aria-label="settings"
            onClick={deleteNoteHandler.bind(null, note.id)}
          >
            <DeleteOutlined></DeleteOutlined>
          </IconButton>
        }
        title={note.title}
        subheader={note.category}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary">
          {note.details}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Note;
