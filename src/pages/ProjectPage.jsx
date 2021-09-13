import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import ProjectCard, {AddCard} from '../components/ProjectCard';
import Header from '../components/Header';
import CustomDialog from '../components/CustomDialog';
import instance from '../requests';
import AlertDialog from '../components/AlertDialog';

const useStyles = makeStyles(theme => ({
    page: {
        marginTop: theme.mixins.toolbar.minHeight,
        paddingTop: theme.spacing(5),
        display: 'flex',
        justifyContent: 'center',
        [theme.breakpoints.down('xs')]: {
            paddingTop: theme.spacing(2),
        }
    },
    container: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        width: theme.spacing(144),
        [theme.breakpoints.down('md')]: {
            maxWidth: theme.spacing(108),
            gridTemplateColumns: 'repeat(3, 1fr)',
        },
        [theme.breakpoints.down('sm')]: {
            maxWidth: theme.spacing(72),
            gridTemplateColumns: 'repeat(2, 1fr)',
        },
        [theme.breakpoints.down('xs')]: {
            maxWidth: theme.spacing(36),
            gridTemplateColumns: '1fr',
        }
    }
}));

function ProjectPage() {
    
    const classes = useStyles();
    const [dialog, setDialog] = useState(false)
    const [projects, setProjects] = useState([])
    const [alert, setAlert] = useState({open: false, project: null});

    const actions = {
        add: async (projectName) => {
            try {
                const result = await instance.post('/project', JSON.stringify({
                    title: projectName
                }));

                result.data["todos"] = 0
                result.data["in_process"] = 0
                result.data["completed"] = 0

                setProjects(pre => {
                    return [
                        result.data,
                        ...pre
                    ]
                });
            } catch (error) {
                console.log(error);
                // TODO: Failed to create project
            }
        },
        delete: async (projectId) => {
            try {
                const result = await instance.delete('/project', {data: {
                    project_id: projectId
                }})

                if (result.data.deletedCount) {
                    setProjects(pre => {
                        const index = pre.findIndex(p => p._id === projectId)
                        pre.splice(index, 1)
                        return [...pre]
                    })
                }
    
            } catch (error) {
                console.log(error);
            }
        },

        rename: async (projectId, newName) => {
            try {
                const result = await instance.put('/project', {
                    action: "rename",
                    project_id: projectId,
                    title: newName,
                })

                if(result.data.nModified){
                    setProjects(pre => {
                        const index = pre.findIndex(p => p._id === projectId)
                        pre[index].title = newName
                        return [...pre]
                    })
                }

            } catch (error) {
                console.log(error);
            }
        }
    }

    useEffect( () => {
        
        getProjects(setProjects);

        return () => {
            setProjects([])
        }
    }, [])

    return (
        <div className={classes.page}>
            <Header />
            <div id="container" className={classes.container}>
                <AddCard onClick={() => {setDialog({
                    open: true,
                    data: {
                        main: "Add project",
                        text: 'Project name',
                        submit: "Create project"
                    },
                    defaultText:"",
                    submit: function(text){
                        actions.add(text)
                    }
                })}} />
                {projects.map((project) => (
                    <ProjectCard 
                        key={project._id}
                        data={project}
                        onRename={() => setDialog({
                            open: true,
                            data: {
                                main: "Rename project",
                                text: 'Project name',
                                submit: "Rename"
                            },
                            defaultText: project.title,
                            submit: function(text){
                                actions.rename(project._id, text);
                            }
                        })}
                        deleteHandler={() => setAlert({
                            open: true,
                            project: project,
                        })}/>
                ))}
                    
                {/* Dialog */}
                {dialog.open && <CustomDialog 
                    dialogData={dialog}
                    closeHandler={() => setDialog(false)}
                />}

                {alert.open && <AlertDialog
                    open={alert.open}
                    closeHandler={() => setAlert({open: false, project: null})}
                    deleteHandler={() => {actions.delete(alert.project?._id)}}
                    text={alert.project?.title}
                />}
            </div>
        </div>
    )
}

async function getProjects(setProjects){
    try {
        const result = await instance.get('/projects')
        setProjects(result.data)
    } catch (error) {
        console.log(error);
        setProjects([])
    }
}

export default ProjectPage
