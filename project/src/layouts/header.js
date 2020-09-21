import React, { useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";



const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexGrow: 1,
    overflow: 'hidden',
  },
  toolbar: {
    display: "flex",
    width: "100%",
    justifyContent: "flex-end",
  },
  appBar: {
    backgroundColor: "black",
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  title: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    backgroundColor: "yellow",
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },


}));

const Header = () => {
  const { user, setUser } = useContext(UserContext);
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const classes = useStyles();
  return (
    <>
      {/* <Sidebar /> */}
      <div className={classes.root} >
        <CssBaseline />
        <AppBar
          position="static"
          className={clsx(classes.appBar, { [classes.appBarShift]: open })}
        >
          <Toolbar>
            <IconButton
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <div className={classes.toolbar}>
              <RouterLink style={{ textDecoration: 'none' }} to="/">
                <div className="hvr">
                  <Button>Movies</Button>
                </div>
              </RouterLink>
              <RouterLink style={{ textDecoration: 'none' }} to="/games">
                <div className="hvr">
                  <Button  >Games</Button>
                </div>
              </RouterLink>
              <div className="hvr">
                {user && (
                  <RouterLink style={{ textDecoration: 'none' }} to="/movies-editor">
                    <Button style={{ color: "white" }} >Movie List Editor</Button>
                  </RouterLink>
                )}
              </div>
              <div className="hvr">
                {user && (
                  <RouterLink style={{ textDecoration: 'none' }} to="/games-editor">
                    <Button style={{ marginRight: "20px", color: "white" }} >Game List Editor</Button>
                  </RouterLink>
                )}
              </div>
              <div className="hvr">
                {user === null && (
                  <RouterLink style={{ textDecoration: 'none' }} to="/login">
                    <Button >Login</Button>
                  </RouterLink>
                )}
              </div>
              <div className="hvr">
                {user && (
                  <Button onClick={handleLogout} >
                    Logout
                  </Button>
                )}
              </div>
            </div>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{ paper: classes.drawerPaper }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? (<ChevronLeftIcon />) : (<ChevronRightIcon />)}
            </IconButton>
          </div>
          <Divider />
          <List className="hvrList">
            <RouterLink style={{ textDecoration: 'none' }} to="/movies-editor">
              <ListItem>
                <ListItemText primary={"Table Movies"} />
              </ListItem>
            </RouterLink>
          </List>
          <List className="hvrList">
            <RouterLink style={{ textDecoration: 'none' }} to="/games-editor">
              <ListItem>
                <ListItemText primary={"Table Games"} />
              </ListItem>
            </RouterLink>
          </List>
          <Divider />
          <List className="hvrList">
            <RouterLink style={{ textDecoration: 'none' }} to="/form-movies/create">
              <ListItem>
                <ListItemText primary={"Form Movies"} />
              </ListItem>
            </RouterLink>
          </List>
          <List className="hvrList">
            <RouterLink style={{ textDecoration: 'none' }} to="/form-games/create">
              <ListItem>
                <ListItemText primary={"Form Games"} />
              </ListItem>
            </RouterLink>
          </List>
          <Divider />
        </Drawer>
      </div>
    </>
  );
};

export default Header