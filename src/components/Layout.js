import {
  AppBar,
  Avatar,
  Backdrop,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Modal,
  Toolbar,
  Typography,
  Box,
  Fade,
} from "@material-ui/core";
import { purple, yellow } from "@material-ui/core/colors";
import {
  AddCircleOutlineOutlined,
  Person,
  SubjectOutlined,
  WbSunny,
} from "@material-ui/icons";
import { format } from "date-fns";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import Registeration from "../pages/Registeration";
import { darkModeActions } from "../store/dark-slice";
import CustomizedSwitches from "./Switch";
import { languageActions } from "../store/language-slice";
import { FormattedDate } from "react-intl";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => {
  return {
    root: {
      display: "flex",
    },
    page: {
      width: "100%",
      padding: theme.spacing(3),
      height: "100%",
    },
    drawer: {
      width: drawerWidth,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    activePage: {
      background: theme.palette.activeTile,
    },
    title: {
      padding: theme.spacing(2),
    },
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
      background: theme.palette.appBar,
    },
    toolbar: theme.mixins.toolbar,
    date: {
      flexGrow: 1,
    },
    avatar: {
      "&:hover": {
        cursor: "pointer",
      },
      width: theme.spacing(5),
      height: theme.spacing(5),
      background: theme.palette.secondary.main,
    },
    aroundAvatar: {
      background: "transparent",
      "&:hover": {
        background: theme.palette.avatarIconHover,
      },
      width: theme.spacing(5.5),
      height: theme.spacing(5.5),
    },
  };
});

const Layout = (props) => {
  const language = useSelector((state) => state.language.language);
  const textContainer = useSelector((state) => state.language.textContainer);

  const links = [
    {
      title: textContainer.myNotes,
      icon: <SubjectOutlined color="secondary" />,
      path: "/",
    },
    {
      title: textContainer.addNote,
      icon: <AddCircleOutlineOutlined color="secondary" />,
      path: "/create",
    },
  ];
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const photo = useSelector((state) => state.auth.photo);
  const name = useSelector((state) => state.auth.name);
  const isDark = useSelector((state) => state.dark.isDark);

  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  // modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const date = new Date();
  return (
    <div className={classes.root}>
      <AppBar
        className={classes.appBar}
        style={{ left: language == "en" ? drawerWidth : 0 }}
      >
        <Toolbar>
          <Typography className={classes.date}>
            <FormattedDate
              value={date}
              year="numeric"
              month="long"
              day="numeric"
              weekday="long"
            />
          </Typography>

          <Avatar className={classes.aroundAvatar}>
            <Avatar
              src={photo ?? ""}
              className={classes.avatar}
              onClick={handleOpen}
              sx={{ bgcolor: yellow[500] }}
            >
              {name != null ? name.charAt(0) : <Person />}
            </Avatar>
          </Avatar>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        anchor="left"
        classes={{ paper: classes.drawerPaper }}
      >
        <Typography variant="h5" className={classes.title}>
          {textContainer.siteName}
        </Typography>
        <List>
          {links.map((link) => (
            <ListItem
              button
              key={link.title}
              divider
              onClick={() => {
                history.push(link.path);
              }}
              className={
                location.pathname == link.path ? classes.activePage : null
              }
            >
              <ListItemIcon>{link.icon}</ListItemIcon>
              <ListItemText
                primary={link.title}
                style={{
                  display: 'flex'
                }}
              />
            </ListItem>
          ))}
          <ListItem>
            <ListItemIcon>
              <CustomizedSwitches
                label={
                  isDark ? textContainer.lightMode : textContainer.darkMode
                }
                action={() => dispatch(darkModeActions.switch())}
              />
            </ListItemIcon>
          </ListItem>
          <ListItem
            button
            onClick={() => {
              if (language == "ar")
                dispatch(languageActions.switchLanguage({ language: "en" }));
              else dispatch(languageActions.switchLanguage({ language: "ar" }));
            }}
          >
            {language == "ar" ? "En" : "ع"}
          </ListItem>
        </List>
      </Drawer>

      <Registeration handleClose={handleClose} open={open} />

      <div className={classes.page}>
        <div className={classes.toolbar}></div>
        {props.children}
      </div>
    </div>
  );
};

export default Layout;
