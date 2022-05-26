export default interface ICompra {
    id?: Number,
    total: Number,
    data_criacao: String,
    tipo_pagamento: String,
    status: String,
    produtos?: Array<any>
} 
