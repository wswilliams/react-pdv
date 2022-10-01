import knex from "../../../shared/database/connectionpg";
import ICompra from "../entities/ICompra";
import IRequestCompra from "../requestValidateInteface/IRequestCompra";
import { IResponseCRUD }  from "../../../shared/interfaces/IResponseCRUD";
import IProduto from "../../../modules/Produto/entities/IProduto";

class CompraRepository {
    public async findById({
        id
      }: IRequestCompra): Promise<Array<ICompra>> {

        const dataCompra = await knex.raw(`SELECT * FROM compras WHERE id = ${id}`);

      return dataCompra.rows
      }
       
     public async findProdutosCompra(id: Number): Promise<Array<IProduto>> {

        const dataCompraProduto = await knex.raw(`SELECT * FROM compra_produtos WHERE id_compra = ${id}`);
        return dataCompraProduto.rows;
      }

    public async findProdutos(data: any): Promise<Array<IProduto>> {

      console.log("findProdutos",data)
      const result = JSON.parse(JSON.stringify(data));
      console.log("result",result)
        let list = [];
     
        for (let value of result) {
         
          const result_produtos = await knex.raw(`SELECT * FROM produtos WHERE id = ${value.id_produto}`);
          
         list.push(result_produtos.rows); 

        }
        return list;
    }
  
    public async getTerm({
        term
      }: IRequestCompra): Promise<ICompra> {
        const dataCompra = await knex.raw(`SELECT * FROM compras WHERE tipo_pagamento LIKE '%${term}%'`);
        return dataCompra.rows;
      }
    
    public async get({
        page, itemsPerPage
      }: IRequestCompra): Promise<ICompra> {
        const dataCompra = await knex.raw(`SELECT * FROM compras`);
        return dataCompra.rows;
      }

      public async getSum(): Promise<ICompra> {
        const dataCompra = await knex.raw(`SELECT SUM(total) as total FROM compras 
        where data_criacao >= ( NOW() - INTERVAL '1 DAY')`);
        return dataCompra.rows;
      }

      public async getCount(): Promise<ICompra> {
        const dataCompra = await knex.raw(`SELECT count(id) as total FROM compras 
        where data_criacao >= ( NOW() - INTERVAL '1 DAY')`);
        return dataCompra.rows;
      }

      public async getRelatorioMesCompras(query: any): Promise<Array<any>> {

        const compras = await knex.raw(`SELECT * FROM compras where data_criacao BETWEEN '${query.startDate} 01:01:00' AND '${query.endDate} 23:59:59'`);
        const listCompras = JSON.parse(JSON.stringify(compras.rows));
 
        let list = [];
        for (let value of listCompras) {
          console.log("value.id",value.id)
          const dataCompraProduto = await this.findProdutosCompra(value.id);
          console.log("dataCompraProduto",dataCompraProduto)
          const produto = await this.findProdutos(dataCompraProduto);
          console.log("produto",produto)
          let item = {
            compra: value,
            produtos: produto
          }
          list.push(item)
        }
        return list;
      }
      
    public async delete(
      id: Number
      ): Promise<ICompra> {
        const dataCompra = await knex.raw(`DELETE FROM compras WHERE id = id`);
        return dataCompra.rows;
      }

    public async post(
       data: any
       ): Promise<IResponseCRUD> {

        const trx = await knex.transaction();
        try {
            
            const produtos = data.produtos;
            delete data.id;
            delete data.produtos;
            let valueTotal = 0;
           
            const resultCompra: any = await trx('compras').insert(data);
            
            const sequenci = await knex.raw(`
            SELECT "last_value" as id FROM public.compras_id_seq
          `);
          
            if (!resultCompra) {
                trx.rollback();
                throw new Error("Error na inserção do Compra!");
            }
            //produtos_compras
            for (let value of produtos) {
                let data_value = {
                  id_compra: sequenci.rows[0].id,
                  id_produto: value.id,
                  quantidade: value.amount,
                  preco: value.preco
                }

                valueTotal += (value.amount * value.preco);
             
                const result_compra_produtos: any = await trx('compra_produtos').insert(data_value);
                if (!result_compra_produtos) {
                  trx.rollback();
                  throw new Error("Error na inserção do Compra!");
                }
                const diminuiDoStock = value.quantidade - value.amount;
                if(diminuiDoStock < 0){
                  trx.rollback();
                  throw new Error("Error não há produto sucifiente para essa compra!");
                }  

                const resultProduto: any = await trx('produtos')
                .update({quantidade: diminuiDoStock})
                .where("id", value.id);

                if (!resultProduto) {
                    trx.rollback();
                    throw new Error("Error na alteração do Produto!");
                }

            }

             trx.commit();
            return resultCompra;

        } catch (error) {
            trx.rollback();
            console.log(error)
            return {
                success: false,
                message: 'Não foi possível inserir o Compra',
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

            const produtos = data.produtos;
            delete data.produtos;

            const resultCompra: any = await trx('compras')
            .update(data)
            .where("Id", data.id);

            if (!resultCompra) {
                trx.rollback();
                throw new Error("Error na alterar do Compra!");
            }

            const delete_produtos_compras = await trx.raw(`DELETE FROM compra_produtos WHERE id_compra = ${data.id}`);
            if (!delete_produtos_compras) {
              trx.rollback();
              throw new Error("Error na alteração da Compra!");
            }

             //produtos_compras
             for (let value of produtos) {
              let data_value = {
                id_compra: data.id,
                id_produto: value.id,
                quantidade: value.quantidade
            }

              const result_compra_produtos: any = await trx('compra_produtos').insert(data_value);
              if (!result_compra_produtos) {
                trx.rollback();
                throw new Error("Error na inserção do Compra!");
              }
          }

             trx.commit();
            return resultCompra;

        } catch (error) {
            trx.rollback();
            return {
                success: false,
                message: 'Não foi possível alterar o Compra',
                error: JSON.stringify({
                name: error.name,
                message: error.message,
                stack: error.stack,
                }),
            };
      }
    }
}
export default CompraRepository;
