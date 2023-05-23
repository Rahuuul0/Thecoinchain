
import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { Checkbox, Container, Box, TextField, Typography, Link, Button, FormControlLabel } from '@mui/material'
import axios from 'axios';
import GoogleIcon from '@mui/icons-material/Google';

function GoogleAuth() {
    const [ user, setUser ] = useState([]);
    const [ profile, setProfile ] = useState([]);

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
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
                        setProfile(res.data);
                    })
                    .catch((err) => console.log(err));
            }
        },
        [ user ]
    );
    return ( 
                <Button target="_blank" onClick={() => login()} variant="contained" className='btn btn-primary'  startIcon={<GoogleIcon />}>Google</Button>
    );
}

export default GoogleAuth;