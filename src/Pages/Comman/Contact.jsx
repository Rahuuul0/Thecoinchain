import React, { useState, useRef, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Box,
  Stack,
  Button,
  TextField,
  InputAdornment,
  CircularProgress,
} from '@mui/material';
import { useContactActions, useTutorialActions } from '../../_actions';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {
  contact_AddAtom,
  contactListAtom,
  tutorialCategoryAtom,
  blogListAtom,
  blogimgAtom,
  contactBlogListAtom,
  blogVideoAtom,
  switchDarkModeAtom,
} from '../../_state';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import { useNavigate } from 'react-router-dom';
import { useAlertActions } from "../../_actions/alert.actions";
import { RoutesName } from "../../_common/app.constants";
import CryptoTickerMarquee from './Components/CryptoTickerMarquee';
import * as Yup from "yup";
import "swiper/css";
import "swiper/css/navigation";
import ReCAPTCHA from "react-google-recaptcha";
import ReactHtmlParser from 'react-html-parser';

// Icons
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import ShareRoundedIcon from '@mui/icons-material/ShareRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';

// Images
import Bitcoinimg from "../../../public/assets/images/Contact us fotter image.png";

const Contact = () => {
  const navigate = useNavigate();
  const useContactAddActions = useContactActions();
  const categoryActions = useTutorialActions();
  const [contactError, setContactError] = useRecoilState(contact_AddAtom);
  const [category, setCategory] = useState("general");
  const contactLists = useRecoilValue(contactListAtom);
  const contactBlogLists = useRecoilValue(contactBlogListAtom);
  const [, setBlogimg] = useRecoilState(blogListAtom);
  const [, setBlognew] = useRecoilState(blogimgAtom);
  const [, setBlogvideo] = useRecoilState(blogVideoAtom);
  const isDarkMode = useRecoilValue(switchDarkModeAtom);
  const captchaRef = useRef(null);
  const alertActions = useAlertActions();

  // Form validation rules matching the design
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email Address is required")
      .matches(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Email is invalid"
      )
      .trim(),
    subject: Yup.string()
      .trim()
      .required("Subject is required"),
    msg: Yup.string()
      .trim()
      .required("Message is required")
      .max(1000, "Message cannot exceed 1000 characters"),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState, reset, watch } = useForm(formOptions);
  const { errors } = formState;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formData = watch();

  useEffect(() => {
    if (contactError) setIsSubmitting(false);
  }, [contactError]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const handleFormSubmit = async (data) => {
    const token = captchaRef.current?.getValue();
    if (token) {
      captchaRef.current.reset();
      data.category = category || "general";
      data.question = data.subject || "General Inquiry";
      setIsSubmitting(true);
      setContactError(false);
      try {
        await useContactAddActions.add(data);
        reset({ email: "", subject: "", msg: "" });
      } catch (err) {
        console.error(err);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      alertActions.error("reCAPTCHA is mandatory");
    }
  };

  useEffect(() => {
    const response = categoryActions.categoryList();
    response?.then?.(() => { });
  }, []);

  useEffect(() => {
    const response = useContactAddActions.contactBlogList();
    response?.then?.(() => { });
  }, []);

  useEffect(() => {
    const response = useContactAddActions.contactList();
    response?.then?.(() => { });
  }, []);

  const imgLink = (data) => {
    let newsSeo = data.slug;
    navigate(`${RoutesName.Contact_Detail}/contact/${newsSeo}`);
    setBlogimg(data);
    setBlognew(true);
  };

  const SITE_KEY = process.env.REACT_APP_reCAPTCHA_SITE_KEY;

  const handleRecaptch = (value) => {
    console.log("Captcha value:", value);
  };

  const asyncScriptOnLoad = () => {
    console.log("scriptLoad - reCaptcha Ref-");
  };

  return (
    <Box
      sx={{
        backgroundColor: isDarkMode ? '#0E1015' : '#FAFCFF',
        minHeight: '100vh',
        pb: { xs: 6, md: 10 },
        transition: 'background-color 0.3s ease',
      }}
    >
      {/* Ticker marquee at top */}
      <Box
        sx={{
          mt: { xs: '56px', sm: '64px' },
          position: 'relative',
          zIndex: 1,
        }}
      >
        <CryptoTickerMarquee />
      </Box>

      {/* Main Hero & Form Section */}
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          pt: { xs: 4, sm: 6, md: 8 },
          pb: { xs: 6, sm: 6, md: 6 },
          background: isDarkMode
            ? `
              radial-gradient(circle at 95% 8%, rgba(79, 70, 229, 0.20) 0%, rgba(147, 51, 234, 0.12) 35%, transparent 60%),
              radial-gradient(circle at 5% 45%, rgba(37, 99, 235, 0.16) 0%, transparent 50%),
              #0E1015
            `
            : `
              radial-gradient(circle at 95% 8%, rgba(224, 231, 255, 0.55) 0%, rgba(243, 232, 255, 0.35) 30%, transparent 60%),
              radial-gradient(circle at 5% 45%, rgba(219, 234, 254, 0.45) 0%, rgba(254, 243, 199, 0.25) 30%, transparent 60%)
            `,
          transition: 'background 0.3s ease',
        }}
      >
        {/* Subtle decorative dot grid background accent on top right */}
        <Box
          sx={{
            position: 'absolute',
            top: 40,
            right: 20,
            width: 140,
            height: 180,
            opacity: isDarkMode ? 0.2 : 0.35,
            pointerEvents: 'none',
            backgroundImage: isDarkMode
              ? 'radial-gradient(#6366F1 1.5px, transparent 1.5px)'
              : 'radial-gradient(#93C5FD 1.5px, transparent 1.5px)',
            backgroundSize: '16px 16px',
            display: { xs: 'none', lg: 'block' },
          }}
        />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Grid container spacing={{ xs: 5, md: 6, lg: 8 }} alignItems="flex-start">
            {/* ================= LEFT COLUMN ================= */}
            <Grid item xs={12} md={6}>
              <Box sx={{ maxWidth: { xs: '100%', md: '520px' } }}>
                {/* Eyebrow */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                  <Typography
                    sx={{
                      fontSize: '13px',
                      fontWeight: 700,
                      letterSpacing: '1.5px',
                      color: isDarkMode ? '#3772ff' : '#3772ff',
                      textTransform: 'uppercase',
                      fontFamily: "'Poppins', sans-serif",
                    }}
                  >
                    CONTACT US
                  </Typography>
                  <Box
                    sx={{
                      width: 28,
                      height: '2px',
                      borderRadius: '2px',
                      background: isDarkMode
                        ? 'linear-gradient(90deg, #6b78eeff, rgba(129, 140, 248, 0.1))'
                        : 'linear-gradient(90deg, #3772ff, rgba(79, 70, 229, 0.1))',
                    }}
                  />
                </Box>

                {/* Main Heading */}
                <Typography
                  component="h1"
                  sx={{
                    fontSize: { xs: '32px !important', sm: '42px !important', md: '48px !important' },
                    fontWeight: 800,
                    lineHeight: 1.15,
                    color: isDarkMode ? '#FFFFFF' : '#0F172A',
                    letterSpacing: '-0.025em',
                    fontFamily: "'Poppins', sans-serif",
                    mb: 2.5,
                  }}
                >
                  Get in Touch <br />
                  with{' '}
                  <Box
                    component="span"
                    sx={{
                      color: '#EAB308',
                      fontWeight: 800,
                    }}
                  >
                    The Coin
                  </Box>{' '}
                  <Box component="span" sx={{ color: isDarkMode ? '#FFFFFF' : '#0F172A' }}>
                    Chain
                  </Box>
                </Typography>

                {/* Subtitle / Paragraph */}
                <Typography
                  sx={{
                    fontSize: { xs: '14px', sm: '15px' },
                    lineHeight: 1.65,
                    color: isDarkMode ? '#94A3B8' : '#64748B',
                    mb: 4,
                  }}
                >
                  Have a question, partnership idea, or feedback? We’d love to hear from you. Our team will get back to you as soon as possible.
                </Typography>

                {/* Three Contact Information Cards */}
                <Stack spacing={2.2} sx={{ mb: 4 }}>
                  {/* Card 1: Email */}
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2.2,
                      p: '16px 20px',
                      backgroundColor: isDarkMode ? '#171B26' : '#F3F7FF',
                      borderRadius: '16px',
                      border: isDarkMode ? '1px solid #252D40' : '1px solid #E2ECFE',
                      transition: 'transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: isDarkMode
                          ? '0 8px 20px -6px rgba(0, 0, 0, 0.4)'
                          : '0 8px 20px -6px rgba(59, 130, 246, 0.15)',
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 46,
                        height: 46,
                        borderRadius: '50%',
                        backgroundColor: isDarkMode ? 'rgba(37, 99, 235, 0.2)' : '#DBEAFE',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <MailOutlineRoundedIcon sx={{ color: isDarkMode ? '#60A5FA' : '#2563EB', fontSize: 24 }} />
                    </Box>
                    <Box>
                      <Typography
                        sx={{
                          fontSize: '12px',
                          fontWeight: 500,
                          color: isDarkMode ? '#94A3B8' : '#64748B',
                          lineHeight: 1.2,
                          mb: 0.3,
                        }}
                      >
                        Email Us
                      </Typography>
                      <Typography
                        component="a"
                        href="mailto:contact@thecoinchain.com"
                        sx={{
                          fontSize: '15px',
                          fontWeight: 700,
                          color: isDarkMode ? '#FFFFFF' : '#0F172A',
                          textDecoration: 'none',
                          display: 'block',
                          lineHeight: 1.3,
                          '&:hover': { color: '#60A5FA' },
                        }}
                      >
                        contact@thecoinchain.com
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: '12px',
                          color: isDarkMode ? '#64748B' : '#94A3B8',
                          lineHeight: 1.2,
                          mt: 0.3,
                        }}
                      >
                        We usually respond within 24 hours.
                      </Typography>
                    </Box>
                  </Box>

                  {/* Card 2: Our Address */}
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2.2,
                      p: '16px 20px',
                      backgroundColor: isDarkMode ? '#13211B' : '#F0FDF4',
                      borderRadius: '16px',
                      border: isDarkMode ? '1px solid #1E382C' : '1px solid #DCFCE7',
                      transition: 'transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: isDarkMode
                          ? '0 8px 20px -6px rgba(0, 0, 0, 0.4)'
                          : '0 8px 20px -6px rgba(34, 197, 94, 0.15)',
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 46,
                        height: 46,
                        borderRadius: '50%',
                        backgroundColor: isDarkMode ? 'rgba(22, 163, 74, 0.2)' : '#DCFCE7',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <LocationOnRoundedIcon sx={{ color: isDarkMode ? '#4ADE80' : '#16A34A', fontSize: 24 }} />
                    </Box>
                    <Box>
                      <Typography
                        sx={{
                          fontSize: '12px',
                          fontWeight: 500,
                          color: isDarkMode ? '#94A3B8' : '#64748B',
                          lineHeight: 1.2,
                          mb: 0.3,
                        }}
                      >
                        Our Address
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: '15px',
                          fontWeight: 700,
                          color: isDarkMode ? '#FFFFFF' : '#0F172A',
                          lineHeight: 1.3,
                        }}
                      >
                        Dubai Digital Park - Nadd Hessa - Dubai Silicon Oasis - Dubai - United Arab Emirates
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: '12px',
                          color: isDarkMode ? '#64748B' : '#94A3B8',
                          lineHeight: 1.2,
                          mt: 0.3,
                        }}
                      >
                        Headquarters
                      </Typography>
                    </Box>
                  </Box>

                  {/* Card 3: Follow Us */}
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2.2,
                      p: '16px 20px',
                      backgroundColor: isDarkMode ? '#1E1929' : '#FAF5FF',
                      borderRadius: '16px',
                      border: isDarkMode ? '1px solid #332646' : '1px solid #F3E8FF',
                      transition: 'transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: isDarkMode
                          ? '0 8px 20px -6px rgba(0, 0, 0, 0.4)'
                          : '0 8px 20px -6px rgba(168, 85, 247, 0.15)',
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 46,
                        height: 46,
                        borderRadius: '50%',
                        backgroundColor: isDarkMode ? 'rgba(147, 51, 234, 0.2)' : '#F3E8FF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <ShareRoundedIcon sx={{ color: isDarkMode ? '#C084FC' : '#9333EA', fontSize: 22 }} />
                    </Box>
                    <Box>
                      <Typography
                        sx={{
                          fontSize: '12px',
                          fontWeight: 500,
                          color: isDarkMode ? '#94A3B8' : '#64748B',
                          lineHeight: 1.2,
                          mb: 0.8,
                        }}
                      >
                        Follow Us
                      </Typography>
                      <Stack direction="row" spacing={1.2} alignItems="center">
                        {/* X / Twitter */}
                        <Box
                          component="a"
                          href="https://x.com/thecoinchain01"
                          target="_blank"
                          rel="noopener noreferrer"
                          title="X (Twitter)"
                          sx={{
                            width: 32,
                            height: 32,
                            borderRadius: '50%',
                            backgroundColor: '#000000',
                            border: isDarkMode ? '1px solid #334155' : 'none',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textDecoration: 'none',
                            transition: 'transform 0.2s',
                            '&:hover': { transform: 'scale(1.12)' },
                          }}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="#FFFFFF">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                          </svg>
                        </Box>

                        {/* Facebook */}
                        <Box
                          component="a"
                          href="https://www.facebook.com/thecoinchain"
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Facebook"
                          sx={{
                            width: 32,
                            height: 32,
                            borderRadius: '50%',
                            backgroundColor: '#1877F2',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textDecoration: 'none',
                            transition: 'transform 0.2s',
                            '&:hover': { transform: 'scale(1.12)' },
                          }}
                        >
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="#FFFFFF">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                          </svg>
                        </Box>

                        {/* Instagram */}
                        <Box
                          component="a"
                          href="https://www.instagram.com/thecoinchain01/"
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Instagram"
                          sx={{
                            width: 32,
                            height: 32,
                            borderRadius: '50%',
                            background: 'linear-gradient(45deg, #F58529, #DD2A7B, #8134AF)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textDecoration: 'none',
                            transition: 'transform 0.2s',
                            '&:hover': { transform: 'scale(1.12)' },
                          }}
                        >
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="#FFFFFF">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                          </svg>
                        </Box>

                        {/* YouTube */}
                        <Box
                          component="a"
                          href="https://www.youtube.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                          title="YouTube"
                          sx={{
                            width: 32,
                            height: 32,
                            borderRadius: '50%',
                            backgroundColor: '#FF0000',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textDecoration: 'none',
                            transition: 'transform 0.2s',
                            '&:hover': { transform: 'scale(1.12)' },
                          }}
                        >
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="#FFFFFF">
                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                          </svg>
                        </Box>

                        {/* LinkedIn */}
                        <Box
                          component="a"
                          href="https://www.linkedin.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                          title="LinkedIn"
                          sx={{
                            width: 32,
                            height: 32,
                            borderRadius: '50%',
                            backgroundColor: '#0A66C2',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textDecoration: 'none',
                            transition: 'transform 0.2s',
                            '&:hover': { transform: 'scale(1.12)' },
                          }}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="#FFFFFF">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                          </svg>
                        </Box>
                      </Stack>
                    </Box>
                  </Box>
                </Stack>

                {/* Bottom Bitcoin Graphic */}
                <Box
                  sx={{
                    pt: 1,
                    display: 'flex',
                    justifyContent: { xs: 'center', md: 'flex-start' },
                  }}
                >
                  <Box
                    component="img"
                    src={Bitcoinimg}
                    alt="The Coin Chain Crypto Graphic"
                    sx={{
                      width: '100%',
                      maxWidth: { xs: '280px', sm: '420px', md: '560px' },
                      height: 'auto',
                      objectFit: 'contain',
                      filter: isDarkMode
                        ? 'drop-shadow(0 15px 25px rgba(234, 179, 8, 0.2)) brightness(0.95)'
                        : 'drop-shadow(0 15px 25px rgba(234, 179, 8, 0.12))',
                    }}
                  />
                </Box>
              </Box>
            </Grid>

            {/* ================= RIGHT COLUMN (FORM CARD) ================= */}
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  backgroundColor: isDarkMode ? '#181A22' : '#FFFFFF',
                  borderRadius: { xs: '22px', sm: '28px' },
                  border: isDarkMode ? '1px solid #282C3A' : '1px solid #EEF2F6',
                  boxShadow: isDarkMode
                    ? '0 20px 45px -15px rgba(0, 0, 0, 0.5), 0 2px 8px rgba(0, 0, 0, 0.3)'
                    : '0 20px 45px -15px rgba(15, 23, 42, 0.08), 0 2px 8px rgba(15, 23, 42, 0.02)',
                  p: { xs: '26px 20px', sm: '36px 32px', md: '40px 38px' },
                  position: 'relative',
                  transition: 'background-color 0.3s ease, border-color 0.3s ease',
                }}
              >
                {/* Form Card Header */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3.5 }}>
                  <Box
                    sx={{
                      width: 50,
                      height: 50,
                      borderRadius: '50%',
                      backgroundColor: isDarkMode ? 'rgba(79, 70, 229, 0.25)' : '#EEF2FF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <SendRoundedIcon
                      sx={{
                        color: isDarkMode ? '#ffffffff' : '#3772ff',
                        fontSize: 24,
                        transform: 'rotate(-25deg)',
                        ml: '2px',
                        mt: '-2px',
                      }}
                    />
                  </Box>
                  <Box>
                    <Typography
                      component="h3"
                      sx={{
                        fontSize: { xs: '25px !important', sm: '28px !important' },
                        fontWeight: 700,
                        color: isDarkMode ? '#FFFFFF' : '#0F172A',
                        lineHeight: 1.25,
                        fontFamily: "'Poppins', sans-serif",
                      }}
                    >
                      Send us a Message
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: '13px',
                        color: isDarkMode ? '#94A3B8' : '#64748B',
                        mt: 0.3,
                        lineHeight: 1.4,
                      }}
                    >
                      Fill out the form below and we’ll get back to you soon.
                    </Typography>
                  </Box>
                </Box>

                {/* Form Fields */}
                <Box
                  component="form"
                  onSubmit={handleSubmit(handleFormSubmit)}
                  noValidate
                  sx={{ mt: 0 }}
                >
                  {/* Email Address */}
                  <Box sx={{ mb: 2.5 }}>
                    <Typography
                      component="label"
                      htmlFor="email"
                      sx={{
                        display: 'block',
                        fontSize: '13px',
                        fontWeight: 600,
                        color: isDarkMode ? '#E2E8F0' : '#1E293B',
                        mb: 0.8,
                      }}
                    >
                      Email Address{' '}
                      <Box component="span" sx={{ color: '#EF4444' }}>
                        *
                      </Box>
                    </Typography>
                    <TextField
                      id="email"
                      fullWidth
                      type="email"
                      placeholder="yourname@example.com"
                      autoComplete="off"
                      {...register("email")}
                      onChange={(e) =>
                        reset({
                          ...formData,
                          email: e.target.value.replace(/\s+/g, e.target.value.length > 1 ? " " : ""),
                        })
                      }
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <MailOutlineRoundedIcon sx={{ color: isDarkMode ? '#64748B' : '#94A3B8', fontSize: 20 }} />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          height: '48px',
                          borderRadius: '12px',
                          backgroundColor: isDarkMode ? '#13151D' : '#FFFFFF',
                          '& fieldset': {
                            borderColor: errors.email
                              ? '#EF4444'
                              : isDarkMode
                                ? '#2E3344'
                                : '#E2E8F0',
                            borderWidth: '1.5px',
                          },
                          '&:hover fieldset': {
                            borderColor: errors.email
                              ? '#EF4444'
                              : isDarkMode
                                ? '#475569'
                                : '#CBD5E1',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: errors.email
                              ? '#EF4444'
                              : isDarkMode
                                ? '#818CF8'
                                : '#4F46E5',
                            borderWidth: '1.5px',
                          },
                        },
                        '& input': {
                          fontSize: '14px',
                          color: isDarkMode ? '#FFFFFF' : '#0F172A',
                          WebkitTextFillColor: isDarkMode ? '#FFFFFF' : '#0F172A',
                          '&::placeholder': {
                            color: isDarkMode ? '#64748B' : '#94A3B8',
                            WebkitTextFillColor: isDarkMode ? '#64748B' : '#94A3B8',
                            opacity: 1,
                          },
                        },
                      }}
                    />
                    {errors.email && (
                      <Typography sx={{ color: '#EF4444', fontSize: '12px', mt: 0.6 }}>
                        {errors.email?.message}
                      </Typography>
                    )}
                  </Box>

                  {/* Subject */}
                  <Box sx={{ mb: 2.5 }}>
                    <Typography
                      component="label"
                      htmlFor="subject"
                      sx={{
                        display: 'block',
                        fontSize: '13px',
                        fontWeight: 600,
                        color: isDarkMode ? '#E2E8F0' : '#1E293B',
                        mb: 0.8,
                      }}
                    >
                      Subject{' '}
                      <Box component="span" sx={{ color: '#EF4444' }}>
                        *
                      </Box>
                    </Typography>
                    <TextField
                      id="subject"
                      fullWidth
                      placeholder="Subject"
                      autoComplete="off"
                      {...register("subject")}
                      onChange={(e) =>
                        reset({
                          ...formData,
                          subject: e.target.value.replace(/\s+/g, e.target.value.length > 1 ? " " : ""),
                        })
                      }
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <DescriptionOutlinedIcon sx={{ color: isDarkMode ? '#64748B' : '#94A3B8', fontSize: 20 }} />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          height: '48px',
                          borderRadius: '12px',
                          backgroundColor: isDarkMode ? '#13151D' : '#FFFFFF',
                          '& fieldset': {
                            borderColor: errors.subject
                              ? '#EF4444'
                              : isDarkMode
                                ? '#2E3344'
                                : '#E2E8F0',
                            borderWidth: '1.5px',
                          },
                          '&:hover fieldset': {
                            borderColor: errors.subject
                              ? '#EF4444'
                              : isDarkMode
                                ? '#475569'
                                : '#CBD5E1',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: errors.subject
                              ? '#EF4444'
                              : isDarkMode
                                ? '#818CF8'
                                : '#4F46E5',
                            borderWidth: '1.5px',
                          },
                        },
                        '& input': {
                          fontSize: '14px',
                          color: isDarkMode ? '#FFFFFF' : '#0F172A',
                          WebkitTextFillColor: isDarkMode ? '#FFFFFF' : '#0F172A',
                          '&::placeholder': {
                            color: isDarkMode ? '#64748B' : '#94A3B8',
                            WebkitTextFillColor: isDarkMode ? '#64748B' : '#94A3B8',
                            opacity: 1,
                          },
                        },
                      }}
                    />
                    {errors.subject && (
                      <Typography sx={{ color: '#EF4444', fontSize: '12px', mt: 0.6 }}>
                        {errors.subject?.message}
                      </Typography>
                    )}
                  </Box>

                  {/* Message */}
                  <Box sx={{ mb: 2.5 }}>
                    <Typography
                      component="label"
                      htmlFor="message"
                      sx={{
                        display: 'block',
                        fontSize: '13px',
                        fontWeight: 600,
                        color: isDarkMode ? '#E2E8F0' : '#1E293B',
                        mb: 0.8,
                      }}
                    >
                      Message{' '}
                      <Box component="span" sx={{ color: '#EF4444' }}>
                        *
                      </Box>
                    </Typography>
                    <TextField
                      id="message"
                      fullWidth
                      multiline
                      rows={4}
                      placeholder="Write your message here..."
                      {...register("msg")}
                      onChange={(e) =>
                        reset({
                          ...formData,
                          msg: e.target.value.replace(/\s+/g, e.target.value.length > 1 ? " " : ""),
                        })
                      }
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 0.8 }}>
                            <ChatBubbleOutlineRoundedIcon sx={{ color: isDarkMode ? '#64748B' : '#94A3B8', fontSize: 18 }} />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '12px',
                          backgroundColor: isDarkMode ? '#13151D' : '#FFFFFF',
                          '& fieldset': {
                            borderColor: errors.msg
                              ? '#EF4444'
                              : isDarkMode
                                ? '#2E3344'
                                : '#E2E8F0',
                            borderWidth: '1.5px',
                          },
                          '&:hover fieldset': {
                            borderColor: errors.msg
                              ? '#EF4444'
                              : isDarkMode
                                ? '#475569'
                                : '#CBD5E1',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: errors.msg
                              ? '#EF4444'
                              : isDarkMode
                                ? '#818CF8'
                                : '#4F46E5',
                            borderWidth: '1.5px',
                          },
                        },
                        '& textarea': {
                          fontSize: '14px',
                          color: isDarkMode ? '#FFFFFF' : '#0F172A',
                          WebkitTextFillColor: isDarkMode ? '#FFFFFF' : '#0F172A',
                          lineHeight: 1.5,
                          '&::placeholder': {
                            color: isDarkMode ? '#64748B' : '#94A3B8',
                            WebkitTextFillColor: isDarkMode ? '#64748B' : '#94A3B8',
                            opacity: 1,
                          },
                        },
                      }}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 0.5 }}>
                      {errors.msg ? (
                        <Typography sx={{ color: '#EF4444', fontSize: '12px' }}>
                          {errors.msg?.message}
                        </Typography>
                      ) : (
                        <Box />
                      )}
                      <Typography sx={{ fontSize: '12px', color: isDarkMode ? '#64748B' : '#94A3B8', ml: 'auto' }}>
                        {formData?.msg ? String(formData.msg).length : 0}/1000
                      </Typography>
                    </Box>
                  </Box>

                  {/* reCAPTCHA */}
                  <Box
                    sx={{
                      mb: 3,
                      display: 'flex',
                      justifyContent: 'flex-start',
                    }}
                  >
                    <ReCAPTCHA
                      theme={isDarkMode ? "dark" : "light"}
                      ref={captchaRef}
                      sitekey={SITE_KEY}
                      onChange={handleRecaptch}
                      asyncScriptOnLoad={asyncScriptOnLoad}
                    />
                  </Box>

                  {/* Send Message Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    fullWidth
                    variant="contained"
                    endIcon={
                      !isSubmitting && (
                        <SendRoundedIcon
                          sx={{
                            fontSize: 18,
                            transform: 'rotate(-20deg)',
                            ml: 0.5,
                          }}
                        />
                      )
                    }
                    sx={{
                      height: '52px',
                      borderRadius: '14px',
                      background: 'linear-gradient(135deg, #566cff 0%, #5662ff 100%)',
                      color: '#FFFFFF',
                      fontSize: '16px',
                      fontWeight: 600,
                      textTransform: 'none',
                      fontFamily: "'Poppins', sans-serif",
                      boxShadow: isDarkMode
                        ? '0 10px 22px -5px rgba(99, 102, 241, 0.4)'
                        : '0 10px 22px -5px rgba(79, 70, 229, 0.45)',
                      transition: 'all 0.25s ease',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #566cff 0%, #566cff 100%)',
                        boxShadow: isDarkMode
                          ? '0 14px 28px -5px rgba(99, 102, 241, 0.55)'
                          : '0 14px 28px -5px rgba(79, 70, 229, 0.55)',
                        transform: 'translateY(-1px)',
                      },
                      '&:disabled': {
                        background: '#94A3B8',
                        color: '#FFFFFF',
                      },
                    }}
                  >
                    {isSubmitting ? (
                      <CircularProgress size={24} sx={{ color: '#FFFFFF' }} />
                    ) : (
                      'Send Message'
                    )}
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Learn Crypto Center Slider */}
      {contactBlogLists && contactBlogLists.length > 0 && (
        <Container maxWidth="fluid" sx={{ padding: '0px !important', mt: 0 }}>
          <Box paddingTop={5} className="newdesignbox swiper-styles">
            <Container maxWidth="xs">
              <Typography
                variant="body1"
                component="p"
                className="hero-para secondary-color"
                textAlign="center"
                paddingBottom={4}
                sx={{
                  color: isDarkMode ? '#94A3B8' : '#64748B',
                  fontSize: '15px',
                }}
              >
                Before asking for an answer, you may find it in our learn crypto center
              </Typography>
            </Container>
            <Swiper
              slidesPerView={1}
              navigation={true}
              spaceBetween={0}
              breakpoints={{
                480: { slidesPerView: 1 },
                640: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1080: { slidesPerView: 4 },
              }}
              modules={[Navigation]}
              className="mySwiper"
            >
              {contactBlogLists.map((item, idx) => {
                return (
                  <SwiperSlide key={item.id || idx}>
                    <Box
                      className="about-crypto"
                      onClick={() => imgLink(item)}
                      sx={{
                        cursor: 'pointer',
                        backgroundColor: isDarkMode ? '#181A22 !important' : '#FFFFFF',
                        border: isDarkMode ? '1px solid #282C3A !important' : '1px solid #E6E8EC',
                        borderRadius: '16px',
                        overflow: 'hidden',
                      }}
                    >
                      <Box>
                        <Typography
                          textTransform="uppercase"
                          className="orange-btn float-right small-new-btn contact-new"
                        >
                          New
                        </Typography>
                        <img
                          className="crypto-center"
                          style={{ maxWidth: '100%' }}
                          src={`${process.env.REACT_APP_IMAGE_URL}/${item.image}`}
                          alt={item.title}
                        />
                      </Box>
                      <Box paddingTop={4} className="inner-con-box">
                        <Typography
                          fontWeight="500"
                          paddingBottom={2}
                          sx={{
                            maxHeight: '30px',
                            overflow: 'hidden',
                            color: isDarkMode ? '#FFFFFF !important' : '#141416',
                          }}
                        >
                          {item.title}
                        </Typography>
                        <Typography
                          className="body-caption secondary-color"
                          sx={{
                            maxHeight: '85px',
                            overflow: 'hidden',
                            color: isDarkMode ? '#94A3B8 !important' : '#777E90',
                          }}
                        >
                          {ReactHtmlParser(item.description)}
                        </Typography>
                      </Box>
                    </Box>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </Box>
        </Container>
      )}
    </Box>
  );
};

export default Contact;
