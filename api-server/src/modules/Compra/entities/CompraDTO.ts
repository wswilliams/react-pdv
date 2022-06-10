import ICompra from "../entities/ICompra";
import moment from "moment";

const CompraDTO = (
    iCompra: ICompra
) => {
    const object = {
        id: iCompra.id,
        total: iCompra.total,
        data_criacao: moment().format('YYYY-MM-DD HH:mm:ss'),
        tipo_pagamento: iCompra.tipo_pagamento,
        status: iCompra.status,
        produtos: iCompra.produtos
    }
    return object;
};

export default CompraDTO;
