import knex from "@shared/database/connectionpg";
import ICassificacoes from "../entities/ICassificacoes";
import IRequestJogos from "../requestValidateInteface/IRequestJogos";
import { IResponseCRUD }  from "@shared/interfaces/IResponseCRUD";

class CassificacoesRepository {
    public async findById({
        id
      }: IRequestJogos): Promise<ICassificacoes> {
        const dataJogos = await knex.raw(`SELECT * FROM cassificacoes WHERE id = ${id}`);
        return dataJogos.rows;
      }


    public async get({
        page, itemsPerPage
      }: IRequestJogos): Promise<ICassificacoes> {
        const dataJogos = await knex.raw(`SELECT * FROM cassificacoes`);
        return dataJogos.rows;
      }

    public async delete(
      id: Number
      ): Promise<ICassificacoes> {
        const dataJogos = await knex.raw(`DELETE FROM cassificacoes WHERE id = ${id}`);
        return dataJogos.rows;
      }

    public async post(
       data: any
       ): Promise<IResponseCRUD> {
        console.log("data 11 ",data)
        const trx = await knex.transaction();
        try {
            
            delete data.id;
            
            const resultJogos: any = await trx('cassificacoes').insert(data);

            if (!resultJogos) {
                trx.rollback();
                throw new Error("Error na inserção do cassificacoes!");
            }
             trx.commit();
            return resultJogos;

        } catch (error) {
          console.log("data 11 error ",error)
            trx.rollback();
            return {
                success: false,
                message: 'Não foi possível inserir o cassificacoes',
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

            const resultJogos: any = await trx('cassificacoes')
            .update(data)
            .where("id", data.id);

            if (!resultJogos) {
                trx.rollback();
                throw new Error("Error na alterar do Jogos!");
            }
             trx.commit();
            return resultJogos;

        } catch (error) {
            trx.rollback();
            return {
                success: false,
                message: 'Não foi possível alterar o cassificacoes',
                error: JSON.stringify({
                name: error.name,
                message: error.message,
                stack: error.stack,
                }),
            };
      }
    }
}
export default CassificacoesRepository;
