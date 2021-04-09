import { CircularProgress, makeStyles } from '@material-ui/core'
import React from 'react'
import TodoIcon from '../icons/Todo.png'

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        '& img': {
            marginBottom: theme.spacing(2)
        }
    }
}));

function LoadingPage() {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <img src={TodoIcon} alt='TODO Manager' width={128}/>
            <CircularProgress/>
        </div>
    )
}

export default LoadingPage
