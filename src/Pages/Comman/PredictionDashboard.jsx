import React, { useEffect } from 'react'
import { ThemeProvider } from '@mui/material/styles';
import { theme } from "../../_common/app.constants"
import { Box, Container, Grid, Typography, Button } from '@mui/material'
import {faqActions} from '../../_actions';
import { useRecoilValue } from 'recoil';
import { faqAtom } from '../../_state';
import CryptoTable from './CryptoTable';
import FAQ01 from '../../../public/assets/images/faq-01.svg'
import FAQ02 from '../../../public/assets/images/faq-02.svg'
import FAQ03 from '../../../public/assets/images/faq-03.svg'
import FAQ04 from '../../../public/assets/images/faq-04.svg'
import FAQ05 from '../../../public/assets/images/faq-05.svg'
import FAQ06 from '../../../public/assets/images/faq-06.svg'
import { useNavigate } from 'react-router-dom';
const PredictionDashboard = () => {

    const navigate = useNavigate();
    const faqGetAction = faqActions();
    const faq = useRecoilValue(faqAtom);


        // Subscription action get function   API data call 
        useEffect(()=>{
            const response = faqGetAction.get()
            response.then((res)=>{(res)})
         },[])
        

    useEffect(() => { window.scrollTo({ top: 0, left: 0, behavior: "smooth" }) },[]);

    const handleView =() =>{
        navigate("/contact")
      
    }
    return (
        <>
            <ThemeProvider theme={theme}>
                <Box component="main" className='prediction-dashboard-wrapper' sx={{ mt: 8 }}>
                    <Box className='market-prediction-dashboard-inner'>
                        <Container maxWidth="lg">
                            <Typography component="h4" variant='h4'>
                                Cryptocurrency Prediction
                            </Typography>
                            <CryptoTable />
                        </Container>
                        <Box className='market-prediction-faq'>
                            <Container maxWidth="lg">
                                <Typography component="h5" variant='body1' className='large-caption'>
                                    FAQ
                                </Typography>
                            </Container>
                            <Box className='market-prediction-faq-items-wrapper'>
                              <Container maxWidth="lg">
                                    <Box className='market-prediction-faq-items'>
                                        {faq.map((item)=> {
                                            return(
                                           <Box className='market-prediction-faq-item'>
                                            <Box className='market-prediction-faq-item-img'>
                                                <img src={`${process.env.REACT_APP_IMAGE_URL}/${item.image}`} alt='FAQ' />
                                            </Box>
                                            <Box className='market-prediction-faq-item-content'>
                                                <Typography component="small" variant='body2' className='small-caption' sx={{ color: '#777E90' }}>
                                                    {item.category}
                                                </Typography>
                                                <Typography component="p" variant='body1' className='body-caption' sx={{ fontWeight: '500' }}>
                                                    {item.title}
                                                </Typography>
                                            </Box>
                                        </Box>
                                            )
                                        })}
                                    </Box>
                                    <Button
                                        onClick={handleView}
                                       
                                        sx={{ mt: 2 }}
                                        variant="outlined"
                                        className='btn btn-outlined-secondary'>
                                        View All
                                    </Button>
                                </Container>
                              
                            </Box>
                        </Box>
                    </Box>
          </Box>
      </ThemeProvider>
    </>
  );
};

export default PredictionDashboard;
