import { Button, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        height: '100vh',
        justifyContent: 'center',
    },
    t1: {
        fontSize: 128,
        fontFamily: 'Roboto'
    },
    t2: {
        margin: theme.spacing(2),
        fontSize: 64
    },
    button: {
        margin: theme.spacing(2)
    }
}))

function Page404() {
    const classes = useStyles();
    const history = useHistory();
    return (
        <div className={classes.root}>
            <Typography variant='h2' className={classes.t1}>404</Typography>
            <Typography varient='h3' className={classes.t2}>Page not found</Typography>
            <Button variant='outlined' color='primary' className={classes.button} onClick={() => history.push('/')} >Go to home page</Button>
        </div>
    )
}

export default Page404
