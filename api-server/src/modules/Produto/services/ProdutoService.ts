import { Request } from "express";
import { badRequest, notFound, ok, serverError } from "../../../shared/helpers/httphelper";
import  {IJsonResponse} from "../../../shared/interfaces/IJsonResponse";
import ProdutoRepository from "../repositories/ProdutoRepository";
import IRequestProduto from "../requestValidateInteface/IRequestProduto";
import ProdutoDTO from "../entities/ProdutoDTO";
import IProduto from "../entities/IProduto";

class ProdutoService {

    private iProdutoRepository: ProdutoRepository;

  constructor(ProdutoRepository: ProdutoRepository) {
    this.iProdutoRepository = ProdutoRepository;
  }

 public async post(request: Request): Promise<IJsonResponse> {

    const iProduto: IProduto = {
        id: Number(request.body.id),
        nome: String(request.body.nome),
        descricao: String(request.body.descricao),
        preco: Number(request.body.preco),
        quantidade: Number(request.body.quantidade),
        data_criacao: String(request.body.data_criacao),
        data_atualizacao: String(request.body.data_atualizacao)
    }
    const dadosProduto = ProdutoDTO(iProduto);

    if(!dadosProduto.id){
        
        const result = await this.iProdutoRepository.post(dadosProduto);
        const data: IJsonResponse = {
            success: true,
            data: result
        }
        return data;
    }
        const result = await this.iProdutoRepository.put(dadosProduto);
        const data: IJsonResponse = {
            success: true,
            data: result
        }
        return data;
}

  public async get(params: IRequestProduto) {
        try {
             if (params.id > 0) {
               
                const data = await this.iProdutoRepository.findById(params);
                if (!data) {
                    return notFound({message: 'Não há registro para o id informado.'});
                }
                return ok(data);
            }else if(params.term !== 'null'){
                const data = await this.iProdutoRepository.getTerm(params);
                if (!data) {
                    return notFound({message: 'Não há registro para o id informado.'});
                }
                return ok(data);
            }

            const data = await this.iProdutoRepository.get(params);

            return ok(data);
        } catch (error) {
            return serverError(error);
        }
    }
    public async getCount() {
        try {
                    
            const data = await this.iProdutoRepository.getCount();
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

            const logDb = await this.iProdutoRepository.delete(id);
            return ok(logDb);

        } catch (error) {
            return serverError(error);
        }
    }

}

export default ProdutoService;
