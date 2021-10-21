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

const links = [
  {
    title: "My Notes",
    icon: <SubjectOutlined color="secondary" />,
    path: "/",
  },
  {
    title: "Add Note",
    icon: <AddCircleOutlineOutlined color="secondary" />,
    path: "/create",
  },
];

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
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const photo = useSelector((state) => state.auth.photo);
  const name = useSelector((state) => state.auth.name);

  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  // modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <Typography className={classes.date}>
            {format(new Date(), "do MMMM Y")}
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
          Notes
        </Typography>
        <List>
          {links.map((link) => (
            <ListItem
              button
              key={link.title}
              onClick={() => {
                history.push(link.path);
              }}
              className={
                location.pathname == link.path ? classes.activePage : null
              }
            >
              <ListItemIcon>{link.icon}</ListItemIcon>
              <ListItemText primary={link.title} />
            </ListItem>
          ))}
          <ListItem>
            <ListItemIcon>
              <CustomizedSwitches
                label="Dark mode"
                action={() => dispatch(darkModeActions.switch())}
              />
            </ListItemIcon>
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
