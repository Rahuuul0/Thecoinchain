
import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { Checkbox, Container, Box, TextField, Typography, Link, Button, FormControlLabel } from '@mui/material'
import axios from 'axios';
import GoogleIcon from '@mui/icons-material/Google';

function GoogleAuth(props) {
    const [ user, setUser ] = useState([]);

    const login = useGoogleLogin({
        ux_mode:"redirect",
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error),
    });

    useEffect(
        () => {
            if (user) {
                axios
                    .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: 'application/json'
                        }
                    })
                    .then((res) => {
                        props.setProfile(res.data);
                    })
                    .catch((err) => console.log(err));
            }
        },
        [ user ]
    );
    return ( 
        <Button onClick={() => login()} variant="contained" className='btn btn-primary'  startIcon={<GoogleIcon />}>Google1</Button>
    );
}

export default GoogleAuth;