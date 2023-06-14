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
import {notificationAtom, authAtom} from '../../_state/';
import {notificationActions} from '../../_actions/notification.actions';
import { useRecoilValue } from "recoil";

const Notifications = () => {
    const notificationAction = notificationActions();
    const notifications = useRecoilValue(notificationAtom);
    const userDetails = useRecoilValue(authAtom);
    const [loadMoreList,setLoadMoreList]=useState([notifications])
    const [loadmore,setLoadmore] = useState(10);
    const [checked, setChecked] = useState(false)
    const [categoryArray,setCategoryArray]=useState([]);
    const [notificationList,setNotificationList]=useState([]);
    const [notification ,setnotification] = useState([])
    const [filterCategory,setFilterCategory]=useState(['Crypto Prediction','Community','Academy','News'])
    const [checkCategoryFilter,setCheckCategoryFilter]=useState({})
    const [checkCrypto,setCheckCrypto]=useState(false)
    const [checkCommunity,setCheckCommunity]=useState(false)
    const [checkAcademy,setCheckAcademy]=useState(false)
    const [checkNews,setCheckNews]=useState(false)

    const handleClear = async() => {
         notificationAction.clearNotifications();
        };
     
    //   Filter selectAll and UnselectAll function
    const handleSelectAll =(flag) =>{
        if(flag){
            setCheckCrypto(true)
            setCheckCommunity(true)
            setCheckAcademy(true)
            setCheckNews(true)
            let CheckArray=checkCategoryFilter;
            filterCategory.map((cat,idx)=>{
                CheckArray[cat]=true
                const index = categoryArray.indexOf(cat);
                if(index === -1)
                categoryArray.push(cat);    
              })
            setCheckCategoryFilter(CheckArray)
            filterNotifications()
        }else{
            setCheckCrypto(false)
            setCheckCommunity(false)
            setCheckAcademy(false)
            setCheckNews(false)
            let CheckArray=checkCategoryFilter;
            filterCategory.map((cat,idx)=>{
               CheckArray[cat]=false
               const index = categoryArray.indexOf(cat);
                if(index > -1)
                 categoryArray.splice(index,1);    
            })
            setCheckCategoryFilter(CheckArray)
            filterNotifications()
            }
       flag ? setChecked(true):setChecked(false)
       
    }
  
    const handleLoadmore =() =>{
         setLoadmore(loadmore +5)
   }

//    filter category by data  notifications function
    useEffect(() =>{
        filterCategory.map((cat,idx)=>{
        checkCategoryFilter[cat]=false
    })
        let userId = userDetails.id;
        notificationAction.notificationList()
        notificationAction.categoryNotifications(userId,) 
        
    },[])

    useEffect(()=>{
        setNotificationList(notifications)

    },[notifications])

    const filterNotifications =() =>{
    const notificationArr = notifications.filter((item) => categoryArray?.includes(item.ct_notify_catrgory));
        setNotificationList(notificationArr.length?notificationArr:notifications)
    }

    const handleChange = (cat)=>{
        let CheckArray=checkCategoryFilter;
        CheckArray[cat]=!checkCategoryFilter[cat]
        const index = categoryArray.indexOf(cat);
        if(checkCategoryFilter[cat]){
            categoryArray.push(cat)
        }else{
            const index = categoryArray.indexOf(cat);
            if (index > -1)
            categoryArray.splice(index, 1);  
        }
        filterNotifications()
        setCheckCategoryFilter(CheckArray)
        if(cat==="Crypto Prediction")
        setCheckCrypto(!checkCrypto)
        if(cat==="Community")
        setCheckCommunity(!checkCommunity)
        if(cat==="Academy")
        setCheckAcademy(!checkAcademy)
        if(cat==="News")
        setCheckNews(!checkNews)
        categoryArray.length===4?setChecked(true):setChecked(false)
    }
        // load more  code user  code futrue user

//   useEffect(()=>{
//     console.log(loadmore,"loadMore")
//     let startIndex=loadmore-1;
   
//     const arr = notifications.filter((item, index ,startIndex) => {
//         if(index< startIndex<loadmore)
//           return item;      
//       });
//     console.log(arr,"arr")  
//    },[loadmore])


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
                                            <Button onClick={handleClear} variant="outlined" className='btn btn-outlined-secondary' >Mark all as read</Button>
                                            <Button onClick={handleClear} variant="outlined" className='btn btn-outlined-secondary' >Clear all</Button>
                                        </Box>
                                    </Box>
                                </Box>
                                <Box className="devider" />
                                <Box className='notification-list-wrapper'>
                                    <Box className='notification-list'>


                                        {notificationList?.map((item,index) =>{
                                            if(index < loadmore){

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
                                        }
                                        })}
                                       
                                    
                                        <Button onClick={handleLoadmore}  variant="outlined" className='btn btn-outlined-secondary' sx={{ mx: 'auto' }}>Load more <img src={LoadMoreIc} alt='' /> </Button>
                            
                                    </Box>
                                    <Box className='notification-filter for-desktop'>
                                        <Typography component="h5" variant='h5'>
                                            Filters
                                        </Typography>

                                        <FormGroup>
                                            <FormControlLabel control={<Checkbox checked={checkCrypto}  onChange={(e)=>{ handleChange("Crypto Prediction");}} />} label="Crypto Prediction" />
                                            <FormControlLabel control={<Checkbox checked={checkCommunity}  onChange={(e)=>{ handleChange("Community");}} />} label="Community" />
                                            <FormControlLabel control={<Checkbox  checked={checkAcademy}  onChange={(e)=>{ handleChange("Academy");}} />} label="Academy" />
                                            <FormControlLabel control={<Checkbox checked={checkNews}  onChange={(e)=>{ handleChange("News");}} />}  label="News" />
                                        </FormGroup>

                                        <Box className='notification-filter-cta'>
                                         {!checked? <Button 
                                                onClick={(e)=>handleSelectAll(true)}
                                                size='small' variant="outlined" 
                                                className='btn btn-outlined-secondary'
                                             >Select all</Button>
                                            :<Button 
                                                onClick={(e)=>handleSelectAll(false)}
                                                size='small' variant="outlined"
                                                className='btn btn-outlined-secondary'>
                                                Unselect all
                                              </Button>
                                         }
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
