import knex from "@shared/database/connection";
const fieldDefault = knex.raw("default");

/* Caso o campo seja falsy, retorna o objeto default do BD */
export const setDefaultEmptyField = <T>(dados: T): T => {
    for (let key in dados) {
        dados[key] = dados[key] ||  fieldDefault;
    }
    return dados;
};

/* Retorna a query do Knex com os parametros passados na requisição */
export const setQueryWithParams = <T>(params: T, exceptions: any): T => {
    for (let key in params) {
        if (!params[key]) {
            delete params[key]
        } else {
            params[key] = params[key];
        }

        if (exceptions.includes(key)) {
            delete params[key]
        }
    }
    return params;
};

