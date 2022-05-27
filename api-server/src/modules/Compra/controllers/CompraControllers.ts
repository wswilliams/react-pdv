import { Request, Response } from "express";
import { HttpResponse, ok } from "../../../shared/helpers/httphelper";
import IRequestCompra from "../../../modules/Compra/requestValidateInteface/IRequestCompra";
import CompraService from "../../../modules/Compra/services/CompraService"
import CompraRepository from "../repositories/CompraRepository";
const fs = require('fs');

const iCompraRepository = new CompraRepository();

const serviceCompra = new CompraService(iCompraRepository);

class CompraController {
      public async getCompras({ query }: Request, response: Response) {
        const log: IRequestCompra = {
            id: query.id ? Number(query.id) : 0,
            term: query.code ? String(query.code): 'null',
            startDate: String(query.startDate),
            endDate: String(query.endDate),
            page: Number(query.page),
            itemsPerPage: Number(query.itemsPerPage)
        }
        const { statusCode, body }: HttpResponse = await serviceCompra.get(log);
        return response.status(statusCode).json(body);
    }

    public async getSumCompras({ query }: Request, response: Response) {
       
        const { statusCode, body }: HttpResponse = await serviceCompra.getSum();
        return response.status(statusCode).json(body);
    }

    public async getCountCompras({ query }: Request, response: Response) {
       
        const { statusCode, body }: HttpResponse = await serviceCompra.getCount();
        return response.status(statusCode).json(body);
    }
    public async getRelatorioMesCompras({ query }: Request, response: Response) {
       
        const log =  {
            startDate: query.startDate ? String(query.startDate) : undefined,
            endDate: query.endDate ? String(query.endDate) : undefined
        }
        const pathFile = await serviceCompra.getRelatorioMesCompras(log);

        loadPDF();

        function loadPDF() {

            setTimeout(function () {

                const data = fs.readFileSync(pathFile, 'utf8');

                if (!data) {
                    return loadPDF();
                }
                response.download(pathFile);
            }, 3000);
        }
        
    }
    
    public async deleteCompra({ query }: Request, response: Response) {
        const id= Number(query.id) ;
        const { statusCode, body }: HttpResponse = await serviceCompra.delete(id);
        return response.status(statusCode).json(body);
    }

    async postCompra(request: Request, response: Response) {

        const path = await serviceCompra.post(request);

        return response.status(200).json({ result: path });
    }
  }
export default CompraController;
