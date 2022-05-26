#!/bin/bash

## Description: Gerar um novo modulo na api
## Date: 13/08/2021
## Author: Williams Souza

# INSTALL NODEJS AND NPM
echo
echo "CRIANDO UM NOVO MODULO NA API"
echo "======================"
echo

echo "-d: nome do modulo"

pwd

# Parse arguments

while getopts d:gdrhs option; do
    case "${option}" in
        d) NAME_MODULE="${OPTARG}" ;;
        h) help; exit 0 ;;
    esac
done

echo
echo "CRIANDO O MODULO: "${NAME_MODULE}
echo "======================"
echo

cd src
mkdir -p modules/${NAME_MODULE}

echo
echo "CRIANDO O SUB-MODULO: "
echo "======================"
echo

cd modules/${NAME_MODULE}

mkdir -p controllers
fileControlers=controllers/${NAME_MODULE}'Controllers.ts'
touch ${fileControlers}

mkdir -p entities
fileEntities=entities/${NAME_MODULE}'DTO.ts'
touch ${fileEntities}

fileIEntities=entities/I${NAME_MODULE}'.ts'
touch ${fileIEntities}

mkdir -p requestValidateInteface
fileRequest=requestValidateInteface/'IRequest'${NAME_MODULE}'.ts'
touch ${fileRequest}


mkdir -p helpers
fileHelpers=helpers/${NAME_MODULE}'Helper.ts'
touch ${fileHelpers}


mkdir -p repositories
fileRepositories=repositories/${NAME_MODULE}'Repository.ts'
touch ${fileRepositories}


mkdir -p services
fileServices=services/${NAME_MODULE}'Service.ts'
touch ${fileServices}


echo
echo "CRIANDO A ESTRUTURA BASICA DO: "${fileControlers}
echo "======================"
echo

cat > ${fileControlers} << EOF1
import { Request, Response } from "express";
import { HttpResponse, ok } from "@shared/helpers/httphelper";
import IRequest${NAME_MODULE} from "@modules/${NAME_MODULE}/requestValidateInteface/IRequest${NAME_MODULE}";
import ${NAME_MODULE}Service from "@modules/${NAME_MODULE}/services/${NAME_MODULE}Service"
import ${NAME_MODULE}Repository from "../repositories/${NAME_MODULE}Repository";

const i${NAME_MODULE}Repository = new ${NAME_MODULE}Repository();

const service${NAME_MODULE} = new ${NAME_MODULE}Service(i${NAME_MODULE}Repository);

class ${NAME_MODULE}Controller {
      public async get${NAME_MODULE}s({ query }: Request, response: Response) {
        const log: IRequest${NAME_MODULE} = {
             id: query.id ? Number(query.id) : 0,
            term: query.code ? String(query.code): 'null',
            startDate: String(query.startDate),
            endDate: String(query.endDate),
            page: Number(query.page),
            itemsPerPage: Number(query.itemsPerPage)
        }
        const { statusCode, body }: HttpResponse = await service${NAME_MODULE}.get(log);
        return response.status(statusCode).json(body);
    }

    public async delete${NAME_MODULE}({ query }: Request, response: Response) {
        const id= Number(query.id) ;
        const { statusCode, body }: HttpResponse = await service${NAME_MODULE}.delete(id);
        return response.status(statusCode).json(body);
    }

    async post${NAME_MODULE}(request: Request, response: Response) {

        const path = await service${NAME_MODULE}.post(request);
        return response.status(200).json({ result: path });
    }
  }
export default ${NAME_MODULE}Controller;
EOF1


echo
echo "CRIANDO A ESTRUTURA BASICA DO DTO: "${fileEntities}
echo "======================"
echo

cat > ${fileEntities} << EOF1
import I${NAME_MODULE} from "../entities/I${NAME_MODULE}";

const ${NAME_MODULE}DTO = (
    i${NAME_MODULE}: I${NAME_MODULE}
) => {
    const object = {
        id: i${NAME_MODULE}.id
    }
    return object;
};

export default ${NAME_MODULE}DTO;
EOF1

cat > ${fileIEntities} << EOF1
export default interface I${NAME_MODULE} {
    id?: Number
} 
EOF1


echo
echo "CRIANDO A ESTRUTURA BASICA DO: "${fileRequest}
echo "======================"
echo
cat > ${fileRequest} << EOF1
export default interface IRequest${NAME_MODULE} {
    id: Number,
    term?: String,
    startDate?: String,
    endDate?: String,
    page?: Number,
    itemsPerPage?: Number
}
EOF1


echo
echo "CRIANDO A ESTRUTURA BASICA DO: "${fileServices}
echo "======================"
echo

cat > ${fileServices} << EOF1
import { Request } from "express";
import { badRequest, notFound, ok, serverError } from "@shared/helpers/httphelper";
import  {IJsonResponse} from "@shared/interfaces/IJsonResponse";
import ${NAME_MODULE}Repository from "../repositories/${NAME_MODULE}Repository";
import IRequest${NAME_MODULE} from "../requestValidateInteface/IRequest${NAME_MODULE}";
import ${NAME_MODULE}DTO from "../entities/${NAME_MODULE}DTO";
import I${NAME_MODULE} from "../entities/I${NAME_MODULE}";

class ${NAME_MODULE}Service {

    private i${NAME_MODULE}Repository: ${NAME_MODULE}Repository;

  constructor(${NAME_MODULE}Repository: ${NAME_MODULE}Repository) {
    this.i${NAME_MODULE}Repository = ${NAME_MODULE}Repository;
  }

 public async post(request: Request): Promise<IJsonResponse> {

    const i${NAME_MODULE}: I${NAME_MODULE} = {
        id: Number(request.query.id)
    }
    const dados${NAME_MODULE} = ${NAME_MODULE}DTO(i${NAME_MODULE});

    if(!dados${NAME_MODULE}.id){
        
        const result = await this.i${NAME_MODULE}Repository.post(dados${NAME_MODULE});
        const data: IJsonResponse = {
            success: true,
            data: result
        }
        return data;
    }
        const result = await this.i${NAME_MODULE}Repository.put(dados${NAME_MODULE});
        const data: IJsonResponse = {
            success: true,
            data: result
        }
        return data;
}

  public async get(params: IRequest${NAME_MODULE}) {
        try {
             if (params.id > 0) {
               
                const data = await this.i${NAME_MODULE}Repository.findById(params);
                if (!data) {
                    return notFound({message: 'Não há registro para o id informado.'});
                }
                return ok(data);
            }else if(params.term != 'null'){
                const data = await this.i${NAME_MODULE}Repository.getTerm(params);
                if (!data) {
                    return notFound({message: 'Não há registro para o id informado.'});
                }
                return ok(data);
            }

            const data = await this.i${NAME_MODULE}Repository.get(params);

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

            const logDb = await this.i${NAME_MODULE}Repository.delete(id);
            return ok(logDb);

        } catch (error) {
            return serverError(error);
        }
    }

}

export default ${NAME_MODULE}Service;
EOF1


echo
echo "CRIANDO A ESTRUTURA BASICA DO: "${fileRepositories}
echo "======================"
echo
cat > ${fileRepositories} << EOF1
import knex from "@shared/database/connection";
import I${NAME_MODULE} from "../entities/I${NAME_MODULE}";
import IRequest${NAME_MODULE} from "../requestValidateInteface/IRequest${NAME_MODULE}";
import { IResponseCRUD }  from "@shared/interfaces/IResponseCRUD";

class ${NAME_MODULE}Repository {
    public async findById({
        id
      }: IRequest${NAME_MODULE}): Promise<I${NAME_MODULE}> {
        const data${NAME_MODULE} = await knex.raw(SELECT * FROM ${NAME_MODULE}s WHERE id = id);
        return data${NAME_MODULE}[0];
      }

    public async getTerm({
        term
      }: IRequest${NAME_MODULE}): Promise<I${NAME_MODULE}> {
        const data${NAME_MODULE} = await knex.raw(SELECT * FROM ${NAME_MODULE}s WHERE code LIKE '%term%');
        return data${NAME_MODULE}[0];
      }
    
    public async get({
        page, itemsPerPage
      }: IRequest${NAME_MODULE}): Promise<I${NAME_MODULE}> {
        const data${NAME_MODULE} = await knex.raw(SELECT * FROM ${NAME_MODULE}s);
        return data${NAME_MODULE}[0];
      }

    public async delete(
      id: Number
      ): Promise<I${NAME_MODULE}> {
        const data${NAME_MODULE} = await knex.raw(DELETE FROM ${NAME_MODULE}s WHERE id = id);
        return data${NAME_MODULE}[0];
      }

    public async post(
       data: any
       ): Promise<IResponseCRUD> {

        const trx = await knex.transaction();
        try {
            
            delete data.id;
            const result${NAME_MODULE}: any = await trx(${NAME_MODULE}s).insert(data);

            if (!result${NAME_MODULE}) {
                trx.rollback();
                throw new Error("Error na inserção do ${NAME_MODULE}!");
            }
             trx.commit();
            return result${NAME_MODULE};

        } catch (error) {
            trx.rollback();
            return {
                success: false,
                message: Não foi possível inserir o ${NAME_MODULE},
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

            const result${NAME_MODULE}: any = await trx(${NAME_MODULE}s)
            .update(data)
            .where("Id", data.id);

            if (!result${NAME_MODULE}) {
                trx.rollback();
                throw new Error("Error na alterar do ${NAME_MODULE}!");
            }
             trx.commit();
            return result${NAME_MODULE};

        } catch (error) {
            trx.rollback();
            return {
                success: false,
                message: Não foi possível alterar o ${NAME_MODULE},
                error: JSON.stringify({
                name: error.name,
                message: error.message,
                stack: error.stack,
                }),
            };
      }
    }
}
export default ${NAME_MODULE}Repository;
EOF1


echo
echo "CRIANDO A ESTRUTURA BASICA DO: "${fileHelpers}
echo "======================"
echo
cat > ${fileHelpers} << EOF1
import knex from "@shared/database/connection";
import { convertToUpperCaseWithoutAccent, retiresCaracterHelper, removeComplements } from "@shared/helpers/FormatHelper";
import { logSyncLinx } from "@shared/helpers/sync";
import ${NAME_MODULE}Repository from "../repositories/${NAME_MODULE}Repository";

const newRepository = new ${NAME_MODULE}Repository();

class FormatData${NAME_MODULE}PmzHelper {}

export default FormatData${NAME_MODULE}PmzHelper;
EOF1


echo
echo "[FINISHED]"
echo