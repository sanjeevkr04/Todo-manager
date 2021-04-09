import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography'
import {IconButton, fade, makeStyles, Menu, MenuItem, Tooltip } from '@material-ui/core'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import HourglassFullTwoToneIcon from '@material-ui/icons/HourglassFullTwoTone';
import CheckCircleTwoToneIcon from '@material-ui/icons/CheckCircleTwoTone';
import AssignmentIcon from '@material-ui/icons/Assignment';
import DeleteIcon from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/Add'
import { useState } from 'react';
import {useHistory} from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'inline-grid',
        margin: theme.spacing(2),
    },
    card: {
        width: theme.spacing(32),
        height: theme.spacing(22),
        padding: theme.spacing(2),
        display: 'flex',
        '&:hover': {
            backgroundColor: fade(theme.palette.common.black, 0.02),
        },
    },
    addCard: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        cursor: 'pointer',
        [theme.breakpoints.down('xs')]: {
            height: theme.spacing(8),
            flexDirection: 'row',
        }
    },
    data: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
    },
    info: {
        display: 'flex',
        justifyContent: 'space-between',
        maxWidth: theme.spacing(28),
    },
    infoData: {
        display: 'flex',
        alignItems: 'center'
    },
    title: {
        fontWeight: 600,
        marginBottom: theme.spacing(1),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        cursor: 'pointer',
        flex: 1,
        overflow: 'auto',
        maxHeight: theme.spacing(13),
        scrollbarWidth: 'none',
        '-ms-overflow-style': 'none',
        '&::-webkit-scrollbar': {
            display: 'none'
        }
    },
    button: {
        boxShadow: theme.shadows[1],
    }
}));

function ProjectCard({data, onRename, deleteHandler}) {

    const classes = useStyles();
    const [anchorE1, setAnchorE1] = useState(null)
    const history = useHistory();

    const actions = {
        rename: function() {
            setAnchorE1(null)
            onRename()
        },
        delete: function() {
            deleteHandler()
            setAnchorE1(null)
        }
    }

    return (
        <div className={classes.root}>
            <Card className={classes.card}>
                <div className={classes.data}>
                    <Typography variant='h6'  onClick={() => history.push(`/todos/${data._id}`)} className={classes.title}>
                        {data.title}
                    </Typography>
                    <div className={classes.info}>
                        <Tooltip title="Remaining tasks">
                            <div className={classes.infoData} style={{color: 'lightcoral'}}>
                                <AssignmentIcon fontSize='small'></AssignmentIcon>
                                <Typography>{data.todos}</Typography>
                            </div>
                        </Tooltip>
                        <Tooltip title="In progress tasks">
                            <div className={classes.infoData} style={{color: 'blue'}}>
                                <HourglassFullTwoToneIcon fontSize='small'></HourglassFullTwoToneIcon>
                                <Typography>{data.in_process}</Typography>
                            </div>
                        </Tooltip>
                        <Tooltip title="Completed tasks">
                            <div className={classes.infoData}>
                                <CheckCircleTwoToneIcon  style={{color: 'green'}}></CheckCircleTwoToneIcon>
                                <Typography>{data.completed}</Typography>
                            </div>
                        </Tooltip>
                        <Tooltip title="More options">
                            <IconButton className={classes.button} onClick={(e) => setAnchorE1(e.currentTarget)} size='small'>
                                {anchorE1 ?
                                <CloseIcon fontSize='small'></CloseIcon> :
                                <MoreHorizIcon fontSize='small'></MoreHorizIcon>
                                }
                            </IconButton>
                        </Tooltip>
                    </div>
                </div>
                <Menu
                    id='project-options'
                    anchorEl={anchorE1}
                    getContentAnchorEl={null}
                    anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                    keepMounted
                    transformOrigin={{vertical:'bottom', horizontal:'center'}}
                    open={Boolean(anchorE1)}
                    onClose={() => setAnchorE1(null)}
                >
                    <MenuItem onClick={actions.rename}>
                            <EditIcon fontSize='small'/>
                    </MenuItem>
                    <MenuItem onClick={actions.delete}>
                            <DeleteIcon fontSize='small'/>
                    </MenuItem>
                </Menu>
            </Card>
        </div>
    )
}

export function AddCard({onClick}){

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Card className={`${classes.card} ${classes.addCard}`} onClick={onClick}>
                <AddIcon fontSize='large'/>
                <Typography variant='inherit'>
                    Add new
                </Typography>
            </Card>
        </div>
    )
}

export default ProjectCard
