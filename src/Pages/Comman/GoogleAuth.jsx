
import React, { useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import {  Button } from '@mui/material'
import GoogleIcon from '@mui/icons-material/Google';
import { useUserActions } from "../../_actions/user.actions"

function GoogleAuth() {    
    const userActions = useUserActions();
    const login = useGoogleLogin({
        ux_mode:"redirect",
        onSuccess: (codeResponse) => {
            userActions.googleAuth(codeResponse)},
        onError: (error) => console.log('Login Failed:', error),
    });
    return ( 
        <Button onClick={() => {login()}} variant="contained" className='btn btn-primary'  startIcon={<GoogleIcon />}>Google</Button>
    );
}

export default GoogleAuth;