import IJogos from "./IJogos";
import ICassificacoes from "./IJogos";

export const ClassificacoesDTO = (
    iJogos: IJogos,
    peso: Number,
    jogo: Number
) => {

    const object = {
        numero: iJogos.numero,
        peso: peso,
        concurso: jogo
    }
    return object;
};


export default ClassificacoesDTO;