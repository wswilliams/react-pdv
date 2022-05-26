import ICliente from "../entities/ICliente";

const ClienteDTO = (
    iCliente: ICliente
) => {
    const object = {
        id: iCliente.id
    }
    return object;
};

export default ClienteDTO;
