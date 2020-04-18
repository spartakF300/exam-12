import {NotificationManager} from 'react-notifications';
import axiosApi from "../../axiosApi";
import {push} from 'connected-react-router';


export const FETCH_PHOTO_REQUEST = 'FETCH_PHOTO_REQUEST';
export const FETCH_PHOTO_SUCCESS = 'FETCH_PHOTO_SUCCESS';
export const FETCH_PHOTO_FAILURE = 'FETCH_PHOTO_FAILURE';
export const CREATE_PHOTO_SUCCESS = 'CREATE_PHOTO_SUCCESS';

export const fetchPhotoRequest = () => ({type: FETCH_PHOTO_REQUEST});
export const fetchPhotoSuccess = data => ({type: FETCH_PHOTO_SUCCESS, data});
export const fetchPhotoFailure = error => ({type: FETCH_PHOTO_FAILURE, error});

export const createPhotoSuccess = () => ({type: CREATE_PHOTO_SUCCESS});

export const fetchSendPhoto = (data) => {
    return async dispatch => {
        try {
            dispatch(fetchPhotoRequest());
            await axiosApi.post('/gallery', data);
            dispatch(createPhotoSuccess());
            NotificationManager.success('Ok');
            dispatch(push('/'))
        } catch (e) {
            dispatch(fetchPhotoFailure(e));
            NotificationManager.error('Error: '+e);
        }
    }
};
export const getPhoto = (id) => {
    let url = '/gallery';
    if (id) {
        url += '?id=' + id
    }
    return async dispatch => {
        try {
            dispatch(fetchPhotoRequest());
            const response = await axiosApi.get(url);
            dispatch(fetchPhotoSuccess(response.data));
        } catch (e) {
            dispatch(fetchPhotoFailure(e));
            NotificationManager.error('Error: '+e);
        }
    }
};
export const deletePhoto = (id) => {
    return async dispatch => {
        try {
            await axiosApi.delete('/gallery?id=' + id);
            dispatch(getPhoto());
            NotificationManager.success('remove');
        } catch (e) {
            dispatch(fetchPhotoFailure(e));
            NotificationManager.error('Error: '+e);
        }

    }

};