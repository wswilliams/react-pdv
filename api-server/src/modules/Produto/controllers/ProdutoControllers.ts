import { Request, Response } from "express";
import { HttpResponse, ok } from "../../../shared/helpers/httphelper";
import IRequestProduto from "../../../modules/Produto/requestValidateInteface/IRequestProduto";
import ProdutoService from "../../../modules/Produto/services/ProdutoService"
import ProdutoRepository from "../repositories/ProdutoRepository";

const iProdutoRepository = new ProdutoRepository();

const serviceProduto = new ProdutoService(iProdutoRepository);

class ProdutoController {
      public async getProdutos({ query }: Request, response: Response) {
        const log: IRequestProduto = {
            id: query.id ? Number(query.id) : 0,
            term: query.code ? String(query.code): 'null',
            startDate: String(query.startDate),
            endDate: String(query.endDate),
            page: Number(query.page),
            itemsPerPage: Number(query.itemsPerPage)
        }
        const { statusCode, body }: HttpResponse = await serviceProduto.get(log);
        return response.status(statusCode).json(body);
    }
    public async getCountProdutos({ query }: Request, response: Response) {
       
        const { statusCode, body }: HttpResponse = await serviceProduto.getCount();
        return response.status(statusCode).json(body);
    }
    public async deleteProduto({ query }: Request, response: Response) {

        const id= Number(query.id) ;
        const { statusCode, body }: HttpResponse = await serviceProduto.delete(id);
        return response.status(statusCode).json(body);
    }

    async postProduto(request: Request, response: Response) {

        const path = await serviceProduto.post(request);
        return response.status(200).json({ result: path });
    }
  }
export default ProdutoController;
