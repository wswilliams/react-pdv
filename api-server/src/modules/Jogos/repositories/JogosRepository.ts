import knex from "@shared/database/connectionpg";
import IJogos from "../entities/IJogos";
import IRequestJogos from "../requestValidateInteface/IRequestJogos";
import { IResponseCRUD }  from "@shared/interfaces/IResponseCRUD";
import ISimulador from "../entities/ISimulador";

class JogosRepository {
    public async findById({
        id
      }: IRequestJogos): Promise<IJogos> {
        const dataJogos = await knex.raw(`SELECT * FROM jogos WHERE id = ${id}`);
        return dataJogos.rows;
      }


    public async get({
        page, itemsPerPage
      }: IRequestJogos): Promise<IJogos> {
        const dataJogos = await knex.raw(`SELECT * FROM jogos`);
        return dataJogos.rows;
      }

      public async getSimular(): Promise<Array<ISimulador>> {
        const dataJogos = await knex.raw(`select * FROM public.simulador`);
        return dataJogos.rows;
      }

      public async getClassificaJogos(): Promise<Array<IJogos>> {
        const dataJogos = await knex.raw(`select distinct (numero) FROM public.jogos order by numero asc`);
        return dataJogos.rows;
      }
      public async getSimularJogos(): Promise<Array<IJogos>> {
        const dataJogos = await knex.raw(`select * FROM public.classificacoes order by peso desc`);
        return dataJogos.rows;
      }
      public async getJogos(numero: Number): Promise<Number> {
        const dataJogos = await knex.raw(`SELECT count(numero) as numero FROM jogos where numero = ${numero}`);
        return dataJogos.rows[0];
      }

    public async delete(
      id: Number
      ): Promise<IJogos> {
        const dataJogos = await knex.raw(`DELETE FROM jogos WHERE id = ${id}`);
        return dataJogos.rows;
      }

    public async post(
       data: any
       ): Promise<IResponseCRUD> {

        const trx = await knex.transaction();
        try {
            
            delete data.id;
            const resultJogos: any = await trx('jogos').insert(data);

            if (!resultJogos) {
                trx.rollback();
                throw new Error("Error na inserção do Jogos!");
            }
             trx.commit();
            return resultJogos;

        } catch (error) {
            trx.rollback(error);
            console.log(error)
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
    public async postClassificacoes(
      data: any
      ): Promise<IResponseCRUD> {
       console.log("data 11 ",data)
       const trx = await knex.transaction();
       try {
           
           delete data.id;
           
           const resultJogos: any = await trx('classificacoes').insert(data);

           if (!resultJogos) {
               trx.rollback();
               throw new Error("Error na inserção do classificacoes!");
           }
            trx.commit();
           return resultJogos;

       } catch (error) {
         console.log("data 11 error ",error)
           trx.rollback();
           return {
               success: false,
               message: 'Não foi possível inserir o classificacoes',
               error: JSON.stringify({
               name: error.name,
               message: error.message,
               stack: error.stack,
               }),
           };
     }
   }
   public async postSimulador(
    data: any
    ): Promise<IResponseCRUD> {
     console.log("data 11 ",data)
     const trx = await knex.transaction();
     try {
         
         delete data.id;
         
         const resultJogos: any = await trx('simulador').insert(data);

         if (!resultJogos) {
             trx.rollback();
             throw new Error("Error na inserção do simulador!");
         }
          trx.commit();
         return resultJogos;

     } catch (error) {
       console.log("data 11 error ",error)
         trx.rollback();
         return {
             success: false,
             message: 'Não foi possível inserir o simulador',
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

            const resultJogos: any = await trx('jogoss')
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
export default JogosRepository;
