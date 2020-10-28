import React from 'react';
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

import Avatar from '@material-ui/core/Avatar';
import Logo from "../assets/images/logo.png";
import {NavLink} from "react-router-dom"

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
    placeItems: "center"
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  sideLogo:{
    width: "11rem",
    height: "3.5rem"
  }
}));

const ResponsiveDrawer = (props) => {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.myToolbar} > 
        <Avatar src={Logo} variant="square" className={classes.sideLogo} />
      </div>
      <List>
        <NavLink activeClassName="main-nav-active" to="/home">
          <ListItem button>
          <ListItemIcon><HomeIcon /></ListItemIcon>
          <ListItemText>Home</ListItemText>
        </ListItem>
        </NavLink>
        <NavLink activeClassName="main-nav-active" to="/about">
          <ListItem button>
          <ListItemIcon><InfoIcon /></ListItemIcon>
          <ListItemText>About Us</ListItemText>
        </ListItem>
        </NavLink>
        
        <NavLink activeClassName="main-nav-active" to="/menu">
          <ListItem button>
          <ListItemIcon><RestaurantMenuIcon /></ListItemIcon>
          <ListItemText>Menu</ListItemText>
        </ListItem>
        </NavLink>
        
        <NavLink activeClassName="main-nav-active" to="/contact">
          <ListItem button>
          <ListItemIcon><ContactSupportIcon /></ListItemIcon>
          <ListItemText>Contact Us</ListItemText>
        </ListItem>
        </NavLink>
        
        <NavLink activeClassName="main-nav-active" to="/favorites">
          <ListItem button>
          <ListItemIcon><FavoriteIcon /></ListItemIcon>
          <ListItemText>Favorites</ListItemText>
        </ListItem>
        </NavLink>
        
        <NavLink activeClassName="main-nav-active" to="/users">
          <ListItem button>
          <ListItemIcon><PeopleIcon /></ListItemIcon>
          <ListItemText>Users</ListItemText>
        </ListItem>
        </NavLink>
        
        <NavLink activeClassName="main-nav-active" to="/feedback">
          <ListItem button>
          <ListItemIcon><FeedbackIcon /></ListItemIcon>
          <ListItemText>Feedback</ListItemText>
        </ListItem>  
        </NavLink>
              
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

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
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
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
    </div>
  );
}

export default ResponsiveDrawer;
