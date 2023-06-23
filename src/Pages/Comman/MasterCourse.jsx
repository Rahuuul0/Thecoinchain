import React from 'react'
import { ThemeProvider } from '@mui/material/styles';
import { theme } from "../../_common/app.constants"
import { Box, Container, Typography, Breadcrumbs } from '@mui/material';
import { NavigateNext } from '@mui/icons-material/';
import { Link } from "react-router-dom"; 
import BTCIc from "../../../public/assets/images/icons/btc-ic.svg";


const MasterCourse = () => {
    const breadcrumbs = [
        <Link to="/" underline="hover" key="1" color="inherit" >
            Home
        </Link>,
        <Typography key="3" color="text.primary">
            Master Course
        </Typography>,
    ];
    return (
        <>
            <ThemeProvider theme={theme}>
                <Box component="main" className='community-wrapper subscription-wrapper bredcrum-div' sx={{ mt: 8 }}>
                    <Container maxWidth="lg">
                        <Box className='subscription-wrapper-head'>
                            <Typography component="h2" variant='h2'>
                            Master Course
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
                        <Box className='page-inner'>
                            <Typography component="p" variant='body2'>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non, autem facere! Excepturi ea minima sapiente aliquid id. Fuga molestias modi dolore amet deleniti itaque nostrum facere excepturi, laborum nesciunt magnam distinctio consectetur sit nulla reiciendis? Unde odio quis aliquam architecto illo consectetur cumque corporis! Tenetur, delectus repellat amet excepturi, temporibus corporis aliquid modi natus maxime architecto iusto, adipisci facere officia nostrum alias ducimus dolor. Nostrum ducimus possimus, placeat dignissimos, ipsam illum tenetur id obcaecati perspiciatis, atque ex? Sint necessitatibus totam saepe vitae consectetur, sapiente vel at deserunt dolorum ducimus fugit quis nemo fugiat perferendis laborum error adipisci commodi exercitationem labore recusandae voluptate quos? Minima, explicabo! Illum voluptates in sequi sapiente recusandae cum pariatur? Deleniti nemo ipsum nostrum doloribus distinctio assumenda totam deserunt eius soluta? Quae numquam ea explicabo officia at, fugiat modi libero nihil eos totam veniam minus quidem voluptatem neque consequuntur eveniet. Impedit, aliquam ipsa quibusdam aliquid cumque fugiat dolores vitae tempora quis, suscipit harum iusto, quaerat ab. Molestias ab laborum odio soluta tenetur eveniet vitae dolorum? Modi sint maiores ex nihil? Fugit in perspiciatis distinctio officia iste vel! Non reprehenderit illum ipsum, quis, a similique suscipit explicabo debitis, incidunt nihil rem at eligendi. Expedita repellendus sunt provident quae?
                            </Typography>
                        </Box>
                    </Container>
                </Box>
            </ThemeProvider>
        </>
    )
}

export default MasterCourse
