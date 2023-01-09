import { useState } from 'react';
import { Box, TextField, Button, styled, Typography } from '@mui/material';

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

export default function Login() {

    const [account, toggleAccount] = useState('login');
    const toggleSignup= ()=>{
        account === 'signup' ? toggleAccount('login'): toggleAccount('signup');
    }

    return (
        <Component>
            <Box>
                <Image src={imageURL} alt="loginLogo" />
                {account === 'login' ? 
                <Wrapper>
                    <TextField variant='standard' placeholder='Enter Username' />
                    <TextField variant='standard' placeholder='Enter Password' />
                    <LoginButton variant="contained">Login</LoginButton>
                    <Text varirant='h5' style={{ textAlign: 'center' }}>OR</Text>
                    <SignupButton onClick={()=>toggleSignup()}>Create an Account</SignupButton>
                </Wrapper> 
                :                 
                <Wrapper>
                    <TextField variant='standard' placeholder='Enter Name' />
                    <TextField variant='standard' placeholder='Enter Username' />
                    <TextField variant='standard' placeholder='Enter Password' />
                    <SignupButton>Signup</SignupButton>
                    <Text varirant='h5' style={{ textAlign: 'center' }}>OR</Text>
                    <LoginButton variant='contained' onClick={()=>{toggleSignup()}}>Already have an account</LoginButton>
                </Wrapper>}


            </Box>
        </Component>
    )
}
