import React, { useState, useEffect } from 'react'
import { Box, Typography, Button, FormControl, MenuItem, Grid } from '@mui/material'
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Learn01 from '../../../public/assets/images/learn01.png'
import Learn02 from '../../../public/assets/images/learn02.png'
import Learn03 from '../../../public/assets/images/learn03.png'
import LoadingImg from '../../../public/assets/images/icons/loading.svg'
import { useNavigate, Link } from 'react-router-dom';
import LoadingButton from '@mui/lab/LoadingButton';
import { tutorialAtom } from "../../_state/";
import { useRecoilValue } from "recoil";
import { useTutorialActions } from "../../_actions/";
const LearnNEarn = () => {

    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [learnEarn, setLearnEarn] = useState('');
    const tutorialsData = useRecoilValue(tutorialAtom);
    const [loadmore, setloadmore] = useState(3);
    const tutorialAction = useTutorialActions();

    console.log(tutorialsData,'tutorialsData');

    useEffect(() =>{
        tutorialAction.tutorialData();
        setIsSubmitting(false)
    },[])
    const handleChangeLearn = (event) => {
        setLearnEarn(event.target.value);
    };

    const handleChanges = (event, value) => {
      
        setIsSubmitting(true)
        setTimeout(() => {
            setloadmore(loadmore +3 )
      }, 400);
      }
    return (
        <>
            <Box className='learn-n-earn'>
                <Box className='learn-n-earn-head'>
                    <Typography component="h2" variant='h2'>
                        Learn and earn
                    </Typography>
                    <Typography className='short-subhead' component="p" variant='body1' sx={{ color: '#353945' }} pt={2}>
                        Stacks is a production-ready library of stackablecontent blocks built in React Native.
                    </Typography>

                    <Box className='for-mobile dropdown-mobile learn-earn-dropdown'>
                        <FormControl sx={{ m: 0, minWidth: 120, width: '100%', textAlign: 'left', fontSize: '14px', fontWeight: '500' }}>
                            <Select
                                value={learnEarn}
                                onChange={handleChangeLearn}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>2D Design</MenuItem>
                                <MenuItem value={20}>3D Design</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>

                </Box>
                <Box className='learn-n-earn-cards'>
                <Grid container columnSpacing={4} rowSpacing={0}>
                
                 
                    {tutorialsData.map((item, index) =>{
                        if(index < loadmore){
                        return(
                            <Grid item xs={12} md={4} xl={4}> 
                                <Box className='learn-n-earn-card'>
                                    <Box className='learn-n-earn-video-wrapper'>
                                        <video poster={Learn01} width="100%" height="100%" controls>
                                        <source src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    </Box>
                                    <span className='learn-badge'>Learn & Earn</span>
                                    <Typography component="p" variant='body1' className='body-large'>
                                        Learn about UI8 coin and earn an All-Access Pass
                                    </Typography>
                                    <Box className='learn-n-earn-by'>
                                        <span className='circle'></span>
                                        <Typography component="small" variant='body2' className='body-caption'>
                                            Floyd Buckridge
                                        </Typography>
                                        <Typography component="small" variant='body2' className='body-caption' sx={{ marginLeft: 'auto' }}>
                                            Feb 03, 2021
                                        </Typography>
                                    </Box>
                                </Box>
                            </Grid>
                        )
                        }
                    })}
                    
                    </Grid>

                </Box>
                {tutorialsData.length >= 3 &&  loadmore <= 3 &&
                <LoadingButton
                    onClick={(e) => handleChanges(e, 3)}
                    // loadingPosition="end"
                    sx={{ width: "160px", alignItems: "center", margin: "0 auto" }}
                    variant="outlined"
                    className="btn btn-outlined-secondary"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? <span > Loading <img className="loading-img" src={LoadingImg} alt="loading" /> </span> : "Load more"}
              </LoadingButton>
                }
            </Box>
        </>
    )
}

export default LearnNEarn
