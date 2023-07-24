import { Container, Typography, Box, Breadcrumbs, } from '@mui/material';
import React from 'react';
import { useEffect } from 'react';
import { Link } from "react-router-dom"; 
import { EmailOutlined, NavigateNext, VisibilityOutlined } from '@mui/icons-material/';


const TermsOfUse = () => {

    const breadcrumbs = [
        <Link to="/" underline="hover" key="1" color="inherit" >
            Home
        </Link>,
        <Typography key="3" color="text.primary" sx={{ m: "0!important" }}>
            Terms of use
        </Typography>,
    ];
    useEffect(() => { window.scrollTo({ top: 0, left: 0, behavior: "smooth" }) });
    return (
        <>
            <Box component="main" className='extra-wrapper subscription-wrapper bredcrum-div' sx={{ mt: 8 }}>
                <Container maxWidth="lg">
                    <Box className='subscription-wrapper-head'>
                        <Typography component="h2" variant='h2'>
                            Terms of use
                        </Typography>

                        <Box className='' sx={{ color: '#777E90', fontWeight: '500', }}>
                            <Box  >
                                <Breadcrumbs
                                    separator={<NavigateNext fontSize="small" />}
                                    aria-label="breadcrumb"
                                    className='center-breadcrum'
                                >
                                    {breadcrumbs}
                                </Breadcrumbs>

                            </Box>
                        </Box>
                    </Box>
                    <Typography variant='body2' component="p">
                        The usage of this website constitutes acceptance of the following legal information. Any contracts of financial instruments offered to conclude bear high risks and may result in the full loss of the deposited funds. Prior to making transactions one should get acquainted with the risks to which they relate. All the information featured on the website, including information about the cryptocurrencies and bitcoin is intended solely for informational purposes, is not a means of advertising them, and doesn't imply direct instructions for investing. Coin Guru shall not be liable for any loss, including unlimited loss of funds, which may arise directly or indirectly from the usage of this information. The editorial staff of the website does not bear any responsibility whatsoever for the content of the comments or reviews made by the site users about cryptocurrencies. The entire responsibility for the contents rests with the authors. Reprint of the materials is available only with the permission of the editorial staff.
                    </Typography>
                </Container>
            </Box>
        </>
    )
}

export default TermsOfUse
