import { Request } from "express";
import { badRequest, notFound, ok, serverError } from "../../../shared/helpers/httphelper";
import  {IJsonResponse} from "../../../shared/interfaces/IJsonResponse";
import CompraRepository from "../repositories/CompraRepository";
import IRequestCompra from "../requestValidateInteface/IRequestCompra";
import CompraDTO from "../entities/CompraDTO";
import CompraProdutoDTO from "../entities/CompraProdutoDTO";
import ICompra from "../entities/ICompra";
import { ReportPdf } from "./reportPdf";
import moment from "moment";

const reportPdf = new ReportPdf();

class CompraService {

    private iCompraRepository: CompraRepository;

  constructor(CompraRepository: CompraRepository) {
    this.iCompraRepository = CompraRepository;
  }

 public async post(request: Request): Promise<IJsonResponse> {


    let iCompra: ICompra = {
        id: Number(request.body.id),
        total: Number(request.body.total),
        data_criacao: String(request.body.data_criacao),
        tipo_pagamento: String(request.body.tipo_pagamento),
        status: String(request.body.status),
        produtos: request.body.produtos
    }

    const dadosCompra = CompraDTO(iCompra);   

    if(!dadosCompra.id){
        
        const result = await this.iCompraRepository.post(dadosCompra);
        const data: IJsonResponse = {
            success: true,
            data: result
        }
        return data;
    }
        const result = await this.iCompraRepository.put(dadosCompra);
        const data: IJsonResponse = {
            success: true,
            data: result
        }
        return data;
}

  public async get(params: IRequestCompra) {
        try {
             if (params.id > 0) {
               
                const compra = await this.iCompraRepository.findById(params);

                if (!compra) {
                    return notFound({message: 'Não há registro para o id informado.'});
                }
     
                const produtos_compra = await this.iCompraRepository.findProdutosCompra(Number(compra[0].id));

                const result = await this.iCompraRepository.findProdutos(produtos_compra);
                const produtos = JSON.parse(JSON.stringify(result));
                const comprasDTO = CompraProdutoDTO(compra, produtos, JSON.parse(JSON.stringify(produtos_compra)));

                return ok(comprasDTO);

            }else if(params.term != 'null'){

                const compra = await this.iCompraRepository.getTerm(params);

               if (!compra) {
                    return notFound({message: 'Não há registro para o id informado.'});
                }

                return ok(compra);
            }

            const data = await this.iCompraRepository.get(params);

            return ok(data);

        } catch (error) {
            return serverError(error);
        }
    }

    public async getSum() {
        try {
                    
            const data = await this.iCompraRepository.getSum();
            return ok(data);

        } catch (error) {
            return serverError(error);
        }
    }
    public async getCount() {
        try {
                    
            const data = await this.iCompraRepository.getCount();
            return ok(data);

        } catch (error) {
            return serverError(error);
        }
    }

      public async delete(id: Number) {
        try {
            if (!id) {
                return notFound({message: 'Não há registro para o id informado.'});
            }

            const logDb = await this.iCompraRepository.delete(id);
            return ok(logDb);

        } catch (error) {
            return serverError(error);
        }
    }

    public async getRelatorioMesCompras(log: any): Promise<string> {
        try {
           
            const docs = await this.iCompraRepository.getRelatorioMesCompras(log);
  
            return await reportPdf.execute(docs || [], log);
        } catch (error) {
            return JSON.stringify(error);
        }
    }

}

export default CompraService;
