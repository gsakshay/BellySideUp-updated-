import React, { useState, useEffect, useContext } from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import PeopleIcon from '@material-ui/icons/People';
import FeedbackIcon from '@material-ui/icons/Feedback';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import Avatar from '@material-ui/core/Avatar';
import Logo from "../assets/images/logo.png";
import { NavLink, useHistory, Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';

import LoginDialog from "../Dialogs/Login"
import RegisterDialog from "../Dialogs/Register"

import { Context } from "../Context/ContextProvier"

import { axiosGet } from "../config/axiosClient"

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
    },
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  myToolbar: {
    display: "grid",
    placeItems: "center",
    cursor: "pointer",
    height: "4rem"
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  sideLogo: {
    width: "11rem",
    height: "3.5rem"
  },
  loginButton: {
    marginLeft: "auto",
    marginRight: "1rem"
  },
  drawerLogo: {
    fontWeight: "bold",
    fontSize: "1.35rem"
  },
  logout: {
    marginTop: "5rem"
  },
  drawerNavigations: {
    padding: "3rem 0 0 0"
  },
  navs: {
    paddingLeft: "2rem"
  }
}));

const refreshPage = () => {
  window.location.reload();
}

const ResponsiveDrawer = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [openLoginDialog, setOpenLoginDialog] = useState(false);
  const [openRegisterDialog, setOpenRegisterDialog] = useState(false);

  const history = useHistory()

  const context = useContext(Context);
  const user = context.Profile;
  const { username, admin } = user.state;

  const favorites = context.Favorites;

  const { favoriteList } = favorites.state;

  const getAllFavorites = () => {
    axiosGet(`users/favorites/all`)
      .then(res => {
        if (res.status === 200) {
          favorites.dispatch({
            type: "fav-list",
            value: res.data
          })
        }
      })
      .catch(err => console.log(err, "there is an error"))
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    getUserDetails()
    getAllFavorites()
  }, [])

  const getUserDetails = () => {
    if (localStorage.getItem("auth_token")) {
      axiosGet(`users/user/single`)
        .then(res => {
          if (res.status === 200) {
            user.dispatch({
              type: "all", value: res.data
            })
          }
        })
    }
  }

  const drawer = (
    <div>
      <div className={classes.myToolbar} >
        <Link to="/">
          <Typography className={classes.drawerLogo} color="secondary">Belly Side up <FastfoodIcon color="primary" /> </Typography>
        </Link>
      </div>
      <div className={classes.drawerNavigations}>
        <List>
          <NavLink activeClassName="main-nav-active" to="/home">
            <ListItem className={classes.navs} button>
              <ListItemIcon color="primary"><HomeIcon /></ListItemIcon>
              <ListItemText color="secondary">Home</ListItemText>
            </ListItem>
          </NavLink>
          <NavLink activeClassName="main-nav-active" to="/about">
            <ListItem className={classes.navs} button>
              <ListItemIcon color="primary"><InfoIcon /></ListItemIcon>
              <ListItemText color="secondary">About Us</ListItemText>
            </ListItem>
          </NavLink>

          <NavLink activeClassName="main-nav-active" to="/menu">
            <ListItem className={classes.navs} button>
              <ListItemIcon color="secondary"><RestaurantMenuIcon /></ListItemIcon>
              <ListItemText color="secondary">Menu</ListItemText>
            </ListItem>
          </NavLink>

          {
            (username && !admin) && <NavLink activeClassName="main-nav-active" to="/contact">
              <ListItem className={classes.navs} button>
                <ListItemIcon color="secondary"><ContactSupportIcon /></ListItemIcon>
                <ListItemText color="secondary">Contact Us</ListItemText>
              </ListItem>
            </NavLink>
          }

          {
            username && <NavLink activeClassName="main-nav-active" to="/favorites">
              <ListItem className={classes.navs} button>
                <ListItemIcon color="secondary"><FavoriteIcon /></ListItemIcon>
                <ListItemText color="secondary">Favorites</ListItemText>
              </ListItem>
            </NavLink>
          }

          {
            admin && <NavLink activeClassName="main-nav-active" to="/users">
              <ListItem className={classes.navs} button>
                <ListItemIcon color="secondary"><PeopleIcon /></ListItemIcon>
                <ListItemText color="secondary">Users</ListItemText>
              </ListItem>
            </NavLink>
          }

          {
            username && <NavLink activeClassName="main-nav-active" to="/orders">
              <ListItem className={classes.navs} button>
                <ListItemIcon color="secondary"><LocalMallIcon /></ListItemIcon>
                <ListItemText color="secondary">Orders</ListItemText>
              </ListItem>
            </NavLink>
          }

          {
            admin && <NavLink activeClassName="main-nav-active" to="/feedback">
              <ListItem className={classes.navs} button>
                <ListItemIcon color="secondary"><FeedbackIcon /></ListItemIcon>
                <ListItemText color="secondary">Feedbacks</ListItemText>
              </ListItem>
            </NavLink>
          }

        </List>
      </div>
      {
        username && <div className={classes.logout}>
          <Typography>
            Log out
        </Typography>
          <IconButton>
            <ExitToAppIcon color="secondary" onClick={() => {
              history.push("/home")
              localStorage.clear();
              refreshPage();
              user.dispatch({ type: "reset", value: {} })
            }} />
          </IconButton>
        </div>
      }
    </div>
  );

  /* const container = window !== undefined ? () => window().document.body : undefined; */

  return (
    <div className={`${classes.root}`}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" noWrap>
            Belly Side Up
          </Typography>
          {
            username ? <Chip className={classes.loginButton} color="secondary" avatar={<Avatar alt={username} />} label={username} /> :
              <><Button className={classes.loginButton} variant="outlined" color="secondary" onClick={() => setOpenLoginDialog(true)}>
                Log In
          </Button>
                <Button className={classes.register} variant="contained" color="secondary" onClick={() => history.push('/register')}>
                  Register
            </Button></>
          }

        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            /* container={container} */
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
      </main>
      <LoginDialog
        open={openLoginDialog}
        setOpen={setOpenLoginDialog}
      />
      <RegisterDialog
        open={openRegisterDialog}
        setOpen={setOpenRegisterDialog}
      />
    </div>
  );
}

export default ResponsiveDrawer;
