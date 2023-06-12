import { useSnackbar } from 'notistack';
const useAlertActions = () => {
    const { enqueueSnackbar } = useSnackbar(); 
    return {
        success: message =>{
                enqueueSnackbar(message, { variant:"success",autoHideDuration:2000 }); 
            },
        error: message => {
            enqueueSnackbar(message, { variant:"error",autoHideDuration:5000 });  
        }
    }
}

export {useAlertActions};
