import { Container, Typography, Box } from '@mui/material'
import React from 'react'

const TermsOfUse = () => {
    return (
        <>
            <Box component="main" className='extra-wrapper' sx={{ mt: 8 }}>
                <Container>
                    <Typography variant='h1' component="h1" className='extra-heading'>Terms of use</Typography>
                    <Typography variant='body2' component="p">
                        The usage of this website constitutes acceptance of the following legal information. Any contracts of financial instruments offered to conclude bear high risks and may result in the full loss of the deposited funds. Prior to making transactions one should get acquainted with the risks to which they relate. All the information featured on the website, including information about the cryptocurrencies and bitcoin is intended solely for informational purposes, is not a means of advertising them, and doesn't imply direct instructions for investing. Crypto Rating shall not be liable for any loss, including unlimited loss of funds, which may arise directly or indirectly from the usage of this information. The editorial staff of the website does not bear any responsibility whatsoever for the content of the comments or reviews made by the site users about cryptocurrencies. The entire responsibility for the contents rests with the authors. Reprint of the materials is available only with the permission of the editorial staff.
                    </Typography>

                </Container>
            </Box>
        </>
    )
}

export default TermsOfUse
