import { Request, Response } from "express";
import { HttpResponse, ok } from "@shared/helpers/httphelper";
import IRequestCliente from "@modules/Cliente/requestValidateInteface/IRequestCliente";
import ClienteService from "@modules/Cliente/services/ClienteService"
import ClienteRepository from "../repositories/ClienteRepository";

const iClienteRepository = new ClienteRepository();

const serviceCliente = new ClienteService(iClienteRepository);

class ClienteController {
      public async getClientes({ query }: Request, response: Response) {
        const log: IRequestCliente = {
            id: query.id ? Number(query.id) : 0,
            term: query.code ? String(query.code): 'null',
            startDate: String(query.startDate),
            endDate: String(query.endDate),
            page: Number(query.page),
            itemsPerPage: Number(query.itemsPerPage)
        }
        const { statusCode, body }: HttpResponse = await serviceCliente.get(log);
        return response.status(statusCode).json(body);
    }

    public async deleteCliente({ query }: Request, response: Response) {
        const id= Number(query.id) ;
        const { statusCode, body }: HttpResponse = await serviceCliente.delete(id);
        return response.status(statusCode).json(body);
    }

    async postCliente(request: Request, response: Response) {

        const path = await serviceCliente.post(request);
        return response.status(200).json({ result: path });
    }
  }
export default ClienteController;
