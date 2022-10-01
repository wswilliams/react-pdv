import { Router } from "express";

import JogosControllers from "../../../modules/Jogos/controllers/JogosControllers";

const cadastroCompraRouter = Router();
const jogosControllers = new JogosControllers();

cadastroCompraRouter.get("/", jogosControllers.getJogoss);
cadastroCompraRouter.get("/classificar/", jogosControllers.getClassificaJogos);
cadastroCompraRouter.get("/simulador-normal/", jogosControllers.getSimularJogosNormal);
cadastroCompraRouter.get("/simulador-fixo-foxo/", jogosControllers.getSimularJogosFixoFoxo);
cadastroCompraRouter.get("/simulador-fixo-foxo-aleatorio/", jogosControllers.getSimularJogosFixoFoxoAleatorio);
cadastroCompraRouter.post("/", jogosControllers.postJogos);
cadastroCompraRouter.post("/simulador/", jogosControllers.postSimularJogos);
cadastroCompraRouter.delete("/id:", jogosControllers.deleteJogos);
cadastroCompraRouter.get("/simulador-jogos/", jogosControllers.getSimular);
cadastroCompraRouter.get("/integration/", jogosControllers.getIntegration);
cadastroCompraRouter.post("/integration/", jogosControllers.postIntegration);
cadastroCompraRouter.put("/integration/", jogosControllers.postIntegration);

export default cadastroCompraRouter;
