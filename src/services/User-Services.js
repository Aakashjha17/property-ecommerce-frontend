import requests from './http-services';

const UserServices = {
    registerUser(body) {
        console.log(body)
        return requests.post('/user/register', body);
    },

    loginUser(body) {
        const data = requests.post(`/user/login`, body)
        console.log("shsj",data)
        return data;
    },

    resetPassword(body) {
        return requests.put('/user/changepassword', body);
    },
};

export default UserServices;