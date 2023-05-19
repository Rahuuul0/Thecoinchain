import { createTheme, ThemeProvider } from '@mui/material/styles';


export const Labels = {
    Success: 'success',
    Error: 'error',
    Login_Success: "Login successfully",
    Upload_Success: "Uploaded successfully",
    Password_Reset_Email: 'Password reset link has been sent to your XXXX successfully',
    Password_Reset_Success: "Your password has been reset successfully",
    Password_Change_Success: "Your password has been change successfully",
    Logout_Success: "Logout successfully",
    Success_Status_Code: 200,
    Error_Status_Code: 500,
}

export const RoutesName = {
    Home: '/home',
    login: '/login',
    Change_Password: '/create-password',
}

export const Apis = {
    Password_Recovery: "passwordRecovery",
    Home: '/home',
    Login: 'login',
    Create:'createAccount',
    GetOtp:'get-otp',
    VerifyRegisterOtp:'verify-user',
    Reset_Password: 'resetPassword',
    Change_Password: 'changePassword',
}

export const theme = createTheme({
    typography: {
        "fontFamily": `'Poppins', sans-serif`,
        "fontSize": 14,
        "fontWeightLight": 300,
        "fontWeightRegular": 400,
        "fontWeightMedium": 500
    }
});