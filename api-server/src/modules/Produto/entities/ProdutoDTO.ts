import IProduto from "../entities/IProduto";
import moment from "moment";

const ProdutoDTO = (
    iProduto: IProduto
) => {
    const object = {
        id: iProduto.id,
        nome: iProduto.nome,
        descricao: iProduto.descricao,
        preco: iProduto.preco,
        quantidade: iProduto.quantidade,
        data_criacao: moment().format('YYYY-MM-DD HH:mm:ss'),
        data_atualizacao: moment().format('YYYY-MM-DD HH:mm:ss')
    }
    return object;
};

export default ProdutoDTO;
