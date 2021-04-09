import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Board from './../components/Board'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { DragDropContext } from 'react-beautiful-dnd';
import useData from '../hooks/useData';
import { AppBar, Dialog, IconButton, Tab, Tabs, Typography, useMediaQuery } from '@material-ui/core';
import AlertDialog from '../components/AlertDialog'
import { useState } from 'react';
import CustomDialog from '../components/CustomDialog';
import Tabpanel from '../components/Tabpanel';
import {useHistory} from 'react-router-dom';
import Page404 from './Page404';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        height: '100vh',
    },
    appBar: {
        display: 'flex',
        flexDirection: 'row',
        padding: theme.spacing(0, 1)
    },
    title: {
        flex: 1,
        textAlign: 'center',
        fontSize: 20,
        paddingLeft: theme.spacing(0.5)
    },
    addTodo: {
        margin: theme.spacing(1),
        padding: theme.spacing(1),
        backgroundColor: '#00f000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
    },
    tabBar: {
        marginTop: theme.spacing(4),
        backgroundColor: 'lightgrey',
        [theme.breakpoints.down('sm')]: {
            boxShadow: 'none',
        }
    },
    tab: {
        margin: theme.spacing(0, 0.2),
        backgroundColor: '#7986cb',
        fontWeight: 500,
        fontSize: 16,
        '& .MuiTab-wrapper': {
            color: 'black'
        },
        [theme.breakpoints.down('sm')]: {
            boxShadow: theme.shadows[4],
            '&.Mui-selected': {
                backgroundColor: 'lightgrey',
                boxShadow: 'none'
            }
        },
        [theme.breakpoints.down('xs')]: {
            fontWeight: 500,
            fontSize: 12
        }
    },
}));

const boards = [
    {
        key: 'todos',
        title: 'Todos',
        background: 'lightpink',
    },
    {
        key: 'in_process',
        title: 'In process',
        background: 'lightblue'
    },
    {
        key: 'completed',
        title: 'Completed',
        background: 'lightgreen'
    }
]

function allyProps(index) {
    return {
      id: `Board-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
  }

function TodoPage(props) {

    const classes = useStyles();
    const [data, actions] = useData({projectId: props.match.params.projectId})
    const [dialog, setDialog] = useState(false);
    const [alert, setAlert] = useState({open: false, todo: null, board: ''});
    const [tab, setTab] = useState(0);
    const theme = useTheme();
    const width_sm = useMediaQuery(theme.breakpoints.down('sm'));
    const history = useHistory();

    return data ? (
        <div className={classes.root}>
            <AppBar className={classes.appBar} position="fixed">
                <IconButton onClick={() => history.push('/')} size='small'>
                    <ArrowBackIosIcon/>
                </IconButton>
                <Typography className={classes.title}>
                    {data.title}
                </Typography>
            </AppBar>
            <AppBar className={classes.tabBar} position="fixed">
                <Tabs
                    value={tab}
                    TabIndicatorProps={{style: {display: 'none'}}}
                    onChange={(e, index) => {setTab(index)}}
                    indicatorColor='primary'
                    textColor='primary'
                    variant='fullWidth'
                    aria-label='Todo boards'
                >
                    {boards.map((board, index) => (
                        <Tab key={`tab-${index}`} className={classes.tab} label={board.title} {...allyProps(index)} disabled={!width_sm}/>
                    ))}
                </Tabs>
            </AppBar>
            <DragDropContext onDragEnd={result => actions.update(result.source, result.destination)}>
                {boards.map((board, index) => (
                    width_sm
                    ?   <Tabpanel key={index} index={index} value={tab}>
                            {getBoard(board, data)}
                        </Tabpanel>
                    :
                         getBoard(board, data)
                ))}
            </DragDropContext>
            
            {dialog.open && <CustomDialog
                dialogData={dialog}
                closeHandler={() => setDialog(false)}
            />}

            {alert.open && <AlertDialog
                open={alert.open}
                closeHandler={() => setAlert({open: false, board: '', todo: null})}
                deleteHandler={() => {actions.delete(alert.board, alert.todo?._id)}}
                text={alert.todo?.title}
            />}
        </div>
    ) : (
        <Page404/>
    )

    function getBoard(board, data){
        return <Board 
            key={board.key}
            id={board.key}
            background={board.background}
            addDialog={() => {setDialog({
                    open: true,
                    data: {
                        main: "New Todo",
                        text: 'Todo detail',
                        submit: "Add todo"
                    },
                    defaultText:"",
                    submit: function(text){
                        actions.add(text)
                    }
                })
            }}
            actions={{
                update: (source, destination) => {actions.update(source, destination)},
                delete: (status, todo) => { setAlert({open: true, board: status, todo: todo}) },
                edit: (status, todo) => {setDialog({
                    open: true,
                    data: {
                        main: 'Edit todo',
                        text: 'Todo detail',
                        submit: 'Edit'
                    },
                    defaultText: todo.title,
                    submit: function(text){
                        actions.edit(status, todo._id, text);
                    }
                })}
            }}
            boardData={data[board.key]}/>
    }
}

export default TodoPage