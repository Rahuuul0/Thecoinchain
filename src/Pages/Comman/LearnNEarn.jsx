import React, { useState, useEffect } from 'react'
import { Box, Typography, Button, FormControl, MenuItem, Grid } from '@mui/material'
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Learn01 from '../../../public/assets/images/learn01.png'
import Learn02 from '../../../public/assets/images/learn02.png'
import Learn03 from '../../../public/assets/images/learn03.png'
import LoadingImg from '../../../public/assets/images/icons/loading.svg'
import { useNavigate, Link } from 'react-router-dom';
import LoadingButton from '@mui/lab/LoadingButton';
import { tutorialAtom, marketBlogListAtom, blogListAtom, blogimgAtom, blogVideoAtom } from "../../_state/";
import { useRecoilValue, useRecoilState } from "recoil";
import { useTutorialActions } from "../../_actions/";
import { RoutesName } from "../../_common/app.constants";
import dayjs from "dayjs";

const LearnNEarn = () => {

    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [learnEarn, setLearnEarn] = useState('');
    const marketBlogLists = useRecoilValue(marketBlogListAtom);
    const [blogImg, setBlogimg] = useRecoilState(blogListAtom)
    const [blogNew, setBlognew] = useRecoilState(blogimgAtom)
    const [blogVideo, setBlogvideo] = useRecoilState(blogVideoAtom)
    const [loadmore, setloadmore] = useState(3);
    const tutorialAction = useTutorialActions();

    useEffect(() =>{
        tutorialAction.marketBlogList();
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

    const imgLink = (data) => {
        let guideSeo = data.slug
        navigate(`${RoutesName.learn_Crypto_Details}/learnandearn/${guideSeo}`)
        setBlogimg(data)
        setBlognew(true)
        setBlogvideo(true)
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
                
                 
                    {marketBlogLists.map((item, index) =>{
                        if(index < loadmore){
                        return(
                            <Grid item xs={12} md={4} xl={4}> 
                                <Box className='learn-n-earn-card'
                                 onClick={() => imgLink(item)}
                                 sx={{ cursor: "pointer" }}
                                >
                                    <Box className='learn-n-earn-video-wrapper'>
                                        <video poster={Learn01} width="100%" height="100%" controls>
                                        <source src={item.video_link} type="video/mp4" />
                                            {/* {item.title} */}
                                        </video>
                                    </Box>
                                    <span className='learn-badge'>{item.tag}</span>
                                    <Typography sx={{minHeight: '70px', maxHeight: '70px', overflow: 'hidden'}} component="p" variant='body1' className='body-large'>
                                        {item.title}
                                    </Typography>
                                    <Box className='learn-n-earn-by'>
                                        <span className='circle'></span>
                                        <Typography component="small" variant='body2' className='body-caption'>
                                            {item.created_by}
                                        </Typography>
                                        <Typography component="small" variant='body2' className='body-caption' sx={{ marginLeft: 'auto' }}>
                                              {dayjs(item.created_at).format("MMM DD, YYYY" )} 
                                        </Typography>
                                    </Box>
                                </Box>
                            </Grid>
                        )
                        }
                    })}
                    
                    </Grid>

                </Box>
                {marketBlogLists.length >= 3 &&  loadmore <= 3 &&
                <LoadingButton
                    onClick={(e) => handleChanges(e, 3)}
                    // loadingPosition="end"
                    sx={{ width: "160px", alignItems: "center", margin: "0 auto" }}
                    variant="outlined"
                    className="btn btn-outlined-secondary"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? <span > Loading <img className="loading-img" src={LoadingImg} alt="loading" /> </span> : (<> <img src={LoadingImg}  alt="loading"/> Load more </> )}
              </LoadingButton>
                }
            </Box>
        </>
    )
}

export default LearnNEarn
