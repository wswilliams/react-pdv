import { Request } from "express";
import { badRequest, notFound, ok, serverError } from "@shared/helpers/httphelper";
import  {IJsonResponse} from "@shared/interfaces/IJsonResponse";
import JogosRepository from "../repositories/JogosRepository";
import ClassificacoesDTO from "../entities/ClassificacoesDTO";
import SimuladorDTO from "../entities/SimuladorDTO";
import ISimulador from "../entities/ISimulador";
import IRequestJogos from "../requestValidateInteface/IRequestJogos";
import JogosDTO from "../entities/JogosDTO";
import IJogos from "../entities/IJogos";

class JogosService {

    private iJogosRepository: JogosRepository;

  constructor(JogosRepository: JogosRepository) {
    this.iJogosRepository = JogosRepository;
  }

 public async post(request: Request): Promise<IJsonResponse> {

    const iJogos: IJogos = {
        id: Number(request.query.id),
        numero: Number(request.query.numero),
        concurso: String(request.query.concurso),
        data_jogo: String(request.query.concurso)
    }

    const dadosJogos = JogosDTO(iJogos);

    if(!dadosJogos.id){
        
        const result = await this.iJogosRepository.post(dadosJogos);
        const data: IJsonResponse = {
            success: true,
            data: result
        }
        return data;
    }
        const result = await this.iJogosRepository.put(dadosJogos);
        const data: IJsonResponse = {
            success: true,
            data: result
        }
        return data;
}

  public async get(params: IRequestJogos) {
        try {
             if (params.id > 0) {
               
                const data = await this.iJogosRepository.findById(params);
                if (!data) {
                    return notFound({message: 'Não há registro para o id informado.'});
                }
                return ok(data);
            }
            /*
            else if(params.term != 'null'){
                const data = await this.iJogosRepository.getTerm(params);
                if (!data) {
                    return notFound({message: 'Não há registro para o id informado.'});
                }
                return ok(data);
            }
*/
            const data = await this.iJogosRepository.get(params);

            return ok(data);
        } catch (error) {
            return serverError(error);
        }
    }

    public async getSimular() {
        try {
            
             let jogos  = await this.iJogosRepository.getSimular();

            return ok(jogos);

       } catch (error) {
           return serverError(error);
       }
    }

    public async getClassificaJogos() {
        try {
            
             let jogos  = await this.iJogosRepository.getClassificaJogos();
          
             const result = Object.entries(jogos);
            let index = 1;
            const max = 6;
            let count = 1;
             for (const [i, iterator] of result) {

                const peso: any= await this.iJogosRepository.getJogos(iterator['numero']);
                let res  = await ClassificacoesDTO(iterator, Number(peso['numero']), index);
                let create = await this.iJogosRepository.postClassificacoes(res);

                if(count == max){
                    index ++;
                    count = 1;
                }else
                    count ++;
              
            }

            return ok({
                        statusCode: 200,
                        body: 'data'
                    });

       } catch (error) {
           return serverError(error);
       }
    }

    public async getSimularJogos() {
        try {
            
             let jogosNormal  = await this.iJogosRepository.getSimularJogos();
          
             const result = Object.entries(jogosNormal);

             const count = (jogosNormal.length / 6);
             let item = 0;

            for (let index = 0; index < count; index++) {

                 let bol1 = item;
                 let bol2 = bol1 + 1;
                 let bol3 = bol2 + 1;
                 let bol4 = bol3 + 1;
                 let bol5 = bol4 + 1;
                 let bol6 = bol5 + 1;

                    let iSimulador: ISimulador = {
                        bol1: jogosNormal[bol1].numero,
                        bol2: jogosNormal[bol2].numero,
                        bol3: jogosNormal[bol3].numero,
                        bol4: jogosNormal[bol4].numero,
                        bol5: jogosNormal[bol5].numero,
                        bol6: jogosNormal[bol6].numero
                    }
               
                    let create = await this.iJogosRepository.postSimulador(iSimulador);
                    item = bol6 + 1;

            }

            return ok({
                        statusCode: 200,
                        body: 'data'
                    });

       } catch (error) {
           return serverError(error);
       }
    }

    public async getSimularJogosFixoFoxo() {
        try {
            
             let jogosNormal  = await this.iJogosRepository.getSimularJogos();
          
             const result = Object.entries(jogosNormal);

             const count = (jogosNormal.length / 4);
             let itemFixo = 0;
             let itemFoxo = jogosNormal.length -1;

            for (let index = 0; index < count; index++) {

                 let bol1 = itemFixo;
                 let bol2 = bol1 + 1;
                 let bol3 = bol2 + 1;
                 let bol4 = itemFoxo;
                 let bol5 = bol4 - 1;
                 let bol6 = bol5 - 1;
                 
                    let iSimulador: ISimulador = {
                        bol1: jogosNormal[bol1].numero,
                        bol2: jogosNormal[bol2].numero,
                        bol3: jogosNormal[bol3].numero,
                        bol4: jogosNormal[bol4].numero,
                        bol5: jogosNormal[bol5].numero,
                        bol6: jogosNormal[bol6].numero
                    }
               
                    let create = await this.iJogosRepository.postSimulador(iSimulador);
                    itemFixo = bol3 + 1;
                    itemFoxo = bol6 - 1;

            }

            return ok({
                        statusCode: 200,
                        body: 'data'
                    });

       } catch (error) {
           return serverError(error);
       }
    }
    public async getSimularJogosFixoFoxoAleatorio() {
        try {
            
             let jogosNormal  = await this.iJogosRepository.getSimularJogos();
          
             const result = Object.entries(jogosNormal);

             const count = (jogosNormal.length / 4);
             let itemFixo = 0;
             let itemFoxo = jogosNormal.length -1;

            for (let index = 0; index < count; index++) {

                 let bol1 = itemFixo;
                 let bol2 = bol1 + 1;
                 let bol3 = await this.randomNumberInterval(1,60)
                 let bol4 = itemFoxo;
                 let bol5 = bol4 - 1;
                 let bol6 = await this.randomNumberInterval(1,60)
                 
                    let iSimulador: ISimulador = {
                        bol1: jogosNormal[bol1].numero,
                        bol2: jogosNormal[bol2].numero,
                        bol3: jogosNormal[bol3].numero,
                        bol4: jogosNormal[bol4].numero,
                        bol5: jogosNormal[bol5].numero,
                        bol6: jogosNormal[bol6].numero
                    }
               
                  //console.log("iSimulador",iSimulador)  
                  let create = await this.iJogosRepository.postSimulador(iSimulador);
                    itemFixo = bol2 + 1;
                    itemFoxo = bol5 - 1;

            }

            return ok({
                        statusCode: 200,
                        body: 'data'
                    });

       } catch (error) {
           return serverError(error);
       }
    }

    public async randomNumberInterval(a: number, b: number) {
        return Math.floor(Math.random() * (b - a + 1)) + a
    }

      public async delete(id: Number) {
        try {
            if (!id) {
                return notFound({message: 'Não há registro para o id informado.'});
            }

            const logDb = await this.iJogosRepository.delete(id);
            return ok(logDb);

        } catch (error) {
            return serverError(error);
        }
    }

    public async postSimularJogos(query: any[]) {
        try {
            
            console.log("Simular de Jogos");
            console.log("=======================================");
            console.log(typeof query)
            console.log(query.length)
            const result = Object.entries(query);
            for (const [i, iterator] of result) {

                    const jogo1: IJogos = {
                        numero: Number(iterator['bola 1']),
                        concurso: String(iterator['Concurso']),
                        data_jogo: String(iterator['Data'])
                    }
                    const jogo2: IJogos = {
                        numero: Number(iterator['bola 2']),
                        concurso: String(iterator['Concurso']),
                        data_jogo: String(iterator['Data'])
                    }
                    const jogo3: IJogos = {
                        numero: Number(iterator['bola 4']),
                        concurso: String(iterator['Concurso']),
                        data_jogo: String(iterator['Data'])
                    }
                    const jogo4: IJogos = {
                        numero: Number(iterator['bola 4']),
                        concurso: String(iterator['Concurso']),
                        data_jogo: String(iterator['Data'])
                    }
                    const jogo5: IJogos = {
                        numero: Number(iterator['bola 5']),
                        concurso: String(iterator['Concurso']),
                        data_jogo: String(iterator['Data'])
                    }
                    const jogo6: IJogos = {
                        numero: Number(iterator['bola 6']),
                        concurso: String(iterator['Concurso']),
                        data_jogo: String(iterator['Data'])
                    }

                    const data1 = await this.iJogosRepository.post(jogo1);
                    const data2= await this.iJogosRepository.post(jogo2);
                    const data3 = await this.iJogosRepository.post(jogo3);
                    const data4 = await this.iJogosRepository.post(jogo4);
                    const data5 = await this.iJogosRepository.post(jogo5);
                    const data6 = await this.iJogosRepository.post(jogo6);
                }
                
                    return ok({
                        statusCode: 200,
                        body: 'data'
                    });
                
                
        } catch (error) {
            return serverError(error);
        }
    }

}

export default JogosService;
