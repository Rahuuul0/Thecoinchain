import React from 'react'
import { Link, Grid, Container, Typography, Toolbar, Box, CssBaseline, Button } from '@mui/material';
import Partner01 from '../../../public/assets/images/partners/buseness_insder.png'
import Partner02 from '../../../public/assets/images/partners/finance-magnates.png'
import Partner03 from '../../../public/assets/images/partners/kasobu.png'
import Partner04 from '../../../public/assets/images/partners/south-china.png'
import Partner05 from '../../../public/assets/images/partners/ct.png'
import Partner06 from '../../../public/assets/images/partners/coindesk.png'
import Partner07 from '../../../public/assets/images/partners/investing.png'
import Partner08 from '../../../public/assets/images/partners/TIA.png'

const PartnersLogos = () => {
    return (
        <>
            <Box component="div" className='partner-logos'>
                <Box component="div" className='partner-logos-inner'>
                    <Box component="span" className='partner-logo-wrapper'>
                        <img src={Partner01} alt='Partner logo' />
                    </Box>
                    <Box component="span" className='partner-logo-wrapper'>
                        <img src={Partner02} alt='Partner logo' />
                    </Box>
                    <Box component="span" className='partner-logo-wrapper'>
                        <img src={Partner03} alt='Partner logo' />
                    </Box>
                    <Box component="span" className='partner-logo-wrapper'>
                        <img src={Partner04} alt='Partner logo' />
                    </Box>
                    <Box component="span" className='partner-logo-wrapper'>
                        <img src={Partner05} alt='Partner logo' />
                    </Box>
                    <Box component="span" className='partner-logo-wrapper'>
                        <img src={Partner06} alt='Partner logo' />
                    </Box>
                    <Box component="span" className='partner-logo-wrapper'>
                        <img src={Partner07} alt='Partner logo' />
                    </Box>
                    <Box component="span" className='partner-logo-wrapper'>
                        <img src={Partner08} alt='Partner logo' />
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default PartnersLogos
