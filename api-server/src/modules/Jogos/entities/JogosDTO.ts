import IJogos from "../entities/IJogos";

export const JogosDTO = (
    iJogos: IJogos
) => {
    const object = {
        id: iJogos.id,
        numero: iJogos.numero,
        concurso: iJogos.concurso,
        data_jogo: iJogos.data_jogo
    }
    return object;
};


export default JogosDTO