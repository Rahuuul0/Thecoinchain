import React, { useState } from 'react';
import { Box, Container, Typography, Button, FormControl, MenuItem ,Stack} from '@mui/material';

import Tab from '@mui/material/Tab';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import GraphUp from '../../../public/assets/images/chart-up.svg';
import GraphDown from '../../../public/assets/images/chart-down.svg';
import BtcIc from '../../../public/assets/images/icons/btc-ic.svg';
import AtcIc from '../../../public/assets/images/icons/atc-ic.svg';
import EthIc from '../../../public/assets/images/icons/eth-ic.svg';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import {useCoinActions} from "../../_actions"
import {coinCategoryAtom,selectedCategoryAtom} from "../../_state";
const MarketCard = () => {
    const navigate = useNavigate();
    const [value, setValue] = useState('1');
    const coinActions = useCoinActions()
    const categoryList = useRecoilValue(coinCategoryAtom);
    const selectedCat = useRecoilValue(selectedCategoryAtom);    

    const [tablefilter, setTablefilter] = useState('');
    const handleChangeTablefilter = (event) => {
        setTablefilter(event.target.value);
    };

    const getFirstLetters = (str) => {
        const firstLetters = str.replace("Portfolio", "");
        return firstLetters;
    }
    return (
        <>
            <Box className='market-crypto-card-wrapper'>
                <Container maxWidth="lg">
                    <Box className='market-crypto-card-wrapper-inner'>
                        <Box className='market-crypto-graph'>
                            <Box className='market-crypto-graph-col'>
                                <Box className='market-crypto-graph-ic'>
                                    <img src={BtcIc} alt='' />
                                </Box>
                                <Box className='market-crypto-graph-details'>
                                    <Box className='market-crypto-name'>
                                        <Typography component="small" varient="body2" className='currency-name'>BTC/USDT <span className='status-badge'>+0.79%</span></Typography>
                                        <Typography component="h5" varient="h5">36,641.20</Typography>
                                        <Typography component="small" varient="small-caption">36,641.20</Typography>
                                    </Box>
                                </Box>
                                <Box className='market-crypto-graph-details'>
                                    <img src={GraphUp} alt='' />
                                </Box>
                            </Box>
                            <Box className='market-crypto-graph-col'>
                                <Box className='market-crypto-graph-ic'>
                                    <img src={AtcIc} alt='' />
                                </Box>
                                <Box className='market-crypto-graph-details'>
                                    <Box className='market-crypto-name'>
                                        <Typography component="small" varient="body2" className='currency-name'>ATC/USDT <span className='status-badge status-down'>-0.79%</span></Typography>
                                        <Typography component="h5" varient="h5">41.20</Typography>
                                        <Typography component="small" varient="small-caption">41.20</Typography>
                                    </Box>
                                </Box>
                                <Box className='market-crypto-graph-details'>
                                    <img src={GraphDown} alt='' />
                                </Box>
                            </Box>
                            <Box className='market-crypto-graph-col'>
                                <Box className='market-crypto-graph-ic'>
                                    <img src={EthIc} alt='' />
                                </Box>
                                <Box className='market-crypto-graph-details'>
                                    <Box className='market-crypto-name'>
                                        <Typography component="small" varient="body2" className='currency-name'>ETH/USDT <span className='status-badge'>+0.54%</span></Typography>
                                        <Typography component="h5" varient="h5">3,641.20</Typography>
                                        <Typography component="small" varient="small-caption">3,641.20</Typography>
                                    </Box>
                                </Box>
                                <Box className='market-crypto-graph-details'>
                                    <img src={GraphUp} alt='' />
                                </Box>
                            </Box>
                        </Box>
                        <Box className='market-crypto-tabs for-desktop'>
                            <TabContext value={value}>
                            <Stack direction='row' className='filter-btn' spacing='2' paddingTop={5}>
                                {(selectedCat===0)?
                                    <Button variant='contained' className='btn btn-secondary' onClick={e=>coinActions.latestListing() }>All</Button>
                                :
                                    <Button  className='btn' onClick={e=>coinActions.latestListing() }>All</Button>
                                }
                                {categoryList.length && 
                                    categoryList.map((item,index)=>{
                                    if(index < 4){
                                        if(selectedCat!==0 && selectedCat===item.id){
                                        return(<Button variant='contained' className='btn btn-secondary' key={index} onClick={e=>coinActions.coinListbByCategoty(item.id) } title={item.name}>{getFirstLetters(item.name)}</Button>)
                                        }else{
                                        return(<Button  className='btn' onClick={e=>coinActions.coinListbByCategoty(item.id) } title={item.name}>{getFirstLetters(item.name)}</Button>)
                                        }
                                    }else{
                                        return '';
                                    }              
                                    })
                                }         
                                </Stack>
                            </TabContext>
                            <Button
                                variant="outlined"
                                className='btn btn-outlined-secondary' onClick={() => { navigate("../predict-market") }}>
                                Predict
                            </Button>
                        </Box>
                        <Box className='market-crypto-tabs for-mobile dropdown-mobile'>
                            <FormControl sx={{ m: 0, minWidth: 120, width: '100%' }}>
                                <Select
                                    value={tablefilter}
                                    onChange={handleChangeTablefilter}
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Without label' }}
                                >
                                    <MenuItem value={10}>Cryptocurrencies</MenuItem>
                                    <MenuItem value={20}>DeFi</MenuItem>
                                    <MenuItem value={30}>Innovation</MenuItem>
                                    <MenuItem value={40}>POS</MenuItem>
                                    <MenuItem value={50}>NFT</MenuItem>
                                    <MenuItem value={60}>POW</MenuItem>
                                    <MenuItem value={70}>Predict</MenuItem>
                                </Select>
                            </FormControl>
                            {/* <Button
                                variant="outlined"
                                className='btn btn-outlined-secondary'>
                                Predict
                            </Button> */}
                        </Box>
                    </Box>
                </Container>
            </Box>
        </>
    )
}

export default MarketCard
