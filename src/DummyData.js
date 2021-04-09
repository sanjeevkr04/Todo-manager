const data ={
    todos: [
        { id: 'task-1', title: 'Task 1', next_id: 'task-2', status: status.ADDED },
        { id: 'task-2', title: 'Task 2', next_id: 'task-3', status: status.ADDED },
        { id: 'task-3', title: 'Task 3', next_id: 'task-4', status: status.ADDED },
        { id: 'task-4', title: 'Task 4', next_id: 'task-5', status: status.ADDED },
        { id: 'task-5', title: 'Task 5', next_id: 'task-6', status: status.ADDED },
        { id: 'task-6', title: 'Task 6', next_id: 'task-7', status: status.ADDED },
        { id: 'task-7', title: 'Task 7', next_id: 'task-8', status: status.ADDED },
        { id: 'task-8', title: 'Task 8', next_id: 'task-9', status: status.ADDED },
        { id: 'task-9', title: 'Task 9', next_id: 'task-10', status: status.ADDED },
        { id: 'task-10', title: 'Task 10', next_id: 'task-11', status: status.ADDED },
        { id: 'task-11', title: 'Task 11', next_id: 'task-12', status: status.ADDED },
        { id: 'task-12', title: 'Task 12', next_id: 'task-13', status: status.ADDED },
        { id: 'task-13', title: 'Task 13', next_id: 'task-14', status: status.ADDED },
        { id: 'task-14', title: 'Task 14', next_id: 'task-15', status: status.ADDED },
        { id: 'task-15', title: 'Task 15', next_id: 'task-16', status: status.ADDED },
        { id: 'task-16', title: 'Task 16', next_id: 'task-17', status: status.ADDED },
        { id: 'task-17', title: 'Task 17', next_id: 'task-18', status: status.ADDED },
        { id: 'task-18', title: 'Task 18', next_id: 'task-19', status: status.ADDED },
        { id: 'task-19', title: 'Task 19', next_id: 'task-20', status: status.ADDED },
        { id: 'task-20', title: 'Task 20', next_id: 'task-21', status: status.ADDED },
        { id: 'task-21', title: 'Task 21', next_id: 'task-22', status: status.ADDED },
        { id: 'task-22', title: 'Task 22', next_id: 'task-23', status: status.ADDED },
        { id: 'task-23', title: 'Task 23', next_id: 'task-24', status: status.ADDED },
        { id: 'task-24', title: 'Task 24', next_id: 'task-25', status: status.ADDED },
        { id: 'task-25', title: 'Task 25', next_id: '', status: status.ADDED },
    ]
}

const columns = {
    tasks: {
        title: 'Tasks',
        todos: data.todos
    },
    in_process: {
        title: 'In process',
        todos: []
    },
    completed: {
        title: 'Completed',
        todos: []
    }
}

export default columns;