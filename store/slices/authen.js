import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios'
import Router from "next/router";
import { getUserInfo } from '@/store/slices/userinfo'
import { setCookie } from 'cookies-next';

const initialState = {
    isLoading: false,
    isAuthenticate: false,
    token:null,
    tokenme:null,
    isError:false,
    errorData: null,
};

const slice = createSlice({
    name: 'authen',
    initialState,
    reducers: {
        authenPending(state,action){
            state.isLoading = true;
            state.isAuthenticate = false;
            state.token = null;
            state.tokenme = null;
            state.isError = false;
            state.errorData = null;
        },
        authenSuccess(state,action){
            state.isLoading = false;
            state.isAuthenticate = true;
            state.token = action.payload;
        },
        authenFailed(state,action){
            state.isLoading = false;
            state.isError = true;
            state.errorData = action.payload;
        },
        authenReset(state,action){
            state.isLoading = true;
            state.isAuthenticate = false;
            state.token = null;
            state.tokenme = null;
            state.isError = false;
            state.errorData = null;
        }
    }
});

export const reducer = slice.reducer;

export const getUserAuthen = (user, router) => async dispatch => {
    dispatch(slice.actions.authenPending())
  
    axios.request({
        method: "POST",
        url: 'https://shopee-api.deksilp.com/api/login',
        data: user,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
     })
     .then(function (response) {
        console.log(response)
        if (response.status == 200) { 
            console.log(router,'มี router')
            console.log('access_token', response.data.authorisation.token)
            setCookie('access_token', response.data.authorisation.token, { maxAge: 60 * 6 * 24 });
            // window.location = '/profile';  
            dispatch(slice.actions.authenSuccess(response.data.authorisation.token))
            dispatch(getUserInfo(router))
            //   dispatch(getUserTadd(router))
        } else { 
            console.log('ไม่มี status 200')    
            return Promise.reject(response);
       // dispatch(slice.actions.authenFailed(response.data.access_token))
        }
     })
     .catch((response) => {
        console.log('@@@Login error :: ',JSON.stringify(response))
        dispatch(slice.actions.authenFailed(response.data))
     })
}

export const getUserLogout = (router) => async dispatch => {
    Router.push('/')
}



export default slice;



