import * as React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Stack } from '@mui/material';
import User from '../../../../public/assets/images/user.svg';
import Share from '../../../../public/assets/images/share-square.svg';
import Session from '../../../../public/assets/images/session.svg';
import Api from '../../../../public/assets/images/api.svg';
import FA from '../../../../public/assets/images/fa.svg';
import Lockbtn from '../../../../public/assets/images/lockbtn.svg';
import { useNavigate } from 'react-router-dom';


const Sidebar = (props) => {
  const navigate = useNavigate();

  return (
    <Box className='subscription-steps-col'>
      <Stack spacing={2}>
        <Box sx={{ borderBottom: '1px solid #E6E8EC' }} paddingBottom={2}>
          <Typography onClick={() => { navigate('/account/profile') }} className='left-icon secondary-color' paddingBottom={4} fontWeight={700}><span><img src={User} /> </span>Profile</Typography>
          <Typography onClick={() => { navigate('/account/referrals') }} className='left-icon secondary-color' paddingBottom={4}><span><img src={Share} /> </span>Referrals</Typography>
          <Typography className='left-icon secondary-color' paddingBottom={2}><span><img src={Api} /> </span>API keys</Typography>
        </Box>
        <Box paddingTop={2}>
          <Typography onClick={() => { navigate('/account/session-and-history') }} className='left-icon secondary-color' paddingBottom={4}><span><img src={Session} /> </span>Sessions & login history</Typography>
          <Typography onClick={() => { navigate('/account/2fa-enable') }} className='left-icon secondary-color' paddingBottom={4}><span><img src={FA} /> </span>2FA</Typography>
          <Typography onClick={() => { navigate('/account/change-account-password') }} className='left-icon secondary-color' paddingBottom={4}><span><img src={Lockbtn} /> </span>Change password</Typography>
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