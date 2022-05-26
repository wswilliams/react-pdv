import { Request } from "express";
import { badRequest, notFound, ok, serverError } from "@shared/helpers/httphelper";
import  {IJsonResponse} from "@shared/interfaces/IJsonResponse";
import ClienteRepository from "../repositories/ClienteRepository";
import IRequestCliente from "../requestValidateInteface/IRequestCliente";
import ClienteDTO from "../entities/ClienteDTO";
import ICliente from "../entities/ICliente";

class ClienteService {

    private iClienteRepository: ClienteRepository;

  constructor(ClienteRepository: ClienteRepository) {
    this.iClienteRepository = ClienteRepository;
  }

 public async post(request: Request): Promise<IJsonResponse> {

    const iCliente: ICliente = {
        id: Number(request.query.id)
    }
    const dadosCliente = ClienteDTO(iCliente);

    if(!dadosCliente.id){
        
        const result = await this.iClienteRepository.post(dadosCliente);
        const data: IJsonResponse = {
            success: true,
            data: result
        }
        return data;
    }
        const result = await this.iClienteRepository.put(dadosCliente);
        const data: IJsonResponse = {
            success: true,
            data: result
        }
        return data;
}

  public async get(params: IRequestCliente) {
        try {
            if (params.id > 0) {
               console.log("entrei aqui 1",params)
                const data = await this.iClienteRepository.findById(params);
                if (!data) {
                    return notFound({message: 'Não há registro para o id informado.'});
                }
                return ok(data);
            }else if(params.term != 'null'){
                console.log("entrei aqui 2",params)
                const data = await this.iClienteRepository.getTerm(params);
                if (!data) {
                    return notFound({message: 'Não há registro para o id informado.'});
                }
                return ok(data);
            }
         
                console.log("entrei aqui 3 ")
                const data = await this.iClienteRepository.get(params);
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

            const logDb = await this.iClienteRepository.delete(id);
            return ok(logDb);

        } catch (error) {
            return serverError(error);
        }
    }

}

export default ClienteService;
