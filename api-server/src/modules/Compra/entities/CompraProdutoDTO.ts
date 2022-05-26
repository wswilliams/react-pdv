import moment from "moment";

const CompraProdutoDTO = (
    compra: any,
    produtos: any,
    produtos_compra: any
) => {
    
    const itens = produtos.map((e: any) => {

        produtos_compra.map((r: any) => {
     
            if(e[0].id == r.id_produto){
                e[0].quantidade = r.quantidade;
            }
        })

        return {
            id: e[0].id,
            nome: e[0].nome,
            descricao: e[0].descricao,
            preco: e[0].preco,
            quantidade: e[0].quantidade,
            data_criacao: e[0].data_criacao,
            data_atualizacao: e[0].data_atualizacao
        }
      });

      const object = {
        id: compra[0].id,
        total: compra[0].total,
        data_criacao: compra[0].data_criacao,
        tipo_pagamento: compra[0].tipo_pagamento,
        status: compra[0].status,
        produtos: itens,

    }
    return object;
};

export default CompraProdutoDTO;
