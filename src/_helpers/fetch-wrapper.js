import { useRecoilState } from 'recoil';
import { useNavigate } from "react-router-dom";
import { authAtom } from '../_state';
import {useAlertActions}  from '../_actions/alert.actions';

export { useFetchWrapper };

function useFetchWrapper() {
    const navigate = useNavigate()
    const [auth, setAuth] = useRecoilState(authAtom);
    const alertActions = useAlertActions();

    return {
        get: request('GET'),
        post: request('POST'),
        patch: request('PATCH'),
        put: request('PATCH'),
        delete: request('DELETE')
    };

    function request(method) { 
        return (url, body,file=false) => {
            const baseUrl = `${process.env.REACT_APP_API_URL}`;
            url = `${baseUrl}/${url}`;            
            const requestOptions = {
                method,
                headers: authHeader(url)
            };
            if (body && file==false) {
                requestOptions.headers['Content-Type'] = 'application/json';
                requestOptions.body = JSON.stringify(body);
            }else{
                requestOptions.body = body;
            }            
            return fetch(url, requestOptions).then(handleResponse);
        }
    }
    
    // helper functions    
    function authHeader(url) {
        // return auth header with jwt if user is logged in and request is to the api url
        const token = auth?.access_token;
        const isLoggedIn = !!token;
        const isApiUrl = url.startsWith(process.env.REACT_APP_API_URL);
        if (isLoggedIn && isApiUrl) {
            return { Authorization: `${token}` };
        } else {
            return {};
        }
    }
    
    function handleResponse(response) {
        return response.text().then(text => {
           
            const data = text && JSON.parse(text);              
            if (!response.ok) {                
                if ([401, 403].includes(response.status) && auth?.access_token) {
                    // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                    localStorage.removeItem('user');
                    setAuth(null);
                    navigate(`/login`);
                }    
                const error = (data && data.message) || response.statusText;
                alertActions.error(error);
                return Promise.reject(error);
            }else{
                if ([403].includes(data.statusCode) && data.status==='unauthorized' ) {
                    localStorage.removeItem('user');
                    setAuth(null);
                    navigate(`/login`);
                }
            }    
            return data;
        });
    }   
}
