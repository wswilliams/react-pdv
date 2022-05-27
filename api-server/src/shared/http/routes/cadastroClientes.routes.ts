import { Router } from "express";

import CadastroClienteController from "../../../modules/Cliente/controllers/ClienteControllers";

const cadastroClienteRouter = Router();
const cadastroClienteController = new CadastroClienteController();

cadastroClienteRouter.get("/", cadastroClienteController.getClientes);
cadastroClienteRouter.post("/", cadastroClienteController.postCliente);
cadastroClienteRouter.delete("/id:", cadastroClienteController.deleteCliente);


export default cadastroClienteRouter;
