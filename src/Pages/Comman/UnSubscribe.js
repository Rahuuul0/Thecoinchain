import React from 'react'
import { ThemeProvider } from '@mui/material/styles';
import { theme } from "../../_common/app.constants"
import { Box, Container, Typography, Link, Breadcrumbs, TextField } from '@mui/material';
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import LoadingButton from '@mui/lab/LoadingButton';
import { subscriptionActions } from "../../_actions";

const UnSubscribe = () => {
  const userActions = subscriptionActions();
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email Address is required")
      .matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Email is invalid")
      .email("Email must be a valid email")
      .trim()
  })

  const formOptions = { resolver: yupResolver(validationSchema) };
  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState, reset, watch } =
    useForm(formOptions);
  const { errors, isSubmitting } = formState;

  const formData = watch();

  const submitForm = async () => {
// alert("dfgdgdgdfg")
   await  userActions.unsubscribes(formData)
  }
  return (
      <ThemeProvider theme={theme}>
      
        <Box className="unsubscribe-form-wrapper">
    
        <Box
          noValidate
          component="form"
          sx={{ m: "50px" }}
          onSubmit={handleSubmit(submitForm)}
        >
          <Typography component="h2" variant="h2" sx={{m : 5}}>
            DO You Want TO Unsubscribe ?
          </Typography>

            <Box className="unsubscribe-form">
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
                placeholder="Email address"
                name="email"
                autoComplete="off"
                size="small"
                
                {...register("email")}
                onChange={(e) =>
                  reset({
                    ...formData,
                    email: e.target.value.replace(
                      /\s+/g,
                      e.target.value.length > 1 ? " " : ""
                    ),
                  })
                }
              />
              <div className="frm-message">{errors.email?.message}</div>

              <LoadingButton
                type="submit"
                fullWidth
                loading={isSubmitting}
                loadingPosition="end"
                variant="contained"
                className="btn btn-primary"
                disabled={isSubmitting}
               
              >
                {isSubmitting ? <span className="spinner-border spinner-border-sm mr-1">Loading</span> : "UnSubscribe"}
              </LoadingButton>
            </Box>
        </Box>
        </Box>
    </ThemeProvider>
  )
}

export default UnSubscribe

