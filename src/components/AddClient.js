import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import CustomizedSnackbars from './CustomizedSnackbar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { gql, useQuery } from '@apollo/client';
import { useMutation } from '@apollo/react-hooks'
import CloseIcon from '@mui/icons-material/Close';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { FormControl } from '@mui/material';
import FormLabel from '@mui/material/FormLabel';






const AddClient = ({handleClose, isSignUp}) => {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState()
    const [password, setPassword] = useState("")
    const [role, setRole] = useState("USER")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [flashMessage, setFlashMessage] = useState(null)
    const [flashMessageState, setFlashMessageState] = useState()
    const [createClientErrorMessage, setCreateClientErrorMessage] = useState()
    const header = isSignUp ? "Sign Up" : "Add A Client"
    const action = isSignUp ? "Sign Up" : "Add Client"

    const CREATE_CLIENT = gql`
        mutation Newclient($first_name: String! ,$last_name: String!, $email: String!, $password: String!, $phone_number: String, $role: String){
        createClient(data: {
            first_name: $first_name,
            last_name: $last_name,
            email: $email,
            password: $password,
            phone_number: $phone_number,
            role: $role,

        }){
            clientDetails{
            first_name
            id
            }
            token
            message
            
        }
    }
     `
    
    const [createClient, { data }] = useMutation(CREATE_CLIENT);
    const history = useHistory()
    const theme = createTheme();
   
    const handleSubmit = async (e) => {
        e.preventDefault()
                createClient({ variables: { first_name: firstName, last_name: lastName, email, phone_number: phoneNumber, password, role} })
                    .then((response) => {
                        localStorage.setItem("jwtToken", response.data.createClient.token)
                        setFlashMessage(response.data.message)
                        setFlashMessageState('success')
                        setTimeout(() => {
                            setFlashMessageState('')
                        }, 4000)
                        history.push("/")
                        setFirstName("")
                        setLastName("")
                        setEmail("")
                        setPassword("")
                        setPhoneNumber("")
                        setRole("")
                        handleClose()
                        window.location.reload();
                    }).catch(er=>{
                        setCreateClientErrorMessage(er.graphQLErrors[0].message);

                    })
        }

    useEffect(() => {

    })
    return (
        <>
            {flashMessageState && flashMessage !== null ?
                <div className='flash_message'>
                    <CustomizedSnackbars severity={flashMessageState} message={flashMessage} />
                </div>
                : ""}
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs" className="addClientBox">
                    <CloseIcon className='closeModal' onClick={handleClose}/>
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: -5,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            height: "95vh"
                        }}
                        
                    >
                        <Avatar sx={{ m: 1, bgcolor: '#1976D2' }}>
                            <AddIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            {header}
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }} >
                            <TextField
                                error = { !firstName ? true : false }
                                margin="dense"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                name="firstName"
                                autoComplete="First Name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                            <TextField
                                error = { !lastName ? true : false }
                                margin="dense"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="Last Name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                            <TextField
                                error = { !email ? true : false }
                                margin="dense"
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                autoComplete="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <TextField
                                error = { !password ? true : false }
                                margin="dense"
                                required
                                fullWidth
                                id="password"
                                label="Password"
                                name="password"
                                autoComplete="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <TextField
                                error = { !phoneNumber ? true : false }
                                margin="dense"
                                required
                                fullWidth
                                id="phoneNumber"
                                label="Phone Number"
                                name="phoneNumber"
                                autoComplete="phoneNumber"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                            <FormControl>
                                    <FormLabel id="demo-radio-buttons-group-label">Role</FormLabel>
                                    <RadioGroup
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        defaultValue="USER"
                                        name="radio-buttons-group"
                                        onChange={(e) => setRole(e.target.value)}
                                    >
                                        <FormControlLabel value="ADMIN" control={<Radio />} label="Admin" />
                                        <FormControlLabel value="USER" control={<Radio />} label="User" />
                                    </RadioGroup>
                            </FormControl>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                {action}
                            </Button>
                            {createClientErrorMessage ? <Typography variant = "body2" className='errorMessage'> { createClientErrorMessage } </Typography> : ""}
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </>

    )
}
export default AddClient
