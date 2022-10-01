import ICompra from "../entities/ICompra";
import moment from "moment";

const CompraDTO = (
    iCompra: ICompra
) => {

    let totalPreco = 0;
    const total = iCompra.produtos?.map((e: any) => {
        return totalPreco += parseFloat(e.preco)
      });

    const object = {
        id: iCompra.id,
        total: totalPreco,
        data_criacao: moment().format('YYYY-MM-DD HH:mm:ss'),
        tipo_pagamento: iCompra.tipo_pagamento,
        status: iCompra.status,
        produtos: iCompra.produtos
    }

    return object;
};

export default CompraDTO;
