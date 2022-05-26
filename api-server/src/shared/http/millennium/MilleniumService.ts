import ApiService from './BaseApi';
import { AxiosResponse, AxiosError } from "axios";
import { ActionType, HttpMethod, IJsonResponse } from "../../interfaces";
import { Path } from '@shared/helpers';

// @ts-ignore
class MilleniumService extends ApiService {

    /**
     * endPoint recupera um objeto no Millenium
     */
    async getMillenium(data: any) {

        console.log("MilleniumService.getMillenium")

        let query = `${process.env.API_MILLENIUM_PMZ}/${data.path}`;

        if (data.count > 0) { query += `?${data.json}`; }

        const username = process.env.AUTH_MILLENIUM_USERNAME;
        const password = process.env.AUTH_MILLENIUM_PASSWORD;

        const encodedBase64Token = Buffer.from(`${username}:${password}`).toString('base64');

        console.log("query: ", query)
        const response = await this.api.get(query, {

            headers: { "Authorization": 'Basic ' + encodedBase64Token }

        })
            .then((res: any) => {
                // console.log(res.data.value)
                return res.data.value;
            })
            .catch((error: AxiosError) => {

                if (error.code === "ECONNREFUSED") {
                    console.log("STATUS_CODE: ", error.code)
                    return this.getMillenium(data)
                }
                return error;


            })

        return response;
    }

    /**
     * endPoint inseri um objeto no Millenium
     */
    async postMillenium(body: any, action_type: ActionType): Promise<IJsonResponse> {
        console.log("MilleniumService.postMillenium")

        const { json, path } = body;
        const params_input = body.params != undefined ? JSON.stringify(body.params) : undefined;
        const username = process.env.AUTH_MILLENIUM_USERNAME;
        const password = process.env.AUTH_MILLENIUM_PASSWORD;
        const encodedBase64Token = Buffer.from(`${username}:${password}`).toString('base64');
        const type_object = path.split("/", 1)[0];
        const url = `${process.env.API_MILLENIUM_PMZ}/${path}`
        const params = JSON.stringify(json);

        return await this.api.post(
            url,
            params,
            { headers: { "Authorization": 'Basic ' + encodedBase64Token } }
        ).then(async (res: AxiosResponse) => {
            let resultRequest: any;
            console.log("res.data: ", res.data)
            if (!res.data?.trans_id) {
                if (path == Path.SAVE) {
                    resultRequest = {
                        status_code: res.status,
                        synchronize: true
                    };
                } else if (path == Path.SAVE) {
                    resultRequest = {
                        status_code: res.status,
                        synchronize: true,
                        lancamento: res.data?.lancamento
                    };
                } else {
                    console.log(`========= ERRO LINX =========`)
                    console.log(`========= SEM TRANS_ID =========`)
                    resultRequest = {
                        status_code: 600,
                        synchronize: false
                    };
                }
            } else {
                console.log(`========= SUCESSO =========`)
                resultRequest = {
                    status_code: res.status,
                    trans_id: res.data.trans_id,
                    synchronize: true
                };
            }

            const json_pmz: IJsonResponse = {
                success: true,
                data: resultRequest
            };
            const logsData = {
                action_type,
                url,
                params_input: params_input,
                type_object,
                json_pmz: JSON.stringify(json_pmz),
                status_code: res.status,
                synchronize: false,
                params,
                method_linx: HttpMethod.POST,
                json_linx: JSON.stringify(res.data)
            }

            
            console.log(`====== STATUS: ${res.status} ========`)
            console.log(new Date())
            console.log(`========= ========= =========`)
            return json_pmz;



        }).catch(async (error: AxiosError) => {

            if (error.code === "ECONNREFUSED") {
                console.log("STATUS_CODE: ", error.code)
                return this.postMillenium(body, action_type);
            } else {

                const e = {
                    name: error.name,
                    message: error.message,
                    stack: error.stack,
                };
                const json_pmz: IJsonResponse = {
                    success: false,
                    data: {
                        status_code: error.response?.status,
                        message: error.response?.data || error.message,
                    }
                };

                const logsData = {
                    action_type,
                    url,
                    params_input: params_input,
                    type_object,
                    json_pmz: JSON.stringify(json_pmz),
                    status_code: error.response?.status,
                    synchronize: false,
                    params,
                    method_linx: HttpMethod.POST,
                    json_linx: error?.response?.data ? JSON.stringify(error.response.data) : '',
                    error: JSON.stringify(e),
                }
               

                console.log(`========= ERRO =========`)
                console.log(new Date())
                console.log(`========= ========= =========`)
                console.log(logsData);
                console.log(`========= ========= =========`)

                return json_pmz;
            }
        });
    }

    /**
     * endPoint recupera um objeto no Millenium
     */
    async getSynchronize(data: any) {

        console.log("MilleniumService.getSynchronize")

        let query = `${process.env.API_MILLENIUM_PMZ}/${data.path}?${data.json}`;

        // console.log(query)

        const username = process.env.AUTH_MILLENIUM_USERNAME;
        const password = process.env.AUTH_MILLENIUM_PASSWORD;

        const encodedBase64Token = Buffer.from(`${username}:${password}`).toString('base64');

        const response = await this.api.get(query, {

            headers: { "Authorization": 'Basic ' + encodedBase64Token }

        })
            .then((res: any) => {
                // console.log(res.data.value)
                return res.data.value;
            })
            .catch((error: any) => {

                console.log(error)
                return this.getSynchronize(data)

            })
        return response
    }
}

export default new MilleniumService();
