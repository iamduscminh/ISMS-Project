import { axiosPrivate } from "../utils/axiosConfig";
import { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate, useLocation } from "react-router-dom";

const useAxiosPrivate = () => {
    const {auth} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(()=>{
        //Intercept cho request để gửi kèm access token
        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                if(!config.headers['Authorization']){
                    config.headers['Authorization'] = `Bearer ${auth?.accessToken}`
                }
                return config
            }, (error) => Promise.reject(error)
        );

        //Intercept cho response trả về (trong trường hợp này là handle hết token)
        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                if(error?.response?.status === 403 && !prevRequest.sent){
                    prevRequest.sent = true;
                    navigate('/login', {state: {from: location}, replace: true})
                }
                return Promise.eject(error);
            }
        );

        return () =>{
            axiosPrivate.interceptors.response.eject();
            axiosPrivate.interceptors.request.eject();
        }
    },[auth])
    return axiosPrivate;
}

export default useAxiosPrivate;