import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/icons/Menu'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import './Navbar.css'
import {useStore} from '../../Store'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
  },
  navbar: {
    backgroundColor: '#333 !important'
  }
}));


const AppNavbar = () => {
  const [store, dispatch] = useStore();
  const classes = useStyles();
  return(
    <div className={classes.root}>
      <AppBar position="sticky" className={classes.navbar}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <Menu />
          </IconButton>
          <Typography className={classes.title} variant="h6" >
            MueblesTEC
          </Typography>
          <Typography className={classes.menuButton} variant="h6" >
            Carrito {store.cart.length}
          </Typography> 
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default AppNavbar;