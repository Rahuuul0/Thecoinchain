import {
  Container,
  Typography,
  Grid,
  Box,
  Stack,
  Button,
  Tab,
  Accordion,
  AccordionSummary,
  TextField,
  AccordionDetails,
  FormControl,
  MenuItem,
  Select
} from '@mui/material'
import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { ArrowRightAlt, ExpandMore } from '@mui/icons-material';
import { useContactActions, useTutorialActions } from '../../_actions';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { contact_AddAtom, contactListAtom, tutorialCategoryAtom, blogListAtom, blogimgAtom, contactBlogListAtom, blogVideoAtom } from '../../_state';
import { useRecoilState, useRecoilValue } from 'recoil';
import { West, East } from '@mui/icons-material';
import { General, Subscriptions } from './Questions';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import { useNavigate } from 'react-router-dom';
import { styled, alpha } from '@mui/material/styles';
import { useAlertActions } from "../../_actions/alert.actions";
import { RoutesName } from "../../_common/app.constants";
import CryptoTickerMarquee from './Components/CryptoTickerMarquee';
import * as Yup from "yup";
import ContactHeroImage from "../../../public/assets/images/learn-cypto.svg";
import InputBase from '@mui/material/InputBase';
import Media from "../../../public/assets/images/media-img.svg";
import Design from "../../../public/assets/images/design-sys.svg";
import GenralIcon from "../../../public/assets/images/icons/genralicon.svg";
import MediaContainer from "../../../public/assets/images/media-container.svg";
import SubsIcon from "../../../public/assets/images/subscription.svg";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Autocomplete from '@mui/material/Autocomplete';
import "swiper/css";
import "swiper/css/navigation";
import LoadingButton from '@mui/lab/LoadingButton';
import ReCAPTCHA from "react-google-recaptcha";
import ReactHtmlParser from 'react-html-parser';





const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  maxWidth: '350px',
  fontSize: '14px',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(0),
    width: 'auto',
  },
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(1)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '300px',
      border: '2px solid #E6E8EC',
      borderRadius: '90px',
      '&:focus': {
        width: '300px',
      },
    },
  },
}));
const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  top: '0%',
  right: '1%',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));


function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const Contact = () => {
  const [faqfilter, setFaqfilter] = useState("");

  const handleChangeFAQfilter = (event) => {
    setFaqfilter(event.target.value);
  };
  const navigate = useNavigate();
  const useContactAddActions = useContactActions();
  const categoryActions = useTutorialActions();
  const theme = useTheme();
  const [personName, setPersonName] = useState([]);
  const [contactError, setContactError] = useRecoilState(contact_AddAtom)
  const [question, setQuestion] = useState("");
  const [category, setCategory] = useState("general");
  const contactLists = useRecoilValue(contactListAtom);
  const contactBlogLists = useRecoilValue(contactBlogListAtom);
  const [blogImg, setBlogimg] = useRecoilState(blogListAtom);
  const [blogNew, setBlognew] = useRecoilState(blogimgAtom);
  const [blogVideo, setBlogvideo] = useRecoilState(blogVideoAtom);
  const captchaRef = useRef(null);
  const alertActions = useAlertActions();

  const contactCategory = useRecoilValue(tutorialCategoryAtom).filter((item) => {
    return item.type === "Contact_Faq";
  });

  const [contactCategoryList, setContactCategoryList] = useState(contactLists);
  const [value, setValue] = React.useState(0);

  // form validation rules 
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email Address is required")
      .matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Email is invalid")
      .trim()
      .required('Email is required'),
    subject: Yup.string()
      .trim()
      .required('Subject is required'),
    question: Yup.string()
      .required('Question is required'),
    msg: Yup.string()
      .required('Message is required')
      .max(250)
  });

  //yup validation
  const formOptions = { resolver: yupResolver(validationSchema) };
  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState, reset, watch } = useForm(formOptions);
  const { errors } = formState;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formData = watch();

  useEffect(() => {
    if (contactError)
      setIsSubmitting(false)
  }, [contactError])

  const handleFormSubmit = async (data) => {

    const token = captchaRef.current.getValue();
    if (token) {
      captchaRef.current.reset();
      data.category = category;
      setIsSubmitting(true)
      setContactError(false)
      await useContactAddActions.add(data);
      reset({ email: " ", subject: " ", msg: " " });
    } else {
      alertActions.error("reCAPTCHA is mandatory");
    }

  }

  const handleChange = (event) => {

    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  useEffect(() => {
    setQuestion(General)
    window.scrollTo({ top: 1, left: 1, behavior: "smooth" });
  }, [])

  const handleGenral = () => {
    setQuestion(General);
  }

  const handleSubscription = () => {
    setQuestion(Subscriptions);
  }
  useEffect(() => {
    reset({ ...formData, question: question[0] })
  }, [question]);

  // *ConactCategoryList*
  const handleChanges = (value) => {
    setValue(value);
    handleTutorials(value);
  };

  const handleTutorials = (contactCategory) => {
    let tutorialsArr = [];
    tutorialsArr = contactLists
      .filter((items) => {
        return items.category === contactCategory;
      })
    setContactCategoryList(tutorialsArr);
  };

  // Category Api

  useEffect(() => {
    const contact = contactLists.filter((items) => {
      return items.category === "General";
    })
    setContactCategoryList(contact)

  }, [contactLists]);

  useEffect(() => {
    const response = categoryActions.categoryList();
    response.then((res) => { (res) })
  }, []);

  useEffect(() => {
    const response = useContactAddActions.contactBlogList();
    response.then((res) => { (res) })
  }, []);

  useEffect(() => {
    const response = useContactAddActions.contactList();
    response.then((res) => { (res) })
  }, []);

  const imgLink = (data) => {
    let newsSeo = data.slug
    navigate(`${RoutesName.Contact_Detail}/contact/${newsSeo}`)
    setBlogimg(data)
    setBlognew(true)
  }

  const SITE_KEY = process.env.REACT_APP_reCAPTCHA_SITE_KEY;

  const handleRecaptch = (value) => {
    console.log("Captcha value:", value);
  };

  const asyncScriptOnLoad = () => {
    console.log("scriptLoad - reCaptcha Ref-");
  };


  return (
    <>
      <Box
        sx={{
          mt: { xs: '56px', sm: '64px' },
          position: 'relative',
          zIndex: 1,
        }}
      >
        <CryptoTickerMarquee />
      </Box>
      {/* Banner starts */}
      <Container>
        <Box className="contact-hero" >
          <Grid container sx={{ alignItems: 'center' }}>
            <Grid item xs={12} sm={6} md={6} className='padding-0-mobile'>
              <Typography textTransform='uppercase' variant='body2' component="div" className='secondary-color primary-font' paddingBottom={1} sx={{ fontWeight: 700 }} >Save your time with Stacks</Typography>
              <Typography variant='h1' component="h1" className='hero-heading primary-color' sx={{ lineHeight: 1, mb: "20px" }}>
                How can we help
              </Typography>
              <Typography variant='body1' component="p" className='hero-para secondary-color' paddingBottom={2}>
                A creative agency that lead and inspire
              </Typography>

            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <img className='contact-hero-image' src={ContactHeroImage} />
            </Grid>
          </Grid>
        </Box>
      </Container>
      {/* Banner Ends */}
      <Container maxWidth='fluid' sx={{ padding: '0px !important' }}>
        <Box paddingTop={7} className='newdesignbox swiper-styles'>
          <Container maxWidth="xs">
            <Typography variant='body1' component="p" className='hero-para secondary-color' textAlign={"center"} paddingBottom={5}>
              Before asking for an answer, you may find it in our learn crypto center
            </Typography>
          </Container>
          <Swiper
            slidesPerView={1}
            navigation={true}
            spaceBetween={0}
            breakpoints={{
              480: {
                slidesPerView: 1,
              },
              640: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },
              1080: {
                slidesPerView: 4,
              },
            }}
            modules={[Navigation]}
            className="mySwiper"
          >
            {contactBlogLists.map((item) => {
              return (
                <SwiperSlide>
                  <Box className='about-crypto'
                    onClick={() => imgLink(item)}
                    sx={{ cursor: "pointer" }}
                  >
                    <Box className=''>
                      <Typography textTransform='uppercase' className='orange-btn float-right small-new-btn contact-new'>New</Typography>
                      <img className="crypto-center" sx={{ maxWidth: "100%" }} src={`${process.env.REACT_APP_IMAGE_URL}/${item.image}`} />
                    </Box>
                    <Box paddingTop={4} className="inner-con-box">
                      <Typography fontWeight='500' paddingBottom={2} sx={{ maxHeight: '30px', overflow: 'hidden' }}>{item.title}</Typography>
                      <Typography className='body-caption secondary-color' sx={{ maxHeight: '85px', overflow: 'hidden' }}>{ReactHtmlParser(item.description)}</Typography>
                    </Box>
                  </Box>
                </SwiperSlide>
              )
            })}
          </Swiper>
        </Box>
      </Container>


      {/* Slider ends */}

      <Container>
        <Box className="faq-box">
          <Box>
            <Box className='smallwidth'>
              <Typography variant='h2' fontWeight='700' textAlign='center' className='secondary-font' paddingBottom={4}>Frequently asked questions</Typography>
              {/* tabs starts */}
              <Box className="learn-cypto-tab center-tab" sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>

                  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList
                      value={value}
                      aria-label="tabs">

                      {contactCategory?.map((item, idx) => {
                        return <Tab className='tab-selected' indicatorColor="secondary" textColor="inherit" onClick={e => handleChanges(item.title)} label={item.title} key={item.id} value={idx === value ? value : item.title} />;
                      })}
                    </TabList>

                  </Box>
                  <TabPanel value={value} sx={{ paddingRight: '0', paddingLeft: '0' }} >
                    <Box className='faq-accordian'>
                      {contactCategoryList.map((items) => {
                        return (
                          <Accordion sx={{ p: 0 }}>
                            <AccordionSummary
                              expandIcon={<ExpandMore />}
                              aria-controls="panel1a-content"
                              id="panel1a-header"
                            >
                              <Typography><span className='faq-count'></span>{items.question}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              <Typography>
                                {items.answer}
                              </Typography>
                            </AccordionDetails>
                          </Accordion>
                        )
                      })}

                    </Box>
                  </TabPanel>
                </TabContext>
              </Box>
            </Box>
          </Box>

        </Box>
      </Container>

      <Container maxWidth='fluid' className='contact-form-sec'>
        <Container className='smallwidth' padding={'0'}>
          <Box className="topic-que">
            <Box
              noValidate
              component="form"
              sx={{ mt: '24px' }}
              onSubmit={handleSubmit(handleFormSubmit)}
            >
              {/* <Typography component="h5" variant='h5' sx={{ width: '33%', flexShrink: 0 }}>
                Contact-Us
              </Typography> */}
              <Box paddingBottom={2} className='topic-select-radio'>
                <Typography textTransform='uppercase' paddingY={1} fontWeight='700' color='#B1B5C4' className='label-text small-caption primary-font secondary-color'>Select a topic</Typography>

                <Stack direction='row' spacing={3} className='button-img' >
                  <Button className={category == "general" ? "active btn" : "btn"} variant="outlined" onClick={() => { setCategory("general"); handleGenral(); }} > <span><img src={GenralIcon} /></span> General</Button>
                  <Button className={category == "subscriptions" ? "active btn" : "btn"} variant="outlined" onClick={() => { setCategory("subscriptions"); handleSubscription(); }} > <span><img src={SubsIcon} /></span> Subscription</Button>
                </Stack>
              </Box>
              <Box paddingBottom={2}>
                <Typography textTransform='uppercase' paddingY={1} fontWeight='700' color='#B1B5C4' className='label-text small-caption primary-font secondary-color'>What is your issue about? *</Typography>
                <Grid item xs={12}>
                  <Autocomplete
                    required
                    disablePortal
                    fullWidth
                    id="combo-box-demo"
                    size="small"
                    className='select-input'
                    value={formData?.question || ''}
                    options={question}
                    onChange={(e, props) => reset({ ...formData, question: props })}
                    renderInput={(params) => <TextField autoFocus {...register('question')} required {...params} InputLabelProps={{ shrink: true }} />}
                  />
                  <div className='frm-message'>{errors.question?.message}</div>
                </Grid>
              </Box>

              <Box paddingBottom={2}>
                <TextField
                  label="Email *"
                  className="form-control"
                  type="email"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="standard"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  placeholder='Email address'
                  name="email"
                  autoComplete="off"
                  size="small"
                  {...register("email")}
                  onChange={(e) => reset({ ...formData, email: e.target.value.replace(/\s+/g, e.target.value.length > 1 ? " " : "") })}
                />
                <div className='frm-message'>{errors.email?.message}</div>
              </Box>

              <Box paddingBottom={2}>
                <TextField
                  label="Subject *"
                  className="form-control"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="standard"
                  margin="normal"
                  required
                  fullWidth
                  id="Subject"
                  placeholder='Subject'
                  name="subject"
                  autoComplete="off"
                  {...register("subject")}
                  onChange={(e) => reset({ ...formData, subject: e.target.value.replace(/\s+/g, e.target.value.length > 1 ? " " : "") })}
                />
                <div className='frm-message'>{errors.subject?.message}</div>
              </Box>

              <Box paddingTop='2'>
                <TextField
                  id="outlined-multiline-static"
                  label="Message *"
                  variant="standard"
                  className="form-control"
                  placeholder='Say something'
                  InputLabelProps={{
                    shrink: true,
                  }}
                  multiline
                  rows={4}
                  maxlength={10}
                  fullWidth
                  {...register("msg")}
                  onChange={(e) => reset({ ...formData, msg: e.target.value.replace(/\s+/g, e.target.value.length > 1 ? " " : "") })}
                />
                <div className='frm-message'>{errors.msg?.message}</div>
              </Box>
              <Box paddingTop='2'>
                <Typography textAlign='end' sx={{ paddingTop: "40px" }}>
                  <ReCAPTCHA
                    style={{
                      // margin: "10px auto",
                      display: "flex",
                      // justifyContent: "center",
                    }}
                    theme="light"
                    ref={captchaRef}
                    sitekey={SITE_KEY}
                    onChange={handleRecaptch}
                    asyncScriptOnLoad={asyncScriptOnLoad}
                  />
                  <LoadingButton
                    type='submit'
                    loading={isSubmitting}
                    loadingPosition="end"
                    className='btn btn-primary'
                    sx={{ marginLeft: { xs: "0", sm: "auto" }, minWidth: "160px", }}
                    disabled={isSubmitting}
                    variant='contained'>
                    {isSubmitting ? <span className="spinner-border ">Loading</span> : " Send message "}
                  </LoadingButton>
                </Typography>
              </Box>

            </Box>
          </Box>
        </Container>
      </Container>
    </>
  )
}

export default Contact
