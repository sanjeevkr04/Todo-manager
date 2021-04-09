import {Fragment, useState} from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Switch from '@material-ui/core/Switch';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import InvertColorsIcon from '@material-ui/icons/InvertColors';
import GitHubIcon from '@material-ui/icons/GitHub';
import {useUserState} from '../hooks/useUserState';
import {signInWithGoogle, signOut, anonymousAuthentication} from '../firebase';
import { Button, Dialog, DialogContent, DialogTitle, Tooltip } from '@material-ui/core';
import Profile from './Profile';

const useStyles = makeStyles(theme => ({
  title: {
    fontWeight: 700,
    flexGrow: 1,
  },
  avatar: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  signIn: {
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '2px solid white',
    padding: theme.spacing(1),
    textAlign: 'center'
  },
  signIn_text: {
    fontWeight: 700,
    marginLeft: theme.spacing(1),
  },
  signIn_content: {
    display: 'flex',
    flexDirection: 'column'
  },
  button: {
    margin: theme.spacing(1),
  },
  menu: {
    marginTop: theme.spacing(2)
  },
  switch: {
    marginLeft: theme.spacing(4),
  },
  icons: {
    marginRight: theme.spacing(2)
  },
  ["MuiIconButton-root"]: {
    color: 'red'
  }
}));

function Header() {

  const classes = useStyles();
  const [{user}] = useUserState();
  const [anchorEl, setAnchorEl] = useState(null);

  return (
    <AppBar position='fixed'>
      <Toolbar>
        <Typography variant='h5' className={classes.title}>
          Todo manager
        </Typography>
        <Tooltip title="Github repository">
          <IconButton href='https://github.com/sanjeevkr04/Todo-manager' target='_blank' size='small' style={{color: 'white'}} className={classes.icons}>
            <GitHubIcon/>
          </IconButton>
        </Tooltip>
        <IconButton size='small' onClick={e => setAnchorEl(e.currentTarget)}>
          <Avatar src={user.photoURL} alt={user.displayName} className={classes.avatar}/>
        </IconButton>
        <Menu
          id='appbar-menu'
          anchorEl={anchorEl}
          getContentAnchorEl={null}
          anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
          keepMounted
          transformOrigin={{vertical: 'top', horizontal: 'right'}}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
          className={classes.menu}
        >
          <Profile user={user} setAnchorEl={setAnchorEl}/>
        </Menu>
      </Toolbar>
    </AppBar>
  )
}

export default Header
