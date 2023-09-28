import requests from './http-services';

const PropertyServices = {
    getProperty() {
        return requests.get('/property/get');
    },

    postProperty(body) {
        return requests.post('/property/add_property', body);
    },

    getPropertyByUser() {
        return requests.get('/property/get_user');
    },

    updateProperty(id,body){
        console.log("dedhehhe",body)
        return requests.putimg(`/property/update_property/${id}`,body);
    },

    deleteProperty(id){
        return requests.delete(`/property/delete_property/${id}`)
    }
};

export default PropertyServices;