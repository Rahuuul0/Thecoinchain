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

    // useEffect(
    //     () => {
    //         if (user) {
    //             // axios
    //             //     .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
    //             //         headers: {
    //             //             Authorization: `Bearer ${user.access_token}`,
    //             //             Accept: 'application/json'
    //             //         }
    //             //     })
    //             //     .then((res) => {
    //             //         props.setProfile(res.data);
    //             //     })
    //             //     .catch((err) => console.log(err));
               
    //         }
    //     },
    //     [ user ]
    // );
    return ( 
                <Button onClick={() => login()} variant="contained" className='btn btn-primary'  startIcon={<GoogleIcon />}>Google</Button>
    );
}

export default GoogleLogin;