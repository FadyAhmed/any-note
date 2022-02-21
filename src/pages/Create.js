import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import { CircularProgress, Box } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import SendIcon from "@material-ui/icons/Send";
import { makeStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import Registeration from "../pages/Registeration";
import text from "../text";
import { FormattedMessage } from "react-intl";

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: "block",
  },
});

export default function Create() {
  const classes = useStyles();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);
  const [isLoading, setIsLodaing] = useState(false);
  const [category, setCategory] = useState("2");
  const history = useHistory();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const language = useSelector((state) => state.language.language);
  const textContainer = useSelector((state) => state.language.textContainer);

  const handleSubmit = (e) => {
    e.preventDefault();
    setTitleError(false);
    setDetailsError(false);

    if (title == "") {
      setTitleError(true);
    }
    if (details == "") {
      setDetailsError(true);
    }
    if (isLoggedIn) {
      if (title && details) {
        setIsLodaing(true);

        fetch(
          "https://reactcoursetest-b6d20-default-rtdb.firebaseio.com/notes.json/",
          {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ title, details, category }),
          }
        ).then(() => {
          setIsLodaing(false);
          history.push("/");
        });
      }
    }
  };

  return (
    <Container size="sm">
      <Typography variant="h6" color="textPrimary" component="h2">
        <FormattedMessage
          id="createNewNote"
          value={{ language }}
        ></FormattedMessage>
      </Typography>

      <form noValidate autoComplete="on" onSubmit={handleSubmit}>
        <TextField
          className={classes.field}
          onChange={(e) => {
            setTitle(e.target.value);
            setTitleError(false);
          }}
          label={textContainer.noteTitle}
          variant="outlined"
          color="primary"
          fullWidth
          required
          helperText={titleError ? "Empty" : ""}
          error={titleError}
        />
        <TextField
          className={classes.field}
          onChange={(e) => {
            setDetails(e.target.value);
            if (details == "") {
              setDetailsError(false);
            }
          }}
          label={textContainer.details}
          variant="outlined"
          color="primary"
          multiline
          rows={4}
          fullWidth
          required
          helperText={detailsError ? "Empty" : ""}
          error={detailsError}
          InputLabelProps={{}}
        />
        {/* <FormControl className={classes.field}>
          <FormLabel> {textContainer.noteCategory}</FormLabel>
          <RadioGroup
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <FormControlLabel
              value="1"
              control={<Radio />}
              label={textContainer.categories[1]}
            />
            <FormControlLabel
              value="2"
              control={<Radio />}
              label={textContainer.categories[2]}
            />
            <FormControlLabel
              value="3"
              control={<Radio />}
              label={textContainer.categories[3]}
            />
            <FormControlLabel
              value="4"
              control={<Radio />}
              label={textContainer.categories[4]}
            />
          </RadioGroup>
        </FormControl> */}

        {isLoading ? (
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        ) : (
          <Button
            type="submit"
            color="secondary"
            variant="contained"
            onClick={!isLoggedIn ? handleOpen : null}
            endIcon={
              <SendIcon
                style={
                  language == "ar"
                    ? {
                        transform: `rotateY(180deg)`,
                        marginRight: 12,
                      }
                    : {}
                }
              />
            }
          >
            {textContainer.submit}
          </Button>
        )}
      </form>

      <Registeration handleClose={handleClose} open={open} />
    </Container>
  );
}
