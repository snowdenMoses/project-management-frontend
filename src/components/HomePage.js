import { Button } from '@mui/material';
import { useContext, useState } from 'react';
import ContextApi from './contextApi';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CustomizedSnackbars from './CustomizedSnackbar';
import { CardActionArea } from '@mui/material';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import ArticleIcon from '@mui/icons-material/Article';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import HourglassDisabledIcon from '@mui/icons-material/HourglassDisabled';
import AddProjectModal from './Modal/AddProjectModal';
import ProjectDetailsModal from './Modal/ProjectDetailsModal';
import AddClientModal from './Modal/AddClientModal';
import moment from 'moment'
import EditIcon from '@mui/icons-material/Edit';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import LoginModal from './Modal/LoginModal';



export default function HomePage() {
    const [ individualProjectData, setIndividualProjectData] = useState()
    const [open, setOpen] = useState(false);
    const [editButtonClicked, setEditButtonClicked] = useState(false);
    const [createClientModalState, setCreateClientModalState] = useState(false);
    const [createProjectModalState, setCreateProjectModalState] = useState(false);
    const [loginModalState, setLoginModalState] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [flashMessageType, setFlashMessageType] = useState("success");
    const [flashMessage, setFlashMessage] = useState();
    const [ isSignUp, setIsSignUp ] = useState(false)
    const handleCreateClientModalClose = () => setCreateClientModalState(false);
    const handleCreateProjectModalClose = () => setCreateProjectModalState(false);
    const handleClose = () => setOpen(false);
    const {projectsDetails, currentClientDetails} = useContext(ContextApi)
    const handleLogOut = () => {
          localStorage.setItem("jwtToken", null)
          window.location.reload();
    }

    function reduceString(string, requiredLength = 4){
        let finalString = ""
        let i = 0;
        while ( string.indexOf(string[i]) != -1 && string.indexOf(string[i]) < requiredLength ){
            finalString += string[i]
            i++
        }
        if(string.length > requiredLength){
            finalString = finalString.concat(" ...")
        }
        return finalString;
    }
    
    React.useEffect(()=>{

    }, [open])
   
    if (projectsDetails[0]) return <p>Loading...</p>;
    if (projectsDetails[1]) return <p>Error</p>;
    

    return (
        <Box sx={{ flexGrow: 2 }}>
            { open ? <ProjectDetailsModal individualProjectData = { individualProjectData }
             open={open} 
             handleClose={handleClose}/>
            : "" }
            <div className='titleContainer'>
                <div className='title'>
                    <HourglassDisabledIcon />
                    <span className="mainTitle">
                        Project Management
                    </span>
                </div>

                <div className='subLink'>
                    {
                        currentClientDetails[0] == false && currentClientDetails[2] ?
                        <div className="createButton"> 
                            { currentClientDetails[2]?.currentClient?.role == "ADMIN" ?
                                        <div className="createClientButton">
                                            <Button variant="contained" size="small" onClick={() => setCreateClientModalState(true)}>
                                                <PersonAddIcon /> Add Client
                                            </Button>
                                        </div>
                                        :""
                                }
                                {/* <div className="adminMenuButton">
                                    <Button variant="contained" size="small" onClick={() => setCreateClientModalState(true)}>
                                        <MenuIcon />
                                    </Button>
                                </div>

                                <div className="adminMenuButton">
                                    <Button variant="contained" size="small" onClick={() => setCreateClientModalState(true)}>
                                        <CloseIcon/>
                                    </Button>
                                </div> */}

                                <div className="createProjectButton">
                                    <Button variant="contained" size="small" onClick={() => {
                                        setCreateProjectModalState(true)
                                        setEditButtonClicked(false)
                                        }} >
                                        <ArticleIcon /> New Project
                                    </Button>
                                </div>
                        </div> : ""
                    }
                    
                    <div className='auth'>
                    {
                        currentClientDetails[0] == false && currentClientDetails[2] ?

                        <div className="logOutButton">
                                <Button variant="outlined" size="small" onClick={() => {
                                    handleLogOut()
                                    }} >
                                    <LockIcon fontSize="small"/> Log Out
                                </Button>
                          </div>
                        
                         : 

                         <>
                            <div className="logInButton">
                                <Button variant="outlined" size="small" onClick={() => {
                                    setLoginModalState(true)
                                    }} >
                                    <LockOpenIcon fontSize="small"/> Log In
                                </Button>
                            </div>
                            <div className="signUp">
                                <Button variant="outlined" size="small" onClick={() => {
                                    setCreateClientModalState(true)
                                    setIsSignUp(true)
                                    }} >
                                    <VpnKeyIcon fontSize="small"/> Sign Up
                                </Button>
                            </div>
                        </>
            
                    }
                    </div>
                </div>


                {/* Modals */}
                <div className="createButton"> 
                    <AddClientModal className='addClientModal' 
                    open = { createClientModalState } 
                    handleClose = { handleCreateClientModalClose }
                    showSuccessMessage = {showSuccessMessage}
                    isSignUp = { isSignUp }
                    />

                    <AddProjectModal className="createProjectButton"
                    open = { createProjectModalState } 
                    handleClose = { handleCreateProjectModalClose }
                    individualProjectData = { individualProjectData }
                    editButtonClicked = {editButtonClicked}
                    setShowSuccessMessage = { setShowSuccessMessage }
                    setFlashMessage = { setFlashMessage }
                    />

                    <LoginModal 
                    loginModalState = { loginModalState } 
                    setLoginModalState = { setLoginModalState }
                    />

                    {
                    showSuccessMessage ?
                    <div className='flash_message'>
                        <CustomizedSnackbars severity={flashMessageType} message={flashMessage} />
                    </div>
                    :""
                    }
                    
                </div>
                
            </div>
            <Grid container spacing={2} >
                {
                    projectsDetails[2].projects.map((project, index) => {
                        const from = moment(new Date(Number(project.created_at))).format("MMMM Do YYYY")
                        const to = moment(new Date(Number(project?.created_at))).add(project?.duration, 'd')
                        const projectManager = `${project.client.first_name} ${project.client.last_name}`
                        const isPassedDeadline =  moment.utc(new Date()).valueOf() > to
                        return (
                        <Grid item xs={12} sm={6} md={4}  key={index}>
                            <Card sx={{ height: '100%' }} className='projectCard'>
                                {
                                currentClientDetails[2]?.currentClient?.id == project.client.id ?
                                <EditIcon className='editProjectButton' 
                                onClick={() => {
                                    setCreateProjectModalState(true)
                                    setEditButtonClicked(true)
                                    setIndividualProjectData({
                                        id: project.id,
                                        name: project.name,
                                        description: project.description,
                                        status: project.status,
                                        duration: project.duration,
                                        projectManager, 
                                        from,
                                        to: to.format("MMMM Do YYYY"),
                                        client_id: project.client.id,
                                        client_first_name: project.client.first_name,
                                    })
                                }}
                                />
                                : "" }
                                <CardActionArea onClick={ ()=>{
                                setIndividualProjectData({
                                    id: project.id,
                                    name: project.name,
                                    description: project.description,
                                    status: project.status,
                                    duration: project.duration,
                                    projectManager, 
                                    from,
                                    to: to.format("MMMM Do YYYY")
                                })
                                setOpen(true)
                        }
                        }>
                                    <CardContent>
                                        <Typography gutterBottom variant="h6" component="div">
                                            {reduceString(project.name, 20)}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" component="div">
                                            Status: {project.status}
                                        </Typography>
                                        <Typography gutterBottom variant="h8" component="div">
                                            Project Manager: { projectManager }
                                        </Typography>
                                        <Typography 
                                        gutterBottom variant="h8" 
                                        component="div" 
                                        className={isPassedDeadline && project.status != "DONE" ? "projectDuration" : ""}>
                                            Duration: { from } - { to.format("MMMM Do YYYY") } ({project.duration} days)
                                        </Typography>
                                        <Typography gutterBottom variant="h8" component="div">
                                            
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    )
                })
                }
            </Grid>
        </Box>

    );
}
