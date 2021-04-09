import { Card } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Droppable } from 'react-beautiful-dnd';
import Todo from './Todo';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles(theme => ({
    board: {
        flex: 1,
        border: '1px solid lightgray',
        background: 'lightgray',
        margin: theme.spacing(10, 0.2, 0.2),
        [theme.breakpoints.down('sm')]: {
            margin: theme.spacing(10, 0, 0)
        }
    },
    cardFrame: {
        height: '100%',
    },
    cards: {
        overflow: 'auto',
        height: '100%'
    },
    addCard: {
        margin: theme.spacing(1, 4),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: theme.spacing(4),
        backgroundColor: '#05ffac',
        cursor: 'pointer',
        '&:hover': {
            transform: 'scaleX(1.1)',
            transition: 'transform 0.1s ease-in-out'
        }
    },
    title: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing(1),
        boxShadow: theme.shadows[12],
        backgroundColor: '#7986cb',
        zIndex: theme.zIndex.appBar,
        height: theme.spacing(6),
        textAlign: 'center',
        textTransform: 'uppercase'
    }
}));

function Board({id, boardData, background, addDialog, actions}) {

    const classes = useStyles();

    return (
        <div className={classes.board}>
            <div className={classes.cardFrame}>
                <Droppable key={id} droppableId={id}>
                    {(provided, snapshot) => (
                        <div 
                            className={classes.cards}
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={{backgroundColor: snapshot.isDraggingOver? background: 'lightgrey'}}
                        >
                            {boardData.map((todo, index) => (
                                <Todo
                                    key={todo._id}
                                    max={boardData.length}
                                    boardId={id}
                                    todo={todo}
                                    index={index}
                                    actions={{
                                        update: actions.update,
                                        delete: (todo) => {actions.delete(id, todo)},
                                        edit: (todo) => {actions.edit(id, todo)}
                                    }}
                                />
                            ))}
                            {id === 'todos'? (
                                <Card 
                                    key='add-todo'
                                    onClick={addDialog}
                                    className={classes.addCard}
                                    style={{display: snapshot.isDraggingOver? 'none': 'flex'}}
                                >
                                    <AddIcon/>
                                </Card>
                            ) : ''}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </div>
        </div>
            
        
    )
}

export default Board