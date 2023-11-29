import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import CustomizedSnackbars from './CustomizedSnackbar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import ContextApi from './contextApi';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { gql, useQuery } from '@apollo/client';
import { useMutation } from '@apollo/react-hooks'
import CloseIcon from '@mui/icons-material/Close';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { GET_CLIENTS, GET_PROJECTS} from './contextApi/store';



const Addproject = ({
    handleClose, 
    individualProjectData, 
    editButtonClicked, 
    setIndividualProjectData, 
    setShowSuccessMessage,
    setFlashMessage

}) => {

    const [projectName, setProjectName] = useState("")
    const [description, setDescription] = useState("")
    const [duration, setDuration] = useState()
    const [clientId, setClientId] = useState("")
    const [status, setStatus] = useState("TODO")
    const [projectErrorMessage, setProjectErrorMessage] = useState()
    const header = editButtonClicked ? "Update Project" : "Add A Project"
    const action = editButtonClicked ? "Update Project" : "Add Project"

   
    useState(() => {
        if (editButtonClicked) {
          setDuration(individualProjectData.duration);
          setProjectName(individualProjectData.name);
          setDescription(individualProjectData.description);
          setStatus(individualProjectData.status);
          setClientId(individualProjectData.client_id)
        }
      }, [editButtonClicked]);
    
   const { clientsDetails} = useContext(ContextApi)

   const Create_project = gql`
        mutation Newproject($client_id: String! ,$projectName: String!, $description: String!, $duration: Int!, $status: String){
        createProject(data: {
            client_id: $client_id,
            name: $projectName,
            description: $description,
            duration: $duration,
            status: $status
        }){
            name
            id
        }
    }`

    const UPDATE_PROJECT = gql`
        mutation updateProject($project_id: String, $client_id: String! ,$projectName: String!, $description: String!, $duration: Int!, $status: String!){
            updateProject(project_id: $project_id, data: {
            name: $projectName,
            description: $description,
            duration: $duration,
            status: $status
            client_id: $client_id
        }){
            name
            id
        }
    }
     `
    const [createProject, { data }] = useMutation(Create_project);
    const [updateProject, { data: projectData }] = useMutation(UPDATE_PROJECT)
    const history = useHistory()
    const theme = createTheme();
   
    const handleClientChange = (e) => {
        setClientId(e.target.value)
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
            if(!editButtonClicked){
                        createProject({ variables: { client_id: clientId, projectName, description, duration, status},
                                        onCompleted: () => {
                                            setShowSuccessMessage(true)
                                            setTimeout(()=>{
                                                setShowSuccessMessage(false)
                                            }, 5000)
                                           
                                            setFlashMessage("Successfully Updated")
                                        },
                                        update(cache, {data: {createProject}}){
                                            const { projects } = cache.readQuery({ query: GET_PROJECTS});
                                            cache.writeQuery({
                                                query: GET_PROJECTS,
                                                data: {projects: [...projects, createProject ]}
                                            })
                                        } 
                    })
                    .then((response) => {
                        setProjectName("")
                        setDescription("")
                        setDuration("")
                        setStatus("")
                        setClientId("")
                        handleClose()
                    }).catch(err=>{
                        setProjectErrorMessage(err.graphQLErrors[0].message)
                    })
                }
                else{
                    updateProject({ variables: { project_id: individualProjectData.id, client_id: clientId, projectName, description, duration, status},
                        onCompleted: () => {
                            setShowSuccessMessage(true)
                            setTimeout(()=>{
                                setShowSuccessMessage(false)
                            }, 3000)
                            setFlashMessage("Successfully Updated")
                        },
                        refetchQueries: [{query: GET_PROJECTS, variables:{project_id: individualProjectData.id}}]
                     })
                        .then((response) => {
                            setProjectName("")
                            setDescription("")
                            setDuration("")
                            setStatus("")
                            setClientId("")
                            handleClose()
                            // setShowSuccessMessage(true)
                        }).catch(err=>{
                            setProjectErrorMessage(err.graphQLErrors[0].message)
                        })
                    }

    }
    return (
        <>
            <ThemeProvider theme={theme} key={editButtonClicked ? individualProjectData.id : ""}>
                <Container component="main" maxWidth="xs">
                    <CloseIcon className='closeModal' onClick={handleClose}/>
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: '#1976D2' }}>
                            <AddIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            {header}
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="dense"
                                required
                                fullWidth
                                id="projectName"
                                label="Project Name"
                                name="projectName"
                                autoComplete="Project Name"
                                value={projectName}
                                onChange={(e) => { 
                                    setProjectName(e.target.value)
                                }}
                            />
                            <TextField
                                margin="dense"
                                required
                                fullWidth
                                id="description"
                                label="Description"
                                name="description"
                                autoComplete="description"
                                value={description}
                                onChange={(e) => {
                                    setDescription(e.target.value)
                                }}
                            />
                            <TextField
                                margin="dense"
                                required
                                fullWidth
                                id="duration"
                                label="Duration"
                                name="duration"
                                autoComplete="duration"
                                value={duration}
                                onChange={(e) => {
                                    setDuration(Number(e.target.value))

                                
                                }}
                            />
                            <FormControl fullWidth margin="dense">
                                <InputLabel id="select-label">Client</InputLabel>
                                <Select
                                    margin="normal"
                                    labelId="select-label"
                                    id="select"
                                    label="Client"
                                    onChange={(e)=> handleClientChange(e)}
                                    required
                                    defaultValue={clientId}
                                    
                                >
                                {clientsDetails[2].clients.map(client=> <MenuItem value={client.id}> {client.first_name} </MenuItem>) }
                                </Select>
                            </FormControl>
                            <FormControl fullWidth margin="dense">
                                <InputLabel id="select-label">Status</InputLabel>
                                <Select
                                    
                                    labelId="select-label"
                                    id="select"
                                    label="Status"
                                    onChange={(e)=> setStatus(e.target.value)}
                                    required
                                    defaultValue={status}
                                >
                                <MenuItem value="TODO"> TODO </MenuItem>
                                <MenuItem value="INPROGRESS"> IN PROGRESS </MenuItem>
                                <MenuItem value="DONE"> DONE </MenuItem>
                                </Select>
                            </FormControl>

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                {action}
                            </Button>
                            {projectErrorMessage ? <Typography variant = "body2" className='errorMessage'> { projectErrorMessage } </Typography> : ""}
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </>

    )
}
export default Addproject
