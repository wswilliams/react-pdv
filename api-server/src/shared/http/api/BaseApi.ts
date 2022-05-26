import axios from 'axios';

class BaseApi {

    api: any;

    constructor() {

        const api = axios.create({
            baseURL: `http://${process.env.API_GERAL_PMZ}/api/generec/`
        });
        this.api = api;
    }
}

export default BaseApi;