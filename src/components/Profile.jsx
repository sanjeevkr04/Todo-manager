import { Avatar, Button, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import { addGoogleAccount, signOut } from '../firebase';

const useStyles = makeStyles(theme => ({
    profile: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        flexDirection: 'column',
        padding: theme.spacing(2),
    },
    avtar: {
        width: theme.spacing(8),
        height: theme.spacing(8),
        marginBottom: theme.spacing(1)
    },
    button: {
        marginTop: theme.spacing(3)
    }
}))

const Profile = React.forwardRef(({user, setAnchorEl}, ref) => {

    const classes = useStyles();
    
    const clickHandler = () => {
        setAnchorEl(null);
        user.isAnonymous? addGoogleAccount(): signOut();
    }

    return (
        <div className={classes.profile}>
            <Avatar className={classes.avtar} src={user.photoURL} alt={user.displayName}/>
            <Typography variant='h6' >{user.displayName}</Typography>
            <Button className={classes.button} onClick={clickHandler} color='primary' variant='outlined'>{user.isAnonymous? 'Sign in' : 'Sign out'}</Button>
        </div>
    )
})

export default Profile
