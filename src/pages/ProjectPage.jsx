import React, {useState, useEffect, useRef} from 'react'
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
        maxWidth: theme.spacing(144),
        width: '100%',
        [theme.breakpoints.down('md')]: {
            maxWidth: theme.spacing(108)
        },
        [theme.breakpoints.down('sm')]: {
            maxWidth: theme.spacing(72)
        },
        [theme.breakpoints.down('xs')]: {
            maxWidth: theme.spacing(36)
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
                        const index = pre.findIndex(p => p._id == projectId)
                        pre[index].title = newName
                        return [...pre]
                    })
                }

            } catch (error) {
                console.log(error);
            }
        }
    }

    useEffect(async () => {
        try {
            const result = await instance.get('/projects')
            setProjects(result.data)
        } catch (error) {
            console.log(error);
            setProjects([])
        }

        return () => {
            setProjects([])
        }
    }, [])

    return (
        <div className={classes.page}>
            <Header />
            <div className={classes.container}>
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

export default ProjectPage