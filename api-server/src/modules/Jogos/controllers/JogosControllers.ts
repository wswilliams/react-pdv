import { Request, Response } from "express";
import { HttpResponse, ok } from "@shared/helpers/httphelper";
import IRequestJogos from "@modules/Jogos/requestValidateInteface/IRequestJogos";
import JogosService from "@modules/Jogos/services/JogosService"
import JogosRepository from "../repositories/JogosRepository";

const iJogosRepository = new JogosRepository();

const serviceJogos = new JogosService(iJogosRepository);

class JogosController {
      public async getJogoss({ query }: Request, response: Response) {
        const log: IRequestJogos = {
             id: query.id ? Number(query.id) : 0,
            term: query.code ? String(query.code): 'null',
            startDate: String(query.startDate),
            endDate: String(query.endDate),
            page: Number(query.page),
            itemsPerPage: Number(query.itemsPerPage)
        }
        const { statusCode, body }: HttpResponse = await serviceJogos.get(log);
        return response.status(statusCode).json(body);
    }

    public async deleteJogos({ query }: Request, response: Response) {
        const id= Number(query.id) ;
        const { statusCode, body }: HttpResponse = await serviceJogos.delete(id);
        return response.status(statusCode).json(body);
    }

    async postJogos(request: Request, response: Response) {

        const path = await serviceJogos.post(request);
        return response.status(200).json({ result: path });
    }

    public async postSimularJogos(request: Request, response: Response) {
       
      const query = request.body;
      const path = await serviceJogos.postSimularJogos(query);
      return response.status(200).json(path);
    }
    
    public async getSimular(request: Request, response: Response) {
        
      const { statusCode, body }: HttpResponse = await serviceJogos.getSimular();
      return response.status(statusCode).json(body);
  }

    public async getClassificaJogos(request: Request, response: Response) {
        
        const { statusCode, body }: HttpResponse = await serviceJogos.getClassificaJogos();
        return response.status(statusCode).json(body);
    }
    public async getSimularJogosNormal(request: Request, response: Response) {
        
      const { statusCode, body }: HttpResponse = await serviceJogos.getSimularJogos();
      return response.status(statusCode).json(body);
  }
  public async getSimularJogosFixoFoxo(request: Request, response: Response) {
        
    const { statusCode, body }: HttpResponse = await serviceJogos.getSimularJogosFixoFoxo();
    return response.status(statusCode).json(body);
   }
   public async getSimularJogosFixoFoxoAleatorio(request: Request, response: Response) {
        
    const { statusCode, body }: HttpResponse = await serviceJogos.getSimularJogosFixoFoxoAleatorio();
    return response.status(statusCode).json(body);
   }
  
  public async getIntegration(request: Request, response: Response) {
    console.log(request.query)
    return response.status(200).json({data:"sucesso"});
  }
  public async postIntegration(request: Request, response: Response) {
    console.log(request.body)
    return response.status(200).json({data:"sucesso"});
  }
  public async putIntegration(request: Request, response: Response) {
    console.log(request.query)
    console.log(request.body)
    return response.status(200).json({data:"sucesso"});
  }
}
export default JogosController;
