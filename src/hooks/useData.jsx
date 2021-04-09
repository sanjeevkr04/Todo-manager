import {useState, useEffect} from 'react'
import instance from '../requests';

function useData({projectId}) {

    const emptyData = {
        _id: projectId,
        title: '',
        todos: [],
        in_process: [],
        completed: [],
    }

    const [data, setData] = useState(emptyData)

    useEffect(() => {
        
        getProjectDetail(projectId, setData);

        return () => {
            setData(emptyData)
        }
    }, [projectId, emptyData])

    const update = async (source, destination) => {
        if(!destination) return;
        if(source.droppableId === destination.droppableId && source.index === destination.index) return;

        const src = data[source.droppableId];
        const dest = data[destination.droppableId];

        const [target] = src.splice(source.index, 1);
        dest.splice(destination.index, 0, target);


        const prevData = data

        setData({
            ...data,
            [source.droppableId]: src,
            [destination.droppableId]: dest
        })

        try {
            await instance.patch('/todo', {
                project_id: projectId,
                source: source,
                destination: destination,
            })
        } catch (error) {
            console.log(error);
            setData(prevData)
        }
    }

    const addTodo = async (title) => {
        try {
            const result = await instance.post('/todo', JSON.stringify({
                project_id: projectId,
                title: title
            }))
            setData(result.data)
        } catch (error) {
            console.log(error);
        }
    }

    const deleteTodo = async (status, todoId) => {
        try {
            const result = await instance.delete('/todo', {data: {
                project_id: projectId,
                status: status,
                todo_id: todoId
            }})
            if(result.data.nModified){
                setData(pre => {
                    // const newData = {...pre}
                    // const index = newData[status].findIndex(t => t._id === todoId);
                    // newData[status].splice(index, 1);
                    // return newData
                    pre[status] = pre[status].filter(todo => todo._id !== todoId)
                    return {...pre}
                })
            }
        } catch (error) {
            console.log(error);
        }
    }

    const editTodo = async (status, todoId, newTitle) => {
        try{
            const result = await instance.put('/todo', {
                project_id: projectId,
                status: status,
                todo_id: todoId,
                newName: newTitle
            });
            if(result.data.nModified){
                setData(pre => {
                    const index = pre[status].findIndex(t => t._id === todoId)
                    pre[status][index].title = newTitle
                    return {...pre}
                })
            }
        }catch (error){
            // NOTE: unable to edit todo
            console.log(error);
        }
    }

    return [data, {
        update: update,
        add: addTodo,
        edit: editTodo,
        delete: deleteTodo
    }]
}

async function getProjectDetail(projectId, setData){
    try {
        const result = await instance.get(`/project?project_id=${projectId}`)
        setData(result.data)
    } catch (error) {
        console.log(error);
        setData(null)
    }
}

export default useData
