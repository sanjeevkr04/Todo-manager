import React, {useState} from 'react'
import Card from '@material-ui/core/Card';
import { IconButton, ListItemIcon, ListItemText, makeStyles, Menu, MenuItem, Typography } from '@material-ui/core';
import { Draggable } from 'react-beautiful-dnd';
import DeleteIcon from '@material-ui/icons/Delete';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import EditIcon from '@material-ui/icons/Edit';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import HourglassFullTwoToneIcon from '@material-ui/icons/HourglassFullTwoTone';
import CheckCircleTwoToneIcon from '@material-ui/icons/CheckCircleTwoTone';
import AssignmentIcon from '@material-ui/icons/Assignment';

const useStyles = makeStyles(theme => ({
    card: {
        margin: theme.spacing(1),
        paddingLeft: 0,
        display: 'flex',
        alignItems: 'center',
        '& .hidden': {
            display: 'none'
        },
        '&:hover .hidden': {
            display: 'block'
        },
        [theme.breakpoints.down('sm')]: {
            '&:hover .hidden': {
                display: 'none'
            }
        }
    },
    title: {
        flex: 1,
        padding: theme.spacing(0.5, 0),
        minHeight: theme.spacing(4),
        marginLeft: theme.spacing(1),
        fontSize: 18
    },
    options: {
        display: 'none',
        [theme.breakpoints.down('sm')]:{
            display: 'block'
        }
    },
    menuTitle: {
        color: 'gray',
        borderTop: '1px solid',
        padding: theme.spacing(0, 1),
        marginTop: theme.spacing(1)
    },
}))

function Todo({todo, max, index, boardId, actions}) {

    const classes = useStyles();
    const [anchorE1, setAnchorE1] = useState(null)

    const menuActions = {
        move: (destId, destIndex) => {
            setAnchorE1(null);
            actions.update({
                droppableId: boardId,
                index: index
            },{
                droppableId: destId,
                index: destIndex
            })
        },
        edit: () => {
            setAnchorE1(null);
            actions.edit(todo);
        },
        delete: () => {
            setAnchorE1(null);
            actions.delete(todo);
        }
    }

    return (
        <Draggable key={todo._id} draggableId={todo._id} index={index}>
            {(provided, snapshot) => (
                <React.Fragment>
                <Card 
                    className={classes.card}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{...provided.draggableProps.style, backgroundColor: snapshot.isDragging? '#3a84bd': '#00f000'}}
                >
                    <DragIndicatorIcon/>
                    <Typography className={classes.title}>
                        {todo.title}
                    </Typography>
                    <IconButton className='hidden' onClick={() => actions.edit(todo)} size='small'>
                        <EditIcon/>
                    </IconButton>
                    <IconButton className='hidden' onClick={() => actions.delete(todo)} size='small'>
                        <DeleteIcon/>
                    </IconButton>
                    <IconButton className={classes.options} onClick={(e) => {setAnchorE1(e.currentTarget)}} size="small">
                        <MoreVertIcon/>
                    </IconButton>
                </Card>
                <Menu
                    id={`Todo-${todo._id}`}
                    anchorEl={anchorE1}
                    getContentAnchorEl={null}
                    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                    keepMounted
                    transformOrigin={{horizontal: 'right', vertical: 'top'}}
                    open={Boolean(anchorE1)}
                    onClose={() => {setAnchorE1(null)}}
                >
                    <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
                        <IconButton onClick={() => menuActions.move(boardId, index-1)} disabled={index === 0} size='small'><ArrowUpwardIcon/></IconButton>
                        <IconButton onClick={() => menuActions.move(boardId, index+1)} disabled={index === max-1} size='small'><ArrowDownwardIcon/></IconButton>
                    </div>
                    <Typography className={classes.menuTitle}>Move to</Typography>
                    <MenuItem onClick={() => menuActions.move('todos', 0)} style={{display: boardId === 'todos' ? 'none' : 'flex', color: 'lightcoral'}}>
                        <ListItemIcon><AssignmentIcon style={{color: 'lightcoral'}} fontSize='small'/></ListItemIcon>
                        <ListItemText primary="Todos"/>
                    </MenuItem>
                    <MenuItem onClick={() => menuActions.move('in_process', 0)} style={{display: boardId === 'in_process' ? 'none' : 'flex', color: 'blue'}}>
                        <ListItemIcon><HourglassFullTwoToneIcon style={{color: 'blue'}} fontSize='small'/></ListItemIcon>
                        <ListItemText primary="In progress"/>
                    </MenuItem>
                    <MenuItem onClick={() => menuActions.move('completed', 0)} style={{display: boardId === 'completed' ? 'none' : 'flex', color: 'green'}}>
                        <ListItemIcon><CheckCircleTwoToneIcon style={{color: 'green'}} fontSize='small'/></ListItemIcon>
                        <ListItemText primary="Completed"/>
                    </MenuItem>
                    <Typography className={classes.menuTitle}>Actions</Typography>
                    <MenuItem onClick={menuActions.edit}>
                        <ListItemIcon><EditIcon fontSize='small'/></ListItemIcon>
                        <ListItemText primary='Edit'/>
                    </MenuItem>
                    <MenuItem onClick={menuActions.delete}>
                        <ListItemIcon><DeleteIcon fontSize='small'/></ListItemIcon>
                        <ListItemText primary='Delete'/>
                    </MenuItem>
                </Menu>
                </React.Fragment>
            )}
        </Draggable>
    )
}

export default Todo
