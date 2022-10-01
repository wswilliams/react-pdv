import knex from "@shared/database/connectionpg";
import ISimulador from "../entities/ISimulador";
import IRequestJogos from "../requestValidateInteface/IRequestJogos";
import { IResponseCRUD }  from "@shared/interfaces/IResponseCRUD";

class SimuladorRepository {
    public async findById({
        id
      }: IRequestJogos): Promise<ISimulador> {
        const dataJogos = await knex.raw(`SELECT * FROM simulador WHERE id = ${id}`);
        return dataJogos.rows;
      }


    public async get({
        page, itemsPerPage
      }: IRequestJogos): Promise<ISimulador> {
        const dataJogos = await knex.raw(`SELECT * FROM simulador`);
        return dataJogos.rows;
      }

    public async delete(
      id: Number
      ): Promise<ISimulador> {
        const dataJogos = await knex.raw(`DELETE FROM simulador WHERE id = ${id}`);
        return dataJogos.rows;
      }

    public async post(
       data: any
       ): Promise<IResponseCRUD> {

        const trx = await knex.transaction();
        try {
            
            delete data.id;
            const resultJogos: any = await trx('simulador').insert(data);

            if (!resultJogos) {
                trx.rollback();
                throw new Error("Error na inserção do Jogos!");
            }
             trx.commit();
            return resultJogos;

        } catch (error) {
            trx.rollback();
            return {
                success: false,
                message: 'Não foi possível inserir o Jogos',
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

            const resultJogos: any = await trx('simulador')
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
                message: 'Não foi possível alterar o Jogos',
                error: JSON.stringify({
                name: error.name,
                message: error.message,
                stack: error.stack,
                }),
            };
      }
    }
}
export default SimuladorRepository;
