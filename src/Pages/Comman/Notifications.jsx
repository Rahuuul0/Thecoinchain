import React, { useState,useEffect } from 'react'
import { ThemeProvider } from '@mui/material/styles';
import { theme } from "../../_common/app.constants";
import { Box, Container, Typography, Button, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import BoltOutlinedIcon from '@mui/icons-material/BoltOutlined';
import LoadMoreIc from '../../../public/assets/images/icons/cale-ic.svg'
import DepositImg from '../../../public/assets/images/deposit.svg'
import TransferImg from '../../../public/assets/images/transfer.svg'
import ArrowRightAltOutlinedIcon from '@mui/icons-material/ArrowRightAltOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {notificationAtom} from '../../_state/notifications';
import {notificationActions} from '../../_actions/notification.actions';
import { useRecoilValue } from "recoil";


const Notifications = () => {
    const notificationAction = notificationActions();
    const notifications = useRecoilValue(notificationAtom);
    const [loadMoreList,setLoadMoreList]=useState([notifications])
    const [loadmore,setLoadmore] = useState([]);
    const [select, setSelect] = useState(true);
    // const [select2, setSelect2] = useState(false)
    const [categoryArr,setCategoryArr]=useState([]);
    const [notificationList,setNotificationList]=useState([]);

    console.log(select, "notifications")
    
    const [notification ,setnotification] = useState([])
    const handleClear =() =>{
        notificationAction.clearData()
    }
   const markAllread = () =>{
            notificationAction.markAllread()
   }
    const handleSelectAll =(e) =>{
        setSelect(true);
        // setSelect2(true);
        alert('fghfhfhgfhf')
  
    }
    const handleUnselectAll =() =>{
        setSelect(false);
        // setSelect2(false);
    
    }

   const handleLoadmore =() =>{
         setLoadmore(loadmore +5)
   }

useEffect(() =>{

    notificationAction.notificationList()
    notificationAction.categoryNotifications() 
    
     
},[])

useEffect(()=>{
    setNotificationList(notifications)

},[notifications])

const filterNotifications =(category) =>{
      
 console.log(categoryArr,"catArr")   
const notificationArr = notifications.filter((item) => categoryArr?.includes(item.ct_notify_catrgory));
setNotificationList(notificationArr)
// setSelect(true);

}
        // load more  code user  code futrue user

//    useEffect(()=>{
    
//     let arr = notifications.filter( (item, index ,startIndex) =>  
//       if(index<loadmore && index>=startIndex)
//         return item;
// );
//   setLoadMoreList(arr)
//    },[])

//    useEffect(()=>{
//     let startIndex=loadmore-1;
//     let arr = notifications.filter( (item, index ,startIndex) =>  
//        if(index<loadmore && index>=startIndex)
//         return item;);
//      setLoadMoreList(arr)
//    },[loadmore])
 console.log(notificationList,'dfgdfgdfgdfgfd')

    return (
        <>




            <ThemeProvider theme={theme}>
                <Box component="main" className='notification-wrapper' sx={{ mt: 8 }}>
                    <Container maxWidth="lg">
                        <Box className='notification-inner'>
                            <Box className='notification-list-card'>
                                <Box className='notification-wrapper-head'>
                                    <Typography component="h4" variant='h4'>
                                        Notifications
                                    </Typography>

                                    <Box className='notification-head-cta'>
                                        <Box className="modal-subscribed-cta">
                                            <Button onClick={markAllread} variant="outlined" className='btn btn-outlined-secondary' >Mark all as read</Button>
                                            <Button onClick={handleClear} variant="outlined" className='btn btn-outlined-secondary' >Clear all</Button>
                                        </Box>
                                    </Box>
                                </Box>
                                <Box className="devider" />
                                <Box className='notification-list-wrapper'>
                                    <Box className='notification-list'>


                                        {notificationList?.map((item,index) =>{
                                        
                                            return(
                                             
                                                <Box className='notification-list-itm'>
                                                    <Box className='notification-icon'>
                                                        <BoltOutlinedIcon />
                                                    </Box>
                                                    <Box className='notification-title'>
                                                        <Typography component="p" variant='body'>
                                                           {item.ct_notify_title}
                                                        </Typography>
                                                        <Typography component="small" variant='body2'>
                                                            {item.ct_notify_msg}
                                                        </Typography>
                                                        <Typography component="small" variant='body2'>
                                                            {item.ct_notify_catrgory}
                                                        </Typography>
                                                    </Box>
                                                    <Box className='notification-date'>
                                                        <Typography component="small" variant='body2'>
                                                            <span className='n-date'> {item.ct_notify_created_At} </span>
                                                        </Typography>
                                                        <span className='notification-circle'></span>
                                                    </Box>
                                                </Box>
                                        
                                            )
                                           
                                        })}
                                       
                                    
                                        <Button onClick={handleLoadmore}  variant="outlined" className='btn btn-outlined-secondary' sx={{ mx: 'auto' }}>Load more <img src={LoadMoreIc} alt='' /> </Button>
                            
                                    </Box>
                                    <Box className='notification-filter for-desktop'>
                                        <Typography component="h5" variant='h5'>
                                            Filters
                                        </Typography>

                                        <FormGroup>
                                            <FormControlLabel control={<Checkbox   />} onClick={(e)=>{categoryArr.push("Crypto Prediction");filterNotifications("Crypto Prediction")}}   Checked={select}   label="Crypto Prediction" />
                                            <FormControlLabel control={<Checkbox />}   onClick={(e)=>{categoryArr.push("Community");filterNotifications("Community")}}  Checked={select} label="Community" />
                                            <FormControlLabel control={<Checkbox  />}  onClick={(e)=>{categoryArr.push("Academy");filterNotifications("Academy")}} Checked={select} label="Academy" />
                                            <FormControlLabel control={<Checkbox />}   onClick={()=>{categoryArr.push("News");filterNotifications("News")}}  Checked={select} label="News" />
                                        </FormGroup>

                                        <Box className='notification-filter-cta'>
                                            <Button 
                                                onClick={handleSelectAll}
                                                isChecked={select}
                                                size='small' variant="outlined" 
                                                className='btn btn-outlined-secondary'
                                             >Select all</Button>
                                            <Button 
                                                onClick={handleUnselectAll}
                                                isChecked={!select}
                                                size='small' variant="outlined"
                                                className='btn btn-outlined-secondary'>
                                                Unselect all
                                              </Button>
                                        </Box>
                                    </Box>

                                </Box>
                            </Box>
                            <Box className='deposit-transfer'>
                                <Box className="deposit-transfer-card">
                                    <Box className="deposit-transfer-img">
                                        <img src={DepositImg} alt='Deposit' />
                                    </Box>
                                    <Box className="deposit-transfer-details">
                                        <Typography component="h5" variant='h5'>
                                            Bank deposit
                                        </Typography>
                                        <Typography component="p" variant='body1' className='body-caption'>
                                            Deposit crypto or cash currency to your wallet and start trading on the world largest exchange!
                                        </Typography>
                                        <Button size='small' variant="outlined" className='btn btn-outlined-secondary' endIcon={<ArrowRightAltOutlinedIcon />}>Bank deposit</Button>
                                    </Box>
                                </Box>
                                <Box className="deposit-transfer-card">
                                    <Box className="deposit-transfer-img">
                                        <img src={TransferImg} alt='Transfer' />
                                    </Box>
                                    <Box className="deposit-transfer-details">
                                        <Typography component="h5" variant='h5'>
                                            Transfer
                                        </Typography>
                                        <Typography component="p" variant='body1' className='body-caption'>
                                            Internal transfers are free on Bitcloud.
                                        </Typography>
                                        <Button size='small' variant="outlined" className='btn btn-outlined-secondary' endIcon={<ArrowRightAltOutlinedIcon />}>Transfer coin</Button>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Container>
                </Box>
            </ThemeProvider>
        </>
    )
}

export default Notifications
