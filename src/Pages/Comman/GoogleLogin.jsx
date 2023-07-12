import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import {  Button } from '@mui/material'
import axios from 'axios';
import GoogleIcon from '@mui/icons-material/Google';
import { useUserActions } from "../../_actions/user.actions"

function GoogleLogin(props) {
    const [ user, setUser ] = useState([]);
    const userActions = useUserActions();

    const login = useGoogleLogin({
        ux_mode:"redirect",
        onSuccess: (codeResponse) => {setUser(codeResponse),
              userActions.googleLogin(codeResponse)},
        onError: (error) => console.log('Login Failed:', error),
    });    
    return ( 
                <Button onClick={() => login()} variant="contained" className='btn btn-primary'  startIcon={<GoogleIcon />}>Google</Button>
    );
}

export default GoogleLogin;