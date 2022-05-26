import axios from 'axios';

class BaseApi {

    api: any;

    constructor() {

        const api = axios.create({
            baseURL: process.env.NODE_ENV === 'production' ? `http://${process.env.DATABASE_HOST_PROD}/` : `http://${process.env.DATABASE_HOST_DEV}/`
        });
        this.api = api;
    }
}

export default BaseApi;