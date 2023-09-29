import axios from 'axios';
import Cookies from 'js-cookie';

const instance = axios.create({
    baseURL: 'https://property-ecommerce-backend.onrender.com/api/',
    timeout: 500000,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});

const formDatainstance = axios.create({
    baseURL: 'https://property-ecommerce-backend.onrender.com/api/',
    timeout: 500000,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
    },
});


// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    let userInfo;
    if (Cookies.get('userInfo')) {
        userInfo = JSON.parse(Cookies.get('userInfo'));
    }
    return {
        ...config,
        headers: {
            authorization: userInfo ? `Bearer ${userInfo.UserData.token}` : null,
        },
    };
});

const responseBody = (response) => {
    console.log(response)
    return response.data; // Return the response data
};


const requests = {
    get: (url, body, headers) =>
        instance.get(url, body, headers).then(responseBody),

    post: (url, body) => instance.post(url, body).then(responseBody),

    postimg: (url, body) => formDatainstance.post(url, body).then(
        (response) => {
            return response.data;
        }
    ).catch((error) => {
        console.log( error);
    })
    ,
    putimg: (url, body) => formDatainstance.put(url, body).then(
        (response) => {
            return response.data;
        }
    ).catch((error) => {
        console.log(error);
    })
    ,

    put: (url, body, headers) =>
        instance.put(url, body, headers).then(responseBody),

    patch: (url, body) => instance.patch(url, body).then(responseBody),

    delete: (url) => instance.delete(url).then(responseBody),
};

export default requests;