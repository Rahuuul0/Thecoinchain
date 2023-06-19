import * as React from 'react';
import { useRecoilState } from 'recoil';
import PropTypes from 'prop-types';
import { Box, Typography, Stack } from '@mui/material';
import UserIcon from '../../../../public/assets/images/user.svg';
import ShareIcon from '../../../../public/assets/images/share-square.svg';
import SessionIcon from '../../../../public/assets/images/session.svg';
import SubscriptionIcon from '../../../../public/assets/images/account-subscription.svg';
import FaIcon from '../../../../public/assets/images/fa.svg';
import Lockbtn from '../../../../public/assets/images/lockbtn.svg';
import { useNavigate } from 'react-router-dom';
import { sidebarAtom } from '../../../_state';



const Sidebar = (props) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab ] = useRecoilState(sidebarAtom);
  
  return (
    <Box className='subscription-steps-col'>
      <Stack spacing={2}>
        <Box sx={{ borderBottom: '1px solid #E6E8EC' }} paddingBottom={2}>
          <Typography onClick={(e) => { setActiveTab("profile");navigate('/account/profile') }}  className={`left-icon secondary-color ${activeTab==="profile"? 'text-black' : ''}`} paddingBottom={4} fontWeight={700}><span><img src={UserIcon} /> </span>Profile</Typography>
          <Typography onClick={(e) => {setActiveTab("referrals"); navigate('/account/referrals') }}  className={`left-icon secondary-color ${activeTab==="referrals"? 'text-black' : ''}`} paddingBottom={4}><span><img src={ShareIcon} /> </span>Referrals</Typography>
          {/* <Typography className='left-icon secondary-color' paddingBottom={2}><span><img src={SubscriptionIcon} /> </span>API keys</Typography> */}
          <Typography onClick={() => {setActiveTab("Subscription"); navigate('/account/forecast-subscription') }} className={`left-icon secondary-color ${activeTab==="Subscription"? 'text-black' : ''}`} paddingBottom={2}><span><img src={SubscriptionIcon} /> </span>Subscriptions</Typography>
        </Box>
        <Box paddingTop={2}>
          <Typography onClick={() => {setActiveTab("sessionAndHistory"); navigate('/account/session-and-history') }} className={`left-icon secondary-color ${activeTab==="sessionAndHistory"? 'text-black' : ''}`} paddingBottom={4}><span><img src={SessionIcon} /> </span>Sessions & login history</Typography>
          <Typography onClick={() => {setActiveTab("2fa"); navigate('/account/2fa-enable') }} className={`left-icon secondary-color ${activeTab==="2fa"? 'text-black' : ''}`}  paddingBottom={4}><span><img src={FaIcon} /> </span>2FA</Typography>
          <Typography onClick={() => {setActiveTab("changePassword"); navigate('/account/change-account-password') }} className={`left-icon secondary-color ${activeTab==="changePassword"? 'text-black' : ''}`} paddingBottom={4}><span><img src={Lockbtn} /> </span>Change password</Typography>
        </Box>
      </Stack>
    </Box>
  );
}

Sidebar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Sidebar;