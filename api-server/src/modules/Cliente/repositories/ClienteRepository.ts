import knex from "../../../shared/database/connection";
import ICliente from "../entities/ICliente";
import IRequestCliente from "../requestValidateInteface/IRequestCliente";
import { IResponseCRUD }  from "../../../shared/interfaces/IResponseCRUD";

class ClienteRepository {
    public async findById({
        id
      }: IRequestCliente): Promise<ICliente> {
        const dataCliente = await knex.raw(`SELECT * FROM clientes WHERE id = ${id}`);
        return dataCliente[0];
      }

    public async getTerm({
        term
      }: IRequestCliente): Promise<ICliente> {
        const dataCliente = await knex.raw(`SELECT * FROM clientes WHERE code LIKE '%${term}%'`);
        return dataCliente[0];
      }
    
    public async get({
        page, itemsPerPage
      }: IRequestCliente): Promise<ICliente> {
        const dataCliente = await knex.raw('SELECT * FROM clientes');
        return dataCliente[0];
      }

    public async delete(
      id: Number
      ): Promise<ICliente> {
        const dataCliente = await knex.raw(`DELETE clientes WHERE id = ${id}`);
        return dataCliente[0];
      }

    public async post(
       data: any
       ): Promise<IResponseCRUD> {

        const trx = await knex.transaction();
        try {

            const resultCliente: any = await trx('clientes').insert(data);

            if (!resultCliente) {
                trx.rollback();
                throw new Error("Error na inserção do Cliente!");
            }
            return resultCliente;

        } catch (error) {
            trx.rollback();
            return {
                success: false,
                message: 'Não foi possível inserir o Cliente',
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

            const resultCliente: any = await trx('clientes')
            .update(data)
            .where("Id", data.id);

            if (!resultCliente) {
                trx.rollback();
                throw new Error("Error na alterar do Cliente!");
            }
            return resultCliente;

        } catch (error) {
            trx.rollback();
            return {
                success: false,
                message: 'Não foi possível alterar o Cliente',
                error: JSON.stringify({
                name: error.name,
                message: error.message,
                stack: error.stack,
                }),
            };
      }
    }
}
export default ClienteRepository;
