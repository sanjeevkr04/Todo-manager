import React, {useState, useRef} from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const initialDialog = {
    open: false,
    data: {},
    defaultText: '',
    submit: null
}

function CustomDialog({dialogData, closeHandler}) {

    if(!dialogData){
        dialogData = initialDialog
    }

    const [text, setText] = useState(dialogData.defaultText) 

    function submit(e){ 
        e.preventDefault();
        dialogData.submit(text);
        closeHandler();
        setText("")
    }

    return (
        <Dialog open={dialogData.open} onClose={closeHandler} aria-labelledby="form-dialog-title" fullWidth maxWidth='sm'>
                <DialogTitle id="form-dialog-title">{dialogData.data.main}</DialogTitle>
                <form>
                <DialogContent>
                    <TextField 
                        autoFocus
                        margin="dense"
                        id="title"
                        label={dialogData.data.text}
                        type="text"
                        value={text}
                        onChange={e => setText(e.target.value)}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeHandler} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={submit} type="submit" color="primary">
                        {dialogData.data.submit}
                    </Button>
                </DialogActions>
                </form>
            </Dialog>
    )
}

export default CustomDialog;
