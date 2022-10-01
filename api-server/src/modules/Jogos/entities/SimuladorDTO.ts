import ISimulador from "../entities/ISimulador";


export const SimuladorDTO = (
    iBol: ISimulador
) => {
    const object = {
        bol1: iBol.bol1,
        bol2: iBol.bol2,
        bol3: iBol.bol3,
        bol4: iBol.bol4,
        bol5: iBol.bol5,
        bol6: iBol.bol6,
        data_jogo: iBol.data_jogo
    }
    return object;
};


export default SimuladorDTO;