import {
  AppBar,
  Avatar,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import { yellow } from "@material-ui/core/colors";
import {
  AddCircleOutlineOutlined,
  Person,
  SubjectOutlined,
  Menu,
} from "@material-ui/icons";
import { getAuth } from "firebase/auth";
import { useState } from "react";
import { FormattedDate } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import Registeration from "../pages/Registeration";
import { darkModeActions } from "../store/dark-slice";
import { languageActions } from "../store/language-slice";
import CustomizedSwitches from "./Switch";

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
      direction: ({ language }) => {
        if (language === "ar") return "rtl";
        else return "ltr;";
      },
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
  const mobile = useMediaQuery("(max-width:700px)");

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

  const classes = useStyles({ language });
  const history = useHistory();
  const location = useLocation();

  // modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const handleDrawerOpen = () => setDrawerOpen(true);
  const handleDrawerClose = () => setDrawerOpen(false);

  const date = new Date();

  return (
    <div className={classes.root}>
      <AppBar
        className={classes.appBar}
        style={{
          left: !mobile ? (language == "en" ? drawerWidth : 0) : 0,
          width: mobile ? "100%" : `calc(100% - ${drawerWidth}px)`,
        }}
      >
        <Toolbar>
          {mobile ? (
            <IconButton onClick={handleDrawerOpen}>
              <Menu />
            </IconButton>
          ) : null}
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
        variant={mobile ? "temporary" : "permanent"}
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerClose}
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
                handleDrawerClose();
              }}
              className={
                location.pathname == link.path ? classes.activePage : null
              }
            >
              <ListItemIcon>{link.icon}</ListItemIcon>
              <ListItemText
                primary={link.title}
                style={{
                  display: "flex",
                }}
              />
            </ListItem>
          ))}
          <ListItem>
            <CustomizedSwitches
              label={isDark ? textContainer.lightMode : textContainer.darkMode}
              action={() => {
                dispatch(darkModeActions.switch());
              }}
            />
          </ListItem>
          <ListItem
            button
            onClick={() => {
              if (language == "ar")
                dispatch(languageActions.switchLanguage({ language: "en" }));
              else dispatch(languageActions.switchLanguage({ language: "ar" }));
            }}
          >
            {language == "ar" ? "English" : "عربي"}
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
