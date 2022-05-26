import knex from "@shared/database/connection";
import ICompra from "../entities/ICompra";
import IRequestCompra from "../requestValidateInteface/IRequestCompra";
import { IResponseCRUD }  from "@shared/interfaces/IResponseCRUD";
import IProduto from "@modules/Produto/entities/IProduto";

class CompraRepository {
    public async findById({
        id
      }: IRequestCompra): Promise<Array<ICompra>> {

        const dataCompra = await knex.raw(`SELECT * FROM Compras WHERE id = ${id}`);

      return dataCompra[0]
      }
       
     public async findProdutosCompra(id: Number): Promise<Array<IProduto>> {

        const dataCompraProduto = await knex.raw(`SELECT * FROM Compra_produtos WHERE id_compra = ${id}`);
        return dataCompraProduto[0];
      }

    public async findProdutos(data: any): Promise<Array<IProduto>> {

     
      const result = JSON.parse(JSON.stringify(data));
    
        let list = [];
     
        for (let value of result) {
         
          const result_produtos = await knex.raw(`SELECT * FROM Produtos WHERE id = ${value.id_produto}`);
          
         list.push(result_produtos[0]); 

        }
        return list;
    }
  
    public async getTerm({
        term
      }: IRequestCompra): Promise<ICompra> {
        const dataCompra = await knex.raw(`SELECT * FROM Compras WHERE tipo_pagamento LIKE '%${term}%'`);
        return dataCompra[0];
      }
    
    public async get({
        page, itemsPerPage
      }: IRequestCompra): Promise<ICompra> {
        const dataCompra = await knex.raw(`SELECT * FROM Compras`);
        return dataCompra[0];
      }

      public async getSum(): Promise<ICompra> {
        const dataCompra = await knex.raw(`SELECT SUM(total) as total FROM Compras 
        where data_criacao >= DATE_SUB( DATE( NOW() ), INTERVAL DAY( NOW() ) -1 DAY )`);
        return dataCompra[0];
      }

      public async getCount(): Promise<ICompra> {
        const dataCompra = await knex.raw(`SELECT count(id) as total FROM Compras 
        where data_criacao >= DATE_SUB( DATE( NOW() ), INTERVAL DAY( NOW() ) -1 DAY )`);
        return dataCompra[0];
      }

      public async getRelatorioMesCompras(query: any): Promise<Array<any>> {

        const compras = await knex.raw(`SELECT * FROM Compras where data_criacao BETWEEN '${query.startDate}' AND '${query.endDate}'`);
        const listCompras = JSON.parse(JSON.stringify(compras[0]));
 
        let list = [];
        for (let value of listCompras) {
          
          const dataCompraProduto = await this.findProdutosCompra(value.id);
          const produto = await this.findProdutos(dataCompraProduto);
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
        const dataCompra = await knex.raw(`DELETE FROM Compras WHERE id = id`);
        return dataCompra[0];
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
           
            const resultCompra: any = await trx('Compras').insert(data);
            
            if (!resultCompra) {
                trx.rollback();
                throw new Error("Error na inserção do Compra!");
            }
            //produtos_compras
            for (let value of produtos) {
                let data_value = {
                  id_compra: resultCompra[0],
                  id_produto: value.id,
                  quantidade: value.amount,
                  preco: value.preco
                }

                valueTotal += (value.amount * value.preco);
             
                const result_compra_produtos: any = await trx('Compra_produtos').insert(data_value);
                if (!result_compra_produtos) {
                  trx.rollback();
                  throw new Error("Error na inserção do Compra!");
                }
                const diminuiDoStock = value.quantidade - value.amount;
                if(diminuiDoStock < 0){
                  trx.rollback();
                  throw new Error("Error não há produto sucifiente para essa compra!");
                }  

                const resultProduto: any = await trx('Produtos')
                .update({quantidade: diminuiDoStock})
                .where("Id", value.id);

                if (!resultProduto) {
                    trx.rollback();
                    throw new Error("Error na alterar do Produto!");
                }

            }
            const updateProduto: any = await trx('Compras')
            .update({total: valueTotal})
            .where("Id", resultCompra[0]);

            if (!updateProduto) {
                trx.rollback();
                throw new Error("Error na alterar do Produto!");
            }

             trx.commit();
            return resultCompra;

        } catch (error) {
            trx.rollback();
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

            const resultCompra: any = await trx('Compras')
            .update(data)
            .where("Id", data.id);

            if (!resultCompra) {
                trx.rollback();
                throw new Error("Error na alterar do Compra!");
            }

            const delete_produtos_compras = await trx.raw(`DELETE FROM Compra_produtos WHERE id_compra = ${data.id}`);
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

              const result_compra_produtos: any = await trx('Compra_produtos').insert(data_value);
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
