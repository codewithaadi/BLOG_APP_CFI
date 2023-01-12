import { useState,useContext} from 'react';
import { Box, TextField, Button, styled, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { API } from '../../service/api';
import { DataContext } from '../../context/DataProvider';

const imageURL = 'https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png';

const Component = styled(Box)`
    width: 400px;
    margin: auto;
    box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.6);
`
const Image = styled(`img`)({
    width: 100,
    margin: 'auto',
    display: 'flex',
    padding: '50px'
});

const Wrapper = styled(Box)`
    padding: 25px 35px;
    display: flex;
    flex:1;
    flex-direction : column;
    & > div, &>button, &>p{                      /* This is for the Textfield which is actually a Div , Check in Inspect Element and For Button also*/ 
    margin-top: 20px;
    }
`
const LoginButton = styled(Button)`
    text-transform : none;
    background: #FB641B;
    color: #FFF;
    border-radius: 2px;
    height: 48px;
`
const SignupButton = styled(Button)`
    text-transform : none;
    background: #FFF;
    color: #2874f0;
    border-radius: 2px;
    height: 48px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0/20%);
`
const Text = styled(Typography)`
    color: #878787;
    font-size: 16px;
`
const Errormessage = styled(Typography)`
    font-size: 10px;
    color: #ff6161;
    line-height : 0;
    margin-top : 10px;
    font-weight: 600;
`
const loginInitialValues = {
    username: '',
    password: ''
}

const signupInitialValues = {
    name: '',
    username: '',
    password: ''
}



export default function Login(props) {

    const [account, toggleAccount] = useState('login');
    const [signup, setSignup] = useState(signupInitialValues);
    const [login, setLogin] = useState(loginInitialValues);
    const [error, setError] = useState('');
    const {setAccount} = useContext(DataContext);
    const navigate = useNavigate();

    const toggleSignup = () => {
        account === 'signup' ? toggleAccount('login') : toggleAccount('signup');
    }

    const onInputChange = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value });
    }

    const signupUser = async () => {
        //Caling API
        let response = await API.userSignup(signup);
        if (response.isSuccess) {
            setError('');
            setSignup(signupInitialValues);
            toggleAccount('login');
        } else {
            setError('Something went wrong!, Please try again!');
        }
    }

    const onValueChange = (e)=>{
        setLogin({...login,  [e.target.name] : e.target.value})
    }

    const loginUser = async ()=>{
        let response = await API.userLogin(login);
        if(response.isSuccess){
            setError('');
            sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
            sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`);
            setAccount({username : response.data.username, name: response.data.name});
            props.isUserAuthenticated(true);
            navigate('/');
        }else{
            setError('Something went wrong!, Please try again');
        }
    }

    return (
        <Component>
            <Box>
                <Image src={imageURL} alt="loginLogo" />
                {
                    account === 'login' ?
                        <Wrapper>
                            <TextField variant='standard' placeholder='Enter Username' onChange={(e) => onValueChange(e)} name='username' value={login.username}/>
                            <TextField variant='standard' placeholder='Enter Password' onChange={(e) => onValueChange(e)} name='password' value={login.password}/>

                            {error && <Errormessage>{error}</Errormessage>}
                            <LoginButton variant="contained" onClick={()=> loginUser()}>Login</LoginButton>
                            <Text varirant='h5' style={{ textAlign: 'center' }}>OR</Text>
                            <SignupButton onClick={() => toggleSignup()}>Create an Account</SignupButton>
                        </Wrapper>
                        :
                        <Wrapper>
                            <TextField variant='standard' placeholder='Enter Name' onChange={(e) => onInputChange(e)} name='name' />
                            <TextField variant='standard' placeholder='Enter Username' onChange={(e) => onInputChange(e)} name='username' />
                            <TextField variant='standard' placeholder='Enter Password' onChange={(e) => onInputChange(e)} name='password' />

                            {error && <Errormessage>{error}</Errormessage>}
                            <SignupButton onClick={() => signupUser()}>Signup</SignupButton>
                            <Text varirant='h5' style={{ textAlign: 'center' }}>OR</Text>
                            <LoginButton variant='contained' onClick={() => toggleSignup()}>Already have an account</LoginButton>
                        </Wrapper>
                }
            </Box>
        </Component>
    )
}
