import { createTheme, ThemeProvider } from "@mui/material/styles";

export const Labels = {
  Success: "success",
  Error: "error",
  Login_Success: "Login successfully",
  Upload_Success: "Uploaded successfully",
  Password_Reset_Email: "OTP sent, please check your XXXX successfully",
  Password_Reset_Success: "Your password has been reset successfully",
  Password_Change_Success: "Your password has been change successfully",
  Logout_Success: "Logout successfully",
  Verified: "Verified Successfully ",
  Footer_Email: "Thank you for subscribe ",
  Replce_Text: "XXXX",
  Success_Status_Code: 200,
  Error_Status_Code: 500,
  Local_Storage_User: "user",
};

export const RoutesName = {
  Forgot_Password: "forgot-password",
  Home: "/home",
  login: "/login",
  Change_Password: "/create-password",
  Logout: "/logout",
};

export const Apis = {
  Forgot_Password: "forgot-password",
  Forgot_Password_Verify: "verify-forgot-password-otp",
  Home: "/home",
  Login: "login",
  Social_Media_Login: "social-media-login",
  Reset_Password: "reset-password",
  Create: "createAccount",
  GetOtp: "get-otp",
  VerifyRegisterOtp: "verify-user",
  Change_Password: "change-password",
  Subscription_Plan: "subscription-plan",
  Tutorial_Video: "tutorial-list",
  Contact: "contact-us",
  Update_User: "update-user",
  Categories_Data: "categories",
  Category_Data: "category",
  Latest_Listings: "latest-listings",
  Footer: "news-latter",
  Blog_List: "blog-list",
  Create_Payment_Intent: "user-subscription",
  Guides_analysis: "guide-list",
  News_list: "news-list",
  Subscribed_User: "subscribed-user",
  User_Login_History: 'user-login-history'
};

export const theme = createTheme({
  typography: {
    fontFamily: `'Poppins', sans-serif`,
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
});
