import { Avatar, makeStyles, Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import { blue, green, pink, yellow } from "@material-ui/core/colors";
import IconButton from "@material-ui/core/IconButton";
import { DeleteOutlined } from "@material-ui/icons";
import { useSelector } from "react-redux";

const useStyles = makeStyles({
  cardHeader: {
    "& .MuiCardHeader-avatar": {
      marginLeft: ({ language }) => {
        if (language === "en") return 0;
        else return 16;
      },
      marginRight: ({ language }) => {
        if (language === "ar") return 0;
        else return 16;
      },
    },
  },
  note: {
    // border: ({ note }) => {
    //   if (note.category == "work") {
    //     return "1px solid red";
    //   }
    // },
  },
  avatar: {
    backgroundColor: ({ note }) => {
      if (note.category == "1") return yellow[700];
      if (note.category == "2") return green[500];
      if (note.category == "3") return pink[500];
      return blue[700];
    },
  },
});

const Note = ({ note, deleteNote }) => {
  const language = useSelector((state) => state.language.language);
  const textContainer = useSelector((state) => state.language.textContainer);
  const classes = useStyles({ note: note, language: language });

  const deleteNoteHandler = (id) => {
    deleteNote(id);
  };

  return (
    <Card elevation={1} className={classes.note}>
      <CardHeader
        className={classes.cardHeader}
        avatar={
          <Avatar className={classes.avatar}>
            {textContainer.categories[note.category].charAt(0).toUpperCase()}
          </Avatar>
        }
        action={
          <IconButton
            aria-label="settings"
            onClick={deleteNoteHandler.bind(this, note.id)}
          >
            <DeleteOutlined></DeleteOutlined>
          </IconButton>
        }
        title={note.title}
        subheader={textContainer.categories[note.category]}
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
