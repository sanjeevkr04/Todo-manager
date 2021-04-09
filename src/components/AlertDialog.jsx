import { Button, Dialog, DialogActions, DialogContent, makeStyles, Typography } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles(theme => ({
    delete: {
        backgroundColor: 'red',
        color: 'white',
        '&:hover': {
            backgroundColor: '#d90000'
        }
    }
}))

function AlertDialog({text, open, closeHandler, deleteHandler}) {

    const classes = useStyles();

    return (
        <Dialog open={open} onClose={closeHandler} area-lablleby='delete dialog' fullWidth maxWidth='sm'>
            <form>
                <DialogContent>
                    <Typography variant='h6'>
                        <b>Delete  </b>
                        "<span style={{color: 'red'}}>{text}</span>"
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button className={classes.delete} onClick={() => {deleteHandler();closeHandler()}} variant='contained' >Yes</Button>
                    <Button onClick={closeHandler} variant='contained' color="primary">No</Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}

export default AlertDialog
