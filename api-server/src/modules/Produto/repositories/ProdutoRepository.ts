import knex from "../../../shared/database/connection";
import IProduto from "../entities/IProduto";
import IRequestProduto from "../requestValidateInteface/IRequestProduto";
import { IResponseCRUD }  from "../../../shared/interfaces/IResponseCRUD";

class ProdutoRepository {
    public async findById({
        id
      }: IRequestProduto): Promise<IProduto> {
        const dataProduto = await knex.raw(`SELECT * FROM produtos WHERE id = ${id}`);
        return dataProduto[0];
      }

    public async getTerm({
        term
      }: IRequestProduto): Promise<IProduto> {
        const dataProduto = await knex.raw(`SELECT * FROM produtos WHERE nome LIKE '%${term}%'`);
        return dataProduto[0];
      }
    
    public async get({
        page, itemsPerPage
      }: IRequestProduto): Promise<IProduto> {
        const dataProduto = await knex.raw(`SELECT * FROM produtos`);
        return dataProduto[0];
      }

      public async getCount(): Promise<IProduto> {
        const dataProduto = await knex.raw(`SELECT count(id) as total FROM produtos`);
        return dataProduto[0];
      }
    public async delete(
      id: Number
      ): Promise<IProduto> {
        const dataProduto = await knex.raw(`DELETE from Produtos WHERE id = ${id}`);
        return dataProduto[0];
      }

    public async post(
       data: any
       ): Promise<IResponseCRUD> {

        const trx = await knex.transaction();
        try {
            delete data.id;
            delete data.data_atualizacao;
            const resultProduto: any = await trx('produtos').insert(data);
            console.log(resultProduto)

            if (!resultProduto) {
                trx.rollback();
                throw new Error("Error na inserção do Produto!");
            }
            trx.commit();
            return resultProduto;

        } catch (error: any) {
            trx.rollback();
            return {
                success: false,
                message: 'Não foi possível inserir o Produto',
                error: JSON.stringify({
                name: error.name,
                message: error.message,
                stack: error.stack,
                }),
            };
      }
    }
    
    public async put(
    data: any
    ): Promise<IResponseCRUD> {

         const trx = await knex.transaction();
        try {

            const resultProduto: any = await trx('produtos')
            .update(data)
            .where("Id", data.id);

            if (!resultProduto) {
                trx.rollback();
                throw new Error("Error na alterar do Produto!");
            }
            trx.commit();
            return resultProduto;

        } catch (error: any) {
            trx.rollback();
            return {
                success: false,
                message: 'Não foi possível alterar o Produto',
                error: JSON.stringify({
                name: error.name,
                message: error.message,
                stack: error.stack,
                }),
            };
      }
    }
}
export default ProdutoRepository;
