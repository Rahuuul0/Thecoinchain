import React from 'react';
import { Box, Container, Typography, Modal, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import BTC from '../../../public/assets/images/icons/btc-ic.svg'
import VolumeIc from '../../../public/assets/images/icons/volume-ic.svg'
import MarketcapIc from '../../../public/assets/images/icons/dollar.svg'
import ChartUp from '../../../public/assets/images/chart-up.svg'
import ChartDown from '../../../public/assets/images/chart-down.svg'
import DollarImg from '../../../public/assets/images/icons/dollar.svg'
import TimeImg from '../../../public/assets/images/icons/time-ic.svg'
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { useEffect, useState } from "react"
import { useRecoilState } from 'recoil';
import {homePageAtom} from "../../_state/users";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import HttpsIcon from '@mui/icons-material/Https';

function paginator(items, current_page, per_page_items) {
    let page = current_page || 1,
      per_page = per_page_items,
      offset = (page - 1) * per_page,
      paginatedItems = items.slice(offset).slice(0, per_page_items),
      total_pages = Math.ceil(items.length / per_page);
    console.log("Anzahl: " + items.lgenth);
  
    return {
      page: page,
      per_page: per_page,
      pre_page: page - 1 ? page - 1 : null,
      next_page: total_pages > page ? page + 1 : null,
      total: items.length,
      total_pages: total_pages,
      data: paginatedItems
    };
  }

const CryptoTable = (props) => {

    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    // Table Json Data call 
    const sethomeData = useRecoilState(homePageAtom);

    const coinData = sethomeData[0][0].data; 

    useEffect(()=> {
        console.log(sethomeData[0][0].data,'gfddsfdfdfsfs')
      },[])


      const count = Math.ceil(coinData.length / 4);
      const [page, setPage] = React.useState(1);
      const handleChanges = (event, value) => {
        setPage(paginator(coinData, value, 3).page);
      };
      const [checked, setChecked] = React.useState([]);
      const handleOnChanges = (e, index) => {
        let prev = checked;
        let itemIndex = prev.indexOf(index);
        if (itemIndex !== -1) {
          prev.splice(itemIndex, 1);
        } else {
          prev.push(index);
        }
        setChecked([...prev]);
      };
      console.log(checked);



    return (
        <>
    
            <Box className='crypto-list' sx={{ py: 2 }}>
                <Box className='crypto-list-table'>
                    <TableContainer>
                    <Stack spacing={2}>
                        <Table sx={{ minWidth: 650 }}>
                            <TableHead>
                                <TableRow hover >
                                    <TableCell>#</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell align='right'>Price</TableCell>
                                    <TableCell align='right'>24h Change </TableCell>
                                    {props?.isIt? 
                                    <>
                                    <TableCell align='right'>1h %</TableCell>
                                    <TableCell align='right'>24h %</TableCell>
                                    <TableCell align='right'>7d %</TableCell>
                                    <TableCell align='right'>30d %</TableCell>
                                    </>
                                    :''}
                                    <TableCell align='right'>Chart</TableCell>
                                    {props?.isIt? '':<TableCell align='right'>Predict</TableCell>}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {paginator(coinData, page, 5).data.map((item,index) =>{
                                return(
                                <TableRow   divider={index < coinData.length - 1} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                              
                                    <TableCell>{item.cmc_rank}</TableCell>
                                    <TableCell onClick={handleOpen}>
                                        <div className="crypto-name">
                                            <img src={item.img} alt='BTC' width="33px" />
                                            {item.name} <span className="currency_name">{item.symbol}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell align='right'>$ {Math.round((item.quote.USD.price + Number.EPSILON) * 100) / 100}</TableCell>
                                    <TableCell align='right'>
                                        <span className='up'>{Math.round((item.quote.USD.percent_change_24h + Number.EPSILON) * 100) / 100}%</span>
                                    </TableCell>
                                    {props?.isIt?
                                        <>
                                       <TableCell align='right'>
                                        {/* <span className='up'>{Math.round((item.quote.USD.percent_change_1h + Number.EPSILON) * 100) / 100}%</span> */}
                                        <HttpsIcon/>
                                    </TableCell>
                                    <TableCell align='right'>
                                        {/* <span className='up'>{Math.round((item.quote.USD.percent_change_24h + Number.EPSILON) * 100) / 100}%</span> */}
                                        <HttpsIcon/>
                                    </TableCell>
                                    <TableCell align='right'>
                                        {/* <span className='up'>{Math.round((item.quote.USD.percent_change_7d + Number.EPSILON) * 100) / 100}%</span> */}
                                        <HttpsIcon/>
                                    </TableCell>
                                    <TableCell align='right'>
                                        {/* <span className='up'>{Math.round((item.quote.USD.percent_change_30d + Number.EPSILON) * 100) / 100}%</span> */}
                                        <HttpsIcon/>
                                    </TableCell> </>
                                     :'' }
                                 
                                    <TableCell align='right'>
                                        <img src={ChartUp} alt='chart' height="33px" />
                                    </TableCell>

                                    {props?.isIt? '':
                                    <TableCell align='right'>
                                    <Button
                                        variant="outlined"
                                        className='btn btn-outlined-secondary'>
                                        Predict
                                    </Button>
                                    </TableCell>
                                    }
                                  


                                  
                                </TableRow>
                                )
                            })}
                               
                            </TableBody>
                        </Table>
                        </Stack>
                        {props?.isIt? <Pagination sx={{float:'right'}}
                        count={count}
                        page={page}
                        onChange={handleChanges}
                        color="success"
                    />:""}
                      
                      
                    </TableContainer>
                </Box>
            </Box>

            {/* Modal */}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className="modal-dialog modal-crypto-table">
                    <Button onClick={handleClose} variant='outlined' className='btn btn-outlined-secondary btn-round btn-close'><CloseIcon /></Button>
                    <Box className="modal-head">
                        <Typography id="modal-modal-title" className="modal-modal-title" variant="h6" component="h2">
                            <NavigateBeforeIcon /> BTC
                        </Typography>
                    </Box>
                    <Box id="modal-modal-description" className="modal-modal-description" sx={{ mt: 2, p: 2 }}>
                        <Typography className="crypto-fullname" variant="h5" component="h5">
                            BTC/USDT <span className='badge'>1x</span>
                        </Typography>
                        <Typography className="crypto-fullname-small" variant="body2" component="small" sx={{ color: '#777E91', fontWeight: '600' }}>
                            Bitcoin
                        </Typography>
                        <Box className="value-details">
                            <Button variant='outlined' className='btn btn-outlined-secondary btn-round btn-close'><KeyboardArrowDownIcon /></Button>
                            <Typography className="crypto-value" variant="h5" component="h5">
                                36,641.20
                            </Typography>
                            <Typography className="crypto-fullname-small" variant="body2" component="small" sx={{ color: '#777E91', fontWeight: '600', display: 'flex' }}>
                                <img src={DollarImg} alt='chart' height="16px" /> 36,641.20
                            </Typography>
                            <Typography className="crypto-prection" variant="body2" component="small" sx={{ color: '#777E91', fontWeight: '600' }}>
                                Prediction price for end of current time frame.
                            </Typography>

                            <TabContext value={value}>
                                <Box>
                                    <TabList onChange={handleChange} aria-label="Login Tabs">
                                        <Tab label="15m" value="1" />
                                        <Tab label="1h" value="2" />
                                        <Tab label="4h" value="3" />
                                        <Tab label="1d" value="4" />
                                    </TabList>
                                </Box>
                              
                            </TabContext>
                            <Box className="value-with-date">
                                <Box className="value-with-date-col">
                                    <Typography variant="body2" component="small" sx={{ color: '#777E91', fontWeight: '400', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        <img src={TimeImg} alt='chart' height="16px" /> <span>15/10/23</span> 07:45
                                    </Typography>
                                    <Typography variant="body2" component="small" sx={{ color: '#00C076', fontWeight: '500' }}>
                                        520.80 <span>+1.25%</span>
                                    </Typography>
                                </Box>
                                <Box className="value-with-date-col">
                                    <Typography variant="body2" component="small" sx={{ color: '#777E91', fontWeight: '400', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        <img src={TimeImg} alt='chart' height="16px" /> <span>15/10/23</span> 07:45
                                    </Typography>
                                    <Typography variant="body2" component="small" sx={{ color: '#141416', fontWeight: '500' }}>
                                        37162.00 <span>+1.25%</span>
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>

                    </Box>
                    <Button
                        fullWidth
                        variant="contained"
                        className='btn btn-primary'
                    >
                        Back
                    </Button>
                </Box>
            </Modal>
        
        </>
    )
}

export default CryptoTable
